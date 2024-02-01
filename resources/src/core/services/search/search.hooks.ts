import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { useSearchResults } from '@/core/providers';
import { getErrorMessage, showError } from '@/core/utils';
import searchService from './search.service';

export function useSearch() {
  const navigate = useNavigate();
  const { setSearchResults } = useSearchResults();

  return useMutation(searchService.search, {
    onSuccess(results) {
      setSearchResults({ results, order: null, payment: null, premium: false });
      navigate(`/resultados`);
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
      navigate('/');
    },
  });
}
