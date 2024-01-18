import { Button, Group, Input, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSearch } from '@tabler/icons-react';
import {
  ProcessLegalEnum,
  ProcessListQuery,
  ProcessSituationEnum,
  processLegalOptions,
  processSituationOptions,
} from '@/core/services/processes';

interface Props {
  onChange: (values: ProcessListQuery) => void;
}

const initialValues: ProcessListQuery = {
  process_number: '',
  legal_type: null,
  situation_type: null,
  page: 1,
};

export function ProcessesFilters({ onChange }: Props) {
  const form = useForm<ProcessListQuery>({
    initialValues: initialValues,
  });

  function handleChange(values?: ProcessListQuery) {
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
          {...form.getInputProps('process_number')}
          placeholder="Número do processo"
          rightSection={<IconSearch />}
          onChange={(e) =>
            handleChange({
              ...form.values,
              process_number: e.target.value,
            })
          }
        />
        <Select
          {...form.getInputProps('situation_type')}
          placeholder="Situação do processo"
          data={processSituationOptions}
          onChange={(value) =>
            handleChange({
              ...form.values,
              situation_type: value as unknown as ProcessSituationEnum,
            })
          }
        />
        <Select
          {...form.getInputProps('legal_type')}
          placeholder="Área de atuação"
          data={processLegalOptions}
          onChange={(value) =>
            handleChange({
              ...form.values,
              legal_type: value as unknown as ProcessLegalEnum,
            })
          }
        />
        <Button variant="outline" type="reset" onClick={handleReset}>
          Limpar filtros
        </Button>
      </Group>
    </form>
  );
}
