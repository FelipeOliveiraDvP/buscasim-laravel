export interface OrderPaymentRequest {
  code: string;
  name: string;
  email: string;
  document: string;
  accept_terms: boolean;
  coupon?: string;
}
