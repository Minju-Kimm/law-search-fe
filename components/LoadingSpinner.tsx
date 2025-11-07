'use client';

import { motion } from 'framer-motion';
import { colors, spacing } from '@/lib/constants/design-system';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center gap-4 py-12">
      {/* Skeleton cards */}
      <div className="w-full max-w-4xl space-y-5">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl p-6 sm:p-7"
            style={{
              background: colors.bg.elevated,
              border: `2px solid ${colors.bg.tertiary}`,
            }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-4">
                {/* Header skeleton */}
                <div className="flex items-center gap-3">
                  <div
                    className="h-7 w-24 rounded-lg animate-pulse"
                    style={{ background: colors.bg.tertiary }}
                  />
                  <div
                    className="h-7 w-36 rounded-lg animate-pulse"
                    style={{ background: colors.bg.tertiary }}
                  />
                </div>
                {/* Title skeleton */}
                <div
                  className="h-6 w-2/3 rounded-lg animate-pulse"
                  style={{ background: colors.bg.tertiary }}
                />
                {/* Content skeleton */}
                <div className="space-y-3">
                  <div
                    className="h-5 w-full rounded-lg animate-pulse"
                    style={{ background: colors.bg.tertiary }}
                  />
                  <div
                    className="h-5 w-4/5 rounded-lg animate-pulse"
                    style={{ background: colors.bg.tertiary }}
                  />
                </div>
              </div>
              {/* Button skeleton */}
              <div
                className="h-14 w-14 rounded-xl animate-pulse"
                style={{ background: colors.bg.tertiary }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
