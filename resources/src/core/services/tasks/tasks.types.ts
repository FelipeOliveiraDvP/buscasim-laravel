import { BaseQuery } from "@/core/types";

export interface Task {
  id: number;
  index: number;
  title: string;
  description: string;
  final_date: string;
  status: TaskStatusType;
  responsible: {
    id: number;
    name: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface TaskListQuery extends BaseQuery {
  responsible_id?: number | null;
  title?: string;
  status?: TaskStatusType | null;
}
export interface TaskRequest {
  id?: number;
  title: string;
  description: string;
  final_date: Date | null;
  status: TaskStatusType;
  responsible_id: number | null;
}

export interface TaskReorderRequest {
  task_id: number;
  target_status: TaskStatusType;
  target_index: number;
}

export type TaskStatusType =
  | "todo"
  | "doing"
  | "awaiting"
  | "approve"
  | "finished";

export type TaskState = Record<TaskStatusType, Task[]>;
