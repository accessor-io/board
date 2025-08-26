// Standardized Design System for ENS DAO Dashboard

export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
};

export const colors = {
  // Primary colors
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  
  // Gray scale
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Status colors
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
};

export const typography = {
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
  },
  
  fontWeights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  lineHeights: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  full: '9999px',
};

// Standardized Typography Classes
export const typographyClasses = {
  // Headings
  h1: 'text-3xl font-bold text-black tracking-tight',
  h2: 'text-2xl font-semibold text-black tracking-tight',
  h3: 'text-xl font-semibold text-black tracking-tight',
  h4: 'text-lg font-semibold text-black tracking-tight',
  h5: 'text-base font-semibold text-black tracking-tight',
  h6: 'text-sm font-semibold text-black tracking-tight',
  
  // Body text
  body: 'text-base text-black leading-relaxed',
  bodySmall: 'text-sm text-black leading-relaxed',
  bodyLarge: 'text-lg text-black leading-relaxed',
  
  // Labels and captions
  label: 'text-sm font-medium text-black uppercase tracking-wide',
  caption: 'text-xs text-black uppercase tracking-wide',
  
  // Monospace
  mono: 'font-mono text-sm text-black',
  monoSmall: 'font-mono text-xs text-black',
  
  // Links
  link: 'text-blue-600 hover:text-blue-700 font-medium',
  
  // Status text
  success: 'text-green-600 font-medium',
  warning: 'text-yellow-600 font-medium',
  error: 'text-red-600 font-medium',
  info: 'text-blue-600 font-medium',
};

// Standardized component classes
export const componentClasses = {
  // Card components
  card: {
    base: 'bg-white rounded-lg shadow-sm border border-gray-200 p-6',
    header: 'mb-4',
    title: 'text-2xl font-semibold text-black tracking-tight',
    subtitle: 'text-sm text-black mt-1',
  },
  
  // Stats cards
  statsCard: {
    base: 'glass p-4 rounded text-black',
    title: 'text-lg font-semibold mb-1',
    value: 'text-3xl font-bold',
    subtitle: 'text-sm',
  },
  
  // Tables
  table: {
    container: 'bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden',
    header: 'bg-gray-50 border-b border-gray-200',
    headerCell: 'px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wide',
    body: 'bg-white divide-y divide-gray-200',
    row: 'hover:bg-gray-50 transition-colors',
    cell: 'px-6 py-4 whitespace-nowrap text-sm text-black',
  },
  
  // Buttons
  button: {
    base: 'px-4 py-2 rounded font-medium transition-colors',
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    success: 'bg-green-600 text-white hover:bg-green-700',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700',
    error: 'bg-red-600 text-white hover:bg-red-700',
  },
  
  // Badges
  badge: {
    base: 'inline-flex px-2 py-1 text-xs font-semibold rounded text-white',
    primary: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600',
    gray: 'bg-gray-600',
  },
  
  // Navigation
  nav: {
    container: 'border-b border-gray-700',
    tabs: '-mb-px flex space-x-4',
    tab: 'py-2 px-1 border-b-2 font-medium text-sm',
    active: 'border-blue-500 text-blue-400',
    inactive: 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600',
  },
  
  // Forms
  form: {
    input: 'bg-gray-700 border border-gray-600 text-white rounded px-3 py-2',
    select: 'bg-gray-700 border border-gray-600 text-white rounded px-3 py-1',
    label: 'block text-sm font-medium text-gray-300 mb-1',
  },
  
  // Layout
  layout: {
    container: 'space-y-6',
    section: 'space-y-4',
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
    flex: 'flex items-center justify-between',
  },

  // Service Provider specific components
  serviceProvider: {
    // Container
    container: 'space-y-0',
    
    // Collapsible sections
    collapsibleSection: 'border-b border-gray-700',
    collapsibleButton: 'w-full px-4 py-3 text-left hover:bg-gray-800 transition-colors',
    collapsibleHeader: 'flex items-center justify-between',
    collapsibleTitle: 'text-sm font-semibold text-black uppercase tracking-wide',
    collapsibleSubtitle: 'text-sm text-black',
    collapsibleIcon: 'text-black text-lg',
    collapsibleContent: 'px-4 pb-4',
    
    // Metrics grid
    metricsGrid: 'grid grid-cols-4 gap-3 py-3 border-b border-gray-200',
    metricItem: 'text-center',
    metricLabel: 'text-sm font-semibold text-black uppercase tracking-wider',
    metricValue: 'text-xl font-light text-black',
    metricSubtext: 'text-xs text-black',
    
    // Info grids
    infoGrid: 'grid grid-cols-2 gap-4',
    infoItem: '',
    infoLabel: 'text-black text-sm',
    infoValue: 'font-medium text-black',
    infoValueContainer: 'flex items-center space-x-2',
    infoDot: 'inline-block w-3 h-3 rounded-full',
    
    // Description
    description: '',
    descriptionLabel: 'text-black text-sm',
    descriptionText: 'text-black mt-1',
    
    // Forum activity
    forumGrid: 'grid grid-cols-3 gap-4',
    forumItem: '',
    forumLabel: 'text-black text-sm',
    forumValue: 'font-medium text-black',
    
    // Links
    link: 'text-blue-600 hover:text-blue-800 text-sm font-medium',
    
    // Q2 Updates
    q2Update: 'border-t border-gray-100 pt-3',
    q2UpdateContainer: 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4',
    q2UpdateHeader: 'flex items-center justify-between mb-3',
    q2UpdateTitle: 'text-sm font-semibold text-black',
    q2UpdateDate: 'text-xs text-blue-600',
    q2UpdateSection: 'mb-4',
    q2UpdateSectionTitle: 'text-xs font-semibold text-black uppercase tracking-wider mb-2',
    q2UpdateList: 'space-y-1',
    q2UpdateListItem: 'text-xs text-black',
    
    // Financial status
    financialStatus: 'mb-4 p-3 bg-green-50 border border-green-200 rounded',
    financialStatusTitle: 'text-xs font-semibold text-black uppercase tracking-wider mb-2',
    financialStatusGrid: 'space-y-1 text-xs',
    financialStatusItem: '',
    financialStatusLabel: 'text-green-700',
    financialStatusValue: 'font-medium',
    
    // SPP2 Results
    spp2Results: 'mb-4 p-3 bg-blue-50 border border-blue-200 rounded',
    spp2ResultsTitle: 'text-xs font-semibold text-black uppercase tracking-wider mb-2',
    spp2ResultsGrid: 'space-y-1 text-xs',
    spp2ResultsItem: '',
    spp2ResultsLabel: 'text-blue-700',
    spp2ResultsValue: 'font-medium',
    
    // Quarterly metrics
    quarterlyMetrics: 'mb-4',
    quarterlyMetricsTitle: 'text-xs font-semibold text-black uppercase tracking-wider mb-2',
    quarterlyMetricsGrid: 'grid grid-cols-2 gap-3',
    quarterlyMetricsItem: 'text-center',
    quarterlyMetricsValue: 'text-lg font-bold text-blue-600',
    quarterlyMetricsLabel: 'text-xs text-blue-700',
    
    // Monthly breakdown
    monthlyBreakdown: 'mb-4',
    monthlyBreakdownTitle: 'text-xs font-semibold text-black uppercase tracking-wider mb-2',
    monthlyBreakdownList: 'space-y-2',
    monthlyBreakdownItem: 'bg-white border border-blue-200 rounded p-2',
    monthlyBreakdownHeader: 'flex justify-between items-center mb-1',
    monthlyBreakdownMonth: 'text-xs font-medium text-black',
    monthlyBreakdownUptime: 'text-xs text-blue-600',
    monthlyBreakdownGrid: 'grid grid-cols-3 gap-2 text-xs',
    monthlyBreakdownGridItem: '',
    monthlyBreakdownGridLabel: 'text-blue-700',
    monthlyBreakdownGridValue: 'font-medium',
    
    // EIK Features
    eikFeatures: 'mb-4',
    eikFeaturesTitle: 'text-xs font-semibold text-black uppercase tracking-wider mb-2',
    eikFeaturesList: 'space-y-1',
    eikFeaturesItem: 'text-xs text-black',
    
    // EFP Integrations
    efpIntegrations: 'mb-4 p-3 bg-purple-50 border border-purple-200 rounded',
    efpIntegrationsTitle: 'text-xs font-semibold text-black uppercase tracking-wider mb-2',
    efpIntegrationsGrid: 'space-y-1 text-xs',
    efpIntegrationsItem: '',
    efpIntegrationsLabel: 'text-purple-700',
    efpIntegrationsValue: 'font-medium',
    
    // KPIs
    kpis: 'mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded',
    kpisTitle: 'text-xs font-semibold text-black uppercase tracking-wider mb-2',
    kpisGrid: 'space-y-1 text-xs',
    kpisItem: '',
    kpisLabel: 'text-emerald-700',
    kpisValue: 'font-medium',
    kpisDetails: 'mt-2 space-y-1',
    
    // Filters and sorting
    filtersContainer: 'flex justify-between items-center py-3 border-b border-gray-200',
    filtersLeft: 'flex space-x-2',
    filtersRight: 'flex items-center space-x-2',
    filterSelect: 'text-sm border border-gray-300 rounded px-2 py-1',
    filterLabel: 'text-sm text-black',
    
    // Category statistics
    categoryStats: 'grid grid-cols-2 gap-6',
    categoryStatsSection: '',
    categoryStatsTitle: 'text-sm font-semibold text-black mb-3',
    categoryStatsList: 'space-y-3',
    categoryStatsItem: 'flex items-center justify-between p-3 border border-gray-200 rounded-lg',
    categoryStatsLeft: 'flex items-center space-x-3',
    categoryStatsRight: 'text-right',
    categoryStatsName: 'font-medium text-black',
    categoryStatsCount: 'text-sm text-black',
    categoryStatsFunding: 'font-semibold text-black',
    
    // Program statistics
    programStats: 'space-y-3',
    programStatsGrid: 'grid grid-cols-2 gap-4',
    programStatsItem: 'text-center p-3 border border-gray-200 rounded-lg',
    programStatsValue: 'text-2xl font-light text-black',
    programStatsLabel: 'text-sm text-black',
    
    // Sources
    sourcesList: 'space-y-3',
    sourcesItem: 'border border-gray-200 rounded-lg p-3',
    sourcesTitle: 'text-sm font-medium text-black mb-1',
    sourcesLink: 'text-blue-600 hover:text-blue-800 text-sm',
    
    // Program updates
    updatesList: 'space-y-0',
    updateItem: '',
    updateContent: 'space-y-3',
    updateGrid: 'grid grid-cols-2 gap-4',
    updateItem: '',
    updateLabel: 'text-black text-sm',
    updateValue: 'font-medium text-black',
    updateDescription: '',
    updateDescriptionLabel: 'text-black text-sm',
    updateDescriptionText: 'text-black mt-1',
  },
};

// Standardized spacing utilities
export const spacingClasses = {
  container: 'p-6',
  section: 'mb-6',
  card: 'p-4',
  button: 'px-4 py-2',
  input: 'px-3 py-2',
  table: 'px-6 py-4',
};

// Standardized color utilities
export const colorClasses = {
  text: {
    primary: 'text-black',
    secondary: 'text-black',
    muted: 'text-black',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
    info: 'text-blue-600',
  },
  
  background: {
    primary: 'bg-white',
    secondary: 'bg-gray-50',
    glass: 'glass',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
  },
  
  border: {
    primary: 'border-gray-200',
    secondary: 'border-gray-300',
    success: 'border-green-600',
    warning: 'border-yellow-600',
    error: 'border-red-600',
  },
};

// Helper functions for consistent styling
export const createComponentClass = (baseClass, modifiers = {}) => {
  let className = baseClass;
  
  Object.entries(modifiers).forEach(([key, value]) => {
    if (value) {
      className += ` ${key}`;
    }
  });
  
  return className;
};

export const getResponsiveClass = (baseClass, breakpoints = {}) => {
  let className = baseClass;
  
  Object.entries(breakpoints).forEach(([breakpoint, value]) => {
    if (value) {
      className += ` ${breakpoint}:${value}`;
    }
  });
  
  return className;
}; 