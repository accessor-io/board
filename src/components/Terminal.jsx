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
    help: () => 'Available commands: help, clear, ls, status, time, whoami, date',
    clear: () => {
      setCommandHistory([]);
      return '';
    },
    ls: () => 'overview  assets  analytics  transactions  wallets  contracts',
    status: () => 'System Status: Operational - ENS Treasury Terminal v3.0',
    time: () => currentTime.toLocaleTimeString(),
    whoami: () => 'ens-admin@terminal',
    date: () => currentTime.toLocaleDateString()
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
