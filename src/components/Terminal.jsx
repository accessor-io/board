import React, { useState, useEffect } from 'react';

// Simple Terminal Component
const Terminal = () => {
  const [command, setCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const commands = {
    help: () => 'Available commands: help, clear, ls, status, time',
    clear: () => {
      setCommandHistory([]);
      return '';
    },
    ls: () => 'overview  assets  analytics  transactions  wallets',
    status: () => 'System Status: Operational',
    time: () => currentTime.toLocaleTimeString()
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const [commandName] = trimmedCmd.split(' ');

    if (commands[commandName]) {
      const result = commands[commandName]();
      setCommandHistory(prev => [...prev, {
        command: cmd,
        output: result,
        type: 'info',
        timestamp: new Date()
      }]);
    } else {
      setCommandHistory(prev => [...prev, {
        command: cmd,
        output: `Command not found: ${commandName}`,
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
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="text-green-500 text-xs absolute top-10 left-10">
          {Array.from({ length: 20 }, (_, i) => '█').join('')}
        </div>
      </div>

      {/* Terminal Window */}
      <div className="relative z-10 min-h-screen bg-gray-950/95 backdrop-blur-sm border border-green-500/30 shadow-2xl">
        {/* Terminal Header */}
        <div className="bg-gray-900/95 border-b border-green-500/50 p-3 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:bg-red-400 transition-colors"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer hover:bg-yellow-400 transition-colors"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full cursor-pointer hover:bg-green-400 transition-colors"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-green-400 font-bold text-lg tracking-wider">
                ╭─ ENS Treasury Terminal v3.0 ──────────────────────────────╮
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-300">CONNECTED</span>
            </div>
            <div className="text-green-400 border-l border-green-500/30 pl-4">
              {currentTime.toLocaleTimeString('en-US', { hour12: false })}
            </div>
          </div>
        </div>

        {/* Enhanced Navigation Bar */}
        <div className="bg-gray-900/80 border-b border-green-500/30 p-3 overflow-x-auto">
          <div className="flex space-x-1 min-w-max">
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
                className="px-4 py-2 text-xs font-medium border border-gray-600 hover:border-green-400 text-gray-300 hover:text-green-300 hover:bg-gray-800/50 transition-all duration-300 whitespace-nowrap"
              >
                <span className="mr-2">{section.icon}</span>
                {section.name}
              </button>
            ))}
          </div>
        </div>

        {/* Command Interface */}
        <div className="bg-gray-950/50 border-b border-green-500/20 p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="text-green-400 font-bold">ens-admin@terminal</div>
            <div className="text-green-300">:</div>
            <div className="text-blue-400 font-bold">~</div>
            <div className="text-green-300">$</div>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent text-green-400 outline-none border-none font-mono text-sm"
              placeholder="Type 'help' for commands..."
              autoFocus
              spellCheck={false}
            />
            <div className="w-2 h-5 bg-green-400 animate-pulse"></div>
          </div>

          {/* Command History */}
          <div className="max-h-48 overflow-y-auto space-y-2">
            {commandHistory.slice(-10).map((entry, index) => (
              <div key={index} className="text-sm border-l-2 border-gray-700 pl-3">
                <div className="flex items-center space-x-2 text-gray-500 mb-1">
                  <span className="text-green-400">$</span>
                  <span className="text-green-300">{entry.command}</span>
                  <span className="text-gray-600 text-xs ml-auto">
                    {entry.timestamp.toLocaleTimeString('en-US', { hour12: false })}
                  </span>
                </div>
                <div className={`whitespace-pre-wrap ${
                  entry.type === 'error' ? 'text-red-400' :
                  entry.type === 'success' ? 'text-green-400' :
                  entry.type === 'warning' ? 'text-yellow-400' :
                  'text-cyan-400'
                }`}>
                  {entry.output}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-gray-900/30 border-b border-green-500/20 px-4 py-2 flex justify-between items-center text-xs">
          <div className="flex items-center space-x-6">
            <span className="text-green-400">Active: <span className="text-green-300 font-bold">overview</span></span>
            <span className="text-blue-400">Directory: <span className="text-blue-300 font-bold">~</span></span>
            <span className="text-purple-400">Sections: <span className="text-purple-300 font-bold">15</span></span>
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-cyan-400">Network: <span className="text-cyan-300">CONNECTED</span></span>
            <span className="text-yellow-400">Uptime: <span className="text-yellow-300">00:00:00</span></span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-8">
            {/* Overview Section */}
            <div id="overview" className="border border-gray-600 rounded-lg p-6 bg-gray-950/40">
              <h2 className="text-green-400 font-bold text-lg tracking-wider mb-4">📊 PORTFOLIO OVERVIEW</h2>
              <div className="grid grid-cols-4 gap-6 mb-6">
                <div className="bg-gray-900/50 border border-green-500/50 p-6 rounded-lg backdrop-blur-sm">
                  <div className="text-sm text-green-300 uppercase tracking-wider mb-2 font-bold">TOTAL AUM</div>
                  <div className="text-3xl text-green-400 font-mono font-bold mb-1">$926.8M</div>
                  <div className="text-sm text-green-300">+2.5% MTD</div>
                </div>
                <div className="bg-gray-900/50 border border-blue-500/50 p-6 rounded-lg backdrop-blur-sm">
                  <div className="text-sm text-blue-300 uppercase tracking-wider mb-2 font-bold">LIQUID ASSETS</div>
                  <div className="text-3xl text-blue-400 font-mono font-bold mb-1">$840.2M</div>
                  <div className="text-sm text-blue-300">+1.8% MTD</div>
                </div>
                <div className="bg-gray-900/50 border border-red-500/50 p-6 rounded-lg backdrop-blur-sm">
                  <div className="text-sm text-red-300 uppercase tracking-wider mb-2 font-bold">MONTHLY OUTFLOW</div>
                  <div className="text-3xl text-red-400 font-mono font-bold mb-1">$642K</div>
                  <div className="text-sm text-red-300">+12.3% vs Prior</div>
                </div>
                <div className="bg-gray-900/50 border border-purple-500/50 p-6 rounded-lg backdrop-blur-sm">
                  <div className="text-sm text-purple-300 uppercase tracking-wider mb-2 font-bold">CUSTODY ACCOUNTS</div>
                  <div className="text-3xl text-purple-400 font-mono font-bold mb-1">12</div>
                  <div className="text-sm text-purple-300">No Change</div>
                </div>
              </div>
            </div>

            {/* Placeholder sections for other content */}
            <div id="assets" className="border border-gray-600 rounded-lg p-6 bg-gray-950/40">
              <h2 className="text-green-400 font-bold text-lg tracking-wider mb-4">💰 ASSET MANAGEMENT</h2>
              <p className="text-green-300">Asset allocation and performance tracking</p>
            </div>

            <div id="analytics" className="border border-gray-600 rounded-lg p-6 bg-gray-950/40">
              <h2 className="text-green-400 font-bold text-lg tracking-wider mb-4">📈 RISK ANALYTICS</h2>
              <p className="text-green-300">Portfolio risk assessment and analytics</p>
            </div>

            <div id="transactions" className="border border-gray-600 rounded-lg p-6 bg-gray-950/40">
              <h2 className="text-green-400 font-bold text-lg tracking-wider mb-4">🔄 TRANSACTION HISTORY</h2>
              <p className="text-green-300">Multi-chain transaction data and analysis</p>
            </div>

            <div id="wallets" className="border border-gray-600 rounded-lg p-6 bg-gray-950/40">
              <h2 className="text-green-400 font-bold text-lg tracking-wider mb-4">👛 WALLET ADMINISTRATION</h2>
              <p className="text-green-300">Wallet portfolio and access control</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Error Boundary Component
class TerminalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Terminal Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-400 text-2xl mb-4">TERMINAL ERROR</div>
            <div className="text-green-300 mb-4">A terminal error has occurred</div>
            <div className="text-gray-400 text-sm mb-6 max-w-md">
              {this.state.error?.message || 'Unknown error'}
            </div>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-2 bg-green-900 border border-green-500 text-green-300 hover:bg-green-800 transition-colors"
            >
              RESTART TERMINAL
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function TerminalWithErrorBoundary() {
  return (
    <TerminalErrorBoundary>
      <Terminal />
    </TerminalErrorBoundary>
  );
}
