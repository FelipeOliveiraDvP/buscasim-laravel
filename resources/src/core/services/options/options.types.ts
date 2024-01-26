export interface Option {
  id: number;
  key: OptionsType;
  value: any;
}

export type OptionRequest = Partial<Record<OptionsType, any>>;

export type OptionsType =
  | 'API_PLACAS_TOKEN_FREE'
  | 'API_PLACAS_TOKEN_PREMIUM'
  | 'PRICE';
