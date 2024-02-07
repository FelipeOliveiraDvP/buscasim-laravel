import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { useSearchResults } from '@/core/providers';
import { getErrorMessage, showError } from '@/core/utils';
import searchService from './search.service';
import { SearchInformation } from '.';

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

export function useSearchInfo() {
  return useQuery<SearchInformation, AxiosError>(
    ['search.info'],
    () => searchService.info(),
    {
      onError(error) {
        showError(getErrorMessage(error as AxiosError));
      },
    }
  );
}
