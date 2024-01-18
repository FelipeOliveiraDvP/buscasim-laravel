export interface PaymentOrder {
  id: number;
  process_id: number;
  installments: number;
  contract_file?: string;
  has_invoice: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface Installment {
  id: number;
  order_id: number;
  is_paid: boolean;
  due_date: string | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}
