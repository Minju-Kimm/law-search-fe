import type { Scope } from '@/lib/api';

// 전체 - 중립 회색/청색톤 테마
export const ALL_THEME = {
  gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
  accentGradient: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
  bgColor: '#f8fafc',
  textColor: '#1e40af',
  lightBg: 'rgba(59, 130, 246, 0.05)',
  borderColor: 'rgba(59, 130, 246, 0.3)',
  hoverBg: 'rgba(59, 130, 246, 0.1)',
} as const;

// 민법 - 녹색톤 테마
export const CIVIL_THEME = {
  gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  accentGradient: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
  bgColor: '#f0fdf4',
  textColor: '#065f46',
  lightBg: 'rgba(16, 185, 129, 0.05)',
  borderColor: 'rgba(16, 185, 129, 0.3)',
  hoverBg: 'rgba(16, 185, 129, 0.1)',
} as const;

// 형법 - 보라톤 테마
export const CRIMINAL_THEME = {
  gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
  accentGradient: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
  bgColor: '#faf5ff',
  textColor: '#5b21b6',
  lightBg: 'rgba(139, 92, 246, 0.05)',
  borderColor: 'rgba(139, 92, 246, 0.3)',
  hoverBg: 'rgba(139, 92, 246, 0.1)',
} as const;

// 민사소송법 - 주황톤 테마
export const CIVIL_PROCEDURE_THEME = {
  gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  accentGradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
  bgColor: '#fffbeb',
  textColor: '#92400e',
  lightBg: 'rgba(245, 158, 11, 0.05)',
  borderColor: 'rgba(245, 158, 11, 0.3)',
  hoverBg: 'rgba(245, 158, 11, 0.1)',
} as const;

// 형사소송법 - 빨강톤 테마
export const CRIMINAL_PROCEDURE_THEME = {
  gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  accentGradient: 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
  bgColor: '#fef2f2',
  textColor: '#991b1b',
  lightBg: 'rgba(239, 68, 68, 0.05)',
  borderColor: 'rgba(239, 68, 68, 0.3)',
  hoverBg: 'rgba(239, 68, 68, 0.1)',
} as const;

export const GRADIENTS = {
  danger: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
} as const;

export const COLORS = {
  overlay: 'rgba(255, 255, 255, 0.96)',
  overlayDark: 'rgba(0, 0, 0, 0.7)',
  glass: 'rgba(255, 255, 255, 0.10)',
  border: 'rgba(255, 255, 255, 0.30)',
} as const;

export function getTheme(scope: Scope) {
  if (scope === 'all') return ALL_THEME;
  if (scope === 'civil') return CIVIL_THEME;
  if (scope === 'criminal') return CRIMINAL_THEME;
  if (scope === 'civil_procedure') return CIVIL_PROCEDURE_THEME;
  return CRIMINAL_PROCEDURE_THEME;
}

export function getScopeName(scope: Scope) {
  if (scope === 'all') return '전체';
  if (scope === 'civil') return '민법';
  if (scope === 'criminal') return '형법';
  if (scope === 'civil_procedure') return '민사소송법';
  return '형사소송법';
}

// lawCode 기반 배지 설정
export const LAW_BADGES = {
  CIVIL_CODE: {
    label: '민법',
    textColor: '#006141',
    bgColor: '#F6F8F7',
  },
  CRIMINAL_CODE: {
    label: '형법',
    textColor: '#7C3AED',
    bgColor: '#F7F6FB',
  },
  CIVIL_PROCEDURE_CODE: {
    label: '민사소송법',
    textColor: '#d97706',
    bgColor: '#FEF9EC',
  },
  CRIMINAL_PROCEDURE_CODE: {
    label: '형사소송법',
    textColor: '#dc2626',
    bgColor: '#FEF2F2',
  },
} as const;
