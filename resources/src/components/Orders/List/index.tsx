import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';

import { Table } from '@/components/__commons';
import {
  Order,
  OrderListResponse,
  getOrderStatus,
} from '@/core/services/orders';
import { moneyFormat } from '@/core/utils';

interface Props {
  data?: OrderListResponse;
  loading?: boolean;
  onSelect?: (obj: Order) => void;
  onPaginate?: (page: number) => void;
}

export function OrdersList({ data, loading, onPaginate }: Props) {
  const columnHelper = createColumnHelper<Order>();

  const columns = [
    columnHelper.accessor('total', {
      id: 'total',
      header: 'Valor Total',
      cell: ({ getValue }) => moneyFormat(getValue()),
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: 'Status',
      cell: ({ getValue }) => getOrderStatus(getValue()),
    }),
    columnHelper.accessor('query.plate', {
      id: 'query.plate',
      header: 'Placa',
    }),
    columnHelper.accessor('coupon', {
      id: 'coupon',
      header: 'Cupon',
      cell: ({ getValue }) =>
        getValue()
          ? `${getValue()?.code} - ${(getValue()?.percentage || 0) / 100}%`
          : '',
    }),
    columnHelper.accessor('created_at', {
      id: 'created_at',
      header: 'Placa',
      cell: ({ getValue }) => dayjs(getValue()).format('DD/MM/YYYY'),
    }),
  ];

  return (
    <Table<Order>
      columns={columns}
      data={data?.items || []}
      loading={loading}
      pagination={{
        total: data?.pagination.last_page || 1,
        onPaginate: (page) => onPaginate && onPaginate(page),
      }}
    />
  );
}
