import React, { useState, useEffect, useRef, useCallback } from 'react';
import AnalyticsOverview from './AnalyticsOverview';
import AssetTracker from './AssetTracker';
import BlockchainData from './BlockchainData';
import TransactionsTable from './TransactionsTable';
import WalletsTable from './WalletsTable';
import WorkingGroupsSpending from './WorkingGroupsSpending';
import ServiceProviderDashboard from './ServiceProviderDashboard';
import ContractsTable from './ContractsTable';
import AddressConnectionDiagram from './AddressConnectionDiagram';
import { walletDirectory } from '../data/walletDirectory';
import ExpendituresTable from './ExpendituresTable';
import EndaomentOverview from './EndaomentOverview';
import EndaomentData from './EndaomentData';
import KarpatkeyReports from './KarpatkeyReports';
import MilestoneTracker from './MilestoneTracker';
import ProjectTracker from './ProjectTracker';
import RealTimeData from './RealTimeData';

// Terminal Section Component
const TerminalSection = ({ id, title, subtitle, children, isExpanded, onToggle, activeSection }) => {
  return (
    <div
      id={id}
      data-terminal-section
      className={`border rounded-lg p-6 transition-all duration-500 backdrop-blur-sm ${
        activeSection === id
          ? 'border-green-400/70 bg-gray-900/60 shadow-lg shadow-green-500/20'
          : 'border-gray-600/50 bg-gray-950/40 hover:border-green-400/50 hover:bg-gray-900/30'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
            activeSection === id ? 'bg-green-400 animate-pulse' : 'bg-gray-600'
          }`}></div>
          <div>
            <h2 className={`font-bold text-lg tracking-wider transition-all duration-300 ${
              activeSection === id ? 'text-green-400 matrix-glow' : 'text-green-300'
            }`}>
              {title}
            </h2>
            <p className="text-green-400/60 text-sm font-medium">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {activeSection === id && (
            <div className="scan-line"></div>
          )}
          <button
            onClick={onToggle}
            className="px-3 py-1 text-xs font-bold border border-green-500/50 text-green-300 hover:bg-green-900/50 hover:border-green-400/70 transition-all duration-300 rounded"
          >
            {isExpanded ? '▼ COLLAPSE' : '▶ EXPAND'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-600/50 pt-6 animate-fadeIn">
          {children}
        </div>
      )}

      {activeSection === id && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="scan-line"></div>
        </div>
      )}
    </div>
  );
};

const Terminal = () => {
  const [command, setCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedSections, setExpandedSections] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const [matrixRain, setMatrixRain] = useState([]);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [commandSuggestions, setCommandSuggestions] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDirectory, setCurrentDirectory] = useState('/ens-treasury');
  const [filesystem, setFilesystem] = useState({
    '/': {
      type: 'directory',
      children: ['ens-treasury']
    },
    '/ens-treasury': {
      type: 'directory',
      children: ['overview', 'assets', 'analytics', 'transactions', 'wallets', 'service-providers', 'address-diagram', 'working-groups', 'contracts', 'expenditures', 'endaoment', 'karpatkey', 'milestones', 'projects', 'realtime']
    },
    '/ens-treasury/overview': { type: 'file', content: 'Portfolio Overview - Treasury composition and key metrics' },
    '/ens-treasury/assets': { type: 'file', content: 'Asset Management - Allocation and performance tracking' },
    '/ens-treasury/analytics': { type: 'file', content: 'Risk Analytics - Portfolio risk assessment and analytics' },
    '/ens-treasury/transactions': { type: 'file', content: 'Transaction History - Multi-chain transaction data' },
    '/ens-treasury/wallets': { type: 'file', content: 'Wallet Administration - Portfolio and access control' },
    '/ens-treasury/service-providers': { type: 'file', content: 'Service Providers - External service management' },
    '/ens-treasury/address-diagram': { type: 'file', content: 'Address Network - Wallet connections and relationships' },
    '/ens-treasury/working-groups': { type: 'file', content: 'Working Groups - Spending and performance analysis' },
    '/ens-treasury/contracts': { type: 'file', content: 'Smart Contracts - Active deployments and interactions' },
    '/ens-treasury/expenditures': { type: 'file', content: 'Expenditure Records - Detailed tracking and categorization' },
    '/ens-treasury/endaoment': { type: 'file', content: 'Endaoment Partnership - Charitable giving initiatives' },
    '/ens-treasury/karpatkey': { type: 'file', content: 'Karpatkey Reports - Professional treasury management' },
    '/ens-treasury/milestones': { type: 'file', content: 'Development Milestones - Project roadmap tracking' },
    '/ens-treasury/projects': { type: 'file', content: 'Active Projects - Current development initiatives' },
    '/ens-treasury/realtime': { type: 'file', content: 'Real-Time Data - Live feeds and monitoring' }
  });

  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const cursorRef = useRef(null);

  // Matrix rain effect
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const drops = Array.from({ length: 30 }, () => ({
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
      speed: Math.random() * 3 + 1,
      char: characters[Math.floor(Math.random() * characters.length)]
    }));

    setMatrixRain(drops);

    const interval = setInterval(() => {
      setMatrixRain(prev => prev.map(drop => ({
        ...drop,
        y: drop.y > (typeof window !== 'undefined' ? window.innerHeight : 1080) ? 0 : drop.y + drop.speed,
        char: characters[Math.floor(Math.random() * characters.length)]
      })));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Typing animation
  const typeText = useCallback(async (text, speed = 50) => {
    setIsTyping(true);
    setTypingText('');

    for (let i = 0; i < text.length; i++) {
      await new Promise(resolve => setTimeout(resolve, speed));
      setTypingText(prev => prev + text[i]);
    }

    setIsTyping(false);
  }, []);

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-terminal-section]');
      let current = '';

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute('id');
        }
      });

      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Enhanced terminal commands
  const commands = {
    help: () => ({
      output: `┌─ Available Commands ──────────────────────────────────────┐
│ help              Display this help message                  │
│ clear             Clear terminal screen                      │
│ ls [path]         List directory contents                    │
│ cd <directory>    Change directory                           │
│ pwd               Print working directory                    │
│ cat <file>        Display file contents                      │
│ grep <pattern>    Search for pattern in current directory    │
│ whoami            Display current user                       │
│ date              Display current date and time              │
│ uptime            Show system uptime                         │
│ status            Display system status                      │
│ expand <section>  Toggle section expansion                   │
│ goto <section>    Navigate to section                        │
│ history           Show command history                       │
│ man <command>     Display manual for command                 │
│ exit              Exit terminal session                      │
└──────────────────────────────────────────────────────────────┘`,
      type: 'info'
    }),

    clear: () => {
      setCommandHistory([]);
      return { output: '\x1b[2J\x1b[H', type: 'system' };
    },

    ls: (args) => {
      const path = args[0] || currentDirectory;
      const entry = filesystem[path];

      if (!entry) {
        return { output: `ls: cannot access '${path}': No such file or directory`, type: 'error' };
      }

      if (entry.type === 'file') {
        return { output: path.split('/').pop(), type: 'info' };
      }

      const contents = entry.children.map(child => {
        const childPath = path === '/' ? `/${child}` : `${path}/${child}`;
        const childEntry = filesystem[childPath];
        const type = childEntry?.type === 'directory' ? 'd' : '-';
        const permissions = childEntry?.type === 'directory' ? 'drwxr-xr-x' : '-rw-r--r--';
        const size = childEntry?.content?.length || 0;
        const modified = new Date().toLocaleDateString();

        return `${type}${permissions} 1 root root ${size.toString().padStart(8)} ${modified} ${child}`;
      }).join('\n');

      return { output: contents || 'total 0', type: 'info' };
    },

    cd: (args) => {
      const path = args[0];

      if (!path || path === '~') {
        setCurrentDirectory('/ens-treasury');
        return { output: '', type: 'success' };
      }

      if (path === '..') {
        const parent = currentDirectory.split('/').slice(0, -1).join('/') || '/';
        setCurrentDirectory(parent);
        return { output: '', type: 'success' };
      }

      if (path === '/') {
        setCurrentDirectory('/');
        return { output: '', type: 'success' };
      }

      const newPath = path.startsWith('/') ? path : `${currentDirectory}/${path}`.replace(/\/+/g, '/');
      const entry = filesystem[newPath];

      if (!entry) {
        return { output: `cd: ${path}: No such file or directory`, type: 'error' };
      }

      if (entry.type !== 'directory') {
        return { output: `cd: ${path}: Not a directory`, type: 'error' };
      }

      setCurrentDirectory(newPath);
      return { output: '', type: 'success' };
    },

    pwd: () => ({
      output: currentDirectory,
      type: 'info'
    }),

    cat: (args) => {
      const path = args[0];
      if (!path) {
        return { output: 'cat: missing file operand', type: 'error' };
      }

      const filePath = path.startsWith('/') ? path : `${currentDirectory}/${path}`.replace(/\/+/g, '/');
      const entry = filesystem[filePath];

      if (!entry) {
        return { output: `cat: ${path}: No such file or directory`, type: 'error' };
      }

      if (entry.type !== 'file') {
        return { output: `cat: ${path}: Is a directory`, type: 'error' };
      }

      return { output: entry.content, type: 'info' };
    },

    whoami: () => ({
      output: 'ens-admin@terminal',
      type: 'info'
    }),

    date: () => ({
      output: currentTime.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      }),
      type: 'info'
    }),

    uptime: () => {
      const uptime = Math.floor((Date.now() - Date.now()) / 1000);
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      return { output: `${hours}:${minutes.toString().padStart(2, '0')} up, 1 user, load average: 0.01, 0.02, 0.03`, type: 'info' };
    },

    status: () => ({
      output: `┌─ System Status ─────────────────────────────────────────┐
│ Active Section: ${activeSection.padEnd(40)} │
│ Current Directory: ${currentDirectory.padEnd(34)} │
│ Total Sections: 15${' '.repeat(39)} │
│ Memory Usage: Normal${' '.repeat(38)} │
│ Network Status: Connected${' '.repeat(35)} │
│ Data Freshness: Real-time${' '.repeat(35)} │
│ Terminal Uptime: ${Math.floor((Date.now() - Date.now()) / 1000)}s${' '.repeat(35)} │
└────────────────────────────────────────────────────────────┘`,
      type: 'info'
    }),

    expand: (args) => {
      const section = args[0];
      if (section) {
        const sectionElement = document.getElementById(section);
        if (sectionElement) {
          setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
          }));
          return { output: `Section ${section} ${!expandedSections[section] ? 'expanded' : 'collapsed'}`, type: 'success' };
        } else {
          return { output: `Section '${section}' not found`, type: 'error' };
        }
      } else {
        return { output: 'Usage: expand <section>', type: 'error' };
      }
    },

    goto: (args) => {
      const section = args[0];
      const sectionElement = document.getElementById(section);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(section);
        return { output: `Navigated to ${section}`, type: 'success' };
      } else {
        return { output: `Section '${section}' not found`, type: 'error' };
      }
    },

    history: () => ({
      output: commandHistory.map((entry, index) =>
        `${(index + 1).toString().padStart(4)}  ${entry.command}`
      ).join('\n') || 'No commands in history',
      type: 'info'
    }),

    man: (args) => {
      const command = args[0];
      if (!command) {
        return { output: 'What manual page do you want?', type: 'error' };
      }

      const manuals = {
        help: 'HELP(1) User Commands HELP(1)\n\nNAME\n    help - display help information\n\nSYNOPSIS\n    help [COMMAND]\n\nDESCRIPTION\n    Display helpful information about builtin commands.',
        ls: 'LS(1) User Commands LS(1)\n\nNAME\n    ls - list directory contents\n\nSYNOPSIS\n    ls [OPTION]... [FILE]...\n\nDESCRIPTION\n    List information about the FILEs (the current directory by default).',
        cd: 'CD(1) User Commands CD(1)\n\nNAME\n    cd - change the current directory\n\nSYNOPSIS\n    cd [DIRECTORY]\n\nDESCRIPTION\n    Change the current directory to DIRECTORY.',
        cat: 'CAT(1) User Commands CAT(1)\n\nNAME\n    cat - concatenate files and print on the standard output\n\nSYNOPSIS\n    cat [OPTION]... [FILE]...\n\nDESCRIPTION\n    Concatenate FILE(s), or standard input, to standard output.'
      };

      return { output: manuals[command] || `No manual entry for ${command}`, type: 'info' };
    },

    exit: () => {
      window.location.reload();
      return { output: 'Logging out...', type: 'warning' };
    }
  };

  // Command auto-completion
  const getSuggestions = (input) => {
    const availableCommands = Object.keys(commands);
    const currentPath = currentDirectory;

    if (!input) return availableCommands.slice(0, 5);

    const suggestions = availableCommands.filter(cmd =>
      cmd.toLowerCase().startsWith(input.toLowerCase())
    );

    return suggestions.slice(0, 5);
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    const [commandName, ...args] = trimmedCmd.split(' ');

    if (commands[commandName]) {
      const result = commands[commandName](args);
      setCommandHistory(prev => [...prev, {
        command: cmd,
        output: result.output,
        type: result.type,
        timestamp: new Date(),
        directory: currentDirectory
      }]);
    } else {
      setCommandHistory(prev => [...prev, {
        command: cmd,
        output: `bash: ${commandName}: command not found`,
        type: 'error',
        timestamp: new Date(),
        directory: currentDirectory
      }]);
    }
  };

  const handleKeyDown = (e) => {
    try {
      if (e.key === 'Enter') {
        if (command.trim()) {
          handleCommand(command);
          setCommand('');
          setHistoryIndex(-1);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
          setHistoryIndex(newIndex);
          setCommand(commandHistory[commandHistory.length - 1 - newIndex]?.command || '');
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setCommand(commandHistory[commandHistory.length - 1 - newIndex]?.command || '');
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setCommand('');
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const suggestions = getSuggestions(command);
        if (suggestions.length === 1) {
          setCommand(suggestions[0]);
        } else if (suggestions.length > 1) {
          setCommandSuggestions(suggestions);
        }
      } else if (e.key === 'Escape') {
        setCommandSuggestions([]);
      }
    } catch (error) {
      console.error('Terminal command error:', error);
      setCommandHistory(prev => [...prev, {
        command: command,
        output: `Error: ${error.message}`,
        type: 'error',
        timestamp: new Date(),
        directory: currentDirectory
      }]);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        {matrixRain.map((drop, index) => (
          <div
            key={index}
            className="absolute text-green-500 text-xs"
            style={{
              left: `${drop.x}px`,
              top: `${drop.y}px`,
              animation: `matrix-fall ${drop.speed}s linear infinite`
            }}
          >
            {drop.char}
          </div>
        ))}
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
              { id: 'wallets', name: 'WALLETS', icon: '👛' },
              { id: 'service-providers', name: 'SERVICES', icon: '🏢' },
              { id: 'address-diagram', name: 'NETWORK', icon: '🔗' },
              { id: 'working-groups', name: 'WORKING', icon: '👥' },
              { id: 'contracts', name: 'CONTRACTS', icon: '📄' },
              { id: 'expenditures', name: 'EXPENSES', icon: '💸' },
              { id: 'endaoment', name: 'ENDAOMENT', icon: '❤️' },
              { id: 'karpatkey', name: 'KARPATKEY', icon: '🔑' },
              { id: 'milestones', name: 'MILESTONES', icon: '🎯' },
              { id: 'projects', name: 'PROJECTS', icon: '🚀' },
              { id: 'realtime', name: 'REALTIME', icon: '⚡' }
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-4 py-2 text-xs font-medium border transition-all duration-300 whitespace-nowrap ${
                  activeSection === section.id
                    ? 'border-green-400 bg-green-900/50 text-green-100 shadow-lg shadow-green-500/20'
                    : 'border-gray-600 hover:border-green-400 text-gray-300 hover:text-green-300 hover:bg-gray-800/50'
                }`}
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
            <div className="text-blue-400 font-bold">{currentDirectory}</div>
            <div className="text-green-300">$</div>
            <input
              ref={inputRef}
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-green-400 outline-none border-none font-mono text-sm"
              placeholder="Type 'help' for commands or press Tab for auto-complete..."
              autoFocus
              spellCheck={false}
            />
            <div
              ref={cursorRef}
              className={`w-2 h-5 bg-green-400 ${isTyping ? 'animate-pulse' : ''}`}
            ></div>
          </div>

          {/* Command Suggestions */}
          {commandSuggestions.length > 0 && (
            <div className="mb-3 p-2 bg-gray-900/50 border border-green-500/30 rounded">
              <div className="text-green-300 text-xs mb-1">Suggestions:</div>
              <div className="flex flex-wrap gap-2">
                {commandSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCommand(suggestion);
                      setCommandSuggestions([]);
                    }}
                    className="px-2 py-1 text-xs bg-green-900/50 text-green-300 border border-green-500/30 rounded hover:bg-green-800/50 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Command History */}
          <div className="max-h-48 overflow-y-auto space-y-2">
            {commandHistory.slice(-10).map((entry, index) => (
              <div key={index} className="text-sm border-l-2 border-gray-700 pl-3">
                <div className="flex items-center space-x-2 text-gray-500 mb-1">
                  <span className="text-green-400">$</span>
                  <span className="text-green-300">{entry.command}</span>
                  <span className="text-gray-600 text-xs">({entry.directory})</span>
                  <span className="text-gray-600 text-xs ml-auto">
                    {entry.timestamp.toLocaleTimeString('en-US', { hour12: false })}
                  </span>
                </div>
                <div className={`whitespace-pre-wrap ${
                  entry.type === 'error' ? 'text-red-400' :
                  entry.type === 'success' ? 'text-green-400' :
                  entry.type === 'warning' ? 'text-yellow-400' :
                  entry.type === 'system' ? 'text-blue-400' :
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
            <span className="text-green-400">Active: <span className="text-green-300 font-bold">{activeSection}</span></span>
            <span className="text-blue-400">Directory: <span className="text-blue-300 font-bold">{currentDirectory}</span></span>
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
          <TerminalSection
            id="overview"
            title="📊 PORTFOLIO OVERVIEW"
            subtitle="Treasury composition and key metrics"
            isExpanded={expandedSections['overview']}
            onToggle={() => toggleSection('overview')}
            activeSection={activeSection}
          >
            <div className="grid grid-cols-4 gap-6 mb-6">
              <div className="bg-gray-900/50 border border-green-500/50 p-6 rounded-lg backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 hover:border-green-400/70">
                <div className="text-sm text-green-300 uppercase tracking-wider mb-2 font-bold">TOTAL AUM</div>
                <div className="text-3xl text-green-400 font-mono font-bold mb-1">$926.8M</div>
                <div className="text-sm text-green-300 flex items-center">
                  <span className="mr-1">↗</span>+2.5% MTD
                </div>
              </div>
              <div className="bg-gray-900/50 border border-green-500/50 p-6 rounded-lg backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 hover:border-green-400/70">
                <div className="text-sm text-green-300 uppercase tracking-wider mb-2 font-bold">LIQUID ASSETS</div>
                <div className="text-3xl text-green-400 font-mono font-bold mb-1">$840.2M</div>
                <div className="text-sm text-green-300 flex items-center">
                  <span className="mr-1">↗</span>+1.8% MTD
                </div>
              </div>
              <div className="bg-gray-900/50 border border-red-500/50 p-6 rounded-lg backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 hover:border-red-400/70">
                <div className="text-sm text-red-300 uppercase tracking-wider mb-2 font-bold">MONTHLY OUTFLOW</div>
                <div className="text-3xl text-red-400 font-mono font-bold mb-1">$642K</div>
                <div className="text-sm text-red-300 flex items-center">
                  <span className="mr-1">↗</span>+12.3% vs Prior
                </div>
              </div>
              <div className="bg-gray-900/50 border border-blue-500/50 p-6 rounded-lg backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 hover:border-blue-400/70">
                <div className="text-sm text-blue-300 uppercase tracking-wider mb-2 font-bold">CUSTODY ACCOUNTS</div>
                <div className="text-3xl text-blue-400 font-mono font-bold mb-1">12</div>
                <div className="text-sm text-blue-300">No Change</div>
              </div>
            </div>
          </TerminalSection>

          {/* Assets Section */}
          <TerminalSection
            id="assets"
            title="💰 ASSET MANAGEMENT"
            subtitle="Asset allocation and performance tracking"
            isExpanded={expandedSections['assets']}
            onToggle={() => toggleSection('assets')}
            activeSection={activeSection}
          >
            <AssetTracker />
          </TerminalSection>

          {/* Analytics Section */}
          <TerminalSection
            id="analytics"
            title="📈 RISK ANALYTICS"
            subtitle="Portfolio risk assessment and analytics"
            isExpanded={expandedSections['analytics']}
            onToggle={() => toggleSection('analytics')}
            activeSection={activeSection}
          >
            <AnalyticsOverview />
          </TerminalSection>

          {/* Transactions Section */}
          <TerminalSection
            id="transactions"
            title="🔄 TRANSACTION HISTORY"
            subtitle="Multi-chain transaction data and analysis"
            isExpanded={expandedSections['transactions']}
            onToggle={() => toggleSection('transactions')}
            activeSection={activeSection}
          >
            <TransactionsTable />
          </TerminalSection>

          {/* Wallets Section */}
          <TerminalSection
            id="wallets"
            title="👛 WALLET ADMINISTRATION"
            subtitle="Wallet portfolio and access control"
            isExpanded={expandedSections['wallets']}
            onToggle={() => toggleSection('wallets')}
            activeSection={activeSection}
          >
            <WalletsTable />
          </TerminalSection>

          {/* Service Providers Section */}
          <TerminalSection
            id="service-providers"
            title="🏢 SERVICE PROVIDERS"
            subtitle="External service provider management"
            isExpanded={expandedSections['service-providers']}
            onToggle={() => toggleSection('service-providers')}
            activeSection={activeSection}
          >
            <ServiceProviderDashboard />
          </TerminalSection>

          {/* Address Diagram Section */}
          <TerminalSection
            id="address-diagram"
            title="🔗 ADDRESS NETWORK"
            subtitle="Wallet address connections and relationships"
            isExpanded={expandedSections['address-diagram']}
            onToggle={() => toggleSection('address-diagram')}
            activeSection={activeSection}
          >
            <AddressConnectionDiagram />
          </TerminalSection>

          {/* Working Groups Section */}
          <TerminalSection
            id="working-groups"
            title="👥 WORKING GROUPS"
            subtitle="Working group spending and performance analysis"
            isExpanded={expandedSections['working-groups']}
            onToggle={() => toggleSection('working-groups')}
            activeSection={activeSection}
          >
            <WorkingGroupsSpending />
          </TerminalSection>

          {/* Contracts Section */}
          <TerminalSection
            id="contracts"
            title="📄 SMART CONTRACTS"
            subtitle="Active smart contract deployments and interactions"
            isExpanded={expandedSections['contracts']}
            onToggle={() => toggleSection('contracts')}
            activeSection={activeSection}
          >
            <ContractsTable />
          </TerminalSection>

          {/* Expenditures Section */}
          <TerminalSection
            id="expenditures"
            title="💸 EXPENDITURE RECORDS"
            subtitle="Detailed expenditure tracking and categorization"
            isExpanded={expandedSections['expenditures']}
            onToggle={() => toggleSection('expenditures')}
            activeSection={activeSection}
          >
            <ExpendituresTable />
          </TerminalSection>

          {/* Endaoment Section */}
          <TerminalSection
            id="endaoment"
            title="❤️ ENDAOMENT PARTNERSHIP"
            subtitle="Charitable giving and social impact initiatives"
            isExpanded={expandedSections['endaoment']}
            onToggle={() => toggleSection('endaoment')}
            activeSection={activeSection}
          >
            <EndaomentOverview />
            <EndaomentData />
          </TerminalSection>

          {/* Karpatkey Section */}
          <TerminalSection
            id="karpatkey"
            title="🔑 KARPATKEY REPORTS"
            subtitle="Professional treasury management and analysis"
            isExpanded={expandedSections['karpatkey']}
            onToggle={() => toggleSection('karpatkey')}
            activeSection={activeSection}
          >
            <KarpatkeyReports />
          </TerminalSection>

          {/* Milestones Section */}
          <TerminalSection
            id="milestones"
            title="🎯 DEVELOPMENT MILESTONES"
            subtitle="Project roadmap and delivery tracking"
            isExpanded={expandedSections['milestones']}
            onToggle={() => toggleSection('milestones')}
            activeSection={activeSection}
          >
            <MilestoneTracker />
          </TerminalSection>

          {/* Projects Section */}
          <TerminalSection
            id="projects"
            title="🚀 ACTIVE PROJECTS"
            subtitle="Current projects and development initiatives"
            isExpanded={expandedSections['projects']}
            onToggle={() => toggleSection('projects')}
            activeSection={activeSection}
          >
            <ProjectTracker />
          </TerminalSection>

          {/* Real-Time Data Section */}
          <TerminalSection
            id="realtime"
            title="⚡ REAL-TIME DATA"
            subtitle="Live data feeds and performance monitoring"
            isExpanded={expandedSections['realtime']}
            onToggle={() => toggleSection('realtime')}
            activeSection={activeSection}
          >
            <RealTimeData />
          </TerminalSection>
        </div>

        {/* CSS Animations */}
        <style>{`
          @keyframes matrix-fall {
            0% { transform: translateY(-100vh); opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
          }

          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }

          @keyframes glow {
            0%, 100% { text-shadow: 0 0 5px #00ff41, 0 0 10px #00ff41, 0 0 15px #00ff41; }
            50% { text-shadow: 0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41; }
          }

          @keyframes scan {
            0% { top: 0; }
            100% { top: 100%; }
          }

          .matrix-glow {
            animation: glow 2s ease-in-out infinite;
          }

          .terminal-cursor {
            animation: blink 1s infinite;
          }

          .scan-line {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #00ff41, transparent);
            animation: scan 3s linear infinite;
          }
        `}</style>
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
