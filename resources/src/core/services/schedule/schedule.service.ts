import api from "@/core/config/axios";
import { Event, EventRequest, EventListQuery } from ".";

export default {
  async list(query?: EventListQuery): Promise<Event[]> {
    return api.get("/api/schedules", { params: { ...query } });
  },

  async create(data: EventRequest): Promise<any> {
    return api.post("/api/schedules", data);
  },

  async update(data: EventRequest): Promise<any> {
    return api.put(`/api/schedules/${data.id}`, data);
  },

  async remove(data: Event): Promise<any> {
    return api.delete(`/api/schedules/${data.id}`);
  },
};
