'use client';

import { useState, Suspense } from 'react';
import type { Article } from '@/lib/api';
import { useScope } from '@/lib/hooks/useLawType';
import { useSearch } from '@/lib/hooks/useSearch';
import { useVoiceSearch } from '@/lib/hooks/useVoiceSearch';
import { useSpeechSynthesis } from '@/lib/hooks/useSpeechSynthesis';
import { Sidebar } from '@/components/Sidebar';
import { SearchInfo } from '@/components/SearchInfo';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ArticleList } from '@/components/ArticleList';
import { EmptyState } from '@/components/EmptyState';
import { ArticleModal } from '@/components/ArticleModal';
import { getTheme, getScopeName } from '@/lib/constants/theme';

function HomeContent() {
  const { scope, changeScope } = useScope();
  const { query, setQuery, searchResult, loading, error, handleSearch } = useSearch(scope);
  const { isListening, startVoiceSearch } = useVoiceSearch((transcript) => setQuery(transcript));
  const { speakArticle } = useSpeechSynthesis();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const theme = getTheme(scope);
  const results = searchResult?.hits ?? [];

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: theme.bgColor }}>
      {/* 사이드바 */}
      <Sidebar
        scope={scope}
        onScopeChange={(newScope) => {
          changeScope(newScope);
          setIsMobileOpen(false);
        }}
        query={query}
        onQueryChange={setQuery}
        onSearch={handleSearch}
        isListening={isListening}
        onVoiceSearch={startVoiceSearch}
        isMobileOpen={isMobileOpen}
        onMobileToggle={() => setIsMobileOpen(!isMobileOpen)}
      />

      {/* 메인 콘텐츠 */}
      <main className="flex-1 lg:ml-0 overflow-auto">
        <div className="max-w-5xl mx-auto px-6 py-8 lg:py-12">
          {/* 헤더 */}
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2" style={{ color: theme.textColor }}>
              {getScopeName(scope)} 법률 검색
            </h1>
            <p className="text-sm opacity-70" style={{ color: theme.textColor }}>
              정확하고 빠른 법률 검색 서비스
            </p>
          </div>

          {/* 검색 정보 */}
          {searchResult && (
            <div className="mb-6">
              <SearchInfo searchResult={searchResult} isListening={isListening} />
            </div>
          )}

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
          {!loading && query.trim() && results.length === 0 && !error && <EmptyState />}

          {/* 초기 상태 */}
          {!loading && !query.trim() && !error && (
            <div
              className="text-center py-20 rounded-2xl"
              style={{ backgroundColor: theme.lightBg }}
            >
              <p className="text-lg font-semibold mb-2" style={{ color: theme.textColor }}>
                {getScopeName(scope)} 법률을 검색해보세요
              </p>
              <p className="text-sm opacity-70" style={{ color: theme.textColor }}>
                좌측 사이드바에서 검색어를 입력하거나 음성으로 검색할 수 있습니다
              </p>
            </div>
          )}
        </div>
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

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
