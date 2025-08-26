// ENS Token Data - Comprehensive tracking of ENS ERC-20 tokens
export const ensTokenData = {
  // Token Contract Information
  tokenContract: {
    address: '0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72',
    name: 'Ethereum Name Service',
    symbol: 'ENS',
    decimals: 18,
    totalSupply: '100000000000000000000000000', // 100M ENS
    circulatingSupply: '85000000000000000000000000', // 85M ENS
    marketCap: 1275000000, // $1.275B USD
    price: 15.00,
    priceChange24h: -2.5,
    priceChange7d: 8.3,
    priceChange30d: -12.1,
    volume24h: 45000000,
    marketRank: 89,
    coingeckoId: 'ethereum-name-service',
    etherscanLink: 'https://etherscan.io/token/0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72',
    coingeckoLink: 'https://www.coingecko.com/en/coins/ethereum-name-service'
  },

  // Token Distribution
  distribution: {
    totalHolders: 125000,
    topHolders: [
      {
        address: '0xFe89cc7aBB2C4183683ab71625C4fCB7B02D44b7',
        ensName: 'wallet.ensdao.eth',
        balance: '8800000000000000000000000', // 8.8M ENS
        percentage: 8.8,
        category: 'DAO Treasury',
        description: 'Main ENS DAO Treasury Wallet'
      },
      {
        address: '0x4F2083f5fBede34C2714aFfb3105539775f7FE64',
        ensName: null,
        balance: '0', // 0 ENS (Endaoment wallet)
        percentage: 0,
        category: 'Endaoment Fund',
        description: 'ENS Endaoment Fund Wallet'
      },
      {
        address: '0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5',
        ensName: 'controller.ens.eth',
        balance: '5500000000000000000000000', // 5.5M ENS
        percentage: 5.5,
        category: 'Controller',
        description: 'ENS Controller Wallet'
      },
      {
        address: '0x5678901234abcdef5678901234abcdef56789012',
        ensName: 'treasury2.ensdao.eth',
        balance: '12000000000000000000000000', // 12M ENS
        percentage: 12.0,
        category: 'DAO Treasury',
        description: 'Secondary ENS DAO Treasury'
      },
      {
        address: '0xabcdef5678901234abcdef5678901234abcdef56',
        ensName: null,
        balance: '1500000000000000000000000', // 1.5M ENS
        percentage: 1.5,
        category: 'Karpatkey Managed',
        description: 'Karpatkey Managed Wallet'
      }
    ],
    distributionBreakdown: {
      daoTreasury: 28.3, // 28.3M ENS
      teamAndAdvisors: 15.0, // 15M ENS
      communityRewards: 25.0, // 25M ENS
      ecosystemFund: 20.0, // 20M ENS
      publicSale: 11.7 // 11.7M ENS
    }
  },

  // Governance Data
  governance: {
    totalProposals: 156,
    activeProposals: 3,
    totalVotes: 45000000, // 45M ENS voted
    averageParticipation: 52.8, // 52.8% average participation
    recentProposals: [
      {
        id: 156,
        title: 'EP 6.13: Service Provider Program Season 2 Implementation',
        status: 'Active',
        startDate: '2025-01-15T00:00:00Z',
        endDate: '2025-01-22T00:00:00Z',
        totalVotes: 8500000, // 8.5M ENS
        participation: 68.2,
        forVotes: 7200000, // 7.2M ENS
        againstVotes: 1300000, // 1.3M ENS
        abstainVotes: 0,
        quorum: 5000000, // 5M ENS
        description: 'Implementation of SPP2 with $4.5M annual budget and 8 active providers'
      },
      {
        id: 155,
        title: 'EP 6.12: ENS Ecosystem Working Group Q1 2025 Budget',
        status: 'Executed',
        startDate: '2025-01-08T00:00:00Z',
        endDate: '2025-01-15T00:00:00Z',
        totalVotes: 9200000, // 9.2M ENS
        participation: 73.6,
        forVotes: 8500000, // 8.5M ENS
        againstVotes: 700000, // 700K ENS
        abstainVotes: 0,
        quorum: 5000000, // 5M ENS
        description: 'Q1 2025 budget allocation for ENS Ecosystem Working Group'
      },
      {
        id: 154,
        title: 'EP 6.11: ENS DAO Treasury Management Strategy',
        status: 'Executed',
        startDate: '2025-01-01T00:00:00Z',
        endDate: '2025-01-08T00:00:00Z',
        totalVotes: 7800000, // 7.8M ENS
        participation: 62.4,
        forVotes: 7200000, // 7.2M ENS
        againstVotes: 600000, // 600K ENS
        abstainVotes: 0,
        quorum: 5000000, // 5M ENS
        description: 'Updated treasury management strategy and investment guidelines'
      }
    ],
    topVoters: [
      {
        address: '0xFe89cc7aBB2C4183683ab71625C4fCB7B02D44b7',
        ensName: 'wallet.ensdao.eth',
        totalVotes: 8800000, // 8.8M ENS
        participationRate: 95.2,
        lastVote: '2025-01-15T14:30:00Z',
        category: 'DAO Treasury'
      },
      {
        address: '0x5678901234abcdef5678901234abcdef56789012',
        ensName: 'treasury2.ensdao.eth',
        totalVotes: 12000000, // 12M ENS
        participationRate: 88.7,
        lastVote: '2025-01-15T13:45:00Z',
        category: 'DAO Treasury'
      },
      {
        address: '0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5',
        ensName: 'controller.ens.eth',
        totalVotes: 5500000, // 5.5M ENS
        participationRate: 92.1,
        lastVote: '2025-01-15T12:15:00Z',
        category: 'Controller'
      }
    ]
  },

  // Market Data
  marketData: {
    priceHistory: {
      '24h': [
        { timestamp: '2025-01-14T00:00:00Z', price: 15.25 },
        { timestamp: '2025-01-14T06:00:00Z', price: 15.45 },
        { timestamp: '2025-01-14T12:00:00Z', price: 15.80 },
        { timestamp: '2025-01-14T18:00:00Z', price: 15.60 },
        { timestamp: '2025-01-15T00:00:00Z', price: 15.00 }
      ],
      '7d': [
        { timestamp: '2025-01-08T00:00:00Z', price: 13.85 },
        { timestamp: '2025-01-09T00:00:00Z', price: 14.20 },
        { timestamp: '2025-01-10T00:00:00Z', price: 14.75 },
        { timestamp: '2025-01-11T00:00:00Z', price: 15.10 },
        { timestamp: '2025-01-12T00:00:00Z', price: 15.45 },
        { timestamp: '2025-01-13T00:00:00Z', price: 15.30 },
        { timestamp: '2025-01-14T00:00:00Z', price: 15.25 },
        { timestamp: '2025-01-15T00:00:00Z', price: 15.00 }
      ],
      '30d': [
        { timestamp: '2024-12-16T00:00:00Z', price: 17.20 },
        { timestamp: '2024-12-23T00:00:00Z', price: 16.80 },
        { timestamp: '2024-12-30T00:00:00Z', price: 16.40 },
        { timestamp: '2025-01-06T00:00:00Z', price: 14.90 },
        { timestamp: '2025-01-13T00:00:00Z', price: 15.30 },
        { timestamp: '2025-01-15T00:00:00Z', price: 15.00 }
      ]
    },
    volumeData: {
      '24h': 45000000,
      '7d': 285000000,
      '30d': 1200000000
    },
    marketMetrics: {
      marketCap: 1275000000,
      fullyDilutedMarketCap: 1500000000,
      priceToBookRatio: 2.8,
      priceToSalesRatio: 15.2,
      circulatingSupply: 85000000,
      maxSupply: 100000000
    }
  },

  // Staking and Rewards
  staking: {
    totalStaked: 25000000, // 25M ENS staked
    stakingAPY: 8.5,
    stakingRewards: {
      daily: 5800, // 5,800 ENS per day
      weekly: 40600, // 40,600 ENS per week
      monthly: 174000, // 174,000 ENS per month
      yearly: 2088000 // 2,088,000 ENS per year
    },
    stakingPools: [
      {
        name: 'ENS DAO Staking Pool',
        address: '0x1234567890abcdef1234567890abcdef12345678',
        totalStaked: 15000000, // 15M ENS
        apy: 8.5,
        participants: 1250,
        description: 'Official ENS DAO staking pool'
      },
      {
        name: 'Community Staking Pool',
        address: '0xabcdef1234567890abcdef1234567890abcdef12',
        totalStaked: 10000000, // 10M ENS
        apy: 7.8,
        participants: 850,
        description: 'Community-managed staking pool'
      }
    ]
  },

  // Recent Transactions
  recentTransactions: [
    {
      txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      timestamp: '2025-01-15T14:30:00Z',
      from: '0xFe89cc7aBB2C4183683ab71625C4fCB7B02D44b7',
      to: '0x5678901234abcdef5678901234abcdef56789012',
      amount: '1000000000000000000000000', // 1M ENS
      type: 'Transfer',
      description: 'Treasury rebalancing transfer'
    },
    {
      txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      timestamp: '2025-01-15T13:45:00Z',
      from: '0x5678901234abcdef5678901234abcdef56789012',
      to: '0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5',
      amount: '500000000000000000000000', // 500K ENS
      type: 'Governance',
      description: 'Vote delegation for proposal #156'
    },
    {
      txHash: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
      timestamp: '2025-01-15T12:15:00Z',
      from: '0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5',
      to: '0x1234567890abcdef1234567890abcdef12345678',
      amount: '100000000000000000000000', // 100K ENS
      type: 'Staking',
      description: 'Staking reward distribution'
    }
  ],

  // Token Utility
  utility: {
    useCases: [
      {
        name: 'Domain Registration',
        description: 'ENS tokens are used for domain registration and renewal',
        usage: 'Primary utility'
      },
      {
        name: 'Governance',
        description: 'ENS tokens provide voting rights in DAO governance',
        usage: 'Core governance token'
      },
      {
        name: 'Staking Rewards',
        description: 'ENS tokens can be staked to earn rewards',
        usage: 'Passive income generation'
      },
      {
        name: 'Protocol Fees',
        description: 'ENS tokens are used to pay protocol fees',
        usage: 'Network utility'
      }
    ],
    integrations: [
      'Uniswap V3',
      'SushiSwap',
      'Balancer',
      '1inch',
      'MetaMask',
      'WalletConnect',
      'OpenSea',
      'Etherscan'
    ]
  },

  // Analytics and Metrics
  analytics: {
    holderGrowth: {
      '2024-01': 85000,
      '2024-06': 95000,
      '2024-12': 115000,
      '2025-01': 125000
    },
    transactionVolume: {
      '24h': 45000000,
      '7d': 285000000,
      '30d': 1200000000
    },
    governanceParticipation: {
      '2024': 45.2,
      '2025': 52.8
    },
    stakingParticipation: {
      '2024': 18.5,
      '2025': 29.4
    }
  },

  // External Links
  links: {
    etherscan: 'https://etherscan.io/token/0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72',
    coingecko: 'https://www.coingecko.com/en/coins/ethereum-name-service',
    coinmarketcap: 'https://coinmarketcap.com/currencies/ethereum-name-service/',
    ensWebsite: 'https://ens.domains/',
    ensDocs: 'https://docs.ens.domains/',
    governance: 'https://snapshot.org/#/ens.eth',
    forum: 'https://discuss.ens.domains/',
    github: 'https://github.com/ensdomains'
  }
};

// Helper functions for ENS token data
export const formatENSAmount = (amount, decimals = 18) => {
  const formatted = (parseInt(amount) / Math.pow(10, decimals)).toLocaleString();
  return `${formatted} ENS`;
};

export const formatENSValue = (amount, price = 15.00, decimals = 18) => {
  const ensAmount = parseInt(amount) / Math.pow(10, decimals);
  const value = ensAmount * price;
  return `$${value.toLocaleString()}`;
};

export const calculatePercentage = (amount, total) => {
  return ((amount / total) * 100).toFixed(2);
};

export const getTokenMetrics = () => {
  return {
    marketCap: ensTokenData.tokenContract.marketCap,
    price: ensTokenData.tokenContract.price,
    volume24h: ensTokenData.marketData.volumeData['24h'],
    circulatingSupply: ensTokenData.tokenContract.circulatingSupply,
    totalSupply: ensTokenData.tokenContract.totalSupply
  };
};
