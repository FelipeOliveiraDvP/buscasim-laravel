import api from '@/core/config/axios';
import {
  Order,
  CheckoutRequest,
  CheckoutResponse,
  OrderListQuery,
  OrderListResponse,
  PaymentRequest,
  PaymentResponse,
} from '.';

export default {
  async checkout(data: CheckoutRequest): Promise<CheckoutResponse> {
    return api.post(`/api/orders/checkout`, data);
  },

  async payment(data: PaymentRequest): Promise<PaymentResponse> {
    return api.post(`/api/orders/payment`, data);
  },

  async list(params?: OrderListQuery): Promise<OrderListResponse> {
    return api.get(`/api/orders`, { params });
  },

  async detail(id?: number): Promise<Order> {
    return api.get(`/api/orders/${id}`);
  },
};
