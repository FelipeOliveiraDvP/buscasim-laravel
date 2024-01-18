import api from "@/core/config/axios";
import { Event } from "@/core/services/schedule";
import { Task } from "@/core/services/tasks";

export default {
  async events(): Promise<Event[]> {
    return api.get("/api/dashboard/events");
  },

  async tasks(): Promise<Task[]> {
    return api.get("/api/dashboard/tasks");
  },

  async processes(): Promise<Task[]> {
    return api.get("/api/dashboard/processes");
  },
};
