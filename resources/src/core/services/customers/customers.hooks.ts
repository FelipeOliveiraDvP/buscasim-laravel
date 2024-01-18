import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "@/core/config/react-query";
import { getErrorMessage, showError, showSuccess } from "@/core/utils";
import { CustomerListQuery, CustomerListResponse } from ".";
import customersService from "./customers.service";

export function useCustomers(query?: CustomerListQuery) {
  return useQuery<CustomerListResponse, AxiosError>(
    ["customers", { ...query }],
    () => customersService.list({ ...query }),
    {
      onError(error) {
        showError(getErrorMessage(error as AxiosError));
      },
    }
  );
}

export function useCreateCustomer() {
  return useMutation(customersService.create, {
    onSuccess(data) {
      queryClient.invalidateQueries(["customers"]);
      showSuccess(data.message);
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
    },
  });
}

export function useUpdateCustomer() {
  return useMutation(customersService.update, {
    onSuccess(data) {
      queryClient.invalidateQueries(["customers"]);
      showSuccess(data.message);
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
    },
  });
}

export function useRemoveCustomer() {
  return useMutation(customersService.remove, {
    onSuccess(data) {
      queryClient.invalidateQueries(["customers"]);
      showSuccess(data.message);
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
    },
  });
}
