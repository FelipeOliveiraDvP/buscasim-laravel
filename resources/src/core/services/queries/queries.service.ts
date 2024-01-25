import api from '@/core/config/axios';
import { QueryRequest, Query, QueryResult } from '.';

export default {
  async search(data: QueryRequest): Promise<Query> {
    return api.post(`/api/queries/search`, data);
  },

  async results(code?: string): Promise<QueryResult> {
    return api.get(`/api/queries/results/${code}`);
  },
};
