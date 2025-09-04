// ENS DAO Finance Board Design System
// Professional financial dashboard with terminal interface

export const designSystem = {
  // Color Palette - Professional Financial Theme
  colors: {
    // Primary Brand Colors
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9', // Primary blue
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },

    // Secondary - Professional Gray Scale
    gray: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },

    // Semantic Colors
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
    },

    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
    },

    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
    },

    // Terminal Specific
    terminal: {
      background: '#0f172a', // slate-900
      foreground: '#f1f5f9', // slate-100
      accent: '#38bdf8',     // blue-400
      success: '#22c55e',    // green-500
      warning: '#f59e0b',    // amber-500
      error: '#ef4444',      // red-500
    },

    // Financial Specific
    positive: '#22c55e',    // Green for gains
    negative: '#ef4444',    // Red for losses
    neutral: '#64748b',     // Gray for neutral
  },

  // Typography System
  typography: {
    // Font Families
    fonts: {
      primary: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'monospace'],
      display: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
    },

    // Font Sizes (rem units)
    sizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
    },

    // Font Weights
    weights: {
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },

    // Line Heights
    lineHeights: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },

    // Letter Spacing
    letterSpacing: {
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  // Spacing System (rem units)
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },

  // Shadows
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-Index Scale
  zIndex: {
    auto: 'auto',
    0: 0,
    10: 10,
    20: 20,
    30: 30,
    40: 40,
    50: 50,
  },

  // Animation & Transitions
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      linear: 'linear',
      in: 'ease-in',
      out: 'ease-out',
      inOut: 'ease-in-out',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },

  // Component Specific Styles
  components: {
    // Terminal Styles
    terminal: {
      background: 'colors.gray.900',
      foreground: 'colors.gray.100',
      accent: 'colors.primary.400',
      border: 'colors.gray.700',
      prompt: 'colors.primary.400',
      success: 'colors.success.500',
      error: 'colors.error.500',
      warning: 'colors.warning.500',
    },

    // Dashboard Card Styles
    card: {
      background: 'colors.gray.50',
      border: 'colors.gray.200',
      shadow: 'shadows.sm',
      hover: {
        shadow: 'shadows.md',
        border: 'colors.primary.300',
      },
    },

    // Button Variants
    button: {
      primary: {
        background: 'colors.primary.500',
        hover: 'colors.primary.600',
        text: 'colors.gray.50',
      },
      secondary: {
        background: 'colors.gray.100',
        hover: 'colors.gray.200',
        text: 'colors.gray.900',
      },
      danger: {
        background: 'colors.error.500',
        hover: 'colors.error.600',
        text: 'colors.gray.50',
      },
    },

    // Status Indicators
    status: {
      online: 'colors.success.500',
      offline: 'colors.gray.400',
      warning: 'colors.warning.500',
      error: 'colors.error.500',
      loading: 'colors.primary.500',
    },
  },

  // Financial Specific Styles
  financial: {
    positive: {
      color: 'colors.success.600',
      background: 'colors.success.50',
    },
    negative: {
      color: 'colors.error.600',
      background: 'colors.error.50',
    },
    neutral: {
      color: 'colors.gray.600',
      background: 'colors.gray.50',
    },
  },

  // Utility Classes
  utilities: {
    // Container Classes
    container: {
      maxWidth: '1200px',
      padding: 'spacing.4',
    },

    // Text Utilities
    text: {
      muted: 'colors.gray.500',
      emphasis: 'colors.gray.900',
      link: 'colors.primary.600',
      'link-hover': 'colors.primary.700',
    },

    // Layout Utilities
    flex: {
      center: 'justify-center items-center',
      between: 'justify-between items-center',
      start: 'justify-start items-start',
      end: 'justify-end items-end',
    },
  },
};

// CSS Custom Properties for Runtime Usage
export const cssVariables = `
  :root {
    /* Primary Colors */
    --color-primary-50: ${designSystem.colors.primary[50]};
    --color-primary-500: ${designSystem.colors.primary[500]};
    --color-primary-600: ${designSystem.colors.primary[600]};
    --color-primary-700: ${designSystem.colors.primary[700]};

    /* Gray Scale */
    --color-gray-50: ${designSystem.colors.gray[50]};
    --color-gray-100: ${designSystem.colors.gray[100]};
    --color-gray-200: ${designSystem.colors.gray[200]};
    --color-gray-300: ${designSystem.colors.gray[300]};
    --color-gray-400: ${designSystem.colors.gray[400]};
    --color-gray-500: ${designSystem.colors.gray[500]};
    --color-gray-600: ${designSystem.colors.gray[600]};
    --color-gray-700: ${designSystem.colors.gray[700]};
    --color-gray-800: ${designSystem.colors.gray[800]};
    --color-gray-900: ${designSystem.colors.gray[900]};

    /* Semantic Colors */
    --color-success: ${designSystem.colors.success[500]};
    --color-warning: ${designSystem.colors.warning[500]};
    --color-error: ${designSystem.colors.error[500]};

    /* Terminal Colors */
    --color-terminal-bg: ${designSystem.colors.terminal.background};
    --color-terminal-fg: ${designSystem.colors.terminal.foreground};
    --color-terminal-accent: ${designSystem.colors.terminal.accent};

    /* Financial Colors */
    --color-positive: ${designSystem.colors.positive};
    --color-negative: ${designSystem.colors.negative};
    --color-neutral: ${designSystem.colors.neutral};

    /* Typography */
    --font-primary: ${designSystem.typography.fonts.primary.join(', ')};
    --font-mono: ${designSystem.typography.fonts.mono.join(', ')};
    --font-display: ${designSystem.typography.fonts.display.join(', ')};

    /* Font Sizes */
    --text-xs: ${designSystem.typography.sizes.xs};
    --text-sm: ${designSystem.typography.sizes.sm};
    --text-base: ${designSystem.typography.sizes.base};
    --text-lg: ${designSystem.typography.sizes.lg};
    --text-xl: ${designSystem.typography.sizes.xl};
    --text-2xl: ${designSystem.typography.sizes['2xl']};
    --text-3xl: ${designSystem.typography.sizes['3xl']};

    /* Spacing */
    --space-1: ${designSystem.spacing[1]};
    --space-2: ${designSystem.spacing[2]};
    --space-3: ${designSystem.spacing[3]};
    --space-4: ${designSystem.spacing[4]};
    --space-6: ${designSystem.spacing[6]};
    --space-8: ${designSystem.spacing[8]};
    --space-12: ${designSystem.spacing[12]};

    /* Shadows */
    --shadow-sm: ${designSystem.shadows.sm};
    --shadow-md: ${designSystem.shadows.md};
    --shadow-lg: ${designSystem.shadows.lg};

    /* Border Radius */
    --radius-sm: ${designSystem.borderRadius.sm};
    --radius-md: ${designSystem.borderRadius.md};
    --radius-lg: ${designSystem.borderRadius.lg};
    --radius-full: ${designSystem.borderRadius.full};

    /* Animations */
    --duration-fast: ${designSystem.animations.duration.fast};
    --duration-normal: ${designSystem.animations.duration.normal};
    --duration-slow: ${designSystem.animations.duration.slow};
  }
`;

// Tailwind Configuration Helper
export const tailwindConfig = {
  theme: {
    extend: {
      colors: designSystem.colors,
      fontFamily: designSystem.typography.fonts,
      fontSize: designSystem.typography.sizes,
      fontWeight: designSystem.typography.weights,
      lineHeight: designSystem.typography.lineHeights,
      letterSpacing: designSystem.typography.letterSpacing,
      spacing: designSystem.spacing,
      borderRadius: designSystem.borderRadius,
      boxShadow: designSystem.shadows,
      screens: designSystem.breakpoints,
      zIndex: designSystem.zIndex,
      transitionDuration: designSystem.animations.duration,
      transitionTimingFunction: designSystem.animations.easing,
    },
  },
};

// Terminal Colors - Medium Theme
export const terminalColors = {
  background: '#f1f5f9', // slate-100 (medium light background)
  foreground: '#334155', // slate-700 (medium dark text)
  accent: '#2563eb',     // blue-600
  success: '#059669',    // emerald-600
  error: '#dc2626',      // red-600
  warning: '#d97706',    // amber-600
  border: '#cbd5e1',     // slate-300
  secondary: '#e2e8f0',  // slate-200
  card: '#ffffff',       // white
};

// Export default
export default designSystem;
