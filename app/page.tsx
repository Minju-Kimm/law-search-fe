'use client';

import { useState, Suspense } from 'react';
import { Search, Mic } from 'lucide-react';
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
import { getTheme, getScopeName, GRADIENTS } from '@/lib/constants/theme';

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
        isMobileOpen={isMobileOpen}
        onMobileToggle={() => setIsMobileOpen(!isMobileOpen)}
      />

      {/* 메인 콘텐츠 */}
      <main className="flex-1 lg:ml-0 overflow-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
          {/* 헤더 */}
          <div className="mb-6 sm:mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2" style={{ color: theme.textColor }}>
              {getScopeName(scope)} 법률 검색
            </h1>
            <p className="text-xs sm:text-sm opacity-70" style={{ color: theme.textColor }}>
              정확하고 빠른 법률 검색 서비스
            </p>
          </div>

          {/* 검색바 */}
          <div className="mb-8">
            <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
                <div className="relative flex-1">
                  <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Search className="w-5 h-5 sm:w-6 sm:h-6 opacity-50" style={{ color: theme.textColor }} />
                  </div>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="조문 번호나 키워드..."
                    className="w-full pl-12 sm:pl-14 pr-12 sm:pr-14 py-3 sm:py-4 text-base sm:text-lg rounded-2xl border-2 focus:outline-none focus:ring-2 transition-all shadow-md"
                    style={{
                      backgroundColor: 'white',
                      borderColor: theme.borderColor,
                    }}
                    autoComplete="off"
                    spellCheck={false}
                  />
                  {/* 음성 검색 버튼 (검색바 내부 우측) */}
                  <button
                    type="button"
                    onClick={startVoiceSearch}
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-lg transition-all hover:scale-110 active:scale-95"
                    style={{
                      background: isListening ? GRADIENTS.danger : theme.gradient,
                      color: 'white',
                    }}
                    aria-label="음성 검색"
                  >
                    <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                {/* 검색 버튼 (검색바 우측) */}
                <button
                  type="submit"
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-white font-semibold transition-all hover:scale-105 active:scale-95 shadow-md whitespace-nowrap"
                  style={{ background: theme.gradient }}
                >
                  검색
                </button>
              </div>
            </form>
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
                상단 검색바에서 조문 번호나 키워드를 입력하거나 음성으로 검색할 수 있습니다
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
