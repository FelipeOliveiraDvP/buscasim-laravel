import { useEffect } from 'react';
import {
  Button,
  Divider,
  Flex,
  Grid,
  Group,
  Modal,
  ModalProps,
  Select,
  Stack,
  Switch,
  Text,
  TextInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import {
  Customer,
  CustomerRequest,
  useCreateCustomer,
  useUpdateCustomer,
} from '@/core/services/customers';
import { getBrazilStateOptions } from '@/core/utils/getBrazilStateOptions';
import { getFormErrors } from '@/core/utils';
import { AxiosError } from 'axios';
import { MaskedInput } from '@/components/__commons';

type Props = ModalProps & {
  customer?: Customer;
};

const schema = Yup.object().shape({
  name: Yup.string().required('Campo Obrigatório'),
  document: Yup.string().required('Campo Obrigatório'),
  email: Yup.string()
    .email('Informe um e-mail válido')
    .required('Campo Obrigatório'),
  phone: Yup.string().required('Campo Obrigatório'),
  birth_date: Yup.date()
    .required('Campo Obrigatório')
    .max(new Date(), 'Você não pode selecionar uma data futura'),
  address: Yup.object().shape({
    zip: Yup.string().min(8, 'Informe um CEP válido'),
    street: Yup.string().required('Campo Obrigatório'),
    number: Yup.string().required('Campo Obrigatório'),
    city: Yup.string().required('Campo Obrigatório'),
    state: Yup.string()
      .length(2, 'Informe uma UF válida')
      .required('Campo Obrigatório'),
  }),
  indication: Yup.object().shape({
    email: Yup.string().email('Informe um e-mail válido'),
  }),
});

export function CustomerModal({ customer, ...props }: Props) {
  const createMutation = useCreateCustomer();
  const updateMutation = useUpdateCustomer();

  const form = useForm<CustomerRequest>({
    validate: yupResolver(schema),
    initialValues: {
      name: '',
      document: '',
      email: '',
      phone: '',
      birth_date: null,
      address: {
        zip: '',
        street: '',
        number: '',
        city: '',
        state: '',
        complement: '',
      },
      is_indication: false,
      indication: {
        name: '',
        email: '',
        phone: '',
      },
    },
  });

  async function handleSave(values: CustomerRequest) {
    try {
      if (customer) {
        await updateMutation.mutateAsync({ ...values, id: customer.id });
      } else {
        await createMutation.mutateAsync(values);
      }

      handleClose();
    } catch (error) {
      form.setErrors({ ...getFormErrors(error as AxiosError) });
    }
  }

  function handleClose() {
    form.reset();
    props.onClose();
  }

  useEffect(() => {
    if (customer) {
      form.setValues({
        ...customer,
        birth_date: dayjs(customer.birth_date).toDate(),
        is_indication: !!customer.indication,
        indication: customer.indication
          ? { ...customer.indication }
          : {
              name: '',
              email: '',
              phone: '',
            },
      });
    }
  }, [customer]);

  return (
    <Modal
      {...props}
      title={customer ? 'Editar Cliente' : 'Novo Cliente'}
      centered
      size="xl"
      onClose={handleClose}
    >
      <form onSubmit={form.onSubmit((values) => handleSave(values))}>
        <Stack gap="md">
          <Grid>
            <Grid.Col span={12}>
              <Divider mb="sm" />
              <Text fw={500} size="sm">
                Dados Gerais
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
              <TextInput
                {...form.getInputProps('name')}
                label="Nome"
                placeholder="Nome do cliente"
                withAsterisk
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <MaskedInput
                {...form.getInputProps('document')}
                label="CPF"
                placeholder="EX: 000.000.000-00"
                withAsterisk
                mask="cpf"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <MaskedInput
                {...form.getInputProps('phone')}
                label="Telefone"
                placeholder="EX: (00) 0000 0000"
                withAsterisk
                mask="phone"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <TextInput
                {...form.getInputProps('email')}
                label="E-mail"
                placeholder="cliente@exemplo.com"
                withAsterisk
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, lg: 4 }}>
              <DateInput
                {...form.getInputProps('birth_date')}
                label="Data de Nascimento"
                placeholder="00/00/0000"
                valueFormat="DD/MM/YYYY"
                withAsterisk
                clearable
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <Divider mb="sm" />
              <Text fw={600} size="sm">
                Endereço
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <MaskedInput
                {...form.getInputProps('address.zip')}
                label="CEP"
                placeholder="EX: 00000-000"
                withAsterisk
                mask="cep"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <TextInput
                {...form.getInputProps('address.street')}
                label="Endereço"
                placeholder="EX: Av. Paulista"
                withAsterisk
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                {...form.getInputProps('address.number')}
                label="Número"
                placeholder="EX: 000"
                withAsterisk
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                {...form.getInputProps('address.city')}
                label="Cidade"
                placeholder="EX: São Paulo"
                withAsterisk
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Select
                {...form.getInputProps('address.state')}
                label="Estado"
                placeholder="EX: SP"
                withAsterisk
                data={getBrazilStateOptions()}
                clearable
                searchable
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
              <TextInput
                {...form.getInputProps('address.complement')}
                label="Complemento"
                placeholder="EX: Sala 54"
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Divider mb="sm" />
              <Flex justify="space-between" align="center">
                <Text fw={600} size="sm">
                  Cliente por indicação?
                </Text>
                <Switch
                  {...form.getInputProps('is_indication', { type: 'checkbox' })}
                />
              </Flex>
            </Grid.Col>
            {form.values.is_indication && (
              <>
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <TextInput
                    {...form.getInputProps('indication.name')}
                    label="Nome de quem indicou"
                    placeholder="Informe o nome"
                    withAsterisk
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <MaskedInput
                    {...form.getInputProps('indication.phone')}
                    label="Telefone"
                    placeholder="EX: (00) 0000 0000"
                    withAsterisk
                    mask="phone"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <TextInput
                    {...form.getInputProps('indication.email')}
                    label="E-mail"
                    placeholder="cliente@exemplo.com"
                    withAsterisk
                  />
                </Grid.Col>
              </>
            )}
          </Grid>

          <Divider />
          <Group gap="sm" justify="flex-end">
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              loading={createMutation.isLoading || updateMutation.isLoading}
            >
              Salvar Cliente
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
