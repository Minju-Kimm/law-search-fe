import { useState, useEffect, useRef } from 'react';
import { search as apiSearch, type SearchResponse, type Scope } from '@/lib/api';
import { SEARCH_CONFIG, SEARCH_MESSAGES } from '@/lib/constants/search';

export function useSearch(scope: Scope) {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setSearchResult(null);
      setError(null);
      setLoading(false);
      return;
    }

    timerRef.current = setTimeout(() => {
      performSearch(trimmedQuery);
    }, SEARCH_CONFIG.debounceDelay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [query, scope]);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const result = await apiSearch(searchQuery, scope, SEARCH_CONFIG.defaultLimit, 0);
      setSearchResult(result);
    } catch (err) {
      console.error('검색 오류:', err);
      const errorMessage =
        err instanceof Error && err.message
          ? `검색 실패: ${err.message}`
          : SEARCH_MESSAGES.error;
      setError(errorMessage);
      setSearchResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    performSearch(query);
  };

  return {
    query,
    setQuery,
    searchResult,
    loading,
    error,
    handleSearch,
  };
}
