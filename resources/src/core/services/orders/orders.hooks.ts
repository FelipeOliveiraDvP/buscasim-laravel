import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { getErrorMessage, showError, showSuccess } from '@/core/utils';
import { OrderListQuery, OrderListResponse } from '.';
import ordersService from './orders.service';

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

export function usePayment() {
  return useMutation(ordersService.payment, {
    onSuccess(data) {
      showSuccess(data.message);
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
    },
  });
}
