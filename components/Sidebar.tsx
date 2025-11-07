'use client';

import { X, Menu, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
      <AnimatePresence>
        {!isMobileOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onMobileToggle}
            className="lg:hidden fixed top-20 left-4 z-50 p-3 rounded-lg shadow-lg transition-all"
            style={{ background: colors.accent.indigo }}
            aria-label="메뉴 열기"
          >
            <Filter className="w-5 h-5 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 모바일 오버레이 */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-40"
            style={{ background: colors.overlay }}
            onClick={onMobileToggle}
          />
        )}
      </AnimatePresence>

      {/* 사이드바 */}
      <motion.aside
        initial={false}
        animate={{
          x: isMobileOpen ? 0 : '-100%',
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-72 z-40 lg:translate-x-0 lg:static"
        style={{
          background: colors.bg.secondary,
          borderRight: `1px solid ${colors.bg.tertiary}`,
        }}
      >
        <div className="h-full flex flex-col p-6">
          {/* 닫기 버튼 (모바일) */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onMobileToggle}
            className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-bg-tertiary transition-colors"
            aria-label="메뉴 닫기"
            style={{ color: colors.fg.tertiary }}
          >
            <X className="w-5 h-5" />
          </motion.button>

          {/* 헤더 */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Filter className="w-5 h-5" style={{ color: colors.accent.indigo }} />
              <h2 className="text-lg font-semibold" style={{ color: colors.fg.primary }}>
                법률 범위
              </h2>
            </div>
            <p className="text-xs" style={{ color: colors.fg.tertiary }}>
              검색할 법률을 선택하세요
            </p>
          </div>

          {/* 법 범위 선택 */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col gap-2">
              {scopeOptions.map((option, index) => {
                const lawColor = getLawColor(option.lawCode);
                const isActive = scope === option.value;

                return (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onScopeChange(option.value)}
                    className="py-3 px-4 rounded-lg font-medium text-sm transition-all"
                    style={{
                      background: isActive ? lawColor.primary : lawColor.bg,
                      color: isActive ? 'white' : lawColor.text,
                      border: `1px solid ${isActive ? lawColor.primary : lawColor.border}`,
                    }}
                    aria-pressed={isActive}
                  >
                    {option.label}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
