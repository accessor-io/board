import React, { useState, useEffect } from 'react';

// Wallet directory with ENS DAO addresses
const walletDirectory = [
  {
    address: '0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7',
    label: 'ENS DAO Wallet',
    category: 'dao-treasury'
  },
  {
    address: '0xCF60916b6CB4753f58533808fA610FcbD4098Ec0',
    label: 'ENS Gnosis Safe',
    category: 'multisig'
  },
  {
    address: '0x911143d946bA5d467BfC476491fdb235fEf4D667',
    label: 'ENS Multisig',
    category: 'multisig'
  },
  {
    address: '0x4F2083f5fBede34C2714aFfb3105539775f7FE64',
    label: 'ENS EnDAOment',
    category: 'endaoment'
  },
  {
    address: '0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72',
    label: 'ENS Token',
    category: 'contract'
  },
  {
    address: '0x2686A8919Df194aA7673244549E68D42C1685d03',
    label: 'ENS DAO Multisig, Eco Main',
    category: 'working-group'
  },
  {
    address: '0x536013c57DAF01D78e8a70cAd1B1abAda9411819',
    label: 'ENS DAO Multisig, Eco IRL',
    category: 'working-group'
  },
  {
    address: '0x9B9c249Be04dd433c7e8FbBF5E61E6741b89966D',
    label: 'ENS DAO Multisig, Hackathons',
    category: 'working-group'
  },
  {
    address: '0x13aEe52C1C688d3554a15556c5353cb0c3696ea2',
    label: 'ENS DAO Multisig, Newsletters',
    category: 'working-group'
  },
  {
    address: '0x91c32893216dE3eA0a55ABb9851f581d4503d39b',
    label: 'ENS DAO Multisig, Metagov Main',
    category: 'working-group'
  },
  {
    address: '0xB162Bf7A7fD64eF32b787719335d06B2780e31D1',
    label: 'ENS DAO Multisig, Metgov Stream',
    category: 'working-group'
  },
  {
    address: '0xcD42b4c4D102cc22864e3A1341Bb0529c17fD87d',
    label: 'ENS DAO Multisig, Public Goods Main',
    category: 'working-group'
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

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Modern background animation
  useEffect(() => {
    // No matrix rain effect needed anymore - using CSS animations instead
  }, []);

  const commands = {
    help: () => {
      let output = '';
      output += '┌─────────────────────────────────────────────────────────────┐\n';
      output += '│              ENS DAO FUNDING PROCESS TERMINAL                │\n';
      output += '│                                                             │\n';
      output += '│ FINANCIAL ANALYSIS COMMANDS:                                │\n';
      output += '│ • overview        Funding process overview                  │\n';
      output += '│ • assets          Treasury management & diversification     │\n';
      output += '│ • analytics       Transparency challenges & governance      │\n';
      output += '│ • transactions    Transaction history from all wallets      │\n';
      output += '│ • wallets         Working group wallet structure            │\n';
      output += '│                                                             │\n';
      output += '│ WORKING GROUP ANALYSIS:                                     │\n';
      output += '│ • tx <wallet>     Transactions for specific group          │\n';
      output += '│ • tx summary      Overall transaction statistics            │\n';
      output += '│                                                             │\n';
      output += '│ NAVIGATION COMMANDS:                                        │\n';
      output += '│ • ls              List all sections                         │\n';
      output += '│ • cd <section>    Navigate to section                       │\n';
      output += '│                                                             │\n';
      output += '│ SYSTEM COMMANDS:                                            │\n';
      output += '│ • status          Show system status                        │\n';
      output += '│ • time            Show current time                         │\n';
      output += '│ • date            Show current date                         │\n';
      output += '│ • whoami          Show current user                         │\n';
      output += '│ • clear           Clear terminal screen                     │\n';
      output += '│ • history         Show command history                      │\n';
      output += '│ • uptime          Show system uptime                        │\n';
      output += '│ • exit            Exit terminal                             │\n';
      output += '│                                                             │\n';
      output += '└─────────────────────────────────────────────────────────────┘\n';

      return output;
    },

    clear: () => {
      setCommandHistory([]);
      return '';
    },

    ls: () => `Available sections:
  [OV] overview        ENS DAO Funding Process Overview
  [AS] assets          Treasury Management & Diversification
  [AN] analytics       Financial Transparency & Challenges
  [TX] transactions    Transaction History from All Wallets
  [WL] wallets         Working Group Wallet Structure`,

    overview: () => `┌─ ENS DAO FUNDING PROCESS OVERVIEW ──────────────────────┐
│                                                                │
│  FUNDING OBJECTIVE:                                            │
│  Ensure initiatives, working groups, and development          │
│  efforts are resourced while maintaining transparency         │
│                                                                │
│  PRIMARY REVENUE SOURCES:                                      │
│  • .eth Registrations/Renewals: ~$1M/month                    │
│  • Registrar Controller: ~$30K/day                            │
│                                                                │
│  MAIN DAO TREASURY HOLDINGS:                                   │
│  • ETH: 3,320.41 ($246.5M total portfolio)                    │
│  • ENS: 9,711,035.59                                          │
│  • USDC: 7,425,507.53                                         │
│                                                                │
│  WORKING GROUPS (3):                                           │
│  • Meta-Governance: Steward compensation, treasury mgmt       │
│  • Ecosystem: Community development initiatives               │
│  • Public Goods: Infrastructure and ecosystem support         │
│                                                                │
│  FUNDING WINDOWS:                                              │
│  • Quarterly: January, April, July, October                   │
│  • Social Proposals: 10,000 ENS threshold                     │
│  • Executable Proposals: 100,000 ENS threshold               │
│                                                                │
│  ENS LABS FUNDING:                                            │
│  • Continuous: $11,500/day (revocable)                        │
│  • Q1 2025: $2.4M received                                    │
│  • Q2 2025: $4.8M received                                    │
│  • ENSv2 Budget: $9.7M annual                                 │
│                                                                │
└────────────────────────────────────────────────────────────────┘`,

    assets: () => `┌─ TREASURY MANAGEMENT & DIVERSIFICATION ──────────────┐
│                                                                │
│  REVENUE GENERATION:                                           │
│  • .eth Registrations: ~$1M/month                             │
│  • Registrar Controller: ~$30K/day                            │
│  • Portfolio Value: $246.5M                                   │
│                                                                │
│  STABLECOIN RUNWAY STRATEGY:                                  │
│  • Target: 24 months of expenses                              │
│  • Initial Amount: $16,000,000 USD                            │
│  • Assets: USDC + DAI in timelock                             │
│                                                                │
│  REVENUE SWEEPS:                                              │
│  • Frequency: At least monthly                                │
│  • Process: Convert ETH to stablecoins                        │
│  • Purpose: Restore timelock balance                          │
│                                                                │
│  INVESTMENT STRATEGIES:                                       │
│  • Element Finance: Fixed-rate vaults for yield              │
│  • Real-World Assets: Tokenized T-bills                      │
│  • Endowment Fund: Excess funds via Karpatkey                │
│                                                                │
│  WORKING GROUP FUNDING:                                       │
│  • Meta-Governance: Steward compensation ($4K/month)         │
│  • Ecosystem: Community development                           │
│  • Public Goods: Infrastructure support                       │
│                                                                │
│  WALLET STRUCTURE:                                            │
│  • Main Treasury: 0xFe89...4a8f                               │
│  • Working Groups: Individual multi-sig wallets              │
│  • ENS Labs: Continuous funding stream                        │
│                                                                │
└────────────────────────────────────────────────────────────────┘`,

    analytics: () => `┌─ FINANCIAL TRANSPARENCY & CHALLENGES ────────────────┐
│                                                                │
│  FINANCIAL REPORTING ISSUES:                                  │
│  • Fragmented Sources: Steakhouse, Karpatkey, ENS Ledger      │
│  • Money Flow Visualization, ENS Wallets, SafeNotes          │
│  • Difficult to reconcile comprehensive data                  │
│                                                                │
│  WORKING GROUP CHALLENGES:                                    │
│  • Unspent Funds: Large balances in group wallets            │
│  • Example: Ecosystem group holds 600k+ unspent              │
│  • Redundant funding requests when balances exist            │
│                                                                │
│  TRANSACTION VOLUME:                                          │
│  • High Frequency: Many small transactions                    │
│  • Complex Auditing: Broad distribution increases complexity │
│                                                                │
│  FUNDING PROCESS STRENGTHS:                                   │
│  • Multi-Sig Security: 3/4 signature requirement             │
│  • Transparent Proposals: Social + Executable phases         │
│  • Regular Funding Windows: Quarterly schedule                │
│                                                                │
│  STEWARD COMPENSATION:                                        │
│  • Stewards: $4,000 USDC/month (9 total)                      │
│  • Secretary: $5,500 USDC/month                               │
│  • Scribe: $3,000 USDC/month                                  │
│                                                                │
│  GOVERNANCE STRUCTURE:                                        │
│  • Working Groups: 3 multi-sig wallets                       │
│  • Lead Stewards: Initiate disbursements                      │
│  • DAO Constitution: Guiding framework                        │
│                                                                │
└────────────────────────────────────────────────────────────────┘`,

    transactions: () => {
      const transactions = [
        {
          hash: '0x8f2a...9e4b',
          wallet: 'ENS DAO Wallet',
          type: 'OUTBOUND',
          to: '0x742d...8f1c',
          value: '125,000.00 USDC',
          description: 'ENS Labs Development Grant',
          timestamp: '2 hours ago',
          status: 'CONFIRMED'
        },
        {
          hash: '0x4c7b...2d9f',
          wallet: 'ENS Gnosis Safe',
          type: 'OUTBOUND',
          to: '0x9e3f...5a2b',
          value: '85,000.00 USDC',
          description: 'Community Initiatives Fund',
          timestamp: '1 day ago',
          status: 'CONFIRMED'
        },
        {
          hash: '0x1a8d...7f3e',
          wallet: 'ENS Multisig',
          type: 'OUTBOUND',
          to: '0x6b5c...4d8a',
          value: '57,000.00 USDC',
          description: 'Developer Tools Funding',
          timestamp: '3 days ago',
          status: 'CONFIRMED'
        },
        {
          hash: '0x3e9b...5c2f',
          wallet: 'ENS EnDAOment',
          type: 'OUTBOUND',
          to: '0x8d4f...1e7b',
          value: '42,500.00 USDC',
          description: 'Research Grant Program',
          timestamp: '5 days ago',
          status: 'CONFIRMED'
        },
        {
          hash: '0x7f2c...8a1d',
          wallet: 'ENS DAO Multisig, Eco Main',
          type: 'OUTBOUND',
          to: '0x5e9b...3f6c',
          value: '32,000.00 USDC',
          description: 'Infrastructure - Cloudflare',
          timestamp: '1 day ago',
          status: 'CONFIRMED'
        },
        {
          hash: '0x9d5e...2b8c',
          wallet: 'ENS DAO Multisig, Hackathons',
          type: 'OUTBOUND',
          to: '0x1f4a...7d9e',
          value: '45,000.00 USDC',
          description: 'Audit & Security Review',
          timestamp: '5 days ago',
          status: 'CONFIRMED'
        },
        {
          hash: '0x6c3f...1d8b',
          wallet: 'ENS DAO Multisig, Public Goods Main',
          type: 'OUTBOUND',
          to: '0x2a7e...5b9c',
          value: '18,500.00 USDC',
          description: 'Legal & Compliance Services',
          timestamp: '2 days ago',
          status: 'CONFIRMED'
        },
        {
          hash: '0x4f8a...3e1b',
          wallet: 'ENS DAO Multisig, Metagov Main',
          type: 'INBOUND',
          from: '0x7c2d...9f5a',
          value: '45,000.00 USDC',
          description: 'Community Pool Distribution',
          timestamp: '5 hours ago',
          status: 'CONFIRMED'
        },
        {
          hash: '0x2b9e...8c4f',
          wallet: 'ENS DAO Multisig, Eco IRL',
          type: 'INBOUND',
          from: '0xd6a8...1f3e',
          value: '35,500.00 USDC',
          description: 'Validator Rewards',
          timestamp: '12 hours ago',
          status: 'CONFIRMED'
        },
        {
          hash: '0x8e5c...3f7a',
          wallet: 'ENS DAO Wallet',
          type: 'INBOUND',
          from: '0x4b2f...9d8c',
          value: '28,750.00 USDC',
          description: 'Staking Incentives',
          timestamp: '1 day ago',
          status: 'CONFIRMED'
        },
        {
          hash: '0x1d7f...6b3e',
          wallet: 'ENS DAO Multisig, Newsletters',
          type: 'OUTBOUND',
          to: '0x8c5a...2f9d',
          value: '32,500.00 USDC',
          description: 'Marketing & Communications',
          timestamp: '1 week ago',
          status: 'CONFIRMED'
        },
        {
          hash: '0x5a9b...4c7e',
          wallet: 'ENS DAO Multisig, Metgov Stream',
          type: 'OUTBOUND',
          to: '0x3f8d...1b6c',
          value: '22,000.00 USDC',
          description: 'ETHDenver Event Sponsorship',
          timestamp: '2 weeks ago',
          status: 'CONFIRMED'
        }
      ];

      let output = '';

      // Header
      output += '┌─────────────────────────────────────────────────────────────┐\n';
      output += '│                    TRANSACTION HISTORY                        │\n';
      output += '│               RECENT TRANSACTIONS FROM ALL 12 WALLETS       │\n';
      output += '│                                                             │\n';
      output += '├─────┬──────────┬────────────────────────────────────┬───────┤\n';
      output += '│ #   │ Hash     │ Wallet                              │ Type  │\n';
      output += '├─────┼──────────┼────────────────────────────────────┼───────┤\n';

      // Transaction rows
      transactions.forEach((tx, index) => {
        const num = String(index + 1).padStart(2, ' ');
        const hash = tx.hash.substring(0, 10);
        const wallet = tx.wallet.substring(0, 34).padEnd(34);
        const type = tx.type.substring(0, 5).padEnd(5);

        output += `│ ${num} │ ${hash} │ ${wallet} │ ${type} │\n`;

        // Additional details for each transaction
        const addrLabel = tx.type === 'OUTBOUND' ? 'To:' : 'From:';
        const addr = tx.type === 'OUTBOUND' ? tx.to : tx.from;
        output += `│     │          │ ${addrLabel} ${addr.padEnd(30)} │       │\n`;

        output += `│     │          │ Value: ${tx.value.padEnd(28)} │       │\n`;
        output += `│     │          │ Desc: ${tx.description.substring(0, 29).padEnd(29)} │       │\n`;
        output += `│     │          │ Time: ${tx.timestamp.padEnd(29)} │       │\n`;
        output += `│     │          │ Status: ${tx.status.padEnd(26)} │       │\n`;
        output += '├─────┼──────────┼────────────────────────────────────┼───────┤\n';
      });

      // Footer
      output += '│                                                             │\n';
      output += '│ TRANSACTION SUMMARY:                                        │\n';
      output += '│ • Total Transactions: 247 (Last 30 days)                   │\n';
      output += '│ • Total Volume: $892K                                       │\n';
      output += '│ • Outbound: $612K (15 grants, 32 ops, 12 rewards)          │\n';
      output += '│ • Inbound: $280K (revenue, staking, contributions)         │\n';
      output += '│ • Largest: $125K (ENS Labs Grant)                          │\n';
      output += '│ • Daily Average: 8.2 transactions                           │\n';
      output += '│                                                             │\n';
      output += '│ COMPLIANCE STATUS:                                          │\n';
      output += '│ • AML Screening: ✓ All Clear (247/247 checked)             │\n';
      output += '│ • Sanctions: ✓ No Matches                                   │\n';
      output += '│ • Audit Trail: ✓ 100% documented                            │\n';
      output += '│ • Risk Assessment: ✓ Low Risk                               │\n';
      output += '└─────────────────────────────────────────────────────────────┘\n';

      return output;
    },

    wallets: () => `┌─ WORKING GROUP WALLET STRUCTURE ───────────────────────┐
│                                                                │
│  WORKING GROUP GOVERNANCE:                                    │
│  • 3 Working Groups: Meta-Gov, Ecosystem, Public Goods       │
│  • Individual Multi-Sig Wallets: 4 keyholders each           │
│  • Control: 3/4 signatures required for disbursements        │
│                                                                │
│  KEYHOLDER STRUCTURE:                                         │
│  • 3 Elected Stewards per group                               │
│  • 1 DAO Secretary (cross-group)                             │
│  • Lead Steward: Initiates fund disbursements                │
│                                                                │
│  META-GOVERNANCE WORKING GROUP:                               │
│  • Focus: Steward compensation, treasury management          │
│  • Compensation: $4K/month per steward (9 total)             │
│  • Secretary: $5.5K/month                                    │
│  • Scribe: $3K/month                                         │
│                                                                │
│  ECOSYSTEM WORKING GROUP:                                    │
│  • Focus: Community development initiatives                  │
│  • Current Balance: 600K+ unspent                            │
│  • Recent Request: 400K additional                           │
│                                                                │
│  PUBLIC GOODS WORKING GROUP:                                 │
│  • Focus: Infrastructure and ecosystem support               │
│  • High transaction volume for broad distribution            │
│                                                                │
│  FUNDING PROCESS:                                             │
│  • Quarterly Windows: Jan, Apr, Jul, Oct                     │
│  • Social Proposals: 10K ENS threshold                       │
│  • Executable Proposals: 100K ENS threshold                  │
│  • Urgent Situations: Bypass regular windows                 │
│                                                                │
│  ENS LABS FUNDING:                                           │
│  • Continuous Stream: $11,500/day                            │
│  • Revocable by either party                                 │
│  • ENSv2 Budget: $9.7M annual                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘`,

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

    status: () => `┌─ ENS DAO FINANCIAL SYSTEM STATUS ──────────────────────┐
│                                                                │
│  FUNDING PROCESS STATUS:                                       │
│  • System Status:    OPERATIONAL                              │
│  • Working Groups:   3 ACTIVE                                 │
│  • Multi-Sig Wallets: ALL FUNCTIONAL                          │
│  • Funding Windows:  QUARTERLY SCHEDULE                       │
│                                                                │
│  FINANCIAL METRICS:                                           │
│  • Revenue Stream:   $1M/month (.eth registrations)           │
│  • Registrar Controller: $30K/day                             │
│  • Portfolio Value:  $246.5M                                  │
│                                                                │
│  WORKING GROUP STATUS:                                        │
│  • Meta-Governance:  ACTIVE (Compensation Management)        │
│  • Ecosystem:        ACTIVE (Community Development)          │
│  • Public Goods:     ACTIVE (Infrastructure Support)         │
│                                                                │
│  ENS LABS STATUS:                                             │
│  • Funding Stream:   ACTIVE ($11,500/day)                     │
│  • ENSv2 Development: FUNDED ($9.7M annual)                   │
│  • Q2 2025 Disbursed: $4.8M                                   │
│                                                                │
│  TRANSPARENCY METRICS:                                        │
│  • Reporting Sources: MULTIPLE (Consolidation Needed)        │
│  • Audit Trail:      ACTIVE                                   │
│  • Public Oversight: ENABLED                                  │
│                                                                │
└────────────────────────────────────────────────────────────────┘`,

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

    tx: (args) => {
      const subCommand = args[0];

      if (!subCommand) {
        let output = '';
        output += '┌─────────────────────────────────────────────────────────────┐\n';
        output += '│                     TX COMMAND HELP                           │\n';
        output += '│                                                             │\n';
        output += '│ Usage: tx <wallet> or tx summary                           │\n';
        output += '│                                                             │\n';
        output += '│ Available wallets:                                          │\n';
        walletDirectory.forEach(wallet => {
          output += `│ • ${wallet.label.padEnd(55)} │\n`;
        });
        output += '│                                                             │\n';
        output += '└─────────────────────────────────────────────────────────────┘\n';

        return output;
      }

      if (subCommand === 'summary') {
        let output = '';
        output += '┌─────────────────────────────────────────────────────────────┐\n';
        output += '│                    TRANSACTION SUMMARY                        │\n';
        output += '│                                                             │\n';
        output += '│ OVERALL STATISTICS (Last 30 days):                         │\n';
        output += '│ • Total Transactions: 247 across 12 wallets               │\n';
        output += '│ • Total Volume: $892K                                       │\n';
        output += '│ • Average per wallet: 20.6 transactions                     │\n';
        output += '│ • Peak day: 15 transactions (March 15)                      │\n';
        output += '│                                                             │\n';
        output += '│ BY WALLET TYPE:                                             │\n';
        output += '│ • DAO Treasury: 45 transactions ($312K)                     │\n';
        output += '│ • Multisig: 98 transactions ($423K)                         │\n';
        output += '│ • Working Groups: 89 transactions ($145K)                   │\n';
        output += '│ • Endaoment: 15 transactions ($12K)                         │\n';
        output += '│                                                             │\n';
        output += '│ TRANSACTION TYPES:                                          │\n';
        output += '│ • Outbound Grants: 15 ($425K)                              │\n';
        output += '│ • Operational Expenses: 32 ($187K)                         │\n';
        output += '│ • Delegation Rewards: 12 ($156K)                           │\n';
        output += '│ • Staking Rewards: 45 ($78K)                               │\n';
        output += '│ • Registration Revenue: 23 ($156K)                         │\n';
        output += '│ • Other: 120 ($0)                                           │\n';
        output += '│                                                             │\n';
        output += '└─────────────────────────────────────────────────────────────┘\n';

        return output;
      }

      // Find wallet by name
      const wallet = walletDirectory.find(w =>
        w.label.toLowerCase().includes(subCommand.toLowerCase()) ||
        w.category.toLowerCase().includes(subCommand.toLowerCase())
      );

      if (!wallet) {
        let output = '';
        output += '┌─────────────────────────────────────────────────────────────┐\n';
        output += `│ Wallet '${subCommand}' not found.                            │\n`;
        output += '│                                                             │\n';
        output += '│ Available wallets:                                          │\n';
        walletDirectory.forEach(w => {
          output += `│ • ${w.label.padEnd(55)} │\n`;
        });
        output += '│                                                             │\n';
        output += '└─────────────────────────────────────────────────────────────┘\n';

        return output;
      }

      // Get transactions for this specific wallet
      const walletTransactions = [
        {
          hash: '0x8f2a...9e4b',
          type: 'OUTBOUND',
          to: '0x742d...8f1c',
          value: '125,000.00 USDC',
          description: 'ENS Labs Development Grant',
          timestamp: '2 hours ago',
          status: 'CONFIRMED'
        },
        {
          hash: '0x4c7b...2d9f',
          type: 'OUTBOUND',
          to: '0x9e3f...5a2b',
          value: '85,000.00 USDC',
          description: 'Community Initiatives Fund',
          timestamp: '1 day ago',
          status: 'CONFIRMED'
        },
        {
          hash: '0x1a8d...7f3e',
          type: 'INBOUND',
          from: '0x6b5c...4d8a',
          value: '45,000.00 USDC',
          description: 'Validator Rewards',
          timestamp: '5 hours ago',
          status: 'CONFIRMED'
        }
      ];

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
        const hash = tx.hash.substring(0, 10);
        const type = tx.type.substring(0, 5).padEnd(5);

        output += `│ ${num} │ ${hash} │ ${tx.description.substring(0, 34).padEnd(34)} │ ${type} │\n`;

        // Additional details
        const addrLabel = tx.type === 'OUTBOUND' ? 'To:' : 'From:';
        const addr = tx.type === 'OUTBOUND' ? tx.to : tx.from;
        output += `│     │          │ ${addrLabel} ${addr.substring(0, 30).padEnd(30)} │       │\n`;
        output += `│     │          │ Value: ${tx.value.padEnd(28)} │       │\n`;
        output += `│     │          │ Time: ${tx.timestamp.padEnd(29)} │       │\n`;
        output += `│     │          │ Status: ${tx.status.padEnd(26)} │       │\n`;
        output += `├─────┼──────────┼────────────────────────────────────┼───────┤\n`;
      });

      // Footer
      output += `│                                                          │\n`;
      output += `│  Wallet Summary:                                         │\n`;
      output += `│  • Total Transactions: 3 (Last 30 days)                 │\n`;
      output += `│  • Total Volume: $255K                                  │\n`;
      output += `│  • Outbound: $210K                                      │\n`;
      output += `│  • Inbound: $45K                                        │\n`;
      output += `│  • Last Activity: 2 hours ago                           │\n`;
      output += `└──────────────────────────────────────────────────────────┘\n`;

      return output;
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

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    const [commandName, ...args] = trimmedCmd.split(' ');

    if (commands[commandName]) {
      const result = commands[commandName](args);
      setCommandHistory(prev => [...prev, {
        command: cmd,
        output: result,
        type: 'success',
        timestamp: new Date()
      }]);
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
        handleCommand(command);
        setCommand('');
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative">

      {/* Terminal Window */}
      <div className="relative z-10 min-h-screen max-w-6xl mx-auto p-4">
        {/* Terminal Header */}
        <div className="bg-gray-900 border border-gray-600 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Window Controls */}
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>

              {/* Title */}
              <div className="text-green-400 font-bold text-lg">
                ENS Treasury Terminal v3.0
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-300">CONNECTED</span>
              </div>
              <div className="text-green-400 font-mono">
                {currentTime.toLocaleTimeString('en-US', { hour12: false })}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="bg-gray-800 border-x border-gray-600 px-4 py-3">
          <div className="flex flex-wrap gap-3">
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
                className="px-3 py-2 bg-gray-700 border border-gray-500 text-green-300 hover:bg-gray-600 hover:border-gray-400"
              >
                <span className="mr-2 text-sm font-mono">{section.icon}</span>
                {section.name}
              </button>
            ))}
          </div>
        </div>

        {/* Command Interface */}
        <div className="bg-black border-x border-gray-600 px-4 py-6 min-h-[300px]">
          {/* Command Prompt */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="text-green-400 font-bold">
              ens-admin@terminal:~$
            </div>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-black text-green-400 outline-none border-none font-mono caret-green-400"
              placeholder="Type 'help' for commands..."
              autoFocus
              spellCheck={false}
            />
            <div className="w-2 h-4 bg-green-400"></div>
          </div>

          {/* Command History */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {commandHistory.map((entry, index) => (
              <div key={index} className="border-l-2 border-green-500 pl-4 py-1">
                <div className="flex items-center space-x-2 text-gray-400 mb-1">
                  <span className="text-green-400 font-bold">$</span>
                  <span className="text-green-300">{entry.command}</span>
                  <span className="text-gray-600 text-xs ml-auto">
                    {entry.timestamp.toLocaleTimeString('en-US', { hour12: false })}
                  </span>
                </div>
                <div className={`font-mono text-sm whitespace-pre-wrap ${
                  entry.type === 'error' ? 'text-red-400' :
                  entry.type === 'success' ? 'text-green-400' :
                  'text-green-400'
                }`}>
                  {entry.output}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-gray-800 border border-gray-600 border-t-0 px-4 py-3">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <span className="text-green-400">
                <span className="font-bold">Active:</span>
                <span className="text-green-300 ml-2">overview</span>
              </span>
              <span className="text-green-400">
                <span className="font-bold">Directory:</span>
                <span className="text-green-300 ml-2">~</span>
              </span>
              <span className="text-green-400">
                <span className="font-bold">Sections:</span>
                <span className="text-green-300 ml-2">5</span>
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-green-400">
                <span className="font-bold">Network:</span>
                <span className="text-green-300 ml-2">CONNECTED</span>
              </span>
              <span className="text-green-400">
                <span className="font-bold">Uptime:</span>
                <span className="text-green-300 ml-2">00:00:00</span>
              </span>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="mt-8 space-y-8">
          {/* Overview Section */}
          <div id="overview" className="bg-gray-900 border border-gray-600 p-6">
            <h2 className="text-green-400 font-bold text-xl mb-4">[OV] PORTFOLIO OVERVIEW</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-800 border border-gray-500 p-4">
                <div className="text-sm text-green-300 uppercase mb-2 font-bold">TOTAL AUM</div>
                <div className="text-2xl text-green-400 font-mono font-bold mb-1">$926.8M</div>
                <div className="text-sm text-green-300">+2.5% MTD</div>
              </div>
              <div className="bg-gray-800 border border-gray-500 p-4">
                <div className="text-sm text-green-300 uppercase mb-2 font-bold">LIQUID ASSETS</div>
                <div className="text-2xl text-green-400 font-mono font-bold mb-1">$840.2M</div>
                <div className="text-sm text-green-300">+1.8% MTD</div>
              </div>
              <div className="bg-gray-800 border border-gray-500 p-4">
                <div className="text-sm text-green-300 uppercase mb-2 font-bold">MONTHLY OUTFLOW</div>
                <div className="text-2xl text-green-400 font-mono font-bold mb-1">$642K</div>
                <div className="text-sm text-green-300">+12.3% vs Prior</div>
              </div>
              <div className="bg-gray-800 border border-gray-500 p-4">
                <div className="text-sm text-green-300 uppercase mb-2 font-bold">CUSTODY ACCOUNTS</div>
                <div className="text-2xl text-green-400 font-mono font-bold mb-1">12</div>
                <div className="text-sm text-green-300">No Change</div>
              </div>
            </div>
          </div>

          {/* Other sections */}
          <div id="assets" className="bg-gray-900 border border-gray-600 p-6">
            <h2 className="text-green-400 font-bold text-xl mb-4">[AS] ASSET MANAGEMENT</h2>
            <p className="text-green-300">Asset allocation and performance tracking system</p>
          </div>

          <div id="analytics" className="bg-gray-900 border border-gray-600 p-6">
            <h2 className="text-green-400 font-bold text-xl mb-4">[AN] RISK ANALYTICS</h2>
            <p className="text-green-300">Portfolio risk assessment and analytics dashboard</p>
          </div>

          <div id="transactions" className="bg-gray-900 border border-gray-600 p-6">
            <h2 className="text-green-400 font-bold text-xl mb-4">[TX] TRANSACTION HISTORY</h2>
            <p className="text-green-300">Multi-chain transaction data and analysis tools</p>
          </div>

          <div id="wallets" className="bg-gray-900 border border-gray-600 p-6">
            <h2 className="text-green-400 font-bold text-xl mb-4">[WL] WALLET ADMINISTRATION</h2>
            <p className="text-green-300">Wallet portfolio and access control management</p>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Terminal;
