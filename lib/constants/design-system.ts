/**
 * LexSearch Design System
 * Notion/Linear inspired minimal & premium UI
 * Based on 8px scale for consistency
 */

// ==================== COLORS ====================
export const colors = {
  // Background - Dark mode
  bg: {
    primary: '#0B1220',
    secondary: '#0F172A',
    tertiary: '#1E293B',
    elevated: '#1E293B',
  },

  // Foreground - Slate tones
  fg: {
    primary: '#F8FAFC',
    secondary: '#CBD5E1',
    tertiary: '#94A3B8',
    quaternary: '#64748B',
  },

  // Accent colors
  accent: {
    indigo: '#4F46E5',
    indigoHover: '#4338CA',
    emerald: '#10B981',
    emeraldHover: '#059669',
  },

  // Law-specific colors (for badges & themes)
  law: {
    civil: {
      primary: '#10B981',
      bg: 'rgba(16, 185, 129, 0.1)',
      border: 'rgba(16, 185, 129, 0.2)',
      text: '#10B981',
    },
    criminal: {
      primary: '#8B5CF6',
      bg: 'rgba(139, 92, 246, 0.1)',
      border: 'rgba(139, 92, 246, 0.2)',
      text: '#8B5CF6',
    },
    civilProcedure: {
      primary: '#F59E0B',
      bg: 'rgba(245, 158, 11, 0.1)',
      border: 'rgba(245, 158, 11, 0.2)',
      text: '#F59E0B',
    },
    criminalProcedure: {
      primary: '#EF4444',
      bg: 'rgba(239, 68, 68, 0.1)',
      border: 'rgba(239, 68, 68, 0.2)',
      text: '#EF4444',
    },
  },

  // Semantic colors
  semantic: {
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
  },

  // Overlay
  overlay: 'rgba(11, 18, 32, 0.8)',
} as const;

// ==================== SPACING ====================
// 8px scale: 8, 16, 24, 32, 40, 48, 56, 64...
export const spacing = {
  0: '0',
  1: '8px',   // 8px
  2: '16px',  // 16px
  3: '24px',  // 24px
  4: '32px',  // 32px
  5: '40px',  // 40px
  6: '48px',  // 48px
  7: '56px',  // 56px
  8: '64px',  // 64px
  9: '72px',  // 72px
  10: '80px', // 80px
} as const;

// ==================== TYPOGRAPHY ====================
// Font sizes in 8px scale
export const typography = {
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

  fontSize: {
    xs: '12px',    // Small labels
    sm: '14px',    // Body small
    base: '16px',  // Body
    lg: '18px',    // Body large
    xl: '24px',    // H3
    '2xl': '32px', // H2
    '3xl': '40px', // H1
  },

  lineHeight: {
    tight: '1.2',
    normal: '1.5',
    relaxed: '1.75',
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

// ==================== RADIUS ====================
export const radius = {
  sm: '8px',
  md: '14px',
  lg: '16px',
  xl: '24px',
  full: '9999px',
} as const;

// ==================== SHADOWS ====================
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
} as const;

// ==================== TRANSITIONS ====================
export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  normal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// ==================== BREAKPOINTS ====================
export const breakpoints = {
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px',
} as const;

// ==================== ANIMATIONS ====================
export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },

  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  },

  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.3 },
  },

  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.2 },
  },
} as const;

// ==================== HELPER FUNCTIONS ====================
export function getLawColor(lawCode: string) {
  switch (lawCode) {
    case 'CIVIL_CODE':
      return colors.law.civil;
    case 'CRIMINAL_CODE':
      return colors.law.criminal;
    case 'CIVIL_PROCEDURE_CODE':
      return colors.law.civilProcedure;
    case 'CRIMINAL_PROCEDURE_CODE':
      return colors.law.criminalProcedure;
    default:
      return colors.law.civil;
  }
}

export function getLawName(lawCode: string) {
  switch (lawCode) {
    case 'CIVIL_CODE':
      return '민법';
    case 'CRIMINAL_CODE':
      return '형법';
    case 'CIVIL_PROCEDURE_CODE':
      return '민사소송법';
    case 'CRIMINAL_PROCEDURE_CODE':
      return '형사소송법';
    default:
      return '법률';
  }
}
