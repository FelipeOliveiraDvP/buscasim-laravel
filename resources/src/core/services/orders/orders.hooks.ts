import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { getErrorMessage, showError, showSuccess } from '@/core/utils';
import ordersService from './orders.service';

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
