import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Badge, Group } from '@mantine/core';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { Table } from '@/components/__commons';
import {
  Process,
  ProcessResponseType,
  getLegalLabel,
  getSituationLabel,
} from '@/core/services/processes';

interface Props {
  data?: ProcessResponseType;
  loading?: boolean;
  preview?: boolean;
  onSelect?: (item: Process) => void;
  onPaginate?: (page: number) => void;
}

export function ProcessesList({
  data,
  loading,
  preview,
  onSelect,
  onPaginate,
}: Props) {
  const columnHelper = createColumnHelper<Process>();

  const columns = [
    columnHelper.accessor('process_number', {
      id: 'process_number',
      header: 'Número do Processo',
    }),
    columnHelper.accessor('customer.name', {
      id: 'customer.name',
      header: 'Cliente',
    }),
    columnHelper.accessor('situation_type', {
      id: 'situation_type',
      header: 'Situação',
      cell: ({ getValue }) => getSituationLabel(getValue()),
    }),
    columnHelper.accessor('legal_type', {
      id: 'legal_type',
      header: 'Área de Atuação',
      cell: ({ getValue }) => getLegalLabel(getValue()),
    }),
    columnHelper.accessor((row) => row, {
      id: 'actions',
      header: '',
      cell: ({ getValue }) =>
        preview ? (
          <ActionIcon
            variant="transparent"
            size="lg"
            onClick={() => onSelect && onSelect(getValue())}
          >
            <IconEye />
          </ActionIcon>
        ) : (
          <Group justify="flex-end" gap="xs" align="center">
            <ActionIcon
              variant="transparent"
              size="lg"
              onClick={() => onSelect && onSelect(getValue())}
            >
              <IconEdit />
            </ActionIcon>
            <ActionIcon
              variant="transparent"
              size="lg"
              onClick={() => console.log('Remover: ', getValue())}
            >
              <IconTrash />
            </ActionIcon>
          </Group>
        ),
    }),
  ];

  return (
    <Table<Process>
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
