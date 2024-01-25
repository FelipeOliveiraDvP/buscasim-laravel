import { UseFormReturnType } from '@mantine/form';
import { Checkbox, Stack, Text, TextInput, Title } from '@mantine/core';
import { AnchorLink, MaskedInput } from '@/components/__commons';
import { OrderRequest } from '@/core/services/orders';

interface Props {
  form: UseFormReturnType<OrderRequest>;
}

export function CheckoutForm({ form }: Props) {
  return (
    <Stack>
      <Title order={3}>Suas informações</Title>
      <TextInput
        {...form.getInputProps('name')}
        label="Nome"
        placeholder="Seu nome"
      />
      <TextInput
        {...form.getInputProps('email')}
        label="E-mail"
        placeholder="EX: exemplo@email.com"
      />
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
