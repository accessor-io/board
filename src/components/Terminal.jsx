import React, { useState, useEffect } from 'react';
import { commands as commandModules } from './terminal/commands/index.js';
import { transactionService } from '../services/transactionService.js';
import '../styles/terminal.css';

// Import environment variables
const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY || 'demo';

// Wallet directory - dynamically configurable
const walletDirectory = [
  {
    address: '0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7',
    label: 'ENS DAO Main Treasury',
    category: 'dao-treasury'
  },
  {
    address: '0x91c32893216dE3eA0a55ABb9851f581d4503d39b',
    label: 'Meta-Governance WG Multisig',
    category: 'working-group-meta'
  },
  {
    address: '0xcD42b4c4D102cc22864e3A1341Bb0529c17fD87d',
    label: 'Public Goods WG Main Multisig',
    category: 'working-group-public'
  },
  {
    address: '0xebA76C907F02BA13064EDAD7876Fe51D9d856F62',
    label: 'Public Goods WG Large Grants',
    category: 'working-group-public'
  },
  {
    address: '0x2686A8919Df194aA7673244549E68D42C1685d03',
    label: 'Ecosystem WG Main Multisig',
    category: 'working-group-ecosystem'
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
      'overview', 'assets', 'analytics', 'tx', 'transactions', 'wallets', 'revenue', 'compensation',
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
          const walletCommands = ['all', 'wg', 'dao', 'treasury'];
          return walletCommands.filter(cmd => cmd.startsWith(lastPart));
        }
        if (parts.length === 3 && parts[1] === 'wg') {
          const wgTypes = ['meta', 'ecosystem', 'eco', 'public'];
          return wgTypes.filter(cmd => cmd.startsWith(lastPart));
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
      output += '  wallets         Working group multisig wallets\n';
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

    wallets: () => `Working Group Multisig Wallets

Wallet Control Structure:
  3 Working Groups: Meta-Gov, Ecosystem, Public Goods
  4 Keyholders per wallet: 3 Stewards + 1 DAO Secretary
  Signatures Required: 3 of 4 for disbursements
  Multi-Signature Security: Enabled
  Transaction Monitoring: Active

Funding Process:
  Collective Proposals during Funding Windows
  Windows: January, April, July, October
  Social Proposal → Executable Proposal
  Urgent Situations: Bypass regular windows

Meta-Governance Multisig (main.mg.wg.ens.eth):
  Holdings: 83.627 ETH, 240,738 USDC, 164K ENS
  Purpose: Steward comp, DAO tooling, audits, governance
  Budget H1 2025: $544K + 5 ETH
  Q1 2025 Expenses: $210K
  Q2 2025 Expenses: $217K

Ecosystem Working Group:
  Budget H1 2025: $832K + 10 ETH
  Q1 2025 Expenses: $269K
  Q2 2025 Expenses: $194K + 5 ETH
  Note: Held 600K+ unspent when requesting 400K

Public Goods Multisigs:
  Main Multisig: 157.5K USDC, 39.5 ETH, 200 ENS
  Large Grants: 187K USDC
  Budget H1 2025: $343K + 23 ETH
  Q1 2025 Expenses: $111K + 14.9 ETH
  Q2 2025 Expenses: $264K

Governance Distributions:
  Via Hedgey Contracts: 2-year vesting period
  Q1 2025: 24,965 ENS (EP 5.26) + 250 ENS grants
  Q2 2025: 3,200 ENS (Term 6 grants)
  Recovery: 589 ENS to users who lost tokens

Compensation Structure:
  Stewards (9 total): $4K/month each ($36K/month)
  DAO Secretary: $5.5K/month (compensation debate)
  Scribe: $3K/month
  ENS Tokens: 10K per steward term (2-year vesting)

Transparency Challenges:
  Fragmented Reporting: Multiple sources hard to reconcile
  Unspent Balances: Groups hold large reserves
  High Transaction Volume: Many small disbursements
  RFP Proposed: Comprehensive financial dashboard

Main DAO Wallet (Source):
  Address: 0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7
  Purpose: Primary treasury, funds working groups
  Total Transactions: ~$100M (ETH/USDC)`,

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
        let output = '';
        output += '┌─────────────────────────────────────────────────────────────┐\n';
        output += '│                     TX COMMAND HELP                           │\n';
        output += '│                                                             │\n';
        output += '│ Usage: tx <address> or tx summary <address>                │\n';
        output += '│                                                             │\n';
        output += '│ Example: tx 0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7     │\n';
        output += '│ Example: tx summary 0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7 │\n';
        output += '│                                                             │\n';
        output += '│ Available wallets:                                          │\n';
        walletDirectory.forEach(wallet => {
          output += `│ • ${wallet.label.padEnd(55)} │\n`;
          output += `│   ${wallet.address} │\n`;
        });
        output += '│                                                             │\n';
        output += '│ Working Group Shortcuts:                                   │\n';
        output += '│ • wg meta tx   Meta-Governance transactions               │\n';
        output += '│ • wg pg tx     Public Goods transactions                   │\n';
        output += '│ • wg eco tx    Ecosystem transactions                      │\n';
        output += '│                                                             │\n';
        output += '└─────────────────────────────────────────────────────────────┘\n';

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
        let output = '';
        output += '┌─────────────────────────────────────────────────────────────┐\n';
        output += '│ Invalid wallet address format.                             │\n';
        output += '│                                                             │\n';
        output += '│ Usage: tx <0x...address>                                   │\n';
        output += '│ Example: tx 0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7     │\n';
        output += '│                                                             │\n';
        output += '│ Available wallets:                                          │\n';
        walletDirectory.forEach(w => {
          output += `│ • ${w.label.padEnd(55)} │\n`;
          output += `│   ${w.address} │\n`;
        });
        output += '│                                                             │\n';
        output += '│ Working Group Shortcuts:                                   │\n';
        output += '│ • wg meta tx   Meta-Governance transactions               │\n';
        output += '│ • wg pg tx     Public Goods transactions                   │\n';
        output += '│ • wg eco tx    Ecosystem transactions                      │\n';
        output += '│                                                             │\n';
        output += '└─────────────────────────────────────────────────────────────┘\n';

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
        setCommandHistory(prev => [...prev, {
          command: cmd,
          output: result,
          type: 'success',
          timestamp: new Date()
        }]);
      } catch (error) {
        console.error('Command execution error:', error);
        setCommandHistory(prev => [...prev, {
          command: cmd,
          output: `Error executing command: ${error.message}`,
          type: 'error',
          timestamp: new Date()
        }]);
      }
    } else {
      setCommandHistory(prev => [...prev, {
        command: cmd,
        output: `bash: ${commandName}: command not found`,
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

        {/* Navigation */}
        <div className="terminal-nav">
          <div className="terminal-nav-content">
            {[
              { id: 'overview', name: 'OVERVIEW', icon: '[OV]' },
              { id: 'assets', name: 'ASSETS', icon: '[AS]' },
              { id: 'analytics', name: 'ANALYTICS', icon: '[AN]' },
              { id: 'transactions', name: 'TRANSACTIONS', icon: '[TX]' },
              { id: 'wallets', name: 'WALLETS', icon: '[WL]' }
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
                className="nav-button"
              >
                <span className="nav-icon">{section.icon}</span>
                <span className="nav-text">{section.name}</span>
              </button>
            ))}
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
                <div className={`command-output command-output--${entry.type}`}>
                  {entry.output}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Simple Content Sections */}
        <div style={{ marginTop: '20px' }}>
          <div id="overview" style={{ marginBottom: '20px', padding: '20px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ color: '#2563eb', marginBottom: '10px' }}>[OV] PORTFOLIO OVERVIEW</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              <div style={{ padding: '10px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
                <div style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase' }}>TOTAL AUM</div>
                <div style={{ fontSize: '20px', color: '#334155', fontFamily: 'monospace' }}>$926.8M</div>
                <div style={{ fontSize: '12px', color: '#059669' }}>+2.5% MTD</div>
              </div>
              <div style={{ padding: '10px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
                <div style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase' }}>LIQUID ASSETS</div>
                <div style={{ fontSize: '20px', color: '#334155', fontFamily: 'monospace' }}>$840.2M</div>
                <div style={{ fontSize: '12px', color: '#059669' }}>+1.8% MTD</div>
              </div>
              <div style={{ padding: '10px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
                <div style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase' }}>MONTHLY OUTFLOW</div>
                <div style={{ fontSize: '20px', color: '#334155', fontFamily: 'monospace' }}>$642K</div>
                <div style={{ fontSize: '12px', color: '#dc2626' }}>+12.3% vs Prior</div>
              </div>
              <div style={{ padding: '10px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
                <div style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase' }}>CUSTODY ACCOUNTS</div>
                <div style={{ fontSize: '20px', color: '#334155', fontFamily: 'monospace' }}>12</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>No Change</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;

