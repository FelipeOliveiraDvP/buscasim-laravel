import { BaseQuery, PaginatedResponse } from "@/core/types";

export interface Process {
  id: number;
  process_number: string;
  description?: string;
  tribunal: string;
  is_probono?: boolean;
  amount: number;
  final_date?: string | null;
  situation_type: ProcessSituationEnum;
  legal_type: ProcessLegalEnum;
  customer: {
    id: number;
    name: string;
    phone: string;
  };
  responsible: {
    id: number;
    name: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface ProcessRequest {
  id?: number;
  process_number: string;
  tribunal: string;
  final_date?: string | null;
  is_probono?: boolean;
  payment?: {
    amount: number;
    installments?: number;
    contract_file?: string;
    has_invoice?: boolean;
    due_date: string | null;
  };
  customer_id: number | null;
  responsible_id: number | null;
  situation_type: ProcessSituationEnum | null;
  legal_type: ProcessLegalEnum | null;
}

export type ProcessListQuery = BaseQuery & {
  process_number?: string;
  legal_type?: ProcessLegalEnum | null;
  situation_type?: ProcessSituationEnum | null;
};

export type ProcessResponseType = PaginatedResponse<Process>;

export enum ProcessLegalEnum {
  Consumer,
  Civil,
  Business,
  Criminal,
  Electoral,
  Administrative,
  Medical,
  Tax,
  SocialSecurity,
  Labor,
  Union,
  InternationalBusiness,
  DigitalLaw,
  AgriculturalLaw,
  Compliance,
  EntertainmentLaw,
  PatentTrademark,
}

export enum ProcessSituationEnum {
  InitialStage,
  ExecutionStage,
  Answer,
  Reply,
  AwaitingHearing,
  AwaitingSentence,
  Appeal,
  AwaitingService,
  Finished,
}
