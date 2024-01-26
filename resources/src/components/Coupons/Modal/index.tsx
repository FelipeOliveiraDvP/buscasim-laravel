import { useEffect } from 'react';
import { AxiosError } from 'axios';
import {
  Button,
  Divider,
  Group,
  Modal,
  ModalProps,
  NumberInput,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import dayjs from 'dayjs';
import * as Yup from 'yup';

import {
  Coupon,
  CouponRequest,
  useCreateCoupon,
  useUpdateCoupon,
} from '@/core/services/coupons';
import { getFormErrors } from '@/core/utils';
import { DateInput } from '@mantine/dates';

type Props = ModalProps & {
  coupon?: Coupon;
};

const schema = Yup.object().shape({
  code: Yup.string()
    .required('Campo Obrigatório')
    .uppercase('O código deve possuir letras maiúsculas e números'),
  expiration: Yup.date()
    .required('Campo Obrigatório')
    .min(
      dayjs().add(1, 'day').toDate(),
      'Informe um data de vencimento maior que o dia atual'
    ),
  percentage: Yup.number()
    .required('Campo Obrigatório')
    .min(1, 'Informe um valor maior que 0')
    .max(100, 'Informe um valor menor que 100'),
});

export function CouponModal({ coupon, ...props }: Props) {
  const createMutation = useCreateCoupon();
  const updateMutation = useUpdateCoupon();

  const form = useForm<CouponRequest>({
    validate: yupResolver(schema),
    initialValues: {
      code: '',
      expiration: null,
      percentage: 0,
    },
  });

  async function handleSave(values: CouponRequest) {
    try {
      if (coupon) {
        await updateMutation.mutateAsync({ ...values, id: coupon.id });
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
    if (coupon) {
      form.setValues({
        code: coupon.code,
        percentage: coupon.percentage,
        expiration: dayjs(coupon.expiration).toDate(),
      });
    }
  }, [coupon]);

  return (
    <Modal
      {...props}
      title={coupon ? 'Editar Cupon' : 'Novo Cupon'}
      centered
      onClose={handleClose}
    >
      <form onSubmit={form.onSubmit(handleSave)}>
        <Stack gap="md">
          <TextInput
            {...form.getInputProps('code')}
            label="Código do cupon"
            placeholder="EX: DESCONTO10"
            withAsterisk
          />
          <NumberInput
            {...form.getInputProps('percentage')}
            label="Desconto %"
            placeholder="Informe a porcentagem de desconto"
            withAsterisk
            min={0}
            max={100}
          />
          <DateInput
            {...form.getInputProps('expiration')}
            placeholder="Data de vencimento"
            clearable
            withAsterisk
            valueFormat="DD/MM/YYYY"
          />
          <Divider />
          <Group gap="sm" justify="flex-end">
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              loading={createMutation.isLoading || updateMutation.isLoading}
            >
              Salvar Cupon
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
