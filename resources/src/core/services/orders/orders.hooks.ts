import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { getErrorMessage, showError } from '@/core/utils';
import { OrderListQuery, OrderListResponse } from '.';
import { useCheckoutContext } from '@/core/providers';
import { useNavigate } from 'react-router-dom';

import ordersService from './orders.service';

export function useCheckout() {
  const { setOrder } = useCheckoutContext();
  const navigate = useNavigate();

  return useMutation(ordersService.checkout, {
    onSuccess(data) {
      setOrder(data);
      navigate('/pagamento');
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
    },
  });
}

export function usePayment() {
  const { setPayment } = useCheckoutContext();

  return useMutation(ordersService.payment, {
    onSuccess(data) {
      setPayment(data);
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
    },
  });
}

export function useOrders(query?: OrderListQuery) {
  return useQuery<OrderListResponse, AxiosError>(
    ['orders', { ...query }],
    () => ordersService.list({ ...query }),
    {
      onError(error) {
        showError(getErrorMessage(error as AxiosError));
      },
    }
  );
}
