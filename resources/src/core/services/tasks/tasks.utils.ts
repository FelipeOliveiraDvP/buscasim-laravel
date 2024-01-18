import { TaskState, TaskStatusType } from "@/core/services/tasks";
import { getOptionsFromObject } from "@/core/utils";

export const initialTaskState: TaskState = {
  todo: [],
  doing: [],
  awaiting: [],
  approve: [],
  finished: [],
};

export const taskStatus: Record<TaskStatusType, string> = {
  todo: "A fazer",
  doing: "Em andamento",
  awaiting: "Aguardando",
  approve: "Aprovado",
  finished: "Finalizado",
};

export const taskStatusOptions = getOptionsFromObject(taskStatus);
