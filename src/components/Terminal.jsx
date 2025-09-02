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
  const [matrixRain, setMatrixRain] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Matrix rain effect
  useEffect(() => {
    const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const drops = Array.from({ length: 20 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: Math.random() * 2 + 1,
      char: characters[Math.floor(Math.random() * characters.length)]
    }));

    setMatrixRain(drops);

    const interval = setInterval(() => {
      setMatrixRain(prev => prev.map(drop => ({
        ...drop,
        y: drop.y > 100 ? 0 : drop.y + drop.speed,
        char: characters[Math.floor(Math.random() * characters.length)]
      })));
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const commands = {
    help: () => `┌─ Available Commands ──────────────────────────────────────┐
│ Navigation Commands:                                        │
│   ls              List all sections                         │
│   cd <section>    Navigate to section                       │
│   overview        Show portfolio overview                   │
│   assets          Show asset management data                │
│   analytics       Show risk analytics                       │
│   transactions    Show ALL transactions from 12 wallets     │
│   wallets         Show wallet administration                │
│                                                           │
│ Transaction Commands:                                      │
│   tx <wallet>     Show transactions for specific wallet    │
│   tx summary      Show transaction summary statistics      │
│                                                           │
│ System Commands:                                           │
│   status          Show system status                        │
│   time            Show current time                         │
│   date            Show current date                         │
│   whoami          Show current user                         │
│   clear           Clear terminal screen                     │
│   history         Show command history                      │
│   uptime          Show system uptime                        │
│   exit            Exit terminal                             │
└─────────────────────────────────────────────────────────────┘`,

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

      const transactionList = transactions.map((tx, index) =>
        `│  ${String(index + 1).padStart(2)}. ${tx.hash}  │\n` +
        `│      Wallet: ${tx.wallet.padEnd(35)} │\n` +
        `│      Type:   ${tx.type.padEnd(35)} │\n` +
        `│      ${tx.type === 'OUTBOUND' ? 'To' : 'From'}:   ${tx.type === 'OUTBOUND' ? tx.to : tx.from} │\n` +
        `│      Value:  ${tx.value.padEnd(35)} │\n` +
        `│      Desc:   ${tx.description.padEnd(35)} │\n` +
        `│      Time:   ${tx.timestamp.padEnd(35)} │\n` +
        `│      Status: ${tx.status.padEnd(35)} │\n` +
        `│                                                          │`
      ).join('\n├────────────────────────────────────────────────────┤\n');

      return `┌─ TRANSACTION HISTORY ─────────────────────────────────┐
│                                                          │
│  RECENT TRANSACTIONS FROM ALL 12 WALLETS (Last 30 days) │
│                                                          │
├──────────────────────────────────────────────────────────┤
${transactionList}
├──────────────────────────────────────────────────────────┤
│                                                          │
│  TRANSACTION SUMMARY:                                    │
│  • Total Transactions: 247 (Last 30 days)               │
│  • Total Volume: $892K                                  │
│  • Outbound: $612K (15 grants, 32 ops, 12 rewards)     │
│  • Inbound: $280K (revenue, staking, contributions)    │
│  • Largest: $125K (ENS Labs Grant)                      │
│  • Daily Average: 8.2 transactions                      │
│                                                          │
│  COMPLIANCE STATUS:                                      │
│  • AML Screening: ✓ All Clear (247/247 checked)        │
│  • Sanctions: ✓ No Matches                              │
│  • Audit Trail: ✓ 100% documented                       │
│  • Risk Assessment: ✓ Low Risk                          │
│                                                          │
└──────────────────────────────────────────────────────────┘`;
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
        return 'Usage: tx <wallet> or tx summary\n\nAvailable wallets:\n' +
               walletDirectory.map(wallet => `  ${wallet.label}`).join('\n');
      }

      if (subCommand === 'summary') {
        return `┌─ TRANSACTION SUMMARY ──────────────────────────────────┐
│                                                            │
│  OVERALL STATISTICS (Last 30 days):                      │
│  • Total Transactions: 247 across 12 wallets             │
│  • Total Volume: $892K                                    │
│  • Average per wallet: 20.6 transactions                 │
│  • Peak day: 15 transactions (March 15)                  │
│                                                            │
│  BY WALLET TYPE:                                          │
│  • DAO Treasury: 45 transactions ($312K)                 │
│  • Multisig: 98 transactions ($423K)                     │
│  • Working Groups: 89 transactions ($145K)               │
│  • Endaoment: 15 transactions ($12K)                     │
│                                                            │
│  TRANSACTION TYPES:                                       │
│  • Outbound Grants: 15 ($425K)                           │
│  • Operational Expenses: 32 ($187K)                     │
│  • Delegation Rewards: 12 ($156K)                       │
│  • Staking Rewards: 45 ($78K)                           │
│  • Registration Revenue: 23 ($156K)                     │
│  • Other: 120 ($0)                                       │
│                                                            │
└────────────────────────────────────────────────────────────┘`;
      }

      // Find wallet by name
      const wallet = walletDirectory.find(w =>
        w.label.toLowerCase().includes(subCommand.toLowerCase()) ||
        w.category.toLowerCase().includes(subCommand.toLowerCase())
      );

      if (!wallet) {
        return `Wallet '${subCommand}' not found.\n\nAvailable wallets:\n` +
               walletDirectory.map(w => `  ${w.label}`).join('\n');
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

      const transactionList = walletTransactions.map((tx, index) =>
        `│  ${String(index + 1).padStart(2)}. ${tx.hash} │\n` +
        `│      Type:   ${tx.type.padEnd(35)} │\n` +
        `│      ${tx.type === 'OUTBOUND' ? 'To' : 'From'}:   ${tx.type === 'OUTBOUND' ? tx.to : tx.from} │\n` +
        `│      Value:  ${tx.value.padEnd(35)} │\n` +
        `│      Desc:   ${tx.description.padEnd(35)} │\n` +
        `│      Time:   ${tx.timestamp.padEnd(35)} │\n` +
        `│      Status: ${tx.status.padEnd(35)} │`
      ).join('\n├──────────────────────────────────────────────────┤\n');

      return `┌─ TRANSACTIONS: ${wallet.label} ──────────────────────┐
│                                                          │
│  Wallet: ${wallet.label}                                 │
│  Address: ${wallet.address}                              │
│  Category: ${wallet.category}                            │
│                                                          │
├──────────────────────────────────────────────────────────┤
${transactionList}
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Wallet Summary:                                         │
│  • Total Transactions: 3 (Last 30 days)                 │
│  • Total Volume: $255K                                  │
│  • Outbound: $210K                                      │
│  • Inbound: $45K                                        │
│  • Last Activity: 2 hours ago                           │
│                                                          │
└──────────────────────────────────────────────────────────┘`;
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-green-400 font-mono relative overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        {matrixRain.map((drop, index) => (
          <div
            key={index}
            className="absolute text-green-500 text-xs font-bold"
            style={{
              left: `${drop.x}%`,
              top: `${drop.y}%`,
              animation: `matrix-fall ${drop.speed}s linear infinite`,
              textShadow: '0 0 8px #00ff41'
            }}
          >
            {drop.char}
          </div>
        ))}
      </div>

      {/* Terminal Window */}
      <div className="relative z-10 min-h-screen max-w-6xl mx-auto p-4">
        {/* Terminal Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-green-500/50 rounded-t-lg p-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Window Controls */}
              <div className="flex space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full border border-red-400 cursor-pointer hover:bg-red-400 transition-colors shadow-lg"></div>
                <div className="w-4 h-4 bg-yellow-500 rounded-full border border-yellow-400 cursor-pointer hover:bg-yellow-400 transition-colors shadow-lg"></div>
                <div className="w-4 h-4 bg-green-500 rounded-full border border-green-400 cursor-pointer hover:bg-green-400 transition-colors shadow-lg"></div>
              </div>

              {/* Title */}
              <div className="text-green-400 font-bold text-xl tracking-wider">
                ╭─ ENS Treasury Terminal v3.0 ─────────────────────────────────────────────────────╮
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                <span className="text-green-300 font-medium">CONNECTED</span>
              </div>
              <div className="text-green-400 font-mono">
                {currentTime.toLocaleTimeString('en-US', { hour12: false })}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-x-2 border-green-500/50 px-4 py-3">
          <div className="flex flex-wrap gap-3">
            {[
              { id: 'overview', name: 'OVERVIEW', icon: '📊' },
              { id: 'assets', name: 'ASSETS', icon: '💰' },
              { id: 'analytics', name: 'ANALYTICS', icon: '📈' },
              { id: 'transactions', name: 'TRANSACTIONS', icon: '🔄' },
              { id: 'wallets', name: 'WALLETS', icon: '👛' }
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
                className="px-4 py-2 bg-gradient-to-r from-green-900/20 to-green-800/20 border border-green-500/30 text-green-300 rounded-lg hover:bg-green-900/40 hover:border-green-400/50 transition-all duration-300 font-medium shadow-lg hover:shadow-green-500/20"
              >
                <span className="mr-2 text-lg">{section.icon}</span>
                {section.name}
              </button>
            ))}
          </div>
        </div>

        {/* Command Interface */}
        <div className="bg-gradient-to-b from-gray-900 to-black border-x-2 border-green-500/50 px-6 py-6 min-h-[300px]">
          {/* Command Prompt */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="text-green-400 font-bold text-lg">ens-admin@terminal</div>
            <div className="text-green-300 text-xl">:</div>
            <div className="text-blue-400 font-bold text-lg">~</div>
            <div className="text-green-300 text-xl">$</div>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent text-green-400 outline-none border-none font-mono text-lg caret-green-400"
              placeholder="Type 'help' for commands..."
              autoFocus
              spellCheck={false}
            />
            <div className="w-3 h-6 bg-green-400 animate-pulse shadow-lg"></div>
          </div>

          {/* Command History */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {commandHistory.map((entry, index) => (
              <div key={index} className="border-l-4 border-green-500/30 pl-4 py-2">
                <div className="flex items-center space-x-2 text-gray-400 mb-2">
                  <span className="text-green-400 font-bold">$</span>
                  <span className="text-green-300 font-medium">{entry.command}</span>
                  <span className="text-gray-600 text-sm ml-auto">
                    {entry.timestamp.toLocaleTimeString('en-US', { hour12: false })}
                  </span>
                </div>
                <div className={`font-mono text-sm leading-relaxed ${
                  entry.type === 'error' ? 'text-red-400' :
                  entry.type === 'success' ? 'text-green-400' :
                  'text-cyan-400'
                }`}>
                  {entry.output}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-green-500/50 border-t-0 rounded-b-lg px-6 py-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-8">
              <span className="text-green-400">
                <span className="font-bold">Active:</span>
                <span className="text-green-300 ml-2">overview</span>
              </span>
              <span className="text-blue-400">
                <span className="font-bold">Directory:</span>
                <span className="text-blue-300 ml-2">~</span>
              </span>
              <span className="text-purple-400">
                <span className="font-bold">Sections:</span>
                <span className="text-purple-300 ml-2">15</span>
              </span>
            </div>
            <div className="flex items-center space-x-8">
              <span className="text-cyan-400">
                <span className="font-bold">Network:</span>
                <span className="text-cyan-300 ml-2">CONNECTED</span>
              </span>
              <span className="text-yellow-400">
                <span className="font-bold">Uptime:</span>
                <span className="text-yellow-300 ml-2">00:00:00</span>
              </span>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="mt-8 space-y-8">
          {/* Overview Section */}
          <div id="overview" className="bg-gradient-to-r from-gray-900 to-gray-800 border border-green-500/30 rounded-lg p-8 shadow-2xl">
            <h2 className="text-green-400 font-bold text-2xl mb-6 tracking-wider">📊 PORTFOLIO OVERVIEW</h2>
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 border border-green-500/50 p-6 rounded-lg backdrop-blur-sm hover:border-green-400/70 transition-all duration-300 shadow-lg">
                <div className="text-sm text-green-300 uppercase tracking-wider mb-3 font-bold">TOTAL AUM</div>
                <div className="text-4xl text-green-400 font-mono font-bold mb-2">$926.8M</div>
                <div className="text-sm text-green-300 flex items-center">
                  <span className="mr-2">↗</span>+2.5% MTD
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-500/50 p-6 rounded-lg backdrop-blur-sm hover:border-blue-400/70 transition-all duration-300 shadow-lg">
                <div className="text-sm text-blue-300 uppercase tracking-wider mb-3 font-bold">LIQUID ASSETS</div>
                <div className="text-4xl text-blue-400 font-mono font-bold mb-2">$840.2M</div>
                <div className="text-sm text-blue-300 flex items-center">
                  <span className="mr-2">↗</span>+1.8% MTD
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-900/30 to-red-800/30 border border-red-500/50 p-6 rounded-lg backdrop-blur-sm hover:border-red-400/70 transition-all duration-300 shadow-lg">
                <div className="text-sm text-red-300 uppercase tracking-wider mb-3 font-bold">MONTHLY OUTFLOW</div>
                <div className="text-4xl text-red-400 font-mono font-bold mb-2">$642K</div>
                <div className="text-sm text-red-300 flex items-center">
                  <span className="mr-2">↗</span>+12.3% vs Prior
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-500/50 p-6 rounded-lg backdrop-blur-sm hover:border-purple-400/70 transition-all duration-300 shadow-lg">
                <div className="text-sm text-purple-300 uppercase tracking-wider mb-3 font-bold">CUSTODY ACCOUNTS</div>
                <div className="text-4xl text-purple-400 font-mono font-bold mb-2">12</div>
                <div className="text-sm text-purple-300">No Change</div>
              </div>
            </div>
          </div>

          {/* Other sections */}
          <div id="assets" className="bg-gradient-to-r from-gray-900 to-gray-800 border border-green-500/30 rounded-lg p-8 shadow-2xl">
            <h2 className="text-green-400 font-bold text-2xl mb-4 tracking-wider">💰 ASSET MANAGEMENT</h2>
            <p className="text-green-300 text-lg">Asset allocation and performance tracking system</p>
          </div>

          <div id="analytics" className="bg-gradient-to-r from-gray-900 to-gray-800 border border-green-500/30 rounded-lg p-8 shadow-2xl">
            <h2 className="text-green-400 font-bold text-2xl mb-4 tracking-wider">📈 RISK ANALYTICS</h2>
            <p className="text-green-300 text-lg">Portfolio risk assessment and analytics dashboard</p>
          </div>

          <div id="transactions" className="bg-gradient-to-r from-gray-900 to-gray-800 border border-green-500/30 rounded-lg p-8 shadow-2xl">
            <h2 className="text-green-400 font-bold text-2xl mb-4 tracking-wider">🔄 TRANSACTION HISTORY</h2>
            <p className="text-green-300 text-lg">Multi-chain transaction data and analysis tools</p>
          </div>

          <div id="wallets" className="bg-gradient-to-r from-gray-900 to-gray-800 border border-green-500/30 rounded-lg p-8 shadow-2xl">
            <h2 className="text-green-400 font-bold text-2xl mb-4 tracking-wider">👛 WALLET ADMINISTRATION</h2>
            <p className="text-green-300 text-lg">Wallet portfolio and access control management</p>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes matrix-fall {
          0% { transform: translateY(-100vh); opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }

        @keyframes glow {
          0%, 100% { text-shadow: 0 0 10px #00ff41, 0 0 20px #00ff41; }
          50% { text-shadow: 0 0 20px #00ff41, 0 0 40px #00ff41; }
        }

        .terminal-glow {
          animation: glow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Terminal;
