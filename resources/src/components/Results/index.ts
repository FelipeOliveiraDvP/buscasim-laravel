import { QueryResult } from '@/core/services/search';

export interface ResultInfoProps {
  data: QueryResult;
  show?: boolean;
}

export * from './FreeInfo';
export * from './PremiumInfo';
export * from './Overview';
