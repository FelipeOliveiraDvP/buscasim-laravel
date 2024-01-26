import { AxiosError } from 'axios';
import {
  Button,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import { AnchorLink } from '@/components/__commons';
import { OptionRequest, useSetOptions } from '@/core/services/options';
import { getFormErrors } from '@/core/utils';
import { IconDeviceFloppy } from '@tabler/icons-react';

export function APIPlacasForm() {
  const mutation = useSetOptions();
  const form = useForm<OptionRequest>({
    initialValues: {
      API_PLACAS_TOKEN_FREE: '',
      API_PLACAS_TOKEN_PREMIUM: '',
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
        <Title order={3}>API Placas</Title>
        <Text c="dimmed">
          Gerencie as informações necessárias para a integração com a{' '}
          <AnchorLink href="https://apiplacas.com.br" blank>
            API Placas
          </AnchorLink>
          .
        </Text>

        <form onSubmit={form.onSubmit(handleSave)}>
          <Stack>
            <TextInput
              {...form.getInputProps('API_PLACAS_TOKEN_FREE')}
              label="Token plano Free"
            />
            <TextInput
              {...form.getInputProps('API_PLACAS_TOKEN_PREMIUM')}
              label="Token plano Premium"
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
