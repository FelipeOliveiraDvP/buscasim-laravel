export interface Coupon {
  id: number;
  code: string;
  percentage: number;
  expiration: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}
