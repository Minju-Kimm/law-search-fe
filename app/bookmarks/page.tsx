'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/contexts/AuthContext';
import { Bookmark as BookmarkType, getBookmarks, deleteBookmark } from '@/lib/api';
import { Trash2, Bookmark as BookmarkIcon, Plus, Filter } from 'lucide-react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import Link from 'next/link';
import { colors, getLawColor, getLawName } from '@/lib/constants/design-system';
import toast from 'react-hot-toast';

type FilterType = 'all' | 'civil' | 'criminal' | 'civil_procedure' | 'criminal_procedure';

export default function BookmarksPage() {
  const { user, loading: authLoading } = useAuth();
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    if (!authLoading && user) {
      fetchBookmarks();
    } else if (!authLoading && !user) {
      setLoading(false);
    }
  }, [authLoading, user]);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getBookmarks();
      // 최신순 정렬
      const sorted = data.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setBookmarks(sorted);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch bookmarks');
    } finally {
      setLoading(false);
    }
  };

  // 필터링된 북마크
  const filteredBookmarks = useMemo(() => {
    if (filter === 'all') return bookmarks;
    return bookmarks.filter((b) => b.lawType === filter);
  }, [bookmarks, filter]);

  // 필터 라벨 가져오기
  const getFilterLabel = (filterType: FilterType) => {
    switch (filterType) {
      case 'all': return '전체';
      case 'civil': return '민법';
      case 'criminal': return '형법';
      case 'civil_procedure': return '민사소송법';
      case 'criminal_procedure': return '형사소송법';
    }
  };

  const handleDelete = async (id: string) => {
    if (deletingIds.has(id)) return;

    // 낙관적 업데이트
    const previousBookmarks = [...bookmarks];
    setBookmarks(bookmarks.filter((b) => b.id !== id));
    setDeletingIds(new Set(deletingIds).add(id));

    try {
      await deleteBookmark(id);
      toast.success('북마크가 삭제되었습니다');
    } catch (err: any) {
      // 롤백
      setBookmarks(previousBookmarks);
      toast.error(`삭제 실패: ${err.message}`);
    } finally {
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  // lawCode 매핑
  const getLawCodeFromType = (lawType: string): string => {
    switch (lawType) {
      case 'civil': return 'CIVIL_CODE';
      case 'criminal': return 'CRIMINAL_CODE';
      case 'civil_procedure': return 'CIVIL_PROCEDURE_CODE';
      case 'criminal_procedure': return 'CRIMINAL_PROCEDURE_CODE';
      default: return 'CIVIL_CODE';
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen" style={{ background: colors.bg.primary }}>
        <div className="max-w-5xl mx-auto px-4 py-12">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen" style={{ background: colors.bg.primary }}>
        <div className="max-w-5xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <BookmarkIcon className="w-16 h-16 mx-auto mb-4" style={{ color: colors.fg.tertiary }} />
            <h2 className="text-2xl font-bold mb-2" style={{ color: colors.fg.primary }}>
              로그인이 필요합니다
            </h2>
            <p className="mb-6" style={{ color: colors.fg.tertiary }}>
              북마크 기능을 사용하려면 로그인해주세요.
            </p>
            <Link
              href="/login"
              className="inline-block px-6 py-3 rounded-lg font-medium text-white transition-all"
              style={{ background: colors.accent.indigo }}
            >
              로그인하기
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: colors.bg.primary }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6 sm:mb-8"
        >
          <div className="flex items-center gap-3">
            <BookmarkIcon className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: colors.accent.indigo }} />
            <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: colors.fg.primary }}>
              내 북마크
            </h1>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium text-white"
            style={{ background: colors.accent.indigo }}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">북마크 추가</span>
          </Link>
        </motion.div>

        {/* 필터 버튼 */}
        {!loading && bookmarks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-2 mb-6 overflow-x-auto pb-2"
          >
            {(['all', 'civil', 'criminal', 'civil_procedure', 'criminal_procedure'] as FilterType[]).map((f) => (
              <motion.button
                key={f}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap"
                style={{
                  background: filter === f ? colors.accent.indigo : colors.bg.elevated,
                  color: filter === f ? '#fff' : colors.fg.secondary,
                  border: `1px solid ${filter === f ? colors.accent.indigo : 'rgba(255, 255, 255, 0.06)'}`,
                }}
              >
                {getFilterLabel(f)}
                {f === 'all' && ` (${bookmarks.length})`}
                {f !== 'all' && ` (${bookmarks.filter((b) => b.lawType === f).length})`}
              </motion.button>
            ))}
          </motion.div>
        )}

        {error && <ErrorMessage message={error} />}

        {!loading && filteredBookmarks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 rounded-xl"
            style={{ background: colors.bg.elevated, border: '1px solid rgba(255, 255, 255, 0.06)' }}
          >
            <BookmarkIcon className="w-16 h-16 mx-auto mb-4" style={{ color: colors.fg.tertiary }} />
            <h3 className="text-xl font-semibold mb-2" style={{ color: colors.fg.primary }}>
              {bookmarks.length === 0 ? '아직 북마크가 없습니다' : '해당 필터의 북마크가 없습니다'}
            </h3>
            <p className="mb-6" style={{ color: colors.fg.tertiary }}>
              {bookmarks.length === 0
                ? '법률 조문을 검색하고 북마크를 추가해보세요.'
                : '다른 법률의 북마크를 확인해보세요.'}
            </p>
            {bookmarks.length === 0 && (
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-all font-medium text-white"
                style={{ background: colors.accent.indigo }}
              >
                <Plus className="w-5 h-5" />
                검색하러 가기
              </Link>
            )}
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredBookmarks.map((bookmark, index) => {
              const lawCode = getLawCodeFromType(bookmark.lawType);
              const lawColor = getLawColor(lawCode);
              const lawName = getLawName(lawCode);

              return (
                <motion.div
                  key={bookmark.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -2 }}
                  className="rounded-xl p-5 sm:p-6 transition-all"
                  style={{
                    background: colors.bg.elevated,
                    border: `1px solid ${lawColor.border}`,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="text-xs font-semibold px-2.5 py-1 rounded-md"
                          style={{
                            backgroundColor: lawColor.bg,
                            color: lawColor.text,
                          }}
                        >
                          {lawName}
                        </span>
                        <span className="text-sm font-medium" style={{ color: colors.fg.tertiary }}>
                          {bookmark.joCode}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold mb-3" style={{ color: colors.fg.primary }}>
                        {bookmark.heading}
                      </h3>
                      {bookmark.note && (
                        <p className="text-sm px-3 py-2 rounded-md mb-3" style={{
                          color: colors.fg.secondary,
                          background: 'rgba(245, 158, 11, 0.1)',
                          border: '1px solid rgba(245, 158, 11, 0.2)',
                        }}>
                          {bookmark.note}
                        </p>
                      )}
                      <p className="text-xs" style={{ color: colors.fg.tertiary }}>
                        {new Date(bookmark.createdAt).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(bookmark.id)}
                      disabled={deletingIds.has(bookmark.id)}
                      className="flex-shrink-0 p-2.5 rounded-lg transition-all disabled:opacity-50"
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
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
