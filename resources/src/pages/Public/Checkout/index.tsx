import {
  Alert,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useState } from 'react';
import { useForm, yupResolver } from '@mantine/form';
import * as yup from 'yup';

import { CheckoutForm, CheckoutQRCode } from '@/components/Checkout';
import { CheckoutRequest } from '@/core/services/checkout';
import classes from './styles.module.css';

const schema = yup.object().shape({
  document: yup.string().required('Campo Obrigatório'),
  name: yup.string().required('Campo Obrigatório'),
  email: yup.string().required('Campo Obrigatório').email('E-mail inválido'),
  terms: yup.boolean().oneOf([true], 'Aceite os termos par continuar'),
});

export default function CheckoutPage() {
  const [showQRCode, setShowQRCode] = useState<boolean>(false);
  const form = useForm<CheckoutRequest>({
    initialValues: {
      document: '',
      name: '',
      email: '',
      coupon: '',
      terms: false,
    },
    validate: yupResolver(schema),
  });

  function handleSubmit(values: CheckoutRequest) {
    console.log(values);
    setShowQRCode(true);
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Container className={classes.wrapper}>
        <Grid w="100%">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper withBorder p="md">
              {showQRCode ? <CheckoutQRCode /> : <CheckoutForm form={form} />}
            </Paper>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper withBorder p="md">
              <Stack>
                <Title order={3}>Pagamento</Title>
                <Table className={classes.table}>
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Td>Placa</Table.Td>
                      <Table.Th>AAA0000</Table.Th>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>Subtotal</Table.Td>
                      <Table.Th>R$ 30,00</Table.Th>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>
                        <TextInput
                          {...form.getInputProps('coupon')}
                          placeholder="Cupom"
                          description="Possui um cupom?"
                        />
                      </Table.Td>
                      <Table.Th>R$ 0,00</Table.Th>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>
                        <Text size="lg">Total</Text>
                      </Table.Td>
                      <Table.Th>
                        <Text size="lg">R$ 30,00</Text>
                      </Table.Th>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
                <Button type="submit">Pagar</Button>
                <Alert variant="light" color="yellow">
                  Usamos suas informações para gerar o pagamento. Seus dados
                  estão seguros e não vão ser compartilhados com terceiros.
                </Alert>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </form>
  );
}
