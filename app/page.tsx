'use client';

import { useState, Suspense } from 'react';
import { Mic, Sparkles, Search } from 'lucide-react';
import { motion } from 'framer-motion';
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
import { colors } from '@/lib/constants/design-system';
import { getScopeName } from '@/lib/constants/theme';

function HomeContent() {
  const { scope, changeScope } = useScope();
  const { query, setQuery, searchResult, loading, error, handleSearch } = useSearch(scope);
  const { isListening, startVoiceSearch } = useVoiceSearch((transcript) => setQuery(transcript));
  const { speakArticle } = useSpeechSynthesis();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const results = searchResult?.hits ?? [];

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: colors.bg.primary }}>
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 sm:mb-14 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: colors.accent.indigo }} />
              <h1 className="text-3xl sm:text-5xl font-bold" style={{ color: colors.fg.primary }}>
                {getScopeName(scope)} 법률 검색
              </h1>
            </div>
            <p className="text-base sm:text-lg font-medium" style={{ color: colors.fg.tertiary }}>
              정확하고 빠른 법률 검색 서비스
            </p>
          </motion.div>

          {/* 검색바 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="조문 번호나 키워드를 입력해보세요"
                    className="w-full pl-5 sm:pl-6 pr-14 sm:pr-16 py-4 sm:py-5 text-base sm:text-lg rounded-2xl border-2 focus:outline-none focus:ring-2 transition-all font-medium"
                    style={{
                      backgroundColor: colors.bg.elevated,
                      borderColor: colors.bg.tertiary,
                      color: colors.fg.primary,
                    }}
                    autoComplete="off"
                    spellCheck={false}
                    aria-label="법률 검색"
                  />
                  {/* 음성 검색 버튼 (검색바 내부 우측) */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={startVoiceSearch}
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-xl transition-all"
                    style={{
                      background: isListening ? colors.semantic.error : colors.accent.indigo,
                      color: 'white',
                    }}
                    aria-label="음성 검색"
                  >
                    <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.button>
                </div>
                {/* 검색 버튼 (검색바 우측) */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-white text-base sm:text-lg font-bold transition-all shadow-md whitespace-nowrap"
                  style={{ background: colors.accent.indigo }}
                >
                  검색
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* 검색 정보 */}
          {searchResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6"
            >
              <SearchInfo searchResult={searchResult} isListening={isListening} />
            </motion.div>
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 rounded-2xl"
              style={{ backgroundColor: colors.bg.elevated }}
            >
              <Search className="w-20 h-20 mx-auto mb-6" style={{ color: colors.fg.tertiary }} />
              <p className="text-xl sm:text-2xl font-bold mb-3" style={{ color: colors.fg.primary }}>
                {getScopeName(scope)} 법률을 검색해보세요
              </p>
              <p className="text-base sm:text-lg font-medium" style={{ color: colors.fg.tertiary }}>
                상단 검색바에서 조문 번호나 키워드를 입력하거나 음성으로 검색할 수 있습니다
              </p>
            </motion.div>
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
