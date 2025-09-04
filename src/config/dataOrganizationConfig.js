// Data Organization Configuration
// This file defines the structure and relationships between different data sources and sections

export const DATA_ORGANIZATION_CONFIG = {
  // Tab definitions with their sections and data sources
  tabs: {
    overview: {
      name: 'Portfolio Overview',
      description: 'High-level treasury composition and key metrics',
      icon: '📊',
      sections: [
        {
          id: 'treasury-composition',
          title: 'Treasury Composition',
          subtitle: 'Asset allocation and holdings breakdown',
          component: 'TreasuryComposition',
          dataSources: ['ensData', 'realTimeBalances'],
          priority: 1,
          refreshInterval: 300000, // 5 minutes
          cacheDuration: 600000 // 10 minutes
        },
        {
          id: 'transaction-activity',
          title: 'Transaction Activity',
          subtitle: 'Recent treasury movements and operations',
          component: 'TransactionActivity',
          dataSources: ['transactionHistory', 'recentActivity'],
          priority: 2,
          refreshInterval: 60000, // 1 minute
          cacheDuration: 300000 // 5 minutes
        },
        {
          id: 'working-groups',
          title: 'Working Groups Financial Analysis',
          subtitle: 'Q1 2025 expenditure breakdown and performance',
          component: 'WorkingGroupsSpending',
          dataSources: ['workingGroupsData', 'expenditureReports'],
          priority: 3,
          refreshInterval: 3600000, // 1 hour
          cacheDuration: 7200000 // 2 hours
        },
        {
          id: 'strategic-partnerships',
          title: 'Strategic Partnerships & Initiatives',
          subtitle: 'Endaoment, Karpatkey reports, and ecosystem partnerships',
          component: 'StrategicPartnerships',
          dataSources: ['endaomentData', 'karpatkeyReports', 'partnershipData'],
          priority: 4,
          refreshInterval: 1800000, // 30 minutes
          cacheDuration: 3600000 // 1 hour
        }
      ]
    },
    assets: {
      name: 'Asset Management',
      description: 'Detailed asset tracking and management',
      icon: '💰',
      sections: [
        {
          id: 'asset-tracking',
          title: 'Asset Tracking',
          subtitle: 'Real-time asset monitoring and performance',
          component: 'AssetTracker',
          dataSources: ['assetTracker', 'priceData', 'performanceMetrics'],
          priority: 1,
          refreshInterval: 30000, // 30 seconds
          cacheDuration: 60000 // 1 minute
        },
        {
          id: 'asset-allocation',
          title: 'Asset Allocation',
          subtitle: 'Portfolio allocation and rebalancing',
          component: 'AssetAllocation',
          dataSources: ['allocationData', 'rebalancingHistory'],
          priority: 2,
          refreshInterval: 300000, // 5 minutes
          cacheDuration: 600000 // 10 minutes
        },
        {
          id: 'risk-metrics',
          title: 'Risk Metrics',
          subtitle: 'Asset risk assessment and monitoring',
          component: 'RiskMetrics',
          dataSources: ['riskMetrics', 'volatilityData'],
          priority: 3,
          refreshInterval: 60000, // 1 minute
          cacheDuration: 300000 // 5 minutes
        }
      ]
    },
    analytics: {
      name: 'Risk Analytics',
      description: 'Comprehensive risk analysis and reporting',
      icon: '📈',
      sections: [
        {
          id: 'risk-analysis',
          title: 'Risk Analysis',
          subtitle: 'Comprehensive risk assessment and monitoring',
          component: 'RiskAnalysis',
          dataSources: ['riskAnalysis', 'stressTests', 'scenarioAnalysis'],
          priority: 1,
          refreshInterval: 300000, // 5 minutes
          cacheDuration: 600000 // 10 minutes
        },
        {
          id: 'performance-analytics',
          title: 'Performance Analytics',
          subtitle: 'Treasury performance metrics and analysis',
          component: 'PerformanceAnalytics',
          dataSources: ['performanceData', 'benchmarkComparison'],
          priority: 2,
          refreshInterval: 600000, // 10 minutes
          cacheDuration: 1200000 // 20 minutes
        },
        {
          id: 'trend-analysis',
          title: 'Trend Analysis',
          subtitle: 'Historical trends and forecasting',
          component: 'TrendAnalysis',
          dataSources: ['trendData', 'forecastingModels'],
          priority: 3,
          refreshInterval: 3600000, // 1 hour
          cacheDuration: 7200000 // 2 hours
        }
      ]
    },
    transactions: {
      name: 'Transaction History',
      description: 'Complete transaction history and analysis',
      icon: '📋',
      sections: [
        {
          id: 'transaction-history',
          title: 'Transaction History',
          subtitle: 'Complete transaction records and analysis',
          component: 'TransactionsTable',
          dataSources: ['transactionHistory', 'blockchainData'],
          priority: 1,
          refreshInterval: 60000, // 1 minute
          cacheDuration: 300000 // 5 minutes
        },
        {
          id: 'transaction-analytics',
          title: 'Transaction Analytics',
          subtitle: 'Transaction patterns and insights',
          component: 'TransactionAnalytics',
          dataSources: ['transactionAnalytics', 'patternAnalysis'],
          priority: 2,
          refreshInterval: 300000, // 5 minutes
          cacheDuration: 600000 // 10 minutes
        },
        {
          id: 'gas-analysis',
          title: 'Gas Analysis',
          subtitle: 'Gas usage optimization and cost analysis',
          component: 'GasAnalysis',
          dataSources: ['gasData', 'costOptimization'],
          priority: 3,
          refreshInterval: 120000, // 2 minutes
          cacheDuration: 300000 // 5 minutes
        }
      ]
    },
    wallets: {
      name: 'Wallet Administration',
      description: 'Wallet management and administration',
      icon: '🏦',
      sections: [
        {
          id: 'wallet-overview',
          title: 'Wallet Overview',
          subtitle: 'All wallet addresses and balances',
          component: 'WalletsTable',
          dataSources: ['walletDirectory', 'balanceData'],
          priority: 1,
          refreshInterval: 30000, // 30 seconds
          cacheDuration: 60000 // 1 minute
        },
        {
          id: 'wallet-permissions',
          title: 'Wallet Permissions',
          subtitle: 'Access control and security settings',
          component: 'WalletPermissions',
          dataSources: ['permissionData', 'securitySettings'],
          priority: 2,
          refreshInterval: 300000, // 5 minutes
          cacheDuration: 600000 // 10 minutes
        },
        {
          id: 'wallet-activity',
          title: 'Wallet Activity',
          subtitle: 'Recent wallet activity and transactions',
          component: 'WalletActivity',
          dataSources: ['walletActivity', 'transactionHistory'],
          priority: 3,
          refreshInterval: 60000, // 1 minute
          cacheDuration: 300000 // 5 minutes
        }
      ]
    },
    'service-providers': {
      name: 'Service Providers',
      description: 'Service provider management and performance',
      icon: '🤝',
      sections: [
        {
          id: 'service-provider-dashboard',
          title: 'Service Provider Dashboard',
          subtitle: 'Service provider overview and management',
          component: 'ServiceProviderDashboard',
          dataSources: ['serviceProviderData', 'performanceMetrics'],
          priority: 1,
          refreshInterval: 1800000, // 30 minutes
          cacheDuration: 3600000 // 1 hour
        }
      ]
    },
    'address-diagram': {
      name: '🔗 Address Network',
      description: 'Address connection diagram and network analysis',
      icon: '🔗',
      sections: [
        {
          id: 'address-connections',
          title: 'Address Connections',
          subtitle: 'Network diagram of address relationships',
          component: 'AddressConnectionDiagram',
          dataSources: ['addressConnections', 'networkData'],
          priority: 1,
          refreshInterval: 600000, // 10 minutes
          cacheDuration: 1200000 // 20 minutes
        }
      ]
    }
  },

  // Data source definitions with their properties
  dataSources: {
    ensData: {
      name: 'ENS Financial Data',
      description: 'Core ENS DAO financial data',
      type: 'local',
      updateFrequency: 'daily',
      reliability: 'high',
      fallback: 'mockData'
    },
    realTimeBalances: {
      name: 'Real-time Balances',
      description: 'Live wallet balances from blockchain',
      type: 'blockchain',
      updateFrequency: 'real-time',
      reliability: 'high',
      fallback: 'cachedData'
    },
    transactionHistory: {
      name: 'Transaction History',
      description: 'Historical transaction data',
      type: 'etherscan',
      updateFrequency: 'hourly',
      reliability: 'high',
      fallback: 'mockData'
    },
    endaomentData: {
      name: 'Endaoment Data',
      description: 'Endaoment fund data from Karpatkey',
      type: 'karpatkey-api',
      updateFrequency: 'daily',
      reliability: 'medium',
      fallback: 'mockData'
    },
    karpatkeyReports: {
      name: 'Karpatkey Reports',
      description: 'Professional treasury reports',
      type: 'karpatkey',
      updateFrequency: 'monthly',
      reliability: 'high',
      fallback: 'cachedData'
    },
    workingGroupsData: {
      name: 'Working Groups Data',
      description: 'Working group expenditure data',
      type: 'internal',
      updateFrequency: 'quarterly',
      reliability: 'high',
      fallback: 'mockData'
    },
    assetTracker: {
      name: 'Asset Tracker',
      description: 'Asset tracking and monitoring',
      type: 'multiple',
      updateFrequency: 'real-time',
      reliability: 'high',
      fallback: 'cachedData'
    },
    riskMetrics: {
      name: 'Risk Metrics',
      description: 'Risk assessment and monitoring',
      type: 'analytics',
      updateFrequency: 'daily',
      reliability: 'medium',
      fallback: 'mockData'
    },
    walletDirectory: {
      name: 'Wallet Directory',
      description: 'Wallet address directory and metadata',
      type: 'local',
      updateFrequency: 'weekly',
      reliability: 'high',
      fallback: 'mockData'
    },
    priceData: {
      name: 'Price Data',
      description: 'Real-time asset prices',
      type: 'external',
      updateFrequency: 'real-time',
      reliability: 'high',
      fallback: 'cachedData'
    },
    performanceMetrics: {
      name: 'Performance Metrics',
      description: 'Asset performance calculations',
      type: 'calculated',
      updateFrequency: 'hourly',
      reliability: 'high',
      fallback: 'mockData'
    }
  },

  // Component mappings
  componentMappings: {
    TreasuryComposition: 'TreasuryCompositionContent',
    TransactionActivity: 'TransactionActivityContent',
    WorkingGroupsSpending: 'WorkingGroupsSpending',
    StrategicPartnerships: 'StrategicPartnershipsContent',
    AssetTracker: 'AssetTracker',
    AssetAllocation: 'AssetAllocationContent',
    RiskMetrics: 'RiskMetricsContent',
    RiskAnalysis: 'RiskAnalysisContent',
    PerformanceAnalytics: 'PerformanceAnalyticsContent',
    TrendAnalysis: 'TrendAnalysisContent',
    TransactionsTable: 'TransactionsTable',
    TransactionAnalytics: 'TransactionAnalyticsContent',
    GasAnalysis: 'GasAnalysisContent',
    WalletsTable: 'WalletsTable',
    WalletPermissions: 'WalletPermissionsContent',
    WalletActivity: 'WalletActivityContent',
    ServiceProviderDashboard: 'ServiceProviderDashboard',
    AddressConnectionDiagram: 'AddressConnectionDiagram'
  },

  // Cache configuration
  cacheConfig: {
    defaultDuration: 300000, // 5 minutes
    maxEntries: 1000,
    cleanupInterval: 600000, // 10 minutes
    persistence: {
      enabled: true,
      storage: 'localStorage',
      keyPrefix: 'ens_dashboard_'
    }
  },

  // Refresh configuration
  refreshConfig: {
    defaultInterval: 300000, // 5 minutes
    maxConcurrent: 5,
    retryAttempts: 3,
    retryDelay: 1000, // 1 second
    exponentialBackoff: true
  },

  // Error handling configuration
  errorHandling: {
    showUserErrors: true,
    logErrors: true,
    fallbackToMock: true,
    retryOnError: true,
    maxRetries: 3
  },

  // Performance configuration
  performance: {
    lazyLoad: true,
    virtualScrolling: false,
    debounceDelay: 300,
    throttleDelay: 1000,
    maxRenderTime: 100 // milliseconds
  }
};

// Utility functions for configuration
export const getTabConfig = (tabId) => {
  return DATA_ORGANIZATION_CONFIG.tabs[tabId];
};

export const getSectionConfig = (sectionId) => {
  for (const tab of Object.values(DATA_ORGANIZATION_CONFIG.tabs)) {
    const section = tab.sections.find(s => s.id === sectionId);
    if (section) return section;
  }
  return null;
};

export const getDataSourceConfig = (sourceId) => {
  return DATA_ORGANIZATION_CONFIG.dataSources[sourceId];
};

export const getComponentName = (componentId) => {
  return DATA_ORGANIZATION_CONFIG.componentMappings[componentId];
};

export const getAllTabs = () => {
  return Object.entries(DATA_ORGANIZATION_CONFIG.tabs).map(([id, config]) => ({
    id,
    ...config
  }));
};

export const getAllSections = () => {
  const sections = [];
  for (const tab of Object.values(DATA_ORGANIZATION_CONFIG.tabs)) {
    sections.push(...tab.sections);
  }
  return sections;
};

export const getSectionsByTab = (tabId) => {
  const tab = DATA_ORGANIZATION_CONFIG.tabs[tabId];
  return tab ? tab.sections : [];
};

export const getDataSourcesBySection = (sectionId) => {
  const section = getSectionConfig(sectionId);
  return section ? section.dataSources : [];
};

export default DATA_ORGANIZATION_CONFIG;
