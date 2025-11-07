'use client';

import { SearchX } from 'lucide-react';
import { motion } from 'framer-motion';
import { colors } from '@/lib/constants/design-system';

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      >
        <SearchX
          className="w-20 h-20 mb-6"
          style={{ color: colors.fg.tertiary, strokeWidth: 1.5 }}
        />
      </motion.div>
      <h3
        className="text-xl font-semibold mb-2"
        style={{ color: colors.fg.primary }}
      >
        검색 결과가 없습니다
      </h3>
      <p
        className="max-w-md text-sm"
        style={{ color: colors.fg.tertiary }}
      >
        다른 검색어로 다시 시도하거나, 음성 검색을 활용해보세요
      </p>
    </motion.div>
  );
}
