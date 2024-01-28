import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import {
  Alert,
  Button,
  Container,
  NumberFormatter,
  Paper,
  SimpleGrid,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import * as yup from 'yup';

import { PageLoader } from '@/components/__commons';
import { CheckoutForm, CheckoutQRCode } from '@/components/Checkout';
import { PaymentRequest, usePayment } from '@/core/services/orders';
import { useCheckoutContext } from '@/core/providers';
import { getFormErrors } from '@/core/utils';

import classes from './styles.module.css';
import { useDebouncedValue } from '@mantine/hooks';
import { useDiscount } from '@/core/services/coupons';

const schema = yup.object().shape({
  document: yup.string().required('Campo Obrigatório'),
  accept_terms: yup.boolean().oneOf([true], 'Aceite os termos para continuar'),
});

export default function CheckoutPage() {
  const [coupon, setCoupon] = useState<string>();
  const [debounced] = useDebouncedValue(coupon, 250);
  const { payment, order } = useCheckoutContext();
  const navigate = useNavigate();
  const mutation = usePayment();
  const { data: discount } = useDiscount(debounced);

  const form = useForm<PaymentRequest>({
    initialValues: {
      document: '',
      accept_terms: false,
      coupon_id: null,
      order_id: null,
    },
    validate: yupResolver(schema),
  });

  async function handleSubmit(values: PaymentRequest) {
    try {
      await mutation.mutateAsync({
        ...values,
        coupon_id: discount?.coupon_id || null,
        order_id: order ? order.order.id : null,
      });
    } catch (error) {
      form.setErrors({ ...getFormErrors(error as AxiosError) });
    }
  }

  useEffect(() => {
    if (!order) navigate('/');
  }, [order]);

  if (!order) return <PageLoader />;

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Container className={classes.wrapper}>
        <SimpleGrid w="100%" cols={{ base: 1, md: payment ? 1 : 2 }}>
          <Paper withBorder p="md">
            {payment ? <CheckoutQRCode /> : <CheckoutForm form={form} />}
          </Paper>
          {!payment && order && (
            <Paper withBorder p="md">
              <Stack>
                <Title order={3}>Pagamento</Title>
                <Table className={classes.table}>
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Td>Placa</Table.Td>
                      <Table.Th>{order.order.plate}</Table.Th>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>Subtotal</Table.Td>
                      <Table.Th>
                        <NumberFormatter
                          prefix="R$ "
                          value={order.order.total}
                          decimalScale={2}
                          thousandSeparator="."
                          decimalSeparator=","
                          fixedDecimalScale
                        />
                      </Table.Th>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>
                        <TextInput
                          placeholder="Cupom"
                          description="Possui um cupom?"
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                        />
                      </Table.Td>
                      <Table.Th>
                        <NumberFormatter
                          prefix="R$ -"
                          value={discount ? discount.discount : 0}
                          decimalScale={2}
                          thousandSeparator="."
                          decimalSeparator=","
                          fixedDecimalScale
                        />
                      </Table.Th>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>
                        <Text size="lg">Total</Text>
                      </Table.Td>
                      <Table.Th>
                        <Text size="lg">
                          <NumberFormatter
                            prefix="R$ "
                            value={
                              discount ? discount.subtotal : order.order.total
                            }
                            decimalScale={2}
                            thousandSeparator="."
                            decimalSeparator=","
                            fixedDecimalScale
                          />
                        </Text>
                      </Table.Th>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
                <Button type="submit" loading={mutation.isLoading}>
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
