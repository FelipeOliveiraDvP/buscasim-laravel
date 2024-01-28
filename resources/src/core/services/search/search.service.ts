import api from '@/core/config/axios';
import { SearchRequest, SearchResult } from '.';

export default {
  async search(data: SearchRequest): Promise<SearchResult> {
    return api.post(`/api/search`, data);
  },
};
