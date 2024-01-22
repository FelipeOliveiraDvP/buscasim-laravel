import api from '@/core/config/axios';
import { OrderPaymentRequest } from '.';

export default {
  async payment(data: OrderPaymentRequest): Promise<{ message: string }> {
    return api.post(`/api/orders/payment`, data);
  },
};
