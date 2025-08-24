import React, { useState } from 'react';
import { 
  serviceProviderData, 
  getCategoryColor, 
  getStatusColor, 
  formatDate 
} from '../data/serviceProviderData';

const ServiceProviderDashboard = ({ expandedSections, toggleSection }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filteredProviders = selectedCategory === 'all' 
    ? serviceProviderData.activeServiceProviders
    : serviceProviderData.activeServiceProviders.filter(p => p.category === selectedCategory);

  const sortedProviders = [...filteredProviders].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'funding':
        return parseInt(b.funding.replace(/[$,]/g, '')) - parseInt(a.funding.replace(/[$,]/g, ''));
      case 'date':
        return new Date(b.applicationDate) - new Date(a.applicationDate);
      case 'views':
        return b.views - a.views;
      default:
        return 0;
    }
  });

  const CollapsibleSection = ({ id, title, subtitle, children, isExpanded, onToggle }) => {
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

  return (
    <div className="space-y-0">
      {/* SPP2 Season Overview */}
      <CollapsibleSection
        id="spp2-overview"
        title="Service Provider Program Season 2 (SPP2)"
        subtitle={`EP 6.13 Implementation • $4.5M Annual Budget • 8 Active Providers • Streaming Infrastructure`}
        isExpanded={expandedSections['spp2-overview']}
        onToggle={toggleSection}
      >
        <div className="space-y-4">
          {/* SPP2 Key Metrics */}
          <div className="grid grid-cols-4 gap-3 py-3 border-b border-slate-200">
            <div className="text-center">
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Annual Budget</div>
              <div className="text-xl font-light text-slate-900">{serviceProviderData.spp2Details.annualBudget}</div>
              <div className="text-xs text-emerald-600">+25% from SPP1</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Active Providers</div>
              <div className="text-xl font-light text-slate-900">{serviceProviderData.spp2Details.totalProviders}</div>
              <div className="text-xs text-slate-600">6 continuing, 2 new</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Monthly Funding</div>
              <div className="text-xl font-light text-slate-900">{serviceProviderData.spp2Details.monthlyFunding}</div>
              <div className="text-xs text-slate-600">Automated streams</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Implementation</div>
              <div className="text-xl font-light text-slate-900">{serviceProviderData.spp2Details.executableProposal}</div>
              <div className="text-xs text-slate-600">Executed June 2025</div>
            </div>
          </div>

          {/* SPP2 Description and Features */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-2">Program Evolution</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                {serviceProviderData.spp2Details.description}
              </p>
              <div className="space-y-2">
                {serviceProviderData.spp2Details.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-slate-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-2">Governance & Implementation</h4>
              <div className="space-y-3">
                {serviceProviderData.spp2Details.governanceLinks.map((link, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-3">
                    <h5 className="text-sm font-medium text-slate-900 mb-1">{link.title}</h5>
                    <p className="text-xs text-slate-600 mb-2">{link.description}</p>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-800 underline"
                    >
                      View Discussion →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Active Service Providers */}
      <CollapsibleSection
        id="active-providers"
        title="Active Service Providers"
        subtitle={`${serviceProviderData.activeServiceProviders.length} providers • $${serviceProviderData.statistics.totalFunding} total funding • ${serviceProviderData.statistics.totalViews} forum views`}
        isExpanded={expandedSections['active-providers']}
        onToggle={toggleSection}
      >
        <div className="space-y-0">
          {/* Filters and Sorting */}
          <div className="flex justify-between items-center py-3 border-b border-slate-200">
            <div className="flex space-x-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-sm border border-slate-300 rounded px-2 py-1"
              >
                <option value="all">All Categories</option>
                {Object.keys(serviceProviderData.categories).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-slate-300 rounded px-2 py-1"
              >
                <option value="name">Name</option>
                <option value="funding">Funding</option>
                <option value="date">Date</option>
                <option value="views">Views</option>
              </select>
            </div>
          </div>

          {/* Provider List */}
          {sortedProviders.map((provider) => (
            <CollapsibleSection
              key={provider.id}
              id={`provider-${provider.id}`}
              title={provider.name}
              subtitle={`${provider.category} • ${provider.funding} • ${provider.status} • ${provider.views} views`}
              isExpanded={expandedSections[`provider-${provider.id}`]}
              onToggle={toggleSection}
            >
              <div className="space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-500 text-sm">Category:</span>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-block w-3 h-3 rounded-full ${getCategoryColor(provider.category)}`}></span>
                      <span className="font-medium text-slate-900">{provider.category}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-sm">Status:</span>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-block w-3 h-3 rounded-full ${getStatusColor(provider.status)}`}></span>
                      <span className="font-medium text-slate-900">{provider.status}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-sm">Funding:</span>
                    <div className="font-medium text-slate-900">{provider.funding}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-sm">Application Date:</span>
                    <div className="font-medium text-slate-900">{formatDate(provider.applicationDate)}</div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <span className="text-slate-500 text-sm">Description:</span>
                  <p className="text-slate-900 mt-1">{provider.description}</p>
                </div>

                {/* Forum Activity */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <span className="text-slate-500 text-sm">Contributors:</span>
                    <div className="font-medium text-slate-900">{provider.contributors.join(', ')}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-sm">Replies:</span>
                    <div className="font-medium text-slate-900">{provider.replies}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-sm">Views:</span>
                    <div className="font-medium text-slate-900">{provider.views}</div>
                  </div>
                </div>

                {/* Forum Link */}
                <div>
                  <a
                    href={provider.forumThread}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Forum Discussion →
                  </a>
                </div>

                {/* Q2 Update Display */}
                {provider.q2Update && (
                  <div className="border-t border-slate-100 pt-3">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="text-sm font-semibold text-blue-900">Q2 2025 Update</h5>
                        <span className="text-xs text-blue-600">{formatDate(provider.q2Update.date)}</span>
                      </div>
                      
                      {/* Achievements */}
                      <div className="mb-4">
                        <h6 className="text-xs font-semibold text-blue-900 uppercase tracking-wider mb-2">Recent Achievements</h6>
                        <ul className="space-y-1">
                          {provider.q2Update.achievements && provider.q2Update.achievements.map ? 
                            provider.q2Update.achievements.map((achievement, index) => (
                              <li key={index} className="text-xs text-blue-800">• {achievement}</li>
                            )) : 
                            <li className="text-xs text-blue-800">• Update available</li>
                          }
                        </ul>
                      </div>

                      {/* Financial Status */}
                      {provider.q2Update.financialStatus && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded">
                          <h6 className="text-xs font-semibold text-green-900 uppercase tracking-wider mb-2">Financial Status</h6>
                          <div className="space-y-1 text-xs">
                            <div><span className="text-green-700">Income:</span> <span className="font-medium">{provider.q2Update.financialStatus.income}</span></div>
                            <div><span className="text-green-700">Expenses:</span> <span className="font-medium">{provider.q2Update.financialStatus.expenses}</span></div>
                            <div><span className="text-green-700">Budget:</span> <span className="font-medium">{provider.q2Update.financialStatus.budget}</span></div>
                          </div>
                        </div>
                      )}

                      {/* SPP2 Results */}
                      {provider.q2Update.spp2Results && (
                        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
                          <h6 className="text-xs font-semibold text-blue-900 uppercase tracking-wider mb-2">SPP2 Results</h6>
                          <div className="space-y-1 text-xs">
                            <div><span className="text-blue-700">Ranking:</span> <span className="font-medium">{provider.q2Update.spp2Results.ranking}</span></div>
                            <div><span className="text-blue-700">Funding:</span> <span className="font-medium">{provider.q2Update.spp2Results.funding}</span></div>
                            <div><span className="text-blue-700">Status:</span> <span className="font-medium text-green-600">{provider.q2Update.spp2Results.status}</span></div>
                          </div>
                        </div>
                      )}

                      {/* Quarterly Metrics */}
                      {provider.q2Update.quarterlyMetrics && (
                        <div className="mb-4">
                          <h6 className="text-xs font-semibold text-blue-900 uppercase tracking-wider mb-2">Q2 Traffic Metrics</h6>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="text-center">
                              <div className="text-lg font-bold text-blue-600">
                                {provider.q2Update.quarterlyMetrics.totalQ2Traffic.toLocaleString()}
                              </div>
                              <div className="text-xs text-blue-700">Total Q2 Requests</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-green-600">99.999%</div>
                              <div className="text-xs text-green-700">Average Uptime</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Monthly Breakdown */}
                      {provider.q2Update.quarterlyMetrics && (
                        <div className="mb-4">
                          <h6 className="text-xs font-semibold text-blue-900 uppercase tracking-wider mb-2">Monthly Breakdown</h6>
                          <div className="space-y-2">
                            {provider.q2Update.quarterlyMetrics.monthlyBreakdown.map((month, index) => (
                              <div key={index} className="bg-white border border-blue-200 rounded p-2">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-xs font-medium text-blue-900">{month.month}</span>
                                  <span className="text-xs text-blue-600">{month.uptime}</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-xs">
                                  <div>
                                    <span className="text-blue-700">Total:</span>
                                    <div className="font-medium">{month.total.toLocaleString()}</div>
                                  </div>
                                  <div>
                                    <span className="text-blue-700">eth.limo:</span>
                                    <div className="font-medium">{month.ethLimo.toLocaleString()}</div>
                                  </div>
                                  <div>
                                    <span className="text-blue-700">eth.link:</span>
                                    <div className="font-medium">{month.ethLink.toLocaleString()}</div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* EIK Features */}
                      {provider.q2Update.achievements?.eik && (
                        <div className="mb-4">
                          <h6 className="text-xs font-semibold text-blue-900 uppercase tracking-wider mb-2">{provider.q2Update.achievements.eik.title}</h6>
                          <ul className="space-y-1">
                            {provider.q2Update.achievements.eik.features.map((feature, index) => (
                              <li key={index} className="text-xs text-blue-800">• {feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* EFP Integrations */}
                      {provider.q2Update.achievements?.efp?.integrations && (
                        <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded">
                          <h6 className="text-xs font-semibold text-purple-900 uppercase tracking-wider mb-2">EFP Integrations</h6>
                          <div className="space-y-1 text-xs">
                            <div><span className="text-purple-700">New:</span> <span className="font-medium">{provider.q2Update.achievements.efp.integrations.new}</span></div>
                            <div><span className="text-purple-700">Total:</span> <span className="font-medium">{provider.q2Update.achievements.efp.integrations.total}</span></div>
                            <div><span className="text-purple-700">Examples:</span> <span className="font-medium">{provider.q2Update.achievements.efp.integrations.examples.join(', ')}</span></div>
                          </div>
                        </div>
                      )}

                      {/* KPIs */}
                      {provider.q2Update.kpis && (
                        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded">
                          <h6 className="text-xs font-semibold text-emerald-900 uppercase tracking-wider mb-2">KPI Achievement</h6>
                          <div className="space-y-1 text-xs">
                            <div><span className="text-emerald-700">Target:</span> <span className="font-medium">{provider.q2Update.kpis.target}</span></div>
                            <div><span className="text-emerald-700">Status:</span> <span className="font-medium text-green-600">{provider.q2Update.kpis.status}</span></div>
                            {provider.q2Update.kpis.details && (
                              <div className="mt-2 space-y-1">
                                <div><span className="text-emerald-700">EFP Integrations:</span> <span className="font-medium">{provider.q2Update.kpis.details.efpIntegrations}</span></div>
                                <div><span className="text-emerald-700">EIK Features:</span> <span className="font-medium">{provider.q2Update.kpis.details.eikFeatures}</span></div>
                                <div><span className="text-emerald-700">EFP Features:</span> <span className="font-medium">{provider.q2Update.kpis.details.efpFeatures}</span></div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Q2 Update Link */}
                      <div className="border-t border-blue-200 pt-3">
                        <a
                          href={provider.q2Update.forumThread}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View Q2 2025 Update →
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CollapsibleSection>
          ))}
        </div>
      </CollapsibleSection>

      {/* Program Updates */}
      <CollapsibleSection
        id="program-updates"
        title="Program Updates & Announcements"
        subtitle={`${serviceProviderData.programUpdates.length} recent updates • Implementation and funding news`}
        isExpanded={expandedSections['program-updates']}
        onToggle={toggleSection}
      >
        <div className="space-y-0">
          {serviceProviderData.programUpdates.map((update) => (
            <CollapsibleSection
              key={update.id}
              id={`update-${update.id}`}
              title={update.title}
              subtitle={`${formatDate(update.date)} • ${update.category} • ${update.replies} replies • ${update.views} views`}
              isExpanded={expandedSections[`update-${update.id}`]}
              onToggle={toggleSection}
            >
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-500 text-sm">Contributors:</span>
                    <div className="font-medium text-slate-900">{update.contributors.join(', ')}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-sm">Category:</span>
                    <div className="font-medium text-slate-900">{update.category}</div>
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 text-sm">Description:</span>
                  <p className="text-slate-900 mt-1">{update.description}</p>
                </div>
                <div>
                  <a
                    href={update.forumThread}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Forum Discussion →
                  </a>
                </div>
              </div>
            </CollapsibleSection>
          ))}
        </div>
      </CollapsibleSection>

      {/* Category Statistics */}
      <CollapsibleSection
        id="category-stats"
        title="Category Statistics"
        subtitle={`${Object.keys(serviceProviderData.categories).length} categories • Funding distribution and provider counts`}
        isExpanded={expandedSections['category-stats']}
        onToggle={toggleSection}
      >
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">Funding by Category</h4>
            <div className="space-y-3">
              {Object.entries(serviceProviderData.categories).map(([category, stats]) => (
                <div key={category} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className={`w-3 h-3 rounded-full ${getCategoryColor(category)}`}></span>
                    <div>
                      <div className="font-medium text-slate-900">{category}</div>
                      <div className="text-sm text-slate-500">{stats.count} providers</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-slate-900">{stats.totalFunding}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">Program Statistics</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 border border-slate-200 rounded-lg">
                  <div className="text-2xl font-light text-slate-900">{serviceProviderData.statistics.totalProviders}</div>
                  <div className="text-sm text-slate-500">Total Providers</div>
                </div>
                <div className="text-center p-3 border border-slate-200 rounded-lg">
                  <div className="text-2xl font-light text-slate-900">{serviceProviderData.statistics.totalFunding}</div>
                  <div className="text-sm text-slate-500">Total Funding</div>
                </div>
                <div className="text-center p-3 border border-slate-200 rounded-lg">
                  <div className="text-2xl font-light text-slate-900">{serviceProviderData.statistics.totalViews}</div>
                  <div className="text-sm text-slate-500">Forum Views</div>
                </div>
                <div className="text-center p-3 border border-slate-200 rounded-lg">
                  <div className="text-2xl font-light text-slate-900">{serviceProviderData.statistics.totalReplies}</div>
                  <div className="text-sm text-slate-500">Total Replies</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Sources */}
      <CollapsibleSection
        id="sources"
        title="Authoritative Sources"
        subtitle={`${serviceProviderData.sources.length} official sources • Governance and documentation links`}
        isExpanded={expandedSections['sources']}
        onToggle={toggleSection}
      >
        <div className="space-y-3">
          {serviceProviderData.sources.map((source, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-3">
              <h4 className="text-sm font-medium text-slate-900 mb-1">{source.title}</h4>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                View Source →
              </a>
            </div>
          ))}
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default ServiceProviderDashboard;
