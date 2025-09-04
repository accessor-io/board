// Financial Analysis Commands
export const financialCommands = {
  overview: () => `ENS DAO FUNDING MECHANISMS OVERVIEW

PRIMARY REVENUE STREAMS:
• Domain Registration Fees: $40M+ annually from .eth domains
• Premium Auctions: High-value domain auctions (Vitalik.eth, etc.)
• Treasury Management: DeFi yield from treasury assets
• Ecosystem Grants: Revenue sharing from ecosystem projects

CURRENT TREASURY COMPOSITION:
• Main Treasury: ~$246M in stablecoins and ETH
• Endowment Fund: ~$12M managed by Karpatkey
• Working Group Reserves: ~$2-5M per group for operations
• Emergency Reserves: ~$10M in stablecoins

FUNDING ALLOCATION PRIORITIES:
• 40% Ecosystem Development: Grants and bounties
• 30% Working Group Operations: Meta-Gov, Ecosystem, Public Goods
• 20% Treasury Management: DeFi yield generation
• 10% Emergency Reserves: Protocol security and recovery

GOVERNANCE MECHANISMS:
• ENS Token: $ENS governance token for protocol decisions
• Working Groups: Specialized governance for different areas
• Treasury Council: Multi-sig control over large expenditures
• Community Proposals: Snapshot voting for smaller decisions`,

  revenue: () => `REVENUE GENERATION & COLLECTION
PRIMARY REVENUE SOURCES:
• Registration Fees: ETH for .eth domains
  - 3-char: $640/year, 4-char: $160/year, 5+: $5/year
  - Accrual basis: Recognized over service period
• Premium Fees: Temporary auctions (21 days)
  - High starting prices ($100M+), decrease to $0
  - Recognized at transaction time
• Endowment DeFi Results: Karpatkey-managed yield
  - Monthly recognition basis

REVENUE INFLOW MECHANISM:
• Registrar Controller: 0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5
  - $30K/day average inflow (~$1M/month)
  - Collects all .eth registration/renewal fees
• Monthly Revenue Sweeps:
  - Funds transferred to DAO timelock
  - Portion converted to stablecoins (USDC/DAI)
  - Excess ETH sent to endowment fund`,

  compensation: () => `STEWARD & OFFICER COMPENSATION
SERVICE PROVIDER COMPENSATION:
• Technical Stewards: $15K-25K/month per steward
  - Core protocol maintenance and development
  - Smart contract security and upgrades
  - Infrastructure management
• Ecosystem Stewards: $10K-20K/month per steward
  - Grant program management
  - Partnership development
  - Community engagement
• Public Goods Stewards: $8K-15K/month per steward
  - Documentation and education
  - Community support
  - Transparency initiatives

COMPENSATION STRUCTURE:
• Monthly Payments: Via Gnosis Safe multi-sigs
• Performance-Based: Tied to deliverables and milestones
• Competitive Rates: Aligned with industry standards
• Transparent Reporting: All compensation publicly tracked

CURRENT STEWARD COUNT:
• Meta-Governance: 3-4 active stewards
• Ecosystem: 2-3 active stewards
• Public Goods: 1-2 active stewards
• Total Monthly Cost: ~$75K-150K depending on active projects`,

  governance: () => `ENS TOKEN DISTRIBUTIONS & GOVERNANCE
TOKEN DISTRIBUTION MECHANISM:
• Airdrop Recipients: 100M $ENS tokens distributed
• Working Groups: 15M $ENS for operational funding
• Ecosystem Grants: 25M $ENS for development incentives
• Treasury Reserve: 60M $ENS retained for future use

CURRENT TOKEN ALLOCATION:
• Circulating Supply: ~25M $ENS actively traded
• Treasury Holdings: ~60M $ENS in multi-sig wallets
• Working Group Reserves: ~5M $ENS distributed monthly
• Staking Rewards: ~5M $ENS for governance participation

GOVERNANCE PARTICIPATION:
• Proposal Threshold: 1M $ENS to submit proposals
• Quorum Requirements: 10M $ENS for execution
• Voting Period: 7 days for most proposals
• Execution Delay: 2 days for security review

FUTURE TOKEN UTILITY:
• Protocol Fee Reductions: $ENS holders get discounted fees
• Enhanced Governance: Voting power for protocol changes
• Ecosystem Incentives: Rewards for contributing projects
• Treasury Management: Direct control over treasury assets`,

  investments: () => `TREASURY INVESTMENT STRATEGIES
CURRENT INVESTMENT PORTFOLIO:
• DeFi Protocols: Uniswap, Compound, Aave
  - Yield farming and liquidity provision
  - ~15-20% APY on stablecoin deposits
• Real World Assets: On-chain RWA tokens
  - Institutional-grade asset tokenization
  - ~8-12% yield with lower volatility
• Liquid Staking: Lido, Rocket Pool
  - ETH staking derivatives
  - ~7-10% staking rewards

RISK MANAGEMENT:
• Diversification: Assets spread across multiple protocols
• Liquidity Requirements: 30% held in stablecoins
• Smart Contract Security: Audited protocols only
• Regular Rebalancing: Monthly portfolio adjustments

PERFORMANCE TRACKING:
• Monthly Reports: Detailed yield and performance data
• Risk Metrics: Value at Risk (VaR) calculations
• Benchmark Comparison: Performance vs. traditional assets
• Transparency Dashboard: Real-time portfolio tracking

FUTURE STRATEGIES:
• Cross-Chain Expansion: Multi-chain treasury deployment
• Institutional Partnerships: Access to private market investments
• ESG Integration: Environmentally sustainable investment options
• Automated Management: AI-driven portfolio optimization`,

  challenges: () => `TRANSPARENCY & REPORTING ISSUES
CURRENT TRANSPARENCY CHALLENGES:

1. CROSS-CHAIN ASSET TRACKING
• Multiple blockchains: ETH, ARB, OP, BASE
• Bridge transactions not fully tracked
• Oracle price feeds for different networks
• Gas fee accounting across chains

2. COMPLEX FINANCIAL INSTRUMENTS
• DeFi yield farming strategies
• LP token valuations and impermanent loss
• Options and derivatives positions
• Cross-protocol yield optimization

3. WORKING GROUP FINANCIAL AUTONOMY
• Separate budget allocations and tracking
• Inter-group fund transfers
• Shared service cost allocation
• Performance-based compensation

4. REGULATORY COMPLIANCE
• Geographic restrictions and sanctions
• Tax reporting for distributed operations
• KYC/AML requirements for large transfers
• Institutional investment restrictions

5. REAL-TIME DATA ACCURACY
• Transaction confirmation delays
• Oracle price feed latency
• Cross-chain bridge delays
• Manual data entry errors

TRANSPARENCY IMPROVEMENT INITIATIVES:
• Standardized reporting templates
• Automated data collection systems
• Third-party audit engagements
• Community oversight committees
• Real-time dashboard development`,

  summary: () => `COMPLETE TREASURY OVERVIEW SUMMARY

EXECUTIVE SUMMARY:
The ENS DAO manages a sophisticated financial ecosystem with $250M+ in assets
across multiple blockchains and investment strategies. Revenue generation is
primarily through domain registration fees, with additional income from premium
auctions and DeFi yield farming.

KEY FINANCIAL METRICS:
• Annual Revenue: $40M+ from domain registrations
• Treasury Value: $246M in main treasury
• Endowment Fund: $12M managed by Karpatkey
• Monthly Expenses: $75K-150K in steward compensation
• Working Groups: 3 active groups with dedicated budgets

GOVERNANCE STRUCTURE:
• ENS Token: $ENS governance token with 100M total supply
• Working Groups: Meta-Governance, Ecosystem, Public Goods
• Multi-sig Wallets: 3-5 required signatures for large transfers
• Community Proposals: Snapshot voting for operational decisions

CURRENT CHALLENGES:
• Cross-chain asset tracking and reporting
• Complex DeFi instrument valuation
• Working group financial autonomy
• Real-time transparency requirements

FUTURE OUTLOOK:
• Continued revenue growth from domain registrations
• Expansion into new blockchain ecosystems
• Enhanced DeFi yield optimization
• Improved transparency and reporting systems`
};
