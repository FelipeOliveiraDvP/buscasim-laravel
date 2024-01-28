import { BaseQuery, PaginatedResponse } from '@/core/types';
import { Coupon } from '../coupons';
import { User } from '../users';
import { SearchResult } from '../search';

export interface Order {
  id: number;
  total: number;
  status: OrderStatusType;
  plate: string;
  data: SearchResult | null;
  user: User;
  coupon: Coupon | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface CheckoutRequest {
  name: string;
  email: string;
  plate: string;
}

export interface CheckoutResponse {
  customer: {
    id: number;
    name: string;
    email: string;
  };
  order: {
    id: number;
    total: number;
    plate: string;
  };
}

export interface PaymentRequest {
  order_id: number | null;
  document: string;
  coupon_id: number | null;
  accept_terms: boolean;
}

export interface PaymentResponse {
  customer: {
    id: number;
    name: string;
    email: string;
  };
  qrcode: string;
  code: string;
}

export type OrderStatusType = 'pending' | 'confirmed' | 'cancelled';

export type OrderListQuery = BaseQuery & {
  date?: Date | null;
  status?: OrderStatusType | null;
};

export type OrderListResponse = PaginatedResponse<Order>;
