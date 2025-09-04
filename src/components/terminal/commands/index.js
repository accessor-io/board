// Terminal Commands Index - Combines all command modules
import { coreCommands } from './coreCommands.js';
import { financialCommands } from './financialCommands.js';
import { workingGroupCommands } from './workingGroupCommands.js';
import { exportCommands } from './exportCommands.js';
import { serviceProviderCommands } from './serviceProviderCommands.js';
import { walletCommands } from './walletCommands.js';

// Combine all command modules into a single commands object
export const commands = {
  // Core commands
  ...coreCommands,

  // Financial analysis commands
  ...financialCommands,

  // Working group commands
  ...workingGroupCommands,

  // Data export commands
  ...exportCommands,

  // Service provider commands
  ...serviceProviderCommands,

  // Wallet management commands
  ...walletCommands,

  // Status command (moved to core)
  status: () => `ENS DAO FINANCIAL INFRASTRUCTURE

TREASURY OVERVIEW:
• Main Treasury: $246M+ in multi-sig wallets
• Endowment Fund: $12M managed by Karpatkey
• Working Groups: $2-5M per group reserves
• Emergency Fund: $10M in stablecoins

BLOCKCHAIN INFRASTRUCTURE:
• Primary Network: Ethereum Mainnet
• Layer 2 Networks: Arbitrum, Optimism, Base
• Cross-chain Bridges: Supported for major assets
• Multi-sig Security: 4/7 threshold for large transfers

GOVERNANCE STRUCTURE:
• ENS Token: $ENS governance token (100M supply)
• Working Groups: Meta-Gov, Ecosystem, Public Goods
• Treasury Council: Multi-sig control over spending
• Community Proposals: Snapshot voting system

CURRENT INITIATIVES:
• Treasury Diversification: Multi-asset portfolio
• Yield Optimization: DeFi strategies for returns
• Risk Management: Smart contract security audits
• Transparency Enhancement: Real-time reporting dashboards`
};
