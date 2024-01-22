import api from '@/core/config/axios';
import { QuerySearchRequest, QuerySearchResponse, QueryResult } from '.';

export default {
  async search(data: QuerySearchRequest): Promise<QuerySearchResponse> {
    return api.post(`/api/queries/search`, data);
  },

  async results(code?: string): Promise<QueryResult> {
    return api.get(`/api/queries/results/${code}`);
  },
};
