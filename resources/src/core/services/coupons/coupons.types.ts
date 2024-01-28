import { BaseQuery, PaginatedResponse } from '@/core/types';

export interface Coupon {
  id: number;
  code: string;
  percentage: number;
  expiration: Date | string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface CouponRequest {
  id?: number;
  code: string;
  percentage: number;
  expiration: Date | null;
}

export type CouponListQuery = BaseQuery & {
  code?: string;
  expiration?: Date | null;
};

export type CouponListResponse = PaginatedResponse<Coupon>;

export interface CouponDiscountResponse {
  coupon_id: number | null;
  discount: number;
  subtotal: number;
}
