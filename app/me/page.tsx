'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { User as UserIcon, Mail, Shield } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center">
          <UserIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">로그인이 필요합니다</h2>
          <p className="text-gray-600 mb-6">마이페이지를 보려면 로그인해주세요.</p>
          <Link
            href="/login"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            로그인하기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">마이페이지</h1>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
          {user.avatar ? (
            <div className="relative w-16 h-16 sm:w-20 sm:h-20">
              <Image
                src={user.avatar}
                alt={user.name}
                fill
                className="rounded-full object-cover"
                sizes="(max-width: 640px) 64px, 80px"
              />
            </div>
          ) : (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">
              {user.name[0].toUpperCase()}
            </div>
          )}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-sm sm:text-base text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <UserIcon className="w-6 h-6 text-gray-400 mt-1" />
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">사용자 ID</h3>
              <p className="text-base sm:text-lg text-gray-900">{user.id}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 text-gray-400 mt-1" />
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">이메일</h3>
              <p className="text-base sm:text-lg text-gray-900">{user.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-gray-400 mt-1" />
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">로그인 제공자</h3>
              <p className="text-base sm:text-lg text-gray-900 capitalize">
                {user.provider === 'google' ? '구글' : '네이버'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Link
          href="/bookmarks"
          className="block w-full sm:w-auto text-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          내 북마크 보기
        </Link>
      </div>
    </div>
  );
}
