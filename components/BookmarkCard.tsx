'use client';

import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import type { Bookmark } from '@/lib/api';
import { colors, getLawColor, getLawName } from '@/lib/constants/design-system';

interface BookmarkCardProps {
  bookmark: Bookmark;
  onDelete: (id: number) => void;
  onClick: () => void;
  deleting?: boolean;
  index: number;
}

export function BookmarkCard({ bookmark, onDelete, onClick, deleting, index }: BookmarkCardProps) {
  const lawColor = getLawColor(bookmark.lawCode);
  const lawName = getLawName(bookmark.lawCode);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className="rounded-lg p-4 transition-all cursor-pointer"
      style={{
        background: colors.bg.elevated,
        border: `1px solid ${lawColor.border}`,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.15)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.25)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.15)';
      }}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-md"
            style={{
              backgroundColor: lawColor.bg,
              color: lawColor.text,
            }}
          >
            {lawName}
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(bookmark.id);
          }}
          disabled={deleting}
          className="flex-shrink-0 p-1 rounded transition-all disabled:opacity-50"
          style={{
            color: colors.semantic.error,
            backgroundColor: 'rgba(239, 68, 68, 0.05)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.05)';
          }}
          title="삭제"
          aria-label="북마크 삭제"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </motion.button>
      </div>

      {/* Heading */}
      <h3 className="text-sm font-bold mb-2 line-clamp-1" style={{ color: colors.fg.primary }}>
        {bookmark.heading}
      </h3>

      {/* Body - 전체 표시 (줄바꿈 노출) */}
      <p className="text-xs leading-relaxed whitespace-pre-wrap line-clamp-3" style={{ color: colors.fg.secondary }}>
        {bookmark.body}
      </p>
    </motion.div>
  );
}
