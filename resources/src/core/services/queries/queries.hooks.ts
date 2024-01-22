import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import { getErrorMessage, showError } from '@/core/utils';
import { QueryResult } from '.';
import queryService from './queries.service';

export function useSearch() {
  const navigate = useNavigate();

  return useMutation(queryService.search, {
    onSuccess(data) {
      navigate(`/resultados/${data.code}`);
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
      navigate('/');
    },
  });
}

export function useResults(code?: string) {
  const navigate = useNavigate();

  return useQuery<QueryResult, AxiosError>(
    ['queryResults', code],
    () => queryService.results(code),
    {
      onError(error) {
        showError(getErrorMessage(error as AxiosError));
        navigate('/');
      },
    }
  );
}
