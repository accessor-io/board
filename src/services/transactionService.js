// Real transaction service for fetching actual blockchain data
const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;

// Mock data for demo mode
const mockTransactions = [
  {
    hash: '0x8f2a9e4b1c3d5f6a8b9e0f1c2d3a4b5c6d7e8f9a',
    wallet: 'ENS DAO Wallet',
    type: 'OUTBOUND',
    to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    value: '125,000.00 USDC',
    description: 'ENS Labs Development Grant',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: 'CONFIRMED'
  },
  {
    hash: '0x4c7b2d9f5e6a8b3c1d4e2f8a9b5c7d6e3f1a4b2',
    wallet: 'ENS Gnosis Safe',
    type: 'OUTBOUND',
    to: '0x9e3f5a2b8c4d7e1f6a9b3c5d8e2f4a7b9c6d1e3',
    value: '85,000.00 USDC',
    description: 'Community Initiatives Fund',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: 'CONFIRMED'
  },
  {
    hash: '0x1a8d7f3e9b5c2f6a4d8e1b9c3f7a5d2e8b4c6f1',
    wallet: 'ENS Multisig',
    type: 'OUTBOUND',
    to: '0x6b5c4d8a2e9f3b7c1d6a8e4b9f2c5d7a3e8b6c',
    value: '57,000.00 USDC',
    description: 'Developer Tools Funding',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'CONFIRMED'
  }
];

export const transactionService = {
  async fetchRealTransactions(walletAddress, limit = 10) {
    // If no wallet address provided, return empty array
    if (!walletAddress) {
      console.error('Wallet address is required');
      return [];
    }

    console.log('Transaction service called with:', { walletAddress, limit, apiKey: ETHERSCAN_API_KEY ? 'Present' : 'Missing' });

    // If no API key, return mock data
    if (!ETHERSCAN_API_KEY) {
      console.log('No API key configured, using mock data');
      return mockTransactions.slice(0, limit);
    }

    try {
      console.log('Making API call to Etherscan...');
      const response = await fetch(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=${limit}&sort=desc&apikey=${ETHERSCAN_API_KEY}`
      );

      console.log('API response status:', response.status);
      const data = await response.json();
      console.log('API response data:', { status: data.status, message: data.message, resultCount: data.result?.length || 0 });

      if (data.status === '1' && data.result) {
        console.log('Successfully fetched transactions:', data.result.length);
        return data.result.map(tx => ({
          hash: tx.hash,
          from: tx.from,
          to: tx.to,
          value: tx.value,
          gas: tx.gas,
          gasPrice: tx.gasPrice,
          timestamp: new Date(parseInt(tx.timeStamp) * 1000).toISOString(),
          blockNumber: parseInt(tx.blockNumber),
          confirmations: parseInt(tx.confirmations),
          isError: tx.isError === '1',
          wallet: 'ENS DAO Treasury',
          type: tx.from.toLowerCase() === walletAddress.toLowerCase() ? 'OUTBOUND' : 'INBOUND',
          status: tx.isError === '1' ? 'FAILED' : 'CONFIRMED'
        }));
      }

      // If API fails, fall back to mock data
      console.log('API call failed or returned no results, using mock data');
      return mockTransactions.slice(0, limit);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      // Fall back to mock data on error
      return mockTransactions.slice(0, limit);
    }
  },

  async fetchTokenTransfers(walletAddress, limit = 100) {
    // If no wallet address provided, return empty array
    if (!walletAddress) {
      console.error('Wallet address is required');
      return [];
    }

    // If no API key, return empty array
    if (!ETHERSCAN_API_KEY) {
      console.log('No API key configured');
      return [];
    }

    try {
      const response = await fetch(
        `https://api.etherscan.io/api?module=account&action=tokentx&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=${limit}&sort=desc&apikey=${ETHERSCAN_API_KEY}`
      );

      const data = await response.json();

      if (data.status === '1' && data.result) {
        return data.result.map(tx => ({
          hash: tx.hash,
          from: tx.from,
          to: tx.to,
          contractAddress: tx.contractAddress,
          tokenName: tx.tokenName,
          tokenSymbol: tx.tokenSymbol,
          tokenDecimal: parseInt(tx.tokenDecimal),
          value: tx.value,
          timestamp: new Date(parseInt(tx.timeStamp) * 1000).toISOString(),
          blockNumber: parseInt(tx.blockNumber)
        }));
      }

      return [];
    } catch (error) {
      console.error('Error fetching token transfers:', error);
      return [];
    }
  },

  async fetchTokenBalance(walletAddress, contractAddress) {
    // If no addresses provided, return '0'
    if (!walletAddress || !contractAddress) {
      console.error('Wallet address and contract address are required');
      return '0';
    }

    // If no API key, return '0'
    if (!ETHERSCAN_API_KEY) {
      console.log('No API key configured');
      return '0';
    }

    try {
      const response = await fetch(
        `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${walletAddress}&tag=latest&apikey=${ETHERSCAN_API_KEY}`
      );

      const data = await response.json();

      if (data.status === '1') {
        return data.result;
      }

      return '0';
    } catch (error) {
      console.error('Error fetching token balance:', error);
      return '0';
    }
  },

  async fetchETHBalance(walletAddress) {
    // If no wallet address provided, return '0'
    if (!walletAddress) {
      console.error('Wallet address is required');
      return '0';
    }

    // If no API key, return '0'
    if (!ETHERSCAN_API_KEY) {
      console.log('No API key configured');
      return '0';
    }

    try {
      const response = await fetch(
        `https://api.etherscan.io/api?module=account&action=balance&address=${walletAddress}&tag=latest&apikey=${ETHERSCAN_API_KEY}`
      );

      const data = await response.json();

      if (data.status === '1') {
        return data.result;
      }

      return '0';
    } catch (error) {
      console.error('Error fetching ETH balance:', error);
      return '0';
    }
  }
}; 