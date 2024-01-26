import { AxiosError } from 'axios';
import {
  Button,
  Group,
  NumberInput,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import { OptionRequest, useSetOptions } from '@/core/services/options';
import { getFormErrors } from '@/core/utils';
import { IconDeviceFloppy } from '@tabler/icons-react';

export function PriceForm() {
  const mutation = useSetOptions();
  const form = useForm<OptionRequest>({
    initialValues: {
      PRICE: '',
    },
  });

  async function handleSave(values: OptionRequest) {
    try {
      await mutation.mutateAsync(values);
    } catch (error) {
      form.setErrors({ ...getFormErrors(error as AxiosError) });
    }
  }

  return (
    <Paper p="md" withBorder>
      <Stack>
        <Title order={3}>Valor da consulta</Title>
        <Text c="dimmed">Gerencie o valor da consulta premium na API.</Text>

        <form onSubmit={form.onSubmit(handleSave)}>
          <Stack>
            <NumberInput
              {...form.getInputProps('PRICE')}
              min={0}
              prefix="R$ "
              decimalScale={2}
              decimalSeparator=","
              thousandSeparator="."
            />

            <Group>
              <Button
                type="submit"
                leftSection={<IconDeviceFloppy />}
                loading={mutation.isLoading}
              >
                Salvar
              </Button>
            </Group>
          </Stack>
        </form>
      </Stack>
    </Paper>
  );
}
