import { UseFormReturnType } from '@mantine/form';
import { Checkbox, Stack, Text, Title } from '@mantine/core';

import { AnchorLink, MaskedInput } from '@/components/__commons';
import { PaymentRequest } from '@/core/services/orders';
import { useCheckoutContext } from '@/core/providers';

interface Props {
  form: UseFormReturnType<PaymentRequest>;
}

export function CheckoutForm({ form }: Props) {
  const { order } = useCheckoutContext();

  return (
    <Stack>
      <Title order={3}>Suas informações</Title>
      <Text fw="bolder">Nome</Text>
      <Text c="dimmed">{order?.customer.name}</Text>

      <Text fw="bolder">E-mail</Text>
      <Text c="dimmed">{order?.customer.email}</Text>

      <MaskedInput
        {...form.getInputProps('document')}
        mask="cpf"
        label="CPF"
        placeholder="000.000.000-00"
      />
      <Checkbox
        {...form.getInputProps('accept_terms', { type: 'checkbox' })}
        label={
          <Text>
            Aceito os termos e condições presentes na nossa{' '}
            <AnchorLink href="/politica-de-privacidade" blank>
              política de privacidade
            </AnchorLink>
          </Text>
        }
      />
    </Stack>
  );
}
