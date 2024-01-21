import api from '@/core/config/axios';
import { QueryRequest, QueryResult } from '.';

export default {
  async search(data: QueryRequest): Promise<QueryResult> {
    return api.post(`/api/queries/search`, data);
  },
};
