import { Button, Group, Input, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSearch } from '@tabler/icons-react';
import { CustomerListQuery } from '@/core/services/customers';

interface Props {
  onChange: (values: CustomerListQuery) => void;
}

const initialValues: CustomerListQuery = {
  name: '',
  document: '',
  page: 1,
};

export function CustomersFilters({ onChange }: Props) {
  const form = useForm<CustomerListQuery>({
    initialValues: initialValues,
  });

  function handleChange(values?: CustomerListQuery) {
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
          {...form.getInputProps('name')}
          placeholder="Pesquise por nome"
          rightSection={<IconSearch />}
          onChange={(e) =>
            handleChange({ ...form.values, name: e.target.value })
          }
        />
        <Input
          {...form.getInputProps('document')}
          placeholder="Pesquise por CPF"
          rightSection={<IconSearch />}
          onChange={(e) =>
            handleChange({ ...form.values, document: e.target.value })
          }
        />
        <Button variant="outline" type="reset" onClick={handleReset}>
          Limpar filtros
        </Button>
      </Group>
    </form>
  );
}
