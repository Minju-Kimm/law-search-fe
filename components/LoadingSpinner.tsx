'use client';

import { motion } from 'framer-motion';
import { colors, spacing } from '@/lib/constants/design-system';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center gap-4 py-12">
      {/* Skeleton cards */}
      <div className="w-full max-w-4xl space-y-4">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-lg p-6"
            style={{
              background: colors.bg.elevated,
              border: `1px solid ${colors.bg.tertiary}`,
            }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-3">
                {/* Header skeleton */}
                <div className="flex items-center gap-3">
                  <div
                    className="h-6 w-20 rounded animate-pulse"
                    style={{ background: colors.bg.tertiary }}
                  />
                  <div
                    className="h-6 w-32 rounded animate-pulse"
                    style={{ background: colors.bg.tertiary }}
                  />
                </div>
                {/* Title skeleton */}
                <div
                  className="h-5 w-2/3 rounded animate-pulse"
                  style={{ background: colors.bg.tertiary }}
                />
                {/* Content skeleton */}
                <div className="space-y-2">
                  <div
                    className="h-4 w-full rounded animate-pulse"
                    style={{ background: colors.bg.tertiary }}
                  />
                  <div
                    className="h-4 w-4/5 rounded animate-pulse"
                    style={{ background: colors.bg.tertiary }}
                  />
                </div>
              </div>
              {/* Button skeleton */}
              <div
                className="h-12 w-12 rounded-lg animate-pulse"
                style={{ background: colors.bg.tertiary }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
