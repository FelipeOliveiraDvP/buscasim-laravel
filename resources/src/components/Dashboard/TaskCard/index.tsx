import { Avatar, Group, Paper, Stack, Text } from '@mantine/core';
import { getFirstLetter } from '@/core/utils';
import { Task, taskStatus } from '@/core/services/tasks';
import dayjs from 'dayjs';

interface Props {
  task: Task;
}

export function DashboardTaskCard({ task }: Props) {
  return (
    <Paper
      withBorder
      p="sm"
      styles={(theme) => ({
        root: {
          borderLeft: `8px solid ${theme.colors.blue[7]}`,
        },
      })}
    >
      <Stack gap="xs">
        <Text fw={600}>{task.title}</Text>
        <Group justify="space-between">
          <Group>
            <Avatar c="blue.7">{getFirstLetter(task.responsible.name)}</Avatar>
            <div>
              <Text fw={500}>{task.responsible.name}</Text>
              <Text c="dimmed">{task.responsible.email}</Text>
            </div>
          </Group>
          <Stack gap="xs" ta="right">
            <Text>{taskStatus[task.status]}</Text>
            <Text c="dimmed">
              {dayjs(task.final_date).format('DD/MM/YYYY')}
            </Text>
          </Stack>
        </Group>
      </Stack>
    </Paper>
  );
}
