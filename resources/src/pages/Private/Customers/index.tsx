import React, { useState } from "react";
import {
  Breadcrumbs,
  Button,
  Flex,
  Paper,
  Portal,
  Stack,
  Text,
} from "@mantine/core";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import {
  Customer,
  CustomerListQuery,
  useCustomers,
} from "@/core/services/customers";
import {
  CustomerModal,
  CustomersFilters,
  CustomersList,
} from "@/components/Customers";
import { AnchorLink } from "@/components/__commons";

export default function CustomersPage() {
  const [params, setParams] = useState<CustomerListQuery>();
  const [debounced] = useDebouncedValue(params, 200);
  const [selected, setSelected] = useState<Customer>();
  const [opened, { open, close }] = useDisclosure(false);
  const { data, isLoading } = useCustomers(debounced);

  return (
    <Stack>
      <Flex justify="space-between">
        <Breadcrumbs>
          <AnchorLink href="/app">Dashboard</AnchorLink>
          <Text fw="bolder">Clientes</Text>
        </Breadcrumbs>
        <CustomersFilters onChange={setParams} />
      </Flex>

      <Paper p="md" withBorder>
        <Stack>
          <Flex justify="flex-end" align="center">
            <Button onClick={() => open()}>Novo Cliente</Button>
          </Flex>

          <CustomersList
            data={data}
            loading={isLoading}
            onPaginate={(page) => setParams((params) => ({ ...params, page }))}
            onSelect={(value) => {
              setSelected(value);
              open();
            }}
          />
        </Stack>
      </Paper>
      <Portal>
        <CustomerModal
          customer={selected}
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
