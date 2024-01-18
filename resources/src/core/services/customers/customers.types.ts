import { BaseQuery, PaginatedResponse } from "@/core/types";

export interface Customer {
  id: number;
  name: string;
  document: string;
  email: string;
  phone: string;
  birth_date: string | null;
  address: {
    zip: string;
    street: string;
    number: string;
    city: string;
    state: string;
    complement?: string | null;
  };
  indication: {
    name: string;
    email: string;
    phone: string;
  } | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface CustomerRequest {
  id?: number;
  name: string;
  document: string;
  email: string;
  phone: string;
  birth_date: Date | null;
  address: {
    zip: string;
    street: string;
    number: string;
    city: string;
    state: string;
    complement?: string | null;
  };
  is_indication?: boolean;
  indication?: {
    name: string;
    email: string;
    phone: string;
  } | null;
}

export type CustomerListQuery = BaseQuery & {
  name?: string;
  document?: string;
};

export type CustomerListResponse = PaginatedResponse<Customer>;
