'use client';

import { useState } from 'react';
import type { Article } from '@/lib/api';
import { useSearch } from '@/lib/hooks/useSearch';
import { useVoiceSearch } from '@/lib/hooks/useVoiceSearch';
import { useSpeechSynthesis } from '@/lib/hooks/useSpeechSynthesis';
import { SearchHeader } from '@/components/SearchHeader';
import { SearchBar } from '@/components/SearchBar';
import { SearchInfo } from '@/components/SearchInfo';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ArticleList } from '@/components/ArticleList';
import { EmptyState } from '@/components/EmptyState';
import { ArticleModal } from '@/components/ArticleModal';
import { GRADIENTS } from '@/lib/constants/theme';

export default function Home() {
  const { query, setQuery, searchResult, loading, error, handleSearch } =
    useSearch();
  const { isListening, startVoiceSearch } = useVoiceSearch((transcript) =>
    setQuery(transcript)
  );
  const { speakArticle } = useSpeechSynthesis();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const results = searchResult?.hits ?? [];

  return (
    <div
      className="min-h-screen"
      style={{ background: GRADIENTS.primary }}
    >
      <SearchHeader />

      <main className="max-w-6xl mx-auto px-6 py-10 relative z-10">
        {/* 검색 영역 */}
        <div className="mb-10">
          <SearchBar
            query={query}
            onQueryChange={setQuery}
            onSubmit={handleSearch}
            isListening={isListening}
            onVoiceSearch={startVoiceSearch}
          />

          <SearchInfo searchResult={searchResult!} isListening={isListening} />
        </div>

        {/* 에러 */}
        {error && <ErrorMessage message={error} />}

        {/* 로딩 */}
        {loading && <LoadingSpinner />}

        {/* 결과 */}
        {!loading && results.length > 0 && (
          <ArticleList
            searchResult={searchResult!}
            onArticleClick={setSelectedArticle}
            onArticleSpeak={speakArticle}
          />
        )}

        {/* 없음 */}
        {!loading && query.trim() && results.length === 0 && !error && (
          <EmptyState />
        )}
      </main>

      {/* 모달 */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onSpeak={speakArticle}
        />
      )}
    </div>
  );
}
