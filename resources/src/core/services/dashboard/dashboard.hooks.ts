import { AxiosError } from "axios";
import { useQuery } from "react-query";

import { getErrorMessage, showError } from "@/core/utils";
import { Task } from "../tasks";
import { Event } from "../schedule";
import dashboardService from "./dashboard.service";

export function useDashboardTasks() {
  return useQuery<Task[], AxiosError>(
    ["dashboard_tasks"],
    () => dashboardService.tasks(),
    {
      onError(error) {
        showError(getErrorMessage(error as AxiosError));
      },
    }
  );
}

export function useDashboardEvents() {
  return useQuery<Event[], AxiosError>(
    ["dashboard_events"],
    () => dashboardService.events(),
    {
      onError(error) {
        showError(getErrorMessage(error as AxiosError));
      },
    }
  );
}
