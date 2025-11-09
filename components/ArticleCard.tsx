'use client';

import { Volume2, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Article } from '@/lib/api';
import { colors, getLawColor, getLawName } from '@/lib/constants/design-system';
import { SEARCH_CONFIG } from '@/lib/constants/search';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useBookmark } from '@/lib/contexts/BookmarkContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

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
  const { user } = useAuth();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmark();
  const router = useRouter();
  const isExactMatch = index === 0 && isNumericMode;
  const bodyPreview =
    article.body && article.body.length > SEARCH_CONFIG.previewLength
      ? `${article.body.slice(0, SEARCH_CONFIG.previewLength)}...`
      : article.body;

  // lawCode 기반 색상 가져오기
  const lawColor = getLawColor(article.lawCode);
  const lawName = getLawName(article.lawCode);

  // 북마크 상태
  const bookmarked = isBookmarked(article.joCode);

  // 북마크 토글 핸들러
  const handleBookmarkToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user) {
      toast.error('로그인이 필요합니다');
      router.push('/login');
      return;
    }

    if (bookmarked) {
      await removeBookmark(article.joCode);
    } else {
      await addBookmark({
        articleNo: article.articleNo,
        articleSubNo: article.articleSubNo,
        lawCode: article.lawCode,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.005 }}
      whileTap={{ scale: 0.995 }}
      transition={{ duration: 0.2 }}
      className="rounded-lg p-4 cursor-pointer group"
      style={{
        background: colors.bg.elevated,
        border: `1px solid ${isExactMatch ? colors.semantic.warning : 'rgba(255, 255, 255, 0.06)'}`,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      }}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {isExactMatch && (
              <span
                className="px-2 py-0.5 rounded text-xs font-semibold"
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
              className="px-2 py-0.5 rounded text-xs font-medium"
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
            <div className="mb-2 text-sm font-medium" style={{ color: colors.fg.secondary }}>
              {article.heading}
            </div>
          )}

          <p className="text-sm leading-relaxed" style={{ color: colors.fg.tertiary }}>
            {bodyPreview || ''}
          </p>

          {Array.isArray(article.clauses) && article.clauses.length > 0 && (
            <div className="mt-3 text-xs" style={{ color: colors.fg.tertiary }}>
              <span className="font-medium">
                항/호: {article.clauses.length}개
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBookmarkToggle}
            className="p-2 rounded-lg flex-shrink-0 transition-all"
            style={{
              backgroundColor: bookmarked ? lawColor.bg : colors.bg.tertiary,
              color: bookmarked ? lawColor.text : colors.fg.tertiary,
            }}
            aria-label={bookmarked ? '북마크 해제' : '북마크 추가'}
          >
            <Heart className={`w-[18px] h-[18px] ${bookmarked ? 'fill-current' : ''}`} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onSpeak(article);
            }}
            className="p-2 rounded-lg flex-shrink-0 transition-all"
            style={{
              backgroundColor: lawColor.bg,
              color: lawColor.text,
            }}
            aria-label="조문 읽어주기"
          >
            <Volume2 className="w-[18px] h-[18px]" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
