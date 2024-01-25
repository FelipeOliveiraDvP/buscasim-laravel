import api from '@/core/config/axios';
import { ApiResponse } from '@/core/types';
import { OrderRequest, OrderListQuery, OrderListResponse } from '.';

export default {
  async payment(data: OrderRequest): Promise<ApiResponse> {
    return api.post(`/api/orders/payment`, data);
  },

  async list(params?: OrderListQuery): Promise<OrderListResponse> {
    return api.get(`/api/orders`, { params });
  },
};
