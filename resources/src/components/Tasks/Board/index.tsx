import React, { ReactNode } from "react";
import { Button, Flex, Paper, Stack, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Droppable } from "@hello-pangea/dnd";
import { TaskStatusType } from "@/core/services/tasks";

interface Props {
  title: string;
  droppableId: string;
  children?: ReactNode;
  onClick: (droppableId: TaskStatusType) => void;
}

export function TaskBoard({ title, droppableId, children, onClick }: Props) {
  return (
    <Paper bg="gray.2" p="sm" w="100%" maw={300}>
      <Stack>
        <Flex justify="space-between" align="center">
          <Text fw="bolder">{title}</Text>
          <Button
            leftSection={<IconPlus size={14} />}
            variant="transparent"
            onClick={() => onClick(droppableId as TaskStatusType)}
          >
            Nova Tarefa
          </Button>
        </Flex>
        <Droppable droppableId={droppableId} direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {children}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Stack>
    </Paper>
  );
}
