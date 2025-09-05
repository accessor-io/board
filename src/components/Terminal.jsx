import React, { useState, useEffect } from 'react';
import { commands as commandModules } from './terminal/commands/index.js';
import { transactionService } from '../services/transactionService.js';
import '../styles/terminal.css';

// Import environment variables
const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY || 'demo';

// Utility function to detect and format URLs as clickable links
const formatOutputWithLinks = (text) => {
  // URL regex pattern
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Split text by URLs and format
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      return `<a href="${part}" target="_blank" rel="noopener noreferrer" class="terminal-link">${part}</a>`;
    }
    return part;
  }).join('');
};

// Utility function to resolve ENS names from addresses
const resolveENSName = async (address) => {
  if (!address || !address.startsWith('0x')) {
    return address;
  }

  try {
    // Use Etherscan API for ENS resolution (if available)
    if (ETHERSCAN_API_KEY && ETHERSCAN_API_KEY !== 'demo') {
      const response = await fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=1&sort=asc&apikey=${ETHERSCAN_API_KEY}`);
      // For now, just return the shortened address
      // In a real implementation, you'd use the ENS API or Ethers.js
    }

    // Fallback: Check if we have a known ENS mapping
    const knownENSMappings = {
      '0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7': 'ens.eth',
      '0xCF60916b6CB4753f58533808fA610FcbD4098Ec0': 'gnosis-safe.eth',
      '0x911143d946bA5d467BfC476491fdb235fEf4D667': 'multisig.eth',
      '0x2686A8919Df194aA7673244549E68D42C1685d03': 'ecosystem.eth',
      '0x536013c57DAF01D78e8a70cAd1B1abAda9411819': 'ecosystem-irl.eth',
      '0xcD42b4c4D102cc22864e3A1341Bb0529c17fD87d': 'public-goods.eth',
      '0xebA76C907F02BA13064EDAD7876Fe51D9d856F62': 'public-goods-2.eth'
    };

    if (knownENSMappings[address]) {
      return knownENSMappings[address];
    }

    // Return shortened address if no ENS found
    return address.substring(0, 12);
  } catch (error) {
    console.warn('ENS resolution failed:', error);
    return address.substring(0, 12);
  }
};

// Complete ENS DAO wallet directory
const walletDirectory = [
  {
    address: '0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7',
    label: 'ENS DAO Wallet',
    category: 'dao-treasury',
    description: 'Main ENS DAO treasury wallet'
  },
  {
    address: '0xCF60916b6CB4753f58533808fA610FcbD4098Ec0',
    label: 'ENS Gnosis Safe',
    category: 'multisig',
    description: 'Primary multisig wallet'
  },
  {
    address: '0x911143d946bA5d467BfC476491fdb235fEf4D667',
    label: 'ENS Multisig',
    category: 'multisig',
    description: 'General purpose multisig'
  },
  {
    address: '0x4F2083f5fBede34C2714aFfb3105539775f7FE64',
    label: 'ENS EnDAOment',
    category: 'endaoment',
    description: 'Endowment fund wallet'
  },
  {
    address: '0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72',
    label: 'ENS Token',
    category: 'contract',
    description: 'ENS token contract'
  },
  {
    address: '0x2686A8919Df194aA7673244549E68D42C1685d03',
    label: 'ENS DAO Multisig, Eco Main',
    category: 'working-group-ecosystem',
    description: 'Ecosystem WG main multisig'
  },
  {
    address: '0x536013c57DAF01D78e8a70cAd1B1abAda9411819',
    label: 'ENS DAO Multisig, Eco IRL',
    category: 'working-group-ecosystem',
    description: 'Ecosystem WG IRL multisig'
  },
  {
    address: '0x9B9c249Be04dd433c7e8FbBF5E61E6741b89966D',
    label: 'ENS DAO Multisig, Hackathons',
    category: 'working-group-ecosystem',
    description: 'Hackathon funding multisig'
  },
  {
    address: '0x13aEe52C1C688d3554a15556c5353cb0c3696ea2',
    label: 'ENS DAO Multisig, Newsletters',
    category: 'working-group-meta',
    description: 'Newsletter and communications'
  },
  {
    address: '0x91c32893216dE3eA0a55ABb9851f581d4503d39b',
    label: 'ENS DAO Multisig, Metagov Main',
    category: 'working-group-meta',
    description: 'Meta-Governance main multisig'
  },
  {
    address: '0xB162Bf7A7fD64eF32b787719335d06B2780e31D1',
    label: 'ENS DAO Multisig, Metgov Stream',
    category: 'working-group-meta',
    description: 'Meta-Governance streaming payments'
  },
  {
    address: '0xcD42b4c4D102cc22864e3A1341Bb0529c17fD87d',
    label: 'ENS DAO Multisig, Public Goods Main',
    category: 'working-group-public',
    description: 'Public Goods main multisig'
  },
  {
    address: '0xebA76C907F02BA13064EDAD7876Fe51D9d856F62',
    label: 'ENS DAO Multisig, Public Goods Large Grants',
    category: 'working-group-public',
    description: 'Large grants multisig'
  },
  {
    address: '0xF0AD5cAd05e10572EfcEB849f6Ff0c68f9700455',
    label: 'ETHRegistrarController 1',
    category: 'registrar',
    description: 'Domain registration controller 1'
  },
  {
    address: '0xB22c1C159d12461EA124b0deb4b5b93020E6Ad16',
    label: 'ETHRegistrarController 2',
    category: 'registrar',
    description: 'Domain registration controller 2'
  },
  {
    address: '0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5',
    label: 'ETHRegistrarController 3',
    category: 'registrar',
    description: 'Domain registration controller 3'
  },
  {
    address: '0x253553366Da8546fC250F225fe3d25d0C782303b',
    label: 'ETHRegistrarController 4',
    category: 'registrar',
    description: 'Domain registration controller 4'
  }
];

const Terminal = () => {
  const [command, setCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState([
    {
      command: 'help',
      output: 'Available commands: help, clear, ls, status, time, whoami',
      type: 'info',
      timestamp: new Date()
    }
  ]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Tab completion state
  const [completionIndex, setCompletionIndex] = useState(0);
  const [currentCompletions, setCurrentCompletions] = useState([]);
  const [originalCommand, setOriginalCommand] = useState('');

  // Transaction cache state
  const [transactionCache, setTransactionCache] = useState(new Map());
  const [cacheTimestamps, setCacheTimestamps] = useState(new Map());

  // Cache management functions
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  const getCachedTransactions = (address) => {
    const cached = transactionCache.get(address);
    const timestamp = cacheTimestamps.get(address);

    if (cached && timestamp && (Date.now() - timestamp) < CACHE_DURATION) {
      return cached;
    }
    return null;
  };

  const setCachedTransactions = (address, transactions) => {
    setTransactionCache(prev => new Map(prev.set(address, transactions)));
    setCacheTimestamps(prev => new Map(prev.set(address, Date.now())));
  };

  const fetchWalletTransactions = async (walletAddress, limit = 10) => {
    console.log('Terminal: fetchWalletTransactions called with:', { walletAddress, limit });

    // Check cache first
    const cached = getCachedTransactions(walletAddress);
    if (cached) {
      console.log(`Terminal: Using cached transactions for ${walletAddress}, count: ${cached.length}`);
      return cached;
    }

    try {
      console.log(`Terminal: Fetching fresh transactions for ${walletAddress}`);
      const transactions = await transactionService.fetchRealTransactions(walletAddress, limit);
      console.log(`Terminal: Fetched ${transactions.length} transactions`);
      setCachedTransactions(walletAddress, transactions);
      return transactions;
    } catch (error) {
      console.error(`Terminal: Error fetching transactions for ${walletAddress}:`, error);
      return [];
    }
  };

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // No need for dynamic CSS injection - using static CSS file

  // Modern background animation
  useEffect(() => {
    // No matrix rain effect needed anymore - using CSS animations instead

    // Test auto-suggest on mount
    const testCompletions = getCompletions('');
  }, []);

  // Generate tab completion suggestions
  const getCompletions = (currentInput) => {

    const parts = currentInput.trim().split(/\s+/);
    const lastPart = parts[parts.length - 1] || '';

    // Available main commands
    const mainCommands = [
      'help', 'commands', 'clear', 'ls', 'status', 'time', 'date', 'history', 'uptime', 'whoami', 'exit',
      'overview', 'assets', 'analytics', 'tx', 'transactions', 'wallets', 'select', 'revenue', 'compensation',
      'governance', 'investments', 'challenges', 'summary', 'wg', 'spp', 'exportData', 'cd'
    ];

    // Date filter options
    const dateFilters = [
      'last7days', 'last30days', 'last90days', 'thisweek', 'lastweek', 'thismonth', 'lastmonth',
      'thisyear', 'lastyear', 'today', 'yesterday'
    ];

    // If no input or just whitespace, suggest main commands
    if (!currentInput.trim()) {
      return mainCommands;
    }

    // If completing the first command
    if (parts.length === 1) {
      return mainCommands.filter(cmd => cmd.startsWith(lastPart));
    }

    // If we have a space after the first command, show subcommands
    if (currentInput.endsWith(' ') && parts.length === 1) {
      const firstCommand = parts[0];
      switch (firstCommand) {
        case 'wg':
          return ['meta', 'ecosystem', 'eco', 'public', 'budgets', 'spending'];
        case 'tx':
        case 'transactions':
          return ['all', 'summary', 'last30days', 'thismonth', 'lastmonth'];
        case 'assets':
          return ['overview', 'networks', 'wg'];
        case 'wallets':
          return ['all', 'wg', 'dao', 'treasury'];
        case 'spp':
          return ['overview', 'providers', 'categories', 'updates', 'funding', 'governance',
                  'infrastructure', 'development', 'identity', 'content', 'research'];
        case 'cd':
          return ['overview', 'assets', 'analytics', 'transactions', 'wallets', 'wgs', 'working-groups', 'spp', 'service-providers'];
        default:
          return ['help', 'info', 'status'];
      }
    }

    // Get the main command
    const mainCommand = parts[0];

    // Subcommand completions based on main command
    switch (mainCommand) {
      case 'wg':
        if (parts.length === 2) {
          const wgCommands = ['meta', 'ecosystem', 'eco', 'public', 'budgets', 'spending'];
          return wgCommands.filter(cmd => cmd.startsWith(lastPart));
        }
        if (parts.length === 3 && (parts[1] === 'meta' || parts[1] === 'ecosystem' || parts[1] === 'eco' || parts[1] === 'public')) {
          const wgSubCommands = ['info', 'budget', 'funding', 'tx', 'help'];
          if (parts[1] === 'ecosystem' || parts[1] === 'eco') {
            wgSubCommands.push('grants', 'bounties');
          }
          if (parts[1] === 'public') {
            wgSubCommands.push('docs', 'documentation', 'content', 'events', 'metrics');
          }
          return wgSubCommands.filter(cmd => cmd.startsWith(lastPart));
        }
        if (parts.length === 4 && parts[2] === 'tx') {
          const txCommands = ['all', 'last30days', 'thismonth', 'lastmonth', 'thisweek', 'lastweek', ...dateFilters];
          return txCommands.filter(cmd => cmd.startsWith(lastPart));
        }
        break;

      case 'tx':
      case 'transactions':
        if (parts.length === 2) {
          const txCommands = ['all', 'summary', 'last30days', 'thismonth', 'lastmonth', 'thisweek', 'lastweek', 'today', 'yesterday', ...dateFilters];
          // Add wallet names as suggestions
          const walletNames = walletDirectory.map(wallet =>
            wallet.label.toLowerCase().replace(/\s+/g, '').replace(/[^\w]/g, '')
          );
          return [...txCommands, ...walletNames].filter(cmd => cmd.startsWith(lastPart));
        }
        // Add date filter suggestions for deeper levels
        if (parts.length >= 3) {
          return dateFilters.filter(filter => filter.startsWith(lastPart));
        }
        break;

      case 'assets':
        if (parts.length === 2) {
          const assetCommands = ['overview', 'networks', 'wg'];
          return assetCommands.filter(cmd => cmd.startsWith(lastPart));
        }
        if (parts.length === 3 && parts[1] === 'wg') {
          const wgCommands = ['wallet'];
          return wgCommands.filter(cmd => cmd.startsWith(lastPart));
        }
        if (parts.length === 4 && parts[1] === 'wg' && parts[2] === 'wallet') {
          const wgTypes = ['meta', 'ecosystem', 'eco', 'public'];
          return wgTypes.filter(cmd => cmd.startsWith(lastPart));
        }
        break;

      case 'wallets':
        if (parts.length === 2) {
          const walletCommands = ['list', 'select'];
          return walletCommands.filter(cmd => cmd.startsWith(lastPart));
        }
        if (parts.length === 3 && parts[1] === 'select') {
          // Return wallet numbers as completion options
          const walletNumbers = Array.from({length: walletDirectory.length}, (_, i) => (i + 1).toString());
          return walletNumbers.filter(num => num.startsWith(lastPart));
        }
        break;

      case 'select':
        if (parts.length === 2) {
          return ['wallet'].filter(cmd => cmd.startsWith(lastPart));
        }
        if (parts.length === 3 && parts[1] === 'wallet') {
          // Return wallet numbers as completion options
          const walletNumbers = Array.from({length: walletDirectory.length}, (_, i) => (i + 1).toString());
          return walletNumbers.filter(num => num.startsWith(lastPart));
        }
        break;

      case 'spp':
        if (parts.length === 2) {
          const sppCommands = [
            'overview', 'providers', 'categories', 'updates', 'funding', 'governance',
            'infrastructure', 'development', 'identity', 'content', 'research'
          ];
          // Add provider IDs as suggestions
          const providerIds = ['zk-email', 'eth-limo', 'ens-v3', 'ens-app', 'eth-ipfs', 'ens-domains'];
          return [...sppCommands, ...providerIds].filter(cmd => cmd.startsWith(lastPart));
        }
        break;

      case 'exportData':
        if (parts.length === 2) {
          const exportCommands = ['tx', 'transactions', 'wallets', 'assets'];
          return exportCommands.filter(cmd => cmd.startsWith(lastPart));
        }
        if (parts.length === 3 && (parts[1] === 'tx' || parts[1] === 'transactions')) {
          const txExportCommands = ['all', 'wg'];
          return txExportCommands.filter(cmd => cmd.startsWith(lastPart));
        }
        if (parts.length === 4 && (parts[1] === 'tx' || parts[1] === 'transactions') && parts[2] === 'wg') {
          const wgTypes = ['meta', 'ecosystem', 'eco', 'public'];
          return wgTypes.filter(cmd => cmd.startsWith(lastPart));
        }
        if (parts.length === 3 && parts[1] === 'wallets') {
          const walletExportCommands = ['all', 'wg'];
          return walletExportCommands.filter(cmd => cmd.startsWith(lastPart));
        }
        if (parts.length === 4 && parts[1] === 'wallets' && parts[2] === 'wg') {
          const wgTypes = ['meta', 'ecosystem', 'eco', 'public'];
          return wgTypes.filter(cmd => cmd.startsWith(lastPart));
        }
        if (parts.length === 3 && parts[1] === 'assets') {
          const assetExportCommands = ['overview', 'wg'];
          return assetExportCommands.filter(cmd => cmd.startsWith(lastPart));
        }
        if (parts.length === 4 && parts[1] === 'assets' && parts[2] === 'wg') {
          const wgTypes = ['meta', 'ecosystem', 'eco', 'public'];
          return wgTypes.filter(cmd => cmd.startsWith(lastPart));
        }
        // Add date filter suggestions for export commands
        if (parts.length >= 5) {
          return dateFilters.filter(filter => filter.startsWith(lastPart));
        }
        break;

      case 'cd':
        if (parts.length === 2) {
          const cdCommands = ['overview', 'assets', 'analytics', 'transactions', 'wallets',
                             'wgs', 'working-groups', 'spp', 'service-providers'];
          return cdCommands.filter(cmd => cmd.startsWith(lastPart));
        }
        break;

      default:
        // For any other command, suggest common subcommands and date filters
        if (parts.length === 2) {
          const commonSubCommands = ['help', 'all', 'info', 'status'];
          return [...commonSubCommands, ...dateFilters].filter(cmd => cmd.startsWith(lastPart));
        }
        // For deeper levels, suggest date filters
        if (parts.length >= 3) {
          return dateFilters.filter(filter => filter.startsWith(lastPart));
        }
        break;
    }

    return [];
  };

  const commands = {
    // Import all command modules
    ...commandModules,
    help: () => {
      let output = 'ENS DAO Treasury Analysis Terminal\n\n';
      output += 'Core Analysis Commands:\n';
      output += '  overview        Revenue generation & funding mechanisms\n';
      output += '  assets          Fund distribution & expenditures\n';
      output += '  analytics       Accounting & transparency analysis\n';
      output += '  transactions    Transaction history (transactions <address>)\n';
      output += '  tx              Transaction details (tx <address>)\n';
      output += '  wallets         Wallet selection (wallets list/select)\n';
      output += '  select          Select wallet by number (select wallet <num>)\n';
      output += '  status          Current financial infrastructure\n\n';
      output += 'Working Group Commands:\n';
      output += '  wg meta          Meta-Governance details & compensation\n';
      output += '  wg meta tx       Meta-Governance wallet transactions\n';
      output += '  wg ecosystem     Ecosystem initiatives & grants\n';
      output += '  wg eco tx        Ecosystem wallet transactions\n';
      output += '  wg public        Public goods funding & programs\n';
      output += '  wg pg tx         Public Goods wallet transactions\n';
      output += '  wg budgets       H1 2025 budget allocations\n';
      output += '  wg spending      Q1/Q2 2025 expenditure tracking\n\n';
      output += 'Service Provider Commands:\n';
      output += '  spp overview      SPP2 program overview & statistics\n';
      output += '  spp providers     List all active service providers\n';
      output += '  spp categories    Provider categories & funding\n';
      output += '  spp updates       Program updates & progress reports\n';
      output += '  spp funding       Funding infrastructure details\n';
      output += '  spp <provider>    Individual provider details\n\n';
      output += 'Financial Query Commands:\n';
      output += '  revenue          Revenue sources & collection\n';
      output += '  compensation     Steward & officer compensation\n';
      output += '  governance       ENS token distributions\n';
      output += '  investments      Treasury investment strategies\n';
      output += '  challenges       Transparency & reporting issues\n';
      output += '  summary          Complete treasury overview\n\n';
      output += 'Key Addresses & Tools:\n';
      output += '  Main Treasury: 0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7\n';
      output += '  Registrar:     0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5\n';
      output += '  ENS Labs:      coldwallet.ens.eth\n';
      output += '  Meta-Gov:      main.mg.wg.ens.eth\n';
      output += '  Treasury:      0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7\n';
      output += '  Block Explorer: etherscan.io\n\n';
      output += 'System Commands:\n';
      output += '  ls              List all sections\n';
      output += '  clear           Clear terminal screen\n';
      output += '  history         Show command history\n';
      output += '  time/date       Current time and date\n';
      output += '  exit            Exit terminal\n\n';

      return output;
    },

    clear: () => {
      setCommandHistory([]);
      return '';
    },

    ls: () => `Available sections:
  [OV] overview        Funding Mechanisms & Revenue Sources
  [AS] assets          Fund Distribution & Expenditures
  [AN] analytics       Accounting Methods & Transparency Issues
  [TX] transactions    Transaction History from All Wallets
  [WL] wallets         Working Group Multisig Wallets`,

    overview: () => `ENS DAO Funding Mechanisms Overview

Revenue Generation (Money In):
  Registration Fees: ETH for .eth domains
    3-char: $640/year, 4-char: $160/year, 5+: $5/year
    Recognized over service delivery period
  Premium Fees: Temporary auctions (21 days, $0-$100M+)
    Recognized at transaction time
  Endowment DeFi: Karpatkey-managed yield
    Recognized monthly

Revenue Inflow:
  Registrar Controller: $30K/day (~$1M/month)
  Address: 0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5
  Monthly Sweeps: Revenue transferred to timelock

Treasury Management Strategy:
  Expenditure Runway: 24 months ($16M USDC/DAI target)
  Revenue Handling: Monthly sweeps + stablecoin conversion
  Excess Funds: ETH to endowment via Karpatkey
  Risk Profile: USD-neutral, ETH-neutral

Investment Strategies:
  Element Finance: Fixed yield products (zero-coupon bonds)
  Real-World Assets: Tokenized T-bills
  Diversification: Multiple staking providers
  Risk Mitigation: Protocol insurance consideration

Fund Distribution (Money Out):
  ENS Labs: $11,500/day continuous funding
  Working Groups: Quarterly funding windows
  Compensation: Stewards ($4K/month), Secretary ($5.5K)
  Governance: ENS token distributions via Hedgey`,

    assets: () => `Fund Distribution & Expenditures

ENS Labs Funding:
  Cold Wallet: coldwallet.ens.eth
  Continuous: $11,500/day ($4.2M/month)
  Q1 2025: $2.39M received, $1.3M expenses
  Q2 2025: $4.81M received, $1.5M expenses
  Primary Use: Employee compensation & benefits

Working Group Budgets (H1 2025):
  Meta-Governance: $544K + 5 ETH
    Steward Comp: $294K, DAO Tooling: $150K, Audits: $60K
    Q1: $210K spent, Q2: $217K spent

  Ecosystem: $832K + 10 ETH
    Hackathons: $300K, Grants: $232K, Bug Bounties: $100K
    Q1: $269K spent, Q2: $194K + 5 ETH spent

  Public Goods: $343K + 23 ETH
    Builder Grants: $80K + 23 ETH, Strategic: $160K
    Q1: $111K + 14.9 ETH spent, Q2: $264K spent

Compensation Structure:
  Stewards (9 total): $4K/month each ($36K/month)
  DAO Secretary: $5.5K/month
  Scribe: $3K/month
  ENS Tokens: 10K per steward term (2-year vesting)

Governance Distributions:
  Via Hedgey.finance: Immediate voting + 2-year vesting
  Q1 2025: 24,965 ENS distributed (EP 5.26)
  Ecosystem Grants: 250 ENS (Q1), 3,200 ENS (Q2)
  Meta-Gov Multisig: 164K ENS for distribution

Other Expenses:
  DAO Tooling: Agora ($50K), Contract Audits
  Event Sponsorships, Legal/Compliance, Marketing
  Bug Bounty Programs, IT & Software Hosting`,

    analytics: () => `Accounting & Transparency Analysis

Accounting Methods:
  Accrual Basis: Revenue recognized over service period
  Registration Fees: Recognized over domain lifetime
  Premium Fees: Recognized at transaction time
  Endowment Yield: Recognized monthly

Transparency Challenges:
  Fragmented Reporting: 6+ different sources
    Steakhouse, Karpatkey, ENS Ledger
    Money Flow Visualization, ENS Wallets, SafeNotes
  RFP Needed: Comprehensive financial dashboard

Working Group Efficiency:
  Unspent Balances: Significant funds held in wallets
  Redundant Requests: Groups request despite available funds
  Audit Planning: Difficulty predicting contract audit costs

Compensation Analysis:
  Secretary Debate: $5.5K/month vs perceived value
  Steward Structure: $4K/month + 10K ENS (2-year vesting)
  DAO as Public Good: Non-profit vs enterprise perspective

Budget vs Actual Analysis (H1 2025):
  Meta-Governance: $544K budget, $427K spent (78%)
  Ecosystem: $832K budget, $463K spent (56%)
  Public Goods: $343K budget, $375K spent (109%)

ENS Labs Financial Flow:
  Revenue: $11,500/day continuous stream
  Expenses: Primarily employee compensation & benefits
  Q1: $2.4M in, $1.3M out (54% utilization)
  Q2: $4.8M in, $1.5M out (31% utilization)

Governance Incentives:
  ENS Distributions: Immediate voting power + vesting
  Hedgey Contracts: 2-year vesting period
  Grant Recipients: ENS tokens for ecosystem participation`,

    transactions: async (args) => {
      const walletAddress = args[0] || walletDirectory[0].address; // Default to first wallet in directory

      try {
        const transactions = await transactionService.fetchRealTransactions(walletAddress, 15);

        let output = `Transaction History\nRecent Transactions for ${walletAddress}\n\n`;

        if (transactions.length === 0) {
          output += 'No transactions found.\n';
          output += 'Note: This wallet may not have recent activity or API key may not be configured.\n';
          return output;
        }

      // Transaction rows
      transactions.forEach((tx, index) => {
        const num = String(index + 1);
        const hash = tx.hash.substring(0, 10);
        const addrLabel = tx.type === 'OUTBOUND' ? 'To:' : 'From:';
          const addrClass = tx.type === 'OUTBOUND' ? 'tx-direction-to' : 'tx-direction-from';
          const addr = (tx.type === 'OUTBOUND' ? tx.to : tx.from).substring(0, 42);

          // Format timestamp
          const timeAgo = tx.timestamp ? new Date(tx.timestamp).toLocaleString() : 'Unknown';

          output += `${num}. <span class="tx-hash">${hash}</span> - <span class="tx-wallet">${tx.wallet || 'ENS DAO Treasury'}</span>\n`;
          output += `   <span class="${addrClass}">${addrLabel}</span> <span class="tx-address">${addr}</span>\n`;
          output += `   <span class="tx-label">Value:</span> <span class="tx-value">${tx.value || '0'} wei</span>\n`;
          output += `   <span class="tx-label">Type:</span> <span class="tx-type">${tx.type || 'UNKNOWN'}</span>\n`;
          output += `   <span class="tx-label">Time:</span> <span class="tx-time">${timeAgo}</span>\n`;
          output += `   <span class="tx-label">Status:</span> <span class="tx-status">${tx.status || 'PENDING'}</span>\n\n`;
      });

      // Summary
      output += 'Transaction Summary:\n';
        output += `  Total Transactions: ${transactions.length} (shown)\n`;
        output += `  Wallet Address: ${walletAddress}\n`;
        output += `  Data Source: ${ETHERSCAN_API_KEY ? 'Etherscan API' : 'No API Key'}\n`;
        output += `  Last Updated: ${new Date().toLocaleString()}\n\n`;

        if (!ETHERSCAN_API_KEY) {
          output += 'Note: No API key configured. Add VITE_ETHERSCAN_API_KEY to .env for real data.\n';
        }

      return output;
      } catch (error) {
        console.error('Error fetching transactions:', error);
        return 'Error fetching transactions. Please check your wallet address and API configuration.\n';
      }
    },

    wallets: async (args) => {
      const subCommand = args[0];

      if (!subCommand) {
        return `ENS DAO Wallet Directory

Available Commands:
  wallets list          Show all wallets with numbers
  wallets select <num>  Select wallet by number to view transactions
  wallets <number>      Quick select and view transactions

Total Wallets: ${walletDirectory.length}

Use 'wallets list' to see all available wallets.`;
      }

      if (subCommand === 'list') {
        let output = `<div class="output-container">
  <header class="section-header">ENS DAO Wallet Directory</header>
  <div class="section-border">═══════════════════════════════════════════════════════════════</div>
  <p class="section-subtitle">Select a wallet by number to view its transactions:</p>

  <table class="wallet-table" role="table" aria-label="ENS DAO Wallet Directory">
    <thead>
      <tr>
        <th scope="col" class="table-header table-header-index">#</th>
        <th scope="col" class="table-header table-header-name">Wallet Name</th>
        <th scope="col" class="table-header table-header-address">Address</th>
        <th scope="col" class="table-header table-header-category">Category</th>
        <th scope="col" class="table-header table-header-description">Description</th>
      </tr>
    </thead>
    <tbody>`;

        walletDirectory.forEach((wallet, index) => {
          const num = String(index + 1).padStart(2, ' ');
          const type = wallet.category.split('-')[1] || wallet.category;
          output += `<tr class="wallet-row" role="row">
        <td class="table-cell table-cell-index" role="gridcell">
          <span class="text">${num}.</span>
        </td>
        <td class="table-cell table-cell-name" role="gridcell">
          <span class="text">${wallet.label}</span>
        </td>
        <td class="table-cell table-cell-address" role="gridcell">
          <span class="text">${wallet.address}</span>
        </td>
        <td class="table-cell table-cell-category" role="gridcell">
          <span class="text">${type}</span>
        </td>
        <td class="table-cell table-cell-description" role="gridcell">
          <span class="text">${wallet.description}</span>
        </td>
      </tr>`;
        });

        output += `    </tbody>
  </table>
</div>`;

        output += `<section class="usage-section">
  <h3 class="section-subtitle">Usage:</h3>
  <div class="command-list">
    <div class="command-item">
      <code class="command-name">wallets select</code> <var class="command-example">&lt;number&gt;</var> <span class="command-description">Select and view transactions</span>
    </div>
    <div class="command-item">
      <code class="command-name">wallets</code> <var class="command-example">&lt;number&gt;</var> <span class="command-description">Quick select and view</span>
    </div>
    <div class="command-item">
      <code class="command-name">select wallet</code> <var class="command-example">&lt;number&gt;</var> <span class="command-description">Alternative selection method</span>
    </div>
  </div>
  <p class="summary-info">
    <span class="summary-label">Total:</span> <span class="summary-total">${walletDirectory.length}</span> <span class="summary-label">wallets available</span>
  </p>
</section>`;

        return output;
      }

      if (subCommand === 'select' || /^\d+$/.test(subCommand)) {
        const walletIndex = subCommand === 'select' ? parseInt(args[1]) - 1 : parseInt(subCommand) - 1;

        if (isNaN(walletIndex) || walletIndex < 0 || walletIndex >= walletDirectory.length) {
          return `Invalid wallet number. Use 'wallets list' to see available wallets (1-${walletDirectory.length}).`;
        }

        const selectedWallet = walletDirectory[walletIndex];

        try {
          const transactions = await fetchWalletTransactions(selectedWallet.address, 15);

          let output = `<div class="output-container">
  <header class="section-header">${selectedWallet.label} Transactions</header>
  <div class="section-border">═══════════════════════════════════════════════════════════════</div>

  <table class="wallet-table" role="table" aria-label="Selected Wallet Information">
    <thead>
      <tr>
        <th scope="col" class="table-header table-header-name">Wallet Name</th>
        <th scope="col" class="table-header table-header-address">Address</th>
        <th scope="col" class="table-header table-header-category">Category</th>
        <th scope="col" class="table-header table-header-description">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr class="wallet-row" role="row">
        <td class="table-cell table-cell-name" role="gridcell">
          <span class="text">${selectedWallet.label}</span>
        </td>
        <td class="table-cell table-cell-address" role="gridcell">
          <span class="text">${selectedWallet.address}</span>
        </td>
        <td class="table-cell table-cell-category" role="gridcell">
          <span class="text">${selectedWallet.category}</span>
        </td>
        <td class="table-cell table-cell-description" role="gridcell">
          <span class="text">${selectedWallet.description}</span>
        </td>
      </tr>
    </tbody>
  </table>

</div>`;

          if (transactions.length === 0) {
            output += `<span class="status-warning">No recent transactions found for this wallet.</span>\n`;
          } else {
            output += `<h3 class="section-subtitle">Recent Transactions</h3>\n`;

            output += `<table class="transaction-table" role="table" aria-label="Recent Wallet Transactions">
  <thead>
    <tr>
      <th scope="col" class="table-header table-header-index">#</th>
      <th scope="col" class="table-header table-header-hash">Transaction Hash</th>
      <th scope="col" class="table-header table-header-to">To Address</th>
      <th scope="col" class="table-header table-header-type">Type</th>
      <th scope="col" class="table-header table-header-value">Value</th>
      <th scope="col" class="table-header table-header-date">Date</th>
    </tr>
  </thead>
  <tbody>`;

            // Process transactions with ENS resolution
            const transactionRows = await Promise.all(transactions.map(async (tx, index) => {
              const num = index + 1;
              const hash = tx.hash.substring(0, 12);
              const toAddr = tx.to ? await resolveENSName(tx.to) : 'Unknown';
              const type = tx.type || 'UNKNOWN';
              const timeAgo = tx.timestamp ? new Date(tx.timestamp).toLocaleDateString() : 'Unknown';
              const value = tx.value ? `${(parseInt(tx.value) / 1e18).toFixed(4)} ETH` : 'N/A';

              return `<tr class="transaction-row" role="row">
      <td class="table-cell table-cell-index" role="gridcell">
        <span class="text">${num}</span>
      </td>
      <td class="table-cell table-cell-hash" role="gridcell">
        <span class="text">${hash}</span>
      </td>
      <td class="table-cell table-cell-to" role="gridcell">
        <span class="text">${toAddr}</span>
      </td>
      <td class="table-cell table-cell-type" role="gridcell">
        <span class="text">${type}</span>
      </td>
      <td class="table-cell table-cell-value" role="gridcell">
        <span class="text">${value}</span>
      </td>
      <td class="table-cell table-cell-date" role="gridcell">
        <span class="text">${timeAgo}</span>
      </td>
    </tr>`;
            }));

            // Add all rows to output
            output += transactionRows.join('');

            output += `  </tbody>
</table>
`;
          }

          output += `<span class="section-subtitle">Summary:</span>\n`;
          output += `<span class="section-border">────────</span>\n`;
          output += `<span class="summary-label">Total Transactions:</span> <span class="summary-total">${transactions.length}</span> <span class="summary-label">(showing last 15)</span>\n`;
          output += `<span class="summary-label">Data Source:</span> <span class="status-${ETHERSCAN_API_KEY ? 'success' : 'warning'}">${ETHERSCAN_API_KEY ? 'Etherscan API' : 'Demo Mode'}</span>\n`;
          output += `<span class="summary-label">Cache Status:</span> <span class="status-${getCachedTransactions(selectedWallet.address) ? 'info' : 'success'}">${getCachedTransactions(selectedWallet.address) ? 'Cached' : 'Fresh'}</span>\n`;

          if (!ETHERSCAN_API_KEY) {
            output += `\n<span class="status-info">Note:</span> <span class="command-description">Configure VITE_ETHERSCAN_API_KEY in .env for real blockchain data.</span>\n`;
          }

          return output;
        } catch (error) {
          console.error('Error fetching wallet transactions:', error);
          return `Error fetching transactions for wallet ${selectedWallet.label}. Please check your API configuration.\n`;
        }
      }

      return `Unknown wallets command: ${subCommand}. Use 'wallets list' to see options.`;
    },

    select: async (args) => {
      const subCommand = args[0];

      if (!subCommand || subCommand === 'wallet') {
        let output = `<div class="output-container">
  <header class="section-header">Wallet Selection</header>
  <div class="section-border">═══════════════════════════════════════════════════════════════</div>
  <p class="section-subtitle">Choose a wallet by number to view its transactions:</p>

  <table class="wallet-table" role="table" aria-label="ENS DAO Wallet Selection">
    <thead>
      <tr>
        <th scope="col" class="table-header table-header-index">#</th>
        <th scope="col" class="table-header table-header-name">Wallet Name</th>
        <th scope="col" class="table-header table-header-address">Address</th>
        <th scope="col" class="table-header table-header-category">Category</th>
        <th scope="col" class="table-header table-header-description">Description</th>
      </tr>
    </thead>
    <tbody>`;

        walletDirectory.forEach((wallet, index) => {
          const num = String(index + 1).padStart(2, ' ');
          const type = wallet.category.split('-')[1] || wallet.category;
          output += `<tr class="wallet-row" role="row">
        <td class="table-cell table-cell-index" role="gridcell">
          <span class="text">${num}.</span>
        </td>
        <td class="table-cell table-cell-name" role="gridcell">
          <span class="text">${wallet.label}</span>
        </td>
        <td class="table-cell table-cell-address" role="gridcell">
          <span class="text">${wallet.address}</span>
        </td>
        <td class="table-cell table-cell-category" role="gridcell">
          <span class="text">${type}</span>
        </td>
        <td class="table-cell table-cell-description" role="gridcell">
          <span class="text">${wallet.description}</span>
        </td>
      </tr>`;
        });

        output += `    </tbody>
  </table>
</div>`;

        output += `<section class="usage-section">
  <h3 class="section-subtitle">Usage:</h3>
  <div class="command-list">
    <div class="command-item">
      <code class="command-name">select wallet</code> <var class="command-example">&lt;number&gt;</var> <span class="command-description">Select and view transactions</span>
    </div>
    <div class="command-example">Example: select wallet 1</div>
  </div>
  <p class="summary-info">
    <span class="summary-label">Total:</span> <span class="summary-total">${walletDirectory.length}</span> <span class="summary-label">wallets available</span>
  </p>
</section>`;

        return output;
      }

      if (subCommand === 'wallet' && args[1]) {
        const walletIndex = parseInt(args[1]) - 1;

        if (isNaN(walletIndex) || walletIndex < 0 || walletIndex >= walletDirectory.length) {
          return `Invalid wallet number. Please select 1-${walletDirectory.length}.`;
        }

        const selectedWallet = walletDirectory[walletIndex];

        try {
          const transactions = await fetchWalletTransactions(selectedWallet.address, 15);

          let output = `<div class="output-container">
  <header class="section-header">${selectedWallet.label} Transactions</header>
  <div class="section-border">═══════════════════════════════════════════════════════════════</div>

  <table class="wallet-table" role="table" aria-label="Selected Wallet Information">
    <thead>
      <tr>
        <th scope="col" class="table-header table-header-name">Wallet Name</th>
        <th scope="col" class="table-header table-header-address">Address</th>
        <th scope="col" class="table-header table-header-category">Category</th>
        <th scope="col" class="table-header table-header-description">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr class="wallet-row" role="row">
        <td class="table-cell table-cell-name" role="gridcell">
          <span class="text">${selectedWallet.label}</span>
        </td>
        <td class="table-cell table-cell-address" role="gridcell">
          <span class="text">${selectedWallet.address}</span>
        </td>
        <td class="table-cell table-cell-category" role="gridcell">
          <span class="text">${selectedWallet.category}</span>
        </td>
        <td class="table-cell table-cell-description" role="gridcell">
          <span class="text">${selectedWallet.description}</span>
        </td>
      </tr>
    </tbody>
  </table>

</div>`;

          if (transactions.length === 0) {
            output += `<span class="status-warning">No recent transactions found for this wallet.</span>\n`;
          } else {
            output += `<h3 class="section-subtitle">Recent Transactions</h3>\n`;

            output += `<table class="transaction-table" role="table" aria-label="Recent Wallet Transactions">
  <thead>
    <tr>
      <th scope="col" class="table-header table-header-index">#</th>
      <th scope="col" class="table-header table-header-hash">Transaction Hash</th>
      <th scope="col" class="table-header table-header-to">To Address</th>
      <th scope="col" class="table-header table-header-type">Type</th>
      <th scope="col" class="table-header table-header-value">Value</th>
      <th scope="col" class="table-header table-header-date">Date</th>
    </tr>
  </thead>
  <tbody>`;

            // Process transactions with ENS resolution
            const transactionRows = await Promise.all(transactions.map(async (tx, index) => {
              const num = index + 1;
              const hash = tx.hash.substring(0, 12);
              const toAddr = tx.to ? await resolveENSName(tx.to) : 'Unknown';
              const type = tx.type || 'UNKNOWN';
              const timeAgo = tx.timestamp ? new Date(tx.timestamp).toLocaleDateString() : 'Unknown';
              const value = tx.value ? `${(parseInt(tx.value) / 1e18).toFixed(4)} ETH` : 'N/A';

              return `<tr class="transaction-row" role="row">
      <td class="table-cell table-cell-index" role="gridcell">
        <span class="text">${num}</span>
      </td>
      <td class="table-cell table-cell-hash" role="gridcell">
        <span class="text">${hash}</span>
      </td>
      <td class="table-cell table-cell-to" role="gridcell">
        <span class="text">${toAddr}</span>
      </td>
      <td class="table-cell table-cell-type" role="gridcell">
        <span class="text">${type}</span>
      </td>
      <td class="table-cell table-cell-value" role="gridcell">
        <span class="text">${value}</span>
      </td>
      <td class="table-cell table-cell-date" role="gridcell">
        <span class="text">${timeAgo}</span>
      </td>
    </tr>`;
            }));

            // Add all rows to output
            output += transactionRows.join('');

            output += `  </tbody>
</table>
`;
          }

          output += `<span class="section-subtitle">Summary:</span>\n`;
          output += `<span class="section-border">────────</span>\n`;
          output += `<span class="summary-label">Total Transactions:</span> <span class="summary-total">${transactions.length}</span> <span class="summary-label">(showing last 15)</span>\n`;
          output += `<span class="summary-label">Data Source:</span> <span class="status-${ETHERSCAN_API_KEY ? 'success' : 'warning'}">${ETHERSCAN_API_KEY ? 'Etherscan API' : 'Demo Mode'}</span>\n`;
          output += `<span class="summary-label">Cache Status:</span> <span class="status-${getCachedTransactions(selectedWallet.address) ? 'info' : 'success'}">${getCachedTransactions(selectedWallet.address) ? 'Cached' : 'Fresh'}</span>\n`;

          if (!ETHERSCAN_API_KEY) {
            output += `\n<span class="status-info">Note:</span> <span class="command-description">Configure VITE_ETHERSCAN_API_KEY in .env for real blockchain data.</span>\n`;
          }

          return output;
        } catch (error) {
          console.error('Error fetching wallet transactions:', error);
          return `Error fetching transactions for wallet ${selectedWallet.label}. Please check your API configuration.\n`;
        }
      }

      return `Unknown select command. Use 'select wallet <number>' to choose a wallet.`;
    },

    cd: (args) => {
      const section = args[0];
      const validSections = ['overview', 'assets', 'analytics', 'transactions', 'wallets'];

      if (!section) {
        return 'Usage: cd <section>\nAvailable sections: overview, assets, analytics, transactions, wallets';
      }

      if (validSections.includes(section)) {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
        return `Navigated to ${section} section`;
      } else {
        return `cd: ${section}: No such section\nAvailable sections: ${validSections.join(', ')}`;
      }
    },

    status: () => `ENS DAO Financial Infrastructure

Primary Treasury Wallets:
  Main Wallet/Timelock: 0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7
    3,320.41 ETH ($14.46M), 9.7M ENS ($224.62M)
    7.4M USDC ($7.42M), Total: $246.5M
  Governor Contract: Controls timelock operations

Working Group Multisigs:
  Meta-Governance: main.mg.wg.ens.eth
    83.627 ETH, 240,738 USDC, 164K ENS
  Ecosystem: 600K+ unspent balances
  Public Goods Main: 157.5K USDC, 39.5 ETH, 200 ENS
  Public Goods Large: 187K USDC
  3/4 Signatures Required: Stewards + DAO Secretary

Revenue Collection:
  Registrar Controller: 0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5
    $30K/day inflow (~$1M/month)
    Collects .eth registration/renewal fees
  Monthly Sweeps: Revenue transferred to timelock

ENS Labs Funding:
  Cold Wallet: coldwallet.ens.eth
  Continuous Stream: $11,500/day
  Q1 2025: $2.39M received, $1.3M expenses
  Q2 2025: $4.81M received, $1.5M expenses

Endowment Management:
  Fund Manager: Karpatkey
  Investment Strategies: Element Finance, RWA
  Excess Revenue: ETH transferred to endowment
  Risk Mitigation: Diversified staking providers

Additional Wallets:
  ENS Cold Wallet: 0x690F0581eCecCf8389c223170778cD9D029606F2
    ETH, ENS, USDC, DAI holdings
  Working Group Multisigs: Multi-signature enabled`,

    time: () => `Current Time: ${currentTime.toLocaleTimeString('en-US', { hour12: false })}`,
    whoami: () => 'ens-admin@terminal (ENS DAO Treasury Administrator)',
    date: () => `Current Date: ${currentTime.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}`,

    history: () => commandHistory.map((entry, index) =>
      `${String(index + 1).padStart(3)}  ${entry.timestamp.toLocaleTimeString('en-US', { hour12: false })}  ${entry.command}`
    ).join('\n') || 'No commands in history',

    uptime: () => {
      const uptime = Math.floor((Date.now() - Date.now()) / 1000);
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      return `System uptime: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
    },

    // Working Group Commands
    wg: async (args) => {
      const subCommand = args[0];
      const action = args[1];

      if (!subCommand) {
        return `┌─ WORKING GROUP COMMANDS ──────────────────────────────┐
│                                                              │
│ Available working group commands:                           │
│ • wg meta          Meta-Governance details                  │
│ • wg meta tx       Meta-Governance transactions             │
│ • wg ecosystem     Ecosystem initiatives                    │
│ • wg eco tx        Ecosystem transactions                   │
│ • wg public        Public goods programs                    │
│ • wg pg tx         Public Goods transactions                │
│ • wg budgets       H1 2025 budget allocations               │
│ • wg spending      Q1/Q2 2025 expenditure tracking          │
│                                                              │
└──────────────────────────────────────────────────────────────┘`;
      }

      // Handle transaction commands for working groups
      if (action === 'tx') {
        const wgMappings = {
          'meta': '0x91c32893216dE3eA0a55ABb9851f581d4503d39b',
          'pg': '0xcD42b4c4D102cc22864e3A1341Bb0529c17fD87d',
          'public': '0xcD42b4c4D102cc22864e3A1341Bb0529c17fD87d',
          'eco': '0x2686A8919Df194aA7673244549E68D42C1685d03',
          'ecosystem': '0x2686A8919Df194aA7673244549E68D42C1685d03'
        };

        const walletAddress = wgMappings[subCommand];
        if (!walletAddress) {
          return `Unknown working group: ${subCommand}. Use: meta, pg/public, eco/ecosystem`;
        }

        try {
          const transactions = await transactionService.fetchRealTransactions(walletAddress, 10);
          const wgName = subCommand === 'meta' ? 'Meta-Governance' :
                        subCommand === 'pg' || subCommand === 'public' ? 'Public Goods' : 'Ecosystem';

          let output = `┌─ ${wgName.toUpperCase()} WG TRANSACTIONS ──────────────────┐\n`;
          output += `│ Wallet: ${walletAddress} │\n`;
          output += `│                                                              │\n`;

          if (transactions.length === 0) {
            output += `│ No recent transactions found.                               │\n`;
          } else {
            transactions.forEach((tx, index) => {
              const hash = tx.hash.substring(0, 10);
              const type = tx.type === 'OUTBOUND' ? 'OUT' : 'IN';
              const timeAgo = tx.timestamp ? new Date(tx.timestamp).toLocaleDateString() : 'Unknown';

              output += `│ ${String(index + 1).padStart(2)} │ ${hash} │ ${type.padEnd(3)} │ ${timeAgo.padEnd(12)} │\n`;
            });
          }

          output += `│                                                              │\n`;
          output += `│ Data Source: ${ETHERSCAN_API_KEY ? 'Etherscan API' : 'No API Key'} │\n`;
          output += `└──────────────────────────────────────────────────────────────┘\n`;

          if (!ETHERSCAN_API_KEY) {
            output += '\nNote: Configure VITE_ETHERSCAN_API_KEY in .env for real data.\n';
          }

          return output;
        } catch (error) {
          console.error(`Error fetching ${subCommand} WG transactions:`, error);
          return `Error fetching ${subCommand} working group transactions. Please check your API configuration.\n`;
        }
      }

      if (subCommand === 'meta') {
        if (action) {
          return `Unknown meta command: ${action}. Use: wg meta or wg meta tx`;
        }
        return `┌─ META-GOVERNANCE WORKING GROUP ──────────────────────┐
│                                                                │
│ MULTISIG ADDRESS: main.mg.wg.ens.eth                         │
│ • Holdings: 83.627 ETH, 240,738 USDC, 164K ENS             │
│                                                                │
│ RESPONSIBILITIES:                                             │
│ • Steward compensation management                             │
│ • DAO tooling and infrastructure                              │
│ • Contract audits and security                                │
│ • Governance token distributions                              │
│                                                                │
│ H1 2025 BUDGET: $544K + 5 ETH                                │
│ • Steward Compensation: $294K (9 stewards × $4K/month)       │
│ • DAO Tooling: $150K (Agora: $50K)                           │
│ • Contract Audits: $60K                                       │
│ • Discretionary Funds: $40K                                   │
│                                                                │
│ Q1 2025 EXPENSES: $210K                                      │
│ Q2 2025 EXPENSES: $217K                                      │
│                                                                │
│ GOVERNANCE DISTRIBUTIONS:                                    │
│ • Q1 2025: 24,965 ENS via Hedgey (EP 5.26)                   │
│ • Q2 2025: Additional distributions                          │
│                                                                │
└────────────────────────────────────────────────────────────────┘`;
      }

      if (subCommand === 'ecosystem' || subCommand === 'eco') {
        if (action) {
          if (action !== 'tx') {
            return `Unknown ${subCommand} command: ${action}. Use: wg ${subCommand} or wg ${subCommand} tx`;
          }
          // tx command already handled above
        } else {
        return `┌─ ECOSYSTEM WORKING GROUP ───────────────────────────┐
│                                                                │
│ FOCUS AREAS:                                                  │
│ • Hackathons and developer events                             │
│ • Grant programs for ecosystem projects                       │
│ • Bug bounty programs                                         │
│ • Audit support for ecosystem tools                           │
│                                                                │
│ H1 2025 BUDGET: $832K + 10 ETH                               │
│ • Hackathons: $300K                                           │
│ • Grants: $232K (including 10 ETH)                            │
│ • Bug Bounties: $100K                                         │
│ • Audit Support: $100K                                        │
│ • Other Initiatives: $100K                                    │
│                                                                │
│ Q1 2025 EXPENSES: $269K                                       │
│ Q2 2025 EXPENSES: $194K + 5 ETH                              │
│                                                                │
│ GRANTS DISTRIBUTED:                                           │
│ • Q1 2025: 250 ENS to Term 5 grant recipients                 │
│ • Q2 2025: 3,200 ENS to Term 6 grant recipients               │
│                                                                │
│ NOTE: Group held 600K+ unspent when requesting 400K          │
│                                                                │
└────────────────────────────────────────────────────────────────┘`;
        }
      }

      if (subCommand === 'public' || subCommand === 'pg') {
        if (action) {
          if (action !== 'tx') {
            return `Unknown ${subCommand} command: ${action}. Use: wg ${subCommand} or wg ${subCommand} tx`;
          }
          // tx command already handled above
        } else {
        return `┌─ PUBLIC GOODS WORKING GROUP ────────────────────────┐
│                                                                │
│ MULTISIG WALLETS:                                             │
│ • Main Multisig: 157.5K USDC, 39.5 ETH, 200 ENS              │
│ • Large Grants Multisig: 187K USDC                            │
│                                                                │
│ PROGRAM AREAS:                                                │
│ • Builder Grants: Funding for ecosystem builders              │
│ • Giveth Round Partnership: Community funding rounds          │
│ • Strategic Grants: High-impact public goods projects         │
│ • Event Support: Community events and conferences             │
│                                                                │
│ H1 2025 BUDGET: $343K + 23 ETH                               │
│ • Builder Grants: $80K + 23 ETH                               │
│ • Giveth Partnership: $50K                                    │
│ • Strategic Grants: $160K                                     │
│ • Event Support: $22K                                         │
│ • Discretionary: $31K                                         │
│                                                                │
│ Q1 2025 EXPENSES: $111K + 14.9 ETH                           │
│ Q2 2025 EXPENSES: $264K                                       │
│                                                                │
└────────────────────────────────────────────────────────────────┘`;
        }
      }

      if (subCommand === 'budgets') {
        return `┌─ WORKING GROUP BUDGETS H1 2025 ───────────────────┐
│                                                                │
│ META-GOVERNANCE: $544K + 5 ETH                               │
│ • Steward Compensation: $294K (54%)                          │
│ • DAO Tooling: $150K (28%) - Agora $50K                       │
│ • Contract Audits: $60K (11%)                                 │
│ • Discretionary Funds: $40K (7%)                              │
│                                                                │
│ ECOSYSTEM: $832K + 10 ETH                                     │
│ • Hackathons: $300K (36%)                                     │
│ • Grants: $232K (28%) - Includes 10 ETH                       │
│ • Bug Bounties: $100K (12%)                                   │
│ • Audit Support: $100K (12%)                                  │
│ • Other Initiatives: $100K (12%)                              │
│                                                                │
│ PUBLIC GOODS: $343K + 23 ETH                                  │
│ • Builder Grants: $80K + 23 ETH (23%)                         │
│ • Giveth Partnership: $50K (15%)                              │
│ • Strategic Grants: $160K (47%)                               │
│ • Event Support: $22K (6%)                                    │
│ • Discretionary: $31K (9%)                                    │
│                                                                │
│ TOTAL BUDGET: $1.72M + 38 ETH                                 │
│                                                                │
└────────────────────────────────────────────────────────────────┘`;
      }

      if (subCommand === 'spending') {
        return `┌─ WORKING GROUP EXPENSES Q1/Q2 2025 ───────────────┐
│                                                                │
│ Q1 2025 TOTAL: $590K                                          │
│ • Meta-Governance: $210K (36%)                               │
│ • Ecosystem: $269K (46%)                                      │
│ • Public Goods: $111K (19%)                                   │
│                                                                │
│ Q2 2025 TOTAL: $675K                                          │
│ • Meta-Governance: $217K (32%)                               │
│ • Ecosystem: $194K (29%)                                      │
│ • Public Goods: $264K (39%)                                   │
│                                                                │
│ H1 2025 TOTAL SPENT: $1.27M (74% of budget)                   │
│                                                                │
│ ENS LABS FUNDING:                                             │
│ • Q1 2025: $2.39M received, $1.3M spent                      │
│ • Q2 2025: $4.81M received, $1.5M spent                      │
│                                                                │
│ GOVERNANCE DISTRIBUTIONS:                                     │
│ • Q1 2025: 25,215 ENS total (24,965 + 250)                   │
│ • Q2 2025: 3,200 ENS (Ecosystem grants)                       │
│ • Recovery: 589 ENS (accidentally sent tokens)                │
│                                                                │
└────────────────────────────────────────────────────────────────┘`;
      }

      return `Unknown working group command: ${subCommand}`;
    },

    // Financial Query Commands
    revenue: () => `┌─ REVENUE GENERATION & COLLECTION ───────────────────┐
│                                                                │
│ PRIMARY REVENUE SOURCES:                                      │
│ • Registration Fees: ETH for .eth domains                     │
│   - 3-char: $640/year, 4-char: $160/year, 5+: $5/year         │
│   - Accrual basis: Recognized over service period             │
│                                                                │
│ • Premium Fees: Temporary auctions (21 days)                  │
│   - High starting prices ($100M+), decrease to $0             │
│   - Recognized at transaction time                            │
│                                                                │
│ • Endowment DeFi Results: Karpatkey-managed yield             │
│   - Monthly recognition basis                                  │
│                                                                │
│ REVENUE INFLOW MECHANISM:                                     │
│ • Registrar Controller: 0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5 │
│   - $30K/day average inflow (~$1M/month)                       │
│   - Collects all .eth registration/renewal fees                │
│                                                                │
│ • Monthly Revenue Sweeps:                                      │
│   - Funds transferred to DAO timelock                          │
│   - Portion converted to stablecoins (USDC/DAI)                │
│   - Excess ETH sent to endowment fund                          │
│                                                                │
│ HISTORICAL SCALE:                                              │
│ • Monthly Revenue: ~$1M from domain registrations             │
│ • Annual Revenue: ~$12M from ENS ecosystem                    │
│ • Growth Driver: Increasing domain registrations               │
│                                                                │
└────────────────────────────────────────────────────────────────┘`,

    compensation: () => `┌─ COMPENSATION STRUCTURE ──────────────────────────┐
│                                                                │
│ STEWARD COMPENSATION:                                         │
│ • Monthly Rate: $4,000 USDC per steward                       │
│ • Total Stewards: 9 across all working groups                 │
│ • Monthly Total: $36,000 for steward compensation             │
│                                                                │
│ ENS TOKEN ALLOCATIONS:                                        │
│ • Historical: 10,000 ENS per steward term                     │
│ • Vesting: 2-year vesting period                              │
│ • Purpose: Long-term alignment and commitment                 │
│                                                                │
│ DAO OFFICERS:                                                 │
│ • DAO Secretary: $5,500 USDC per month                        │
│   - Manages working group coordination                        │
│   - Oversees proposal processes                               │
│                                                                │
│ • Scribe: $3,000 USDC per month                               │
│   - Documentation and record keeping                          │
│   - Historical DAO operations                                 │
│                                                                │
│ COMPENSATION MANAGEMENT:                                      │
│ • Responsible Party: Meta-Governance Working Group           │
│ • Funding Source: Main DAO treasury                           │
│ • Distribution: Monthly USDC payments                         │
│                                                                │
│ DEBATES & CONSIDERATIONS:                                     │
│ • Secretary Compensation: Ongoing discussion about value      │
│ • Market Alignment: Comparison with similar roles             │
│ • DAO as Public Good: Non-profit compensation philosophy      │
│                                                                │
└────────────────────────────────────────────────────────────────┘`,

    governance: () => `┌─ GOVERNANCE TOKEN DISTRIBUTIONS ───────────────────┐
│                                                                │
│ DISTRIBUTION MECHANISM:                                       │
│ • Via Hedgey.finance: Smart contract vesting                   │
│ • Immediate Voting Power: Tokens available immediately         │
│ • 2-Year Vesting Period: Gradual token release                │
│ • Purpose: Long-term ecosystem alignment                      │
│                                                                │
│ Q1 2025 DISTRIBUTIONS:                                        │
│ • Meta-Governance: 24,965 ENS (EP 5.26)                      │
│ • Ecosystem Grants: 250 ENS (Term 5 recipients)              │
│ • Total Q1: 25,215 ENS distributed                            │
│                                                                │
│ Q2 2025 DISTRIBUTIONS:                                        │
│ • Ecosystem Grants: 3,200 ENS (Term 6 recipients)             │
│ • Additional Programs: Ongoing distributions                  │
│                                                                │
│ SPECIAL DISTRIBUTIONS:                                        │
│ • Token Recovery: 589 ENS restored to users                   │
│ • Accident Resolution: Tokens accidentally sent to contracts  │
│                                                                │
│ ENS HOLDINGS IN MULTISIGS:                                    │
│ • Meta-Governance: 164K ENS earmarked for distribution        │
│ • Public Goods Main: 200 ENS                                  │
│ • Ecosystem: Additional grant pools                           │
│                                                                │
│ GOVERNANCE IMPACT:                                            │
│ • Voting Power Distribution: Broad ecosystem participation    │
│ • Incentive Alignment: Long-term commitment                    │
│ • Ecosystem Growth: Token distribution for contributions      │
│                                                                │
└────────────────────────────────────────────────────────────────┘`,

    investments: () => `┌─ TREASURY INVESTMENT STRATEGIES ──────────────────┐
│                                                                │
│ FUND MANAGER: Karpatkey                                       │
│ • Primary Manager: Endowment fund administration              │
│ • Fee Structure: Service-based compensation                   │
│ • Risk Management: Conservative investment approach           │
│                                                                │
│ CONSERVATIVE YIELD STRATEGIES:                               │
│ • Element Finance: Fixed-rate products                        │
│   - Zero-coupon bonds equivalent                              │
│   - Predictable returns for operating expenses                │
│   - Liquidity features for treasury management                │
│                                                                │
│ REAL-WORLD ASSETS (RWA):                                     │
│ • Tokenized T-bills: Low-risk fixed income                    │
│ • Diversification Strategy: Reduce reliance on DeFi          │
│ • Risk Profile: USD-neutral, ETH-neutral                      │
│ • Market Context: Higher returns than current DeFi yields     │
│                                                                │
│ STAKING DIVERSIFICATION:                                     │
│ • Multiple Providers: Lido, StakeWise, etc.                   │
│ • Risk Mitigation: Avoid single points of failure             │
│ • Insurance Consideration: Protocol coverage evaluation       │
│                                                                │
│ SMART CONTRACT RISKS:                                        │
│ • DeFi Vulnerabilities: Ongoing assessment                    │
│ • Insurance Coverage: Potential risk mitigation               │
│ • Conservative Approach: Wealth preservation focus            │
│                                                                │
│ ENDOWMENT FUND:                                              │
│ • Excess Revenue Destination: Monthly sweeps                  │
│ • Long-term Growth: Investment for sustainability             │
│ • Karpatkey Management: Professional fund administration      │
│                                                                │
└────────────────────────────────────────────────────────────────┘`,

    challenges: () => `┌─ TRANSPARENCY & REPORTING CHALLENGES ──────────────┐
│                                                                │
│ FRAGMENTED FINANCIAL REPORTING:                              │
│ • Multiple Sources: Steakhouse, Karpatkey, ENS Ledger        │
│ • Money Flow Visualization, ENS Wallets, SafeNotes          │
│ • Comprehensive Dashboard: RFP proposed for consolidation    │
│                                                                │
│ WORKING GROUP ISSUES:                                       │
│ • Unspent Funds: Significant balances in multisigs           │
│ • Example: Ecosystem with 600K+ unspent                      │
│ • Redundant Requests: Funds requested despite availability   │
│                                                                │
│ COMPENSATION DEBATES:                                        │
│ • Secretary Role: $5.5K/month value assessment               │
│ • Reporting Quality: Financial transparency concerns         │
│ • Market Alignment: External compensation comparisons        │
│                                                                │
│ TRANSACTION COMPLEXITY:                                      │
│ • High Volume: Many small disbursement transactions          │
│ • Audit Challenges: Broad distribution increases complexity  │
│ • Documentation: Need for detailed transaction tracking      │
│                                                                │
│ DAO GOVERNANCE PHILOSOPHY:                                  │
│ • Public Good Focus: Non-profit vs enterprise approach       │
│ • Cost Control: Balancing efficiency with transparency       │
│ • Long-term Sustainability: Treasury management priorities   │
│                                                                │
│ PROPOSED SOLUTIONS:                                          │
│ • Financial Dashboard: Comprehensive reporting platform      │
│ • Improved Tracking: Better transaction documentation        │
│ • Process Optimization: Streamlined fund request procedures  │
│                                                                │
└────────────────────────────────────────────────────────────────┘`,

    summary: () => `┌─ ENS DAO TREASURY COMPLETE SUMMARY ──────────────────┐
│                                                                │
│ TREASURY OVERVIEW:                                            │
│ • Total Value: $246.5M (ETH $14.46M, ENS $224.62M, USDC $7.42M) │
│ • Main Wallet: 0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7     │
│ • Monthly Revenue: ~$1M from domain registrations              │
│ • Working Groups: 3 multisigs (Meta-Gov, Ecosystem, Public)    │
│                                                                │
│ REVENUE SOURCES:                                               │
│ • Registration Fees: 3-char $640/year, 4-char $160/year        │
│ • Premium Auctions: Up to $100M+ starting prices               │
│ • Endowment DeFi: Karpatkey-managed yield                      │
│ • Registrar Controller: 0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5 │
│                                                                │
│ TREASURY MANAGEMENT:                                          │
│ • Expenditure Runway: 24 months ($16M USDC/DAI target)        │
│ • Monthly Sweeps: Revenue → Stablecoins → Endowment           │
│ • Investment Strategy: Element Finance, RWA, Diversification  │
│ • Fund Manager: Karpatkey (fees for service)                  │
│                                                                │
│ WORKING GROUP BUDGETS H1 2025:                                │
│ • Meta-Governance: $544K + 5 ETH                              │
│ • Ecosystem: $832K + 10 ETH                                   │
│ • Public Goods: $343K + 23 ETH                                │
│ • Total: $1.72M + 38 ETH                                       │
│                                                                │
│ Q1 2025 EXPENDITURES:                                         │
│ • Meta-Governance: $210K spent                                │
│ • Ecosystem: $269K spent                                       │
│ • Public Goods: $111K spent                                    │
│ • ENS Labs: $2.39M received, $1.3M spent                       │
│                                                                │
│ COMPENSATION STRUCTURE:                                        │
│ • Stewards: $4K/month each (9 total = $36K/month)             │
│ • DAO Secretary: $5.5K/month                                  │
│ • Scribe: $3K/month                                           │
│ • ENS Tokens: 10K per steward term (2-year vesting)           │
│                                                                │
│ GOVERNANCE DISTRIBUTIONS:                                     │
│ • Via Hedgey.finance: Immediate voting + 2-year vesting       │
│ • Q1 2025: 25,215 ENS total distributed                        │
│ • Q2 2025: 3,200 ENS (Ecosystem grants)                        │
│                                                                │
│ WORKING GROUP WALLETS:                                        │
│ • Meta-Governance: main.mg.wg.ens.eth (83.6 ETH, 240K USDC)   │
│ • Ecosystem: 600K+ unspent (held when requesting 400K)        │
│ • Public Goods Main: 157.5K USDC, 39.5 ETH, 200 ENS           │
│ • Public Goods Large: 187K USDC                               │
│ • ENS Labs: coldwallet.ens.eth                                 │
│                                                                │
│ TRANSPARENCY CHALLENGES:                                      │
│ • Fragmented Reporting: 6+ different sources                  │
│ • Unspent Funds: Significant balances in multisigs            │
│ • High Transaction Volume: Many small disbursements           │
│ • RFP Proposed: Comprehensive financial dashboard             │
│                                                                │
│ KEY FINANCIAL ADDRESSES:                                      │
│ • Main Treasury: 0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7    │
│ • Registrar: 0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5       │
│ • Meta-Gov: main.mg.wg.ens.eth                                │
│ • ENS Labs: coldwallet.ens.eth                                │
│ • ENS Cold: 0x690F0581eCecCf8389c223170778cD9D029606F2        │
│                                                                │
│ FINANCIAL TRACKING TOOLS:                                     │
│ • Treasury Analytics: Real-time monitoring                     │
│ • Transaction Tracking: Multi-chain support                    │
│                                                                │
└────────────────────────────────────────────────────────────────┘`,

    tx: async (args) => {
      const subCommand = args[0];

      if (!subCommand) {
        let output = `<span class="section-header">TX Command Help</span>\n`;
        output += `<span class="section-border">═══════════════════════════════════════════════════════════════</span>\n\n`;
        output += `<span class="section-subtitle">Usage:</span> <span class="command-name">tx</span> <span class="command-example">&lt;address&gt;</span> <span class="command-description">or</span> <span class="command-name">tx summary</span> <span class="command-example">&lt;address&gt;</span>\n\n`;
        output += `<span class="section-subtitle">Examples:</span>\n`;
        output += `  <span class="command-example">tx 0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7</span>\n`;
        output += `  <span class="command-example">tx summary 0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7</span>\n\n`;
        output += `<span class="section-subtitle">Available Wallets:</span>\n`;
        output += `<span class="section-border">──────────────────</span>\n\n`;

        walletDirectory.forEach(wallet => {
          output += `<span class="wallet-name">${wallet.label}</span>\n`;
          output += `  <span class="wallet-address">${wallet.address}</span>\n`;
          output += `  <span class="wallet-type">Type:</span> <span class="wallet-category">${wallet.category.split('-')[1] || wallet.category}</span>\n\n`;
        });

        output += `<span class="section-subtitle">Working Group Shortcuts:</span>\n`;
        output += `<span class="section-border">─────────────────────────</span>\n`;
        output += `  <span class="command-name">wg meta tx</span>   <span class="command-description">Meta-Governance transactions</span>\n`;
        output += `  <span class="command-name">wg pg tx</span>     <span class="command-description">Public Goods transactions</span>\n`;
        output += `  <span class="command-name">wg eco tx</span>    <span class="command-description">Ecosystem transactions</span>\n\n`;

        return output;
      }

      if (subCommand === 'summary') {
        const walletAddress = args[1] || walletDirectory[0].address; // Default to first wallet in directory

        try {
          const transactions = await transactionService.fetchRealTransactions(walletAddress, 20);

        let output = '';
        output += '┌─────────────────────────────────────────────────────────────┐\n';
        output += '│                    TRANSACTION SUMMARY                        │\n';
        output += '│                                                             │\n';
          output += `│ OVERALL STATISTICS (Last ${transactions.length} transactions): │\n`;
          output += `│ • Total Transactions: ${transactions.length} fetched         │\n`;

          // Calculate volume (rough estimate from wei values)
          const totalVolume = transactions.reduce((sum, tx) => {
            const value = parseInt(tx.value || '0');
            return sum + (value / 1e18); // Convert wei to ETH
          }, 0);

          output += `│ • Approximate Volume: ${totalVolume.toFixed(2)} ETH          │\n`;
          output += `│ • Wallet Address: ${walletAddress.substring(0, 42)}         │\n`;
          output += `│ • Data Source: ${ETHERSCAN_API_KEY ? 'Etherscan API' : 'No API Key'} │\n`;
          output += `│ • Last Updated: ${new Date().toLocaleString()}            │\n`;
        output += '│                                                             │\n';

          const outboundCount = transactions.filter(tx => tx.type === 'OUTBOUND').length;
          const inboundCount = transactions.filter(tx => tx.type === 'INBOUND').length;

        output += '│ TRANSACTION TYPES:                                          │\n';
          output += `│ • Outbound: ${outboundCount} transactions                      │\n`;
          output += `│ • Inbound: ${inboundCount} transactions                       │\n`;
        output += '│                                                             │\n';
        output += '└─────────────────────────────────────────────────────────────┘\n';

          if (!ETHERSCAN_API_KEY) {
            output += '\nNote: No API key configured. Add VITE_ETHERSCAN_API_KEY to .env for real data.\n';
          }

        return output;
        } catch (error) {
          console.error('Error fetching transaction summary:', error);
          return 'Error fetching transaction summary. Please check your wallet address and API configuration.\n';
        }
      }

      // Use the provided address directly (subCommand is the wallet address)
      const walletAddress = subCommand;

      if (!walletAddress || !walletAddress.startsWith('0x') || walletAddress.length !== 42) {
        let output = `<span class="section-header">Invalid Wallet Address Format</span>\n`;
        output += `<span class="section-border">═══════════════════════════════════════════════════════════════</span>\n\n`;
        output += `<span class="section-subtitle">Usage:</span> <span class="command-name">tx</span> <span class="command-example">&lt;0x...address&gt;</span>\n\n`;
        output += `<span class="section-subtitle">Example:</span>\n`;
        output += `  <span class="command-example">tx 0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7</span>\n\n`;
        output += `<span class="section-subtitle">Available Wallets:</span>\n`;
        output += `<span class="section-border">──────────────────</span>\n\n`;

        walletDirectory.forEach(w => {
          output += `<span class="wallet-name">${w.label}</span>\n`;
          output += `  <span class="wallet-address">${w.address}</span>\n\n`;
        });

        output += `<span class="section-subtitle">Working Group Shortcuts:</span>\n`;
        output += `<span class="section-border">─────────────────────────</span>\n`;
        output += `  <span class="command-name">wg meta tx</span>   <span class="command-description">Meta-Governance transactions</span>\n`;
        output += `  <span class="command-name">wg pg tx</span>     <span class="command-description">Public Goods transactions</span>\n`;
        output += `  <span class="command-name">wg eco tx</span>    <span class="command-description">Ecosystem transactions</span>\n\n`;

        return output;
      }

      // Create wallet object - use from directory if found, otherwise create generic one
      const wallet = walletDirectory.find(w => w.address.toLowerCase() === walletAddress.toLowerCase()) || {
        address: walletAddress,
        label: `Custom Wallet ${walletAddress.substring(0, 10)}...`,
        category: 'custom'
      };

      try {
        // Get transactions for this specific wallet using its address
        const walletTransactions = await transactionService.fetchRealTransactions(wallet.address, 5);

      let output = '';

      // Header
      output += `┌─ TRANSACTIONS: ${wallet.label} ──────────────────────┐\n`;
      output += `│                                                          │\n`;
      output += `│  Wallet: ${wallet.label.padEnd(46)} │\n`;
      output += `│  Address: ${wallet.address.padEnd(46)} │\n`;
      output += `│  Category: ${wallet.category.padEnd(44)} │\n`;
      output += `│                                                          │\n`;
      output += `├─────┬──────────┬────────────────────────────────────┬───────┤\n`;
      output += `│ #   │ Hash     │ Details                             │ Type  │\n`;
      output += `├─────┼──────────┼────────────────────────────────────┼───────┤\n`;

      // Transaction rows
      walletTransactions.forEach((tx, index) => {
        const num = String(index + 1).padStart(2, ' ');
          const hash = `<span class="tx-hash">${tx.hash.substring(0, 10)}</span>`;
          const type = `<span class="tx-type">${(tx.type || 'UNKNOWN').substring(0, 5).padEnd(5)}</span>`;

          output += `│ ${num} │ ${hash} │ Blockchain Transaction ${index + 1}         │ ${type} │\n`;

        // Additional details
        const addrLabel = tx.type === 'OUTBOUND' ? 'To:' : 'From:';
          const addrClass = tx.type === 'OUTBOUND' ? 'tx-direction-to' : 'tx-direction-from';
          const addr = (tx.type === 'OUTBOUND' ? (tx.to || 'Unknown') : (tx.from || 'Unknown')).substring(0, 42);
          const timeAgo = tx.timestamp ? new Date(tx.timestamp).toLocaleString() : 'Unknown';

          output += `│     │          │ <span class="${addrClass}">${addrLabel}</span> <span class="tx-address">${addr}</span> │       │\n`;
          output += `│     │          │ <span class="tx-label">Value:</span> <span class="tx-value">${tx.value || '0'} wei</span>              │       │\n`;
          output += `│     │          │ <span class="tx-label">Time:</span> <span class="tx-time">${timeAgo}</span> │       │\n`;
          output += `│     │          │ <span class="tx-label">Status:</span> <span class="tx-status">${tx.status || 'UNKNOWN'}</span>                │       │\n`;
        output += `├─────┼──────────┼────────────────────────────────────┼───────┤\n`;
      });

      // Footer
      output += `│                                                          │\n`;
      output += `│  Wallet Summary:                                         │\n`;
        output += `│  • Total Transactions: ${walletTransactions.length} (shown)      │\n`;
        output += `│  • Wallet Address: ${wallet.address}             │\n`;
        output += `│  • Data Source: ${ETHERSCAN_API_KEY ? 'Etherscan API' : 'No API Key'} │\n`;
        output += `│  • Last Updated: ${new Date().toLocaleString()}         │\n`;
      output += `└──────────────────────────────────────────────────────────┘\n`;

        if (!ETHERSCAN_API_KEY) {
          output += '\nNote: No API key configured. Add VITE_ETHERSCAN_API_KEY to .env for real data.\n';
        }

      return output;
      } catch (error) {
        console.error('Error fetching wallet transactions:', error);
        return 'Error fetching wallet transactions. Please check your wallet address and API configuration.\n';
      }
    },

    exit: () => {
      setCommandHistory(prev => [...prev, {
        command: 'exit',
        output: 'Logging out...',
        type: 'warning',
        timestamp: new Date()
      }]);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      return 'Logging out...';
    }
  };

  const handleCommand = async (cmd) => {
    const trimmedCmd = cmd.trim();
    const [commandName, ...args] = trimmedCmd.split(' ');

    // Reset completion state
    setCompletionIndex(0);
    setCurrentCompletions([]);
    setOriginalCommand('');

    if (commands[commandName]) {
      try {
        const result = await commands[commandName](args);
        // Format URLs as clickable links
        const formattedResult = typeof result === 'string' ? formatOutputWithLinks(result) : result;
      setCommandHistory(prev => [...prev, {
        command: cmd,
          output: formattedResult,
        type: 'success',
        timestamp: new Date()
      }]);
      } catch (error) {
        console.error('Command execution error:', error);
        const errorMessage = `Error executing command: ${error.message}`;
        setCommandHistory(prev => [...prev, {
          command: cmd,
          output: formatOutputWithLinks(errorMessage),
          type: 'error',
          timestamp: new Date()
        }]);
      }
    } else {
      setCommandHistory(prev => [...prev, {
        command: cmd,
        output: formatOutputWithLinks(`bash: ${commandName}: command not found`),
        type: 'error',
        timestamp: new Date()
      }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (command.trim()) {
        handleCommand(command).then(() => {
        setCommand('');
          // Reset completion state
          setCompletionIndex(0);
          setCurrentCompletions([]);
          setOriginalCommand('');
        });
      }
    } else if (e.key === 'Tab') {
      e.preventDefault(); // Prevent tab from moving focus

      const completions = getCompletions(command);

      if (completions.length > 0) {
        // Check if Shift is held down - if so, execute the completion
        if (e.shiftKey) {
          // Shift+Tab: Execute the completion immediately without cycling
          const completionToExecute = completions[0]; // Always use the first/best completion

          // Build the complete command
          const parts = command.trim().split(/\s+/);
          let fullCommand;

          if (parts.length === 0 || (parts.length === 1 && !command.endsWith(' '))) {
            // Completing first command
            fullCommand = completionToExecute;
          } else {
            // Completing subcommand - replace the last part
            const newParts = [...parts];
            newParts[newParts.length - 1] = completionToExecute;
            fullCommand = newParts.join(' ');
          }

          // Execute the command immediately
          handleCommand(fullCommand).then(() => {
            // Clear input and reset state after command execution
            setCommand('');
            setCompletionIndex(0);
            setCurrentCompletions([]);
            setOriginalCommand('');
          });
        } else {
          // Regular Tab: Show cycling interface
          if (currentCompletions.length === 0) {
            // First tab press - show all completions and select first
            setOriginalCommand(command);
            setCurrentCompletions(completions);
            setCompletionIndex(0);
          } else {
            // Subsequent tab presses - cycle through existing completions
            const nextIndex = (completionIndex + 1) % currentCompletions.length;
            setCompletionIndex(nextIndex);
          }

          // Update input field with current completion
          const currentCompletion = currentCompletions[completionIndex] || completions[0];
          const parts = command.trim().split(/\s+/);
          let updatedCommand;

          if (parts.length === 0 || (parts.length === 1 && !command.endsWith(' '))) {
            // Completing first command
            updatedCommand = currentCompletion + ' ';
          } else {
            // Completing subcommand - replace the last part
            const newParts = [...parts];
            newParts[newParts.length - 1] = currentCompletion;
            updatedCommand = newParts.join(' ') + ' ';
          }

          setCommand(updatedCommand);
        }
      }
    }
  };

  return (
    <div className="terminal-app">
      <div className="terminal-window">
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="terminal-title">ENS Treasury Terminal v3.0</div>
          <div className="terminal-status">
            CONNECTED • {currentTime.toLocaleTimeString('en-US', { hour12: false })}
          </div>
        </div>


        {/* Terminal Interface */}
        <div className="terminal-interface">
          {/* Command Input */}
          <div className="command-input-container">
            <span className="command-prompt">ens-admin@terminal:~$</span>
            <input
              type="text"
              value={command}
              onChange={(e) => {
                setCommand(e.target.value);
                // Reset completion state when user types
                setCompletionIndex(0);
                setCurrentCompletions([]);
                setOriginalCommand('');
              }}
              onKeyPress={handleKeyPress}
              className="command-input"
              placeholder="Type 'help' for commands..."
              autoFocus
              spellCheck={false}
            />
            <div className="cursor"></div>
          </div>

          {/* Tab Completion Suggestions */}
          {currentCompletions.length > 0 && (
            <div className="completion-suggestions">
              <div className="completion-list">
                {currentCompletions.map((completion, index) => (
                  <span
                    key={completion}
                    className={`completion-item ${index === completionIndex ? 'completion-active' : ''}`}
                  >
                    {completion}
                  </span>
                ))}
              </div>
              <div className="completion-hint">
                Tab: cycle • Shift+Tab: execute now • Enter: select • {currentCompletions.length} suggestion{currentCompletions.length !== 1 ? 's' : ''}
              </div>
            </div>
          )}


          {/* Command History */}
          <div className="command-history">
            {[...commandHistory].reverse().map((entry, index) => (
              <div key={`cmd-${commandHistory.length - 1 - index}`} className={`command-entry command-entry--${entry.type}`}>
                <div className="command-meta">
                  <span className="command-symbol">$</span>
                  <span className="command-text">{entry.command}</span>
                  <span className="command-timestamp">
                    {entry.timestamp.toLocaleTimeString('en-US', { hour12: false })}
                  </span>
                </div>
                <div
                  className={`command-output command-output--${entry.type}`}
                  dangerouslySetInnerHTML={{ __html: entry.output }}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Terminal;

