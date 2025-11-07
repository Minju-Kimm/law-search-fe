'use client';

import { X, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Article } from '@/lib/api';
import { colors, getLawColor, getLawName } from '@/lib/constants/design-system';

interface ArticleModalProps {
  article: Article;
  onClose: () => void;
  onSpeak: (article: Article) => void;
}

export function ArticleModal({ article, onClose, onSpeak }: ArticleModalProps) {
  const lawColor = getLawColor(article.lawCode);
  const lawName = getLawName(article.lawCode);

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
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="rounded-lg p-6 sm:p-8 max-w-3xl w-full max-h-[85vh] overflow-y-auto"
          style={{
            background: colors.bg.elevated,
            border: `1px solid ${lawColor.border}`,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="px-3 py-1 rounded text-xs font-semibold"
                  style={{
                    backgroundColor: lawColor.bg,
                    color: lawColor.text,
                  }}
                >
                  {lawName}
                </span>
                <span
                  className="px-3 py-1 rounded font-semibold text-sm"
                  style={{
                    backgroundColor: lawColor.bg,
                    color: lawColor.text,
                  }}
                >
                  제{article.articleNo}조
                  {article.articleSubNo > 0 ? `의${article.articleSubNo}` : ''}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold" style={{ color: colors.fg.primary }}>
                {article.heading}
              </h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-bg-tertiary transition-colors"
              aria-label="닫기"
              style={{ color: colors.fg.tertiary }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Body */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2 text-sm" style={{ color: colors.fg.secondary }}>
              본문
            </h3>
            <p className="leading-relaxed text-base whitespace-pre-wrap" style={{ color: colors.fg.primary }}>
              {article.body || ''}
            </p>
          </div>

          {/* Clauses */}
          {Array.isArray(article.clauses) && article.clauses.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-sm" style={{ color: colors.fg.secondary }}>
                항/호
              </h3>
              <div className="space-y-2">
                {article.clauses.map((clause, idx) => (
                  <motion.div
                    key={`clause-${idx}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex gap-3 p-3 rounded-lg"
                    style={{ backgroundColor: lawColor.bg }}
                  >
                    <span className="font-semibold text-sm" style={{ color: lawColor.text }}>
                      {clause.no}
                    </span>
                    <span className="text-sm" style={{ color: colors.fg.primary }}>
                      {clause.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSpeak(article)}
              className="flex-1 px-6 py-3 rounded-lg font-medium transition-all text-white flex items-center justify-center gap-2"
              style={{ background: lawColor.primary }}
            >
              <Volume2 className="w-4 h-4" />
              읽어주기
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-lg font-medium transition-all"
              style={{
                backgroundColor: colors.bg.tertiary,
                color: colors.fg.secondary,
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
