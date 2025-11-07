'use client';

import { SearchX } from 'lucide-react';
import { motion } from 'framer-motion';
import { colors } from '@/lib/constants/design-system';

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      >
        <SearchX
          className="w-24 h-24 mb-8"
          style={{ color: colors.fg.tertiary, strokeWidth: 1.5 }}
        />
      </motion.div>
      <h3
        className="text-2xl sm:text-3xl font-bold mb-3"
        style={{ color: colors.fg.primary }}
      >
        검색 결과가 없습니다
      </h3>
      <p
        className="max-w-md text-base sm:text-lg font-medium"
        style={{ color: colors.fg.tertiary }}
      >
        다른 검색어로 다시 시도하거나, 음성 검색을 활용해보세요
      </p>
    </motion.div>
  );
}
