import { Button, Group, Input, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSearch } from '@tabler/icons-react';
import { TaskListQuery } from '@/core/services/tasks';
import { UserSelect } from '@/components/Users';

interface Props {
  onChange: (values: TaskListQuery) => void;
}

const initialValues: TaskListQuery = {
  title: '',
  responsible_id: null,
  page: 1,
};

export function TasksFilters({ onChange }: Props) {
  const form = useForm<TaskListQuery>({
    initialValues: initialValues,
  });

  function handleChange(values?: TaskListQuery) {
    form.setValues({ ...values });
    onChange({ ...values });
  }

  function handleReset() {
    form.reset();
    onChange(initialValues);
  }

  return (
    <form onReset={handleReset}>
      <Group justify="flex-end" gap="sm">
        <Input
          {...form.getInputProps('title')}
          placeholder="Pesquise por título"
          rightSection={<IconSearch />}
          onChange={(e) =>
            handleChange({ ...form.values, title: e.target.value })
          }
        />
        <UserSelect
          {...form.getInputProps('responsible_id')}
          placeholder="Pesquise por responsável"
          onChange={(value) =>
            handleChange({ ...form.values, responsible_id: Number(value) })
          }
        />
        <Button variant="outline" type="reset" onClick={handleReset}>
          Limpar filtros
        </Button>
      </Group>
    </form>
  );
}
