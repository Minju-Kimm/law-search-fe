import { Volume2 } from 'lucide-react';
import type { Article } from '@/lib/api';
import { GRADIENTS, COLORS } from '@/lib/constants/theme';
import { SEARCH_CONFIG } from '@/lib/constants/search';

interface ArticleCardProps {
  article: Article;
  index: number;
  isNumericMode: boolean;
  onClick: () => void;
  onSpeak: (article: Article) => void;
}

export function ArticleCard({
  article,
  index,
  isNumericMode,
  onClick,
  onSpeak,
}: ArticleCardProps) {
  const isExactMatch = index === 0 && isNumericMode;
  const bodyPreview =
    article.body && article.body.length > SEARCH_CONFIG.previewLength
      ? `${article.body.slice(0, SEARCH_CONFIG.previewLength)}...`
      : article.body;

  return (
    <div
      className="backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all cursor-pointer hover:scale-[1.02] border"
      style={{
        background: isExactMatch ? 'rgba(255, 255, 255, 1)' : COLORS.overlay,
        borderColor: isExactMatch ? COLORS.borderHighlight : COLORS.border,
        borderWidth: isExactMatch ? '3px' : '1px',
      }}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            {isExactMatch && (
              <span className="px-2 py-1 rounded-lg text-xs font-bold bg-yellow-400 text-gray-900">
                정확 일치
              </span>
            )}
            <span
              className="px-4 py-1.5 rounded-full text-white font-bold shadow-lg"
              style={{ background: GRADIENTS.primary }}
            >
              제{article.articleNo}조
              {article.articleSubNo > 0 ? `의${article.articleSubNo}` : ''}
            </span>
            <h3 className="font-bold text-lg text-gray-800">
              {article.heading || (article.joCode ? `(${article.joCode})` : '')}
            </h3>
          </div>

          <p className="text-gray-700 leading-relaxed">{bodyPreview || ''}</p>

          {Array.isArray(article.clauses) && article.clauses.length > 0 && (
            <div className="mt-3 text-sm text-gray-600">
              <span className="font-semibold">
                항/호: {article.clauses.length}개
              </span>
            </div>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSpeak(article);
          }}
          className="p-3 rounded-xl transition-all hover:scale-110 active:scale-95 shadow-md flex-shrink-0"
          style={{ background: GRADIENTS.accent }}
          aria-label="조문 읽어주기"
        >
          <Volume2 className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}
