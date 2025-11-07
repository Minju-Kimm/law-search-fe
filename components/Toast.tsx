'use client';

import { Toaster } from 'react-hot-toast';
import { colors } from '@/lib/constants/design-system';

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: colors.bg.elevated,
          color: colors.fg.primary,
          border: `1px solid ${colors.bg.tertiary}`,
          borderRadius: '14px',
          padding: '16px',
          fontSize: '14px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
        },
        success: {
          iconTheme: {
            primary: colors.accent.emerald,
            secondary: colors.bg.elevated,
          },
        },
        error: {
          iconTheme: {
            primary: colors.semantic.error,
            secondary: colors.bg.elevated,
          },
        },
      }}
    />
  );
}
