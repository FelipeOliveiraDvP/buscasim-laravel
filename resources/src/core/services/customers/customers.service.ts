import api from "@/core/config/axios";
import {
  Customer,
  CustomerListQuery,
  CustomerListResponse,
  CustomerRequest,
} from ".";

export default {
  async list(query?: CustomerListQuery): Promise<CustomerListResponse> {
    return api.get("/api/customers", { params: { ...query } });
  },

  async create(data: CustomerRequest): Promise<any> {
    return api.post("/api/customers", data);
  },

  async update(data: CustomerRequest): Promise<any> {
    return api.put(`/api/customers/${data.id}`, data);
  },

  async remove(data: Customer): Promise<any> {
    return api.delete(`/api/customers/${data.id}`);
  },
};
