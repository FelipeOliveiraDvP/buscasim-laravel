import api from '@/core/config/axios';
import { ApiResponse } from '@/core/types';
import { Option, OptionsRequest } from '.';

export default {
  async list(): Promise<Option[]> {
    return api.get(`/api/options`);
  },

  async update(data: OptionsRequest): Promise<ApiResponse> {
    return api.patch(`/api/options`, data);
  },
};
