'use client';

import { X, Volume2, Heart, StickyNote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import type { Article } from '@/lib/api';
import { colors, getLawColor, getLawName } from '@/lib/constants/design-system';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useBookmark } from '@/lib/contexts/BookmarkContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface ArticleModalProps {
  article: Article;
  onClose: () => void;
  onSpeak: (article: Article) => void;
}

export function ArticleModal({ article, onClose, onSpeak }: ArticleModalProps) {
  const { user } = useAuth();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmark();
  const router = useRouter();
  const lawColor = getLawColor(article.lawCode);
  const lawName = getLawName(article.lawCode);
  const [showMemoDialog, setShowMemoDialog] = useState(false);
  const [memo, setMemo] = useState('');

  const bookmarked = isBookmarked(article.joCode);

  const handleBookmarkToggle = async () => {
    if (!user) {
      toast.error('로그인이 필요합니다');
      router.push('/login');
      return;
    }

    if (bookmarked) {
      await removeBookmark(article.joCode);
    } else {
      // 북마크 추가 시 메모 다이얼로그 표시
      setShowMemoDialog(true);
    }
  };

  const handleMemoSubmit = async () => {
    await addBookmark({
      lawCode: article.lawCode,
      articleNo: article.articleNo,
      memo: memo.trim() || undefined,
    });
    setShowMemoDialog(false);
    setMemo('');
  };

  const handleMemoCancel = () => {
    setShowMemoDialog(false);
    setMemo('');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        style={{
          background: colors.overlay,
          backdropFilter: 'blur(8px)',
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 20 }}
          transition={{ type: 'spring', duration: 0.3 }}
          className="rounded-xl p-7 max-w-[640px] w-full max-h-[85vh] overflow-y-auto"
          style={{
            background: colors.bg.elevated,
            border: '1px solid rgba(255, 255, 255, 0.06)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: lawColor.bg,
                    color: lawColor.text,
                  }}
                >
                  {lawName}
                </span>
                <span
                  className="px-2.5 py-0.5 rounded-full font-semibold text-sm"
                  style={{
                    backgroundColor: lawColor.bg,
                    color: lawColor.text,
                  }}
                >
                  제{article.articleNo}조
                  {article.articleSubNo > 0 ? `의${article.articleSubNo}` : ''}
                </span>
              </div>
              <h2 className="text-xl font-bold leading-tight" style={{ color: colors.fg.primary }}>
                {article.heading}
              </h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="p-1.5 rounded-lg transition-colors"
              style={{
                color: colors.fg.tertiary,
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.bg.tertiary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Body */}
          <div className="mb-5">
            <h3 className="font-semibold mb-2 text-xs uppercase tracking-wide" style={{ color: colors.fg.tertiary }}>
              본문
            </h3>
            <p className="leading-relaxed text-[15px] whitespace-pre-wrap" style={{ color: colors.fg.primary }}>
              {article.body || ''}
            </p>
          </div>

          {/* Clauses */}
          {Array.isArray(article.clauses) && article.clauses.length > 0 && (
            <div className="mb-5">
              <h3 className="font-semibold mb-2 text-xs uppercase tracking-wide" style={{ color: colors.fg.tertiary }}>
                항/호
              </h3>
              <div className="space-y-2">
                {article.clauses.map((clause, idx) => (
                  <motion.div
                    key={`clause-${idx}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="flex gap-3 p-2.5 rounded-lg"
                    style={{ backgroundColor: lawColor.bg }}
                  >
                    <span className="font-semibold text-sm flex-shrink-0" style={{ color: lawColor.text }}>
                      {clause.no}
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: colors.fg.primary }}>
                      {clause.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleBookmarkToggle}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2"
              style={{
                backgroundColor: bookmarked ? lawColor.bg : colors.bg.tertiary,
                color: bookmarked ? lawColor.text : colors.fg.secondary,
                border: `1px solid ${bookmarked ? lawColor.border : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              <Heart className={`w-[16px] h-[16px] ${bookmarked ? 'fill-current' : ''}`} />
              {bookmarked ? '해제' : '북마크'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSpeak(article)}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2"
              style={{
                background: lawColor.primary,
                color: '#fff',
                border: `1px solid ${lawColor.primary}`,
              }}
            >
              <Volume2 className="w-[16px] h-[16px]" />
              읽어주기
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: colors.bg.tertiary,
                color: colors.fg.secondary,
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              닫기
            </motion.button>
          </div>
        </motion.div>

        {/* Memo Dialog */}
        {showMemoDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            style={{
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(4px)',
            }}
            onClick={handleMemoCancel}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="rounded-xl p-6 max-w-md w-full"
              style={{
                background: colors.bg.elevated,
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 mb-4">
                <StickyNote className="w-5 h-5" style={{ color: 'rgb(245, 158, 11)' }} />
                <h3 className="text-lg font-bold" style={{ color: colors.fg.primary }}>
                  북마크 메모 추가
                </h3>
              </div>
              <p className="text-sm mb-4" style={{ color: colors.fg.tertiary }}>
                이 조문에 대한 메모를 입력하세요 (선택사항)
              </p>
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="예: 불법행위 책임, 계약 해제 관련 등..."
                className="w-full px-4 py-3 rounded-lg border resize-none focus:outline-none focus:ring-2 transition-all"
                style={{
                  backgroundColor: colors.bg.primary,
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: colors.fg.primary,
                  minHeight: '100px',
                }}
                autoFocus
              />
              <div className="flex gap-2 mt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleMemoSubmit}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: lawColor.primary,
                    color: '#fff',
                  }}
                >
                  저장
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleMemoCancel}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
                  style={{
                    backgroundColor: colors.bg.tertiary,
                    color: colors.fg.secondary,
                  }}
                >
                  취소
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
