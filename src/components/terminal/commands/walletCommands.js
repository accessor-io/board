// Wallet Management Commands
import walletDirectory from '../../../data/walletDirectory.js';

export const walletCommands = {
  wallets: (args) => {
    const subCommand = args[0];
    const subSubCommand = args[1];

    if (!subCommand || subCommand === 'help') {
      return `Wallet Management Commands

Available Commands:
  wallets all              Show all ENS DAO wallets
  wallets wg <type>        Show working group wallets (meta, eco, public)
  wallets dao              Show main DAO treasury wallets
  wallets treasury         Show treasury and endowment wallets
  wallets help             Show this help message

Wallet Categories:
  Main Treasury: Primary multi-sig wallets
  Working Groups: WG-specific operational wallets
  Endowment: Karpatkey-managed endowment fund
  Grants: Ecosystem and community funding wallets

Examples:
  wallets all              List all wallets with balances
  wallets wg meta          Show Meta-Governance wallets
  wallets dao              Show main DAO treasury
  wallets treasury         Show treasury and endowment`;
    }

    if (subCommand === 'all') {
      let output = `All ENS DAO Wallets\n\n`;
      output += `Total Wallets: ${walletDirectory.length}\n\n`;

      walletDirectory.forEach(wallet => {
        output += `${wallet.label}\n`;
        output += `  Address: ${wallet.address}\n`;
        output += `  Category: ${wallet.category}\n`;
        output += `  Network: Ethereum Mainnet\n`;
        output += `  Type: ${wallet.type || 'Multi-sig'}\n\n`;
      });

      output += `Use 'assets wg wallet <type>' to see wallet balances.\n`;
      output += `Use 'exportData wallets all' to export wallet data to CSV.`;

      return output;
    }

    if (subCommand === 'wg') {
      if (!subSubCommand || subSubCommand === 'help') {
        return `Working Group Wallets

Available Working Groups:
  wallets wg meta          Meta-Governance working group wallets
  wallets wg eco           Ecosystem working group wallets
  wallets wg public        Public Goods working group wallets

Wallet Details:
  Meta-Governance: Core protocol and governance operations
  Ecosystem: Grant program and partnership management
  Public Goods: Documentation and transparency initiatives

Examples:
  wallets wg meta          Show Meta-Gov wallet details
  wallets wg eco           Show Ecosystem wallet details
  wallets wg public        Show Public Goods wallet details`;
      }

      const wgMappings = {
        meta: ['0x91c32893216dE3eA0a55ABb9851f581d4503d39b', '0xB162Bf7A7fD64eF32b787719335d06B2780e31D1'],
        eco: ['0x2686A8919Df194aA7673244549E68D42C1685d03', '0x536013c57DAF01D78e8a70cAd1B1abAda9411819', '0x9B9c249Be04dd433c7e8FbBF5E61E6741b89966D'],
        public: ['0xcD42b4c4D102cc22864e3A1341Bb0529c17fD87d', '0xebA76C907F02BA13064EDAD7876Fe51D9d856F62']
      };

      if (!wgMappings[subSubCommand]) {
        return `Unknown working group: ${subSubCommand}\n\nAvailable: meta, eco, public\n\nUse 'wallets wg help' for more information.`;
      }

      const wgWallets = wgMappings[subSubCommand].map(addr =>
        walletDirectory.find(w => w.address.toLowerCase() === addr.toLowerCase())
      ).filter(Boolean);

      let output = `${subSubCommand} Working Group Wallets\n\n`;
      output += `Total Wallets: ${wgWallets.length}\n\n`;

      wgWallets.forEach(wallet => {
        output += `${wallet.label}\n`;
        output += `  Address: ${wallet.address}\n`;
        output += `  Category: ${wallet.category}\n`;
        output += `  Network: Ethereum Mainnet\n`;
        output += `  Type: Multi-sig (${wallet.signers || 4}/7 threshold)\n\n`;
      });

      output += `Use 'assets wg wallet ${subSubCommand}' to see wallet balances.\n`;
      output += `Use 'exportData wallets wg ${subSubCommand}' to export wallet data to CSV.`;

      return output;
    }

    if (subCommand === 'dao') {
      const daoWallets = walletDirectory.filter(w => w.category.includes('DAO') || w.category.includes('Treasury'));

      let output = `Main DAO Treasury Wallets\n\n`;
      output += `Total DAO Wallets: ${daoWallets.length}\n\n`;

      daoWallets.forEach(wallet => {
        output += `${wallet.label}\n`;
        output += `  Address: ${wallet.address}\n`;
        output += `  Category: ${wallet.category}\n`;
        output += `  Network: Ethereum Mainnet\n`;
        output += `  Type: Multi-sig (${wallet.signers || 7}/9 threshold)\n`;
        output += `  Purpose: Primary treasury operations\n\n`;
      });

      output += `These wallets control the main ENS DAO treasury assets.\n`;
      output += `Use 'assets overview' to see treasury balances.`;

      return output;
    }

    if (subCommand === 'treasury') {
      const treasuryWallets = walletDirectory.filter(w =>
        w.category.includes('Treasury') || w.category.includes('Endowment')
      );

      let output = `Treasury & Endowment Wallets\n\n`;
      output += `Total Treasury Wallets: ${treasuryWallets.length}\n\n`;

      treasuryWallets.forEach(wallet => {
        output += `${wallet.label}\n`;
        output += `  Address: ${wallet.address}\n`;
        output += `  Category: ${wallet.category}\n`;
        output += `  Network: Ethereum Mainnet\n`;
        output += `  Type: Multi-sig (${wallet.signers || 4}/7 threshold)\n`;
        output += `  Assets: $246M+ in stablecoins and ETH\n\n`;
      });

      output += `Treasury Composition:\n`;
      output += `  Main Treasury: Primary operational funds\n`;
      output += `  Endowment Fund: Long-term investment portfolio\n`;
      output += `  Working Groups: Operational reserves\n\n`;

      output += `Use 'assets overview' to see detailed asset breakdown.`;

      return output;
    }

    return `Unknown wallet command: ${subCommand}\n\nUse 'wallets help' for available commands.`;
  }
};
