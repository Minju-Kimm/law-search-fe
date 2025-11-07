'use client';

import { X, Filter } from 'lucide-react';
import type { Scope } from '@/lib/api';
import { colors, getLawColor } from '@/lib/constants/design-system';

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
  const scopeOptions: Array<{ value: Scope; label: string; lawCode: string }> = [
    { value: 'all', label: '전체', lawCode: 'CIVIL_CODE' },
    { value: 'civil', label: '민법', lawCode: 'CIVIL_CODE' },
    { value: 'criminal', label: '형법', lawCode: 'CRIMINAL_CODE' },
    { value: 'civil_procedure', label: '민사소송법', lawCode: 'CIVIL_PROCEDURE_CODE' },
    { value: 'criminal_procedure', label: '형사소송법', lawCode: 'CRIMINAL_PROCEDURE_CODE' },
  ];

  return (
    <>
      {/* 모바일 햄버거 버튼 - 사이드바가 열리면 숨김 */}
      {!isMobileOpen && (
        <button
          onClick={onMobileToggle}
          className="lg:hidden fixed top-20 left-4 z-50 p-2 rounded-lg shadow-md transition-all hover:scale-105 active:scale-95"
          style={{ background: colors.accent.indigo }}
          aria-label="메뉴 열기"
        >
          <Filter className="w-4 h-4 text-white" />
        </button>
      )}

      {/* 모바일 오버레이 */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40"
          style={{ background: colors.overlay }}
          onClick={onMobileToggle}
        />
      )}

      {/* 사이드바 */}
      <aside
        className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] w-72 z-40
          transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0 lg:h-screen lg:top-0
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{
          background: colors.bg.secondary,
          borderRight: `1px solid ${colors.bg.tertiary}`,
        }}
      >
        <div className="h-full flex flex-col p-6">
          {/* 닫기 버튼 (모바일) */}
          <button
            onClick={onMobileToggle}
            className="lg:hidden absolute top-4 right-4 p-2 rounded-lg transition-colors"
            aria-label="메뉴 닫기"
            style={{ color: colors.fg.tertiary }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.bg.tertiary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <X className="w-5 h-5" />
          </button>

          {/* 헤더 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <Filter className="w-6 h-6" style={{ color: colors.accent.indigo }} />
              <h2 className="text-xl font-bold" style={{ color: colors.fg.primary }}>
                법률 범위
              </h2>
            </div>
            <p className="text-sm" style={{ color: colors.fg.tertiary }}>
              검색할 법률을 선택하세요
            </p>
          </div>

          {/* 법 범위 선택 */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col gap-3">
              {scopeOptions.map((option) => {
                const lawColor = getLawColor(option.lawCode);
                const isActive = scope === option.value;

                return (
                  <button
                    key={option.value}
                    onClick={() => onScopeChange(option.value)}
                    className="py-4 px-5 rounded-xl font-semibold text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: isActive ? lawColor.primary : lawColor.bg,
                      color: isActive ? 'white' : lawColor.text,
                      border: `2px solid ${isActive ? lawColor.primary : lawColor.border}`,
                    }}
                    aria-pressed={isActive}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
