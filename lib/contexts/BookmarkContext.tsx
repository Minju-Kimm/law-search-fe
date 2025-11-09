'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Bookmark, getBookmarks, createBookmark, deleteBookmark, LawType } from '@/lib/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface BookmarkContextType {
  bookmarks: Bookmark[];
  loading: boolean;
  isBookmarked: (joCode: string) => boolean;
  addBookmark: (data: {
    lawCode: 'CIVIL_CODE' | 'CRIMINAL_CODE' | 'CIVIL_PROCEDURE_CODE' | 'CRIMINAL_PROCEDURE_CODE';
    articleNo: number;
    memo?: string;
  }) => Promise<void>;
  removeBookmark: (joCode: string) => Promise<void>;
  refetch: () => Promise<void>;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBookmarks = async () => {
    if (!user) {
      setBookmarks([]);
      return;
    }

    try {
      setLoading(true);
      const data = await getBookmarks();
      setBookmarks(data);
    } catch (err: any) {
      // 401 에러는 인증 문제이므로 조용히 처리
      if (!err.message?.includes('401')) {
        toast.error('북마크를 불러오는데 실패했습니다');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [user]);

  const isBookmarked = (joCode: string) => {
    return bookmarks.some((b) => b.joCode === joCode);
  };

  const addBookmark = async (data: {
    lawCode: 'CIVIL_CODE' | 'CRIMINAL_CODE' | 'CIVIL_PROCEDURE_CODE' | 'CRIMINAL_PROCEDURE_CODE';
    articleNo: number;
    memo?: string;
  }) => {
    if (!user) {
      toast.error('로그인이 필요합니다');
      return;
    }

    try {
      const newBookmark = await createBookmark(data);
      setBookmarks((prev) => [...prev, newBookmark]);
      toast.success('북마크에 추가되었습니다');
    } catch (err: any) {
      console.error('북마크 추가 에러:', err);

      if (err.message === 'DUPLICATE_BOOKMARK') {
        toast.error('이미 북마크된 조문입니다.');
        return;
      }

      if (err.message?.includes('401')) {
        toast.error('인증이 만료되었습니다. 다시 로그인해주세요.');
        return;
      }

      toast.error(`북마크 추가에 실패했습니다: ${err.message}`);
    }
  };

  const removeBookmark = async (joCode: string) => {
    const bookmark = bookmarks.find((b) => b.joCode === joCode);
    if (!bookmark) return;

    // 낙관적 업데이트
    const prevBookmarks = bookmarks;
    setBookmarks((prev) => prev.filter((b) => b.joCode !== joCode));

    try {
      await deleteBookmark(String(bookmark.id));
      toast.success('북마크에서 제거되었습니다');
    } catch (err: any) {
      // 실패 시 롤백
      setBookmarks(prevBookmarks);
      toast.error('북마크 제거에 실패했습니다');
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        loading,
        isBookmarked,
        addBookmark,
        removeBookmark,
        refetch: fetchBookmarks,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmark() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmark must be used within BookmarkProvider');
  }
  return context;
}
