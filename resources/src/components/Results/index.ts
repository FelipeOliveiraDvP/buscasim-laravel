import { QueryResult } from '@/core/services/query';

export interface ResultInfoProps {
  data: QueryResult;
  show?: boolean;
}

export * from './FreeInfo';
export * from './PremiumInfo';
export * from './Overview';
