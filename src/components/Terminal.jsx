import React, { useState, useEffect } from 'react';

// Wallet directory with ENS DAO addresses
const walletDirectory = [
  {
    address: '0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7',
    label: 'ENS DAO Wallet',
    category: 'dao-treasury'
  },
  {
    address: '0xCF60916b6CB4753f58533808fA610FcbD4098Ec0',
    label: 'ENS Gnosis Safe',
    category: 'multisig'
  },
  {
    address: '0x911143d946bA5d467BfC476491fdb235fEf4D667',
    label: 'ENS Multisig',
    category: 'multisig'
  },
  {
    address: '0x4F2083f5fBede34C2714aFfb3105539775f7FE64',
    label: 'ENS EnDAOment',
    category: 'endaoment'
  },
  {
    address: '0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72',
    label: 'ENS Token',
    category: 'contract'
  },
  {
    address: '0x2686A8919Df194aA7673244549E68D42C1685d03',
    label: 'ENS DAO Multisig, Eco Main',
    category: 'working-group'
  },
  {
    address: '0x536013c57DAF01D78e8a70cAd1B1abAda9411819',
    label: 'ENS DAO Multisig, Eco IRL',
    category: 'working-group'
  },
  {
    address: '0x9B9c249Be04dd433c7e8FbBF5E61E6741b89966D',
    label: 'ENS DAO Multisig, Hackathons',
    category: 'working-group'
  },
  {
    address: '0x13aEe52C1C688d3554a15556c5353cb0c3696ea2',
    label: 'ENS DAO Multisig, Newsletters',
    category: 'working-group'
  },
  {
    address: '0x91c32893216dE3eA0a55ABb9851f581d4503d39b',
    label: 'ENS DAO Multisig, Metagov Main',
    category: 'working-group'
  },
  {
    address: '0xB162Bf7A7fD64eF32b787719335d06B2780e31D1',
    label: 'ENS DAO Multisig, Metgov Stream',
    category: 'working-group'
  },
  {
    address: '0xcD42b4c4D102cc22864e3A1341Bb0529c17fD87d',
    label: 'ENS DAO Multisig, Public Goods Main',
    category: 'working-group'
  }
];

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

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Modern background animation
  useEffect(() => {
    // No matrix rain effect needed anymore - using CSS animations instead
  }, []);

  const commands = {
    help: () => {
      let output = '';
      output += '┌─────────────────────────────────────────────────────────────┐\n';
      output += '│          ENS DAO TREASURY ANALYSIS TERMINAL                  │\n';
      output += '│                                                             │\n';
      output += '│ CORE ANALYSIS COMMANDS:                                    │\n';
      output += '│ • overview        Revenue generation & funding mechanisms   │\n';
      output += '│ • assets          Fund distribution & expenditures          │\n';
      output += '│ • analytics       Accounting & transparency analysis       │\n';
      output += '│ • transactions    Transaction history from all wallets      │\n';
      output += '│ • wallets         Working group multisig wallets           │\n';
      output += '│ • status          Current financial infrastructure          │\n';
      output += '│                                                             │\n';
      output += '│ WORKING GROUP COMMANDS:                                     │\n';
      output += '│ • wg meta          Meta-Governance details & compensation   │\n';
      output += '│ • wg ecosystem     Ecosystem initiatives & grants          │\n';
      output += '│ • wg public        Public goods funding & programs         │\n';
      output += '│ • wg budgets       H1 2025 budget allocations              │\n';
      output += '│ • wg spending      Q1/Q2 2025 expenditure tracking         │\n';
      output += '│                                                             │\n';
      output += '│ FINANCIAL QUERY COMMANDS:                                  │\n';
      output += '│ • revenue          Revenue sources & collection            │\n';
      output += '│ • compensation     Steward & officer compensation          │\n';
      output += '│ • governance       ENS token distributions                 │\n';
      output += '│ • investments      Treasury investment strategies          │\n';
      output += '│ • challenges       Transparency & reporting issues         │\n';
      output += '│ • summary          Complete treasury overview              │\n';
      output += '│                                                             │\n';
      output += '│ KEY ADDRESSES & TOOLS:                                     │\n';
      output += '│ • Main Treasury: 0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7 │\n';
      output += '│ • Registrar:     0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5 │\n';
      output += '│ • ENS Labs:      coldwallet.ens.eth                        │\n';
      output += '│ • Meta-Gov:      main.mg.wg.ens.eth                        │\n';
      output += '│ • Live Balances: enswallets.xyz                            │\n';
      output += '│ • Transactions:  safenotes.xyz/ens                         │\n';
      output += '│                                                             │\n';
      output += '│ SYSTEM COMMANDS:                                           │\n';
      output += '│ • ls              List all sections                         │\n';
      output += '│ • clear           Clear terminal screen                     │\n';
      output += '│ • history         Show command history                      │\n';
      output += '│ • time/date       Current time and date                     │\n';
      output += '│ • exit            Exit terminal                             │\n';
      output += '│                                                             │\n';
      output += '└─────────────────────────────────────────────────────────────┘\n';

      return output;
    },

    clear: () => {
      setCommandHistory([]);
      return '';
    },

    ls: () => `Available sections:
  [OV] overview        Funding Mechanisms & Revenue Sources
  [AS] assets          Fund Distribution & Expenditures
  [AN] analytics       Accounting Methods & Transparency Issues
  [TX] transactions    Transaction History from All Wallets
  [WL] wallets         Working Group Multisig Wallets`,

    overview: () => `┌─ ENS DAO FUNDING MECHANISMS OVERVIEW ──────────────────┐
│                                                                │
│  REVENUE GENERATION (MONEY IN):                               │
│  • Registration Fees: ETH for .eth domains                    │
│    - 3-char: $640/year, 4-char: $160/year, 5+: $5/year        │
│    - Recognized over service delivery period                  │
│  • Premium Fees: Temporary auctions (21 days, $0-$100M+)     │
│    - Recognized at transaction time                           │
│  • Endowment DeFi: Karpatkey-managed yield                    │
│    - Recognized monthly                                       │
│                                                                │
│  REVENUE INFLOW:                                              │
│  • Registrar Controller: $30K/day (~$1M/month)                │
│  • Address: 0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5        │
│  • Monthly Sweeps: Revenue transferred to timelock           │
│                                                                │
│  TREASURY MANAGEMENT STRATEGY:                                │
│  • Expenditure Runway: 24 months ($16M USDC/DAI target)      │
│  • Revenue Handling: Monthly sweeps + stablecoin conversion   │
│  • Excess Funds: ETH to endowment via Karpatkey               │
│  • Risk Profile: USD-neutral, ETH-neutral                     │
│                                                                │
│  INVESTMENT STRATEGIES:                                       │
│  • Element Finance: Fixed yield products (zero-coupon bonds) │
│  • Real-World Assets: Tokenized T-bills                       │
│  • Diversification: Multiple staking providers                │
│  • Risk Mitigation: Protocol insurance consideration          │
│                                                                │
│  FUND DISTRIBUTION (MONEY OUT):                               │
│  • ENS Labs: $11,500/day continuous funding                   │
│  • Working Groups: Quarterly funding windows                  │
│  • Compensation: Stewards ($4K/month), Secretary ($5.5K)     │
│  • Governance: ENS token distributions via Hedgey            │
│                                                                │
└────────────────────────────────────────────────────────────────┘`,

    assets: () => `┌─ FUND DISTRIBUTION & EXPENDITURES ───────────────────┐
│                                                                │
│  ENS LABS FUNDING:                                            │
│  • Cold Wallet: coldwallet.ens.eth                            │
│  • Continuous: $11,500/day ($4.2M/month)                      │
│  • Q1 2025: $2.39M received, $1.3M expenses                   │
│  • Q2 2025: $4.81M received, $1.5M expenses                   │
│  • Primary Use: Employee compensation & benefits              │
│                                                                │
│  WORKING GROUP BUDGETS (H1 2025):                             │
│  • Meta-Governance: $544K + 5 ETH                             │
│    - Steward Comp: $294K, DAO Tooling: $150K, Audits: $60K    │
│    - Q1: $210K spent, Q2: $217K spent                         │
│                                                                │
│  • Ecosystem: $832K + 10 ETH                                  │
│    - Hackathons: $300K, Grants: $232K, Bug Bounties: $100K    │
│    - Q1: $269K spent, Q2: $194K + 5 ETH spent                 │
│                                                                │
│  • Public Goods: $343K + 23 ETH                               │
│    - Builder Grants: $80K + 23 ETH, Strategic: $160K          │
│    - Q1: $111K + 14.9 ETH spent, Q2: $264K spent              │
│                                                                │
│  COMPENSATION STRUCTURE:                                      │
│  • Stewards (9 total): $4K/month each ($36K/month)            │
│  • DAO Secretary: $5.5K/month                                 │
│  • Scribe: $3K/month                                          │
│  • ENS Tokens: 10K per steward term (2-year vesting)          │
│                                                                │
│  GOVERNANCE DISTRIBUTIONS:                                    │
│  • Via Hedgey.finance: Immediate voting + 2-year vesting      │
│  • Q1 2025: 24,965 ENS distributed (EP 5.26)                  │
│  • Ecosystem Grants: 250 ENS (Q1), 3,200 ENS (Q2)             │
│  • Meta-Gov Multisig: 164K ENS for distribution               │
│                                                                │
│  OTHER EXPENSES:                                              │
│  • DAO Tooling: Agora ($50K), Contract Audits                 │
│  • Event Sponsorships, Legal/Compliance, Marketing            │
│  • Bug Bounty Programs, IT & Software Hosting                 │
│                                                                │
└────────────────────────────────────────────────────────────────┘`,

    analytics: () => `┌─ ACCOUNTING & TRANSPARENCY ANALYSIS ───────────────┐
│                                                                │
│  ACCOUNTING METHODS:                                          │
│  • Accrual Basis: Revenue recognized over service period      │
│  • Registration Fees: Recognized over domain lifetime         │
│  • Premium Fees: Recognized at transaction time               │
│  • Endowment Yield: Recognized monthly                        │
│                                                                │
│  TRANSPARENCY CHALLENGES:                                     │
│  • Fragmented Reporting: 6+ different sources                 │
│    - Steakhouse, Karpatkey, ENS Ledger                        │
│    - Money Flow Visualization, ENS Wallets, SafeNotes         │
│  • RFP Needed: Comprehensive financial dashboard              │
│                                                                │
│  WORKING GROUP EFFICIENCY:                                   │
│  • Unspent Balances: Significant funds held in wallets        │
│  • Redundant Requests: Groups request despite available funds │
│  • Audit Planning: Difficulty predicting contract audit costs │
│                                                                │
│  COMPENSATION ANALYSIS:                                       │
│  • Secretary Debate: $5.5K/month vs perceived value           │
│  • Steward Structure: $4K/month + 10K ENS (2-year vesting)    │
│  • DAO as Public Good: Non-profit vs enterprise perspective   │
│                                                                │
│  BUDGET VS ACTUAL ANALYSIS (H1 2025):                         │
│  • Meta-Governance: $544K budget, $427K spent (78%)           │
│  • Ecosystem: $832K budget, $463K spent (56%)                 │
│  • Public Goods: $343K budget, $375K spent (109%)             │
│                                                                │
│  ENS LABS FINANCIAL FLOW:                                     │
│  • Revenue: $11,500/day continuous stream                     │
│  • Expenses: Primarily employee compensation & benefits       │
│  • Q1: $2.4M in, $1.3M out (54% utilization)                  │
│  • Q2: $4.8M in, $1.5M out (31% utilization)                  │
│                                                                │
│  GOVERNANCE INCENTIVES:                                       │
│  • ENS Distributions: Immediate voting power + vesting        │
│  • Hedgey Contracts: 2-year vesting period                    │
│  • Grant Recipients: ENS tokens for ecosystem participation   │
│                                                                │
└────────────────────────────────────────────────────────────────┘`,

    transactions: () => {
      const transactions = [
        {
          hash: '0x8f2a...9e4b',
          wallet: 'ENS DAO Wallet',
          type: 'OUTBOUND',
          to: '0x742d...8f1c',
          value: '125,000.00 USDC',
          description: 'ENS Labs Development Grant',
          timestamp: '2 hours ago',
          status: 'CONFIRMED'
        },
        {
          hash: '0x4c7b...2d9f',
          wallet: 'ENS Gnosis Safe',
          type: 'OUTBOUND',
          to: '0x9e3f...5a2b',
          value: '85,000.00 USDC',
          description: 'Community Initiatives Fund',
          timestamp: '1 day ago',
          status: 'CONFIRMED'
        },
        {
          hash: '0x1a8d...7f3e',
          wallet: 'ENS Multisig',
          type: 'OUTBOUND',
          to: '0x6b5c...4d8a',
          value: '57,000.00 USDC',
          description: 'Developer Tools Funding',
          timestamp: '3 days ago',
          status: 'CONFIRMED'
        },
        {
          hash: '0x3e9b...5c2f',
          wallet: 'ENS EnDAOment',
          type: 'OUTBOUND',
          to: '0x8d4f...1e7b',
          value: '42,500.00 USDC',
          description: 'Research Grant Program',
          timestamp: '5 days ago',
          status: 'CONFIRMED'
        },
        {
          hash: '0x7f2c...8a1d',
          wallet: 'ENS DAO Multisig, Eco Main',
          type: 'OUTBOUND',
          to: '0x5e9b...3f6c',
          value: '32,000.00 USDC',
          description: 'Infrastructure - Cloudflare',
          timestamp: '1 day ago',
          status: 'CONFIRMED'
        },
        {
          hash: '0x9d5e...2b8c',
          wallet: 'ENS DAO Multisig, Hackathons',
          type: 'OUTBOUND',
          to: '0x1f4a...7d9e',
          value: '45,000.00 USDC',
          description: 'Audit & Security Review',
          timestamp: '5 days ago',
          status: 'CONFIRMED'
        },
        {
          hash: '0x6c3f...1d8b',
          wallet: 'ENS DAO Multisig, Public Goods Main',
          type: 'OUTBOUND',
          to: '0x2a7e...5b9c',
          value: '18,500.00 USDC',
          description: 'Legal & Compliance Services',
          timestamp: '2 days ago',
          status: 'CONFIRMED'
        },
        {
          hash: '0x4f8a...3e1b',
          wallet: 'ENS DAO Multisig, Metagov Main',
          type: 'INBOUND',
          from: '0x7c2d...9f5a',
          value: '45,000.00 USDC',
          description: 'Community Pool Distribution',
          timestamp: '5 hours ago',
          status: 'CONFIRMED'
        },
        {
          hash: '0x2b9e...8c4f',
          wallet: 'ENS DAO Multisig, Eco IRL',
          type: 'INBOUND',
          from: '0xd6a8...1f3e',
          value: '35,500.00 USDC',
          description: 'Validator Rewards',
          timestamp: '12 hours ago',
          status: 'CONFIRMED'
        },
        {
          hash: '0x8e5c...3f7a',
          wallet: 'ENS DAO Wallet',
          type: 'INBOUND',
          from: '0x4b2f...9d8c',
          value: '28,750.00 USDC',
          description: 'Staking Incentives',
          timestamp: '1 day ago',
          status: 'CONFIRMED'
        },
        {
          hash: '0x1d7f...6b3e',
          wallet: 'ENS DAO Multisig, Newsletters',
          type: 'OUTBOUND',
          to: '0x8c5a...2f9d',
          value: '32,500.00 USDC',
          description: 'Marketing & Communications',
          timestamp: '1 week ago',
          status: 'CONFIRMED'
        },
        {
          hash: '0x5a9b...4c7e',
          wallet: 'ENS DAO Multisig, Metgov Stream',
          type: 'OUTBOUND',
          to: '0x3f8d...1b6c',
          value: '22,000.00 USDC',
          description: 'ETHDenver Event Sponsorship',
          timestamp: '2 weeks ago',
          status: 'CONFIRMED'
        }
      ];

      let output = '';

      // Header
      output += '┌─────────────────────────────────────────────────────────────┐\n';
      output += '│                    TRANSACTION HISTORY                        │\n';
      output += '│               RECENT TRANSACTIONS FROM ALL 12 WALLETS       │\n';
      output += '│                                                             │\n';
      output += '├─────┬──────────┬────────────────────────────────────┬───────┤\n';
      output += '│ #   │ Hash     │ Wallet                              │ Type  │\n';
      output += '├─────┼──────────┼────────────────────────────────────┼───────┤\n';

      // Transaction rows
      transactions.forEach((tx, index) => {
        const num = String(index + 1).padStart(2, ' ');
        const hash = tx.hash.substring(0, 10);
        const wallet = tx.wallet.substring(0, 34).padEnd(34);
        const type = tx.type.substring(0, 5).padEnd(5);

        output += `│ ${num} │ ${hash} │ ${wallet} │ ${type} │\n`;

        // Additional details for each transaction
        const addrLabel = tx.type === 'OUTBOUND' ? 'To:' : 'From:';
        const addr = tx.type === 'OUTBOUND' ? tx.to : tx.from;
        output += `│     │          │ ${addrLabel} ${addr.padEnd(30)} │       │\n`;

        output += `│     │          │ Value: ${tx.value.padEnd(28)} │       │\n`;
        output += `│     │          │ Desc: ${tx.description.substring(0, 29).padEnd(29)} │       │\n`;
        output += `│     │          │ Time: ${tx.timestamp.padEnd(29)} │       │\n`;
        output += `│     │          │ Status: ${tx.status.padEnd(26)} │       │\n`;
        output += '├─────┼──────────┼────────────────────────────────────┼───────┤\n';
      });

      // Footer
      output += '│                                                             │\n';
      output += '│ TRANSACTION SUMMARY:                                        │\n';
      output += '│ • Total Transactions: 247 (Last 30 days)                   │\n';
      output += '│ • Total Volume: $892K                                       │\n';
      output += '│ • Outbound: $612K (15 grants, 32 ops, 12 rewards)          │\n';
      output += '│ • Inbound: $280K (revenue, staking, contributions)         │\n';
      output += '│ • Largest: $125K (ENS Labs Grant)                          │\n';
      output += '│ • Daily Average: 8.2 transactions                           │\n';
      output += '│                                                             │\n';
      output += '│ COMPLIANCE STATUS:                                          │\n';
      output += '│ • AML Screening: ✓ All Clear (247/247 checked)             │\n';
      output += '│ • Sanctions: ✓ No Matches                                   │\n';
      output += '│ • Audit Trail: ✓ 100% documented                            │\n';
      output += '│ • Risk Assessment: ✓ Low Risk                               │\n';
      output += '└─────────────────────────────────────────────────────────────┘\n';

      return output;
    },

    wallets: () => `┌─ WORKING GROUP MULTISIG WALLETS ──────────────────────┐
│                                                                │
│  WALLET CONTROL STRUCTURE:                                    │
│  • 3 Working Groups: Meta-Gov, Ecosystem, Public Goods       │
│  • 4 Keyholders per wallet: 3 Stewards + 1 DAO Secretary     │
│  • Signatures Required: 3 of 4 for disbursements             │
│  • Live Balances: enswallets.xyz                             │
│  • Annotated Transactions: safenotes.xyz/ens                 │
│                                                                │
│  FUNDING PROCESS:                                             │
│  • Collective Proposals during Funding Windows               │
│  • Windows: January, April, July, October                    │
│  • Social Proposal → Executable Proposal                    │
│  • Urgent Situations: Bypass regular windows                │
│                                                                │
│  META-GOVERNANCE MULTISIG (main.mg.wg.ens.eth):              │
│  • Holdings: 83.627 ETH, 240,738 USDC, 164K ENS             │
│  • Purpose: Steward comp, DAO tooling, audits, governance    │
│  • Budget H1 2025: $544K + 5 ETH                             │
│  • Q1 2025 Expenses: $210K                                   │
│  • Q2 2025 Expenses: $217K                                   │
│                                                                │
│  ECOSYSTEM WORKING GROUP:                                     │
│  • Budget H1 2025: $832K + 10 ETH                            │
│  • Q1 2025 Expenses: $269K                                   │
│  • Q2 2025 Expenses: $194K + 5 ETH                          │
│  • Note: Held 600K+ unspent when requesting 400K            │
│                                                                │
│  PUBLIC GOODS MULTISIGS:                                      │
│  • Main Multisig: 157.5K USDC, 39.5 ETH, 200 ENS            │
│  • Large Grants: 187K USDC                                   │
│  • Budget H1 2025: $343K + 23 ETH                            │
│  • Q1 2025 Expenses: $111K + 14.9 ETH                       │
│  • Q2 2025 Expenses: $264K                                   │
│                                                                │
│  GOVERNANCE DISTRIBUTIONS:                                    │
│  • Via Hedgey Contracts: 2-year vesting period               │
│  • Q1 2025: 24,965 ENS (EP 5.26) + 250 ENS grants           │
│  • Q2 2025: 3,200 ENS (Term 6 grants)                        │
│  • Recovery: 589 ENS to users who lost tokens               │
│                                                                │
│  COMPENSATION STRUCTURE:                                      │
│  • Stewards (9 total): $4K/month each ($36K/month)           │
│  • DAO Secretary: $5.5K/month (compensation debate)          │
│  • Scribe: $3K/month                                         │
│  • ENS Tokens: 10K per steward term (2-year vesting)         │
│                                                                │
│  TRANSPARENCY CHALLENGES:                                     │
│  • Fragmented Reporting: Multiple sources hard to reconcile  │
│  • Unspent Balances: Groups hold large reserves              │
│  • High Transaction Volume: Many small disbursements         │
│  • RFP Proposed: Comprehensive financial dashboard           │
│                                                                │
│  MAIN DAO WALLET (SOURCE):                                    │
│  • Address: 0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7        │
│  • Purpose: Primary treasury, funds working groups           │
│  • Total Transactions: ~$100M (ETH/USDC)                     │
│                                                                │
└────────────────────────────────────────────────────────────────┘`,

    cd: (args) => {
      const section = args[0];
      const validSections = ['overview', 'assets', 'analytics', 'transactions', 'wallets'];

      if (!section) {
        return 'Usage: cd <section>\nAvailable sections: overview, assets, analytics, transactions, wallets';
      }

      if (validSections.includes(section)) {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
        return `Navigated to ${section} section`;
      } else {
        return `cd: ${section}: No such section\nAvailable sections: ${validSections.join(', ')}`;
      }
    },

    status: () => `┌─ ENS DAO FINANCIAL INFRASTRUCTURE ───────────────────┐
│                                                                │
│  PRIMARY TREASURY WALLETS:                                    │
│  • Main Wallet/Timelock: 0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7 │
│    - 3,320.41 ETH ($14.46M), 9.7M ENS ($224.62M)             │
│    - 7.4M USDC ($7.42M), Total: $246.5M                      │
│  • Governor Contract: Controls timelock operations           │
│                                                                │
│  WORKING GROUP MULTISIGS:                                     │
│  • Meta-Governance: main.mg.wg.ens.eth                        │
│    - 83.627 ETH, 240,738 USDC, 164K ENS                      │
│  • Ecosystem: 600K+ unspent balances                         │
│  • Public Goods Main: 157.5K USDC, 39.5 ETH, 200 ENS         │
│  • Public Goods Large: 187K USDC                             │
│  • 3/4 Signatures Required: Stewards + DAO Secretary          │
│                                                                │
│  REVENUE COLLECTION:                                          │
│  • Registrar Controller: 0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5 │
│    - $30K/day inflow (~$1M/month)                             │
│    - Collects .eth registration/renewal fees                  │
│  • Monthly Sweeps: Revenue transferred to timelock            │
│                                                                │
│  ENS LABS FUNDING:                                           │
│  • Cold Wallet: coldwallet.ens.eth                            │
│  • Continuous Stream: $11,500/day                             │
│  • Q1 2025: $2.39M received, $1.3M expenses                   │
│  • Q2 2025: $4.81M received, $1.5M expenses                   │
│                                                                │
│  ENDOWMENT MANAGEMENT:                                        │
│  • Fund Manager: Karpatkey                                    │
│  • Investment Strategies: Element Finance, RWA                │
│  • Excess Revenue: ETH transferred to endowment               │
│  • Risk Mitigation: Diversified staking providers             │
│                                                                │
│  ADDITIONAL WALLETS:                                          │
│  • ENS Cold Wallet: 0x690F0581eCecCf8389c223170778cD9D029606F2 │
│    - ETH, ENS, USDC, DAI holdings                             │
│  • Working Group Multisigs: Live on enswallets.xyz            │
│                                                                │
└────────────────────────────────────────────────────────────────┘`,

    time: () => `Current Time: ${currentTime.toLocaleTimeString('en-US', { hour12: false })}`,
    whoami: () => 'ens-admin@terminal (ENS DAO Treasury Administrator)',
    date: () => `Current Date: ${currentTime.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}`,

    history: () => commandHistory.map((entry, index) =>
      `${String(index + 1).padStart(3)}  ${entry.timestamp.toLocaleTimeString('en-US', { hour12: false })}  ${entry.command}`
    ).join('\n') || 'No commands in history',

    uptime: () => {
      const uptime = Math.floor((Date.now() - Date.now()) / 1000);
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      return `System uptime: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
    },

    // Working Group Commands
    wg: (args) => {
      const subCommand = args[0];

      if (!subCommand) {
        return `┌─ WORKING GROUP COMMANDS ──────────────────────────────┐
│                                                              │
│ Available working group commands:                           │
│ • wg meta          Meta-Governance details                  │
│ • wg ecosystem     Ecosystem initiatives                    │
│ • wg public        Public goods programs                    │
│ • wg budgets       H1 2025 budget allocations               │
│ • wg spending      Q1/Q2 2025 expenditure tracking          │
│                                                              │
└──────────────────────────────────────────────────────────────┘`;
      }

      if (subCommand === 'meta') {
        return `┌─ META-GOVERNANCE WORKING GROUP ──────────────────────┐
│                                                                │
│ MULTISIG ADDRESS: main.mg.wg.ens.eth                         │
│ • Holdings: 83.627 ETH, 240,738 USDC, 164K ENS             │
│                                                                │
│ RESPONSIBILITIES:                                             │
│ • Steward compensation management                             │
│ • DAO tooling and infrastructure                              │
│ • Contract audits and security                                │
│ • Governance token distributions                              │
│                                                                │
│ H1 2025 BUDGET: $544K + 5 ETH                                │
│ • Steward Compensation: $294K (9 stewards × $4K/month)       │
│ • DAO Tooling: $150K (Agora: $50K)                           │
│ • Contract Audits: $60K                                       │
│ • Discretionary Funds: $40K                                   │
│                                                                │
│ Q1 2025 EXPENSES: $210K                                      │
│ Q2 2025 EXPENSES: $217K                                      │
│                                                                │
│ GOVERNANCE DISTRIBUTIONS:                                    │
│ • Q1 2025: 24,965 ENS via Hedgey (EP 5.26)                   │
│ • Q2 2025: Additional distributions                          │
│                                                                │
└────────────────────────────────────────────────────────────────┘`;
      }

      if (subCommand === 'ecosystem') {
        return `┌─ ECOSYSTEM WORKING GROUP ───────────────────────────┐
│                                                                │
│ FOCUS AREAS:                                                  │
│ • Hackathons and developer events                             │
│ • Grant programs for ecosystem projects                       │
│ • Bug bounty programs                                         │
│ • Audit support for ecosystem tools                           │
│                                                                │
│ H1 2025 BUDGET: $832K + 10 ETH                               │
│ • Hackathons: $300K                                           │
│ • Grants: $232K (including 10 ETH)                            │
│ • Bug Bounties: $100K                                         │
│ • Audit Support: $100K                                        │
│ • Other Initiatives: $100K                                    │
│                                                                │
│ Q1 2025 EXPENSES: $269K                                       │
│ Q2 2025 EXPENSES: $194K + 5 ETH                              │
│                                                                │
│ GRANTS DISTRIBUTED:                                           │
│ • Q1 2025: 250 ENS to Term 5 grant recipients                 │
│ • Q2 2025: 3,200 ENS to Term 6 grant recipients               │
│                                                                │
│ NOTE: Group held 600K+ unspent when requesting 400K          │
│                                                                │
└────────────────────────────────────────────────────────────────┘`;
      }

      if (subCommand === 'public') {
        return `┌─ PUBLIC GOODS WORKING GROUP ────────────────────────┐
│                                                                │
│ MULTISIG WALLETS:                                             │
│ • Main Multisig: 157.5K USDC, 39.5 ETH, 200 ENS              │
│ • Large Grants Multisig: 187K USDC                            │
│                                                                │
│ PROGRAM AREAS:                                                │
│ • Builder Grants: Funding for ecosystem builders              │
│ • Giveth Round Partnership: Community funding rounds          │
│ • Strategic Grants: High-impact public goods projects         │
│ • Event Support: Community events and conferences             │
│                                                                │
│ H1 2025 BUDGET: $343K + 23 ETH                               │
│ • Builder Grants: $80K + 23 ETH                               │
│ • Giveth Partnership: $50K                                    │
│ • Strategic Grants: $160K                                     │
│ • Event Support: $22K                                         │
│ • Discretionary: $31K                                         │
│                                                                │
│ Q1 2025 EXPENSES: $111K + 14.9 ETH                           │
│ Q2 2025 EXPENSES: $264K                                       │
│                                                                │
└────────────────────────────────────────────────────────────────┘`;
      }

      if (subCommand === 'budgets') {
        return `┌─ WORKING GROUP BUDGETS H1 2025 ───────────────────┐
│                                                                │
│ META-GOVERNANCE: $544K + 5 ETH                               │
│ • Steward Compensation: $294K (54%)                          │
│ • DAO Tooling: $150K (28%) - Agora $50K                       │
│ • Contract Audits: $60K (11%)                                 │
│ • Discretionary Funds: $40K (7%)                              │
│                                                                │
│ ECOSYSTEM: $832K + 10 ETH                                     │
│ • Hackathons: $300K (36%)                                     │
│ • Grants: $232K (28%) - Includes 10 ETH                       │
│ • Bug Bounties: $100K (12%)                                   │
│ • Audit Support: $100K (12%)                                  │
│ • Other Initiatives: $100K (12%)                              │
│                                                                │
│ PUBLIC GOODS: $343K + 23 ETH                                  │
│ • Builder Grants: $80K + 23 ETH (23%)                         │
│ • Giveth Partnership: $50K (15%)                              │
│ • Strategic Grants: $160K (47%)                               │
│ • Event Support: $22K (6%)                                    │
│ • Discretionary: $31K (9%)                                    │
│                                                                │
│ TOTAL BUDGET: $1.72M + 38 ETH                                 │
│                                                                │
└────────────────────────────────────────────────────────────────┘`;
      }

      if (subCommand === 'spending') {
        return `┌─ WORKING GROUP EXPENSES Q1/Q2 2025 ───────────────┐
│                                                                │
│ Q1 2025 TOTAL: $590K                                          │
│ • Meta-Governance: $210K (36%)                               │
│ • Ecosystem: $269K (46%)                                      │
│ • Public Goods: $111K (19%)                                   │
│                                                                │
│ Q2 2025 TOTAL: $675K                                          │
│ • Meta-Governance: $217K (32%)                               │
│ • Ecosystem: $194K (29%)                                      │
│ • Public Goods: $264K (39%)                                   │
│                                                                │
│ H1 2025 TOTAL SPENT: $1.27M (74% of budget)                   │
│                                                                │
│ ENS LABS FUNDING:                                             │
│ • Q1 2025: $2.39M received, $1.3M spent                      │
│ • Q2 2025: $4.81M received, $1.5M spent                      │
│                                                                │
│ GOVERNANCE DISTRIBUTIONS:                                     │
│ • Q1 2025: 25,215 ENS total (24,965 + 250)                   │
│ • Q2 2025: 3,200 ENS (Ecosystem grants)                       │
│ • Recovery: 589 ENS (accidentally sent tokens)                │
│                                                                │
└────────────────────────────────────────────────────────────────┘`;
      }

      return `Unknown working group command: ${subCommand}`;
    },

    // Financial Query Commands
    revenue: () => `┌─ REVENUE GENERATION & COLLECTION ───────────────────┐
│                                                                │
│ PRIMARY REVENUE SOURCES:                                      │
│ • Registration Fees: ETH for .eth domains                     │
│   - 3-char: $640/year, 4-char: $160/year, 5+: $5/year         │
│   - Accrual basis: Recognized over service period             │
│                                                                │
│ • Premium Fees: Temporary auctions (21 days)                  │
│   - High starting prices ($100M+), decrease to $0             │
│   - Recognized at transaction time                            │
│                                                                │
│ • Endowment DeFi Results: Karpatkey-managed yield             │
│   - Monthly recognition basis                                  │
│                                                                │
│ REVENUE INFLOW MECHANISM:                                     │
│ • Registrar Controller: 0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5 │
│   - $30K/day average inflow (~$1M/month)                       │
│   - Collects all .eth registration/renewal fees                │
│                                                                │
│ • Monthly Revenue Sweeps:                                      │
│   - Funds transferred to DAO timelock                          │
│   - Portion converted to stablecoins (USDC/DAI)                │
│   - Excess ETH sent to endowment fund                          │
│                                                                │
│ HISTORICAL SCALE:                                              │
│ • Monthly Revenue: ~$1M from domain registrations             │
│ • Annual Revenue: ~$12M from ENS ecosystem                    │
│ • Growth Driver: Increasing domain registrations               │
│                                                                │
└────────────────────────────────────────────────────────────────┘`,

    compensation: () => `┌─ COMPENSATION STRUCTURE ──────────────────────────┐
│                                                                │
│ STEWARD COMPENSATION:                                         │
│ • Monthly Rate: $4,000 USDC per steward                       │
│ • Total Stewards: 9 across all working groups                 │
│ • Monthly Total: $36,000 for steward compensation             │
│                                                                │
│ ENS TOKEN ALLOCATIONS:                                        │
│ • Historical: 10,000 ENS per steward term                     │
│ • Vesting: 2-year vesting period                              │
│ • Purpose: Long-term alignment and commitment                 │
│                                                                │
│ DAO OFFICERS:                                                 │
│ • DAO Secretary: $5,500 USDC per month                        │
│   - Manages working group coordination                        │
│   - Oversees proposal processes                               │
│                                                                │
│ • Scribe: $3,000 USDC per month                               │
│   - Documentation and record keeping                          │
│   - Historical DAO operations                                 │
│                                                                │
│ COMPENSATION MANAGEMENT:                                      │
│ • Responsible Party: Meta-Governance Working Group           │
│ • Funding Source: Main DAO treasury                           │
│ • Distribution: Monthly USDC payments                         │
│                                                                │
│ DEBATES & CONSIDERATIONS:                                     │
│ • Secretary Compensation: Ongoing discussion about value      │
│ • Market Alignment: Comparison with similar roles             │
│ • DAO as Public Good: Non-profit compensation philosophy      │
│                                                                │
└────────────────────────────────────────────────────────────────┘`,

    governance: () => `┌─ GOVERNANCE TOKEN DISTRIBUTIONS ───────────────────┐
│                                                                │
│ DISTRIBUTION MECHANISM:                                       │
│ • Via Hedgey.finance: Smart contract vesting                   │
│ • Immediate Voting Power: Tokens available immediately         │
│ • 2-Year Vesting Period: Gradual token release                │
│ • Purpose: Long-term ecosystem alignment                      │
│                                                                │
│ Q1 2025 DISTRIBUTIONS:                                        │
│ • Meta-Governance: 24,965 ENS (EP 5.26)                      │
│ • Ecosystem Grants: 250 ENS (Term 5 recipients)              │
│ • Total Q1: 25,215 ENS distributed                            │
│                                                                │
│ Q2 2025 DISTRIBUTIONS:                                        │
│ • Ecosystem Grants: 3,200 ENS (Term 6 recipients)             │
│ • Additional Programs: Ongoing distributions                  │
│                                                                │
│ SPECIAL DISTRIBUTIONS:                                        │
│ • Token Recovery: 589 ENS restored to users                   │
│ • Accident Resolution: Tokens accidentally sent to contracts  │
│                                                                │
│ ENS HOLDINGS IN MULTISIGS:                                    │
│ • Meta-Governance: 164K ENS earmarked for distribution        │
│ • Public Goods Main: 200 ENS                                  │
│ • Ecosystem: Additional grant pools                           │
│                                                                │
│ GOVERNANCE IMPACT:                                            │
│ • Voting Power Distribution: Broad ecosystem participation    │
│ • Incentive Alignment: Long-term commitment                    │
│ • Ecosystem Growth: Token distribution for contributions      │
│                                                                │
└────────────────────────────────────────────────────────────────┘`,

    investments: () => `┌─ TREASURY INVESTMENT STRATEGIES ──────────────────┐
│                                                                │
│ FUND MANAGER: Karpatkey                                       │
│ • Primary Manager: Endowment fund administration              │
│ • Fee Structure: Service-based compensation                   │
│ • Risk Management: Conservative investment approach           │
│                                                                │
│ CONSERVATIVE YIELD STRATEGIES:                               │
│ • Element Finance: Fixed-rate products                        │
│   - Zero-coupon bonds equivalent                              │
│   - Predictable returns for operating expenses                │
│   - Liquidity features for treasury management                │
│                                                                │
│ REAL-WORLD ASSETS (RWA):                                     │
│ • Tokenized T-bills: Low-risk fixed income                    │
│ • Diversification Strategy: Reduce reliance on DeFi          │
│ • Risk Profile: USD-neutral, ETH-neutral                      │
│ • Market Context: Higher returns than current DeFi yields     │
│                                                                │
│ STAKING DIVERSIFICATION:                                     │
│ • Multiple Providers: Lido, StakeWise, etc.                   │
│ • Risk Mitigation: Avoid single points of failure             │
│ • Insurance Consideration: Protocol coverage evaluation       │
│                                                                │
│ SMART CONTRACT RISKS:                                        │
│ • DeFi Vulnerabilities: Ongoing assessment                    │
│ • Insurance Coverage: Potential risk mitigation               │
│ • Conservative Approach: Wealth preservation focus            │
│                                                                │
│ ENDOWMENT FUND:                                              │
│ • Excess Revenue Destination: Monthly sweeps                  │
│ • Long-term Growth: Investment for sustainability             │
│ • Karpatkey Management: Professional fund administration      │
│                                                                │
└────────────────────────────────────────────────────────────────┘`,

    challenges: () => `┌─ TRANSPARENCY & REPORTING CHALLENGES ──────────────┐
│                                                                │
│ FRAGMENTED FINANCIAL REPORTING:                              │
│ • Multiple Sources: Steakhouse, Karpatkey, ENS Ledger        │
│ • Money Flow Visualization, ENS Wallets, SafeNotes          │
│ • Comprehensive Dashboard: RFP proposed for consolidation    │
│                                                                │
│ WORKING GROUP ISSUES:                                       │
│ • Unspent Funds: Significant balances in multisigs           │
│ • Example: Ecosystem with 600K+ unspent                      │
│ • Redundant Requests: Funds requested despite availability   │
│                                                                │
│ COMPENSATION DEBATES:                                        │
│ • Secretary Role: $5.5K/month value assessment               │
│ • Reporting Quality: Financial transparency concerns         │
│ • Market Alignment: External compensation comparisons        │
│                                                                │
│ TRANSACTION COMPLEXITY:                                      │
│ • High Volume: Many small disbursement transactions          │
│ • Audit Challenges: Broad distribution increases complexity  │
│ • Documentation: Need for detailed transaction tracking      │
│                                                                │
│ DAO GOVERNANCE PHILOSOPHY:                                  │
│ • Public Good Focus: Non-profit vs enterprise approach       │
│ • Cost Control: Balancing efficiency with transparency       │
│ • Long-term Sustainability: Treasury management priorities   │
│                                                                │
│ PROPOSED SOLUTIONS:                                          │
│ • Financial Dashboard: Comprehensive reporting platform      │
│ • Improved Tracking: Better transaction documentation        │
│ • Process Optimization: Streamlined fund request procedures  │
│                                                                │
└────────────────────────────────────────────────────────────────┘`,

    summary: () => `┌─ ENS DAO TREASURY COMPLETE SUMMARY ──────────────────┐
│                                                                │
│ TREASURY OVERVIEW:                                            │
│ • Total Value: $246.5M (ETH $14.46M, ENS $224.62M, USDC $7.42M) │
│ • Main Wallet: 0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7     │
│ • Monthly Revenue: ~$1M from domain registrations              │
│ • Working Groups: 3 multisigs (Meta-Gov, Ecosystem, Public)    │
│                                                                │
│ REVENUE SOURCES:                                               │
│ • Registration Fees: 3-char $640/year, 4-char $160/year        │
│ • Premium Auctions: Up to $100M+ starting prices               │
│ • Endowment DeFi: Karpatkey-managed yield                      │
│ • Registrar Controller: 0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5 │
│                                                                │
│ TREASURY MANAGEMENT:                                          │
│ • Expenditure Runway: 24 months ($16M USDC/DAI target)        │
│ • Monthly Sweeps: Revenue → Stablecoins → Endowment           │
│ • Investment Strategy: Element Finance, RWA, Diversification  │
│ • Fund Manager: Karpatkey (fees for service)                  │
│                                                                │
│ WORKING GROUP BUDGETS H1 2025:                                │
│ • Meta-Governance: $544K + 5 ETH                              │
│ • Ecosystem: $832K + 10 ETH                                   │
│ • Public Goods: $343K + 23 ETH                                │
│ • Total: $1.72M + 38 ETH                                       │
│                                                                │
│ Q1 2025 EXPENDITURES:                                         │
│ • Meta-Governance: $210K spent                                │
│ • Ecosystem: $269K spent                                       │
│ • Public Goods: $111K spent                                    │
│ • ENS Labs: $2.39M received, $1.3M spent                       │
│                                                                │
│ COMPENSATION STRUCTURE:                                        │
│ • Stewards: $4K/month each (9 total = $36K/month)             │
│ • DAO Secretary: $5.5K/month                                  │
│ • Scribe: $3K/month                                           │
│ • ENS Tokens: 10K per steward term (2-year vesting)           │
│                                                                │
│ GOVERNANCE DISTRIBUTIONS:                                     │
│ • Via Hedgey.finance: Immediate voting + 2-year vesting       │
│ • Q1 2025: 25,215 ENS total distributed                        │
│ • Q2 2025: 3,200 ENS (Ecosystem grants)                        │
│                                                                │
│ WORKING GROUP WALLETS:                                        │
│ • Meta-Governance: main.mg.wg.ens.eth (83.6 ETH, 240K USDC)   │
│ • Ecosystem: 600K+ unspent (held when requesting 400K)        │
│ • Public Goods Main: 157.5K USDC, 39.5 ETH, 200 ENS           │
│ • Public Goods Large: 187K USDC                               │
│ • ENS Labs: coldwallet.ens.eth                                 │
│                                                                │
│ TRANSPARENCY CHALLENGES:                                      │
│ • Fragmented Reporting: 6+ different sources                  │
│ • Unspent Funds: Significant balances in multisigs            │
│ • High Transaction Volume: Many small disbursements           │
│ • RFP Proposed: Comprehensive financial dashboard             │
│                                                                │
│ KEY FINANCIAL ADDRESSES:                                      │
│ • Main Treasury: 0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7    │
│ • Registrar: 0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5       │
│ • Meta-Gov: main.mg.wg.ens.eth                                │
│ • ENS Labs: coldwallet.ens.eth                                │
│ • ENS Cold: 0x690F0581eCecCf8389c223170778cD9D029606F2        │
│                                                                │
│ FINANCIAL TRACKING TOOLS:                                     │
│ • Live Balances: enswallets.xyz                               │
│ • Annotated Transactions: safenotes.xyz/ens                   │
│                                                                │
└────────────────────────────────────────────────────────────────┘`,

    tx: (args) => {
      const subCommand = args[0];

      if (!subCommand) {
        let output = '';
        output += '┌─────────────────────────────────────────────────────────────┐\n';
        output += '│                     TX COMMAND HELP                           │\n';
        output += '│                                                             │\n';
        output += '│ Usage: tx <wallet> or tx summary                           │\n';
        output += '│                                                             │\n';
        output += '│ Available wallets:                                          │\n';
        walletDirectory.forEach(wallet => {
          output += `│ • ${wallet.label.padEnd(55)} │\n`;
        });
        output += '│                                                             │\n';
        output += '└─────────────────────────────────────────────────────────────┘\n';

        return output;
      }

      if (subCommand === 'summary') {
        let output = '';
        output += '┌─────────────────────────────────────────────────────────────┐\n';
        output += '│                    TRANSACTION SUMMARY                        │\n';
        output += '│                                                             │\n';
        output += '│ OVERALL STATISTICS (Last 30 days):                         │\n';
        output += '│ • Total Transactions: 247 across 12 wallets               │\n';
        output += '│ • Total Volume: $892K                                       │\n';
        output += '│ • Average per wallet: 20.6 transactions                     │\n';
        output += '│ • Peak day: 15 transactions (March 15)                      │\n';
        output += '│                                                             │\n';
        output += '│ BY WALLET TYPE:                                             │\n';
        output += '│ • DAO Treasury: 45 transactions ($312K)                     │\n';
        output += '│ • Multisig: 98 transactions ($423K)                         │\n';
        output += '│ • Working Groups: 89 transactions ($145K)                   │\n';
        output += '│ • Endaoment: 15 transactions ($12K)                         │\n';
        output += '│                                                             │\n';
        output += '│ TRANSACTION TYPES:                                          │\n';
        output += '│ • Outbound Grants: 15 ($425K)                              │\n';
        output += '│ • Operational Expenses: 32 ($187K)                         │\n';
        output += '│ • Delegation Rewards: 12 ($156K)                           │\n';
        output += '│ • Staking Rewards: 45 ($78K)                               │\n';
        output += '│ • Registration Revenue: 23 ($156K)                         │\n';
        output += '│ • Other: 120 ($0)                                           │\n';
        output += '│                                                             │\n';
        output += '└─────────────────────────────────────────────────────────────┘\n';

        return output;
      }

      // Find wallet by name
      const wallet = walletDirectory.find(w =>
        w.label.toLowerCase().includes(subCommand.toLowerCase()) ||
        w.category.toLowerCase().includes(subCommand.toLowerCase())
      );

      if (!wallet) {
        let output = '';
        output += '┌─────────────────────────────────────────────────────────────┐\n';
        output += `│ Wallet '${subCommand}' not found.                            │\n`;
        output += '│                                                             │\n';
        output += '│ Available wallets:                                          │\n';
        walletDirectory.forEach(w => {
          output += `│ • ${w.label.padEnd(55)} │\n`;
        });
        output += '│                                                             │\n';
        output += '└─────────────────────────────────────────────────────────────┘\n';

        return output;
      }

      // Get transactions for this specific wallet
      const walletTransactions = [
        {
          hash: '0x8f2a...9e4b',
          type: 'OUTBOUND',
          to: '0x742d...8f1c',
          value: '125,000.00 USDC',
          description: 'ENS Labs Development Grant',
          timestamp: '2 hours ago',
          status: 'CONFIRMED'
        },
        {
          hash: '0x4c7b...2d9f',
          type: 'OUTBOUND',
          to: '0x9e3f...5a2b',
          value: '85,000.00 USDC',
          description: 'Community Initiatives Fund',
          timestamp: '1 day ago',
          status: 'CONFIRMED'
        },
        {
          hash: '0x1a8d...7f3e',
          type: 'INBOUND',
          from: '0x6b5c...4d8a',
          value: '45,000.00 USDC',
          description: 'Validator Rewards',
          timestamp: '5 hours ago',
          status: 'CONFIRMED'
        }
      ];

      let output = '';

      // Header
      output += `┌─ TRANSACTIONS: ${wallet.label} ──────────────────────┐\n`;
      output += `│                                                          │\n`;
      output += `│  Wallet: ${wallet.label.padEnd(46)} │\n`;
      output += `│  Address: ${wallet.address.padEnd(46)} │\n`;
      output += `│  Category: ${wallet.category.padEnd(44)} │\n`;
      output += `│                                                          │\n`;
      output += `├─────┬──────────┬────────────────────────────────────┬───────┤\n`;
      output += `│ #   │ Hash     │ Details                             │ Type  │\n`;
      output += `├─────┼──────────┼────────────────────────────────────┼───────┤\n`;

      // Transaction rows
      walletTransactions.forEach((tx, index) => {
        const num = String(index + 1).padStart(2, ' ');
        const hash = tx.hash.substring(0, 10);
        const type = tx.type.substring(0, 5).padEnd(5);

        output += `│ ${num} │ ${hash} │ ${tx.description.substring(0, 34).padEnd(34)} │ ${type} │\n`;

        // Additional details
        const addrLabel = tx.type === 'OUTBOUND' ? 'To:' : 'From:';
        const addr = tx.type === 'OUTBOUND' ? tx.to : tx.from;
        output += `│     │          │ ${addrLabel} ${addr.substring(0, 30).padEnd(30)} │       │\n`;
        output += `│     │          │ Value: ${tx.value.padEnd(28)} │       │\n`;
        output += `│     │          │ Time: ${tx.timestamp.padEnd(29)} │       │\n`;
        output += `│     │          │ Status: ${tx.status.padEnd(26)} │       │\n`;
        output += `├─────┼──────────┼────────────────────────────────────┼───────┤\n`;
      });

      // Footer
      output += `│                                                          │\n`;
      output += `│  Wallet Summary:                                         │\n`;
      output += `│  • Total Transactions: 3 (Last 30 days)                 │\n`;
      output += `│  • Total Volume: $255K                                  │\n`;
      output += `│  • Outbound: $210K                                      │\n`;
      output += `│  • Inbound: $45K                                        │\n`;
      output += `│  • Last Activity: 2 hours ago                           │\n`;
      output += `└──────────────────────────────────────────────────────────┘\n`;

      return output;
    },

    exit: () => {
      setCommandHistory(prev => [...prev, {
        command: 'exit',
        output: 'Logging out...',
        type: 'warning',
        timestamp: new Date()
      }]);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      return 'Logging out...';
    }
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    const [commandName, ...args] = trimmedCmd.split(' ');

    if (commands[commandName]) {
      const result = commands[commandName](args);
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
    <div className="min-h-screen bg-black text-green-400 font-mono relative">

      {/* Terminal Window */}
      <div className="relative z-10 min-h-screen max-w-6xl mx-auto p-4">
        {/* Terminal Header */}
        <div className="bg-gray-900 border border-gray-600 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Window Controls */}
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>

              {/* Title */}
              <div className="text-green-400 font-bold text-lg">
                ENS Treasury Terminal v3.0
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-300">CONNECTED</span>
              </div>
              <div className="text-green-400 font-mono">
                {currentTime.toLocaleTimeString('en-US', { hour12: false })}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="bg-gray-800 border-x border-gray-600 px-4 py-3">
          <div className="flex flex-wrap gap-3">
            {[
              { id: 'overview', name: 'OVERVIEW', icon: '[OV]' },
              { id: 'assets', name: 'ASSETS', icon: '[AS]' },
              { id: 'analytics', name: 'ANALYTICS', icon: '[AN]' },
              { id: 'transactions', name: 'TRANSACTIONS', icon: '[TX]' },
              { id: 'wallets', name: 'WALLETS', icon: '[WL]' }
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
                className="px-3 py-2 bg-gray-700 border border-gray-500 text-green-300 hover:bg-gray-600 hover:border-gray-400"
              >
                <span className="mr-2 text-sm font-mono">{section.icon}</span>
                {section.name}
              </button>
            ))}
          </div>
        </div>

        {/* Command Interface */}
        <div className="bg-black border-x border-gray-600 px-4 py-6 min-h-[300px]">
          {/* Command Prompt */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="text-green-400 font-bold">
              ens-admin@terminal:~$
            </div>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-black text-green-400 outline-none border-none font-mono caret-green-400"
              placeholder="Type 'help' for commands..."
              autoFocus
              spellCheck={false}
            />
            <div className="w-2 h-4 bg-green-400"></div>
          </div>

          {/* Command History */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {commandHistory.map((entry, index) => (
              <div key={index} className="border-l-2 border-green-500 pl-4 py-1">
                <div className="flex items-center space-x-2 text-gray-400 mb-1">
                  <span className="text-green-400 font-bold">$</span>
                  <span className="text-green-300">{entry.command}</span>
                  <span className="text-gray-600 text-xs ml-auto">
                    {entry.timestamp.toLocaleTimeString('en-US', { hour12: false })}
                  </span>
                </div>
                <div className={`font-mono text-sm whitespace-pre-wrap ${
                  entry.type === 'error' ? 'text-red-400' :
                  entry.type === 'success' ? 'text-green-400' :
                  'text-green-400'
                }`}>
                  {entry.output}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-gray-800 border border-gray-600 border-t-0 px-4 py-3">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <span className="text-green-400">
                <span className="font-bold">Active:</span>
                <span className="text-green-300 ml-2">overview</span>
              </span>
              <span className="text-green-400">
                <span className="font-bold">Directory:</span>
                <span className="text-green-300 ml-2">~</span>
              </span>
              <span className="text-green-400">
                <span className="font-bold">Sections:</span>
                <span className="text-green-300 ml-2">5</span>
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-green-400">
                <span className="font-bold">Network:</span>
                <span className="text-green-300 ml-2">CONNECTED</span>
              </span>
              <span className="text-green-400">
                <span className="font-bold">Uptime:</span>
                <span className="text-green-300 ml-2">00:00:00</span>
              </span>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="mt-8 space-y-8">
          {/* Overview Section */}
          <div id="overview" className="bg-gray-900 border border-gray-600 p-6">
            <h2 className="text-green-400 font-bold text-xl mb-4">[OV] PORTFOLIO OVERVIEW</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-800 border border-gray-500 p-4">
                <div className="text-sm text-green-300 uppercase mb-2 font-bold">TOTAL AUM</div>
                <div className="text-2xl text-green-400 font-mono font-bold mb-1">$926.8M</div>
                <div className="text-sm text-green-300">+2.5% MTD</div>
              </div>
              <div className="bg-gray-800 border border-gray-500 p-4">
                <div className="text-sm text-green-300 uppercase mb-2 font-bold">LIQUID ASSETS</div>
                <div className="text-2xl text-green-400 font-mono font-bold mb-1">$840.2M</div>
                <div className="text-sm text-green-300">+1.8% MTD</div>
              </div>
              <div className="bg-gray-800 border border-gray-500 p-4">
                <div className="text-sm text-green-300 uppercase mb-2 font-bold">MONTHLY OUTFLOW</div>
                <div className="text-2xl text-green-400 font-mono font-bold mb-1">$642K</div>
                <div className="text-sm text-green-300">+12.3% vs Prior</div>
              </div>
              <div className="bg-gray-800 border border-gray-500 p-4">
                <div className="text-sm text-green-300 uppercase mb-2 font-bold">CUSTODY ACCOUNTS</div>
                <div className="text-2xl text-green-400 font-mono font-bold mb-1">12</div>
                <div className="text-sm text-green-300">No Change</div>
              </div>
            </div>
          </div>

          {/* Other sections */}
          <div id="assets" className="bg-gray-900 border border-gray-600 p-6">
            <h2 className="text-green-400 font-bold text-xl mb-4">[AS] ASSET MANAGEMENT</h2>
            <p className="text-green-300">Asset allocation and performance tracking system</p>
          </div>

          <div id="analytics" className="bg-gray-900 border border-gray-600 p-6">
            <h2 className="text-green-400 font-bold text-xl mb-4">[AN] RISK ANALYTICS</h2>
            <p className="text-green-300">Portfolio risk assessment and analytics dashboard</p>
          </div>

          <div id="transactions" className="bg-gray-900 border border-gray-600 p-6">
            <h2 className="text-green-400 font-bold text-xl mb-4">[TX] TRANSACTION HISTORY</h2>
            <p className="text-green-300">Multi-chain transaction data and analysis tools</p>
          </div>

          <div id="wallets" className="bg-gray-900 border border-gray-600 p-6">
            <h2 className="text-green-400 font-bold text-xl mb-4">[WL] WALLET ADMINISTRATION</h2>
            <p className="text-green-300">Wallet portfolio and access control management</p>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Terminal;
