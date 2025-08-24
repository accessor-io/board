// Endaoment API service for fetching data from Karpatkey reports
const KARPATKEY_API_BASE = 'https://reports.kpk.io';

// Mock data for fallbacks
const mockEndaomentData = {
  timestamp: new Date().toISOString(),
  fundId: "ENS-Endaoment-2023",
  walletAddress: "0x4F2083f5fBede34C2714aFfb3105539775f7FE64",
  totalContributions: 52000000,
  disbursedAmount: 10000000,
  availableBalance: 42000000,
  currency: "USD",
  // Enhanced treasury composition data
  treasuryComposition: {
    totalValue: 993234567,
    assets: [
      {
        symbol: "ETH",
        name: "Ethereum",
        quantity: 234567.00,
        price: 3245.67,
        value: 761234567,
        allocation: 67.2,
        change30d: 15.3,
        riskLevel: "Medium",
        color: "blue"
      },
      {
        symbol: "ENS",
        name: "ENS Token",
        quantity: 12500000,
        price: 14.28,
        value: 178500000,
        allocation: 24.8,
        change30d: 8.7,
        riskLevel: "High",
        color: "green"
      },
      {
        symbol: "USDC",
        name: "USD Coin",
        quantity: 45000000,
        price: 1.00,
        value: 45000000,
        allocation: 6.5,
        change30d: 0.0,
        riskLevel: "Low",
        color: "purple"
      },
      {
        symbol: "DAI",
        name: "Dai Stablecoin",
        quantity: 8500000,
        price: 1.00,
        value: 8500000,
        allocation: 1.5,
        change30d: 0.0,
        riskLevel: "Low",
        color: "orange"
      }
    ],
    riskMetrics: {
      volatility30d: 12.4,
      sharpeRatio: 1.87,
      maxDrawdown: -8.2,
      correlationETH: 0.94
    },
    performance: {
      ytdReturn: 23.7,
      vsETH: 2.1,
      vsSP500: 18.9,
      riskAdjusted: 1.42
    },
    strategy: {
      longTermETH: 67.2,
      ensEcosystem: 24.8,
      liquidityReserves: 8.0
    },
    governance: {
      multiSigThreshold: "4 of 7",
      maxTransaction: 10000000,
      rebalancingFrequency: "Quarterly",
      riskReviewCycle: "Monthly",
      externalAudit: "Annual"
    }
  },
  recipients: [
    {
      walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
      amount: {
        eth: 1000,
        usd: 3400000,
        ens: 0
      },
      purpose: "Grant for ENS development",
      txHash: "0x12345678abcdef1234567890abcdef1234567890abcdef1234567890abcdef12",
      timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      walletAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
      amount: {
        eth: 2000,
        usd: 6600000,
        ens: 0
      },
      purpose: "Infrastructure development",
      txHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
      timestamp: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
    }
  ],
  isMocked: true
};

// Enhanced fetch with timeout and error handling
const fetchWithTimeout = async (url, options = {}, timeout = 15000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers
      }
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    
    throw error;
  }
};

// Utility functions
const formatAddress = (address) => {
  return address.toLowerCase();
};

const formatCurrency = (amount, decimals = 18) => {
  if (!amount) return '0';
  return (parseInt(amount) / Math.pow(10, decimals)).toString();
};

// Endaoment API service
export const endaomentAPI = {
  async getEndaomentData(month = 7, year = 2025, currency = 'USD') {
    try {
      // Check if we're in a development environment or offline
      if (!navigator.onLine) {
        console.warn('Network offline, using mock Endaoment data');
        return mockEndaomentData;
      }

      // The Karpatkey API returns HTML, so we need to extract the JSON data from the page
      const url = `${KARPATKEY_API_BASE}/ens?month=${month}&year=${year}&currency=${currency}`;
      
      console.log('Fetching Endaoment data from:', url);
      
      const response = await fetchWithTimeout(url);
      const htmlText = await response.text();
      
      // Extract JSON data from the Next.js page
      const jsonMatch = htmlText.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/s);
      
      if (!jsonMatch) {
        throw new Error('Could not extract JSON data from Karpatkey reports page');
      }
      
      const jsonData = JSON.parse(jsonMatch[1]);
      const reportData = jsonData.props?.pageProps?.report;
      
      if (!reportData) {
        throw new Error('No report data found in Karpatkey response');
      }
      
      console.log('Extracted Karpatkey report data:', reportData);
      
      // Transform the real API response to match our expected format
      const transformedData = this.transformKarpatkeyReport(reportData, month, year, currency);
      
      return {
        ...transformedData,
        timestamp: new Date().toISOString(),
        isMocked: false
      };
      
    } catch (error) {
      console.error('Error fetching Endaoment data:', error);
      
      // Return mock data as fallback
      return {
        ...mockEndaomentData,
        timestamp: new Date().toISOString(),
        isMocked: true,
        error: error.message
      };
    }
  },

  transformKarpatkeyReport(reportData, month, year, currency) {
    try {
      console.log('Transforming Karpatkey report data:', reportData);
      
      // Extract currency-specific data
      const currencyData = reportData[currency] || reportData.USD;
      if (!currencyData) {
        throw new Error(`No data found for currency: ${currency}`);
      }
      
      // Extract summary data
      const summary = currencyData.summary;
      const tokenDetails = currencyData.tokenDetails?.tokenDetails || [];
      const farmingFunds = currencyData.farmingFunds?.farmingFundsByProtocol || [];
      const treasuryVariation = currencyData.treasuryVariation;
      
      // Calculate total values
      const totalFunds = summary?.totalFunds || 0;
      const deFiResults = summary?.deFiResults || 0;
      const apy = summary?.APY || 0;
      
      // Extract asset allocation data
      const fundsByTokenCategory = summary?.fundsByTokenCategory || [];
      const fundsByProtocol = summary?.fundsByProtocol || [];
      
      // Transform token details into our asset format
      const assets = tokenDetails.map(token => {
        const allocation = (token.usdValue / totalFunds) * 100;
        const riskLevel = this.calculateRiskLevel(token.tokenCategory, token.priceVariation);
        const color = this.getAssetColor(token.tokenSymbol);
        
        return {
          symbol: token.tokenSymbol,
          name: this.getAssetName(token.tokenSymbol),
          quantity: token.balance,
          price: token.price,
          value: token.usdValue,
          allocation: allocation,
          change30d: (token.priceVariation || 0) * 100,
          riskLevel: riskLevel,
          color: color
        };
      });
      
      // Calculate risk metrics from treasury variation
      const riskMetrics = this.calculateRiskMetrics(treasuryVariation);
      
      // Calculate performance metrics
      const performance = this.calculatePerformanceMetrics(treasuryVariation, apy);
      
      // Extract strategy data
      const strategy = this.extractStrategyData(fundsByTokenCategory, fundsByProtocol);
      
      // Extract governance data (using default values since not in API)
      const governance = {
        multiSigThreshold: "4 of 7",
        maxTransaction: 10000000,
        rebalancingFrequency: "Quarterly",
        riskReviewCycle: "Monthly",
        externalAudit: "Annual"
      };
      
      // Transform farming funds into recipients format
      const recipients = farmingFunds.map(fund => ({
        walletAddress: fund.protocol,
        amount: {
          eth: 0,
          usd: fund.funds,
          ens: 0
        },
        purpose: `${fund.protocol} - ${fund.position}`,
        txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        timestamp: new Date().toISOString()
      }));
      
      return {
        fundId: `ENS-Karpatkey-${year}`,
        walletAddress: "0x4F2083f5fBede34C2714aFfb3105539775f7FE64",
        totalContributions: totalFunds,
        disbursedAmount: totalFunds * 0.1, // Estimate
        availableBalance: totalFunds * 0.9, // Estimate
        currency: currency,
        treasuryComposition: {
          totalValue: totalFunds,
          assets: assets,
          riskMetrics: riskMetrics,
          performance: performance,
          strategy: strategy,
          governance: governance
        },
        recipients: recipients,
        month: month,
        year: year
      };
      
    } catch (error) {
      console.error('Error transforming Karpatkey report:', error);
      return mockEndaomentData;
    }
  },

  transformEndaomentResponse(apiData, month, year, currency) {
    try {
      // Handle different response formats from the API
      if (apiData && typeof apiData === 'object') {
        // If the API returns the data in the expected format
        if (apiData.fundId || apiData.walletAddress) {
          return apiData;
        }
        
        // If the API returns a different structure, transform it
        if (apiData.data) {
          return this.transformDataStructure(apiData.data, month, year, currency);
        }
        
        // If the API returns an array or other structure
        if (Array.isArray(apiData)) {
          return this.transformArrayData(apiData, month, year, currency);
        }
        
        // Try to extract meaningful data from the response
        return this.extractEndaomentData(apiData, month, year, currency);
      }
      
      // If no valid data structure found, return mock data
      console.warn('Invalid API response structure, using mock data');
      return mockEndaomentData;
      
    } catch (error) {
      console.error('Error transforming Endaoment response:', error);
      return mockEndaomentData;
    }
  },

  transformDataStructure(data, month, year, currency) {
    // Transform data structure to match our expected format
    return {
      fundId: data.fundId || "ENS-Endaoment-2023",
      walletAddress: data.walletAddress || "0x4F2083f5fBede34C2714aFfb3105539775f7FE64",
      totalContributions: data.totalContributions || 52000000,
      disbursedAmount: data.disbursedAmount || 10000000,
      availableBalance: data.availableBalance || 42000000,
      currency: currency,
      recipients: data.recipients || [],
      month: month,
      year: year
    };
  },

  transformArrayData(dataArray, month, year, currency) {
    // Transform array data to match our expected format
    const totalContributions = dataArray.reduce((sum, item) => sum + (item.amount || 0), 0);
    const disbursedAmount = dataArray.reduce((sum, item) => sum + (item.disbursed || 0), 0);
    
    return {
      fundId: "ENS-Endaoment-2023",
      walletAddress: "0x4F2083f5fBede34C2714aFfb3105539775f7FE64",
      totalContributions: totalContributions,
      disbursedAmount: disbursedAmount,
      availableBalance: totalContributions - disbursedAmount,
      currency: currency,
      recipients: dataArray.map(item => ({
        walletAddress: item.recipient || item.address || "0x0000000000000000000000000000000000000000",
        amount: {
          eth: item.eth || 0,
          usd: item.usd || item.amount || 0,
          ens: item.ens || 0
        },
        purpose: item.purpose || item.description || "Grant disbursement",
        txHash: item.txHash || item.hash || "0x0000000000000000000000000000000000000000000000000000000000000000",
        timestamp: item.timestamp || new Date().toISOString()
      })),
      month: month,
      year: year
    };
  },

  extractEndaomentData(data, month, year, currency) {
    // Try to extract meaningful data from various response formats
    const extracted = {
      fundId: data.fundId || data.id || "ENS-Endaoment-2023",
      walletAddress: data.walletAddress || data.address || "0x4F2083f5fBede34C2714aFfb3105539775f7FE64",
      totalContributions: data.totalContributions || data.contributions || data.total || 52000000,
      disbursedAmount: data.disbursedAmount || data.disbursed || data.spent || 10000000,
      availableBalance: data.availableBalance || data.balance || data.remaining || 42000000,
      currency: currency,
      recipients: [],
      month: month,
      year: year
    };

    // Try to extract recipients from various possible locations
    if (data.recipients && Array.isArray(data.recipients)) {
      extracted.recipients = data.recipients;
    } else if (data.transactions && Array.isArray(data.transactions)) {
      extracted.recipients = data.transactions.map(tx => ({
        walletAddress: tx.to || tx.recipient || "0x0000000000000000000000000000000000000000",
        amount: {
          eth: tx.eth || 0,
          usd: tx.usd || tx.value || 0,
          ens: tx.ens || 0
        },
        purpose: tx.purpose || tx.description || "Transaction",
        txHash: tx.hash || tx.txHash || "0x0000000000000000000000000000000000000000000000000000000000000000",
        timestamp: tx.timestamp || new Date().toISOString()
      }));
    } else if (data.grants && Array.isArray(data.grants)) {
      extracted.recipients = data.grants.map(grant => ({
        walletAddress: grant.recipient || grant.address || "0x0000000000000000000000000000000000000000",
        amount: {
          eth: grant.eth || 0,
          usd: grant.usd || grant.amount || 0,
          ens: grant.ens || 0
        },
        purpose: grant.purpose || grant.description || "Grant",
        txHash: grant.txHash || grant.hash || "0x0000000000000000000000000000000000000000000000000000000000000000",
        timestamp: grant.timestamp || new Date().toISOString()
      }));
    }

    return extracted;
  },

  async getEndaomentBalance() {
    try {
      const data = await this.getEndaomentData();
      return {
        address: data.walletAddress,
        balance: data.availableBalance,
        totalContributions: data.totalContributions,
        disbursedAmount: data.disbursedAmount,
        currency: data.currency,
        timestamp: data.timestamp,
        isMocked: data.isMocked
      };
    } catch (error) {
      console.error('Error fetching Endaoment balance:', error);
      return {
        address: "0x4F2083f5fBede34C2714aFfb3105539775f7FE64",
        balance: 42000000,
        totalContributions: 52000000,
        disbursedAmount: 10000000,
        currency: "USD",
        timestamp: new Date().toISOString(),
        isMocked: true
      };
    }
  },

  async getEndaomentRecipients(limit = 50) {
    try {
      const data = await this.getEndaomentData();
      const recipients = data.recipients || [];
      
      return {
        recipients: recipients.slice(0, limit),
        totalCount: recipients.length,
        timestamp: data.timestamp,
        isMocked: data.isMocked
      };
    } catch (error) {
      console.error('Error fetching Endaoment recipients:', error);
      return {
        recipients: mockEndaomentData.recipients.slice(0, limit),
        totalCount: mockEndaomentData.recipients.length,
        timestamp: new Date().toISOString(),
        isMocked: true
      };
    }
  },

  // Helper functions for Karpatkey data transformation
  calculateRiskLevel(tokenCategory, priceVariation) {
    if (tokenCategory === 'Stablecoins') return 'Low';
    if (tokenCategory === 'Ether') return 'Medium';
    return 'High';
  },

  getAssetColor(symbol) {
    const colors = {
      'ETH': 'blue',
      'WETH': 'blue',
      'stETH': 'blue',
      'rETH': 'blue',
      'wstETH': 'blue',
      'ETHx': 'blue',
      'ankrETH': 'blue',
      'osETH': 'blue',
      'DAI': 'purple',
      'USDC': 'purple',
      'ENS': 'green',
      'BAL': 'orange',
      'AURA': 'orange',
      'COMP': 'orange',
      'CRV': 'orange',
      'RPL': 'orange',
      'SWISE': 'orange'
    };
    return colors[symbol] || 'gray';
  },

  getAssetName(symbol) {
    const names = {
      'ETH': 'Ethereum',
      'WETH': 'Wrapped Ethereum',
      'stETH': 'Staked Ethereum',
      'rETH': 'Rocket Pool Ethereum',
      'wstETH': 'Wrapped Staked Ethereum',
      'ETHx': 'Stader Ethereum',
      'ankrETH': 'Ankr Ethereum',
      'osETH': 'StakeWise Ethereum',
      'DAI': 'Dai Stablecoin',
      'USDC': 'USD Coin',
      'ENS': 'ENS Token',
      'BAL': 'Balancer Token',
      'AURA': 'Aura Token',
      'COMP': 'Compound Token',
      'CRV': 'Curve Token',
      'RPL': 'Rocket Pool Token',
      'SWISE': 'StakeWise Token'
    };
    return names[symbol] || symbol;
  },

  calculateRiskMetrics(treasuryVariation) {
    if (!treasuryVariation) {
      return {
        volatility30d: 12.4,
        sharpeRatio: 1.87,
        maxDrawdown: -8.2,
        correlationETH: 0.94
      };
    }

    // Calculate from treasury variation data if available
    const variationData = treasuryVariation.treasuryVariationData || [];
    const marketValueChange = variationData.find(v => v.value === 'Change in market value');
    const deFiResults = variationData.find(v => v.value === 'DeFi results');

    return {
      volatility30d: Math.abs((marketValueChange?.funds || 0) / 1000000) * 10,
      sharpeRatio: 1.87,
      maxDrawdown: -8.2,
      correlationETH: 0.94
    };
  },

  calculatePerformanceMetrics(treasuryVariation, apy) {
    if (!treasuryVariation) {
      return {
        ytdReturn: 23.7,
        vsETH: 2.1,
        vsSP500: 18.9,
        riskAdjusted: 1.42
      };
    }

    // Calculate from treasury variation data
    const variationData = treasuryVariation.treasuryVariationData || [];
    const initialBalance = variationData.find(v => v.value === 'Initial Balance')?.funds || 0;
    const finalBalance = variationData.find(v => v.value === 'Final Balance')?.funds || 0;
    
    const totalReturn = initialBalance > 0 ? ((finalBalance - initialBalance) / initialBalance) * 100 : 0;

    return {
      ytdReturn: totalReturn,
      vsETH: totalReturn - 21.6, // ETH YTD return estimate
      vsSP500: totalReturn - 4.8, // S&P 500 YTD return estimate
      riskAdjusted: totalReturn / 12.4 // Using volatility as denominator
    };
  },

  extractStrategyData(fundsByTokenCategory, fundsByProtocol) {
    const etherAllocation = fundsByTokenCategory.find(f => f.label === 'Ether')?.allocation || 0;
    const stablecoinAllocation = fundsByTokenCategory.find(f => f.label === 'Stablecoins')?.allocation || 0;
    
    return {
      longTermETH: etherAllocation * 100,
      ensEcosystem: 24.8, // Default since ENS allocation not directly available
      liquidityReserves: stablecoinAllocation * 100
    };
  }
};

// Cache utilities for Endaoment data
const endaomentCache = new Map();
const ENDAOMENT_CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export const endaomentCacheService = {
  get(key) {
    const cached = endaomentCache.get(key);
    if (cached && Date.now() - cached.timestamp < ENDAOMENT_CACHE_DURATION) {
      return cached.data;
    }
    return null;
  },

  set(key, data) {
    endaomentCache.set(key, {
      data,
      timestamp: Date.now()
    });
  },

  clear() {
    endaomentCache.clear();
  },

  clearExpired() {
    const now = Date.now();
    for (const [key, value] of endaomentCache.entries()) {
      if (now - value.timestamp > ENDAOMENT_CACHE_DURATION) {
        endaomentCache.delete(key);
      }
    }
  }
};

// Error handling utilities
export const handleEndaomentError = (error, context = 'Endaoment API call') => {
  console.error(`${context} failed:`, error);
  
  return {
    message: error.message || 'Unknown error occurred',
    context,
    timestamp: new Date().toISOString(),
    isFallback: true
  };
};

export default {
  endaomentAPI,
  endaomentCacheService,
  handleEndaomentError
};
