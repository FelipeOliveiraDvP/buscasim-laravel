import React, { useState } from "react";
import { Grid, Group, Paper, Portal, Stack, Text } from "@mantine/core";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";

import { AnchorLink } from "@/components/__commons";
import {
  ProcessModal,
  ProcessesFilters,
  ProcessesList,
} from "@/components/Processes";
import { Process, ProcessListQuery } from "@/core/services/processes";
import { DashboardCalendar, DashboardTaskCard } from "@/components/Dashboard";
import {
  useDashboardTasks,
  useDashboardEvents,
} from "@/core/services/dashboard";

export default function DashboardPage() {
  const [params, setParams] = useState<ProcessListQuery>();
  const [debounced] = useDebouncedValue(params, 200);
  const [selected, setSelected] = useState<Process>();
  const [opened, { open, close }] = useDisclosure(false);

  const { data: tasks } = useDashboardTasks();
  const { data: events } = useDashboardEvents();

  return (
    <>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper withBorder p="md">
            <Group justify="space-between" mb="md">
              <Text fw={700}>Agenda do mês</Text>
              <AnchorLink href="/app/scheduler">Ver agenda</AnchorLink>
            </Group>
            <DashboardCalendar events={events || []} />
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper withBorder p="md">
            <Group justify="space-between" mb="md">
              <Text fw={700}>Próximas Tarefas</Text>
              <AnchorLink href="/app/tasks">Ver tarefas</AnchorLink>
            </Group>
            <Stack>
              {tasks &&
                tasks.map((task) => (
                  <DashboardTaskCard key={task.id} task={task} />
                ))}
            </Stack>
          </Paper>
        </Grid.Col>
        <Grid.Col span={12}>
          <Paper withBorder p="md">
            <Stack>
              <Group justify="space-between" mb="md">
                <Text fw={700}>Processos em andamento</Text>
                <AnchorLink href="/app/processes">Ver processos</AnchorLink>
              </Group>
              <ProcessesFilters onChange={setParams} />
              <ProcessesList
                data={{ items: mockData, pagination: { current: 1, total: 3 } }}
                loading={false}
                preview
                onPaginate={(page) =>
                  setParams((params) => ({ ...params, page }))
                }
                onSelect={(data) => {
                  setSelected(data);
                  open();
                }}
              />
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
      <Portal>
        <ProcessModal
          process={selected}
          opened={opened}
          onClose={() => {
            setSelected(undefined);
            close();
          }}
        />
      </Portal>
    </>
  );
}

const mockData: Process[] = [
  {
    id: 1,
    customer: {
      id: 1,
      name: "João da Silva",
      phone: "1194838439",
    },
    process_number: "0112DSDSD",
    amount: 500,
    expertise: "criminal",
    situation: "pending",
    tribunal: "Fórum do centro",
    created_at: "2024-01-10",
    updated_at: "2024-01-10",
  },
  {
    id: 2,
    customer: {
      id: 1,
      name: "João da Silva",
      phone: "1194838439",
    },
    process_number: "SDSD454D",
    amount: 500,
    expertise: "family",
    situation: "approved",
    tribunal: "Fórum do centro",
    created_at: "2024-01-10",
    updated_at: "2024-01-10",
  },
  {
    id: 3,
    customer: {
      id: 1,
      name: "João da Silva",
      phone: "1194838439",
    },
    process_number: "SDSD454D",
    amount: 500,
    expertise: "family",
    situation: "cancelled",
    tribunal: "Fórum do centro",
    created_at: "2024-01-10",
    updated_at: "2024-01-10",
  },
];
