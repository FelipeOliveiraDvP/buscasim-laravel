import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import { getErrorMessage, showError } from '@/core/utils';
import queryService from './query.service';

export function useSearch() {
  const navigate = useNavigate();

  return useMutation(queryService.search, {
    onSuccess(data) {
      navigate('/resultados', { state: { results: data } });
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
      navigate('/');
    },
  });
}
