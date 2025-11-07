/**
 * API 클라이언트 테스트
 *
 * 간단한 모킹을 통한 단위 테스트
 */

// Mock fetch
global.fetch = jest.fn();

import { getMe, getBookmarks, createBookmark, deleteBookmark, logout } from '../api';

describe('API Client', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  describe('getMe', () => {
    it('should fetch user data successfully', async () => {
      const mockUser = {
        user: {
          id: '123',
          email: 'test@example.com',
          name: 'Test User',
          provider: 'google' as const,
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockUser,
      });

      const result = await getMe();
      expect(result).toEqual(mockUser);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/users/me'),
        expect.objectContaining({ credentials: 'include' })
      );
    });

    it('should throw error on 401', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        text: async () => 'Unauthorized',
      });

      await expect(getMe()).rejects.toThrow();
    });
  });

  describe('getBookmarks', () => {
    it('should fetch bookmarks successfully', async () => {
      const mockBookmarks = [
        {
          id: '1',
          userId: '123',
          articleId: 'art-1',
          joCode: '제1조',
          lawType: 'civil' as const,
          heading: '권리능력의 존속기간',
          createdAt: '2024-01-01T00:00:00Z',
        },
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockBookmarks,
      });

      const result = await getBookmarks();
      expect(result).toEqual(mockBookmarks);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/bookmarks'),
        expect.objectContaining({ credentials: 'include' })
      );
    });
  });

  describe('createBookmark', () => {
    it('should create bookmark successfully', async () => {
      const newBookmark = {
        articleId: 'art-1',
        joCode: '제1조',
        lawType: 'civil' as const,
        heading: '권리능력의 존속기간',
      };

      const mockResponse = {
        id: '1',
        userId: '123',
        ...newBookmark,
        createdAt: '2024-01-01T00:00:00Z',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => mockResponse,
      });

      const result = await createBookmark(newBookmark);
      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/bookmarks'),
        expect.objectContaining({
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newBookmark),
        })
      );
    });
  });

  describe('deleteBookmark', () => {
    it('should delete bookmark successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 204,
      });

      await expect(deleteBookmark('1')).resolves.not.toThrow();
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/bookmarks/1'),
        expect.objectContaining({
          method: 'DELETE',
          credentials: 'include',
        })
      );
    });

    it('should throw error on failure', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      await expect(deleteBookmark('999')).rejects.toThrow('Delete failed');
    });
  });

  describe('logout', () => {
    it('should logout successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
      });

      await expect(logout()).resolves.not.toThrow();
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/auth/logout'),
        expect.objectContaining({
          method: 'POST',
          credentials: 'include',
        })
      );
    });
  });
});
