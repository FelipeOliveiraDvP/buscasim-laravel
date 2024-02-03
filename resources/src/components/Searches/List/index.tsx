import { createColumnHelper } from '@tanstack/react-table';
import { Order, OrderListResponse } from '@/core/services/orders';
import { moneyFormat } from '@/core/utils';
import dayjs from 'dayjs';
import { Table } from '@/components/__commons';
import { ActionIcon, Group, Paper } from '@mantine/core';
import { IconEye } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useSearchResults } from '@/core/providers';
import { SearchResult } from '@/core/services/search';

interface Props {
  data?: OrderListResponse;
  loading?: boolean;
  onPaginate?: (page: number) => void;
}

export function SearchesList({ data, loading, onPaginate }: Props) {
  const navigate = useNavigate();
  const { setSearchResults } = useSearchResults();
  const columnHelper = createColumnHelper<Order>();

  const columns = [
    columnHelper.accessor('id', {
      id: 'order_id',
      header: 'N° do pedido',
    }),
    columnHelper.accessor('total', {
      id: 'total',
      header: 'Valor Total',
      cell: ({ getValue }) => moneyFormat(getValue()),
    }),
    columnHelper.accessor('plate', {
      id: 'plate',
      header: 'Placa',
    }),
    columnHelper.accessor('coupon', {
      id: 'coupon',
      header: 'Cupom',
      cell: ({ getValue }) => (getValue() ? getValue()?.code : ''),
    }),
    columnHelper.accessor('created_at', {
      id: 'created_at',
      header: 'Data do pedido',
      cell: ({ getValue }) => dayjs(getValue()).format('DD/MM/YYYY'),
    }),
    columnHelper.accessor('updated_at', {
      id: 'updated_at',
      header: 'Data do pagamento',
      cell: ({ getValue }) => dayjs(getValue()).format('DD/MM/YYYY'),
    }),
    columnHelper.accessor((row) => row, {
      id: 'actions',
      header: '',
      cell: ({ getValue }) => (
        <Group justify="flex-end" gap="xs" align="center">
          <ActionIcon
            variant="transparent"
            size="lg"
            onClick={() => handleViewResults(getValue())}
          >
            <IconEye />
          </ActionIcon>
        </Group>
      ),
    }),
  ];

  function handleViewResults(order: Order) {
    setSearchResults({
      results: JSON.parse(order.data as unknown as string) as SearchResult,
      premium: true,
    });
    navigate('/resultados');
  }

  return (
    <Paper withBorder p="md" w="100%">
      <Table<Order>
        columns={columns}
        data={data?.items || []}
        loading={loading}
        pagination={{
          total: data?.pagination.last_page || 1,
          onPaginate: (page) => onPaginate && onPaginate(page),
        }}
      />
    </Paper>
  );
}
