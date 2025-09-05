// Working Group Commands
export const workingGroupCommands = {
  // Meta-Governance Working Group
  'wg-meta': (args) => {
    const subCommand = args[0];
    switch (subCommand) {
      case 'info':
        return `<div class="output-container">
  <header class="section-header">Meta-Governance Working Group</header>
  <div class="section-border">═══════════════════════════════════════════════════════════════</div>

  <section class="wg-section">
    <h3 class="section-subtitle">Overview:</h3>
    <div class="command-description">The Meta-Governance working group manages ENS DAO's governance infrastructure, smart contract upgrades, and protocol-level decision making.</div>

    <h3 class="section-subtitle">Key Responsibilities:</h3>
    <div class="command-list">
      <div class="command-item">
        <span class="status-success">Smart contract development and security audits</span>
      </div>
      <div class="command-item">
        <span class="status-success">Governance proposal creation and execution</span>
      </div>
      <div class="command-item">
        <span class="status-success">Treasury management and fund allocation</span>
      </div>
      <div class="command-item">
        <span class="status-success">Cross-working group coordination</span>
      </div>
      <div class="command-item">
        <span class="status-success">Risk assessment and mitigation</span>
      </div>
    </div>

    <h3 class="section-subtitle">Current Projects:</h3>
    <div class="command-list">
      <div class="command-item">
        <span class="status-info">Governance framework improvements</span>
      </div>
      <div class="command-item">
        <span class="status-info">Multi-sig security enhancements</span>
      </div>
      <div class="command-item">
        <span class="status-info">Treasury diversification strategies</span>
      </div>
      <div class="command-item">
        <span class="status-info">Protocol upgrade planning</span>
      </div>
    </div>

    <h3 class="section-subtitle">Team Composition:</h3>
    <div class="command-list">
      <div class="command-item">
        <span class="command-description">Technical Stewards:</span> <span class="status-success">3-4 active members</span>
      </div>
      <div class="command-item">
        <span class="command-description">Governance Specialists:</span> <span class="status-success">Domain experts</span>
      </div>
      <div class="command-item">
        <span class="command-description">Security Researchers:</span> <span class="status-success">External auditors</span>
      </div>
      <div class="command-item">
        <span class="command-description">Community Liaisons:</span> <span class="status-success">Cross-group coordination</span>
      </div>
    </div>

    <h3 class="section-subtitle">Budget Allocation:</h3>
    <div class="command-list">
      <div class="command-item">
        <span class="command-description">Monthly Budget:</span> <span class="tx-value">$25K-40K</span>
      </div>
      <div class="command-item">
        <span class="command-description">Contract Audits:</span> <span class="tx-value">$15K-25K per audit</span>
      </div>
      <div class="command-item">
        <span class="command-description">Development Tools:</span> <span class="tx-value">$5K-10K monthly</span>
      </div>
      <div class="command-item">
        <span class="command-description">Conference Attendance:</span> <span class="tx-value">$2K-5K quarterly</span>
      </div>
    </div>
  </section>
</div>`;

      case 'budget':
        return `<div class="output-container">
  <header class="section-header">Meta-Governance Budget Allocation</header>
  <div class="section-border">═══════════════════════════════════════════════════════════════</div>

  <section class="wg-section">
    <h3 class="section-subtitle">Monthly Operating Budget:</h3>
    <div class="command-list">
      <div class="command-item">
        <span class="tx-value">$35,000</span>
      </div>
    </div>

    <h3 class="section-subtitle">Breakdown by Category:</h3>
    <div class="command-list">
      <div class="command-item">
        <span class="command-description">Technical Development:</span> <span class="tx-value">$15,000</span>
        <div class="command-subitem">
          <span class="status-info">Smart contract development</span>
        </div>
        <div class="command-subitem">
          <span class="status-info">Protocol upgrades and maintenance</span>
        </div>
      </div>
      <div class="command-item">
        <span class="command-description">Security & Audits:</span> <span class="tx-value">$12,000</span>
        <div class="command-subitem">
          <span class="status-info">External security audits</span>
        </div>
        <div class="command-subitem">
          <span class="status-info">Bug bounty programs</span>
        </div>
        <div class="command-subitem">
          <span class="status-info">Security monitoring tools</span>
        </div>
      </div>
      <div class="command-item">
        <span class="command-description">Governance Operations:</span> <span class="tx-value">$5,000</span>
        <div class="command-subitem">
          <span class="status-info">Proposal creation and management</span>
        </div>
        <div class="command-subitem">
          <span class="status-info">Community outreach</span>
        </div>
        <div class="command-subitem">
          <span class="status-info">Documentation updates</span>
        </div>
      </div>
      <div class="command-item">
        <span class="command-description">Tools & Infrastructure:</span> <span class="tx-value">$3,000</span>
        <div class="command-subitem">
          <span class="status-info">Development environments</span>
        </div>
        <div class="command-subitem">
          <span class="status-info">Testing frameworks</span>
        </div>
        <div class="command-subitem">
          <span class="status-info">Deployment automation</span>
        </div>
      </div>
    </div>

    <h3 class="section-subtitle">Quarterly Allocations:</h3>
    <div class="command-list">
      <div class="command-item">
        <span class="command-description">Conference & Event Attendance:</span> <span class="tx-value">$8,000</span>
      </div>
      <div class="command-item">
        <span class="command-description">Training & Education:</span> <span class="tx-value">$3,000</span>
      </div>
      <div class="command-item">
        <span class="command-description">Emergency Fund:</span> <span class="tx-value">$5,000</span>
      </div>
    </div>

    <h3 class="section-subtitle">Fiscal Year Totals:</h3>
    <div class="command-list">
      <div class="command-item">
        <span class="command-description">Total Budget:</span> <span class="tx-value">$420,000</span>
      </div>
      <div class="command-item">
        <span class="command-description">Projected Utilization:</span> <span class="status-success">95%</span>
      </div>
      <div class="command-item">
        <span class="command-description">Carry-forward:</span> <span class="status-info">$21,000</span>
      </div>
    </div>
  </section>
</div>`;

      case 'funding':
        return `<div class="output-container">
  <header class="section-header">Meta-Governance Funding Sources</header>
  <div class="section-border">═══════════════════════════════════════════════════════════════</div>

  <section class="wg-section">
    <h3 class="section-subtitle">Primary Funding Mechanisms:</h3>
    <div class="command-list">
      <div class="command-item">
        <span class="command-description">Direct Treasury Allocation:</span> <span class="status-info">Monthly distribution from main treasury</span>
      </div>
      <div class="command-item">
        <span class="command-description">Working Group Reserve:</span> <span class="status-info">Dedicated 15M $ENS allocation</span>
      </div>
      <div class="command-item">
        <span class="command-description">Performance Bonuses:</span> <span class="status-info">Milestone-based additional funding</span>
      </div>
      <div class="command-item">
        <span class="command-description">Grant Program Access:</span> <span class="status-info">Ecosystem development grants</span>
      </div>
    </div>

    <h3 class="section-subtitle">Funding Transparency:</h3>
    <div class="command-list">
      <div class="command-item">
        <span class="command-description">Monthly Budget Reports:</span> <span class="status-success">Detailed expenditure tracking</span>
      </div>
      <div class="command-item">
        <span class="command-description">Milestone Deliverables:</span> <span class="status-success">Performance-based funding release</span>
      </div>
      <div class="command-item">
        <span class="command-description">Audit Requirements:</span> <span class="status-success">Third-party financial verification</span>
      </div>
      <div class="command-item">
        <span class="command-description">Community Oversight:</span> <span class="status-success">Public budget review and approval</span>
      </div>
    </div>

    <h3 class="section-subtitle">Current Funding Status:</h3>
    <div class="command-list">
      <div class="command-item">
        <span class="command-description">Monthly Allocation:</span> <span class="tx-value">$35,000 approved</span>
      </div>
      <div class="command-item">
        <span class="command-description">Reserve Balance:</span> <span class="tx-value">$125,000 available</span>
      </div>
      <div class="command-item">
        <span class="command-description">Pending Milestones:</span> <span class="status-warning">3 active deliverables</span>
      </div>
      <div class="command-item">
        <span class="command-description">Next Review Cycle:</span> <span class="status-info">End of quarter</span>
      </div>
    </div>
  </section>
</div>`;

      case 'tx':
        return `<div class="output-container">
  <header class="section-header">Meta-Governance Transaction History</header>
  <div class="section-border">═══════════════════════════════════════════════════════════════</div>

  <section class="wg-section">
    <h3 class="section-subtitle">Recent Transactions:</h3>
    <table class="transaction-table" role="table" aria-label="Meta-Governance Recent Transactions">
      <thead>
        <tr>
          <th scope="col" class="table-header table-header-date">Date</th>
          <th scope="col" class="table-header table-header-wallet">Wallet</th>
          <th scope="col" class="table-header table-header-value">Value</th>
          <th scope="col" class="table-header table-header-description">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="transaction-row" role="row">
          <td class="table-cell table-cell-date" role="gridcell">
            <span class="text">2025-01-15</span>
          </td>
          <td class="table-cell table-cell-wallet" role="gridcell">
            <span class="text">Meta-Gov Wallet A</span>
          </td>
          <td class="table-cell table-cell-value" role="gridcell">
            <span class="text">$45K USDC</span>
          </td>
          <td class="table-cell table-cell-description" role="gridcell">
            <span class="text">Security Audit Payment</span>
          </td>
        </tr>
        <tr class="transaction-row" role="row">
          <td class="table-cell table-cell-date" role="gridcell">
            <span class="text">2025-01-14</span>
          </td>
          <td class="table-cell table-cell-wallet" role="gridcell">
            <span class="text">Meta-Gov Wallet B</span>
          </td>
          <td class="table-cell table-cell-value" role="gridcell">
            <span class="text">$12K ETH</span>
          </td>
          <td class="table-cell table-cell-description" role="gridcell">
            <span class="text">Smart Contract Development</span>
          </td>
        </tr>
        <tr class="transaction-row" role="row">
          <td class="table-cell table-cell-date" role="gridcell">
            <span class="text">2025-01-13</span>
          </td>
          <td class="table-cell table-cell-wallet" role="gridcell">
            <span class="text">Meta-Gov Multisig</span>
          </td>
          <td class="table-cell table-cell-value" role="gridcell">
            <span class="text">$8K USDC</span>
          </td>
          <td class="table-cell table-cell-description" role="gridcell">
            <span class="text">Governance Tool Maintenance</span>
          </td>
        </tr>
        <tr class="transaction-row" role="row">
          <td class="table-cell table-cell-date" role="gridcell">
            <span class="text">2025-01-12</span>
          </td>
          <td class="table-cell table-cell-wallet" role="gridcell">
            <span class="text">Meta-Gov Reserve</span>
          </td>
          <td class="table-cell table-cell-value" role="gridcell">
            <span class="text">$25K ENS</span>
          </td>
          <td class="table-cell table-cell-description" role="gridcell">
            <span class="text">Working Group Allocation</span>
          </td>
        </tr>
        <tr class="transaction-row" role="row">
          <td class="table-cell table-cell-date" role="gridcell">
            <span class="text">2025-01-11</span>
          </td>
          <td class="table-cell table-cell-wallet" role="gridcell">
            <span class="text">Meta-Gov Wallet A</span>
          </td>
          <td class="table-cell table-cell-value" role="gridcell">
            <span class="text">$15K USDC</span>
          </td>
          <td class="table-cell table-cell-description" role="gridcell">
            <span class="text">Protocol Upgrade Costs</span>
          </td>
        </tr>
      </tbody>
    </table>

    <h3 class="section-subtitle">Transaction Filters:</h3>
    <div class="command-list">
      <div class="command-item">
        <code class="command-name">wg meta tx all</code> <span class="command-description">Show all Meta-Gov transactions</span>
      </div>
      <div class="command-item">
        <code class="command-name">wg meta tx &lt;number&gt;</code> <span class="command-description">Show specific number of transactions</span>
      </div>
      <div class="command-item">
        <code class="command-name">wg meta tx &lt;date&gt;</code> <span class="command-description">Filter by date (e.g., wg meta tx last30days)</span>
      </div>
    </div>

    <h3 class="section-subtitle">Export Options:</h3>
    <div class="command-list">
      <div class="command-item">
        <code class="command-name">exportData tx wg meta</code> <span class="command-description">Export Meta-Gov transactions to CSV</span>
      </div>
      <div class="command-item">
        <code class="command-name">exportData tx wg meta last30days</code> <span class="command-description">Export filtered transactions</span>
      </div>
    </div>

    <div class="command-description">
      <span class="status-info">Note: Real transaction data requires Etherscan API configuration.</span>
    </div>
  </section>
</div>`;

      case 'help':
        return `META-GOVERNANCE WORKING GROUP COMMANDS:

CORE COMMANDS:
• wg meta               Meta-Governance working group overview
• wg meta info          General information and overview
• wg meta budget        Budget allocation details
• wg meta funding       Funding sources and transparency

TRANSACTION COMMANDS:
• wg meta tx            Transaction history overview
• wg meta tx all        Show all Meta-Gov transactions
• wg meta tx <number>   Show specific number of transactions
• wg meta tx <date>     Filter transactions by date

EXPORT COMMANDS:
• exportData tx wg meta         Export Meta-Gov transactions to CSV
• exportData wallets wg meta    Export Meta-Gov wallet information

For transaction data, use: wg meta tx all
For budget details, use: wg meta budget`;

      default:
        return `META-GOVERNANCE WORKING GROUP COMMANDS:

• wg meta info          General information and overview
• wg meta budget        Budget allocation details
• wg meta funding       Funding sources and transparency
• wg meta tx            Transaction history overview
• wg meta tx all        Show all Meta-Gov transactions
• wg meta tx <number>   Show specific number of transactions
• wg meta help          Show detailed command reference

For transaction data, use: wg meta tx all
For budget details, use: wg meta budget
For help, use: wg meta help`;
    }
  },

  // Ecosystem Working Group
  'wg-eco': (args) => {
    const subCommand = args[0];
    switch (subCommand) {
      case 'info':
        return `ECOSYSTEM WORKING GROUP

OVERVIEW:
The Ecosystem working group focuses on growing and supporting the ENS ecosystem
through grants, partnerships, and developer tools.

KEY RESPONSIBILITIES:
• Grant program management and distribution
• Developer ecosystem growth and support
• Partnership development with dApps and protocols
• Community building and engagement
• Ecosystem metrics and analytics

CURRENT INITIATIVES:
• Developer grant programs ($500K quarterly)
• Integration bounties for major dApps
• Hackathon sponsorship and organization
• Ecosystem analytics dashboard development

TEAM COMPOSITION:
• Program Managers: Grant and partnership coordination
• Developer Advocates: Technical support and education
• Community Managers: Ecosystem growth and engagement
• Analytics Specialists: Ecosystem metrics tracking

BUDGET ALLOCATION:
• Monthly Budget: $20K-30K
• Grant Program: $125K quarterly allocation
• Events & Hackathons: $15K-25K quarterly
• Tools & Infrastructure: $5K-8K monthly`;

      case 'budget':
        return `ECOSYSTEM BUDGET ALLOCATION

MONTHLY OPERATING BUDGET: $25,000

BREAKDOWN BY CATEGORY:
• Grant Program Administration: $8,000
  - Application review and processing
  - Milestone tracking and verification
  - Payment processing and compliance
• Partnership Development: $7,000
  - Business development activities
  - Partnership outreach and management
  - Contract negotiation support
• Community & Events: $6,000
  - Hackathon organization and sponsorship
  - Community meetups and events
  - Content creation and marketing
• Tools & Analytics: $4,000
  - Ecosystem tracking dashboards
  - Analytics tools and reporting
  - Developer tooling maintenance

QUARTERLY ALLOCATIONS:
• Major Hackathons: $20,000
• Partnership Development: $10,000
• Emergency Fund: $3,000

FISCAL YEAR TOTALS:
• Total Budget: $300,000
• Grant Pool: $500,000
• Projected Utilization: 90%
• Carry-forward: $30,000`;

      case 'funding':
        return `ECOSYSTEM FUNDING SOURCES

PRIMARY FUNDING MECHANISMS:
• Direct Treasury Allocation: Monthly operating budget
• Ecosystem Grant Pool: 25M $ENS dedicated allocation
• Partnership Revenue Sharing: Percentage of partnership deals
• Event Sponsorship Revenue: Income from sponsored events

FUNDING TRANSPARENCY:
• Grant Tracking System: Public grant application and status tracking
• Milestone Verification: Independent review of grant deliverables
• ROI Analysis: Return on investment metrics for grants
• Impact Reporting: Ecosystem growth and developer metrics

CURRENT FUNDING STATUS:
• Monthly Allocation: $25,000 approved
• Grant Pool Balance: $375,000 remaining
• Active Grants: 12 ongoing projects
• Next Distribution: Monthly grant review cycle`;

      case 'tx':
        return `ECOSYSTEM WORKING GROUP TRANSACTION HISTORY

RECENT TRANSACTIONS:
• 2025-01-15 | Ecosystem Wallet A | $125K USDC | Developer Grant Payment
• 2025-01-14 | Ecosystem Multisig | $50K ETH | Hackathon Sponsorship
• 2025-01-13 | Ecosystem Wallet B | $25K USDC | Integration Bounty
• 2025-01-12 | Ecosystem Reserve | $75K ENS | Grant Program Allocation
• 2025-01-11 | Ecosystem Wallet A | $30K USDC | Partnership Development

TRANSACTION FILTERS:
• wg eco tx all        Show all Ecosystem transactions
• wg eco tx <number>   Show specific number of transactions
• wg eco tx <date>     Filter by date (e.g., wg eco tx last30days)

GRANT-SPECIFIC TRANSACTIONS:
• wg eco grants        Show grant payment transactions
• wg eco bounties      Show bounty payment transactions

EXPORT OPTIONS:
• exportData tx wg eco         Export Ecosystem transactions to CSV
• exportData tx wg eco last30days  Export filtered transactions

Note: Real transaction data requires Etherscan API configuration.`;

      case 'grants':
        return `ECOSYSTEM GRANT PROGRAM TRANSACTIONS

ACTIVE GRANTS THIS QUARTER:
• Project Alpha | $50K | DeFi Integration | 75% Complete
• Project Beta | $30K | ENS dApp Development | 60% Complete
• Project Gamma | $25K | Research Initiative | 40% Complete
• Project Delta | $20K | Community Tools | 90% Complete

GRANT PAYMENT HISTORY:
• 2025-01-10 | Project Alpha | $15K | Milestone 1 Payment
• 2025-01-08 | Project Beta | $10K | Initial Funding
• 2025-01-05 | Project Delta | $8K | Final Milestone
• 2025-01-03 | Project Gamma | $12K | Research Phase 1

GRANT METRICS:
• Total Grants This Quarter: 12 active projects
• Total Funding Committed: $500K
• Average Grant Size: $41.7K
• Success Rate: 95% milestone completion

Use 'wg eco tx' for complete transaction history.`;

      case 'bounties':
        return `ECOSYSTEM BOUNTY PROGRAM TRANSACTIONS

RECENT BOUNTY PAYMENTS:
• 2025-01-15 | Smart Contract Audit | $15K | Security Researcher
• 2025-01-14 | Frontend Integration | $8K | Developer
• 2025-01-13 | Documentation | $5K | Technical Writer
• 2025-01-12 | Bug Fix | $3K | Community Member
• 2025-01-11 | Design Work | $4K | UI/UX Designer

BOUNTY PROGRAM STATISTICS:
• Total Bounties This Month: 25 completed
• Total Payments: $85K
• Average Bounty Size: $3.4K
• Top Categories: Development (40%), Security (30%), Design (20%)

ACTIVE BOUNTIES:
• Smart Contract Optimization | $12K | 2 weeks remaining
• Mobile App Development | $20K | 4 weeks remaining
• API Documentation | $6K | 1 week remaining

Use 'exportData tx wg eco' to export bounty transactions.`;

      case 'help':
        return `ECOSYSTEM WORKING GROUP COMMANDS:

CORE COMMANDS:
• wg eco               Ecosystem working group overview
• wg eco info          General information and overview
• wg eco budget        Budget allocation details
• wg eco funding       Funding sources and transparency

GRANT & BOUNTY COMMANDS:
• wg eco grants        Grant program transactions
• wg eco bounties      Bounty program transactions

TRANSACTION COMMANDS:
• wg eco tx            Transaction history overview
• wg eco tx all        Show all Ecosystem transactions
• wg eco tx <number>   Show specific number of transactions
• wg eco tx <date>     Filter transactions by date

EXPORT COMMANDS:
• exportData tx wg eco         Export Ecosystem transactions to CSV
• exportData wallets wg eco    Export Ecosystem wallet information

For transaction data, use: wg eco tx all
For grant information, use: wg eco grants`;

      default:
        return `ECOSYSTEM WORKING GROUP COMMANDS:

• wg eco info          General information and overview
• wg eco budget        Budget allocation details
• wg eco funding       Funding sources and transparency
• wg eco tx            Transaction history overview
• wg eco tx all        Show all Ecosystem transactions
• wg eco tx <number>   Show specific number of transactions
• wg eco grants        Grant program transactions
• wg eco bounties      Bounty program transactions
• wg eco help          Show detailed command reference

For transaction data, use: wg eco tx all
For grant information, use: wg eco grants
For help, use: wg eco help`;
    }
  },

  // Public Goods Working Group
  'wg-public': (args) => {
    const subCommand = args[0];
    switch (subCommand) {
      case 'info':
        return `PUBLIC GOODS WORKING GROUP

OVERVIEW:
The Public Goods working group focuses on documentation, education, and
transparency initiatives that benefit the broader ENS ecosystem.

KEY RESPONSIBILITIES:
• Documentation development and maintenance
• Community education and onboarding
• Transparency reporting and analytics
• Governance participation support
• Public communications and outreach

CURRENT PROJECTS:
• Comprehensive documentation portal
• Governance participation guides
• Transparency dashboard development
• Community newsletter and updates
• Educational content creation

TEAM COMPOSITION:
• Technical Writers: Documentation specialists
• Community Managers: User education and support
• Data Analysts: Transparency and reporting
• Content Creators: Educational materials

BUDGET ALLOCATION:
• Monthly Budget: $15K-25K
• Content Creation: $8K-12K monthly
• Tools & Platforms: $4K-6K monthly
• Community Events: $3K-5K quarterly`;

      case 'budget':
        return `PUBLIC GOODS BUDGET ALLOCATION

MONTHLY OPERATING BUDGET: $20,000

BREAKDOWN BY CATEGORY:
• Content Creation: $8,000
  - Documentation writing and updates
  - Educational content development
  - Video tutorials and guides
• Platform Maintenance: $5,000
  - Documentation portal hosting
  - Analytics dashboard development
  - Community platform management
• Community Engagement: $4,000
  - Newsletter production and distribution
  - Community events and meetups
  - Social media management
• Tools & Software: $3,000
  - Content management systems
  - Analytics and reporting tools
  - Design and editing software

QUARTERLY ALLOCATIONS:
• Major Publications: $6,000
• Community Events: $8,000
• Emergency Fund: $2,000

FISCAL YEAR TOTALS:
• Total Budget: $240,000
• Projected Utilization: 85%
• Carry-forward: $36,000`;

      case 'funding':
        return `PUBLIC GOODS FUNDING SOURCES

PRIMARY FUNDING MECHANISMS:
• Direct Treasury Allocation: Monthly operating budget
• Working Group Reserve: Dedicated funding pool
• Community Donations: Voluntary contributions
• Partnership Support: Corporate sponsorships

FUNDING TRANSPARENCY:
• Monthly Budget Reports: Detailed expenditure tracking
• Impact Metrics: Community engagement and reach statistics
• Content Analytics: Documentation usage and effectiveness
• Community Feedback: User satisfaction surveys

CURRENT FUNDING STATUS:
• Monthly Allocation: $20,000 approved
• Reserve Balance: $85,000 available
• Active Projects: 8 ongoing initiatives
• Next Review Cycle: Monthly budget review`;

      case 'tx':
        return `PUBLIC GOODS WORKING GROUP TRANSACTION HISTORY

RECENT TRANSACTIONS:
• 2025-01-15 | Public Goods Wallet A | $20K USDC | Documentation Platform
• 2025-01-14 | Public Goods Multisig | $15K ETH | Community Events
• 2025-01-13 | Public Goods Wallet B | $10K USDC | Educational Content
• 2025-01-12 | Public Goods Reserve | $25K ENS | Governance Tools
• 2025-01-11 | Public Goods Wallet A | $8K USDC | Newsletter Production

TRANSACTION FILTERS:
• wg public tx all        Show all Public Goods transactions
• wg public tx <number>   Show specific number of transactions
• wg public tx <date>     Filter by date (e.g., wg public tx last30days)

CONTENT & EVENTS TRANSACTIONS:
• wg public content       Show content creation payments
• wg public events        Show community event payments

EXPORT OPTIONS:
• exportData tx wg public         Export Public Goods transactions to CSV
• exportData tx wg public last30days  Export filtered transactions

Note: Real transaction data requires Etherscan API configuration.`;

      case 'docs':
      case 'documentation':
        return `PUBLIC GOODS DOCUMENTATION TRANSACTIONS

DOCUMENTATION PROJECTS:
• Developer Documentation | $45K | 85% Complete
• User Guides & Tutorials | $30K | 70% Complete
• API Reference | $25K | 60% Complete
• Governance Guides | $20K | 90% Complete

DOCUMENTATION PAYMENTS:
• 2025-01-14 | Technical Writer | $8K | API Documentation
• 2025-01-12 | Content Creator | $6K | User Tutorials
• 2025-01-10 | Developer Advocate | $10K | Developer Guides
• 2025-01-08 | Documentation Lead | $12K | Project Management

DOCUMENTATION METRICS:
• Total Documentation Pages: 500+
• Monthly Page Views: 50K+
• Developer Satisfaction: 95%
• Community Engagement: High

Use 'wg public tx' for complete transaction history.`;

      case 'content':
        return `PUBLIC GOODS CONTENT CREATION TRANSACTIONS

CONTENT CREATION PAYMENTS:
• 2025-01-15 | Video Producer | $12K | Educational Series
• 2025-01-14 | Content Strategist | $8K | Content Strategy
• 2025-01-13 | Social Media Manager | $5K | Community Outreach
• 2025-01-12 | Newsletter Editor | $4K | Monthly Newsletter
• 2025-01-11 | Graphic Designer | $6K | Visual Content

CONTENT METRICS:
• Monthly Content Pieces: 25
• Social Media Reach: 100K+ impressions
• Newsletter Subscribers: 5K+
• Video Views: 50K+ monthly

CONTENT CATEGORIES:
• Educational Videos: 40%
• Written Guides: 30%
• Social Media: 20%
• Newsletter: 10%

Use 'exportData tx wg public' to export content payments.`;

      case 'events':
        return `PUBLIC GOODS COMMUNITY EVENTS TRANSACTIONS

EVENT PAYMENTS THIS QUARTER:
• 2025-01-20 | ENS Community Call | $15K | Virtual Event
• 2025-01-18 | Developer Workshop | $12K | In-person Event
• 2025-01-15 | Governance Forum | $8K | Community Discussion
• 2025-01-12 | Ambassador Meetup | $6K | Regional Event
• 2025-01-10 | Educational Webinar | $4K | Online Session

EVENT METRICS:
• Total Events This Quarter: 8
• Total Attendance: 2,500+ participants
• Average Event Cost: $7.5K
• Community Satisfaction: 4.8/5

UPCOMING EVENTS:
• ENS Governance Summit | $25K | March 2025
• Developer Conference | $40K | April 2025
• Community Town Hall | $8K | Monthly

Use 'wg public tx' for complete event transaction history.`;

      case 'metrics':
        return `PUBLIC GOODS COMMUNITY METRICS

ENGAGEMENT METRICS:
• Documentation Page Views: 75K/month
• Community Forum Posts: 2.5K/month
• Governance Proposals: 15/month
• Social Media Followers: 25K across platforms

CONTENT PERFORMANCE:
• Educational Content Reach: 150K impressions/month
• Video Content Views: 80K/month
• Newsletter Open Rate: 45%
• Community Feedback: 4.7/5 average rating

GOVERNANCE PARTICIPATION:
• Active Community Members: 8.5K
• Proposal Participation Rate: 12%
• Voting Participation: 35% of token holders
• Delegate Representation: 85% of voting power

IMPACT MEASUREMENT:
• Developer Onboarding: +25% quarter-over-quarter
• Community Growth: +15% monthly active users
• Governance Engagement: +40% proposal discussions

Use 'analytics' for broader transparency metrics.`;

      case 'help':
        return `PUBLIC GOODS WORKING GROUP COMMANDS:

CORE COMMANDS:
• wg public               Public Goods working group overview
• wg public info          General information and overview
• wg public budget        Budget allocation details
• wg public funding       Funding sources and transparency

CONTENT & EVENTS COMMANDS:
• wg public docs          Documentation project transactions
• wg public content       Content creation payments
• wg public events        Community event payments
• wg public metrics       Community engagement metrics

TRANSACTION COMMANDS:
• wg public tx            Transaction history overview
• wg public tx all        Show all Public Goods transactions
• wg public tx <number>   Show specific number of transactions
• wg public tx <date>     Filter transactions by date

EXPORT COMMANDS:
• exportData tx wg public         Export Public Goods transactions to CSV
• exportData wallets wg public    Export Public Goods wallet information

For documentation, use: wg public docs
For community metrics, use: wg public metrics`;

      default:
        return `PUBLIC GOODS WORKING GROUP COMMANDS:

• wg public info          General information and overview
• wg public budget        Budget allocation details
• wg public funding       Funding sources and transparency
• wg public tx            Transaction history overview
• wg public tx all        Show all Public Goods transactions
• wg public tx <number>   Show specific number of transactions
• wg public docs          Documentation project transactions
• wg public content       Content creation payments
• wg public events        Community event payments
• wg public metrics       Community engagement metrics
• wg public help          Show detailed command reference

For documentation, use: wg public docs
For community metrics, use: wg public metrics
For help, use: wg public help`;
    }
  }
};
