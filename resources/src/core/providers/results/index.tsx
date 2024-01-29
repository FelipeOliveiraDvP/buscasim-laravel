import { SearchResult } from '@/core/services/search';
import { ReactNode, createContext, useContext, useState } from 'react';

type SearchResultType = {
  results: SearchResult | null;
  premium?: boolean;
  setResults: (results: SearchResult | null) => void;
};

const ResultsContext = createContext<SearchResultType>({
  results: null,
  setResults: () => {},
});

// TODO: Implement premium results.
export function ResultsProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<SearchResult | null>(null);

  return (
    <ResultsContext.Provider
      value={{
        results,
        premium: false,
        setResults,
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
}

export function useResults(): SearchResultType {
  return useContext<SearchResultType>(ResultsContext);
}
