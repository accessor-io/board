// Standardized API Service with uniform output arrangements
// This service ensures all Etherscan data is parsed and formatted consistently

import { etherscanTransformers, ETHERSCAN_DATA_SCHEMAS, transformBatchData, validateTransformedData } from '../utils/dataTransformers.js';

// Configuration with proper error handling
const config = {
  etherscan: {
    apiKey: import.meta.env.VITE_ETHERSCAN_API_KEY || 'demo',
    baseUrl: 'https://api.etherscan.io/api',
    rateLimitDelay: 200, // ms between requests
    maxRetries: 3
  }
};

// Enhanced fetch with timeout and retry logic
const fetchWithRetry = async (url, options = {}, retries = config.etherscan.maxRetries) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

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

    if (retries > 0 && (error.name === 'AbortError' || error.message.includes('timeout'))) {
      console.warn(`Request failed, retrying... (${retries} retries left)`);
      await new Promise(resolve => setTimeout(resolve, config.etherscan.rateLimitDelay));
      return fetchWithRetry(url, options, retries - 1);
    }

    throw error;
  }
};

// Standardized Etherscan API with output arrangements
export const standardizedEtherscanAPI = {
  // Get account balance with standardized output
  async getAccountBalance(address) {
    try {
      if (config.etherscan.apiKey === 'demo' || !navigator.onLine) {
        console.warn('Using standardized mock data for account balance');
        const mockData = {
          address: address.toLowerCase(),
          balance: (Math.random() * 100000).toFixed(2),
          timestamp: Math.floor(Date.now() / 1000)
        };
        return etherscanTransformers.transformBalance(mockData, 'mock');
      }

      const response = await fetchWithRetry(
        `${config.etherscan.baseUrl}?module=account&action=balance&address=${address}&tag=latest&apikey=${config.etherscan.apiKey}`
      );

      const data = await response.json();

      if (data.status !== '1') {
        throw new Error(`Etherscan API error: ${data.message}`);
      }

      const rawData = {
        address: address.toLowerCase(),
        balance: data.result,
        timestamp: Math.floor(Date.now() / 1000)
      };

      const transformedData = etherscanTransformers.transformBalance(rawData, 'etherscan');
      const validation = validateTransformedData(transformedData, ETHERSCAN_DATA_SCHEMAS.BALANCE);

      if (!validation.isValid) {
        console.warn('Balance data validation failed:', validation.errors);
      }

      return transformedData;

    } catch (error) {
      console.error('Error fetching standardized account balance:', error);

      // Return standardized fallback
      return etherscanTransformers.transformBalance({
        address: address.toLowerCase(),
        balance: '0',
        timestamp: Math.floor(Date.now() / 1000)
      }, 'fallback');
    }
  },

  // Get transaction history with standardized output
  async getTransactionHistory(address, startBlock = 0, endBlock = 99999999) {
    try {
      if (config.etherscan.apiKey === 'demo' || !navigator.onLine) {
        console.warn('Using standardized mock data for transaction history');
        const mockTransactions = Array.from({ length: 5 }, (_, i) => ({
          hash: `0x${Math.random().toString(16).substr(2, 64)}`,
          from: `0x${Math.random().toString(16).substr(2, 40)}`,
          to: `0x${Math.random().toString(16).substr(2, 40)}`,
          value: (Math.random() * 100000).toString(),
          gas: '21000',
          gasPrice: (Math.random() * 50 + 10).toString(),
          timeStamp: Math.floor(Date.now() / 1000) - i * 3600,
          blockNumber: (18500000 - i).toString(),
          confirmations: (10 + i).toString(),
          isError: '0'
        }));

        const batchResult = transformBatchData(
          mockTransactions,
          etherscanTransformers.transformTransaction,
          ETHERSCAN_DATA_SCHEMAS.TRANSACTION
        );

        return batchResult.transformed;
      }

      const response = await fetchWithRetry(
        `${config.etherscan.baseUrl}?module=account&action=txlist&address=${address}&startblock=${startBlock}&endblock=${endBlock}&sort=desc&apikey=${config.etherscan.apiKey}`
      );

      const data = await response.json();

      if (data.status !== '1') {
        throw new Error(`Etherscan API error: ${data.message}`);
      }

      const batchResult = transformBatchData(
        data.result || [],
        etherscanTransformers.transformTransaction,
        ETHERSCAN_DATA_SCHEMAS.TRANSACTION
      );

      if (batchResult.stats.failed > 0) {
        console.warn(`${batchResult.stats.failed} transactions failed transformation`);
      }

      return batchResult.transformed;

    } catch (error) {
      console.error('Error fetching standardized transaction history:', error);
      return [];
    }
  },

  // Get token transfers with standardized output
  async getTokenTransfers(address, contractAddress = null) {
    try {
      if (config.etherscan.apiKey === 'demo' || !navigator.onLine) {
        console.warn('Using standardized mock data for token transfers');
        const mockTransfers = Array.from({ length: 3 }, (_, i) => ({
          hash: `0x${Math.random().toString(16).substr(2, 64)}`,
          from: `0x${Math.random().toString(16).substr(2, 40)}`,
          to: `0x${Math.random().toString(16).substr(2, 40)}`,
          contractAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
          tokenName: 'Mock Token',
          tokenSymbol: 'MOCK',
          tokenDecimal: '18',
          value: (Math.random() * 1000000).toString(),
          timeStamp: Math.floor(Date.now() / 1000) - i * 1800,
          blockNumber: (18500000 - i).toString()
        }));

        const batchResult = transformBatchData(
          mockTransfers,
          etherscanTransformers.transformTokenTransfer,
          ETHERSCAN_DATA_SCHEMAS.TOKEN_TRANSFER
        );

        return batchResult.transformed;
      }

      let url = `${config.etherscan.baseUrl}?module=account&action=tokentx&address=${address}&sort=desc&apikey=${config.etherscan.apiKey}`;

      if (contractAddress) {
        url += `&contractaddress=${contractAddress}`;
      }

      const response = await fetchWithRetry(url);
      const data = await response.json();

      if (data.status !== '1') {
        throw new Error(`Etherscan API error: ${data.message}`);
      }

      const batchResult = transformBatchData(
        data.result || [],
        etherscanTransformers.transformTokenTransfer,
        ETHERSCAN_DATA_SCHEMAS.TOKEN_TRANSFER
      );

      if (batchResult.stats.failed > 0) {
        console.warn(`${batchResult.stats.failed} token transfers failed transformation`);
      }

      return batchResult.transformed;

    } catch (error) {
      console.error('Error fetching standardized token transfers:', error);
      return [];
    }
  },

  // Get gas price with standardized output
  async getGasPrice() {
    try {
      if (config.etherscan.apiKey === 'demo' || !navigator.onLine) {
        console.warn('Using standardized mock data for gas price');
        const mockData = {
          SafeLow: (15 + Math.floor(Math.random() * 5)).toString(),
          ProposeGasPrice: (20 + Math.floor(Math.random() * 5)).toString(),
          FastGasPrice: (25 + Math.floor(Math.random() * 10)).toString(),
          timestamp: Math.floor(Date.now() / 1000)
        };
        return etherscanTransformers.transformGasPrice(mockData, 'mock');
      }

      const response = await fetchWithRetry(
        `${config.etherscan.baseUrl}?module=gastracker&action=gasoracle&apikey=${config.etherscan.apiKey}`
      );

      const data = await response.json();

      if (data.status !== '1') {
        throw new Error(`Etherscan API error: ${data.message}`);
      }

      const transformedData = etherscanTransformers.transformGasPrice({
        ...data.result,
        timestamp: Math.floor(Date.now() / 1000)
      }, 'etherscan');

      return transformedData;

    } catch (error) {
      console.error('Error fetching standardized gas price:', error);

      // Return standardized fallback
      return etherscanTransformers.transformGasPrice({
        SafeLow: '15',
        ProposeGasPrice: '20',
        FastGasPrice: '25',
        timestamp: Math.floor(Date.now() / 1000)
      }, 'fallback');
    }
  },

  // Batch processing for multiple addresses
  async getBatchBalances(addresses) {
    const results = {
      successful: [],
      failed: [],
      stats: { total: addresses.length, successful: 0, failed: 0 }
    };

    // Process in batches to respect rate limits
    const batchSize = 5;
    for (let i = 0; i < addresses.length; i += batchSize) {
      const batch = addresses.slice(i, i + batchSize);
      const batchPromises = batch.map(address => this.getAccountBalance(address));

      try {
        const batchResults = await Promise.allSettled(batchPromises);

        batchResults.forEach((result, index) => {
          const address = batch[index];

          if (result.status === 'fulfilled') {
            results.successful.push(result.value);
            results.stats.successful++;
          } else {
            results.failed.push({
              address,
              error: result.reason.message
            });
            results.stats.failed++;
          }
        });
      } catch (error) {
        console.error('Batch processing error:', error);
      }

      // Rate limiting delay between batches
      if (i + batchSize < addresses.length) {
        await new Promise(resolve => setTimeout(resolve, config.etherscan.rateLimitDelay));
      }
    }

    return results;
  },

  // Data quality reporting
  getDataQualityReport() {
    return {
      timestamp: new Date().toISOString(),
      apiKeyConfigured: config.etherscan.apiKey !== 'demo',
      rateLimitDelay: config.etherscan.rateLimitDelay,
      maxRetries: config.etherscan.maxRetries,
      schemas: ETHERSCAN_DATA_SCHEMAS,
      transformersAvailable: Object.keys(etherscanTransformers)
    };
  }
};

export default {
  standardizedEtherscanAPI,
  config
};
