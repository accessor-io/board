import React, { useState } from 'react';
import { 
  serviceProviderData, 
  getCategoryColor, 
  getStatusColor, 
  formatDate 
} from '../data/serviceProviderData';
import { componentClasses } from '../styles/designSystem';

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
    const styles = componentClasses.serviceProvider;
    return (
      <div className={styles.collapsibleSection}>
        <button
          onClick={() => onToggle(id)}
          className={styles.collapsibleButton}
        >
          <div className={styles.collapsibleHeader}>
            <div>
              <h3 className={styles.collapsibleTitle}>{title}</h3>
              {subtitle && <span className={styles.collapsibleSubtitle}>{subtitle}</span>}
            </div>
            <div className={styles.collapsibleIcon}>
              {isExpanded ? '−' : '+'}
            </div>
          </div>
        </button>
        
        {isExpanded && (
          <div className={styles.collapsibleContent}>
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={componentClasses.serviceProvider.container}>
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
          <div className={componentClasses.serviceProvider.metricsGrid}>
            <div className={componentClasses.serviceProvider.metricItem}>
              <div className={componentClasses.serviceProvider.metricLabel}>Annual Budget</div>
              <div className={componentClasses.serviceProvider.metricValue}>{serviceProviderData.spp2Details.annualBudget}</div>
              <div className={componentClasses.serviceProvider.metricSubtext}>+25% from SPP1</div>
            </div>
            <div className={componentClasses.serviceProvider.metricItem}>
              <div className={componentClasses.serviceProvider.metricLabel}>Active Providers</div>
              <div className={componentClasses.serviceProvider.metricValue}>{serviceProviderData.spp2Details.totalProviders}</div>
              <div className={componentClasses.serviceProvider.metricSubtext}>6 continuing, 2 new</div>
            </div>
            <div className={componentClasses.serviceProvider.metricItem}>
              <div className={componentClasses.serviceProvider.metricLabel}>Monthly Funding</div>
              <div className={componentClasses.serviceProvider.metricValue}>{serviceProviderData.spp2Details.monthlyFunding}</div>
              <div className={componentClasses.serviceProvider.metricSubtext}>Automated streams</div>
            </div>
            <div className={componentClasses.serviceProvider.metricItem}>
              <div className={componentClasses.serviceProvider.metricLabel}>Implementation</div>
              <div className={componentClasses.serviceProvider.metricValue}>{serviceProviderData.spp2Details.executableProposal}</div>
              <div className={componentClasses.serviceProvider.metricSubtext}>Executed June 2025</div>
            </div>
          </div>

          {/* SPP2 Description and Features */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-black mb-2">Program Evolution</h4>
              <p className="text-black text-sm leading-relaxed mb-3">
                {serviceProviderData.spp2Details.description}
              </p>
              <div className="space-y-2">
                {serviceProviderData.spp2Details.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-black">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-black mb-2">Governance & Implementation</h4>
              <div className="space-y-3">
                {serviceProviderData.spp2Details.governanceLinks.map((link, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <h5 className="text-sm font-medium text-black mb-1">{link.title}</h5>
                    <p className="text-xs text-black mb-2">{link.description}</p>
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
          <div className={componentClasses.serviceProvider.filtersContainer}>
            <div className={componentClasses.serviceProvider.filtersLeft}>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={componentClasses.serviceProvider.filterSelect}
              >
                <option value="all">All Categories</option>
                {Object.keys(serviceProviderData.categories).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className={componentClasses.serviceProvider.filtersRight}>
              <span className={componentClasses.serviceProvider.filterLabel}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={componentClasses.serviceProvider.filterSelect}
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
                <div className={componentClasses.serviceProvider.infoGrid}>
                  <div className={componentClasses.serviceProvider.infoItem}>
                    <span className={componentClasses.serviceProvider.infoLabel}>Category:</span>
                    <div className={componentClasses.serviceProvider.infoValueContainer}>
                      <span className={`${componentClasses.serviceProvider.infoDot} ${getCategoryColor(provider.category)}`}></span>
                      <span className={componentClasses.serviceProvider.infoValue}>{provider.category}</span>
                    </div>
                  </div>
                  <div className={componentClasses.serviceProvider.infoItem}>
                    <span className={componentClasses.serviceProvider.infoLabel}>Status:</span>
                    <div className={componentClasses.serviceProvider.infoValueContainer}>
                      <span className={`${componentClasses.serviceProvider.infoDot} ${getStatusColor(provider.status)}`}></span>
                      <span className={componentClasses.serviceProvider.infoValue}>{provider.status}</span>
                    </div>
                  </div>
                  <div className={componentClasses.serviceProvider.infoItem}>
                    <span className={componentClasses.serviceProvider.infoLabel}>Funding:</span>
                    <div className={componentClasses.serviceProvider.infoValue}>{provider.funding}</div>
                  </div>
                  <div className={componentClasses.serviceProvider.infoItem}>
                    <span className={componentClasses.serviceProvider.infoLabel}>Application Date:</span>
                    <div className={componentClasses.serviceProvider.infoValue}>{formatDate(provider.applicationDate)}</div>
                  </div>
                </div>

                {/* Description */}
                <div className={componentClasses.serviceProvider.description}>
                  <span className={componentClasses.serviceProvider.descriptionLabel}>Description:</span>
                  <p className={componentClasses.serviceProvider.descriptionText}>{provider.description}</p>
                </div>

                {/* Forum Activity */}
                <div className={componentClasses.serviceProvider.forumGrid}>
                  <div className={componentClasses.serviceProvider.forumItem}>
                    <span className={componentClasses.serviceProvider.forumLabel}>Contributors:</span>
                    <div className={componentClasses.serviceProvider.forumValue}>{provider.contributors.join(', ')}</div>
                  </div>
                  <div className={componentClasses.serviceProvider.forumItem}>
                    <span className={componentClasses.serviceProvider.forumLabel}>Replies:</span>
                    <div className={componentClasses.serviceProvider.forumValue}>{provider.replies}</div>
                  </div>
                  <div className={componentClasses.serviceProvider.forumItem}>
                    <span className={componentClasses.serviceProvider.forumLabel}>Views:</span>
                    <div className={componentClasses.serviceProvider.forumValue}>{provider.views}</div>
                  </div>
                </div>

                {/* Forum Link */}
                <div>
                  <a
                    href={provider.forumThread}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={componentClasses.serviceProvider.link}
                  >
                    View Forum Discussion →
                  </a>
                </div>

                {/* Q2 Update Display */}
                {provider.q2Update && (
                  <div className={componentClasses.serviceProvider.q2Update}>
                    <div className={componentClasses.serviceProvider.q2UpdateContainer}>
                      <div className={componentClasses.serviceProvider.q2UpdateHeader}>
                        <h5 className={componentClasses.serviceProvider.q2UpdateTitle}>Q2 2025 Update</h5>
                        <span className={componentClasses.serviceProvider.q2UpdateDate}>{formatDate(provider.q2Update.date)}</span>
                      </div>
                      
                      {/* Achievements */}
                      <div className={componentClasses.serviceProvider.q2UpdateSection}>
                        <h6 className={componentClasses.serviceProvider.q2UpdateSectionTitle}>Recent Achievements</h6>
                        <ul className={componentClasses.serviceProvider.q2UpdateList}>
                          {provider.q2Update.achievements && provider.q2Update.achievements.map ? 
                            provider.q2Update.achievements.map((achievement, index) => (
                              <li key={index} className={componentClasses.serviceProvider.q2UpdateListItem}>• {achievement}</li>
                            )) : 
                            <li className={componentClasses.serviceProvider.q2UpdateListItem}>• Update available</li>
                          }
                        </ul>
                      </div>

                      {/* Financial Status */}
                      {provider.q2Update.financialStatus && (
                        <div className={componentClasses.serviceProvider.financialStatus}>
                          <h6 className={componentClasses.serviceProvider.financialStatusTitle}>Financial Status</h6>
                          <div className={componentClasses.serviceProvider.financialStatusGrid}>
                            <div className={componentClasses.serviceProvider.financialStatusItem}>
                              <span className={componentClasses.serviceProvider.financialStatusLabel}>Income:</span> 
                              <span className={componentClasses.serviceProvider.financialStatusValue}>{provider.q2Update.financialStatus.income}</span>
                            </div>
                            <div className={componentClasses.serviceProvider.financialStatusItem}>
                              <span className={componentClasses.serviceProvider.financialStatusLabel}>Expenses:</span> 
                              <span className={componentClasses.serviceProvider.financialStatusValue}>{provider.q2Update.financialStatus.expenses}</span>
                            </div>
                            <div className={componentClasses.serviceProvider.financialStatusItem}>
                              <span className={componentClasses.serviceProvider.financialStatusLabel}>Budget:</span> 
                              <span className={componentClasses.serviceProvider.financialStatusValue}>{provider.q2Update.financialStatus.budget}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SPP2 Results */}
                      {provider.q2Update.spp2Results && (
                        <div className={componentClasses.serviceProvider.spp2Results}>
                          <h6 className={componentClasses.serviceProvider.spp2ResultsTitle}>SPP2 Results</h6>
                          <div className={componentClasses.serviceProvider.spp2ResultsGrid}>
                            <div className={componentClasses.serviceProvider.spp2ResultsItem}>
                              <span className={componentClasses.serviceProvider.spp2ResultsLabel}>Ranking:</span> 
                              <span className={componentClasses.serviceProvider.spp2ResultsValue}>{provider.q2Update.spp2Results.ranking}</span>
                            </div>
                            <div className={componentClasses.serviceProvider.spp2ResultsItem}>
                              <span className={componentClasses.serviceProvider.spp2ResultsLabel}>Funding:</span> 
                              <span className={componentClasses.serviceProvider.spp2ResultsValue}>{provider.q2Update.spp2Results.funding}</span>
                            </div>
                            <div className={componentClasses.serviceProvider.spp2ResultsItem}>
                              <span className={componentClasses.serviceProvider.spp2ResultsLabel}>Status:</span> 
                              <span className={`${componentClasses.serviceProvider.spp2ResultsValue} text-green-600`}>{provider.q2Update.spp2Results.status}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Quarterly Metrics */}
                      {provider.q2Update.quarterlyMetrics && (
                        <div className={componentClasses.serviceProvider.quarterlyMetrics}>
                          <h6 className={componentClasses.serviceProvider.quarterlyMetricsTitle}>Q2 Traffic Metrics</h6>
                          <div className={componentClasses.serviceProvider.quarterlyMetricsGrid}>
                            <div className={componentClasses.serviceProvider.quarterlyMetricsItem}>
                              <div className={componentClasses.serviceProvider.quarterlyMetricsValue}>
                                {provider.q2Update.quarterlyMetrics.totalQ2Traffic.toLocaleString()}
                              </div>
                              <div className={componentClasses.serviceProvider.quarterlyMetricsLabel}>Total Q2 Requests</div>
                            </div>
                            <div className={componentClasses.serviceProvider.quarterlyMetricsItem}>
                              <div className={componentClasses.serviceProvider.quarterlyMetricsValue}>99.999%</div>
                              <div className={componentClasses.serviceProvider.quarterlyMetricsLabel}>Average Uptime</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Monthly Breakdown */}
                      {provider.q2Update.quarterlyMetrics && (
                        <div className={componentClasses.serviceProvider.monthlyBreakdown}>
                          <h6 className={componentClasses.serviceProvider.monthlyBreakdownTitle}>Monthly Breakdown</h6>
                          <div className={componentClasses.serviceProvider.monthlyBreakdownList}>
                            {provider.q2Update.quarterlyMetrics.monthlyBreakdown.map((month, index) => (
                              <div key={index} className={componentClasses.serviceProvider.monthlyBreakdownItem}>
                                <div className={componentClasses.serviceProvider.monthlyBreakdownHeader}>
                                  <span className={componentClasses.serviceProvider.monthlyBreakdownMonth}>{month.month}</span>
                                  <span className={componentClasses.serviceProvider.monthlyBreakdownUptime}>{month.uptime}</span>
                                </div>
                                <div className={componentClasses.serviceProvider.monthlyBreakdownGrid}>
                                  <div className={componentClasses.serviceProvider.monthlyBreakdownGridItem}>
                                    <span className={componentClasses.serviceProvider.monthlyBreakdownGridLabel}>Total:</span>
                                    <div className={componentClasses.serviceProvider.monthlyBreakdownGridValue}>{month.total.toLocaleString()}</div>
                                  </div>
                                  <div className={componentClasses.serviceProvider.monthlyBreakdownGridItem}>
                                    <span className={componentClasses.serviceProvider.monthlyBreakdownGridLabel}>eth.limo:</span>
                                    <div className={componentClasses.serviceProvider.monthlyBreakdownGridValue}>{month.ethLimo.toLocaleString()}</div>
                                  </div>
                                  <div className={componentClasses.serviceProvider.monthlyBreakdownGridItem}>
                                    <span className={componentClasses.serviceProvider.monthlyBreakdownGridLabel}>eth.link:</span>
                                    <div className={componentClasses.serviceProvider.monthlyBreakdownGridValue}>{month.ethLink.toLocaleString()}</div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* EIK Features */}
                      {provider.q2Update.achievements?.eik && (
                        <div className={componentClasses.serviceProvider.eikFeatures}>
                          <h6 className={componentClasses.serviceProvider.eikFeaturesTitle}>{provider.q2Update.achievements.eik.title}</h6>
                          <ul className={componentClasses.serviceProvider.eikFeaturesList}>
                            {provider.q2Update.achievements.eik.features.map((feature, index) => (
                              <li key={index} className={componentClasses.serviceProvider.eikFeaturesItem}>• {feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* EFP Integrations */}
                      {provider.q2Update.achievements?.efp?.integrations && (
                        <div className={componentClasses.serviceProvider.efpIntegrations}>
                          <h6 className={componentClasses.serviceProvider.efpIntegrationsTitle}>EFP Integrations</h6>
                          <div className={componentClasses.serviceProvider.efpIntegrationsGrid}>
                            <div className={componentClasses.serviceProvider.efpIntegrationsItem}>
                              <span className={componentClasses.serviceProvider.efpIntegrationsLabel}>New:</span> 
                              <span className={componentClasses.serviceProvider.efpIntegrationsValue}>{provider.q2Update.achievements.efp.integrations.new}</span>
                            </div>
                            <div className={componentClasses.serviceProvider.efpIntegrationsItem}>
                              <span className={componentClasses.serviceProvider.efpIntegrationsLabel}>Total:</span> 
                              <span className={componentClasses.serviceProvider.efpIntegrationsValue}>{provider.q2Update.achievements.efp.integrations.total}</span>
                            </div>
                            <div className={componentClasses.serviceProvider.efpIntegrationsItem}>
                              <span className={componentClasses.serviceProvider.efpIntegrationsLabel}>Examples:</span> 
                              <span className={componentClasses.serviceProvider.efpIntegrationsValue}>{provider.q2Update.achievements.efp.integrations.examples.join(', ')}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* KPIs */}
                      {provider.q2Update.kpis && (
                        <div className={componentClasses.serviceProvider.kpis}>
                          <h6 className={componentClasses.serviceProvider.kpisTitle}>KPI Achievement</h6>
                          <div className={componentClasses.serviceProvider.kpisGrid}>
                            <div className={componentClasses.serviceProvider.kpisItem}>
                              <span className={componentClasses.serviceProvider.kpisLabel}>Target:</span> 
                              <span className={componentClasses.serviceProvider.kpisValue}>{provider.q2Update.kpis.target}</span>
                            </div>
                            <div className={componentClasses.serviceProvider.kpisItem}>
                              <span className={componentClasses.serviceProvider.kpisLabel}>Status:</span> 
                              <span className={`${componentClasses.serviceProvider.kpisValue} text-green-600`}>{provider.q2Update.kpis.status}</span>
                            </div>
                            {provider.q2Update.kpis.details && (
                              <div className={componentClasses.serviceProvider.kpisDetails}>
                                <div className={componentClasses.serviceProvider.kpisItem}>
                                  <span className={componentClasses.serviceProvider.kpisLabel}>EFP Integrations:</span> 
                                  <span className={componentClasses.serviceProvider.kpisValue}>{provider.q2Update.kpis.details.efpIntegrations}</span>
                                </div>
                                <div className={componentClasses.serviceProvider.kpisItem}>
                                  <span className={componentClasses.serviceProvider.kpisLabel}>EIK Features:</span> 
                                  <span className={componentClasses.serviceProvider.kpisValue}>{provider.q2Update.kpis.details.eikFeatures}</span>
                                </div>
                                <div className={componentClasses.serviceProvider.kpisItem}>
                                  <span className={componentClasses.serviceProvider.kpisLabel}>EFP Features:</span> 
                                  <span className={componentClasses.serviceProvider.kpisValue}>{provider.q2Update.kpis.details.efpFeatures}</span>
                                </div>
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
                          className={componentClasses.serviceProvider.link}
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
        <div className={componentClasses.serviceProvider.updatesList}>
          {serviceProviderData.programUpdates.map((update) => (
            <CollapsibleSection
              key={update.id}
              id={`update-${update.id}`}
              title={update.title}
              subtitle={`${formatDate(update.date)} • ${update.category} • ${update.replies} replies • ${update.views} views`}
              isExpanded={expandedSections[`update-${update.id}`]}
              onToggle={toggleSection}
            >
              <div className={componentClasses.serviceProvider.updateContent}>
                <div className={componentClasses.serviceProvider.updateGrid}>
                  <div className={componentClasses.serviceProvider.updateItem}>
                    <span className={componentClasses.serviceProvider.updateLabel}>Contributors:</span>
                    <div className={componentClasses.serviceProvider.updateValue}>{update.contributors.join(', ')}</div>
                  </div>
                  <div className={componentClasses.serviceProvider.updateItem}>
                    <span className={componentClasses.serviceProvider.updateLabel}>Category:</span>
                    <div className={componentClasses.serviceProvider.updateValue}>{update.category}</div>
                  </div>
                </div>
                <div className={componentClasses.serviceProvider.updateDescription}>
                  <span className={componentClasses.serviceProvider.updateDescriptionLabel}>Description:</span>
                  <p className={componentClasses.serviceProvider.updateDescriptionText}>{update.description}</p>
                </div>
                <div>
                  <a
                    href={update.forumThread}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={componentClasses.serviceProvider.link}
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
        <div className={componentClasses.serviceProvider.categoryStats}>
          <div className={componentClasses.serviceProvider.categoryStatsSection}>
            <h4 className={componentClasses.serviceProvider.categoryStatsTitle}>Funding by Category</h4>
            <div className={componentClasses.serviceProvider.categoryStatsList}>
              {Object.entries(serviceProviderData.categories).map(([category, stats]) => (
                <div key={category} className={componentClasses.serviceProvider.categoryStatsItem}>
                  <div className={componentClasses.serviceProvider.categoryStatsLeft}>
                    <span className={`w-3 h-3 rounded-full ${getCategoryColor(category)}`}></span>
                    <div>
                      <div className={componentClasses.serviceProvider.categoryStatsName}>{category}</div>
                      <div className={componentClasses.serviceProvider.categoryStatsCount}>{stats.count} providers</div>
                    </div>
                  </div>
                  <div className={componentClasses.serviceProvider.categoryStatsRight}>
                    <div className={componentClasses.serviceProvider.categoryStatsFunding}>{stats.totalFunding}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={componentClasses.serviceProvider.categoryStatsSection}>
            <h4 className={componentClasses.serviceProvider.categoryStatsTitle}>Program Statistics</h4>
            <div className={componentClasses.serviceProvider.programStats}>
              <div className={componentClasses.serviceProvider.programStatsGrid}>
                <div className={componentClasses.serviceProvider.programStatsItem}>
                  <div className={componentClasses.serviceProvider.programStatsValue}>{serviceProviderData.statistics.totalProviders}</div>
                  <div className={componentClasses.serviceProvider.programStatsLabel}>Total Providers</div>
                </div>
                <div className={componentClasses.serviceProvider.programStatsItem}>
                  <div className={componentClasses.serviceProvider.programStatsValue}>{serviceProviderData.statistics.totalFunding}</div>
                  <div className={componentClasses.serviceProvider.programStatsLabel}>Total Funding</div>
                </div>
                <div className={componentClasses.serviceProvider.programStatsItem}>
                  <div className={componentClasses.serviceProvider.programStatsValue}>{serviceProviderData.statistics.totalViews}</div>
                  <div className={componentClasses.serviceProvider.programStatsLabel}>Forum Views</div>
                </div>
                <div className={componentClasses.serviceProvider.programStatsItem}>
                  <div className={componentClasses.serviceProvider.programStatsValue}>{serviceProviderData.statistics.totalReplies}</div>
                  <div className={componentClasses.serviceProvider.programStatsLabel}>Total Replies</div>
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
        <div className={componentClasses.serviceProvider.sourcesList}>
          {serviceProviderData.sources.map((source, index) => (
            <div key={index} className={componentClasses.serviceProvider.sourcesItem}>
              <h4 className={componentClasses.serviceProvider.sourcesTitle}>{source.title}</h4>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className={componentClasses.serviceProvider.sourcesLink}
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
