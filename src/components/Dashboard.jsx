import React, { useState, useEffect } from 'react';
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

import KarpatkeyReports from './KarpatkeyReports';

import MilestoneTracker from './MilestoneTracker';
import ProjectTracker from './ProjectTracker';
import RealTimeData from './RealTimeData';
// import TreasuryVisualization3D from './TreasuryVisualization3D';


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const tabs = [
    { id: 'overview', name: 'Portfolio Overview' },
    { id: 'assets', name: 'Asset Management' },
    { id: 'analytics', name: 'Risk Analytics' },
    { id: 'transactions', name: 'Transaction History' },
    { id: 'wallets', name: 'Wallet Administration' },
    { id: 'service-providers', name: 'Service Providers' },
    { id: 'address-diagram', name: '🔗 Address Network' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewContent expandedSections={expandedSections} toggleSection={toggleSection} />;
      case '3d-visual':
        return <TreasuryVisualization3D />;
      case 'assets':
        return <AssetManagementContent expandedSections={expandedSections} toggleSection={toggleSection} />;
      case 'analytics':
        return <RiskAnalyticsContent expandedSections={expandedSections} toggleSection={toggleSection} />;
      case 'transactions':
        return <TransactionHistoryContent expandedSections={expandedSections} toggleSection={toggleSection} />;
      case 'wallets':
        return <WalletAdministrationContent expandedSections={expandedSections} toggleSection={toggleSection} />;
      case 'service-providers':
        return <ServiceProviderDashboard expandedSections={expandedSections} toggleSection={toggleSection} />;
      case 'address-diagram':
        return <AddressConnectionDiagram />;
      default:
        return <OverviewContent expandedSections={expandedSections} toggleSection={toggleSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Executive Summary Bar */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-blue-200/50">
        <div className="px-6 py-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="border-r border-blue-200 pr-6">
              <div className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
                TOTAL AUM
              </div>
              <div className="text-2xl font-light text-gray-900">$926.8M</div>
              <div className="text-sm text-emerald-600 font-medium">+2.5% MTD</div>
            </div>
            <div className="border-r border-blue-200 pr-6">
              <div className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
                LIQUID ASSETS
              </div>
              <div className="text-2xl font-light text-gray-900">$840.2M</div>
              <div className="text-sm text-emerald-600 font-medium">+1.8% MTD</div>
            </div>
            <div className="border-r border-blue-200 pr-6">
              <div className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
                MONTHLY OUTFLOW
              </div>
              <div className="text-2xl font-light text-gray-900">$642K</div>
              <div className="text-sm text-gray-600 font-medium">+12.3% vs Prior</div>
            </div>
            <div>
              <div className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
                CUSTODY ACCOUNTS
              </div>
              <div className="text-2xl font-light text-gray-900">12</div>
              <div className="text-sm text-gray-600 font-medium">No Change</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-blue-200/50">
        <div className="px-6">
          <nav className="flex space-x-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-6 border-b-2 font-semibold text-base transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-700'
                    : 'border-transparent text-gray-600 hover:text-blue-800 hover:border-blue-500 hover:bg-blue-100/50'
                }`}
              >
                <div className="text-center">
                  <div className="text-lg font-semibold">{tab.name}</div>
                  {tab.description && (
                    <div className="text-xs text-gray-500 mt-1 font-normal">{tab.description}</div>
                  )}
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        {renderTabContent()}
      </div>
    </div>
  );
};

const CollapsibleSection = ({ id, title, subtitle, children, isExpanded, onToggle, defaultExpanded = false }) => {
  return (
    <div className="border-b border-slate-200">
      <button
        onClick={() => onToggle(id)}
        className="w-full px-4 py-3 text-left hover:bg-slate-25 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">{title}</h3>
            {subtitle && <span className="text-sm text-slate-500">{subtitle}</span>}
          </div>
          <div className="text-slate-400 text-lg">
            {isExpanded ? '−' : '+'}
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );
};

const OverviewContent = ({ expandedSections, toggleSection }) => {
  return (
    <div className="space-y-0">
      {/* Treasury Composition */}
      <CollapsibleSection
        id="treasury-composition"
        title="Treasury Composition"
        subtitle="Asset allocation and holdings breakdown"
        isExpanded={expandedSections['treasury-composition']}
        onToggle={toggleSection}
      >
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
            <div>Asset</div>
            <div className="text-right">Qty</div>
            <div className="text-right">Mkt Val</div>
            <div className="text-right">Alloc</div>
          </div>
          
          <CollapsibleSection
            id="ethereum-details"
            title="Ethereum (ETH)"
            subtitle="61.3% • $567.8M"
            isExpanded={expandedSections['ethereum-details']}
            onToggle={toggleSection}
          >
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>Liquid ETH</div>
                <div className="text-right">180,000.00</div>
                <div className="text-right">$435.6M</div>
                <div className="text-right">46.9%</div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>Staked ETH</div>
                <div className="text-right">54,567.00</div>
                <div className="text-right">$132.2M</div>
                <div className="text-right">14.4%</div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            id="usdc-details"
            title="USD Coin (USDC)"
            subtitle="19.5% • $180.2M"
            isExpanded={expandedSections['usdc-details']}
            onToggle={toggleSection}
          >
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>Operating Reserve</div>
                <div className="text-right">120,000,000</div>
                <div className="text-right">$120.0M</div>
                <div className="text-right">12.9%</div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>Emergency Fund</div>
                <div className="text-right">60,200,000</div>
                <div className="text-right">$60.2M</div>
                <div className="text-right">6.6%</div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            id="ens-details"
            title="Ethereum Name Service (ENS)"
            subtitle="19.2% • $178.6M"
            isExpanded={expandedSections['ens-details']}
            onToggle={toggleSection}
          >
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>Treasury Holdings</div>
                <div className="text-right">10,000,000</div>
                <div className="text-right">$142.9M</div>
                <div className="text-right">15.4%</div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>Governance Reserve</div>
                <div className="text-right">2,500,000</div>
                <div className="text-right">$35.7M</div>
                <div className="text-right">3.8%</div>
              </div>
            </div>
          </CollapsibleSection>
        </div>
      </CollapsibleSection>

      {/* Transaction Activity */}
      <CollapsibleSection
        id="transaction-activity"
        title="Transaction Activity"
        subtitle="Recent treasury movements and operations"
        isExpanded={expandedSections['transaction-activity']}
        onToggle={toggleSection}
      >
        <div className="space-y-0">
          <CollapsibleSection
            id="grants-disbursements"
            title="Grant Disbursements"
            subtitle="4 transactions • $267K total"
            isExpanded={expandedSections['grants-disbursements']}
            onToggle={toggleSection}
          >
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>ENS Labs Development Grant</span>
                <span>$125,000 • 2h ago</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Community Initiatives Fund</span>
                <span>$85,000 • 1d ago</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Developer Tools Funding</span>
                <span>$57,000 • 3d ago</span>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            id="operational-expenses"
            title="Operational Expenses"
            subtitle="6 transactions • $128K total"
            isExpanded={expandedSections['operational-expenses']}
            onToggle={toggleSection}
          >
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Infrastructure - Cloudflare Inc.</span>
                <span>$32,000 • 1d ago</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Legal & Compliance Services</span>
                <span>$18,500 • 2d ago</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Audit & Security Review</span>
                <span>$45,000 • 5d ago</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Marketing & Communications</span>
                <span>$32,500 • 1w ago</span>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            id="delegation-rewards"
            title="Delegation Rewards"
            subtitle="12 transactions • $156K total"
            isExpanded={expandedSections['delegation-rewards']}
            onToggle={toggleSection}
          >
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Community Pool Distribution</span>
                <span>$45,000 • 5h ago</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Validator Rewards</span>
                <span>$35,500 • 12h ago</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Staking Incentives</span>
                <span>$28,750 • 1d ago</span>
              </div>
            </div>
          </CollapsibleSection>
        </div>
      </CollapsibleSection>

      {/* Working Groups Analysis */}
      <CollapsibleSection
        id="working-groups"
        title="Working Groups Financial Analysis"
        subtitle="Q1 2025 expenditure breakdown and performance"
        isExpanded={expandedSections['working-groups']}
        onToggle={toggleSection}
      >
        <WorkingGroupsSpending />
      </CollapsibleSection>

      {/* Contracts & Expenditures */}
      <CollapsibleSection
        id="contracts-expenditures"
        title="Contracts & Expenditures Management"
        subtitle="Smart contract interactions and detailed expenditure tracking"
        isExpanded={expandedSections['contracts-expenditures']}
        onToggle={toggleSection}
      >
        <div className="space-y-0">
          <CollapsibleSection
            id="active-contracts"
            title="Active Smart Contracts"
            subtitle="Contract deployments and management"
            isExpanded={expandedSections['active-contracts']}
            onToggle={toggleSection}
          >
            <ContractsTable />
          </CollapsibleSection>

          <CollapsibleSection
            id="detailed-expenditures"
            title="Detailed Expenditure Records"
            subtitle="Comprehensive spending breakdown and categorization"
            isExpanded={expandedSections['detailed-expenditures']}
            onToggle={toggleSection}
          >
            <ExpendituresTable />
          </CollapsibleSection>
        </div>
      </CollapsibleSection>

      {/* Strategic Partnerships */}
      <CollapsibleSection
        id="strategic-partnerships"
        title="Strategic Partnerships & Initiatives"
        subtitle="Karpatkey reports and ecosystem partnerships"
        isExpanded={expandedSections['strategic-partnerships']}
        onToggle={toggleSection}
      >
        <div className="space-y-0">


          <CollapsibleSection
            id="karpatkey-reports"
            title="Karpatkey Financial Reports"
            subtitle="Professional treasury management and analysis"
            isExpanded={expandedSections['karpatkey-reports']}
            onToggle={toggleSection}
          >
            <KarpatkeyReports />
          </CollapsibleSection>

          <CollapsibleSection
            id="public-goods-funding"
            title="ENS Public Goods Funding Initiative"
            subtitle="Strategic coordination with Ethereum Foundation Funding Team"
            isExpanded={expandedSections['public-goods-funding']}
            onToggle={toggleSection}
          >
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Coordinated Funding Strategy</h3>
                <p className="text-sm text-blue-800 mb-4">
                  ENS Public Goods Working Group has restructured grants to participate in the Ethereum Foundation's 
                  new Funding Coordination team approach, focusing on strategic co-funding of vital public goods organizations.
                </p>
                
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">$343K</div>
                    <div className="text-xs text-blue-700">H1 2025 Budget</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600">$160K</div>
                    <div className="text-xs text-green-700">Strategic Grants</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-600">4</div>
                    <div className="text-xs text-purple-700">Co-Funded Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-orange-600">$550K</div>
                    <div className="text-xs text-orange-700">Total Co-Funding</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-blue-900">H1 2025 Budget Breakdown</h4>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white border border-blue-200 rounded p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-slate-900">Builder Grants</h5>
                        <span className="text-sm font-medium text-green-600">$80K + 23 ETH</span>
                      </div>
                      <p className="text-xs text-slate-600">Platform funding with new USDC flow development</p>
                    </div>
                    <div className="bg-white border border-blue-200 rounded p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-slate-900">Giveth Round</h5>
                        <span className="text-sm font-medium text-green-600">$50K</span>
                      </div>
                      <p className="text-xs text-slate-600">Partnership with Octant (total pool: $80K)</p>
                    </div>
                    <div className="bg-white border border-blue-200 rounded p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-slate-900">Events</h5>
                        <span className="text-sm font-medium text-green-600">$22K</span>
                      </div>
                      <p className="text-xs text-slate-600">ETHDenver and other hackathons</p>
                    </div>
                    <div className="bg-white border border-blue-200 rounded p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-slate-900">Discretionary</h5>
                        <span className="text-sm font-medium text-green-600">$31K</span>
                      </div>
                      <p className="text-xs text-slate-600">Additional opportunities and expenses</p>
                    </div>
                  </div>

                  <h4 className="font-semibold text-blue-900">Co-Funded Projects</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white border border-blue-200 rounded p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-slate-900">Vyper</h5>
                        <span className="text-sm font-medium text-green-600">$50,000</span>
                      </div>
                      <p className="text-xs text-slate-600">Powers $4.7 billion in DeFi protocols with EF matching</p>
                    </div>
                    <div className="bg-white border border-blue-200 rounded p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-slate-900">Remix Labs</h5>
                        <span className="text-sm font-medium text-green-600">$50,000</span>
                      </div>
                      <p className="text-xs text-slate-600">IDE continuity for Ethereum developer onboarding</p>
                    </div>
                    <div className="bg-white border border-blue-200 rounded p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-slate-900">Fabric</h5>
                        <span className="text-sm font-medium text-green-600">$50,000</span>
                      </div>
                      <p className="text-xs text-slate-600">Based rollup standards with 20+ team support</p>
                    </div>
                    <div className="bg-white border border-blue-200 rounded p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-slate-900">Decentralization Research Center</h5>
                        <span className="text-sm font-medium text-green-600">$150,000</span>
                      </div>
                      <p className="text-xs text-slate-600">Policy research with EF matching</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Strategy Benefits</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Eliminates duplicate funding across multiple grant programs</li>
                    <li>• Provides long-term stability instead of 3-month grant cycles</li>
                    <li>• Reduces fundraising overhead for project teams</li>
                    <li>• Ensures critical infrastructure receives adequate support</li>
                  </ul>
                </div>

                <div className="mt-3 pt-3 border-t border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Source:</strong>{' '}
                    <a 
                      href="https://discuss.ens.domains/t/ens-public-goods-aligning-with-the-new-ef-funding-team/21277"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      ENS Public Goods: Aligning with the new EF Funding Team
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleSection>

        </div>
      </CollapsibleSection>

      {/* Project Management */}
      <CollapsibleSection
        id="project-management"
        title="Project Management & Tracking"
        subtitle="Development milestones, project progress, and deliverable tracking"
        isExpanded={expandedSections['project-management']}
        onToggle={toggleSection}
      >
        <div className="space-y-0">
          <CollapsibleSection
            id="development-milestones"
            title="Development Milestones"
            subtitle="Project roadmap and delivery tracking"
            isExpanded={expandedSections['development-milestones']}
            onToggle={toggleSection}
          >
            <MilestoneTracker />
          </CollapsibleSection>

          <CollapsibleSection
            id="active-projects"
            title="Active Project Portfolio"
            subtitle="Current projects and development initiatives"
            isExpanded={expandedSections['active-projects']}
            onToggle={toggleSection}
          >
            <ProjectTracker />
          </CollapsibleSection>
        </div>
      </CollapsibleSection>

      {/* Real-Time Data & Analytics */}
      <CollapsibleSection
        id="realtime-analytics"
        title="Real-Time Data & Analytics"
        subtitle="Live data feeds and performance monitoring"
        isExpanded={expandedSections['realtime-analytics']}
        onToggle={toggleSection}
      >
        <div className="space-y-0">
          <CollapsibleSection
            id="live-data-feeds"
            title="Live Data Feeds"
            subtitle="Real-time market data and treasury metrics"
            isExpanded={expandedSections['live-data-feeds']}
            onToggle={toggleSection}
          >
            <RealTimeData />
          </CollapsibleSection>

          <CollapsibleSection
            id="analytics-overview"
            title="Comprehensive Analytics"
            subtitle="Detailed performance analytics and insights"
            isExpanded={expandedSections['analytics-overview']}
            onToggle={toggleSection}
          >
            <AnalyticsOverview />
          </CollapsibleSection>
        </div>
      </CollapsibleSection>

      {/* Risk Analytics */}
      <CollapsibleSection
        id="risk-analytics"
        title="Risk Analytics"
        subtitle="Portfolio risk assessment and exposure metrics"
        isExpanded={expandedSections['risk-analytics']}
        onToggle={toggleSection}
      >
        <div className="space-y-0">
          <CollapsibleSection
            id="concentration-risk"
            title="Concentration Risk"
            subtitle="Asset concentration and diversification metrics"
            isExpanded={expandedSections['concentration-risk']}
            onToggle={toggleSection}
          >
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Single Asset Max Concentration</span>
                <span>61.3% (ETH)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Top 3 Assets Concentration</span>
                <span>100% (ETH, USDC, ENS)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Diversification Score</span>
                <span>Medium (6.2/10)</span>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            id="liquidity-risk"
            title="Liquidity Risk"
            subtitle="Asset liquidity and market depth analysis"
            isExpanded={expandedSections['liquidity-risk']}
            onToggle={toggleSection}
          >
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Highly Liquid Assets</span>
                <span>80.8% ($748M)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Medium Liquidity Assets</span>
                <span>19.2% ($179M)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Emergency Liquidity Available</span>
                <span>$180.2M (48h access)</span>
              </div>
            </div>
          </CollapsibleSection>
        </div>
      </CollapsibleSection>

      {/* Performance Metrics */}
      <CollapsibleSection
        id="performance-metrics"
        title="Performance Metrics"
        subtitle="Treasury performance and operational KPIs"
        isExpanded={expandedSections['performance-metrics']}
        onToggle={toggleSection}
      >
        <div className="grid grid-cols-4 gap-3">
          <div className="text-center">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Txn Vol</div>
            <div className="text-lg font-light text-slate-900">1,247 (+156 today)</div>
          </div>
          <div className="text-center">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active WGs</div>
            <div className="text-lg font-light text-slate-900">3 (Operational)</div>
          </div>
          <div className="text-center">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Gov Tokens</div>
            <div className="text-lg font-light text-slate-900">25,215 (Q1 2025)</div>
          </div>
          <div className="text-center">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sys Uptime</div>
            <div className="text-lg font-light text-slate-900">99.97% (Operational)</div>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};

const AssetManagementContent = ({ expandedSections, toggleSection }) => {
  return (
    <div className="space-y-0">
      {/* Asset Allocation Strategy */}
      <CollapsibleSection
        id="asset-allocation-strategy"
        title="Asset Allocation Strategy"
        subtitle="Current allocation targets and rebalancing parameters"
        isExpanded={expandedSections['asset-allocation-strategy']}
        onToggle={toggleSection}
      >
        <div className="space-y-0">
          <CollapsibleSection
            id="strategic-allocation"
            title="Strategic Asset Allocation"
            subtitle="Long-term allocation targets and ranges"
            isExpanded={expandedSections['strategic-allocation']}
            onToggle={toggleSection}
          >
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
                <div>Asset Class</div>
                <div className="text-right">Target %</div>
                <div className="text-right">Current %</div>
                <div className="text-right">Status</div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>Core Crypto Assets</div>
                <div className="text-right">60-70%</div>
                <div className="text-right">61.3%</div>
                <div className="text-right text-emerald-600">Within Range</div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>Stablecoins</div>
                <div className="text-right">15-25%</div>
                <div className="text-right">19.5%</div>
                <div className="text-right text-emerald-600">Within Range</div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>Native Tokens</div>
                <div className="text-right">15-25%</div>
                <div className="text-right">19.2%</div>
                <div className="text-right text-emerald-600">Within Range</div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            id="rebalancing-triggers"
            title="Rebalancing Triggers"
            subtitle="Automatic rebalancing thresholds and rules"
            isExpanded={expandedSections['rebalancing-triggers']}
            onToggle={toggleSection}
          >
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>ETH Allocation Threshold</span>
                <span>±5% from target (Currently: +1.3%)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>USDC Reserve Minimum</span>
                <span>$150M (Currently: $180.2M)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>ENS Holdings Cap</span>
                <span>25% maximum (Currently: 19.2%)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Next Rebalancing Review</span>
                <span>April 15, 2025</span>
              </div>
            </div>
          </CollapsibleSection>
        </div>
      </CollapsibleSection>

      {/* Asset Performance */}
      <CollapsibleSection
        id="asset-performance"
        title="Asset Performance Analysis"
        subtitle="Performance metrics and risk-adjusted returns"
        isExpanded={expandedSections['asset-performance']}
        onToggle={toggleSection}
      >
        <div className="space-y-0">
          <CollapsibleSection
            id="performance-summary"
            title="Performance Summary"
            subtitle="YTD and quarterly performance breakdown"
            isExpanded={expandedSections['performance-summary']}
            onToggle={toggleSection}
          >
            <div className="space-y-2">
              <div className="grid grid-cols-5 gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
                <div>Asset</div>
                <div className="text-right">1D</div>
                <div className="text-right">7D</div>
                <div className="text-right">30D</div>
                <div className="text-right">YTD</div>
              </div>
              <div className="grid grid-cols-5 gap-2 text-xs">
                <div>ETH</div>
                <div className="text-right text-emerald-600">+2.1%</div>
                <div className="text-right text-emerald-600">+8.3%</div>
                <div className="text-right text-emerald-600">+12.7%</div>
                <div className="text-right text-emerald-600">+24.2%</div>
              </div>
              <div className="grid grid-cols-5 gap-2 text-xs">
                <div>USDC</div>
                <div className="text-right">0.0%</div>
                <div className="text-right">+0.1%</div>
                <div className="text-right">+0.3%</div>
                <div className="text-right">+1.2%</div>
              </div>
              <div className="grid grid-cols-5 gap-2 text-xs">
                <div>ENS</div>
                <div className="text-right text-emerald-600">+1.8%</div>
                <div className="text-right text-red-600">-3.2%</div>
                <div className="text-right text-emerald-600">+6.1%</div>
                <div className="text-right text-emerald-600">+18.7%</div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            id="risk-metrics"
            title="Risk-Adjusted Performance"
            subtitle="Volatility and risk-adjusted return metrics"
            isExpanded={expandedSections['risk-metrics']}
            onToggle={toggleSection}
          >
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Portfolio Volatility (30D)</span>
                <span>18.2% annualized</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Sharpe Ratio</span>
                <span>1.34 (30D rolling)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Maximum Drawdown</span>
                <span>-12.4% (Last 90 days)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Value at Risk (95%)</span>
                <span>$47.2M (1-day horizon)</span>
              </div>
            </div>
          </CollapsibleSection>
        </div>
      </CollapsibleSection>

      {/* Custody & Security */}
      <CollapsibleSection
        id="custody-security"
        title="Custody & Security Management"
        subtitle="Asset custody, security protocols, and access controls"
        isExpanded={expandedSections['custody-security']}
        onToggle={toggleSection}
      >
        <div className="space-y-0">
          <CollapsibleSection
            id="custody-breakdown"
            title="Custody Breakdown"
            subtitle="Asset distribution across custody solutions"
            isExpanded={expandedSections['custody-breakdown']}
            onToggle={toggleSection}
          >
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
                <div>Custody Type</div>
                <div className="text-right">Assets</div>
                <div className="text-right">Value</div>
                <div className="text-right">Security Level</div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>Multi-Sig Treasury</div>
                <div className="text-right">ETH, ENS</div>
                <div className="text-right">$746.4M</div>
                <div className="text-right text-emerald-600">High</div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>Institutional Custody</div>
                <div className="text-right">USDC</div>
                <div className="text-right">$180.2M</div>
                <div className="text-right text-emerald-600">High</div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            id="security-protocols"
            title="Security Protocols"
            subtitle="Access controls and security procedures"
            isExpanded={expandedSections['security-protocols']}
            onToggle={toggleSection}
          >
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Multi-Signature Threshold</span>
                <span>4 of 7 signers required</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Hardware Security Modules</span>
                <span>7 active HSMs</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Last Security Audit</span>
                <span>January 2025 (Trail of Bits)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Emergency Response Time</span>
                <span>&lt; 2 hours</span>
              </div>
            </div>
          </CollapsibleSection>
        </div>
      </CollapsibleSection>

      {/* Integrated Asset Tracking */}
      <CollapsibleSection
        id="integrated-asset-tracking"
        title="Integrated Asset Tracking System"
        subtitle="Comprehensive asset monitoring and blockchain data analysis"
        isExpanded={expandedSections['integrated-asset-tracking']}
        onToggle={toggleSection}
      >
        <div className="space-y-0">
          <CollapsibleSection
            id="asset-tracker-details"
            title="Detailed Asset Tracking"
            subtitle="Individual asset performance and allocation details"
            isExpanded={expandedSections['asset-tracker-details']}
            onToggle={toggleSection}
          >
            <AssetTracker />
          </CollapsibleSection>

          <CollapsibleSection
            id="blockchain-data-analysis"
            title="Blockchain Data Analysis"
            subtitle="On-chain analytics and transaction pattern analysis"
            isExpanded={expandedSections['blockchain-data-analysis']}
            onToggle={toggleSection}
          >
            <BlockchainData />
          </CollapsibleSection>
        </div>
      </CollapsibleSection>
    </div>
  );
};

const RiskAnalyticsContent = ({ expandedSections, toggleSection }) => {
  return (
    <div className="space-y-0">
      {/* Market Risk Analysis */}
      <CollapsibleSection
        id="market-risk"
        title="Market Risk Analysis"
        subtitle="Price volatility, correlation, and market exposure assessment"
        isExpanded={expandedSections['market-risk']}
        onToggle={toggleSection}
      >
        <div className="space-y-0">
          <CollapsibleSection
            id="volatility-analysis"
            title="Volatility Analysis"
            subtitle="Asset volatility metrics and trend analysis"
            isExpanded={expandedSections['volatility-analysis']}
            onToggle={toggleSection}
          >
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
                <div>Asset</div>
                <div className="text-right">30D Vol</div>
                <div className="text-right">90D Vol</div>
                <div className="text-right">Risk Level</div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>ETH</div>
                <div className="text-right">24.3%</div>
                <div className="text-right">28.1%</div>
                <div className="text-right text-yellow-600">Medium-High</div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>ENS</div>
                <div className="text-right">45.7%</div>
                <div className="text-right">52.3%</div>
                <div className="text-right text-red-600">High</div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>USDC</div>
                <div className="text-right">0.2%</div>
                <div className="text-right">0.3%</div>
                <div className="text-right text-emerald-600">Low</div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            id="correlation-matrix"
            title="Asset Correlation Matrix"
            subtitle="Cross-asset correlation and diversification benefits"
            isExpanded={expandedSections['correlation-matrix']}
            onToggle={toggleSection}
          >
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
                <div>Asset Pair</div>
                <div className="text-right">30D Corr</div>
                <div className="text-right">90D Corr</div>
                <div className="text-right">Diversification</div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>ETH - ENS</div>
                <div className="text-right">0.73</div>
                <div className="text-right">0.68</div>
                <div className="text-right text-yellow-600">Moderate</div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>ETH - USDC</div>
                <div className="text-right">0.02</div>
                <div className="text-right">-0.01</div>
                <div className="text-right text-emerald-600">High</div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>ENS - USDC</div>
                <div className="text-right">0.05</div>
                <div className="text-right">0.03</div>
                <div className="text-right text-emerald-600">High</div>
              </div>
            </div>
          </CollapsibleSection>
        </div>
      </CollapsibleSection>

      {/* Liquidity Risk Assessment */}
      <CollapsibleSection
        id="liquidity-risk-detailed"
        title="Liquidity Risk Assessment"
        subtitle="Market depth analysis and liquidity stress testing"
        isExpanded={expandedSections['liquidity-risk-detailed']}
        onToggle={toggleSection}
      >
        <div className="space-y-0">
          <CollapsibleSection
            id="market-depth"
            title="Market Depth Analysis"
            subtitle="Order book depth and market impact assessment"
            isExpanded={expandedSections['market-depth']}
            onToggle={toggleSection}
          >
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
                <div>Asset</div>
                <div className="text-right">Avg Daily Vol</div>
                <div className="text-right">Market Impact</div>
                <div className="text-right">Liquidity Score</div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>ETH</div>
                <div className="text-right">$15.2B</div>
                <div className="text-right">0.12%</div>
                <div className="text-right text-emerald-600">Excellent</div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>ENS</div>
                <div className="text-right">$85.3M</div>
                <div className="text-right">2.8%</div>
                <div className="text-right text-yellow-600">Good</div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>USDC</div>
                <div className="text-right">$8.7B</div>
                <div className="text-right">0.01%</div>
                <div className="text-right text-emerald-600">Excellent</div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            id="stress-scenarios"
            title="Liquidity Stress Scenarios"
            subtitle="Emergency liquidation scenarios and timeline analysis"
            isExpanded={expandedSections['stress-scenarios']}
            onToggle={toggleSection}
          >
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Emergency Liquidity (24h)</span>
                <span>$180.2M USDC (immediate)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>ETH Liquidation (50%)</span>
                <span>$283.9M in 72h (est. 3.2% slippage)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>ENS Liquidation (25%)</span>
                <span>$44.7M in 168h (est. 8.5% slippage)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Total Liquidity Access</span>
                <span>$508.8M within 1 week</span>
              </div>
            </div>
          </CollapsibleSection>
        </div>
      </CollapsibleSection>

      {/* Operational Risk */}
      <CollapsibleSection
        id="operational-risk"
        title="Operational Risk Management"
        subtitle="Security, custody, and operational risk assessment"
        isExpanded={expandedSections['operational-risk']}
        onToggle={toggleSection}
      >
        <div className="space-y-0">
          <CollapsibleSection
            id="security-risk"
            title="Security Risk Assessment"
            subtitle="Cybersecurity and custody risk evaluation"
            isExpanded={expandedSections['security-risk']}
            onToggle={toggleSection}
          >
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Multi-Sig Security Level</span>
                <span className="text-emerald-600">High (4/7 threshold)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Last Security Incident</span>
                <span>None on record</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Insurance Coverage</span>
                <span>$500M custody insurance</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Key Personnel Risk</span>
                <span className="text-yellow-600">Medium (succession planning active)</span>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            id="governance-risk"
            title="Governance Risk Factors"
            subtitle="DAO governance and decision-making risk assessment"
            isExpanded={expandedSections['governance-risk']}
            onToggle={toggleSection}
          >
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Proposal Success Rate</span>
                <span>78% (last 12 months)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Voter Participation</span>
                <span>45.2% average turnout</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Governance Token Concentration</span>
                <span>Top 10 holders: 23.4%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Emergency Action Capability</span>
                <span className="text-emerald-600">Robust (24h response)</span>
              </div>
            </div>
          </CollapsibleSection>
        </div>
      </CollapsibleSection>
    </div>
  );
};

const TransactionHistoryContent = ({ expandedSections, toggleSection }) => {
  const [selectedChain, setSelectedChain] = useState('ethereum');
  const [selectedAddress, setSelectedAddress] = useState('all');
  const [transactionHistory, setTransactionHistory] = useState({});
  const [loading, setLoading] = useState(false);

  // Etherscan API configuration
  const ETHERSCAN_API_KEY = 'IPBRSM3CCP2GKYECIPMZQZTDNPM1FJTHTX';
  const CHAIN_CONFIGS = {
    ethereum: {
      name: 'Ethereum',
      baseUrl: 'https://api.etherscan.io/api',
      chainId: 1
    },
    optimism: {
      name: 'Optimism',
      baseUrl: 'https://api-optimistic.etherscan.io/api',
      chainId: 10
    },
    arbitrum: {
      name: 'Arbitrum',
      baseUrl: 'https://api.arbiscan.io/api',
      chainId: 42161
    },
    base: {
      name: 'Base',
      baseUrl: 'https://api.basescan.org/api',
      chainId: 8453
    }
  };

  // Helper function to make Etherscan API calls
  const makeEtherscanCall = async (url, params) => {
    try {
      const queryString = new URLSearchParams({
        ...params,
        apikey: ETHERSCAN_API_KEY
      }).toString();
      
      const response = await fetch(`${url}?${queryString}`);
      const data = await response.json();
      
      if (data.status === '0' && data.message !== 'OK') {
        console.error(`Etherscan API error: ${data.message}`);
        return { error: true, message: data.message };
      }
      
      return data;
    } catch (error) {
      console.error(`Etherscan API call failed for ${url}:`, error);
      return { error: true };
    }
  };

  // Fetch transaction history for an address on a specific chain
  const fetchTransactionHistory = async (address, chain) => {
    const config = CHAIN_CONFIGS[chain];
    if (!config) return [];

    try {
      // Get normal transactions
      const normalTxsData = await makeEtherscanCall(config.baseUrl, {
        module: 'account',
        action: 'txlist',
        address: address,
        startblock: 0,
        endblock: 99999999,
        sort: 'desc'
      });

      // Get internal transactions
      const internalTxsData = await makeEtherscanCall(config.baseUrl, {
        module: 'account',
        action: 'txlistinternal',
        address: address,
        startblock: 0,
        endblock: 99999999,
        sort: 'desc'
      });

      // Get ERC20 token transfers
      const erc20TxsData = await makeEtherscanCall(config.baseUrl, {
        module: 'account',
        action: 'tokentx',
        address: address,
        startblock: 0,
        endblock: 99999999,
        sort: 'desc'
      });

      // Get ERC721 token transfers
      const erc721TxsData = await makeEtherscanCall(config.baseUrl, {
        module: 'account',
        action: 'tokennfttx',
        address: address,
        startblock: 0,
        endblock: 99999999,
        sort: 'desc'
      });

      // Process normal transactions
      const normalTxs = (normalTxsData.result || []).map(tx => ({
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: tx.value,
        direction: tx.from.toLowerCase() === address.toLowerCase() ? 'outgoing' : 'incoming',
        blockNumber: parseInt(tx.blockNumber),
        timestamp: parseInt(tx.timeStamp),
        chain: chain,
        chainName: config.name,
        category: 'external',
        asset: 'ETH',
        gasUsed: tx.gasUsed,
        gasPrice: tx.gasPrice,
        nonce: tx.nonce,
        input: tx.input,
        contractAddress: tx.contractAddress,
        cumulativeGasUsed: tx.cumulativeGasUsed,
        gas: tx.gas,
        confirmations: tx.confirmations,
        isError: tx.isError === '1',
        txreceipt_status: tx.txreceipt_status
      }));

      // Process internal transactions
      const internalTxs = (internalTxsData.result || []).map(tx => ({
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: tx.value,
        direction: tx.from.toLowerCase() === address.toLowerCase() ? 'outgoing' : 'incoming',
        blockNumber: parseInt(tx.blockNumber),
        timestamp: parseInt(tx.timeStamp),
        chain: chain,
        chainName: config.name,
        category: 'internal',
        asset: 'ETH',
        gasUsed: tx.gasUsed,
        gasPrice: tx.gasPrice,
        nonce: tx.nonce,
        input: tx.input,
        contractAddress: tx.contractAddress,
        cumulativeGasUsed: tx.cumulativeGasUsed,
        gas: tx.gas,
        confirmations: tx.confirmations,
        isError: tx.isError === '1',
        txreceipt_status: tx.txreceipt_status,
        traceId: tx.traceId,
        type: tx.type
      }));

      // Process ERC20 token transfers
      const erc20Txs = (erc20TxsData.result || []).map(tx => ({
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: tx.value,
        direction: tx.from.toLowerCase() === address.toLowerCase() ? 'outgoing' : 'incoming',
        blockNumber: parseInt(tx.blockNumber),
        timestamp: parseInt(tx.timeStamp),
        chain: chain,
        chainName: config.name,
        category: 'erc20',
        asset: tx.tokenSymbol,
        tokenName: tx.tokenName,
        tokenDecimal: parseInt(tx.tokenDecimal),
        contractAddress: tx.contractAddress,
        gasUsed: tx.gasUsed,
        gasPrice: tx.gasPrice,
        nonce: tx.nonce,
        input: tx.input,
        cumulativeGasUsed: tx.cumulativeGasUsed,
        gas: tx.gas,
        confirmations: tx.confirmations,
        isError: tx.isError === '1',
        txreceipt_status: tx.txreceipt_status
      }));

      // Process ERC721 token transfers
      const erc721Txs = (erc721TxsData.result || []).map(tx => ({
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: tx.value,
        direction: tx.from.toLowerCase() === address.toLowerCase() ? 'outgoing' : 'incoming',
        blockNumber: parseInt(tx.blockNumber),
        timestamp: parseInt(tx.timeStamp),
        chain: chain,
        chainName: config.name,
        category: 'erc721',
        asset: tx.tokenSymbol,
        tokenName: tx.tokenName,
        tokenID: tx.tokenID,
        contractAddress: tx.contractAddress,
        gasUsed: tx.gasUsed,
        gasPrice: tx.gasPrice,
        nonce: tx.nonce,
        input: tx.input,
        cumulativeGasUsed: tx.cumulativeGasUsed,
        gas: tx.gas,
        confirmations: tx.confirmations,
        isError: tx.isError === '1',
        txreceipt_status: tx.txreceipt_status
      }));

      // Combine all transactions and sort by timestamp
      const allTxs = [...normalTxs, ...internalTxs, ...erc20Txs, ...erc721Txs];
      return allTxs.sort((a, b) => b.timestamp - a.timestamp);

    } catch (error) {
      console.error(`Error fetching ${chain} transactions for ${address}:`, error);
      return [];
    }
  };

  // Fetch all transaction history
  const fetchAllTransactionHistory = async () => {
    setLoading(true);
    const allTransactions = {};

    try {
      for (const wallet of walletDirectory) {
        allTransactions[wallet.address] = {};
        
        for (const [chainKey, chainConfig] of Object.entries(CHAIN_CONFIGS)) {
          console.log(`Fetching ${chainConfig.name} transactions for ${wallet.label}...`);
          const transactions = await fetchTransactionHistory(wallet.address, chainKey);
          allTransactions[wallet.address][chainKey] = transactions;
        }
      }

      setTransactionHistory(allTransactions);
    } catch (error) {
      console.error('Error fetching all transaction history:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load transaction history on component mount
  useEffect(() => {
    fetchAllTransactionHistory();
  }, []);

  const getChainColor = (chain) => {
    const colors = {
      'ethereum': 'bg-blue-500',
      'optimism': 'bg-red-500',
      'arbitrum': 'bg-blue-600',
      'base': 'bg-blue-400'
    };
    return colors[chain] || 'bg-gray-500';
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown';
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatValue = (value, asset, decimals = 18) => {
    if (asset === 'ETH') {
      return `${(parseFloat(value) / Math.pow(10, 18)).toFixed(6)} ETH`;
    }
    const formattedValue = (parseFloat(value) / Math.pow(10, decimals)).toLocaleString();
    return `${formattedValue} ${asset}`;
  };

  // Get all transactions for selected filters
  const getAllTransactions = () => {
    const allTxs = [];
    
    Object.entries(transactionHistory).forEach(([address, chains]) => {
      if (selectedAddress === 'all' || address.toLowerCase() === selectedAddress.toLowerCase()) {
        Object.entries(chains).forEach(([chain, transactions]) => {
          if (selectedChain === 'all' || chain === selectedChain) {
            transactions.forEach(tx => {
              const walletInfo = walletDirectory.find(w => w.address.toLowerCase() === address.toLowerCase());
              allTxs.push({
                ...tx,
                walletLabel: walletInfo?.label || 'Unknown',
                walletCategory: walletInfo?.category || 'unknown'
              });
            });
          }
        });
      }
    });

    return allTxs.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  };

  const allTransactions = getAllTransactions();

  return (
    <div className="space-y-0">
      {/* Multi-Chain Transaction Overview */}
      <CollapsibleSection
        id="multi-chain-transactions"
        title="Multi-Chain Transaction History"
        subtitle={`${allTransactions.length} transactions across Ethereum, Optimism, Arbitrum, and Base • Real-time Etherscan API data`}
        isExpanded={expandedSections['multi-chain-transactions']}
        onToggle={toggleSection}
      >
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex flex-wrap gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Filter by Address</label>
              <select
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
                className="border border-slate-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Addresses</option>
                {walletDirectory.map(wallet => (
                  <option key={wallet.address} value={wallet.address}>
                    {wallet.label} ({wallet.category})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Filter by Chain</label>
              <select
                value={selectedChain}
                onChange={(e) => setSelectedChain(e.target.value)}
                className="border border-slate-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Chains</option>
                {Object.entries(CHAIN_CONFIGS).map(([key, config]) => (
                  <option key={key} value={key}>{config.name}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <button
                onClick={fetchAllTransactionHistory}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Refresh Data'}
              </button>
            </div>
          </div>

          {/* Transaction Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 px-2">Wallet</th>
                  <th className="text-left py-2 px-2">Chain</th>
                  <th className="text-left py-2 px-2">Direction</th>
                  <th className="text-left py-2 px-2">From</th>
                  <th className="text-left py-2 px-2">To</th>
                  <th className="text-left py-2 px-2">Value</th>
                  <th className="text-left py-2 px-2">Category</th>
                  <th className="text-left py-2 px-2">Date</th>
                  <th className="text-left py-2 px-2">Block</th>
                </tr>
              </thead>
              <tbody>
                {allTransactions.map((tx, index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-2 px-2">
                      <div>
                        <div className="font-medium text-slate-900">{tx.walletLabel}</div>
                        <div className="text-xs text-slate-500 capitalize">{tx.walletCategory}</div>
                      </div>
                    </td>
                    <td className="py-2 px-2">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getChainColor(tx.chain)}`}></div>
                        <span className="text-xs">{tx.chainName}</span>
                      </div>
                    </td>
                    <td className="py-2 px-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        tx.direction === 'incoming' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {tx.direction}
                      </span>
                    </td>
                    <td className="py-2 px-2">
                      <div className="font-mono text-xs break-all max-w-32">
                        {tx.from}
                      </div>
                    </td>
                    <td className="py-2 px-2">
                      <div className="font-mono text-xs break-all max-w-32">
                        {tx.to}
                      </div>
                    </td>
                    <td className="py-2 px-2">
                      <div className="font-medium">
                        {tx.category === 'erc20' ? 
                          formatValue(tx.value, tx.asset, tx.tokenDecimal) :
                          formatValue(tx.value, tx.asset)
                        }
                      </div>
                      {tx.category === 'erc20' && (
                        <div className="text-xs text-slate-500">{tx.tokenName}</div>
                      )}
                      {tx.category === 'erc721' && (
                        <div className="text-xs text-slate-500">Token ID: {tx.tokenID}</div>
                      )}
                    </td>
                    <td className="py-2 px-2">
                      <div>
                        <span className="text-xs text-slate-500 capitalize">{tx.category}</span>
                        {tx.isError && (
                          <div className="text-xs text-red-600">Failed</div>
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-2">
                      <div className="text-xs text-slate-600">{formatDate(tx.timestamp)}</div>
                    </td>
                    <td className="py-2 px-2">
                      <div className="text-xs text-slate-500">{tx.blockNumber}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {allTransactions.length === 0 && !loading && (
            <div className="text-center py-8">
              <p className="text-slate-500">No transactions found for the selected filters</p>
            </div>
          )}

          {loading && (
            <div className="text-center py-8">
              <p className="text-slate-500">Loading transaction data...</p>
            </div>
          )}
        </div>
      </CollapsibleSection>

      {/* Recent Transactions */}
      <CollapsibleSection
        id="recent-transactions"
        title="Recent Transaction Activity"
        subtitle="Last 30 days • 247 transactions • $892K total volume"
        isExpanded={expandedSections['recent-transactions']}
        onToggle={toggleSection}
      >
        <div className="space-y-0">
          <CollapsibleSection
            id="outbound-transactions"
            title="Outbound Transactions"
            subtitle="Treasury disbursements and operational expenses"
            isExpanded={expandedSections['outbound-transactions']}
            onToggle={toggleSection}
          >
            <div className="space-y-0">
              <CollapsibleSection
                id="grant-payments"
                title="Grant Payments"
                subtitle="15 transactions • $425K total"
                isExpanded={expandedSections['grant-payments']}
                onToggle={toggleSection}
              >
                <div className="space-y-2">
                  <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
                    <div>Recipient</div>
                    <div>Amount</div>
                    <div>Date</div>
                    <div>Status</div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div>ENS Labs Development</div>
                    <div>$125,000</div>
                    <div>2h ago</div>
                    <div className="text-emerald-600">Confirmed</div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div>Community Initiatives</div>
                    <div>$85,000</div>
                    <div>1d ago</div>
                    <div className="text-emerald-600">Confirmed</div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div>Developer Tools Fund</div>
                    <div>$57,000</div>
                    <div>3d ago</div>
                    <div className="text-emerald-600">Confirmed</div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div>Research Grant Program</div>
                    <div>$42,500</div>
                    <div>5d ago</div>
                    <div className="text-emerald-600">Confirmed</div>
                  </div>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                id="operational-expenses-detail"
                title="Operational Expenses"
                subtitle="32 transactions • $187K total"
                isExpanded={expandedSections['operational-expenses-detail']}
                onToggle={toggleSection}
              >
                <div className="space-y-2">
                  <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
                    <div>Category</div>
                    <div>Amount</div>
                    <div>Date</div>
                    <div>Vendor</div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div>Infrastructure</div>
                    <div>$32,000</div>
                    <div>1d ago</div>
                    <div>Cloudflare Inc.</div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div>Security Audit</div>
                    <div>$45,000</div>
                    <div>5d ago</div>
                    <div>Trail of Bits</div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div>Legal Services</div>
                    <div>$18,500</div>
                    <div>2d ago</div>
                    <div>Morrison & Foerster</div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div>Marketing</div>
                    <div>$32,500</div>
                    <div>1w ago</div>
                    <div>Various Agencies</div>
                  </div>
                </div>
              </CollapsibleSection>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            id="inbound-transactions"
            title="Inbound Transactions"
            subtitle="Revenue and token receipts"
            isExpanded={expandedSections['inbound-transactions']}
            onToggle={toggleSection}
          >
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
                <div>Source</div>
                <div>Amount</div>
                <div>Date</div>
                <div>Type</div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>Registration Revenue</div>
                <div>$156,300</div>
                <div>Rolling</div>
                <div>Domain Fees</div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>Staking Rewards</div>
                <div>$78,200</div>
                <div>Daily</div>
                <div>ETH Staking</div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>Ecosystem Contributions</div>
                <div>$25,000</div>
                <div>1w ago</div>
                <div>Partnership</div>
              </div>
            </div>
          </CollapsibleSection>
        </div>
      </CollapsibleSection>

      {/* Transaction Analytics */}
      <CollapsibleSection
        id="transaction-analytics"
        title="Transaction Analytics"
        subtitle="Volume trends, patterns, and forecasting"
        isExpanded={expandedSections['transaction-analytics']}
        onToggle={toggleSection}
      >
        <div className="space-y-0">
          <CollapsibleSection
            id="volume-trends"
            title="Volume Trends"
            subtitle="Transaction volume analysis and patterns"
            isExpanded={expandedSections['volume-trends']}
            onToggle={toggleSection}
          >
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Daily Average Volume</span>
                <span>$29.7K (Last 30 days)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Weekly Trend</span>
                <span className="text-emerald-600">+12.3% increase</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Largest Single Transaction</span>
                <span>$125K (ENS Labs Grant)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Transaction Frequency</span>
                <span>8.2 transactions/day average</span>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            id="spending-categories"
            title="Spending Categories"
            subtitle="Expenditure breakdown by category and trends"
            isExpanded={expandedSections['spending-categories']}
            onToggle={toggleSection}
          >
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
                <div>Category</div>
                <div className="text-right">30D Total</div>
                <div className="text-right">% of Total</div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>Grants & Development</div>
                <div className="text-right">$425,000</div>
                <div className="text-right">47.6%</div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>Operational Expenses</div>
                <div className="text-right">$187,000</div>
                <div className="text-right">21.0%</div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>Delegation Rewards</div>
                <div className="text-right">$156,000</div>
                <div className="text-right">17.5%</div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>Emergency Reserve</div>
                <div className="text-right">$124,000</div>
                <div className="text-right">13.9%</div>
              </div>
            </div>
          </CollapsibleSection>
        </div>
      </CollapsibleSection>

      {/* Transaction Monitoring */}
      <CollapsibleSection
        id="transaction-monitoring"
        title="Transaction Monitoring & Compliance"
        subtitle="Risk monitoring, compliance checks, and audit trails"
        isExpanded={expandedSections['transaction-monitoring']}
        onToggle={toggleSection}
      >
        <div className="space-y-0">
          <CollapsibleSection
            id="compliance-status"
            title="Compliance Status"
            subtitle="Regulatory compliance and monitoring alerts"
            isExpanded={expandedSections['compliance-status']}
            onToggle={toggleSection}
          >
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>AML Screening Status</span>
                <span className="text-emerald-600">All Clear (247/247 checked)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Sanctions Screening</span>
                <span className="text-emerald-600">No Matches</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Large Transaction Alerts</span>
                <span>3 flagged (&gt;$100K, all approved)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Audit Trail Completeness</span>
                <span className="text-emerald-600">100% documented</span>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            id="risk-monitoring"
            title="Transaction Risk Monitoring"
            subtitle="Real-time risk assessment and anomaly detection"
            isExpanded={expandedSections['risk-monitoring']}
            onToggle={toggleSection}
          >
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Anomaly Detection</span>
                <span className="text-emerald-600">No anomalies detected</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Velocity Checks</span>
                <span className="text-emerald-600">Within normal ranges</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Pattern Analysis</span>
                <span>Normal operational patterns</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Next Risk Review</span>
                <span>Daily automated scan</span>
              </div>
            </div>
          </CollapsibleSection>
        </div>
      </CollapsibleSection>

      {/* Detailed Transaction Data */}
      <CollapsibleSection
        id="detailed-transaction-data"
        title="Detailed Transaction Data"
        subtitle="Comprehensive transaction records and analysis"
        isExpanded={expandedSections['detailed-transaction-data']}
        onToggle={toggleSection}
      >
        <TransactionsTable />
      </CollapsibleSection>
    </div>
  );
};

const WalletAdministrationContent = ({ expandedSections, toggleSection }) => {
  return (
    <div className="space-y-0">
      {/* Wallet Overview */}
      <CollapsibleSection
        id="wallet-overview"
        title="Wallet Portfolio Overview"
        subtitle="12 active wallets • $926.8M total value • Multi-signature security"
        isExpanded={expandedSections['wallet-overview']}
        onToggle={toggleSection}
      >
        <div className="space-y-0">
          <CollapsibleSection
            id="primary-treasury"
            title="Primary Treasury Wallets"
            subtitle="Main treasury holdings and core asset management"
            isExpanded={expandedSections['primary-treasury']}
            onToggle={toggleSection}
          >
            <div className="space-y-0">
              <CollapsibleSection
                id="main-treasury-wallet"
                title="Main Treasury Wallet"
                subtitle="0x...4a8f • $746.4M • ETH + ENS holdings"
                isExpanded={expandedSections['main-treasury-wallet']}
                onToggle={toggleSection}
              >
                <div className="space-y-2">
                  <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
                    <div>Asset</div>
                    <div className="text-right">Balance</div>
                    <div className="text-right">Value</div>
                    <div className="text-right">Last Activity</div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div>ETH</div>
                    <div className="text-right">234,567.00</div>
                    <div className="text-right">$567.8M</div>
                    <div className="text-right">2h ago</div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div>ENS</div>
                    <div className="text-right">12,500,000</div>
                    <div className="text-right">$178.6M</div>
                    <div className="text-right">5d ago</div>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-3 mt-3">
                  <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Security Configuration</h5>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Multi-Sig Threshold</span>
                      <span>4 of 7 signers</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Active Signers</span>
                      <span>7 authorized</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Last Signature Activity</span>
                      <span>2h ago (Grant approval)</span>
                    </div>
                  </div>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                id="stablecoin-treasury"
                title="Stablecoin Treasury"
                subtitle="0x...7b2c • $180.2M • USDC reserves"
                isExpanded={expandedSections['stablecoin-treasury']}
                onToggle={toggleSection}
              >
                <div className="space-y-2">
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div>USDC</div>
                    <div className="text-right">180,200,000</div>
                    <div className="text-right">$180.2M</div>
                    <div className="text-right">1d ago</div>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-3 mt-3">
                  <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Custody Details</h5>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Custody Provider</span>
                      <span>Coinbase Custody</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Insurance Coverage</span>
                      <span>$500M FDIC + Private</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Withdrawal Timeframe</span>
                      <span>T+1 settlement</span>
                    </div>
                  </div>
                </div>
              </CollapsibleSection>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            id="operational-wallets"
            title="Operational Wallets"
            subtitle="Day-to-day operations and specific use cases"
            isExpanded={expandedSections['operational-wallets']}
            onToggle={toggleSection}
          >
            <div className="space-y-0">
              <CollapsibleSection
                id="grants-wallet"
                title="Grants Distribution Wallet"
                subtitle="0x...3d5e • $2.8M • Grant payments and disbursements"
                isExpanded={expandedSections['grants-wallet']}
                onToggle={toggleSection}
              >
                <div className="space-y-2">
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div>ETH</div>
                    <div className="text-right">945.23</div>
                    <div className="text-right">$2.3M</div>
                    <div className="text-right">2h ago</div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div>USDC</div>
                    <div className="text-right">500,000</div>
                    <div className="text-right">$500K</div>
                    <div className="text-right">1d ago</div>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-3 mt-3">
                  <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Recent Activity</h5>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>ENS Labs Payment</span>
                      <span>$125K sent</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Community Fund</span>
                      <span>$85K sent</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Developer Tools</span>
                      <span>$57K sent</span>
                    </div>
                  </div>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                id="operations-wallet"
                title="Operations Wallet"
                subtitle="0x...9f1a �� $856K • Day-to-day operational expenses"
                isExpanded={expandedSections['operations-wallet']}
                onToggle={toggleSection}
              >
                <div className="space-y-2">
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div>ETH</div>
                    <div className="text-right">234.56</div>
                    <div className="text-right">$568K</div>
                    <div className="text-right">1d ago</div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div>USDC</div>
                    <div className="text-right">288,000</div>
                    <div className="text-right">$288K</div>
                    <div className="text-right">2d ago</div>
                  </div>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                id="staking-wallet"
                title="ETH Staking Wallet"
                subtitle="0x...6c8b • $132.2M • Ethereum staking operations"
                isExpanded={expandedSections['staking-wallet']}
                onToggle={toggleSection}
              >
                <div className="space-y-2">
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div>Staked ETH</div>
                    <div className="text-right">54,567.00</div>
                    <div className="text-right">$132.2M</div>
                    <div className="text-right">Continuous</div>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-3 mt-3">
                  <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Staking Details</h5>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Validators</span>
                      <span>1,705 active</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>APR</span>
                      <span>3.8% current</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Monthly Rewards</span>
                      <span>~$416K</span>
                    </div>
                  </div>
                </div>
              </CollapsibleSection>
            </div>
          </CollapsibleSection>
        </div>
      </CollapsibleSection>

      {/* Access Control & Security */}
      <CollapsibleSection
        id="access-control"
        title="Access Control & Security"
        subtitle="Multi-signature management and authorization protocols"
        isExpanded={expandedSections['access-control']}
        onToggle={toggleSection}
      >
        <div className="space-y-0">
          <CollapsibleSection
            id="signer-management"
            title="Authorized Signers"
            subtitle="Multi-signature wallet signer administration"
            isExpanded={expandedSections['signer-management']}
            onToggle={toggleSection}
          >
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
                <div>Signer</div>
                <div>Role</div>
                <div>Last Activity</div>
                <div>Status</div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>Board Member #1</div>
                <div>Primary</div>
                <div>2h ago</div>
                <div className="text-emerald-600">Active</div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>Board Member #2</div>
                <div>Primary</div>
                <div>1d ago</div>
                <div className="text-emerald-600">Active</div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>Technical Lead</div>
                <div>Operations</div>
                <div>5h ago</div>
                <div className="text-emerald-600">Active</div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>Treasury Manager</div>
                <div>Financial</div>
                <div>12h ago</div>
                <div className="text-emerald-600">Active</div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>Security Officer</div>
                <div>Security</div>
                <div>3d ago</div>
                <div className="text-emerald-600">Active</div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            id="transaction-approvals"
            title="Transaction Approval Workflow"
            subtitle="Pending approvals and signature requirements"
            isExpanded={expandedSections['transaction-approvals']}
            onToggle={toggleSection}
          >
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
                <div>Transaction</div>
                <div>Amount</div>
                <div>Signatures</div>
                <div>Status</div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>Research Grant #47</div>
                <div>$42,500</div>
                <div>3/4</div>
                <div className="text-yellow-600">Pending</div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>Infrastructure Payment</div>
                <div>$18,000</div>
                <div>2/4</div>
                <div className="text-yellow-600">Pending</div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            id="security-monitoring"
            title="Security Monitoring"
            subtitle="Real-time security monitoring and threat detection"
            isExpanded={expandedSections['security-monitoring']}
            onToggle={toggleSection}
          >
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Failed Login Attempts</span>
                <span>0 (Last 24h)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Suspicious Activity</span>
                <span className="text-emerald-600">None detected</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Last Security Scan</span>
                <span>15 minutes ago</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Wallet Security Score</span>
                <span className="text-emerald-600">98/100 (Excellent)</span>
              </div>
            </div>
          </CollapsibleSection>
        </div>
      </CollapsibleSection>

      {/* Wallet Performance */}
      <CollapsibleSection
        id="wallet-performance"
        title="Wallet Performance & Analytics"
        subtitle="Performance tracking and cost analysis"
        isExpanded={expandedSections['wallet-performance']}
        onToggle={toggleSection}
      >
        <div className="space-y-0">
          <CollapsibleSection
            id="transaction-costs"
            title="Transaction Cost Analysis"
            subtitle="Gas fees and transaction cost optimization"
            isExpanded={expandedSections['transaction-costs']}
            onToggle={toggleSection}
          >
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Total Gas Fees (30D)</span>
                <span>$12,847</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Average Gas Price</span>
                <span>23.4 gwei</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Cost Optimization Savings</span>
                <span>$3,240 saved (batching)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Failed Transactions</span>
                <span>2 (0.8% failure rate)</span>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            id="wallet-utilization"
            title="Wallet Utilization"
            subtitle="Usage patterns and optimization opportunities"
            isExpanded={expandedSections['wallet-utilization']}
            onToggle={toggleSection}
          >
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Active Wallets</span>
                <span>12 of 12 (100%)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Idle Balance Optimization</span>
                <span>$1.2M earning yield</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Cross-wallet Efficiency</span>
                <span>94.2% optimal allocation</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Rebalancing Needed</span>
                <span className="text-emerald-600">None required</span>
              </div>
            </div>
          </CollapsibleSection>
        </div>
      </CollapsibleSection>

      {/* Comprehensive Wallet Data */}
      <CollapsibleSection
        id="comprehensive-wallet-data"
        title="Comprehensive Wallet Data"
        subtitle="Detailed wallet information and management tools"
        isExpanded={expandedSections['comprehensive-wallet-data']}
        onToggle={toggleSection}
      >
        <WalletsTable />
      </CollapsibleSection>
    </div>
  );
};

export default Dashboard;
