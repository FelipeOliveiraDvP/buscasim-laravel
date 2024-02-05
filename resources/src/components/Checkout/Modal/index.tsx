import { AxiosError } from 'axios';
import {
  Button,
  Divider,
  Group,
  Modal,
  ModalProps,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';

import { getFormErrors } from '@/core/utils';
import { CheckoutRequest, useCheckout } from '@/core/services/orders';
import { IconLockOpen } from '@tabler/icons-react';

type Props = ModalProps & {
  plate: string;
};

const schema = Yup.object().shape({
  name: Yup.string().required('Informe o seu nome'),
  email: Yup.string()
    .required('Informe seu e-mail')
    .email('Informe um e-mail válido'),
});

export function CheckoutModal({ plate, ...props }: Props) {
  const mutation = useCheckout();

  const form = useForm<CheckoutRequest>({
    validate: yupResolver(schema),
    initialValues: {
      name: '',
      email: '',
      plate,
    },
  });

  async function handleSave(values: CheckoutRequest) {
    try {
      await mutation.mutateAsync(values);

      handleClose();
    } catch (error) {
      form.setErrors({ ...getFormErrors(error as AxiosError) });
    }
  }

  function handleClose() {
    form.reset();
    props.onClose();
  }

  return (
    <Modal
      {...props}
      title={
        <Text
          component="span"
          inherit
          variant="gradient"
          size="lg"
          fw="bold"
          gradient={{ from: 'blue.5', to: 'blue.9' }}
        >
          Você está quase lá
        </Text>
      }
      centered
      onClose={handleClose}
    >
      <form onSubmit={form.onSubmit((values) => handleSave(values))}>
        <Stack gap="md">
          <Text>
            Antes de continuar, precisamos que você nos informe seu nome e
            e-mail.
          </Text>
          <TextInput
            {...form.getInputProps('name')}
            label="Seu nome"
            placeholder="Informe seu nome completo"
            withAsterisk
          />
          <TextInput
            {...form.getInputProps('email')}
            label="Seu e-mail"
            placeholder="EX: exemplo@email.com"
            withAsterisk
          />

          <Divider />
          <Group gap="sm" justify="flex-end">
            <Button
              type="submit"
              loading={mutation.isLoading}
              size="lg"
              fullWidth
              leftSection={<IconLockOpen />}
            >
              Liberar informações
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
