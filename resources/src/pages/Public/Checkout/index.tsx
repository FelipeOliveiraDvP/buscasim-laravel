import {
  Alert,
  Button,
  Container,
  Grid,
  Paper,
  SimpleGrid,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, yupResolver } from '@mantine/form';
import * as yup from 'yup';

import { CheckoutForm, CheckoutQRCode } from '@/components/Checkout';
import { OrderPaymentRequest, usePayment } from '@/core/services/orders';
import { getFormErrors } from '@/core/utils';
import classes from './styles.module.css';
import { PageLoader } from '@/components/__commons';
import { useResults } from '@/core/services/queries';

const schema = yup.object().shape({
  name: yup.string().required('Campo Obrigatório'),
  email: yup.string().required('Campo Obrigatório').email('E-mail inválido'),
  document: yup.string().required('Campo Obrigatório'),
  accept_terms: yup.boolean().oneOf([true], 'Aceite os termos par continuar'),
});

export default function CheckoutPage() {
  const [showQRCode, setShowQRCode] = useState<boolean>(false);
  const { code } = useParams();
  const { data } = useResults(code);

  const navigate = useNavigate();
  const paymentMutation = usePayment();
  const form = useForm<OrderPaymentRequest>({
    initialValues: {
      code: '',
      document: '',
      name: '',
      email: '',
      coupon: '',
      accept_terms: false,
    },
    validate: yupResolver(schema),
  });

  async function handleSubmit(values: OrderPaymentRequest) {
    try {
      await paymentMutation.mutateAsync(values);
      setShowQRCode(true);
    } catch (error) {
      form.setErrors({ ...getFormErrors(error as AxiosError) });
    }
  }

  useEffect(() => {
    if (code) form.setValues({ code: code });
    else navigate('/');
  }, [code]);

  if (!data) return <PageLoader />;

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Container className={classes.wrapper}>
        <SimpleGrid w="100%" cols={{ base: 1, md: showQRCode ? 1 : 2 }}>
          <Paper withBorder p="md">
            {showQRCode ? <CheckoutQRCode /> : <CheckoutForm form={form} />}
          </Paper>
          {!showQRCode && (
            <Paper withBorder p="md">
              <Stack>
                <Title order={3}>Pagamento</Title>
                <Table className={classes.table}>
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Td>Placa</Table.Td>
                      <Table.Th>{data?.placa}</Table.Th>
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
                <Button type="submit" loading={paymentMutation.isLoading}>
                  Pagar
                </Button>
                <Alert variant="light" color="yellow">
                  Usamos suas informações para gerar o pagamento. Seus dados
                  estão seguros e não vão ser compartilhados com terceiros.
                </Alert>
              </Stack>
            </Paper>
          )}
        </SimpleGrid>
      </Container>
    </form>
  );
}
