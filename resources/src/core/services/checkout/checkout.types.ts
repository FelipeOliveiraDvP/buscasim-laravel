export interface CheckoutRequest {
  document: string;
  name: string;
  email: string;
  coupon?: string;
  terms: boolean;
}
