import api from "@/core/config/axios";
import { Task, TaskRequest, TaskListQuery, TaskReorderRequest } from ".";

export default {
  async list(query?: TaskListQuery): Promise<Task[]> {
    return api.get("/api/tasks", { params: { ...query } });
  },

  async create(data: TaskRequest): Promise<any> {
    return api.post("/api/tasks", data);
  },

  async update(data: TaskRequest): Promise<any> {
    return api.put(`/api/tasks/${data.id}`, data);
  },

  async remove(data: Task): Promise<any> {
    return api.delete(`/api/tasks/${data.id}`);
  },

  async reorder(data: TaskReorderRequest): Promise<any> {
    return api.patch(`/api/tasks/${data.task_id}/reorder`, data);
  },
};
