import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "@/core/config/react-query";
import { getErrorMessage, showError, showSuccess } from "@/core/utils";
import { Event, EventListQuery } from ".";
import scheduleService from "./schedule.service";

export function useEvents(query?: EventListQuery) {
  return useQuery<Event[], AxiosError>(
    ["events", { ...query }],
    () => scheduleService.list({ ...query }),
    {
      onError(error) {
        showError(getErrorMessage(error as AxiosError));
      },
    }
  );
}

export function useCreateEvent() {
  return useMutation(scheduleService.create, {
    onSuccess(data) {
      queryClient.invalidateQueries(["events"]);
      showSuccess(data.message);
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
    },
  });
}

export function useUpdateEvent() {
  return useMutation(scheduleService.update, {
    onSuccess(data) {
      queryClient.invalidateQueries(["events"]);
      showSuccess(data.message);
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
    },
  });
}

export function useRemoveEvent() {
  return useMutation(scheduleService.remove, {
    onSuccess(data) {
      queryClient.invalidateQueries(["events"]);
      showSuccess(data.message);
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
    },
  });
}
