import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { getErrorMessage, showError } from '@/core/utils';
import { OrderListQuery, OrderListResponse } from '.';
import { useSearchResults } from '@/core/providers';
import ordersService from './orders.service';

export function useCheckout() {
  const { setSearchResults } = useSearchResults();
  const navigate = useNavigate();

  return useMutation(ordersService.checkout, {
    onSuccess(order) {
      setSearchResults({ order });
      navigate('/pagamento');
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
    },
  });
}

export function usePayment() {
  const { setSearchResults } = useSearchResults();

  return useMutation(ordersService.payment, {
    onSuccess(payment) {
      setSearchResults({ payment });
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
