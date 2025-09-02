import React, { useState, useEffect } from 'react';

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
│   transactions    Show transaction history                  │
│   wallets         Show wallet administration                │
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

    transactions: () => `┌─ TRANSACTION HISTORY ─────────────────────────────────┐
│                                                              │
│  RECENT TRANSACTIONS (Last 30 days):                        │
│                                                              │
│  OUTBOUND TRANSACTIONS:                                     │
│  • Grant Payments:       $425K (15 transactions)           │
│  • Operational Expenses: $187K (32 transactions)           │
│  • Delegation Rewards:   $156K (12 transactions)           │
│                                                              │
│  INBOUND TRANSACTIONS:                                      │
│  • Registration Revenue: $156K (rolling)                    │
│  • Staking Rewards:      $78K (daily)                       │
│  • Ecosystem Contributions: $25K                           │
│                                                              │
│  TRANSACTION METRICS:                                       │
│  • Daily Average Volume: $29.7K                            │
│  • Weekly Trend: +12.3% increase                           │
│  • Largest Transaction: $125K (ENS Labs Grant)             │
│  • Transaction Frequency: 8.2 per day                      │
│                                                              │
│  COMPLIANCE STATUS:                                         │
│  • AML Screening: All Clear (247/247 checked)              │
│  • Sanctions Screening: No Matches                         │
│  • Audit Trail: 100% documented                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘`,

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
    const trimmedCmd = cmd.trim().toLowerCase();
    const [commandName] = trimmedCmd.split(' ');

    if (commands[commandName]) {
      const result = commands[commandName]();
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
