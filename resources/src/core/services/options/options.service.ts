import api from '@/core/config/axios';
import { ApiResponse } from '@/core/types';
import { Option, OptionRequest } from '.';

export default {
  async getOptions(): Promise<Option[]> {
    return api.get(`/api/options`);
  },

  async setOptions(data: OptionRequest): Promise<ApiResponse> {
    return api.patch(`/api/options`, data);
  },
};
