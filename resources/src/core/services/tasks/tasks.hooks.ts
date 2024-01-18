import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "@/core/config/react-query";
import { getErrorMessage, showError, showSuccess } from "@/core/utils";
import { Task, TaskListQuery } from ".";
import tasksService from "./tasks.service";

export function useTasks(query?: TaskListQuery) {
  return useQuery<Task[], AxiosError>(
    ["tasks", { ...query }],
    () => tasksService.list({ ...query }),
    {
      onError(error) {
        showError(getErrorMessage(error as AxiosError));
      },
    }
  );
}

export function useCreateTask() {
  return useMutation(tasksService.create, {
    onSuccess(data) {
      queryClient.invalidateQueries(["tasks"]);
      showSuccess(data.message);
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
    },
  });
}

export function useUpdateTask() {
  return useMutation(tasksService.update, {
    onSuccess(data) {
      queryClient.invalidateQueries(["tasks"]);
      showSuccess(data.message);
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
    },
  });
}

export function useRemoveTask() {
  return useMutation(tasksService.remove, {
    onSuccess(data) {
      queryClient.invalidateQueries(["tasks"]);
      showSuccess(data.message);
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
    },
  });
}

export function useReorderTask() {
  return useMutation(tasksService.reorder, {
    onSuccess(data) {
      queryClient.invalidateQueries(["tasks"]);
      showSuccess(data.message);
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
    },
  });
}
