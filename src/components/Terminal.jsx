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
      output += '│                    AVAILABLE COMMANDS                         │\n';
      output += '│                                                             │\n';
      output += '│ NAVIGATION COMMANDS:                                        │\n';
      output += '│ • ls              List all sections                         │\n';
      output += '│ • cd <section>    Navigate to section                       │\n';
      output += '│ • overview        Show portfolio overview                   │\n';
      output += '│ • assets          Show asset management data                │\n';
      output += '│ • analytics       Show risk analytics                       │\n';
      output += '│ • transactions    Show ALL transactions from 12 wallets     │\n';
      output += '│ • wallets         Show wallet administration                │\n';
      output += '│                                                             │\n';
      output += '│ TRANSACTION COMMANDS:                                       │\n';
      output += '│ • tx <wallet>     Show transactions for specific wallet    │\n';
      output += '│ • tx summary      Show transaction summary statistics      │\n';
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
  📊 overview        Portfolio Overview
  💰 assets          Asset Management
  📈 analytics       Risk Analytics
  🔄 transactions    Transaction History
  👛 wallets         Wallet Administration`,

    overview: () => `┌─ PORTFOLIO OVERVIEW ─────────────────────────────────────┐
│                                                              │
│  TOTAL AUM:        $926.8M         +2.5% MTD                │
│  LIQUID ASSETS:    $840.2M         +1.8% MTD                │
│  MONTHLY OUTFLOW:  $642K           +12.3% vs Prior          │
│  CUSTODY ACCOUNTS: 12               No Change               │
│                                                              │
│  Key Holdings:                                              │
│  • ETH: $567.8M (61.3%)                                   │
│  • USDC: $180.2M (19.5%)                                  │
│  • ENS: $178.6M (19.2%)                                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘`,

    assets: () => `┌─ ASSET MANAGEMENT ──────────────────────────────────────┐
│                                                              │
│  PRIMARY HOLDINGS:                                          │
│  • Ethereum (ETH):    234,567.00    $567.8M (61.3%)        │
│  • USD Coin (USDC):   180,200,000   $180.2M (19.5%)        │
│  • ENS Token:         12,500,000    $178.6M (19.2%)        │
│                                                              │
│  ALLOCATION TARGETS:                                        │
│  • Core Crypto:     60-70%         Current: 61.3% ✓         │
│  • Stablecoins:     15-25%         Current: 19.5% ✓         │
│  • Native Tokens:   15-25%         Current: 19.2% ✓         │
│                                                              │
│  CUSTODY BREAKDOWN:                                        │
│  • Multi-Sig Treasury:     $746.4M (80.5%)                 │
│  • Institutional Custody:  $180.2M (19.5%)                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘`,

    analytics: () => `┌─ RISK ANALYTICS ──────────────────────────────────────┐
│                                                              │
│  PORTFOLIO VOLATILITY:                                       │
│  • 30-Day: 18.2% annualized                                 │
│  • Sharpe Ratio: 1.34 (30D rolling)                         │
│                                                              │
│  ASSET VOLATILITY:                                          │
│  • ETH:  24.3% (30D)                                        │
│  • ENS:  45.7% (30D)  ⚠️ HIGH                               │
│  • USDC: 0.2% (30D)   ✓ LOW                                 │
│                                                              │
│  MARKET DEPTH ANALYSIS:                                     │
│  • ETH:  $15.2B daily volume                                │
│  • ENS:  $85.3M daily volume                                │
│  • USDC: $8.7B daily volume                                 │
│                                                              │
│  RISK METRICS:                                              │
│  • Maximum Drawdown: -12.4% (Last 90 days)                  │
│  • Value at Risk (95%): $47.2M (1-day horizon)              │
│  • Liquidity Score: Excellent                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘`,

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

    wallets: () => `┌─ WALLET ADMINISTRATION ────────────────────────────────┐
│                                                              │
│  PRIMARY TREASURY WALLETS:                                  │
│                                                              │
│  1. Main Treasury Wallet                                    │
│     Address: 0xFe89...4a8f                                   │
│     Balance: $746.4M                                        │
│     Holdings: ETH ($567.8M), ENS ($178.6M)                  │
│     Multi-Sig: 4/7 threshold                                │
│                                                              │
│  2. Stablecoin Treasury                                     │
│     Address: 0xCF60...7b2c                                   │
│     Balance: $180.2M                                        │
│     Holdings: USDC ($180.2M)                                │
│     Custody: Coinbase Institutional                          │
│                                                              │
│  OPERATIONAL WALLETS:                                       │
│                                                              │
│  3. Grants Distribution                                     │
│     Address: 0x9111...3d5e                                   │
│     Balance: $2.8M                                          │
│     Recent Activity: 4 transactions ($425K total)           │
│                                                              │
│  4. Operations Wallet                                       │
│     Address: 0xebA7...9f1a                                   │
│     Balance: $856K                                          │
│     Purpose: Day-to-day operational expenses                │
│                                                              │
│  5. ETH Staking Wallet                                      │
│     Address: 0xB162...6c8b                                   │
│     Balance: $132.2M                                        │
│     Validators: 1,705 active                                │
│     APR: 3.8% current                                       │
│                                                              │
│  SECURITY STATUS:                                           │
│  • Failed Login Attempts: 0 (Last 24h)                      │
│  • Suspicious Activity: None detected                       │
│  • Wallet Security Score: 98/100 (Excellent)                │
│                                                              │
└─────────────────────────────────────────────────────────────┘`,

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

    status: () => `┌─ SYSTEM STATUS ────────────────────────────────────────┐
│                                                              │
│  System Status:    OPERATIONAL                              │
│  Terminal Version: v3.0                                      │
│  Network Status:   CONNECTED                                 │
│  Data Freshness:   REAL-TIME                                 │
│  Active Section:   overview                                  │
│                                                              │
│  PERFORMANCE METRICS:                                       │
│  • Response Time:   <100ms                                  │
│  • Memory Usage:    Normal                                   │
│  • CPU Usage:       Low                                      │
│  • Network Latency: 23ms                                     │
│                                                              │
│  SECURITY STATUS:                                           │
│  • Authentication:  SECURE                                  │
│  • Encryption:      ENABLED                                  │
│  • Audit Trail:      ACTIVE                                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘`,

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-slate-100 font-mono relative overflow-hidden">
      {/* Modern Geometric Background */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950/30 to-indigo-950/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/8 rounded-full blur-3xl"></div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.15) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Terminal Window */}
      <div className="relative z-10 min-h-screen max-w-6xl mx-auto p-4">
        {/* Modern Terminal Header */}
        <div className="bg-slate-900/90 border border-slate-700/50 rounded-t-xl p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {/* Modern Window Controls */}
              <div className="flex space-x-3">
                <div className="w-4 h-4 bg-red-500/80 rounded-full border border-red-400/50 cursor-pointer hover:bg-red-400/90 transition-all duration-200 shadow-lg hover:shadow-red-500/30"></div>
                <div className="w-4 h-4 bg-yellow-500/80 rounded-full border border-yellow-400/50 cursor-pointer hover:bg-yellow-400/90 transition-all duration-200 shadow-lg hover:shadow-yellow-500/30"></div>
                <div className="w-4 h-4 bg-green-500/80 rounded-full border border-green-400/50 cursor-pointer hover:bg-green-400/90 transition-all duration-200 shadow-lg hover:shadow-green-500/30"></div>
              </div>

              {/* Modern Title */}
              <div className="text-cyan-300 font-semibold text-2xl tracking-wide bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                ENS Treasury Terminal v3.0
              </div>
            </div>

            {/* Modern Status */}
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/30"></div>
                <span className="text-emerald-300 font-medium tracking-wide">CONNECTED</span>
              </div>
              <div className="text-slate-300 font-mono bg-slate-800/50 px-3 py-1 rounded-lg border border-slate-600/30">
                {currentTime.toLocaleTimeString('en-US', { hour12: false })}
              </div>
            </div>
          </div>
        </div>

        {/* Modern Navigation Bar */}
        <div className="bg-slate-800/80 border-x border-slate-700/30 px-6 py-4">
          <div className="flex flex-wrap gap-4">
            {[
              { id: 'overview', name: 'OVERVIEW', icon: '[OV]', color: 'from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30' },
              { id: 'assets', name: 'ASSETS', icon: '[AS]', color: 'from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30' },
              { id: 'analytics', name: 'ANALYTICS', icon: '[AN]', color: 'from-purple-500/20 to-indigo-500/20 hover:from-purple-500/30 hover:to-indigo-500/30' },
              { id: 'transactions', name: 'TRANSACTIONS', icon: '[TX]', color: 'from-pink-500/20 to-rose-500/20 hover:from-pink-500/30 hover:to-rose-500/30' },
              { id: 'wallets', name: 'WALLETS', icon: '[WL]', color: 'from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30' }
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
                className={`px-5 py-3 bg-gradient-to-r ${section.color} border border-slate-600/30 text-slate-200 rounded-xl hover:border-slate-500/50 transition-all duration-200 font-semibold shadow-md hover:shadow-lg hover:scale-105`}
              >
                <span className="mr-3 text-sm font-mono font-bold text-cyan-300 bg-slate-700/50 px-2 py-1 rounded-md">{section.icon}</span>
                {section.name}
              </button>
            ))}
          </div>
        </div>

        {/* Modern Command Interface */}
        <div className="bg-slate-900/80 border-x border-slate-700/30 px-8 py-8 min-h-[350px]">
          {/* Modern Command Prompt */}
          <div className="flex items-center space-x-4 mb-8">
            <div className="text-cyan-300 font-semibold text-xl bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-600/30">
              ens-admin@terminal
            </div>
            <div className="text-slate-400 text-2xl font-bold">:</div>
            <div className="text-blue-300 font-bold text-xl bg-slate-800/50 px-3 py-2 rounded-lg border border-slate-600/30">~</div>
            <div className="text-emerald-300 text-2xl font-bold bg-emerald-500/20 px-2 py-1 rounded-md">$</div>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-slate-800/50 text-slate-100 outline-none border border-slate-600/30 rounded-lg px-4 py-3 font-mono text-lg caret-cyan-300 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 placeholder:text-slate-500"
              placeholder="Type 'help' for commands..."
              autoFocus
              spellCheck={false}
            />
            <div className="w-4 h-8 bg-gradient-to-r from-cyan-400 to-blue-400 animate-pulse rounded-full shadow-lg"></div>
          </div>

          {/* Modern Command History */}
          <div className="space-y-6 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800/30">
            {commandHistory.map((entry, index) => (
              <div key={index} className="bg-slate-800/30 rounded-xl border border-slate-700/30 p-4 hover:bg-slate-800/40 transition-all duration-200">
                <div className="flex items-center space-x-3 text-slate-400 mb-3">
                  <span className="text-emerald-300 font-bold bg-emerald-500/20 px-2 py-1 rounded-md text-sm">$</span>
                  <span className="text-slate-200 font-medium">{entry.command}</span>
                  <span className="text-slate-500 text-xs ml-auto bg-slate-700/50 px-2 py-1 rounded-md">
                    {entry.timestamp.toLocaleTimeString('en-US', { hour12: false })}
                  </span>
                </div>
                <div className={`font-mono text-sm leading-relaxed whitespace-pre-wrap ${
                  entry.type === 'error' ? 'text-red-300' :
                  entry.type === 'success' ? 'text-emerald-300' :
                  'text-cyan-300'
                }`}>
                  {entry.output}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modern Status Bar */}
        <div className="bg-slate-800/90 border border-slate-700/50 border-t-0 rounded-b-xl px-8 py-5">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-cyan-300 font-semibold">Active:</span>
                <span className="text-slate-200 bg-slate-700/50 px-2 py-1 rounded-md">overview</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-blue-300 font-semibold">Directory:</span>
                <span className="text-slate-200 bg-slate-700/50 px-2 py-1 rounded-md">~</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-purple-300 font-semibold">Sections:</span>
                <span className="text-slate-200 bg-slate-700/50 px-2 py-1 rounded-md">15</span>
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-300 font-semibold">Network:</span>
                <span className="text-slate-200 bg-slate-700/50 px-2 py-1 rounded-md">CONNECTED</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                <span className="text-amber-300 font-semibold">Uptime:</span>
                <span className="text-slate-200 bg-slate-700/50 px-2 py-1 rounded-md">00:00:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="mt-8 space-y-8">
          {/* Overview Section */}
          <div id="overview" className="bg-slate-900/90 border border-slate-700/50 rounded-xl p-8 shadow-xl">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">[OV]</span>
              </div>
              <h2 className="text-slate-100 font-bold text-2xl tracking-wide">PORTFOLIO OVERVIEW</h2>
            </div>
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/40 border border-emerald-500/30 p-6 rounded-xl backdrop-blur-sm hover:border-emerald-400/50 transition-all duration-300 shadow-lg hover:shadow-emerald-500/20">
                <div className="text-xs text-emerald-300 uppercase tracking-widest mb-4 font-bold">TOTAL AUM</div>
                <div className="text-4xl text-emerald-200 font-mono font-bold mb-3">$926.8M</div>
                <div className="text-sm text-emerald-300 flex items-center">
                  <span className="mr-2 text-lg">▲</span>+2.5% MTD
                </div>
              </div>
              <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-800/40 border border-cyan-500/30 p-6 rounded-xl backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20">
                <div className="text-xs text-cyan-300 uppercase tracking-widest mb-4 font-bold">LIQUID ASSETS</div>
                <div className="text-4xl text-cyan-200 font-mono font-bold mb-3">$840.2M</div>
                <div className="text-sm text-cyan-300 flex items-center">
                  <span className="mr-2 text-lg">▲</span>+1.8% MTD
                </div>
              </div>
              <div className="bg-gradient-to-br from-rose-900/40 to-rose-800/40 border border-rose-500/30 p-6 rounded-xl backdrop-blur-sm hover:border-rose-400/50 transition-all duration-300 shadow-lg hover:shadow-rose-500/20">
                <div className="text-xs text-rose-300 uppercase tracking-widest mb-4 font-bold">MONTHLY OUTFLOW</div>
                <div className="text-4xl text-rose-200 font-mono font-bold mb-3">$642K</div>
                <div className="text-sm text-rose-300 flex items-center">
                  <span className="mr-2 text-lg">▲</span>+12.3% vs Prior
                </div>
              </div>
              <div className="bg-gradient-to-br from-violet-900/40 to-violet-800/40 border border-violet-500/30 p-6 rounded-xl backdrop-blur-sm hover:border-violet-400/50 transition-all duration-300 shadow-lg hover:shadow-violet-500/20">
                <div className="text-xs text-violet-300 uppercase tracking-widest mb-4 font-bold">CUSTODY ACCOUNTS</div>
                <div className="text-4xl text-violet-200 font-mono font-bold mb-3">12</div>
                <div className="text-sm text-violet-300">No Change</div>
              </div>
            </div>
          </div>

          {/* Other sections */}
          <div id="assets" className="bg-slate-900/90 border border-slate-700/50 rounded-xl p-8 shadow-xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">[AS]</span>
              </div>
              <h2 className="text-slate-100 font-bold text-2xl tracking-wide">ASSET MANAGEMENT</h2>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed">Asset allocation and performance tracking system</p>
          </div>

          <div id="analytics" className="bg-slate-900/90 border border-slate-700/50 rounded-xl p-8 shadow-xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">[AN]</span>
              </div>
              <h2 className="text-slate-100 font-bold text-2xl tracking-wide">RISK ANALYTICS</h2>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed">Portfolio risk assessment and analytics dashboard</p>
          </div>

          <div id="transactions" className="bg-slate-900/90 border border-slate-700/50 rounded-xl p-8 shadow-xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">[TX]</span>
              </div>
              <h2 className="text-slate-100 font-bold text-2xl tracking-wide">TRANSACTION HISTORY</h2>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed">Multi-chain transaction data and analysis tools</p>
          </div>

          <div id="wallets" className="bg-slate-900/90 border border-slate-700/50 rounded-xl p-8 shadow-xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">[WL]</span>
              </div>
              <h2 className="text-slate-100 font-bold text-2xl tracking-wide">WALLET ADMINISTRATION</h2>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed">Wallet portfolio and access control management</p>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        /* Custom scrollbar styling - only if needed */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.1);
          border-radius: 3px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(51, 65, 85, 0.5);
          border-radius: 3px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(51, 65, 85, 0.7);
        }
      `}</style>
    </div>
  );
};

export default Terminal;
