import type { Article, SearchResponse } from '@/lib/api';
import { ArticleCard } from './ArticleCard';

interface ArticleListProps {
  searchResult: SearchResponse;
  onArticleClick: (article: Article) => void;
  onArticleSpeak: (article: Article) => void;
}

export function ArticleList({
  searchResult,
  onArticleClick,
  onArticleSpeak,
}: ArticleListProps) {
  const results = searchResult?.hits ?? [];
  const isNumericMode = searchResult?.mode === 'numeric';

  // 결과 개수 표시: count → total → estimatedTotalHits → hits.length 순으로 폴백
  const resultCount =
    searchResult?.count ??
    searchResult?.total ??
    searchResult?.estimatedTotalHits ??
    results.length;

  return (
    <div className="space-y-4">
      <p className="font-semibold text-lg mb-5 text-gray-700">
        검색 결과{' '}
        <span className="text-2xl font-bold text-blue-600">
          {resultCount}
        </span>
        건
        {isNumericMode && (
          <span className="ml-3 text-sm opacity-70">
            (정확한 조문 최상단 표시)
          </span>
        )}
      </p>

      {results.map((article, index) => (
        <ArticleCard
          key={`${article.id}-${index}`}
          article={article}
          index={index}
          isNumericMode={isNumericMode}
          onClick={() => onArticleClick(article)}
          onSpeak={onArticleSpeak}
        />
      ))}
    </div>
  );
}
