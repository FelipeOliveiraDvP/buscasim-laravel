import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { useSearchResults } from '@/core/providers';
import searchService from './search.service';

export function useSearch() {
  const navigate = useNavigate();
  const { setSearchResults } = useSearchResults();

  return useMutation(searchService.search, {
    onSuccess(results) {
      setSearchResults({ results, order: null, payment: null, premium: false });
      navigate(`/resultados`);
    },
    onError() {
      navigate('/');
    },
  });
}
