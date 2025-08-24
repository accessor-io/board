// Data Organization Service - Centralized data management across all tabs and sections
import { ensFinancialData } from '../data/ensData';
import { endaomentAPI } from './endaomentAPI';
import { dataService } from './api';

// Data categories and their organization
export const DATA_CATEGORIES = {
  TREASURY: 'treasury',
  ASSETS: 'assets',
  TRANSACTIONS: 'transactions',
  ANALYTICS: 'analytics',
  WALLETS: 'wallets',
  CONTRACTS: 'contracts',
  PARTNERSHIPS: 'partnerships',
  WORKING_GROUPS: 'working-groups',
  EXPENDITURES: 'expenditures',
  ENDAOMENT: 'endaoment',
  KARPATKEY: 'karpatkey'
};

// Tab organization structure
export const TAB_ORGANIZATION = {
  overview: {
    name: 'Portfolio Overview',
    description: 'High-level treasury composition and key metrics',
    sections: [
      {
        id: 'treasury-composition',
        title: 'Treasury Composition',
        subtitle: 'Asset allocation and holdings breakdown',
        category: DATA_CATEGORIES.TREASURY,
        priority: 1,
        dataSources: ['ensData', 'realTimeBalances']
      },
      {
        id: 'transaction-activity',
        title: 'Transaction Activity',
        subtitle: 'Recent treasury movements and operations',
        category: DATA_CATEGORIES.TRANSACTIONS,
        priority: 2,
        dataSources: ['transactionHistory', 'recentActivity']
      },
      {
        id: 'working-groups',
        title: 'Working Groups Financial Analysis',
        subtitle: 'Q1 2025 expenditure breakdown and performance',
        category: DATA_CATEGORIES.WORKING_GROUPS,
        priority: 3,
        dataSources: ['workingGroupsData', 'expenditureReports']
      },
      {
        id: 'strategic-partnerships',
        title: 'Strategic Partnerships & Initiatives',
        subtitle: 'Endaoment, Karpatkey reports, and ecosystem partnerships',
        category: DATA_CATEGORIES.PARTNERSHIPS,
        priority: 4,
        dataSources: ['endaomentData', 'karpatkeyReports', 'partnershipData']
      }
    ]
  },
  '3d-visual': {
    name: '🎯 3D Treasury',
    description: 'Interactive 3D visualization of treasury structure',
    sections: [
      {
        id: 'treasury-3d-visualization',
        title: '3D Treasury Visualization',
        subtitle: 'Interactive 3D representation of treasury assets',
        category: DATA_CATEGORIES.TREASURY,
        priority: 1,
        dataSources: ['treasury3DData', 'assetPositions']
      }
    ]
  },
  assets: {
    name: 'Asset Management',
    description: 'Detailed asset tracking and management',
    sections: [
      {
        id: 'asset-tracking',
        title: 'Asset Tracking',
        subtitle: 'Real-time asset monitoring and performance',
        category: DATA_CATEGORIES.ASSETS,
        priority: 1,
        dataSources: ['assetTracker', 'priceData', 'performanceMetrics']
      },
      {
        id: 'asset-allocation',
        title: 'Asset Allocation',
        subtitle: 'Portfolio allocation and rebalancing',
        category: DATA_CATEGORIES.ASSETS,
        priority: 2,
        dataSources: ['allocationData', 'rebalancingHistory']
      },
      {
        id: 'risk-metrics',
        title: 'Risk Metrics',
        subtitle: 'Asset risk assessment and monitoring',
        category: DATA_CATEGORIES.ANALYTICS,
        priority: 3,
        dataSources: ['riskMetrics', 'volatilityData']
      }
    ]
  },
  analytics: {
    name: 'Risk Analytics',
    description: 'Comprehensive risk analysis and reporting',
    sections: [
      {
        id: 'risk-analysis',
        title: 'Risk Analysis',
        subtitle: 'Comprehensive risk assessment and monitoring',
        category: DATA_CATEGORIES.ANALYTICS,
        priority: 1,
        dataSources: ['riskAnalysis', 'stressTests', 'scenarioAnalysis']
      },
      {
        id: 'performance-analytics',
        title: 'Performance Analytics',
        subtitle: 'Treasury performance metrics and analysis',
        category: DATA_CATEGORIES.ANALYTICS,
        priority: 2,
        dataSources: ['performanceData', 'benchmarkComparison']
      },
      {
        id: 'trend-analysis',
        title: 'Trend Analysis',
        subtitle: 'Historical trends and forecasting',
        category: DATA_CATEGORIES.ANALYTICS,
        priority: 3,
        dataSources: ['trendData', 'forecastingModels']
      }
    ]
  },
  transactions: {
    name: 'Transaction History',
    description: 'Complete transaction history and analysis',
    sections: [
      {
        id: 'transaction-history',
        title: 'Transaction History',
        subtitle: 'Complete transaction records and analysis',
        category: DATA_CATEGORIES.TRANSACTIONS,
        priority: 1,
        dataSources: ['transactionHistory', 'blockchainData']
      },
      {
        id: 'transaction-analytics',
        title: 'Transaction Analytics',
        subtitle: 'Transaction patterns and insights',
        category: DATA_CATEGORIES.TRANSACTIONS,
        priority: 2,
        dataSources: ['transactionAnalytics', 'patternAnalysis']
      },
      {
        id: 'gas-analysis',
        title: 'Gas Analysis',
        subtitle: 'Gas usage optimization and cost analysis',
        category: DATA_CATEGORIES.TRANSACTIONS,
        priority: 3,
        dataSources: ['gasData', 'costOptimization']
      }
    ]
  },
  wallets: {
    name: 'Wallet Administration',
    description: 'Wallet management and administration',
    sections: [
      {
        id: 'wallet-overview',
        title: 'Wallet Overview',
        subtitle: 'All wallet addresses and balances',
        category: DATA_CATEGORIES.WALLETS,
        priority: 1,
        dataSources: ['walletDirectory', 'balanceData']
      },
      {
        id: 'wallet-permissions',
        title: 'Wallet Permissions',
        subtitle: 'Access control and security settings',
        category: DATA_CATEGORIES.WALLETS,
        priority: 2,
        dataSources: ['permissionData', 'securitySettings']
      },
      {
        id: 'wallet-activity',
        title: 'Wallet Activity',
        subtitle: 'Recent wallet activity and transactions',
        category: DATA_CATEGORIES.WALLETS,
        priority: 3,
        dataSources: ['walletActivity', 'transactionHistory']
      }
    ]
  },
  'service-providers': {
    name: 'Service Providers',
    description: 'Service provider management and performance',
    sections: [
      {
        id: 'service-provider-dashboard',
        title: 'Service Provider Dashboard',
        subtitle: 'Service provider overview and management',
        category: DATA_CATEGORIES.PARTNERSHIPS,
        priority: 1,
        dataSources: ['serviceProviderData', 'performanceMetrics']
      }
    ]
  },
  'address-diagram': {
    name: '🔗 Address Network',
    description: 'Address connection diagram and network analysis',
    sections: [
      {
        id: 'address-connections',
        title: 'Address Connections',
        subtitle: 'Network diagram of address relationships',
        category: DATA_CATEGORIES.ANALYTICS,
        priority: 1,
        dataSources: ['addressConnections', 'networkData']
      }
    ]
  }
};

// Data source definitions
export const DATA_SOURCES = {
  ensData: {
    name: 'ENS Financial Data',
    description: 'Core ENS DAO financial data',
    updateFrequency: 'daily',
    source: 'local',
    reliability: 'high'
  },
  realTimeBalances: {
    name: 'Real-time Balances',
    description: 'Live wallet balances from blockchain',
    updateFrequency: 'real-time',
    source: 'blockchain',
    reliability: 'high'
  },
  transactionHistory: {
    name: 'Transaction History',
    description: 'Historical transaction data',
    updateFrequency: 'hourly',
    source: 'etherscan',
    reliability: 'high'
  },
  endaomentData: {
    name: 'Endaoment Data',
    description: 'Endaoment fund data from Karpatkey',
    updateFrequency: 'daily',
    source: 'karpatkey-api',
    reliability: 'medium'
  },
  karpatkeyReports: {
    name: 'Karpatkey Reports',
    description: 'Professional treasury reports',
    updateFrequency: 'monthly',
    source: 'karpatkey',
    reliability: 'high'
  },
  workingGroupsData: {
    name: 'Working Groups Data',
    description: 'Working group expenditure data',
    updateFrequency: 'quarterly',
    source: 'internal',
    reliability: 'high'
  },
  assetTracker: {
    name: 'Asset Tracker',
    description: 'Asset tracking and monitoring',
    updateFrequency: 'real-time',
    source: 'multiple',
    reliability: 'high'
  },
  riskMetrics: {
    name: 'Risk Metrics',
    description: 'Risk assessment and monitoring',
    updateFrequency: 'daily',
    source: 'analytics',
    reliability: 'medium'
  }
};

// Data organization service
export class DataOrganizationService {
  constructor() {
    this.cache = new Map();
    this.dataSubscribers = new Map();
    this.updateCallbacks = new Map();
  }

  // Get organized data for a specific tab
  async getTabData(tabId) {
    const tabConfig = TAB_ORGANIZATION[tabId];
    if (!tabConfig) {
      throw new Error(`Unknown tab: ${tabId}`);
    }

    const tabData = {
      ...tabConfig,
      sections: await Promise.all(
        tabConfig.sections.map(async (section) => {
          const sectionData = await this.getSectionData(section);
          return {
            ...section,
            data: sectionData
          };
        })
      )
    };

    return tabData;
  }

  // Get data for a specific section
  async getSectionData(section) {
    const cacheKey = `section-${section.id}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < 5 * 60 * 1000) { // 5 minutes
        return cached.data;
      }
    }

    // Fetch fresh data
    const data = await this.fetchSectionData(section);
    
    // Cache the result
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });

    return data;
  }

  // Fetch data for a section based on its data sources
  async fetchSectionData(section) {
    const dataPromises = section.dataSources.map(source => this.fetchDataSource(source));
    const results = await Promise.allSettled(dataPromises);
    
    const data = {};
    results.forEach((result, index) => {
      const sourceName = section.dataSources[index];
      if (result.status === 'fulfilled') {
        data[sourceName] = result.value;
      } else {
        console.error(`Failed to fetch ${sourceName}:`, result.reason);
        data[sourceName] = null;
      }
    });

    return data;
  }

  // Fetch data from a specific source
  async fetchDataSource(sourceName) {
    switch (sourceName) {
      case 'ensData':
        return ensFinancialData;
      
      case 'endaomentData':
        return await endaomentAPI.getEndaomentData();
      
      case 'realTimeBalances':
        return await dataService.getENSDAOTreasuryData();
      
      case 'transactionHistory':
        return await dataService.getENSDAOTransactions();
      
      case 'walletDirectory':
        const { walletDirectory } = await import('../data/walletDirectory');
        return walletDirectory;
      
      case 'workingGroupsData':
        // Mock data for working groups
        return {
          workingGroups: [
            {
              name: 'Public Goods',
              budget: 343000,
              spent: 267000,
              remaining: 76000
            },
            {
              name: 'Development',
              budget: 500000,
              spent: 385000,
              remaining: 115000
            },
            {
              name: 'Marketing',
              budget: 250000,
              spent: 198000,
              remaining: 52000
            }
          ]
        };
      
      case 'assetTracker':
        // Mock asset tracking data
        return {
          assets: [
            { symbol: 'ETH', quantity: 234567.8, value: 567800000 },
            { symbol: 'USDC', quantity: 180200000, value: 180200000 },
            { symbol: 'ENS', value: 178600000 }
          ]
        };
      
      case 'riskMetrics':
        // Mock risk metrics
        return {
          volatility: 0.15,
          sharpeRatio: 1.2,
          maxDrawdown: -0.08,
          var95: 0.12
        };
      
      default:
        console.warn(`Unknown data source: ${sourceName}`);
        return null;
    }
  }

  // Subscribe to data updates
  subscribeToUpdates(sectionId, callback) {
    if (!this.dataSubscribers.has(sectionId)) {
      this.dataSubscribers.set(sectionId, new Set());
    }
    this.dataSubscribers.get(sectionId).add(callback);
  }

  // Unsubscribe from data updates
  unsubscribeFromUpdates(sectionId, callback) {
    if (this.dataSubscribers.has(sectionId)) {
      this.dataSubscribers.get(sectionId).delete(callback);
    }
  }

  // Trigger data updates
  async triggerUpdate(sectionId) {
    const section = this.findSectionById(sectionId);
    if (!section) return;

    const newData = await this.getSectionData(section);
    
    // Notify subscribers
    if (this.dataSubscribers.has(sectionId)) {
      this.dataSubscribers.get(sectionId).forEach(callback => {
        try {
          callback(newData);
        } catch (error) {
          console.error('Error in data update callback:', error);
        }
      });
    }
  }

  // Find section by ID
  findSectionById(sectionId) {
    for (const tab of Object.values(TAB_ORGANIZATION)) {
      const section = tab.sections.find(s => s.id === sectionId);
      if (section) return section;
    }
    return null;
  }

  // Get all sections for a category
  getSectionsByCategory(category) {
    const sections = [];
    for (const tab of Object.values(TAB_ORGANIZATION)) {
      sections.push(...tab.sections.filter(s => s.category === category));
    }
    return sections.sort((a, b) => a.priority - b.priority);
  }

  // Get data sources for a category
  getDataSourcesByCategory(category) {
    const sections = this.getSectionsByCategory(category);
    const sources = new Set();
    sections.forEach(section => {
      section.dataSources.forEach(source => sources.add(source));
    });
    return Array.from(sources);
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
  }

  // Get cache statistics
  getCacheStats() {
    const stats = {
      totalEntries: this.cache.size,
      totalSubscribers: 0,
      oldestEntry: null,
      newestEntry: null
    };

    let oldestTime = Date.now();
    let newestTime = 0;

    this.cache.forEach((value, key) => {
      if (value.timestamp < oldestTime) {
        oldestTime = value.timestamp;
        stats.oldestEntry = key;
      }
      if (value.timestamp > newestTime) {
        newestTime = value.timestamp;
        stats.newestEntry = key;
      }
    });

    this.dataSubscribers.forEach(subscribers => {
      stats.totalSubscribers += subscribers.size;
    });

    return stats;
  }
}

// Create singleton instance
export const dataOrganizationService = new DataOrganizationService();

// Utility functions
export const getTabSections = (tabId) => {
  return TAB_ORGANIZATION[tabId]?.sections || [];
};

export const getSectionConfig = (sectionId) => {
  for (const tab of Object.values(TAB_ORGANIZATION)) {
    const section = tab.sections.find(s => s.id === sectionId);
    if (section) return section;
  }
  return null;
};

export const getDataSources = () => {
  return DATA_SOURCES;
};

export const getCategories = () => {
  return DATA_CATEGORIES;
};

export default {
  DataOrganizationService,
  dataOrganizationService,
  TAB_ORGANIZATION,
  DATA_SOURCES,
  DATA_CATEGORIES,
  getTabSections,
  getSectionConfig,
  getDataSources,
  getCategories
};
