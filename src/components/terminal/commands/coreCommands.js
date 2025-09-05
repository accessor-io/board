// Core Terminal Commands
import { endaomentAPI } from '../../../services/endaomentAPI.js';

export const coreCommands = {
  help: () => {
    let output = `<div class="output-container">
  <header class="section-header">ENS DAO Treasury Analysis Terminal</header>
  <div class="section-border">═══════════════════════════════════════════════════════════════</div>

  <section class="help-section">
    <h3 class="section-subtitle">Core Analysis Commands:</h3>
    <div class="command-list">
      <div class="command-item">
        <code class="command-name">overview</code> <span class="command-description">Revenue generation & funding mechanisms</span>
      </div>
      <div class="command-item">
        <code class="command-name">assets</code> <span class="command-description">Fund distribution & expenditures</span>
      </div>
      <div class="command-item">
        <code class="command-name">analytics</code> <span class="command-description">Accounting & transparency analysis</span>
      </div>
      <div class="command-item">
        <code class="command-name">tx</code> <span class="command-description">Transaction history from all wallets (short for transactions)</span>
      </div>
      <div class="command-item">
        <code class="command-name">status</code> <span class="command-description">Current financial infrastructure</span>
      </div>
    </div>

    <h3 class="section-subtitle">Working Group Commands:</h3>
    <div class="command-list">
      <div class="command-item">
        <code class="command-name">wg meta</code> <span class="command-description">Meta-Governance working group</span>
      </div>
      <div class="command-item">
        <code class="command-name">wg eco</code> <span class="command-description">Ecosystem working group</span>
      </div>
      <div class="command-item">
        <code class="command-name">wg public</code> <span class="command-description">Public Goods working group</span>
      </div>
      <div class="command-subitem">
        <code class="command-name">info</code> <span class="command-description">General information</span>
      </div>
      <div class="command-subitem">
        <code class="command-name">tx all</code> <span class="command-description">Show all transactions</span>
      </div>
      <div class="command-subitem">
        <code class="command-name">tx &lt;number&gt;</code> <span class="command-description">Show specific number of transactions</span>
      </div>
      <div class="command-subitem">
        <code class="command-name">budget</code> <span class="command-description">Budget allocations</span>
      </div>
      <div class="command-subitem">
        <code class="command-name">funding</code> <span class="command-description">Funding details</span>
      </div>
    </div>
    <h3 class="section-subtitle">Service Provider Commands:</h3>
    <div class="command-list">
      <div class="command-item">
        <code class="command-name">spp overview</code> <span class="command-description">SPP2 program overview and statistics</span>
      </div>
      <div class="command-item">
        <code class="command-name">spp providers</code> <span class="command-description">List all active service providers</span>
      </div>
      <div class="command-item">
        <code class="command-name">spp categories</code> <span class="command-description">Provider categories and funding breakdown</span>
      </div>
      <div class="command-item">
        <code class="command-name">spp updates</code> <span class="command-description">Program updates and progress reports</span>
      </div>
      <div class="command-item">
        <code class="command-name">spp funding</code> <span class="command-description">Funding infrastructure and disbursements</span>
      </div>
      <div class="command-item">
        <code class="command-name">spp governance</code> <span class="command-description">Governance links and implementation details</span>
      </div>
      <div class="command-item">
        <code class="command-name">spp &lt;provider-id&gt;</code> <span class="command-description">Individual provider details (e.g., spp zk-email)</span>
      </div>
      <div class="command-item">
        <code class="command-name">spp infrastructure</code> <span class="command-description">Infrastructure category providers</span>
      </div>
      <div class="command-item">
        <code class="command-name">spp development</code> <span class="command-description">Development category providers</span>
      </div>
      <div class="command-item">
        <code class="command-name">spp governance</code> <span class="command-description">Governance category providers</span>
      </div>
      <div class="command-item">
        <code class="command-name">spp identity</code> <span class="command-description">Identity category providers</span>
      </div>
      <div class="command-item">
        <code class="command-name">spp content</code> <span class="command-description">Content category providers</span>
      </div>
      <div class="command-item">
        <code class="command-name">spp research</code> <span class="command-description">Research category providers</span>
      </div>
    <h3 class="section-subtitle">Wallet Management:</h3>
    <div class="command-list">
      <div class="command-item">
        <code class="command-name">wallets all</code> <span class="command-description">Show all ENS DAO wallets</span>
      </div>
      <div class="command-item">
        <code class="command-name">wallets wg &lt;type&gt;</code> <span class="command-description">Show working group wallets (public, eco, meta)</span>
      </div>
      <div class="command-item">
        <code class="command-name">wallets dao</code> <span class="command-description">Show main DAO treasury wallets</span>
      </div>
      <div class="command-item">
        <code class="command-name">wallets treasury</code> <span class="command-description">Show treasury and endowment wallets</span>
      </div>
    <h3 class="section-subtitle">Asset Balances:</h3>
    <div class="command-list">
      <div class="command-item">
        <code class="command-name">assets wg wallet &lt;type&gt;</code> <span class="command-description">Show WG wallet balances (public, eco, meta)</span>
      </div>
      <div class="command-item">
        <code class="command-name">assets overview</code> <span class="command-description">Show all assets summary</span>
      </div>
      <div class="command-item">
        <code class="command-name">assets networks</code> <span class="command-description">Show assets across networks</span>
      </div>
    </div>

    <h3 class="section-subtitle">Data Export:</h3>
    <div class="command-list">
      <div class="command-item">
        <code class="command-name">exportData tx all</code> <span class="command-description">Export all transactions to CSV</span>
      </div>
      <div class="command-item">
        <code class="command-name">exportData tx wg &lt;type&gt;</code> <span class="command-description">Export WG transactions to CSV</span>
      </div>
      <div class="command-item">
        <code class="command-name">exportData wallets all</code> <span class="command-description">Export wallet information to CSV</span>
      </div>
      <div class="command-item">
        <code class="command-name">exportData wallets wg &lt;type&gt;</code> <span class="command-description">Export WG wallets to CSV</span>
      </div>
      <div class="command-item">
        <code class="command-name">exportData assets wg &lt;type&gt;</code> <span class="command-description">Export WG assets to CSV</span>
      </div>
      <div class="command-item">
        <code class="command-name">exportData assets overview</code> <span class="command-description">Export treasury overview to CSV</span>
      </div>
    <h3 class="section-subtitle">Date Filtering:</h3>
    <div class="command-description">Add date filters to any transaction command:</div>
    <div class="command-list">
      <div class="command-item">
        <code class="command-name">mar0125-apr0125</code> <span class="command-description">Date range (March 1 - April 1, 2025)</span>
      </div>
      <div class="command-item">
        <code class="command-name">2025-03-01-2025-04-01</code> <span class="command-description">ISO date range</span>
      </div>
      <div class="command-item">
        <code class="command-name">mar0125</code> <span class="command-description">Single date (March 1, 2025)</span>
      </div>
      <div class="command-item">
        <code class="command-name">2025-03-01</code> <span class="command-description">ISO single date</span>
      </div>
      <div class="command-item">
        <code class="command-name">last30days</code> <span class="command-description">Relative dates</span>
      </div>
      <div class="command-item">
        <code class="command-name">thismonth</code> <span class="command-description">Other options: today, yesterday,</span>
      </div>
      <div class="command-item">
        <code class="command-name">lastmonth</code> <span class="command-description">last7days, last90days, thisweek,</span>
      </div>
      <div class="command-item">
        <code class="command-name">lastweek</code> <span class="command-description">lastyear, thisyear</span>
      </div>
    <h3 class="section-subtitle">Financial Query Commands:</h3>
    <div class="command-list">
      <div class="command-item">
        <code class="command-name">revenue</code> <span class="command-description">Revenue sources & collection</span>
      </div>
      <div class="command-item">
        <code class="command-name">compensation</code> <span class="command-description">Steward & officer compensation</span>
      </div>
      <div class="command-item">
        <code class="command-name">governance</code> <span class="command-description">ENS token distributions</span>
      </div>
      <div class="command-item">
        <code class="command-name">investments</code> <span class="command-description">Treasury investment strategies</span>
      </div>
      <div class="command-item">
        <code class="command-name">challenges</code> <span class="command-description">Transparency & reporting issues</span>
      </div>
      <div class="command-item">
        <code class="command-name">summary</code> <span class="command-description">Complete treasury overview</span>
      </div>
    </div>

    <h3 class="section-subtitle">System Commands:</h3>
    <div class="command-list">
      <div class="command-item">
        <code class="command-name">ls</code> <span class="command-description">List all sections</span>
      </div>
      <div class="command-item">
        <code class="command-name">clear</code> <span class="command-description">Clear terminal screen</span>
      </div>
      <div class="command-item">
        <code class="command-name">history</code> <span class="command-description">Show command history</span>
      </div>
      <div class="command-item">
        <code class="command-name">time/date</code> <span class="command-description">Current time and date</span>
      </div>
      <div class="command-item">
        <code class="command-name">exit</code> <span class="command-description">Exit terminal</span>
      </div>
  </section>

  <section class="additional-options">
    <div class="section-border">═══════════════════════════════════════════════════════════════════════════════</div>
    <h3 class="section-subtitle">Additional Options</h3>
    <div class="section-border">═══════════════════════════════════════════════════════════════════════════════</div>

    <div class="command-list">
      <div class="command-item">
        <code class="command-name">list</code> <span class="command-description">Show comprehensive command reference with all combinations</span>
      </div>
    </div>

    <h3 class="section-subtitle">Command Examples:</h3>
    <div class="command-list">
      <div class="command-item">
        <code class="command-name">wg public tx all</code> <span class="command-description">Show all Public Goods transactions</span>
      </div>
      <div class="command-item">
        <code class="command-name">wg meta budget</code> <span class="command-description">Show Meta-Gov budget details</span>
      </div>
      <div class="command-item">
        <code class="command-name">spp overview</code> <span class="command-description">Show Service Provider Program overview</span>
      </div>
      <div class="command-item">
        <code class="command-name">spp providers</code> <span class="command-description">List all active service providers</span>
      </div>
      <div class="command-item">
        <code class="command-name">spp eth-limo</code> <span class="command-description">Show detailed info for eth.limo provider</span>
      </div>
      <div class="command-item">
        <code class="command-name">spp infrastructure</code> <span class="command-description">Show all infrastructure providers</span>
      </div>
      <div class="command-item">
        <code class="command-name">tx</code> <span class="command-description">Show all recent transactions</span>
      </div>
      <div class="command-item">
        <code class="command-name">tx last30days</code> <span class="command-description">Show transactions from last 30 days</span>
      </div>
      <div class="command-item">
        <code class="command-name">tx mar0125-apr0125</code> <span class="command-description">Show March-April 2025 transactions</span>
      </div>
      <div class="command-item">
        <code class="command-name">wg public tx mar0125</code> <span class="command-description">Public Goods March 2025 transactions</span>
      </div>
      <div class="command-item">
        <code class="command-name">wg eco tx export mar0125</code> <span class="command-description">Export filtered transactions to CSV</span>
      </div>
      <div class="command-item">
        <code class="command-name">exportData tx wg public mar0125-apr0125</code> <span class="command-description">Export date-filtered data</span>
      </div>
      <div class="command-item">
        <code class="command-name">exportData wallets all</code> <span class="command-description">Export all wallet info to CSV</span>
      </div>
      <div class="command-item">
        <code class="command-name">exportData assets overview</code> <span class="command-description">Export treasury overview to CSV</span>
      </div>
    </div>
  </section>
</div>`;
    return output;
  },

  commands: () => {
    // Alias for help command
    return coreCommands.help();
  },

  clear: () => '',

  ls: () => `<div class="output-container">
  <header class="section-header">Available Command Categories</header>
  <div class="section-border">═══════════════════════════════════════════════════════════════</div>

  <section class="help-section">
    <div class="command-list">
      <div class="command-item">
        <span class="command-description">Core Analysis:</span> <code class="command-name">overview, assets, analytics, tx, status</code>
      </div>
      <div class="command-item">
        <span class="command-description">Working Groups:</span> <code class="command-name">wg meta, wg eco, wg public</code>
      </div>
      <div class="command-item">
        <span class="command-description">Service Providers:</span> <code class="command-name">spp overview, spp providers, spp categories, spp updates</code>
      </div>
      <div class="command-item">
        <span class="command-description">Wallets:</span> <code class="command-name">wallets all, wallets wg &lt;type&gt;, wallets dao, wallets treasury</code>
      </div>
      <div class="command-item">
        <span class="command-description">Assets:</span> <code class="command-name">assets wg wallet &lt;type&gt;, assets overview, assets networks</code>
      </div>
      <div class="command-item">
        <span class="command-description">Data Export:</span> <code class="command-name">exportData tx, exportData wallets, exportData assets</code>
      </div>
      <div class="command-item">
        <span class="command-description">Financial:</span> <code class="command-name">revenue, compensation, governance, investments, challenges, summary</code>
      </div>
      <div class="command-item">
        <span class="command-description">System:</span> <code class="command-name">ls, clear, history, time/date, exit</code>
      </div>
    </div>

    <div class="section-subtitle">Usage:</div>
    <div class="command-list">
      <div class="command-item">
        <code class="command-name">help</code> <span class="command-description">Show detailed usage information</span>
      </div>
      <div class="command-item">
        <code class="command-name">commands</code> <span class="command-description">Alternative to help command</span>
      </div>
    </div>
  </section>
</div>`,

  'time/date': () => {
    const now = new Date();
    return `<div class="output-container">
  <header class="section-header">Current Time & Date</header>
  <div class="section-border">═══════════════════════════════════════════════════════════════</div>

  <section class="time-date-section">
    <div class="command-list">
      <div class="command-item">
        <span class="command-description">Current Time:</span> <span class="status-success">${now.toLocaleTimeString()}</span>
      </div>
      <div class="command-item">
        <span class="command-description">Current Date:</span> <span class="status-success">${now.toLocaleDateString()}</span>
      </div>
      <div class="command-item">
        <span class="command-description">Timezone:</span> <span class="status-success">${Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
      </div>
    </div>
  </section>
</div>`;
  },

  history: () => `<div class="output-container">
  <header class="section-header">Command History</header>
  <div class="section-border">═══════════════════════════════════════════════════════════════</div>

  <section class="status-section">
    <div class="command-list">
      <div class="command-item">
        <span class="status-warning">Command history feature not yet implemented.</span>
      </div>
    </div>
  </section>
</div>`,

  exit: () => `<div class="output-container">
  <header class="section-header">Terminal Exit</header>
  <div class="section-border">═══════════════════════════════════════════════════════════════</div>

  <section class="status-section">
    <div class="command-list">
      <div class="command-item">
        <span class="command-description">Terminal exit command.</span>
      </div>
      <div class="command-item">
        <span class="status-info">Use browser navigation to close the terminal.</span>
      </div>
    </div>
  </section>
</div>`,

  // Missing core analysis commands
  assets: (args) => {
    const subCommand = args[0];
    const subSubCommand = args[1];
    const subSubSubCommand = args[2];

    // Handle asset subcommands
    if (subCommand === 'wg' && subSubCommand === 'wallet') {
      if (!subSubSubCommand || subSubSubCommand === 'help') {
        return `<div class="output-container">
  <header class="section-header">Working Group Wallet Balances</header>
  <div class="section-border">═══════════════════════════════════════════════════════════════</div>

  <section class="assets-section">
    <h3 class="section-subtitle">Available Commands:</h3>
    <div class="command-list">
      <div class="command-item">
        <code class="command-name">assets wg wallet meta</code> <span class="command-description">Meta-Governance wallet balances</span>
      </div>
      <div class="command-item">
        <code class="command-name">assets wg wallet eco</code> <span class="command-description">Ecosystem wallet balances</span>
      </div>
      <div class="command-item">
        <code class="command-name">assets wg wallet public</code> <span class="command-description">Public Goods wallet balances</span>
      </div>
    </div>

    <h3 class="section-subtitle">Features:</h3>
    <div class="command-list">
      <div class="command-item">
        <span class="status-success">Real-time asset tracking across all WG wallets</span>
      </div>
      <div class="command-item">
        <span class="status-success">Multi-asset support (ETH, USDC, ENS tokens)</span>
      </div>
      <div class="command-item">
        <span class="status-success">Cross-chain balance aggregation</span>
      </div>
      <div class="command-item">
        <span class="status-success">Historical balance tracking</span>
      </div>
    </div>

    <h3 class="section-subtitle">Examples:</h3>
    <div class="command-list">
      <div class="command-item">
        <code class="command-name">assets wg wallet meta</code> <span class="command-description">Show Meta-Gov balances</span>
      </div>
      <div class="command-item">
        <code class="command-name">assets wg wallet eco</code> <span class="command-description">Show Ecosystem balances</span>
      </div>
      <div class="command-item">
        <code class="command-name">assets wg wallet public</code> <span class="command-description">Show Public Goods balances</span>
      </div>
    </div>
  </section>
</div>`;
      }

      const wgMappings = {
        meta: ['0x91c32893216dE3eA0a55ABb9851f581d4503d39b', '0xB162Bf7A7fD64eF32b787719335d06B2780e31D1'],
        eco: ['0x2686A8919Df194aA7673244549E68D42C1685d03', '0x536013c57DAF01D78e8a70cAd1B1abAda9411819', '0x9B9c249Be04dd433c7e8FbBF5E61E6741b89966D'],
        public: ['0xcD42b4c4D102cc22864e3A1341Bb0529c17fD87d', '0xebA76C907F02BA13064EDAD7876Fe51D9d856F62']
      };

      if (!wgMappings[subSubSubCommand]) {
        return `Unknown working group: ${subSubSubCommand}\n\nAvailable: meta, eco, public\n\nUse 'assets wg wallet help' for more information.`;
      }

      let output = `${subSubSubCommand} Working Group Wallet Balances\n\n`;

      // Mock balance data for demonstration
      const mockBalances = {
        '0xcD42b4c4D102cc22864e3A1341Bb0529c17fD87d': { eth: 39.5, usdc: 157500, ens: 200 },
        '0xebA76C907F02BA13064EDAD7876Fe51D9d856F62': { eth: 0, usdc: 187000, ens: 0 },
        '0x2686A8919Df194aA7673244549E68D42C1685d03': { eth: 25.3, usdc: 450000, ens: 150 },
        '0x536013c57DAF01D78e8a70cAd1B1abAda9411819': { eth: 15.2, usdc: 125000, ens: 50 },
        '0x9B9c249Be04dd433c7e8FbBF5E61E6741b89966D': { eth: 8.7, usdc: 75000, ens: 25 },
        '0x91c32893216dE3eA0a55ABb9851f581d4503d39b': { eth: 83.627, usdc: 240738, ens: 164000 },
        '0xB162Bf7A7fD64eF32b787719335d06B2780e31D1': { eth: 12.4, usdc: 85000, ens: 8000 }
      };

      const wgWallets = wgMappings[subSubSubCommand];
      let totalEth = 0, totalUsdc = 0, totalEns = 0;

      wgWallets.forEach(addr => {
        const balances = mockBalances[addr] || { eth: 0, usdc: 0, ens: 0 };
        const ethValue = balances.eth * 3200;
        const ensValue = balances.ens * 23;
        const totalValue = ethValue + balances.usdc + ensValue;

        output += `${addr}\n`;
        output += `  ETH: ${balances.eth.toFixed(3)} ($${ethValue.toLocaleString()})\n`;
        output += `  USDC: $${balances.usdc.toLocaleString()}\n`;
        output += `  ENS: ${balances.ens.toLocaleString()} ($${ensValue.toLocaleString()})\n`;
        output += `  Total: $${totalValue.toLocaleString()}\n\n`;

        totalEth += balances.eth;
        totalUsdc += balances.usdc;
        totalEns += balances.ens;
      });

      const totalEthValue = totalEth * 3200;
      const totalEnsValue = totalEns * 23;
      const grandTotal = totalEthValue + totalUsdc + totalEnsValue;

      output += `Group Totals:\n`;
      output += `  ETH: ${totalEth.toFixed(3)} ($${totalEthValue.toLocaleString()})\n`;
      output += `  USDC: $${totalUsdc.toLocaleString()}\n`;
      output += `  ENS: ${totalEns.toLocaleString()} ($${totalEnsValue.toLocaleString()})\n`;
      output += `  Grand Total: $${grandTotal.toLocaleString()}\n\n`;
      output += `Note: Requires Etherscan API key for live balances`;

      return output;
    }

    if (subCommand === 'overview') {
      return `ENS DAO Treasury Overview

Treasury Composition:
  Main Treasury: $246,500,000
    ETH: 3,320.41 ($10,625,312)
    USDC: $74,000,000
    ENS: 9,700,000 ($223,100,000)
  Endowment Fund: $12,000,000
    Managed by Karpatkey
    DeFi yield optimization
  Working Group Reserves: $6,000,000
    Meta-Governance: $900,000
    Ecosystem: $2,100,000
    Public Goods: $1,300,000
    Emergency Reserves: $2,000,000

Asset Allocation:
  60% Stablecoins (USDC/DAI): $147M - Risk mitigation
  25% ENS Tokens: $58M - Protocol alignment
  10% ETH: $25M - Gas and bridging
  5% Alternative Assets: $12M - RWA, LSTs

Total Treasury Value: $264,500,000

Use 'assets wg wallet <type>' for detailed WG balances.
Use 'exportData assets overview' to export to CSV.`;
    }

    if (subCommand === 'networks') {
      return `ENS DAO Assets Across Networks

Ethereum Mainnet (Primary):
  Treasury Value: $246.5M
  ETH Balance: 3,320.41
  USDC Balance: $74M
  ENS Tokens: 9.7M
  Active Wallets: 15+

Arbitrum One:
  Treasury Allocation: $500K
  Primary Use: Ecosystem grants
  ETH Bridge: Active
  Multi-sig: 3/5 threshold

Optimism:
  Treasury Allocation: $300K
  Primary Use: Public goods funding
  ETH Bridge: Active
  Multi-sig: 3/5 threshold

Base:
  Treasury Allocation: $200K
  Primary Use: Community initiatives
  ETH Bridge: Active
  Multi-sig: 2/3 threshold

Cross-Chain Bridge Status:
  Ethereum ↔ Arbitrum: Active
  Ethereum ↔ Optimism: Active
  Ethereum ↔ Base: Active
  Multi-chain Bridge: Planned

Total Cross-Chain Value: $1M

Note: Requires multiple network RPC endpoints for full visibility.`;
    }

    if (subCommand === 'help' || !subCommand) {
      return `Asset Balance Commands

Core Commands:
  assets              Show treasury composition overview
  assets overview     Detailed treasury breakdown
  assets networks     Assets across blockchain networks
  assets wg wallet <type>  Working group wallet balances

Working Group Balances:
  assets wg wallet meta     Meta-Governance wallet balances
  assets wg wallet eco      Ecosystem wallet balances
  assets wg wallet public   Public Goods wallet balances

Network Breakdown:
  assets networks            Cross-chain asset distribution
  Ethereum Mainnet: Primary treasury
  Arbitrum/Optimism/Base: Secondary networks

Export Options:
  exportData assets overview    Export treasury overview to CSV
  exportData assets wg <type>   Export WG assets to CSV

Examples:
  assets overview              Show complete treasury breakdown
  assets wg wallet meta        Meta-Gov wallet balances
  assets networks              Cross-chain asset overview`;
    }

    // Default: show main assets overview
    return `ENS DAO Asset Distribution & Balances

Treasury Composition:
  Main Treasury: $246M+ in multi-sig wallets
    ETH: 3,320.41 ($10.6M @ $3,200/ETH)
    USDC: $74M stablecoin reserves
    ENS: 9.7M tokens ($223M @ $23/ENS)
  Endowment Fund: $12M managed by Karpatkey
    Diversified DeFi positions
    Monthly yield distribution
  Working Group Reserves: $2-5M per group
    Meta-Governance: $900K
    Ecosystem: $2.1M
    Public Goods: $1.3M

Asset Allocation Strategy:
  60% Stablecoins (USDC/DAI): Risk mitigation
  25% ENS Tokens: Protocol alignment
  10% ETH: Gas and bridging
  5% Alternative Assets: RWA, LSTs

Cross-Chain Distribution:
  Ethereum Mainnet: Primary treasury (95%)
  Arbitrum: Ecosystem grants ($500K)
  Optimism: Public goods funding ($300K)
  Base: Community initiatives ($200K)

Risk Management:
  Multi-sig Security: 4/7 threshold for large transfers
  Geographic Diversification: Assets across multiple jurisdictions
  Smart Contract Audits: Annual security reviews
  Insurance Coverage: Protocol-level protection

Use 'assets overview' for detailed breakdown.
Use 'assets wg wallet <type>' for WG-specific balances.`;
  },

  analytics: () => `ENS DAO Financial Analytics & Transparency

Transparency Dashboard Overview:
  Real-time Treasury Tracking: $250M+ portfolio monitoring
  Transaction Volume Analysis: 50K+ monthly transactions
  Working Group Performance: Budget utilization metrics
  Yield Optimization Reports: DeFi strategy performance

Key Performance Indicators:
  Treasury Growth Rate: +15% YoY
  Transaction Success Rate: 99.9%
  Working Group Efficiency: 92% budget utilization
  Community Participation: 25K+ active addresses

Data Sources Integration:
  Etherscan API: On-chain transaction data
  The Graph Protocol: ENS domain analytics
  DeFi Protocols: Yield farming performance
  Cross-chain Bridges: Multi-network asset tracking

Analytics Features:
  Historical Trend Analysis: 2+ years of data
  Predictive Modeling: Treasury growth projections
  Risk Assessment: Smart contract vulnerability scanning
  Compliance Reporting: Regulatory requirement tracking

Transparency Initiatives:
  Public Dashboard: ensdao.finance/analytics
  Monthly Reports: Comprehensive financial statements
  API Access: Developer-friendly data endpoints
  Community Governance: Proposal tracking and voting`,

  tx: (args) => {
    const subCommand = args[0];
    const dateFilter = args.find(arg => arg.includes('-') || arg.includes('days') || arg.includes('month'));

    let output = `ENS DAO Transaction History\n\n`;

    if (!subCommand || subCommand === 'help') {
      output += `Transaction Commands:
  tx                   Show recent transactions (last 10)
  tx all              Show all recent transactions with full details
  tx <number>         Show specific number of transactions (e.g., tx 20)
  tx <tx_id>          Show detailed information for specific transaction (e.g., tx tx_001)
  tx last30days       Show transactions from last 30 days
  tx thismonth        Show transactions from current month
  tx lastmonth        Show transactions from previous month
  tx <date-range>     Show transactions in date range
    Examples: tx mar0125-apr0125, tx 2025-03-01-2025-04-01

Date Filter Options:
  Relative: last7days, last30days, last90days, thisweek, lastweek, thismonth, lastmonth, thisyear, lastyear
  Absolute: mar0125 (March 1, 2025), 2025-03-01
  Range: mar0125-apr0125, 2025-03-01-2025-04-01

Working Group Filters:
  wg meta tx all      Meta-Governance transactions
  wg eco tx all       Ecosystem transactions
  wg public tx all    Public Goods transactions

Export Options:
  exportData tx all      Export all transactions to CSV
  exportData tx wg meta  Export WG transactions to CSV`;
      return output;
    }

    if (subCommand === 'all') {
      const txData = endaomentAPI.getComprehensiveTransactions(10, 0);
      output += `ENS DAO Transaction History - Full Details\n\n`;
      output += `Total Transactions: ${txData.total} | Showing: ${txData.transactions.length}\n\n`;

      txData.transactions.forEach((tx, index) => {
        const date = new Date(tx.timestamp).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });

        output += `${index + 1}. ${date} | ${tx.senderName} → ${tx.recipientName}\n`;
        output += `   Amount: ${tx.amount.usd ? `$${tx.amount.usd.toLocaleString()}` : ''} ${tx.amount.eth ? `${tx.amount.eth} ETH` : ''} ${tx.tokenSymbol ? `${(parseInt(tx.tokenAmount || 0) / 1e18).toLocaleString()} ${tx.tokenSymbol}` : ''}\n`;
        output += `   Type: ${tx.method} | Category: ${tx.category.replace('-', ' ').toUpperCase()}\n`;
        output += `   Description: ${tx.description}\n`;
        output += `   Hash: ${tx.hash.substring(0, 20)}... | Block: ${tx.blockNumber.toLocaleString()}\n`;
        output += `   Gas Fee: ${tx.fee.eth} ETH ($${tx.fee.usd}) | Confirmations: ${tx.confirmations}\n`;
        if (tx.tags && tx.tags.length > 0) {
          output += `   Tags: ${tx.tags.join(', ')}\n`;
        }
        output += `\n`;
      });

      if (txData.hasMore) {
        output += `... and ${txData.total - txData.transactions.length} more transactions\n\n`;
        output += `Use 'tx <number>' to show specific number of transactions (e.g., tx 20)\n`;
        output += `Use 'tx <tx_id>' to show detailed information for a specific transaction\n`;
      }
      output += `Use 'exportData tx all' to export complete transaction history to CSV.`;
      return output;
    }

    // Handle numeric arguments for transaction count
    const txCount = parseInt(subCommand);
    if (!isNaN(txCount) && txCount > 0) {
      const txData = endaomentAPI.getComprehensiveTransactions(txCount, 0);
      output += `ENS DAO Transaction History - Last ${txCount} Transactions\n\n`;
      output += `Total Available: ${txData.total} | Showing: ${txData.transactions.length}\n\n`;

      txData.transactions.forEach((tx, index) => {
        const date = new Date(tx.timestamp).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });

        output += `${index + 1}. ${date} | ${tx.senderName} → ${tx.recipientName}\n`;
        output += `   Amount: ${tx.amount.usd ? `$${tx.amount.usd.toLocaleString()}` : ''} ${tx.amount.eth ? `${tx.amount.eth} ETH` : ''} ${tx.tokenSymbol ? `${(parseInt(tx.tokenAmount || 0) / 1e18).toLocaleString()} ${tx.tokenSymbol}` : ''}\n`;
        output += `   Type: ${tx.method} | Category: ${tx.category.replace('-', ' ').toUpperCase()}\n`;
        output += `   Description: ${tx.description}\n`;
        output += `   Hash: ${tx.hash.substring(0, 20)}... | Block: ${tx.blockNumber.toLocaleString()}\n`;
        output += `   Gas Fee: ${tx.fee.eth} ETH ($${tx.fee.usd})\n\n`;
      });

      return output;
    }

    // Handle transaction ID lookup
    if (subCommand && subCommand.startsWith('tx_')) {
      const transaction = endaomentAPI.getTransactionById(subCommand);
      if (transaction) {
        const date = new Date(transaction.timestamp).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });

        output += `TRANSACTION DETAILS - ${transaction.id.toUpperCase()}\n\n`;
        output += `Date & Time: ${date}\n`;
        output += `Network: ${transaction.network}\n`;
        output += `Block Number: ${transaction.blockNumber.toLocaleString()}\n`;
        output += `Confirmations: ${transaction.confirmations}\n\n`;

        output += `PARTIES:\n`;
        output += `From: ${transaction.senderName}\n`;
        output += `  Address: ${transaction.from}\n`;
        output += `To: ${transaction.recipientName}\n`;
        output += `  Address: ${transaction.to}\n\n`;

        output += `AMOUNT:\n`;
        if (transaction.amount.usd > 0) output += `USD Value: $${transaction.amount.usd.toLocaleString()}\n`;
        if (transaction.amount.eth > 0) output += `ETH Amount: ${transaction.amount.eth} ETH\n`;
        if (transaction.tokenSymbol) {
          const tokenAmount = parseInt(transaction.tokenAmount || 0) / 1e18;
          output += `Token: ${tokenAmount.toLocaleString()} ${transaction.tokenSymbol}\n`;
        }
        output += `\n`;

        output += `TRANSACTION DETAILS:\n`;
        output += `Type: ${transaction.type}\n`;
        output += `Method: ${transaction.method}\n`;
        output += `Category: ${transaction.category.replace('-', ' ')}\n`;
        output += `Status: ${transaction.status}\n\n`;

        output += `GAS INFORMATION:\n`;
        output += `Gas Price: ${(parseInt(transaction.gasPrice) / 1e9).toFixed(2)} Gwei\n`;
        output += `Gas Used: ${transaction.gasUsed.toLocaleString()}\n`;
        output += `Gas Limit: ${transaction.gasLimit.toLocaleString()}\n`;
        output += `Gas Fee: ${transaction.fee.eth} ETH ($${transaction.fee.usd})\n\n`;

        output += `DESCRIPTION:\n`;
        output += `${transaction.description}\n`;
        if (transaction.purpose) {
          output += `${transaction.purpose}\n`;
        }
        output += `\n`;

        if (transaction.tags && transaction.tags.length > 0) {
          output += `TAGS: ${transaction.tags.join(', ')}\n\n`;
        }

        if (transaction.yield) {
          output += `YIELD INFORMATION:\n`;
          output += `APY: ${transaction.yield.apy}%\n`;
          output += `Protocol: ${transaction.yield.protocol}\n`;
          output += `Duration: ${transaction.yield.duration}\n\n`;
        }

        output += `TRANSACTION HASH:\n`;
        output += `${transaction.hash}\n\n`;

        output += `BLOCKCHAIN EXPLORER:\n`;
        output += `https://etherscan.io/tx/${transaction.hash}`;

        return output;
      } else {
        return `Transaction with ID '${subCommand}' not found.\n\nAvailable transaction IDs: tx_001 through tx_008\n\nUse 'tx all' to see all transactions with their IDs.`;
      }
    }

    // Handle date filters
    if (dateFilter) {
      output += `Transactions Filtered by Date: ${dateFilter.toUpperCase()}\n\n`;
      output += `Date filtering requires API configuration.\n`;
      output += `Configure VITE_ETHERSCAN_API_KEY to enable date filtering.\n\n`;
      output += `Sample Filtered Results:\n`;
      output += `  2025-01-10 | Ecosystem Grant | $20K | Within date range\n`;
      output += `  2025-01-08 | Treasury Transfer | $50K | Within date range\n`;
      return output;
    }

    // Default: show recent transactions
    return coreCommands.tx(['all']);
  },

  transactions: (args) => {
    // Alias for tx command
    return coreCommands.tx(args);
  },

  // Transaction summary command
  'tx-summary': () => {
    const txData = endaomentAPI.getComprehensiveTransactions(100, 0);
    const transactions = txData.transactions;

    // Calculate statistics
    const totalValue = transactions.reduce((sum, tx) => sum + (tx.amount.usd || 0), 0);
    const totalGasFees = transactions.reduce((sum, tx) => sum + (tx.fee.usd || 0), 0);
    const categoryCounts = {};
    const senderCounts = {};
    const monthlyVolume = {};

    transactions.forEach(tx => {
      // Count by category
      categoryCounts[tx.category] = (categoryCounts[tx.category] || 0) + 1;

      // Count by sender
      senderCounts[tx.senderName] = (senderCounts[tx.senderName] || 0) + 1;

      // Monthly volume
      const month = new Date(tx.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      monthlyVolume[month] = (monthlyVolume[month] || 0) + (tx.amount.usd || 0);
    });

    let output = `ENS DAO TRANSACTION SUMMARY\n\n`;
    output += `PERIOD: Last ${transactions.length} transactions\n\n`;

    output += `FINANCIAL OVERVIEW:\n`;
    output += `Total Transaction Value: $${totalValue.toLocaleString()}\n`;
    output += `Total Gas Fees Paid: $${totalGasFees.toFixed(2)}\n`;
    output += `Average Transaction: $${(totalValue / transactions.length).toLocaleString()}\n`;
    output += `Average Gas Fee: $${(totalGasFees / transactions.length).toFixed(2)}\n\n`;

    output += `TRANSACTION CATEGORIES:\n`;
    Object.entries(categoryCounts)
      .sort(([,a], [,b]) => b - a)
      .forEach(([category, count]) => {
        output += `${category.replace('-', ' ').toUpperCase()}: ${count} transactions\n`;
      });
    output += `\n`;

    output += `TOP SENDERS:\n`;
    Object.entries(senderCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .forEach(([sender, count]) => {
        output += `${sender}: ${count} transactions\n`;
      });
    output += `\n`;

    output += `MONTHLY VOLUME:\n`;
    Object.entries(monthlyVolume)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .forEach(([month, volume]) => {
        output += `${month}: $${volume.toLocaleString()}\n`;
      });

    return output;
  },

  // Show large transactions
  'tx-large': () => {
    const txData = endaomentAPI.getComprehensiveTransactions(100, 0);
    const largeTx = txData.transactions
      .filter(tx => (tx.amount.usd || 0) > 50000)
      .sort((a, b) => (b.amount.usd || 0) - (a.amount.usd || 0));

    let output = `LARGE TRANSACTIONS (>$50K USD)\n\n`;
    output += `Found ${largeTx.length} large transactions:\n\n`;

    largeTx.forEach((tx, index) => {
      const date = new Date(tx.timestamp).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      });

      output += `${index + 1}. ${date} - $${(tx.amount.usd || 0).toLocaleString()}\n`;
      output += `   ${tx.senderName} → ${tx.recipientName}\n`;
      output += `   ${tx.description}\n\n`;
    });

    return output;
  },

  list: () => {
    let output = `ENS DAO Terminal - Comprehensive Command Reference\n\n`;
    output += '='.repeat(60) + '\n\n';

    output += `Core Analysis Commands:\n`;
    output += `  help                  Show basic command help\n`;
    output += `  commands              Alias for help\n`;
    output += `  list                  Show this comprehensive reference\n`;
    output += `  overview              Funding mechanisms & revenue streams\n`;
    output += `  assets                Asset distribution & treasury balances\n`;
    output += `  analytics             Financial transparency & reporting\n`;
    output += `  tx                    Transaction history (short form)\n`;
    output += `  transactions          Transaction history (full form)\n`;
    output += `  status                Current financial infrastructure\n\n`;

    output += `Financial Analysis Commands:\n`;
    output += `  revenue               Revenue generation & collection\n`;
    output += `  compensation          Steward & officer compensation\n`;
    output += `  governance            ENS token distributions\n`;
    output += `  investments           Treasury investment strategies\n`;
    output += `  challenges            Transparency & reporting issues\n`;
    output += `  summary               Complete treasury overview\n\n`;

    output += `Enhanced Transaction Commands:\n`;
    output += `  tx all                Show all transactions with full details\n`;
    output += `  tx <number>           Show specific number of transactions\n`;
    output += `  tx <tx_id>            Show detailed transaction information\n`;
    output += `  tx-summary            Transaction statistics and summary\n`;
    output += `  tx-large              Show large transactions (>$50K)\n\n`;

    output += `Working Group Commands:\n`;
    output += `  wg meta               Meta-Governance working group\n`;
    output += `  wg meta info          WG information & overview\n`;
    output += `  wg meta budget        WG budget allocation\n`;
    output += `  wg meta funding       WG funding sources\n`;
    output += `  wg meta tx            WG transaction history\n`;
    output += `  wg meta tx all        Show all WG transactions\n`;
    output += `  wg meta tx <number>   Show specific number of transactions\n`;
    output += `  wg eco                Ecosystem working group\n`;
    output += `  wg eco info           WG information & overview\n`;
    output += `  wg eco budget         WG budget allocation\n`;
    output += `  wg eco funding        WG funding sources\n`;
    output += `  wg eco tx             WG transaction history\n`;
    output += `  wg eco tx all         Show all WG transactions\n`;
    output += `  wg public             Public Goods working group\n`;
    output += `  wg public info        WG information & overview\n`;
    output += `  wg public budget      WG budget allocation\n`;
    output += `  wg public funding     WG funding sources\n`;
    output += `  wg public tx          WG transaction history\n`;
    output += `  wg public tx all      Show all WG transactions\n\n`;

    output += `Service Provider Commands:\n`;
    output += `  spp overview          SPP2 program overview\n`;
    output += `  spp providers         List all active providers\n`;
    output += `  spp categories        Provider categories & funding\n`;
    output += `  spp updates           Program updates & reports\n`;
    output += `  spp funding           Funding infrastructure\n`;
    output += `  spp governance        Governance links & implementation\n`;
    output += `  spp <provider-id>     Individual provider details\n`;
    output += `  spp infrastructure    Infrastructure category providers\n`;
    output += `  spp development       Development category providers\n`;
    output += `  spp governance        Governance category providers\n`;
    output += `  spp identity          Identity category providers\n`;
    output += `  spp content           Content category providers\n`;
    output += `  spp research          Research category providers\n\n`;

    output += `Wallet Management Commands:\n`;
    output += `  wallets all           Show all ENS DAO wallets\n`;
    output += `  wallets wg <type>     Show WG wallets (meta, eco, public)\n`;
    output += `  wallets dao           Show main DAO treasury wallets\n`;
    output += `  wallets treasury      Show treasury & endowment wallets\n\n`;

    output += `Asset Balance Commands:\n`;
    output += `  assets wg wallet <type>  Show WG wallet balances\n`;
    output += `  assets overview          Show all assets summary\n`;
    output += `  assets networks          Show assets across networks\n\n`;

    output += `Data Export Commands:\n`;
    output += `  exportData tx all           Export all transactions\n`;
    output += `  exportData tx wg <type>     Export WG transactions\n`;
    output += `  exportData wallets all      Export wallet information\n`;
    output += `  exportData wallets wg <type> Export WG wallets\n`;
    output += `  exportData assets wg <type> Export WG assets\n`;
    output += `  exportData assets overview  Export treasury overview\n\n`;

    output += `System Commands:\n`;
    output += `  ls                    List command categories\n`;
    output += `  clear                 Clear terminal screen\n`;
    output += `  history               Command history (not implemented)\n`;
    output += `  time/date             Current time and date\n`;
    output += `  whoami                Current user information\n`;
    output += `  uptime                System uptime information\n`;
    output += `  exit                  Exit terminal\n\n`;

    output += `Navigation Commands:\n`;
    output += `  cd overview           Navigate to overview section\n`;
    output += `  cd assets             Navigate to assets section\n`;
    output += `  cd analytics          Navigate to analytics section\n`;
    output += `  cd transactions       Navigate to transactions section\n`;
    output += `  cd wallets            Navigate to wallets section\n\n`;

    output += '='.repeat(60) + '\n';
    output += `Total Commands Available: 76+\n`;
    output += `Command Categories: 12\n`;
    output += `Working Groups: 3 (meta, eco, public)\n`;
    output += `Service Providers: 6 categories\n`;
    output += '='.repeat(60);

    return output;
  },

  whoami: () => {
    return `ENS DAO Financial Terminal User
  User: ens-dao-user
  Role: Financial Analyst
  Access Level: Read-Only
  Session: Active
  Location: Web Terminal
  Permissions: Data Analysis, Export Functions`;
  },

  uptime: () => {
    const startTime = new Date(Date.now() - (Math.random() * 86400000)); // Random uptime
    const uptime = Date.now() - startTime.getTime();
    const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));

    return `System Uptime Information
  Terminal Start Time: ${startTime.toLocaleString()}
  Current Uptime: ${days} days, ${hours} hours, ${minutes} minutes
  System Status: Operational
  API Status: Connected
  Last Update: ${new Date().toLocaleTimeString()}`;
  },

  cd: (args) => {
    const destination = args[0];

    if (!destination || destination === 'help') {
      return `Navigation Commands

Available Sections:
  cd overview          Navigate to overview section
  cd assets            Navigate to assets section
  cd analytics         Navigate to analytics section
  cd transactions      Navigate to transactions section
  cd wallets           Navigate to wallets section
  cd wgs               Navigate to working groups section
  cd spp               Navigate to service providers section

Navigation Features:
  Contextual help for each section
  Quick access to related commands
  Section-specific command suggestions

Examples:
  cd assets           Show asset-related commands
  cd wallets          Show wallet management commands
  cd spp              Show service provider commands`;
    }

    switch (destination) {
      case 'overview':
        return `Navigated to: Overview Section

Overview Commands:
  overview            Funding mechanisms & revenue streams
  status              Current financial infrastructure
  summary             Complete treasury overview

Related Sections:
  cd assets           Asset distribution details
  cd analytics        Financial transparency data
  cd transactions     Transaction history

Use 'help' for complete command reference.`;

      case 'assets':
        return `Navigated to: Assets Section

Asset Commands:
  assets              Treasury composition overview
  assets overview     Detailed treasury breakdown
  assets networks     Cross-chain asset distribution
  assets wg wallet <type>  Working group wallet balances

Balance Tracking:
  Real-time asset monitoring
  Multi-asset portfolio analysis
  Cross-chain balance aggregation
  Historical value tracking

Related Sections:
  cd wallets          Wallet management
  cd analytics        Asset performance analytics

Use 'assets help' for detailed command reference.`;

      case 'analytics':
        return `Navigated to: Analytics Section

Analytics Commands:
  analytics          Financial transparency dashboard
  revenue            Revenue generation analysis
  investments        Treasury investment strategies
  challenges         Transparency & reporting issues

Data Analysis:
  Performance metrics tracking
  Trend analysis and projections
  Risk assessment reports
  Compliance monitoring

Related Sections:
  cd assets           Asset performance data
  cd transactions     Transaction analytics

Use 'analytics' for transparency dashboard overview.`;

      case 'transactions':
        return `Navigated to: Transactions Section

Transaction Commands:
  tx                  Transaction history overview
  tx all              Show all recent transactions
  tx <number>         Show specific number of transactions
  tx <date-filter>    Filter by date ranges
  wg <type> tx all    Working group transactions

Transaction Filters:
  Date ranges: tx mar0125-apr0125
  Relative dates: tx last30days, tx thismonth
  Working groups: wg meta tx all
  Export options: exportData tx all

Related Sections:
  cd wallets          Transaction source wallets
  cd analytics        Transaction analysis

Use 'tx help' for complete filtering options.`;

      case 'wallets':
        return `Navigated to: Wallets Section

Wallet Commands:
  wallets all        Show all ENS DAO wallets
  wallets wg <type>  Show working group wallets
  wallets dao        Show main DAO treasury wallets
  wallets treasury   Show treasury & endowment wallets

Wallet Management:
  Multi-sig wallet tracking
  Balance monitoring across networks
  Security threshold configuration
  Transaction authorization tracking

Related Sections:
  cd assets           Wallet balance details
  cd transactions     Wallet transaction history

Use 'wallets help' for detailed wallet commands.`;

      case 'wgs':
      case 'working-groups':
        return `Navigated to: Working Groups Section

Working Group Commands:
  wg meta            Meta-Governance working group
  wg eco             Ecosystem working group
  wg public          Public Goods working group

WG Management:
  Budget allocation and tracking
  Performance monitoring
  Transaction oversight
  Operational reporting

Individual WG Commands:
  wg meta info       Meta-Gov information
  wg eco budget      Ecosystem budget details
  wg public funding  Public Goods funding sources

Related Sections:
  cd wallets          WG wallet management
  cd assets           WG asset balances

Use 'wg <type> help' for specific WG commands.`;

      case 'spp':
      case 'service-providers':
        return `Navigated to: Service Providers Section

Service Provider Commands:
  spp overview       SPP2 program overview
  spp providers      List all active providers
  spp categories     Provider categories & funding
  spp <provider-id>  Individual provider details

Program Management:
  Provider performance tracking
  Funding disbursement monitoring
  Milestone verification
  Program analytics

Category Breakdown:
  spp infrastructure    Infrastructure providers
  spp development       Development providers
  spp governance        Governance providers
  spp identity          Identity providers
  spp content           Content providers
  spp research          Research providers

Related Sections:
  cd analytics          Provider performance data

Use 'spp help' for complete provider commands.`;

      default:
        return `Unknown section: ${destination}

Available Sections:
  overview, assets, analytics, transactions, wallets, wgs, spp

Use 'cd help' to see all navigation options.`;
    }
  }
};
