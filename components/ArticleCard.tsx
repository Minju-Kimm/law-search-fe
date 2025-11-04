import { Volume2 } from 'lucide-react';
import type { Article } from '@/lib/api';
import { LAW_BADGES } from '@/lib/constants/theme';
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

  // lawCode 기반 배지 설정
  const badge = LAW_BADGES[article.lawCode];

  return (
    <div
      className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-[1.01] border-2"
      style={{
        backgroundColor: 'white',
        borderColor: isExactMatch ? '#fbbf24' : 'rgba(229, 231, 235, 0.8)',
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
            {/* 법 종류 배지 */}
            <span
              className="px-3 py-1 rounded-lg text-sm font-bold"
              style={{
                backgroundColor: badge.bgColor,
                color: badge.textColor,
              }}
            >
              {badge.label}
            </span>
            {/* 제X조 타이틀 */}
            <h3 className="font-bold text-lg text-gray-800">
              제{article.articleNo}조
              {article.articleSubNo > 0 ? `의${article.articleSubNo}` : ''}
            </h3>
          </div>

          {/* 조문 제목 */}
          {article.heading && (
            <div className="mb-2 text-base font-semibold text-gray-700">
              {article.heading}
            </div>
          )}

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
          style={{
            backgroundColor: badge.textColor,
          }}
          aria-label="조문 읽어주기"
        >
          <Volume2 className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}
