// API service for fetching ENS DAO financial data with proper error handling
const API_BASE_URL = 'https://api.etherscan.io/api';
const DUNE_API_URL = 'https://api.dune.com/api/v1';
const ENS_API_URL = 'https://api.ens.domains';

// Configuration - requires real API keys (no demo mode)
const config = {
  etherscan: {
    apiKey: import.meta.env.VITE_ETHERSCAN_API_KEY,
    baseUrl: API_BASE_URL
  },
  dune: {
    apiKey: import.meta.env.VITE_DUNE_API_KEY,
    baseUrl: DUNE_API_URL
  },
  ens: {
    baseUrl: ENS_API_URL
  }
};

// Mock data for fallbacks
const mockTreasuryData = {
  timestamp: new Date().toISOString(),
  wallets: [
    {
      address: '0xfe89cc7abb2c4183683ab71625c4fcb7b02d44b7',
      balance: '234567.8',
      timestamp: new Date().toISOString()
    },
    {
      address: '0x4f2083f5fbede34c2714affb3105539775f7fe64',
      balance: '45832.1',
      timestamp: new Date().toISOString()
    }
  ],
  totalBalance: 280399.9
};

const mockTransactionData = {
  timestamp: new Date().toISOString(),
  transactions: [
    {
      hash: '0x123456789abcdef',
      from: '0xfe89cc7abb2c4183683ab71625c4fcb7b02d44b7',
      to: '0x4f2083f5fbede34c2714affb3105539775f7fe64',
      value: '125000',
      gas: '21000',
      gasPrice: '20',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      blockNumber: 18500000,
      confirmations: 10,
      isError: false
    },
    {
      hash: '0xabcdef123456789',
      from: '0x4f2083f5fbede34c2714affb3105539775f7fe64',
      to: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5',
      value: '85000',
      gas: '21000',
      gasPrice: '18',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      blockNumber: 18499500,
      confirmations: 15,
      isError: false
    }
  ],
  count: 2
};

// Utility functions
const formatAddress = (address) => {
  return address.toLowerCase();
};

const formatCurrency = (amount, decimals = 18) => {
  if (!amount) return '0';
  return (parseInt(amount) / Math.pow(10, decimals)).toString();
};

// Enhanced fetch with timeout and error handling
const fetchWithTimeout = async (url, options = {}, timeout = 10000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
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

// Etherscan API calls with fallbacks
export const etherscanAPI = {
  async getAccountBalance(address) {
    try {
      // Check if API key is configured
      if (!config.etherscan.apiKey) {
        throw new Error('Etherscan API key not configured. Please add VITE_ETHERSCAN_API_KEY to your .env file.');
      }

      // Check if we're offline
      if (!navigator.onLine) {
        throw new Error('Network offline. Cannot fetch account balance.');
      }

      const response = await fetchWithTimeout(
        `${config.etherscan.baseUrl}?module=account&action=balance&address=${formatAddress(address)}&tag=latest&apikey=${config.etherscan.apiKey}`
      );
      const data = await response.json();
      
      if (data.status === '1') {
        return {
          address: formatAddress(address),
          balance: formatCurrency(data.result),
          timestamp: new Date().toISOString()
        };
      } else {
        throw new Error(`Etherscan API error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error fetching account balance:', error);
      throw error; // No fallback - let the caller handle the error
    }
  },

  async getTransactionHistory(address, startBlock = 0, endBlock = 99999999) {
    try {
      // Check if API key is configured
      if (!config.etherscan.apiKey) {
        throw new Error('Etherscan API key not configured. Please add VITE_ETHERSCAN_API_KEY to your .env file.');
      }

      // Check if we're offline
      if (!navigator.onLine) {
        throw new Error('Network offline. Cannot fetch transaction history.');
      }

      const response = await fetchWithTimeout(
        `${config.etherscan.baseUrl}?module=account&action=txlist&address=${formatAddress(address)}&startblock=${startBlock}&endblock=${endBlock}&sort=desc&apikey=${config.etherscan.apiKey}`
      );
      const data = await response.json();
      
      if (data.status === '1') {
        return data.result.map(tx => ({
          hash: tx.hash,
          from: formatAddress(tx.from),
          to: formatAddress(tx.to),
          value: formatCurrency(tx.value),
          gas: tx.gas,
          gasPrice: formatCurrency(tx.gasPrice, 9),
          timestamp: new Date(parseInt(tx.timeStamp) * 1000).toISOString(),
          blockNumber: parseInt(tx.blockNumber),
          confirmations: parseInt(tx.confirmations),
          isError: tx.isError === '1'
        }));
      } else {
        throw new Error(`Etherscan API error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      throw error; // No fallback - let the caller handle the error
    }
  },

  async getTokenTransfers(address, contractAddress = null) {
    try {
      // Check if API key is configured
      if (!config.etherscan.apiKey) {
        throw new Error('Etherscan API key not configured. Please add VITE_ETHERSCAN_API_KEY to your .env file.');
      }

      // Check if we're offline
      if (!navigator.onLine) {
        throw new Error('Network offline. Cannot fetch token transfers.');
      }

      let url = `${config.etherscan.baseUrl}?module=account&action=tokentx&address=${formatAddress(address)}&sort=desc&apikey=${config.etherscan.apiKey}`;
      
      if (contractAddress) {
        url += `&contractaddress=${formatAddress(contractAddress)}`;
      }

      const response = await fetchWithTimeout(url);
      const data = await response.json();
      
      if (data.status === '1') {
        return data.result.map(tx => ({
          hash: tx.hash,
          from: formatAddress(tx.from),
          to: formatAddress(tx.to),
          contractAddress: formatAddress(tx.contractAddress),
          tokenName: tx.tokenName,
          tokenSymbol: tx.tokenSymbol,
          tokenDecimal: parseInt(tx.tokenDecimal),
          value: formatCurrency(tx.value, parseInt(tx.tokenDecimal)),
          timestamp: new Date(parseInt(tx.timeStamp) * 1000).toISOString(),
          blockNumber: parseInt(tx.blockNumber)
        }));
      } else {
        throw new Error(`Etherscan API error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error fetching token transfers:', error);
      throw error; // No fallback - let the caller handle the error
    }
  },

  async getGasPrice() {
    try {
      // Check if API key is configured
      if (!config.etherscan.apiKey) {
        throw new Error('Etherscan API key not configured. Please add VITE_ETHERSCAN_API_KEY to your .env file.');
      }

      // Check if we're offline
      if (!navigator.onLine) {
        throw new Error('Network offline. Cannot fetch gas price.');
      }

      const response = await fetchWithTimeout(
        `${config.etherscan.baseUrl}?module=gastracker&action=gasoracle&apikey=${config.etherscan.apiKey}`
      );
      const data = await response.json();
      
      if (data.status === '1') {
        return {
          safeLow: parseInt(data.result.SafeLow),
          standard: parseInt(data.result.ProposeGasPrice),
          fast: parseInt(data.result.FastGasPrice),
          timestamp: new Date().toISOString()
        };
      } else {
        throw new Error(`Etherscan API error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error fetching gas price:', error);
      throw error; // No fallback - let the caller handle the error
    }
  }
};

// Dune Analytics API calls with fallbacks
export const duneAPI = {
  async executeQuery(queryId, parameters = {}) {
    try {
      if (!config.dune.apiKey) {
        throw new Error('Dune Analytics API key not configured. Please add VITE_DUNE_API_KEY to your .env file.');
      }

      if (!navigator.onLine) {
        throw new Error('Network offline. Cannot execute Dune query.');
      }

      const response = await fetchWithTimeout(`${config.dune.baseUrl}/query/${queryId}/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Dune-API-Key': config.dune.apiKey
        },
        body: JSON.stringify({ parameters })
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error executing Dune query:', error);
      throw error; // No fallback - let the caller handle the error
    }
  },

  async getQueryResults(executionId) {
    try {
      if (!config.dune.apiKey) {
        throw new Error('Dune Analytics API key not configured. Please add VITE_DUNE_API_KEY to your .env file.');
      }

      if (!navigator.onLine) {
        throw new Error('Network offline. Cannot fetch Dune query results.');
      }

      const response = await fetchWithTimeout(`${config.dune.baseUrl}/execution/${executionId}/results`, {
        headers: {
          'X-Dune-API-Key': config.dune.apiKey
        }
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Dune query results:', error);
      throw error; // No fallback - let the caller handle the error
    }
  }
};

// ENS API calls with fallbacks
export const ensAPI = {
  async getDomainInfo(domain) {
    try {
      if (!navigator.onLine) {
        throw new Error('Network offline. Cannot fetch ENS domain info.');
      }

      const response = await fetchWithTimeout(`${config.ens.baseUrl}/v1/domains/${domain}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching ENS domain info:', error);
      throw error; // No fallback - let the caller handle the error
    }
  },

  async getReverseRecord(address) {
    try {
      if (!navigator.onLine) {
        throw new Error('Network offline. Cannot fetch ENS reverse record.');
      }

      const response = await fetchWithTimeout(`${config.ens.baseUrl}/v1/reverse/${formatAddress(address)}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching ENS reverse record:', error);
      throw error; // No fallback - let the caller handle the error
    }
  }
};

// Combined data fetching functions with robust error handling
export const dataService = {
  async getENSDAOTreasuryData() {
    try {
      const { walletDirectory } = await import('../data/walletDirectory');
      const treasuryAddresses = walletDirectory
        .filter(w => w.category !== 'contract')
        .map(w => w.address);

      // Always try to use API data - no fallbacks
      try {
        const useAlchemy = !!(import.meta.env && import.meta.env.VITE_ALCHEMY_API_KEY && import.meta.env.VITE_ALCHEMY_API_KEY !== 'demo');
        let balances;

        if (useAlchemy) {
          const { default: alchemyAPI } = await import('./alchemyAPI');
          const ethBalances = await alchemyAPI.getETHBalances(treasuryAddresses);
          balances = ethBalances.map(({ address, balanceEth }) => ({
            address: address.toLowerCase(),
            balance: String(balanceEth || 0),
            timestamp: new Date().toISOString()
          }));
        } else {
          // Use Etherscan API directly
          if (!config.etherscan.apiKey) {
            throw new Error('Neither Alchemy nor Etherscan API key configured. Please add VITE_ALCHEMY_API_KEY or VITE_ETHERSCAN_API_KEY to your .env file.');
          }

          balances = [];
          for (const address of treasuryAddresses) {
            try {
              const balance = await etherscanAPI.getAccountBalance(address);
              balances.push({
                address: address.toLowerCase(),
                balance: balance.balance,
                timestamp: balance.timestamp
              });
            } catch (error) {
              console.error(`Failed to fetch balance for ${address}:`, error);
              balances.push({
                address: address.toLowerCase(),
                balance: '0',
                timestamp: new Date().toISOString(),
                error: error.message
              });
            }
          }
        }

        return {
          timestamp: new Date().toISOString(),
          wallets: balances,
          totalBalance: balances.reduce((sum, wallet) => sum + parseFloat(wallet.balance), 0)
        };
      } catch (apiError) {
        console.error('API failed:', apiError);
        throw apiError; // No fallback - let the caller handle the error
      }
    } catch (error) {
      console.error('Error fetching ENS DAO treasury data:', error);
      throw error; // No fallback - let the caller handle the error
    }
  },

  async getENSDAOTransactions(limit = 100) {
    try {
      const { walletDirectory } = await import('../data/walletDirectory');
      const treasuryAddresses = walletDirectory
        .filter(w => w.category !== 'contract')
        .map(w => w.address);

      // Always use real API data - no fallbacks
      if (!config.etherscan.apiKey) {
        throw new Error('Etherscan API key not configured. Please add VITE_ETHERSCAN_API_KEY to your .env file.');
      }

      if (!navigator.onLine) {
        throw new Error('Network offline. Cannot fetch transactions.');
      }

      // Get transactions from a sample treasury address
      const sampleAddress = treasuryAddresses[0];
      const transactions = await etherscanAPI.getTransactionHistory(sampleAddress, 0, 99999999);

      return {
        timestamp: new Date().toISOString(),
        transactions: transactions.slice(0, limit),
        count: Math.min(transactions.length, limit)
      };
    } catch (error) {
      console.error('Error fetching ENS DAO transactions:', error);
      throw error; // No fallback - let the caller handle the error
    }
  },

  async getENSDAOTokenHoldings() {
    try {
      // Always use real API data - no fallbacks
      if (!config.etherscan.apiKey) {
        throw new Error('Etherscan API key not configured. Please add VITE_ETHERSCAN_API_KEY to your .env file.');
      }

      if (!navigator.onLine) {
        throw new Error('Network offline. Cannot fetch token holdings.');
      }

      const { walletDirectory } = await import('../data/walletDirectory');
      const treasuryAddresses = walletDirectory
        .filter(w => w.category !== 'contract')
        .map(w => w.address);

      // Get token transfers for treasury addresses
      const allTokenTransfers = [];
      for (const address of treasuryAddresses.slice(0, 3)) { // Limit to first 3 addresses for performance
        try {
          const transfers = await etherscanAPI.getTokenTransfers(address);
          allTokenTransfers.push(...transfers);
        } catch (error) {
          console.warn(`Failed to fetch token transfers for ${address}:`, error);
        }
      }

      // Group by token contract
      const tokenGroups = {};
      allTokenTransfers.forEach(transfer => {
        const key = transfer.contractAddress;
        if (!tokenGroups[key]) {
          tokenGroups[key] = {
            contractAddress: transfer.contractAddress,
            tokenName: transfer.tokenName,
            tokenSymbol: transfer.tokenSymbol,
            tokenDecimal: transfer.tokenDecimal,
            totalValue: 0,
            transfers: []
          };
        }
        tokenGroups[key].transfers.push(transfer);
        // Simple calculation - in real implementation you'd track balances properly
        tokenGroups[key].totalValue += parseFloat(transfer.value);
      });

      return {
        timestamp: new Date().toISOString(),
        holdings: Object.values(tokenGroups)
      };
    } catch (error) {
      console.error('Error fetching ENS DAO token holdings:', error);
      throw error; // No fallback - let the caller handle the error
    }
  }
};

// Error handling utilities
export const handleAPIError = (error, context = 'API call') => {
  console.error(`${context} failed:`, error);
  
  // Return a standardized error object instead of throwing
  return {
    message: error.message || 'Unknown error occurred',
    context,
    timestamp: new Date().toISOString(),
    isFallback: true
  };
};

// Cache utilities
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const cacheService = {
  get(key) {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    return null;
  },

  set(key, data) {
    cache.set(key, {
      data,
      timestamp: Date.now()
    });
  },

  clear() {
    cache.clear();
  },

  clearExpired() {
    const now = Date.now();
    for (const [key, value] of cache.entries()) {
      if (now - value.timestamp > CACHE_DURATION) {
        cache.delete(key);
      }
    }
  }
};

export default {
  etherscanAPI,
  duneAPI,
  ensAPI,
  dataService,
  handleAPIError,
  cacheService
};
