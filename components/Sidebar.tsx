'use client';

import { X, Menu } from 'lucide-react';
import type { Scope } from '@/lib/api';
import { getTheme, ALL_THEME, CIVIL_THEME, CRIMINAL_THEME } from '@/lib/constants/theme';

interface SidebarProps {
  scope: Scope;
  onScopeChange: (scope: Scope) => void;
  isMobileOpen: boolean;
  onMobileToggle: () => void;
}

export function Sidebar({
  scope,
  onScopeChange,
  isMobileOpen,
  onMobileToggle,
}: SidebarProps) {
  const theme = getTheme(scope);

  return (
    <>
      {/* 모바일 햄버거 버튼 */}
      <button
        onClick={onMobileToggle}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-full shadow-lg transition-all hover:scale-105"
        style={{ background: theme.gradient }}
        aria-label="메뉴 열기"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      {/* 모바일 오버레이 */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onMobileToggle}
        />
      )}

      {/* 사이드바 */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-72 sm:w-80 z-40
          transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static
          shadow-2xl
        `}
        style={{ background: theme.bgColor }}
      >
        <div className="h-full flex flex-col p-5 sm:p-6">
          {/* 닫기 버튼 (모바일) */}
          <button
            onClick={onMobileToggle}
            className="lg:hidden absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-colors"
            aria-label="메뉴 닫기"
          >
            <X className="w-6 h-6" style={{ color: theme.textColor }} />
          </button>

          {/* 로고 영역 */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2" style={{ color: theme.textColor }}>
              법률 검색
            </h1>
            <p className="text-xs sm:text-sm opacity-70" style={{ color: theme.textColor }}>
              빠르고 정확한 조문 찾기
            </p>
          </div>

          {/* 법 범위 선택: 전체/민법/형법 */}
          <div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => onScopeChange('all')}
                className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl font-semibold text-sm sm:text-base transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  scope === 'all' ? 'shadow-md' : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  background: scope === 'all' ? ALL_THEME.gradient : ALL_THEME.lightBg,
                  color: scope === 'all' ? 'white' : ALL_THEME.textColor,
                }}
                aria-pressed={scope === 'all'}
              >
                전체
              </button>
              <button
                onClick={() => onScopeChange('civil')}
                className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl font-semibold text-sm sm:text-base transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  scope === 'civil' ? 'shadow-md' : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  background: scope === 'civil' ? CIVIL_THEME.gradient : CIVIL_THEME.lightBg,
                  color: scope === 'civil' ? 'white' : CIVIL_THEME.textColor,
                }}
                aria-pressed={scope === 'civil'}
              >
                민법
              </button>
              <button
                onClick={() => onScopeChange('criminal')}
                className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl font-semibold text-sm sm:text-base transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  scope === 'criminal' ? 'shadow-md' : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  background: scope === 'criminal' ? CRIMINAL_THEME.gradient : CRIMINAL_THEME.lightBg,
                  color: scope === 'criminal' ? 'white' : CRIMINAL_THEME.textColor,
                }}
                aria-pressed={scope === 'criminal'}
              >
                형법
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
