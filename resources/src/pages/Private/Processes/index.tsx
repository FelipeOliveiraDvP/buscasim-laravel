import React, { useState } from "react";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import {
  Breadcrumbs,
  Button,
  Flex,
  Paper,
  Portal,
  Stack,
  Text,
} from "@mantine/core";
import {
  ProcessModal,
  ProcessesFilters,
  ProcessesList,
} from "@/components/Processes";
import { Process, ProcessListQuery } from "@/core/services/processes";
import { AnchorLink } from "@/components/__commons";

export default function ProcessesPage() {
  const [params, setParams] = useState<ProcessListQuery>();
  const [debounced] = useDebouncedValue(params, 200);
  const [selected, setSelected] = useState<Process>();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Stack>
      <Flex justify="space-between">
        <Breadcrumbs>
          <AnchorLink href="/app">Dashboard</AnchorLink>
          <Text fw="bolder">Processos</Text>
        </Breadcrumbs>
        <ProcessesFilters onChange={setParams} />
      </Flex>
      <Paper p="md" withBorder>
        <Stack>
          <Flex justify="end" align="center">
            <Button onClick={() => open()}>Novo Processo</Button>
          </Flex>

          <ProcessesList
            data={{ items: mockData, pagination: { current: 1, total: 3 } }}
            loading={false}
            onPaginate={(page) => setParams((params) => ({ ...params, page }))}
            onSelect={(data) => {
              setSelected(data);
              open();
            }}
          />
        </Stack>
      </Paper>
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
    </Stack>
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
