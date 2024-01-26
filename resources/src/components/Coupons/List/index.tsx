import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Group, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';

import { Table } from '@/components/__commons';
import {
  Coupon,
  CouponListResponse,
  useRemoveCoupon,
} from '@/core/services/coupons';

interface Props {
  data?: CouponListResponse;
  loading?: boolean;
  onSelect: (obj: Coupon) => void;
  onPaginate?: (page: number) => void;
}

export function CouponsList({ data, loading, onSelect, onPaginate }: Props) {
  const removeMutation = useRemoveCoupon();

  const confirmRemove = (obj: Coupon) =>
    modals.openConfirmModal({
      title: 'Remover Cupon',
      children: <Text size="sm">Deseja realmente remover esse cupon?</Text>,
      labels: { confirm: 'Remover', cancel: 'Cancelar' },
      confirmProps: { loading: removeMutation.isLoading },
      centered: true,
      onConfirm: async () =>
        await removeMutation.mutateAsync({
          ...obj,
          expiration: dayjs(obj.expiration).toDate(),
        }),
    });

  const columnHelper = createColumnHelper<Coupon>();

  const columns = [
    columnHelper.accessor('code', {
      id: 'code',
      header: 'Código do cupon',
    }),
    columnHelper.accessor('expiration', {
      id: 'expiration',
      header: 'Data de vencimento',
      cell: ({ getValue }) => dayjs(getValue()).format('DD/MM/YYYY'),
    }),
    columnHelper.accessor('percentage', {
      id: 'percentage',
      header: 'Desconto',
      cell: ({ getValue }) => `${getValue() / 100}%`,
    }),
    columnHelper.accessor('created_at', {
      id: 'created_at',
      header: 'Data da criação',
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
    <Table<Coupon>
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
