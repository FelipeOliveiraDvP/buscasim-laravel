import React from "react";
import {
  ActionIcon,
  Divider,
  Flex,
  Group,
  Paper,
  Spoiler,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { IconEdit, IconUser } from "@tabler/icons-react";
import { Task } from "@/core/services/tasks";
import { Draggable } from "@hello-pangea/dnd";
import dayjs from "dayjs";

interface Props {
  task: Task;
  index: number;
  onSelect: (task: Task) => void;
}

export function TaskCard({ task, index, onSelect }: Props) {
  // console.log(task.responsible);
  return (
    <Draggable key={task.id} index={index} draggableId={String(task.id)}>
      {(provided) => (
        <Paper
          withBorder
          shadow="md"
          p="sm"
          radius="sm"
          mb="sm"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Stack>
            <Flex justify="space-between" mb="md">
              <Title order={5}>{task.title}</Title>
              <ActionIcon
                variant="light"
                size="sm"
                title="Editar Tarefa"
                onClick={() => onSelect(task)}
              >
                <IconEdit />
              </ActionIcon>
            </Flex>

            <Spoiler
              maxHeight={100}
              showLabel="Mostrar mais"
              hideLabel="Esconder"
            >
              <Text>{task.description}</Text>
            </Spoiler>

            <Divider />

            {task.responsible && (
              <div>
                <Title order={5}>Responsável</Title>

                <Text fw={500} truncate="end">
                  {task.responsible?.name}
                </Text>
                <Text c="dimmed" truncate="end">
                  {task.responsible?.email}
                </Text>
              </div>
            )}

            <div>
              <Title order={5}>Prazo Final</Title>
              <Text c="dimmed" truncate="end">
                {dayjs(task.final_date).format("DD/MM/YYYY")}
              </Text>
            </div>
          </Stack>
        </Paper>
      )}
    </Draggable>
  );
}
