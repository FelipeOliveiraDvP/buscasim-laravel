import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Badge, Group, Text } from '@mantine/core';
import { Table } from '@/components/__commons';
import {
  User,
  UserListResponse,
  getUserRole,
  useRemoveUser,
} from '@/core/services/users';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { modals } from '@mantine/modals';

interface Props {
  data?: UserListResponse;
  loading?: boolean;
  onSelect: (obj: User) => void;
  onPaginate?: (page: number) => void;
}

export function UsersList({ data, loading, onSelect, onPaginate }: Props) {
  const removeMutation = useRemoveUser();

  const confirmRemove = (obj: User) =>
    modals.openConfirmModal({
      title: 'Remover Usuário',
      children: <Text size="sm">Deseja realmente remover esse usuário?</Text>,
      labels: { confirm: 'Remover', cancel: 'Cancelar' },
      confirmProps: { loading: removeMutation.isLoading },
      centered: true,
      onConfirm: async () => await removeMutation.mutateAsync(obj),
    });

  const columnHelper = createColumnHelper<User>();

  const columns = [
    columnHelper.accessor('name', {
      id: 'name',
      header: 'Nome',
    }),
    columnHelper.accessor('email', {
      id: 'email',
      header: 'E-mail',
    }),
    columnHelper.accessor('role', {
      id: 'role',
      header: 'Tipo de Usuário',
      cell: ({ getValue }) => getUserRole(getValue()),
    }),
    columnHelper.accessor('is_active', {
      id: 'is_active',
      header: 'Tipo de Usuário',
      cell: ({ getValue }) => (
        <Badge color={getValue() ? 'lime' : 'gray'}>
          {getValue() ? 'Ativo' : 'Inativo'}
        </Badge>
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
    <Table<User>
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
