// Service Provider Program Commands
import { serviceProviderData, getCategoryColor, getStatusColor, formatDate } from '../../../data/serviceProviderData.js';

export const serviceProviderCommands = {
  // Main SPP command
  'spp': (args) => {
    const subCommand = args[0];
    switch (subCommand) {
      case 'overview':
        return `SERVICE PROVIDER PROGRAM (SPP2) OVERVIEW

PROGRAM STATUS:
• Current Phase: ${serviceProviderData.programOverview.currentPhase}
• Active Providers: ${serviceProviderData.programOverview.totalProviders}
• Annual Budget: ${serviceProviderData.programOverview.totalFunding}
• Implementation Date: ${formatDate(serviceProviderData.spp2Details.implementationDate)}

KEY FEATURES:
${serviceProviderData.spp2Details.keyFeatures.map(feature => `• ${feature}`).join('\n')}

PROGRAM STATISTICS:
• Total Funding: ${serviceProviderData.statistics.totalFunding}
• Average Funding per Provider: ${serviceProviderData.statistics.averageFunding}
• Active Since: ${formatDate(serviceProviderData.statistics.activeSince)}
• Forum Engagement: ${serviceProviderData.statistics.totalViews} views, ${serviceProviderData.statistics.totalReplies} replies

BUDGET BREAKDOWN:
• Monthly Disbursement: ${serviceProviderData.spp2Details.monthlyFunding}
• Previous Season: ${serviceProviderData.spp2Details.previousBudget}
• Budget Increase: ${serviceProviderData.spp2Details.budgetIncrease}`;

      case 'providers':
        const activeProviders = serviceProviderData.activeServiceProviders;
        let output = `ACTIVE SERVICE PROVIDERS (${activeProviders.length})

`;
        activeProviders.forEach(provider => {
          output += `${provider.name.toUpperCase()}
• Category: ${provider.category}
• Funding: ${provider.funding}
• Status: ${provider.status}
• Description: ${provider.description}
• Contributors: ${provider.contributors.join(', ')}
• Forum Thread: ${provider.forumThread}

`;
        });
        return output;

      case 'categories':
        const categories = serviceProviderData.categories;
        let catOutput = `SERVICE PROVIDER CATEGORIES

`;
        Object.entries(categories).forEach(([category, data]) => {
          catOutput += `${category.toUpperCase()}
• Providers: ${data.count}
• Total Funding: ${data.totalFunding}

`;
        });
        return catOutput;

      case 'updates':
        const updates = serviceProviderData.programUpdates;
        let updateOutput = `PROGRAM UPDATES & REPORTS

`;
        updates.forEach(update => {
          updateOutput += `${update.title.toUpperCase()}
• Date: ${formatDate(update.date)}
• Category: ${update.category}
• Author: ${update.contributors[0]}
• Forum: ${update.forumThread}
• Description: ${update.description}

`;
        });
        return updateOutput;

      case 'funding':
        return `SERVICE PROVIDER FUNDING INFRASTRUCTURE

STREAMING INFRASTRUCTURE:
• Monthly Funding: ${serviceProviderData.spp2Details.monthlyFunding}
• Auto-Wrapper Integration: ${serviceProviderData.spp2Details.autoWrapperEnabled ? 'Enabled' : 'Disabled'}
• Stream Management: Automated monthly disbursements
• Currency: USDC for operational consistency

PROVIDER FUNDING BREAKDOWN:
${serviceProviderData.activeServiceProviders.map(provider =>
  `• ${provider.name}: ${provider.funding}`
).join('\n')}

TOTAL ANNUAL BUDGET: ${serviceProviderData.programOverview.totalFunding}`;

      case 'governance':
        const governanceLinks = serviceProviderData.spp2Details.governanceLinks;
        return `GOVERNANCE & IMPLEMENTATION

EXECUTABLE PROPOSAL:
• EP ${serviceProviderData.spp2Details.executableProposal}
• Implementation: ${formatDate(serviceProviderData.spp2Details.implementationDate)}

GOVERNANCE LINKS:
${governanceLinks.map(link =>
  `• ${link.title}: ${link.url}
  ${link.description}`
).join('\n\n')}

VOTING DELEGATES:
${serviceProviderData.votingReports.map(delegate =>
  `• ${delegate.delegate}: ${formatDate(delegate.date)} - ${delegate.forumThread}`
).join('\n')}`;

      default:
        return `SERVICE PROVIDER PROGRAM COMMANDS:

CORE COMMANDS:
• spp overview        Program overview and statistics
• spp providers       List all active service providers
• spp categories      Provider categories and funding breakdown
• spp updates         Program updates and progress reports
• spp funding         Funding infrastructure and disbursements
• spp governance      Governance links and implementation details

INDIVIDUAL PROVIDER COMMANDS:
${serviceProviderData.activeServiceProviders.map(provider =>
  `• spp ${provider.id}       ${provider.name} details`
).join('\n')}

Use 'spp <provider-id>' for detailed provider information.`;
    }
  },

  // Individual provider commands
  ...(() => {
    const providerCommands = {};
    serviceProviderData.activeServiceProviders.forEach(provider => {
      providerCommands[`spp-${provider.id}`] = (args) => {
        let output = `${provider.name.toUpperCase()} - SERVICE PROVIDER DETAILS

BASIC INFORMATION:
• Status: ${provider.status}
• Category: ${provider.category}
• Funding: ${provider.funding}
• Application Date: ${formatDate(provider.applicationDate)}
• Forum Thread: ${provider.forumThread}

TEAM & CONTRIBUTORS:
${provider.contributors.map(contributor => `• ${contributor}`).join('\n')}

DESCRIPTION:
${provider.description}

FORUM ENGAGEMENT:
• Views: ${provider.views}
• Replies: ${provider.replies}
• Thread: ${provider.forumThread}

`;

        // Add provider-specific updates if available
        if (provider.q2Update) {
          output += `Q2 2025 UPDATE:
• Date: ${formatDate(provider.q2Update.date)}
• Forum Thread: ${provider.q2Update.forumThread}

ACHIEVEMENTS:
${provider.q2Update.achievements.map(achievement => `• ${achievement}`).join('\n')}

`;

          if (provider.q2Update.quarterlyMetrics) {
            output += `QUARTERLY METRICS:
Total Q2 Traffic: ${provider.q2Update.quarterlyMetrics.totalQ2Traffic.toLocaleString()}

Monthly Breakdown:
${provider.q2Update.quarterlyMetrics.monthlyBreakdown.map(month =>
  `${month.month}:
  • Total: ${month.total.toLocaleString()}
  • DoH: ${month.doh.toLocaleString()}
  • EthLimo: ${month.ethLimo.toLocaleString()}
  • EthLink: ${month.ethLink.toLocaleString()}
  • GnoLimo: ${month.gnoLimo.toLocaleString()}
  • Uptime: ${month.uptime}`
).join('\n\n')}

`;
          }

          if (provider.q2Update.financialStatus) {
            output += `FINANCIAL STATUS:
• Income: ${provider.q2Update.financialStatus.income}
• Expenses: ${provider.q2Update.financialStatus.expenses}
• Budget: ${provider.q2Update.financialStatus.budget}

`;
          }

          if (provider.q2Update.kpis) {
            output += `Q2 KPI ACHIEVEMENTS:
Target: ${provider.q2Update.kpis.target}

Status: ${provider.q2Update.kpis.status}

Details:
${Object.entries(provider.q2Update.kpis.details).map(([key, value]) =>
  `• ${key}: ${value}`
).join('\n')}

`;
          }
        }

        return output;
      };
    });
    return providerCommands;
  })(),

  // Category-based commands
  'spp-infrastructure': () => {
    const infraProviders = serviceProviderData.activeServiceProviders.filter(p => p.category === 'Infrastructure');
    return `INFRASTRUCTURE PROVIDERS (${infraProviders.length})

${infraProviders.map(provider =>
  `${provider.name.toUpperCase()}
• Funding: ${provider.funding}
• Description: ${provider.description}
• Contributors: ${provider.contributors.join(', ')}

`).join('')}

TOTAL INFRASTRUCTURE FUNDING: ${serviceProviderData.categories.Infrastructure.totalFunding}`;
  },

  'spp-development': () => {
    const devProviders = serviceProviderData.activeServiceProviders.filter(p => p.category === 'Development');
    return `DEVELOPMENT PROVIDERS (${devProviders.length})

${devProviders.map(provider =>
  `${provider.name.toUpperCase()}
• Funding: ${provider.funding}
• Description: ${provider.description}
• Contributors: ${provider.contributors.join(', ')}

`).join('')}

TOTAL DEVELOPMENT FUNDING: ${serviceProviderData.categories.Development.totalFunding}`;
  },

  'spp-governance': () => {
    const govProviders = serviceProviderData.activeServiceProviders.filter(p => p.category === 'Governance');
    return `GOVERNANCE PROVIDERS (${govProviders.length})

${govProviders.map(provider =>
  `${provider.name.toUpperCase()}
• Funding: ${provider.funding}
• Description: ${provider.description}
• Contributors: ${provider.contributors.join(', ')}

`).join('')}

TOTAL GOVERNANCE FUNDING: ${serviceProviderData.categories.Governance.totalFunding}`;
  },

  'spp-identity': () => {
    const identityProviders = serviceProviderData.activeServiceProviders.filter(p => p.category === 'Identity');
    return `IDENTITY PROVIDERS (${identityProviders.length})

${identityProviders.map(provider =>
  `${provider.name.toUpperCase()}
• Funding: ${provider.funding}
• Description: ${provider.description}
• Contributors: ${provider.contributors.join(', ')}

`).join('')}

TOTAL IDENTITY FUNDING: ${serviceProviderData.categories.Identity.totalFunding}`;
  },

  'spp-content': () => {
    const contentProviders = serviceProviderData.activeServiceProviders.filter(p => p.category === 'Content');
    return `CONTENT PROVIDERS (${contentProviders.length})

${contentProviders.map(provider =>
  `${provider.name.toUpperCase()}
• Funding: ${provider.funding}
• Description: ${provider.description}
• Contributors: ${provider.contributors.join(', ')}

`).join('')}

TOTAL CONTENT FUNDING: ${serviceProviderData.categories.Content.totalFunding}`;
  },

  'spp-research': () => {
    const researchProviders = serviceProviderData.activeServiceProviders.filter(p => p.category === 'Research');
    return `RESEARCH PROVIDERS (${researchProviders.length})

${researchProviders.map(provider =>
  `${provider.name.toUpperCase()}
• Funding: ${provider.funding}
• Description: ${provider.description}
• Contributors: ${provider.contributors.join(', ')}

`).join('')}

TOTAL RESEARCH FUNDING: ${serviceProviderData.categories.Research.totalFunding}`;
  }
};
