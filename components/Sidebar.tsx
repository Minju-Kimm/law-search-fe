'use client';

import { Search, Mic, X, Menu } from 'lucide-react';
import type { Scope } from '@/lib/api';
import { getTheme, getScopeName, GRADIENTS, ALL_THEME, CIVIL_THEME, CRIMINAL_THEME } from '@/lib/constants/theme';

interface SidebarProps {
  scope: Scope;
  onScopeChange: (scope: Scope) => void;
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: (e: React.FormEvent) => void;
  isListening: boolean;
  onVoiceSearch: () => void;
  isMobileOpen: boolean;
  onMobileToggle: () => void;
}

export function Sidebar({
  scope,
  onScopeChange,
  query,
  onQueryChange,
  onSearch,
  isListening,
  onVoiceSearch,
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
          fixed top-0 left-0 h-screen w-80 z-40
          transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static
          shadow-2xl
        `}
        style={{ background: theme.bgColor }}
      >
        <div className="h-full flex flex-col p-6">
          {/* 닫기 버튼 (모바일) */}
          <button
            onClick={onMobileToggle}
            className="lg:hidden absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-colors"
            aria-label="메뉴 닫기"
          >
            <X className="w-6 h-6" style={{ color: theme.textColor }} />
          </button>

          {/* 로고 영역 */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2" style={{ color: theme.textColor }}>
              법률 검색
            </h1>
            <p className="text-sm opacity-70" style={{ color: theme.textColor }}>
              빠르고 정확한 조문 찾기
            </p>
          </div>

          {/* 법 범위 선택: 전체/민법/형법 */}
          <div className="mb-6">
            <label className="text-sm font-semibold mb-2 block" style={{ color: theme.textColor }}>
              법 범위 선택
            </label>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => onScopeChange('all')}
                className={`py-2.5 px-4 rounded-xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
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
                className={`py-2.5 px-4 rounded-xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
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
                className={`py-2.5 px-4 rounded-xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
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

          {/* 검색 영역 */}
          <form onSubmit={onSearch} className="mb-6">
            <label className="text-sm font-semibold mb-2 block" style={{ color: theme.textColor }}>
              조문 검색
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Search className="w-5 h-5 opacity-50" style={{ color: theme.textColor }} />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="조문 번호나 키워드..."
                className="w-full pl-10 pr-10 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all"
                style={{
                  backgroundColor: 'white',
                  borderColor: theme.borderColor,
                }}
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <div className="flex gap-2 mt-3">
              <button
                type="button"
                onClick={onVoiceSearch}
                className="flex-1 py-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 font-semibold shadow-md"
                style={{
                  background: isListening ? GRADIENTS.danger : theme.gradient,
                  color: 'white',
                }}
                aria-label="음성 검색"
              >
                <Mic className="w-5 h-5 mx-auto" />
              </button>
              <button
                type="submit"
                className="flex-[3] py-2.5 rounded-xl text-white font-semibold transition-all hover:scale-105 active:scale-95 shadow-md"
                style={{ background: theme.gradient }}
              >
                검색
              </button>
            </div>
          </form>

          {/* 안내 텍스트 */}
          <div
            className="p-4 rounded-xl text-sm"
            style={{
              backgroundColor: theme.lightBg,
              color: theme.textColor,
            }}
          >
            <p className="font-semibold mb-2">검색 팁</p>
            <ul className="space-y-1 text-xs opacity-80">
              <li>• 조문 번호: 예) 2, 103</li>
              <li>• 키워드: 예) 신의성실, 계약</li>
              <li>• 음성 검색도 지원합니다</li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}
