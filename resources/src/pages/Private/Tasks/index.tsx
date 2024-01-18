import React, { useEffect, useState } from "react";
import { Breadcrumbs, Flex, Group, Portal, Stack, Text } from "@mantine/core";
import {
  DragDropContext,
  DraggableLocation,
  OnDragEndResponder,
} from "@hello-pangea/dnd";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";

import { TaskBoard, TaskCard, TaskModal } from "@/components/Tasks";
import {
  Task,
  TaskReorderRequest,
  TaskState,
  TaskStatusType,
  initialTaskState,
  taskStatus,
  useReorderTask,
  useTasks,
} from "@/core/services/tasks";
import { BaseQuery } from "@/core/types";
import { AnchorLink } from "@/components/__commons";
import { TasksFilters } from "@/components/Tasks/Filters";

export default function TasksPage() {
  const [params, setParams] = useState<BaseQuery>();
  const [debounced] = useDebouncedValue(params, 200);
  const [selected, setSelected] = useState<Task>();
  const [status, setStatus] = useState<TaskStatusType>();
  const [opened, { open, close }] = useDisclosure(false);
  const [state, setState] = useState<TaskState>(initialTaskState);
  const reorderMutation = useReorderTask();
  const { data, refetch } = useTasks(debounced);

  async function handleReorderTasks(data: TaskReorderRequest) {
    await reorderMutation.mutateAsync(data);
  }

  const getStatus = (location: DraggableLocation | null) =>
    location?.droppableId as TaskStatusType;

  const handleDragEnd: OnDragEndResponder = async ({ source, destination }) => {
    if (!destination) return;

    const sourceArray = [...state[getStatus(source)]];
    const destinationArray = [...state[getStatus(destination)]];
    const sourceTask = sourceArray[source.index];

    if (source.droppableId !== destination.droppableId) {
      destinationArray.splice(destination.index, 0, sourceTask);

      setState((prev) => ({
        ...prev,
        [getStatus(source)]: sourceArray.filter((t) => t.id !== sourceTask.id),
        [getStatus(destination)]: destinationArray,
      }));
    } else {
      const movedTask = sourceArray.splice(source.index, 1)[0];

      sourceArray.splice(destination.index, 0, movedTask);

      setState((prev) => ({
        ...prev,
        [getStatus(source)]: sourceArray,
      }));
    }

    await handleReorderTasks({
      task_id: sourceTask.id,
      target_status: destination.droppableId as TaskStatusType,
      target_index: destination.index,
    });
  };

  useEffect(() => {
    if (data) {
      const tasks = data.reduce((acc, obj) => {
        const { status, ...rest } = obj;

        if (!(acc as TaskState)[status]) {
          (acc as TaskState)[status] = [];
        }

        (acc as TaskState)[status].push({ ...rest, status });

        return acc;
      }, {});

      setState((prev) => ({ ...prev, ...tasks }));
    }
  }, [data, debounced]);

  return (
    <Stack>
      <Flex justify="space-between">
        <Breadcrumbs>
          <AnchorLink href="/app">Dashboard</AnchorLink>
          <Text fw="bolder">Tarefas</Text>
        </Breadcrumbs>
        {/* <TasksFilters
          onChange={(query) => {
            setParams(query);
            refetch();
          }}
        /> */}
      </Flex>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Group align="flex-start">
          {Object.entries(taskStatus).map(([droppableId, title]) => (
            <TaskBoard
              key={droppableId}
              droppableId={droppableId}
              title={title}
              onClick={(status) => {
                setStatus(status as TaskStatusType);
                open();
              }}
            >
              {state[droppableId as TaskStatusType].map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  onSelect={(task) => {
                    setSelected(task);
                    open();
                  }}
                />
              ))}
            </TaskBoard>
          ))}
        </Group>
      </DragDropContext>
      <Portal>
        <TaskModal
          task={selected}
          status={status}
          opened={opened}
          onClose={() => {
            setSelected(undefined);
            setStatus(undefined);
            close();
          }}
        />
      </Portal>
    </Stack>
  );
}
