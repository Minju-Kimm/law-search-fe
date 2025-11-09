'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { User as UserIcon, Mail, Shield, Bookmark } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { colors, spacing, radius, typography } from '@/lib/constants/design-system';

export default function MePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return (
      <div
        className="max-w-3xl mx-auto px-4 py-12"
        style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center w-full"
        >
          <div
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: colors.bg.elevated,
              border: `1px solid rgba(255, 255, 255, 0.08)`,
            }}
          >
            <UserIcon className="w-10 h-10" style={{ color: colors.fg.tertiary }} />
          </div>
          <h2
            className="text-2xl font-bold mb-3"
            style={{ color: colors.fg.primary }}
          >
            로그인이 필요합니다
          </h2>
          <p
            className="mb-8"
            style={{ color: colors.fg.tertiary }}
          >
            마이페이지를 보려면 로그인해주세요.
          </p>
          <Link
            href="/login"
            className="inline-block px-6 py-3 rounded-lg font-medium transition-all"
            style={{
              backgroundColor: colors.accent.indigo,
              color: colors.fg.primary,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.accent.indigoHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.accent.indigo;
            }}
          >
            로그인하기
          </Link>
        </motion.div>
      </div>
    );
  }

  const getProviderColor = (provider: string) => {
    if (provider === 'google') return colors.semantic.error;
    if (provider === 'naver') return colors.law.civil.primary;
    return colors.accent.indigo;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6" style={{ paddingTop: spacing[3], paddingBottom: spacing[6] }}>
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-bold mb-8"
        style={{
          color: colors.fg.primary,
          fontSize: typography.fontSize['2xl'],
          fontWeight: typography.fontWeight.bold,
        }}
      >
        마이페이지
      </motion.h1>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl p-6 sm:p-8"
        style={{
          background: colors.bg.elevated,
          border: `1px solid rgba(255, 255, 255, 0.06)`,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Avatar & Name Section */}
        <div
          className="flex items-center gap-5 mb-8 pb-8"
          style={{ borderBottom: `1px solid rgba(255, 255, 255, 0.08)` }}
        >
          {user.avatar ? (
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-xl opacity-40"
                style={{
                  background: `linear-gradient(135deg, ${getProviderColor(user.provider)}, ${colors.accent.indigo})`,
                  transform: 'scale(1.1)',
                }}
              />
              <div
                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden"
                style={{
                  border: `3px solid rgba(255, 255, 255, 0.1)`,
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                }}
              >
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 80px, 96px"
                />
              </div>
            </div>
          ) : (
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-xl opacity-40"
                style={{
                  background: `linear-gradient(135deg, ${getProviderColor(user.provider)}, ${colors.accent.indigo})`,
                  transform: 'scale(1.1)',
                }}
              />
              <div
                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-3xl sm:text-4xl font-bold"
                style={{
                  background: `linear-gradient(135deg, ${getProviderColor(user.provider)}, ${colors.accent.indigo})`,
                  color: colors.fg.primary,
                  border: `3px solid rgba(255, 255, 255, 0.1)`,
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                }}
              >
                {user.name[0].toUpperCase()}
              </div>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h2
              className="text-2xl sm:text-3xl font-bold mb-2 truncate"
              style={{
                color: colors.fg.primary,
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.bold,
              }}
            >
              {user.name}
            </h2>
            <p
              className="text-sm sm:text-base truncate"
              style={{ color: colors.fg.secondary }}
            >
              {user.email}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="space-y-5">
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-start gap-4 p-4 rounded-xl"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: `1px solid rgba(255, 255, 255, 0.05)`,
            }}
          >
            <div
              className="p-2 rounded-lg flex-shrink-0"
              style={{
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                color: colors.semantic.info,
              }}
            >
              <Mail className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className="text-xs font-semibold uppercase tracking-wide mb-1"
                style={{
                  color: colors.fg.tertiary,
                  fontSize: typography.fontSize.xs,
                }}
              >
                이메일
              </h3>
              <p
                className="text-base sm:text-lg font-medium truncate"
                style={{
                  color: colors.fg.primary,
                  fontSize: typography.fontSize.lg,
                }}
              >
                {user.email}
              </p>
            </div>
          </motion.div>

          {/* Provider */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-start gap-4 p-4 rounded-xl"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: `1px solid rgba(255, 255, 255, 0.05)`,
            }}
          >
            <div
              className="p-2 rounded-lg flex-shrink-0"
              style={{
                backgroundColor: `${getProviderColor(user.provider)}15`,
                color: getProviderColor(user.provider),
              }}
            >
              <Shield className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3
                className="text-xs font-semibold uppercase tracking-wide mb-1"
                style={{
                  color: colors.fg.tertiary,
                  fontSize: typography.fontSize.xs,
                }}
              >
                로그인 제공자
              </h3>
              <div className="flex items-center gap-2">
                <p
                  className="text-base sm:text-lg font-medium capitalize"
                  style={{
                    color: colors.fg.primary,
                    fontSize: typography.fontSize.lg,
                  }}
                >
                  {user.provider === 'google' ? '구글' : '네이버'}
                </p>
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: `${getProviderColor(user.provider)}15`,
                    color: getProviderColor(user.provider),
                  }}
                >
                  인증됨
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ marginTop: spacing[3] }}
      >
        <Link
          href="/bookmarks"
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl font-medium transition-all"
          style={{
            background: `linear-gradient(135deg, ${colors.accent.indigo}, ${colors.accent.indigoHover})`,
            color: colors.fg.primary,
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.medium,
            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(79, 70, 229, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.3)';
          }}
        >
          <Bookmark className="w-5 h-5" />
          내 북마크 보기
        </Link>
      </motion.div>
    </div>
  );
}
