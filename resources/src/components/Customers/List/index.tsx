import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Badge, Group, Text } from '@mantine/core';
import { Table } from '@/components/__commons';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import {
  Customer,
  CustomerListResponse,
  useRemoveCustomer,
} from '@/core/services/customers';
import { modals } from '@mantine/modals';

interface Props {
  data?: CustomerListResponse;
  loading?: boolean;
  onSelect: (item: Customer) => void;
  onPaginate?: (page: number) => void;
}

export function CustomersList({ data, loading, onSelect, onPaginate }: Props) {
  const columnHelper = createColumnHelper<Customer>();
  const removeMutation = useRemoveCustomer();

  const confirmRemove = (obj: Customer) =>
    modals.openConfirmModal({
      title: 'Remover Cliente',
      children: <Text size="sm">Deseja realmente remover esse cliente?</Text>,
      labels: { confirm: 'Remover', cancel: 'Cancelar' },
      confirmProps: { loading: removeMutation.isLoading },
      centered: true,
      onConfirm: async () => await removeMutation.mutateAsync(obj),
    });

  const columns = [
    columnHelper.accessor('name', {
      id: 'name',
      header: 'Nome',
    }),
    columnHelper.accessor('document', {
      id: 'document',
      header: 'CPF',
    }),
    columnHelper.accessor('phone', {
      id: 'phone',
      header: 'Telefone',
    }),
    columnHelper.accessor('email', {
      id: 'email',
      header: 'E-mail',
    }),
    columnHelper.accessor('indication', {
      id: 'indication',
      header: 'Indicação',
      cell: ({ getValue }) =>
        getValue() ? (
          <Badge color="lime">Sim</Badge>
        ) : (
          <Badge color="gray">Não</Badge>
        ),
    }),
    columnHelper.accessor((row) => row, {
      id: 'actions',
      header: '',
      cell: ({ getValue }) => (
        <Group justify="flex-end" gap="xs" align="center">
          <ActionIcon
            variant="transparent"
            size="lg"
            onClick={() => onSelect(getValue())}
          >
            <IconEdit />
          </ActionIcon>
          <ActionIcon
            variant="transparent"
            size="lg"
            onClick={() => confirmRemove(getValue())}
          >
            <IconTrash />
          </ActionIcon>
        </Group>
      ),
    }),
  ];

  return (
    <Table<Customer>
      columns={columns}
      data={data?.items || []}
      loading={loading}
      pagination={{
        total: data?.pagination.total || 1,
        onPaginate: (page) => onPaginate && onPaginate(page),
      }}
    />
  );
}
