import { BaseQuery, PaginatedResponse } from '@/core/types';
import { Coupon } from '../coupons';
import { Query } from '../queries';
import { User } from '../users';

export interface Order {
  id: number;
  total: number;
  status: OrderStatusType;
  query: Query;
  user: User;
  coupon: Coupon | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface OrderRequest {
  code: string;
  name: string;
  email: string;
  document: string;
  accept_terms: boolean;
  coupon?: string;
}

export type OrderStatusType = 'pending' | 'confirmed' | 'cancelled';

export type OrderListQuery = BaseQuery & {
  date?: Date | null;
  status?: OrderStatusType | null;
};

export type OrderListResponse = PaginatedResponse<Order>;
