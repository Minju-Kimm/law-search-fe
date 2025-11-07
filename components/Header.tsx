'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { logout } from '@/lib/api';
import { User, LogOut, Bookmark, Scale } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { colors } from '@/lib/constants/design-system';
import toast from 'react-hot-toast';

export function Header() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (loggingOut) return;
    try {
      setLoggingOut(true);
      await logout();
      toast.success('로그아웃되었습니다');
      router.push('/login');
      router.refresh();
    } catch (err) {
      console.error('Logout failed:', err);
      toast.error('로그아웃 실패');
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 backdrop-blur-lg"
      style={{
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        borderBottom: `1px solid ${colors.bg.tertiary}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 group"
        >
          <Scale className="w-6 h-6 text-accent-indigo group-hover:rotate-12 transition-transform" />
          <div className="flex flex-col">
            <span className="text-lg font-bold text-fg-primary">
              LexSearch
            </span>
            <span className="text-xs text-fg-tertiary hidden sm:block">
              가장 빠른 법률검색
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          {loading ? (
            <div
              className="w-8 h-8 rounded-full animate-pulse"
              style={{ background: colors.bg.tertiary }}
            />
          ) : user ? (
            <>
              <Link
                href="/bookmarks"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-bg-tertiary transition-all text-sm"
                style={{ color: colors.fg.secondary }}
              >
                <Bookmark className="w-4 h-4" />
                <span className="hidden sm:inline">북마크</span>
              </Link>

              <Link
                href="/me"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-bg-tertiary transition-all"
                title={user.name}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full" />
                ) : (
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                    style={{ background: colors.accent.indigo }}
                  >
                    {user.name[0].toUpperCase()}
                  </div>
                )}
                <span className="hidden sm:inline text-sm" style={{ color: colors.fg.secondary }}>
                  {user.name}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all disabled:opacity-50 text-sm"
                style={{
                  color: colors.fg.secondary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                  e.currentTarget.style.color = colors.semantic.error;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = colors.fg.secondary;
                }}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">로그아웃</span>
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-xs sm:text-sm font-medium text-white"
              style={{ background: colors.accent.indigo }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = colors.accent.indigoHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = colors.accent.indigo;
              }}
            >
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">로그인</span>
            </Link>
          )}
        </nav>
      </div>
    </motion.header>
  );
}
