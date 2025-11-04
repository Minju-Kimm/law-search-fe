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

  return (
    <div className="space-y-4">
      <p className="text-white font-semibold text-lg mb-5">
        총{' '}
        <span className="text-2xl text-yellow-300">
          {searchResult?.estimatedTotalHits ?? results.length}
        </span>
        개의 조문
        {isNumericMode && (
          <span className="ml-3 text-sm opacity-90">
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
