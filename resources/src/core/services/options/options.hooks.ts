import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { Option } from '.';
import { getErrorMessage, showError, showSuccess } from '@/core/utils';
import optionsService from './options.service';

export function useOptions() {
  return useQuery<Option[], AxiosError>(
    ['options'],
    () => optionsService.getOptions(),
    {
      onError(error) {
        showError(getErrorMessage(error as AxiosError));
      },
    }
  );
}

export function useSetOptions() {
  return useMutation(optionsService.setOptions, {
    onSuccess(data) {
      showSuccess(data.message);
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
    },
  });
}
