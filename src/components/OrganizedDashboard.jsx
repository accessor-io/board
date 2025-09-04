import React, { useState, useEffect, useCallback } from 'react';
import { 
  dataOrganizationService, 
  TAB_ORGANIZATION, 
  getTabSections,
  getSectionConfig 
} from '../services/dataOrganization';

// Import all components
import AnalyticsOverview from './AnalyticsOverview';
import AssetTracker from './AssetTracker';
import BlockchainData from './BlockchainData';
import TransactionsTable from './TransactionsTable';
import WalletsTable from './WalletsTable';
import WorkingGroupsSpending from './WorkingGroupsSpending';
import ServiceProviderDashboard from './ServiceProviderDashboard';
import ContractsTable from './ContractsTable';
import AddressConnectionDiagram from './AddressConnectionDiagram';
import ExpendituresTable from './ExpendituresTable';
import EndaomentOverview from './EndaomentOverview';
import EndaomentData from './EndaomentData';
import KarpatkeyReports from './KarpatkeyReports';
import MilestoneTracker from './MilestoneTracker';
import ProjectTracker from './ProjectTracker';
import RealTimeData from './RealTimeData';

const OrganizedDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState({});
  const [tabData, setTabData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataStats, setDataStats] = useState({});

  // Initialize dashboard
  useEffect(() => {
    initializeDashboard();
  }, []);

  // Load tab data when active tab changes
  useEffect(() => {
    loadTabData(activeTab);
  }, [activeTab]);

  const initializeDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load initial tab data
      await loadTabData(activeTab);
      
      // Get cache statistics
      const stats = dataOrganizationService.getCacheStats();
      setDataStats(stats);
      
    } catch (err) {
      console.error('Error initializing dashboard:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadTabData = async (tabId) => {
    try {
      const data = await dataOrganizationService.getTabData(tabId);
      setTabData(prev => ({
        ...prev,
        [tabId]: data
      }));
    } catch (err) {
      console.error(`Error loading tab data for ${tabId}:`, err);
      setError(err.message);
    }
  };

  const toggleSection = useCallback((sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  }, []);

  const refreshSection = async (sectionId) => {
    try {
      await dataOrganizationService.triggerUpdate(sectionId);
      await loadTabData(activeTab);
    } catch (err) {
      console.error(`Error refreshing section ${sectionId}:`, err);
    }
  };

  const renderTabContent = () => {
    const currentTabData = tabData[activeTab];
    
    if (!currentTabData) {
      return <div className="text-center py-8">Loading tab data...</div>;
    }

    switch (activeTab) {
      case 'overview':
        return <OverviewContent 
          tabData={currentTabData}
          expandedSections={expandedSections} 
          toggleSection={toggleSection}
          refreshSection={refreshSection}
        />;
      case 'assets':
        return <AssetManagementContent 
          tabData={currentTabData}
          expandedSections={expandedSections} 
          toggleSection={toggleSection}
          refreshSection={refreshSection}
        />;
      case 'analytics':
        return <RiskAnalyticsContent 
          tabData={currentTabData}
          expandedSections={expandedSections} 
          toggleSection={toggleSection}
          refreshSection={refreshSection}
        />;
      case 'transactions':
        return <TransactionHistoryContent 
          tabData={currentTabData}
          expandedSections={expandedSections} 
          toggleSection={toggleSection}
          refreshSection={refreshSection}
        />;
      case 'wallets':
        return <WalletAdministrationContent 
          tabData={currentTabData}
          expandedSections={expandedSections} 
          toggleSection={toggleSection}
          refreshSection={refreshSection}
        />;
      case 'service-providers':
        return <ServiceProviderDashboard 
          expandedSections={expandedSections} 
          toggleSection={toggleSection} 
        />;
      case 'address-diagram':
        return <AddressConnectionDiagram />;
      default:
        return <OverviewContent 
          tabData={currentTabData}
          expandedSections={expandedSections} 
          toggleSection={toggleSection}
          refreshSection={refreshSection}
        />;
    }
  };

  const renderDataStats = () => {
    return (
      <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-3 mb-4 shadow-sm">
        <div className="flex justify-between items-center text-sm">
          <span className="text-blue-700 font-medium">Data Status</span>
          <div className="flex space-x-4 text-xs text-blue-600">
            <span>Cache: {dataStats.totalEntries || 0} entries</span>
            <span>Subscribers: {dataStats.totalSubscribers || 0}</span>
            <button 
              onClick={() => dataOrganizationService.clearCache()}
              className="text-blue-800 hover:text-blue-900 underline"
            >
              Clear Cache
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading organized dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Error Loading Dashboard</h3>
          <p className="text-slate-600 mb-4">{error}</p>
          <button
            onClick={initializeDashboard}
            className="bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Executive Summary Bar */}
      <div className="bg-white border-b-2 border-slate-300 shadow-sm">
        <div className="px-4 py-3">
          <div className="grid grid-cols-4 gap-3">
            <div className="border-r border-slate-200 pr-4">
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
                TOTAL AUM
              </div>
              <div className="text-xl font-light text-slate-900">$926.8M</div>
              <div className="text-sm text-emerald-600">+2.5% MTD</div>
            </div>
            <div className="border-r border-slate-200 pr-4">
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
                LIQUID ASSETS
              </div>
              <div className="text-xl font-light text-slate-900">$840.2M</div>
              <div className="text-sm text-emerald-600">+1.8% MTD</div>
            </div>
            <div className="border-r border-slate-200 pr-4">
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
                MONTHLY OUTFLOW
              </div>
              <div className="text-xl font-light text-slate-900">$642K</div>
              <div className="text-sm text-slate-600">+12.3% vs Prior</div>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
                CUSTODY ACCOUNTS
              </div>
              <div className="text-xl font-light text-slate-900">12</div>
              <div className="text-sm text-slate-600">No Change</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b-2 border-slate-300 shadow-sm">
        <div className="px-4">
          <nav className="flex space-x-8">
            {Object.entries(TAB_ORGANIZATION).map(([tabId, tabConfig]) => (
              <button
                key={tabId}
                onClick={() => setActiveTab(tabId)}
                className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tabId
                    ? 'border-slate-900 text-slate-900'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {tabConfig.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        {renderDataStats()}
        {renderTabContent()}
      </div>
    </div>
  );
};

// Enhanced CollapsibleSection component with data integration
const CollapsibleSection = ({ 
  id, 
  title, 
  subtitle, 
  children, 
  isExpanded, 
  onToggle, 
  defaultExpanded = false,
  dataStatus = null,
  onRefresh = null 
}) => {
  return (
    <div className="border-b-2 border-slate-300 shadow-sm">
      <button
        onClick={() => onToggle(id)}
        className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors border-l-4 border-transparent hover:border-slate-400"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">{title}</h3>
              {dataStatus && (
                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                  dataStatus === 'live' ? 'bg-gray-100 text-gray-800' :
                  dataStatus === 'cached' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {dataStatus}
                </span>
              )}
            </div>
            {subtitle && <span className="text-sm text-slate-500">{subtitle}</span>}
          </div>
          <div className="flex items-center space-x-2">
            {onRefresh && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRefresh();
                }}
                className="text-slate-400 hover:text-slate-600 p-1"
                title="Refresh data"
              >
                🔄
              </button>
            )}
            <div className="text-slate-400 text-lg">
              {isExpanded ? '−' : '+'}
            </div>
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

// Organized content components
const OverviewContent = ({ tabData, expandedSections, toggleSection, refreshSection }) => {
  return (
    <div className="space-y-0">
      {tabData.sections?.map((section) => (
        <CollapsibleSection
          key={section.id}
          id={section.id}
          title={section.title}
          subtitle={section.subtitle}
          isExpanded={expandedSections[section.id]}
          onToggle={toggleSection}
          dataStatus={section.data ? 'live' : 'cached'}
          onRefresh={() => refreshSection(section.id)}
        >
          <OrganizedSectionContent section={section} />
        </CollapsibleSection>
      ))}
    </div>
  );
};

const AssetManagementContent = ({ tabData, expandedSections, toggleSection, refreshSection }) => {
  return (
    <div className="space-y-0">
      {tabData.sections?.map((section) => (
        <CollapsibleSection
          key={section.id}
          id={section.id}
          title={section.title}
          subtitle={section.subtitle}
          isExpanded={expandedSections[section.id]}
          onToggle={toggleSection}
          dataStatus={section.data ? 'live' : 'cached'}
          onRefresh={() => refreshSection(section.id)}
        >
          <OrganizedSectionContent section={section} />
        </CollapsibleSection>
      ))}
    </div>
  );
};

const RiskAnalyticsContent = ({ tabData, expandedSections, toggleSection, refreshSection }) => {
  return (
    <div className="space-y-0">
      {tabData.sections?.map((section) => (
        <CollapsibleSection
          key={section.id}
          id={section.id}
          title={section.title}
          subtitle={section.subtitle}
          isExpanded={expandedSections[section.id]}
          onToggle={toggleSection}
          dataStatus={section.data ? 'live' : 'cached'}
          onRefresh={() => refreshSection(section.id)}
        >
          <OrganizedSectionContent section={section} />
        </CollapsibleSection>
      ))}
    </div>
  );
};

const TransactionHistoryContent = ({ tabData, expandedSections, toggleSection, refreshSection }) => {
  return (
    <div className="space-y-0">
      {tabData.sections?.map((section) => (
        <CollapsibleSection
          key={section.id}
          id={section.id}
          title={section.title}
          subtitle={section.subtitle}
          isExpanded={expandedSections[section.id]}
          onToggle={toggleSection}
          dataStatus={section.data ? 'live' : 'cached'}
          onRefresh={() => refreshSection(section.id)}
        >
          <OrganizedSectionContent section={section} />
        </CollapsibleSection>
      ))}
    </div>
  );
};

const WalletAdministrationContent = ({ tabData, expandedSections, toggleSection, refreshSection }) => {
  return (
    <div className="space-y-0">
      {tabData.sections?.map((section) => (
        <CollapsibleSection
          key={section.id}
          id={section.id}
          title={section.title}
          subtitle={section.subtitle}
          isExpanded={expandedSections[section.id]}
          onToggle={toggleSection}
          dataStatus={section.data ? 'live' : 'cached'}
          onRefresh={() => refreshSection(section.id)}
        >
          <OrganizedSectionContent section={section} />
        </CollapsibleSection>
      ))}
    </div>
  );
};

// Component that renders the appropriate content based on section ID
const OrganizedSectionContent = ({ section }) => {
  const { id, data } = section;

  // Render different components based on section ID
  switch (id) {
    case 'treasury-composition':
      return <TreasuryCompositionContent data={data} />;
    case 'transaction-activity':
      return <TransactionActivityContent data={data} />;
    case 'working-groups':
      return <WorkingGroupsSpending />;
    case 'strategic-partnerships':
      return <StrategicPartnershipsContent data={data} />;
    case 'asset-tracking':
      return <AssetTracker />;
    case 'asset-allocation':
      return <AssetAllocationContent data={data} />;
    case 'risk-metrics':
      return <RiskMetricsContent data={data} />;
    case 'risk-analysis':
      return <RiskAnalysisContent data={data} />;
    case 'performance-analytics':
      return <PerformanceAnalyticsContent data={data} />;
    case 'trend-analysis':
      return <TrendAnalysisContent data={data} />;
    case 'transaction-history':
      return <TransactionsTable />;
    case 'transaction-analytics':
      return <TransactionAnalyticsContent data={data} />;
    case 'gas-analysis':
      return <GasAnalysisContent data={data} />;
    case 'wallet-overview':
      return <WalletsTable />;
    case 'wallet-permissions':
      return <WalletPermissionsContent data={data} />;
    case 'wallet-activity':
      return <WalletActivityContent data={data} />;
    case 'service-provider-dashboard':
      return <ServiceProviderDashboard />;
    case 'address-connections':
      return <AddressConnectionDiagram />;
    default:
      return <DefaultSectionContent section={section} />;
  }
};

// Individual content components
const TreasuryCompositionContent = ({ data }) => {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
        <div>Asset</div>
        <div className="text-right">Qty</div>
        <div className="text-right">Mkt Val</div>
        <div className="text-right">Alloc</div>
      </div>
      
      {/* Asset details would be rendered here based on data */}
      <div className="text-sm text-slate-600">
        Treasury composition data loaded from {data ? 'live sources' : 'cache'}
      </div>
    </div>
  );
};

const TransactionActivityContent = ({ data }) => {
  return (
    <div className="space-y-2">
      <div className="text-sm text-slate-600">
        Recent transaction activity loaded from {data ? 'live sources' : 'cache'}
      </div>
    </div>
  );
};

const StrategicPartnershipsContent = ({ data }) => {
  return (
    <div className="space-y-4">
      <EndaomentOverview />
      <EndaomentData />
      <KarpatkeyReports />
    </div>
  );
};

const AssetAllocationContent = ({ data }) => {
  return (
    <div className="text-sm text-slate-600">
      Asset allocation data loaded from {data ? 'live sources' : 'cache'}
    </div>
  );
};

const RiskMetricsContent = ({ data }) => {
  return (
    <div className="text-sm text-slate-600">
      Risk metrics data loaded from {data ? 'live sources' : 'cache'}
    </div>
  );
};

const RiskAnalysisContent = ({ data }) => {
  return (
    <div className="text-sm text-slate-600">
      Risk analysis data loaded from {data ? 'live sources' : 'cache'}
    </div>
  );
};

const PerformanceAnalyticsContent = ({ data }) => {
  return (
    <div className="text-sm text-slate-600">
      Performance analytics data loaded from {data ? 'live sources' : 'cache'}
    </div>
  );
};

const TrendAnalysisContent = ({ data }) => {
  return (
    <div className="text-sm text-slate-600">
      Trend analysis data loaded from {data ? 'live sources' : 'cache'}
    </div>
  );
};

const TransactionAnalyticsContent = ({ data }) => {
  return (
    <div className="text-sm text-slate-600">
      Transaction analytics data loaded from {data ? 'live sources' : 'cache'}
    </div>
  );
};

const GasAnalysisContent = ({ data }) => {
  return (
    <div className="text-sm text-slate-600">
      Gas analysis data loaded from {data ? 'live sources' : 'cache'}
    </div>
  );
};

const WalletPermissionsContent = ({ data }) => {
  return (
    <div className="text-sm text-slate-600">
      Wallet permissions data loaded from {data ? 'live sources' : 'cache'}
    </div>
  );
};

const WalletActivityContent = ({ data }) => {
  return (
    <div className="text-sm text-slate-600">
      Wallet activity data loaded from {data ? 'live sources' : 'cache'}
    </div>
  );
};

const DefaultSectionContent = ({ section }) => {
  return (
    <div className="text-sm text-slate-600">
      {section.title} - Data loaded from {section.data ? 'live sources' : 'cache'}
    </div>
  );
};

export default OrganizedDashboard;
