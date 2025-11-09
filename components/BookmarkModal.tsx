'use client';

import { X, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import type { Bookmark } from '@/lib/api';
import { colors, getLawColor, getLawName } from '@/lib/constants/design-system';

interface BookmarkModalProps {
  bookmark: Bookmark;
  onClose: () => void;
  onDelete: (id: number) => void;
  deleting?: boolean;
}

export function BookmarkModal({ bookmark, onClose, onDelete, deleting }: BookmarkModalProps) {
  const lawColor = getLawColor(bookmark.lawCode);
  const lawName = getLawName(bookmark.lawCode);

  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // 스크롤 잠금
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Focus trap
  useEffect(() => {
    const modalElement = document.getElementById('bookmark-modal');
    if (!modalElement) return;

    const focusableElements = modalElement.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    modalElement.addEventListener('keydown', handleTab);
    firstElement?.focus();

    return () => {
      modalElement.removeEventListener('keydown', handleTab);
    };
  }, []);

  const handleDeleteClick = () => {
    onDelete(bookmark.id);
    onClose();
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
          id="bookmark-modal"
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 20 }}
          transition={{ type: 'spring', duration: 0.3 }}
          className="rounded-xl p-6 sm:p-7 max-w-[640px] w-full max-h-[85vh] overflow-y-auto"
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
              </div>
              <h2 className="text-xl font-bold leading-tight" style={{ color: colors.fg.primary }}>
                {bookmark.heading}
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
              {bookmark.body}
            </p>
          </div>

          {/* Memo */}
          <div className="mb-5">
            <h3 className="font-semibold mb-2 text-xs uppercase tracking-wide" style={{ color: colors.fg.tertiary }}>
              메모
            </h3>
            <div className="p-3 rounded-lg" style={{
              background: bookmark.memo ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255, 255, 255, 0.02)',
              border: `1px solid ${bookmark.memo ? 'rgba(245, 158, 11, 0.25)' : 'rgba(255, 255, 255, 0.05)'}`,
            }}>
              <p className="text-sm leading-relaxed" style={{
                color: bookmark.memo ? colors.fg.primary : colors.fg.tertiary
              }}>
                {bookmark.memo || '-'}
              </p>
            </div>
          </div>

          {/* Clauses */}
          {bookmark.clauses && bookmark.clauses.length > 0 && (
            <div className="mb-5">
              <h3 className="font-semibold mb-2 text-xs uppercase tracking-wide" style={{ color: colors.fg.tertiary }}>
                항/호
              </h3>
              <ol className="space-y-2">
                {bookmark.clauses.map((clause, idx) => (
                  <motion.li
                    key={`clause-${idx}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="flex gap-3 p-2.5 rounded-lg"
                    style={{ backgroundColor: lawColor.bg }}
                  >
                    <span className="font-semibold text-sm flex-shrink-0" style={{ color: lawColor.text }}>
                      {clause.no}.
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: colors.fg.primary }}>
                      {clause.text}
                    </span>
                  </motion.li>
                ))}
              </ol>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleDeleteClick}
              disabled={deleting}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                color: colors.semantic.error,
                border: '1px solid rgba(239, 68, 68, 0.25)',
              }}
            >
              <Trash2 className="w-[16px] h-[16px]" />
              삭제
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all"
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
      </motion.div>
    </AnimatePresence>
  );
}
