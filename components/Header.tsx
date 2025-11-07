'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { getLoginUrl, logout } from '@/lib/api';
import { User, LogOut, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function Header() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (loggingOut) return;
    try {
      setLoggingOut(true);
      await logout();
      router.push('/login');
      router.refresh();
    } catch (err) {
      console.error('Logout failed:', err);
      alert('로그아웃 실패');
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-lg sm:text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
          법률 검색
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4">
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
          ) : user ? (
            <>
              <Link
                href="/bookmarks"
                className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base"
              >
                <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">북마크</span>
              </Link>

              <Link
                href="/me"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                title={user.name}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                    {user.name[0].toUpperCase()}
                  </div>
                )}
                <span className="hidden sm:inline text-sm">{user.name}</span>
              </Link>

              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50 text-sm sm:text-base"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">로그아웃</span>
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base font-medium"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
              로그인
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
