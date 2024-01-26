import { Button, Group, Input } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSearch } from '@tabler/icons-react';
import { CouponListQuery } from '@/core/services/coupons';
import { DateInput } from '@mantine/dates';

interface Props {
  onChange: (values: CouponListQuery) => void;
}

const initialValues: CouponListQuery = {
  code: '',
  expiration: null,
  page: 1,
};

export function CouponsFilters({ onChange }: Props) {
  const form = useForm<CouponListQuery>({
    initialValues: initialValues,
  });

  function handleChange(values?: CouponListQuery) {
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
          {...form.getInputProps('code')}
          placeholder="Pesquise por código"
          rightSection={<IconSearch />}
          onChange={(e) =>
            handleChange({ ...form.values, code: e.target.value })
          }
        />
        <DateInput
          {...form.getInputProps('date')}
          placeholder="Pesquise por data"
          clearable
          onChange={(date) =>
            handleChange({ ...form.values, expiration: date })
          }
        />
        <Button variant="outline" type="reset" onClick={handleReset}>
          Limpar filtros
        </Button>
      </Group>
    </form>
  );
}
