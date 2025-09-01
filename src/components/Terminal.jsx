import React, { useState, useEffect, useRef } from 'react';
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

const Terminal = () => {
  const [command, setCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedSections, setExpandedSections] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
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

  // Terminal commands
  const commands = {
    help: () => ({
      output: `Available commands:
  help                    Show this help message
  clear                   Clear terminal history
  ls                      List available sections
  cd <section>           Navigate to section
  expand <section>       Toggle section expansion
  status                  Show system status
  time                    Show current time
  exit                    Exit terminal mode`,
      type: 'info'
    }),

    clear: () => {
      setCommandHistory([]);
      return { output: 'Terminal cleared.', type: 'success' };
    },

    ls: () => ({
      output: `Available sections:
  overview               Portfolio Overview
  assets                 Asset Management
  analytics              Risk Analytics
  transactions           Transaction History
  wallets                Wallet Administration
  service-providers      Service Providers
  address-diagram        Address Network
  working-groups         Working Groups
  contracts              Smart Contracts
  expenditures           Expenditure Records
  endaoment              Endaoment Partnership
  karpatkey              Karpatkey Reports
  milestones             Development Milestones
  projects               Active Projects
  realtime               Real-Time Data`,
      type: 'info'
    }),

    cd: (args) => {
      const section = args[0];
      const sectionElement = document.getElementById(section);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(section);
        return { output: `Navigated to ${section}`, type: 'success' };
      } else {
        return { output: `Section '${section}' not found. Use 'ls' to see available sections.`, type: 'error' };
      }
    },

    expand: (args) => {
      const section = args[0];
      if (section) {
        setExpandedSections(prev => ({
          ...prev,
          [section]: !prev[section]
        }));
        return { output: `Toggled expansion for ${section}`, type: 'success' };
      } else {
        return { output: 'Please specify a section to expand.', type: 'error' };
      }
    },

    status: () => ({
      output: `System Status:
  Active Section: ${activeSection}
  Total Sections: 15
  System Uptime: ${Math.floor((Date.now() - Date.now()) / 1000)}s
  Memory Usage: Normal
  Network Status: Connected
  Data Freshness: Real-time`,
      type: 'info'
    }),

    time: () => ({
      output: `Current Time: ${currentTime.toLocaleString()}`,
      type: 'info'
    }),

    exit: () => {
      window.location.reload();
      return { output: 'Exiting terminal...', type: 'warning' };
    }
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const [commandName, ...args] = trimmedCmd.split(' ');

    if (commands[commandName]) {
      const result = commands[commandName](args);
      setCommandHistory(prev => [...prev, {
        command: cmd,
        output: result.output,
        type: result.type,
        timestamp: new Date()
      }]);
    } else {
      setCommandHistory(prev => [...prev, {
        command: cmd,
        output: `Command not found: ${commandName}. Type 'help' for available commands.`,
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
      {/* Terminal Header */}
      <div className="bg-gray-900 border-b border-green-500 p-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-green-400 font-bold">
              ENS Treasury Terminal v2.0
            </div>
          </div>
          <div className="text-green-300 text-sm">
            {currentTime.toLocaleTimeString()}
          </div>
        </div>

        {/* Scroll Spy Menu */}
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { id: 'overview', name: 'OVERVIEW' },
            { id: 'assets', name: 'ASSETS' },
            { id: 'analytics', name: 'ANALYTICS' },
            { id: 'transactions', name: 'TXNS' },
            { id: 'wallets', name: 'WALLETS' },
            { id: 'service-providers', name: 'PROVIDERS' },
            { id: 'address-diagram', name: 'NETWORK' },
            { id: 'working-groups', name: 'WORKING' },
            { id: 'contracts', name: 'CONTRACTS' },
            { id: 'expenditures', name: 'EXPENSES' },
            { id: 'endaoment', name: 'ENDAOMENT' },
            { id: 'karpatkey', name: 'KARPATKEY' },
            { id: 'milestones', name: 'MILESTONES' },
            { id: 'projects', name: 'PROJECTS' },
            { id: 'realtime', name: 'REALTIME' }
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`px-3 py-1 text-xs border transition-all duration-200 ${
                activeSection === section.id
                  ? 'border-green-400 bg-green-900 text-green-100'
                  : 'border-gray-600 hover:border-green-400 text-gray-400 hover:text-green-300'
              }`}
            >
              {section.name}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Command Interface */}
      <div className="bg-gray-950 border-b border-gray-700 p-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-green-400">$</span>
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent text-green-400 outline-none border-none"
            placeholder="Type 'help' for commands..."
            autoFocus
          />
        </div>

        {/* Command History */}
        <div className="max-h-32 overflow-y-auto space-y-1">
          {commandHistory.slice(-5).map((entry, index) => (
            <div key={index} className="text-xs">
              <div className="text-gray-500">
                $ {entry.command}
              </div>
              <div className={`${
                entry.type === 'error' ? 'text-red-400' :
                entry.type === 'success' ? 'text-green-400' :
                entry.type === 'warning' ? 'text-yellow-400' :
                'text-blue-400'
              }`}>
                {entry.output}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Content Area */}
        <div className="flex-1 p-6 space-y-8">
          {/* Overview Section */}
          <TerminalSection
            id="overview"
            title="PORTFOLIO OVERVIEW"
            subtitle="Treasury composition and key metrics"
            isExpanded={expandedSections['overview']}
            onToggle={() => toggleSection('overview')}
            activeSection={activeSection}
          >
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-900 border border-green-500 p-4">
                <div className="text-sm text-green-300 uppercase tracking-wider mb-1">TOTAL AUM</div>
                <div className="text-xl text-green-400">$926.8M</div>
                <div className="text-sm text-green-300">+2.5% MTD</div>
              </div>
              <div className="bg-gray-900 border border-green-500 p-4">
                <div className="text-sm text-green-300 uppercase tracking-wider mb-1">LIQUID ASSETS</div>
                <div className="text-xl text-green-400">$840.2M</div>
                <div className="text-sm text-green-300">+1.8% MTD</div>
              </div>
              <div className="bg-gray-900 border border-green-500 p-4">
                <div className="text-sm text-green-300 uppercase tracking-wider mb-1">MONTHLY OUTFLOW</div>
                <div className="text-xl text-green-400">$642K</div>
                <div className="text-sm text-red-400">+12.3% vs Prior</div>
              </div>
              <div className="bg-gray-900 border border-green-500 p-4">
                <div className="text-sm text-green-300 uppercase tracking-wider mb-1">CUSTODY ACCOUNTS</div>
                <div className="text-xl text-green-400">12</div>
                <div className="text-sm text-green-300">No Change</div>
              </div>
            </div>
          </TerminalSection>

          {/* Assets Section */}
          <TerminalSection
            id="assets"
            title="ASSET MANAGEMENT"
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
            title="RISK ANALYTICS"
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
            title="TRANSACTION HISTORY"
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
            title="WALLET ADMINISTRATION"
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
            title="SERVICE PROVIDERS"
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
            title="ADDRESS NETWORK"
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
            title="WORKING GROUPS"
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
            title="SMART CONTRACTS"
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
            title="EXPENDITURE RECORDS"
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
            title="ENDAOMENT PARTNERSHIP"
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
            title="KARPATKEY REPORTS"
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
            title="DEVELOPMENT MILESTONES"
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
            title="ACTIVE PROJECTS"
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
            title="REAL-TIME DATA"
            subtitle="Live data feeds and performance monitoring"
            isExpanded={expandedSections['realtime']}
            onToggle={() => toggleSection('realtime')}
            activeSection={activeSection}
          >
            <RealTimeData />
          </TerminalSection>
        </div>
      </div>
    </div>
  );
};

// Terminal Section Component
const TerminalSection = ({ id, title, subtitle, children, isExpanded, onToggle, activeSection }) => {
  return (
    <div
      id={id}
      data-terminal-section
      className={`border border-gray-700 rounded-lg p-6 transition-all duration-300 ${
        activeSection === id ? 'border-green-500 bg-gray-900/50' : 'border-gray-700 bg-gray-950'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-green-400 font-bold text-lg tracking-wider">{title}</h2>
          <p className="text-green-300 text-sm opacity-75">{subtitle}</p>
        </div>
        <button
          onClick={onToggle}
          className="text-green-400 hover:text-green-300 transition-colors"
        >
          {isExpanded ? 'COLLAPSE' : 'EXPAND'}
        </button>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-700 pt-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default Terminal;
