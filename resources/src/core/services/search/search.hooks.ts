import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { useResults } from '@/core/providers/results';

import searchService from './search.service';

export function useSearch() {
  const { setResults } = useResults();
  const navigate = useNavigate();

  return useMutation(searchService.search, {
    onSuccess(data) {
      setResults(data);
      navigate(`/resultados`);
    },
    onError() {
      navigate('/');
    },
  });
}
