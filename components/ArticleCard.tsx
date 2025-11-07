'use client';

import { Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Article } from '@/lib/api';
import { colors, getLawColor, getLawName } from '@/lib/constants/design-system';
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

  // lawCode 기반 색상 가져오기
  const lawColor = getLawColor(article.lawCode);
  const lawName = getLawName(article.lawCode);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl p-6 sm:p-7 cursor-pointer group"
      style={{
        background: colors.bg.elevated,
        border: `2px solid ${isExactMatch ? colors.semantic.warning : lawColor.border}`,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      }}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2.5 mb-4 flex-wrap">
            {isExactMatch && (
              <span
                className="px-3 py-1.5 rounded-lg text-sm font-bold"
                style={{
                  background: 'rgba(245, 158, 11, 0.15)',
                  color: colors.semantic.warning,
                }}
              >
                정확 일치
              </span>
            )}
            {/* 법 종류 배지 */}
            <span
              className="px-3 py-1.5 rounded-lg text-sm font-bold"
              style={{
                backgroundColor: lawColor.bg,
                color: lawColor.text,
              }}
            >
              {lawName}
            </span>
            {/* 제X조 타이틀 */}
            <h3 className="font-bold text-lg" style={{ color: colors.fg.primary }}>
              제{article.articleNo}조
              {article.articleSubNo > 0 ? `의${article.articleSubNo}` : ''}
            </h3>
          </div>

          {/* 조문 제목 */}
          {article.heading && (
            <div className="mb-3 text-base font-semibold" style={{ color: colors.fg.secondary }}>
              {article.heading}
            </div>
          )}

          <p className="text-base leading-relaxed" style={{ color: colors.fg.tertiary }}>
            {bodyPreview || ''}
          </p>

          {Array.isArray(article.clauses) && article.clauses.length > 0 && (
            <div className="mt-4 text-sm" style={{ color: colors.fg.tertiary }}>
              <span className="font-semibold">
                항/호: {article.clauses.length}개
              </span>
            </div>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onSpeak(article);
          }}
          className="p-3.5 rounded-xl flex-shrink-0"
          style={{
            backgroundColor: lawColor.bg,
            color: lawColor.text,
          }}
          aria-label="조문 읽어주기"
        >
          <Volume2 className="w-6 h-6" />
        </motion.button>
      </div>
    </motion.div>
  );
}
