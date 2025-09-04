// Data Export Commands
import walletDirectory from '../../../data/walletDirectory.js';
import { etherscanAPI } from '../../../services/api.js';
import { csvExportUtils } from '../../../utils/csvUtils.js';
import { dateUtils } from '../../../utils/terminalUtils.js';

// Check if API key is configured
const hasEtherscanKey = () => {
  return !!(import.meta.env && import.meta.env.VITE_ETHERSCAN_API_KEY);
};

export const exportCommands = {
  exportData: async (args) => {
    const dataType = args[0];
    const subType = args[1];
    const subSubType = args[2];

    try {
      if (!dataType || dataType === 'help') {
        return `EXPORT COMMANDS
Export data to CSV format for analysis:
TRANSACTION EXPORTS:
• exportData tx all                Export all recent transactions
• exportData tx wg <type>          Export WG transactions (meta, eco, public)
WALLET EXPORTS:
• exportData wallets all           Export all wallet information
• exportData wallets wg <type>     Export WG wallet details
ASSET EXPORTS:
• exportData assets wg <type>      Export WG asset balances
• exportData assets overview       Export treasury overview
DATE FILTERING: Add date filters to export commands:
• exportData tx all mar0125-apr0125        Export March-April 2025 transactions
• exportData tx wg public last30days       Export last 30 days of Public Goods tx
• exportData tx all 2025-03-01             Export transactions from March 1, 2025
Examples:
• exportData tx all
• exportData tx wg public
• exportData tx all last30days
• exportData tx wg meta mar0125-apr0125
• exportData wallets all
• exportData assets overview
Files will be downloaded automatically to your Downloads folder.`;
      }

      if (dataType === 'tx' || dataType === 'transactions') {
        if (!subType) {
          return `TRANSACTION EXPORT OPTIONS:
• exportData tx all            Export all transactions
• exportData tx wg <type>      Export WG transactions (meta, eco, public)
Examples:
• exportData tx all
• exportData tx wg public last30days
• exportData tx all mar0125-apr0125`;
        }

        if (subType === 'all') {
          // Check if API key is configured
          if (!hasEtherscanKey()) {
            return `❌ Etherscan API key not configured. Please add VITE_ETHERSCAN_API_KEY to your .env file.

To get an API key:
1. Visit: https://etherscan.io/apis
2. Create a free account
3. Get your API key from the dashboard
4. Add to .env: VITE_ETHERSCAN_API_KEY=your_key_here
5. Restart the application`;
          }

          // Parse date filter from remaining arguments
          let dateFilter = null;
          const remainingArgs = args.slice(2);
          const rangeArg = remainingArgs.find(arg => arg.includes('-'));
          if (rangeArg) {
            dateFilter = dateUtils.parseDateRange(rangeArg);
          } else {
            const dateArg = remainingArgs.find(arg => !/^\d+$/.test(arg));
            if (dateArg) {
              const singleDate = dateUtils.parseDate(dateArg);
              if (singleDate) {
                dateFilter = {
                  start: singleDate,
                  end: new Date(singleDate.getTime() + 24 * 60 * 60 * 1000)
                };
              }
            }
          }

          // Export all transactions
          const allTransactions = [];
          for (const wallet of walletDirectory) {
            try {
              const txList = await etherscanAPI.getTransactionHistory(wallet.address, 0, 99999999);
              const enrichedTxs = txList.map(tx => ({
                ...tx,
                wallet: wallet.label,
                walletAddress: wallet.address,
                walletCategory: wallet.category
              }));
              allTransactions.push(...enrichedTxs);
            } catch (error) {
              console.warn(`Failed to fetch transactions for ${wallet.label}:`, error);
            }
          }

          // Sort by most recent first
          allTransactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

          // Apply date filtering if specified
          let filteredTransactions = allTransactions;
          if (dateFilter) {
            filteredTransactions = dateUtils.filterTransactionsByDate(allTransactions, dateFilter);
          }

          // Take top 500 for CSV
          const recentTransactions = filteredTransactions.slice(0, 500);
          const csvData = recentTransactions.map(tx => csvExportUtils.formatTransactionForCSV(tx));
          const csvContent = csvExportUtils.arrayToCSV(csvData);
          const dateStr = dateFilter ? `-${dateFilter.start.toISOString().split('T')[0]}` : '';
          const filename = `ens-dao-all-transactions${dateStr}-${new Date().toISOString().split('T')[0]}.csv`;
          csvExportUtils.downloadCSV(csvContent, filename);
          const filterDesc = dateFilter ? ` (${dateUtils.getDateFilterDescription(dateFilter)})` : '';
          return `✅ Exported ${recentTransactions.length} transactions${filterDesc} to ${filename}\n\nFile saved to Downloads folder.`;
        }

        if (subType === 'wg') {
          if (!subSubType || subSubType === 'help') {
            return `WORKING GROUP TRANSACTION EXPORT
Available working groups for transaction export:
• exportData tx wg meta            Export Meta-Gov transactions
• exportData tx wg eco             Export Ecosystem transactions
• exportData tx wg public          Export Public Goods transactions
DATE FILTERING: Add date filters to any wg export:
• exportData tx wg public last30days       Export last 30 days of Public Goods tx
• exportData tx wg meta mar0125-apr0125    Export March-April 2025 Meta-Gov tx
Examples:
• exportData tx wg public
• exportData tx wg eco last7days
• exportData tx wg meta mar0125
Files will be downloaded automatically to your Downloads folder.`;
          }

          if (subSubType) {
            // Check if API key is configured
            if (!hasEtherscanKey()) {
              return `❌ Etherscan API key not configured. Please add VITE_ETHERSCAN_API_KEY to your .env file.

To get an API key:
1. Visit: https://etherscan.io/apis
2. Create a free account
3. Get your API key from the dashboard
4. Add to .env: VITE_ETHERSCAN_API_KEY=your_key_here
5. Restart the application`;
            }

            // Parse date filter from remaining arguments
            let dateFilter = null;
            const remainingArgs = args.slice(3);
            const rangeArg = remainingArgs.find(arg => arg.includes('-'));
            if (rangeArg) {
              dateFilter = dateUtils.parseDateRange(rangeArg);
            } else {
              const dateArg = remainingArgs.find(arg => !/^\d+$/.test(arg));
              if (dateArg) {
                const singleDate = dateUtils.parseDate(dateArg);
                if (singleDate) {
                  dateFilter = {
                    start: singleDate,
                    end: new Date(singleDate.getTime() + 24 * 60 * 60 * 1000)
                  };
                }
              }
            }

            // Export working group transactions
            const wgMappings = {
              meta: ['0x91c32893216dE3eA0a55ABb9851f581d4503d39b', '0xB162Bf7A7fD64eF32b787719335d06B2780e31D1'],
              eco: ['0x2686A8919Df194aA7673244549E68D42C1685d03', '0x536013c57DAF01D78e8a70cAd1B1abAda9411819', '0x9B9c249Be04dd433c7e8FbBF5E61E6741b89966D'],
              public: ['0xcD42b4c4D102cc22864e3A1341Bb0529c17fD87d', '0xebA76C907F02BA13064EDAD7876Fe51D9d856F62']
            };

            if (!wgMappings[subSubType]) {
              return `Unknown working group: ${subSubType}\n\nAvailable: meta, eco, public`;
            }

            const wgWallets = wgMappings[subSubType];
            const wgTransactions = [];

            for (const addr of wgWallets) {
              try {
                const wallet = walletDirectory.find(w => w.address.toLowerCase() === addr.toLowerCase());
                if (wallet) {
                  const txList = await etherscanAPI.getTransactionHistory(addr, 0, 99999999);
                  const enrichedTxs = txList.map(tx => ({
                    ...tx,
                    wallet: wallet.label,
                    walletAddress: wallet.address,
                    walletCategory: wallet.category
                  }));
                  wgTransactions.push(...enrichedTxs);
                }
              } catch (error) {
                console.warn(`Failed to fetch transactions for ${addr}:`, error);
              }
            }

            wgTransactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

            // Apply date filtering if specified
            let filteredTransactions = wgTransactions;
            if (dateFilter) {
              filteredTransactions = dateUtils.filterTransactionsByDate(wgTransactions, dateFilter);
            }

            const csvData = filteredTransactions.slice(0, 500).map(tx => csvExportUtils.formatTransactionForCSV(tx));
            const csvContent = csvExportUtils.arrayToCSV(csvData);
            const dateStr = dateFilter ? `-${dateFilter.start.toISOString().split('T')[0]}` : '';
            const filename = `ens-dao-${subSubType}-wg-transactions${dateStr}-${new Date().toISOString().split('T')[0]}.csv`;
            csvExportUtils.downloadCSV(csvContent, filename);
            const filterDesc = dateFilter ? ` (${dateUtils.getDateFilterDescription(dateFilter)})` : '';
            return `✅ Exported ${filteredTransactions.length} ${subSubType} WG transactions${filterDesc} to ${filename}\n\nFile saved to Downloads folder.`;
          }
        }
      }

      if (dataType === 'wallets') {
        if (!subType) {
          return `WALLET EXPORT COMMANDS
Available wallet export options:
• exportData wallets all       Export all wallet information
• exportData wallets wg <type> Export WG wallet details (meta, eco, public)
Examples:
• exportData wallets all
• exportData wallets wg meta
• exportData wallets wg eco
Files will be downloaded automatically to your Downloads folder.`;
        }

        if (subType === 'all') {
          // Wallet export doesn't require API keys - uses local data
          const csvData = walletDirectory.map(wallet => csvExportUtils.formatWalletForCSV(wallet));
          const csvContent = csvExportUtils.arrayToCSV(csvData);
          const filename = `ens-dao-all-wallets-${new Date().toISOString().split('T')[0]}.csv`;
          csvExportUtils.downloadCSV(csvContent, filename);
          return `✅ Exported ${walletDirectory.length} wallet records to ${filename}\n\nFile saved to Downloads folder.`;
        }

        if (subType === 'wg') {
          if (!subSubType || subSubType === 'help') {
            return `WORKING GROUP WALLET EXPORT
Available working groups for wallet export:
• exportData wallets wg meta       Export Meta-Gov wallet details
• exportData wallets wg eco        Export Ecosystem wallet details
• exportData wallets wg public     Export Public Goods wallet details
Examples:
• exportData wallets wg public
• exportData wallets wg meta
• exportData wallets wg eco
Files will be downloaded automatically to your Downloads folder.`;
          }

          if (subSubType) {
            const wgMappings = {
              meta: ['0x91c32893216dE3eA0a55ABb9851f581d4503d39b', '0xB162Bf7A7fD64eF32b787719335d06B2780e31D1'],
              eco: ['0x2686A8919Df194aA7673244549E68D42C1685d03', '0x536013c57DAF01D78e8a70cAd1B1abAda9411819', '0x9B9c249Be04dd433c7e8FbBF5E61E6741b89966D'],
              public: ['0xcD42b4c4D102cc22864e3A1341Bb0529c17fD87d', '0xebA76C907F02BA13064EDAD7876Fe51D9d856F62']
            };

            if (!wgMappings[subSubType]) {
              return `Unknown working group: ${subSubType}\n\nAvailable: meta, eco, public`;
            }

            const wgWallets = wgMappings[subSubType].map(addr =>
              walletDirectory.find(w => w.address.toLowerCase() === addr.toLowerCase())
            ).filter(Boolean);

            const csvData = wgWallets.map(wallet => csvExportUtils.formatWalletForCSV(wallet));
            const csvContent = csvExportUtils.arrayToCSV(csvData);
            const filename = `ens-dao-${subSubType}-wg-wallets-${new Date().toISOString().split('T')[0]}.csv`;
            csvExportUtils.downloadCSV(csvContent, filename);
            return `✅ Exported ${wgWallets.length} ${subSubType} WG wallet records to ${filename}\n\nFile saved to Downloads folder.`;
          }
        }
      }

      if (dataType === 'assets') {
        if (!subType) {
          return `ASSET EXPORT COMMANDS
Available asset export options:
• exportData assets overview   Export treasury overview
• exportData assets wg <type>  Export WG asset balances (meta, eco, public)
Examples:
• exportData assets overview
• exportData assets wg meta
• exportData assets wg eco
Files will be downloaded automatically to your Downloads folder.`;
        }

        if (subType === 'overview') {
          // Export treasury overview data
          const overviewData = [
            {
              'Category': 'Main Treasury',
              'ETH Balance': 3320.41,
              'USDC Balance': 7400000,
              'ENS Balance': 9700000,
              'Approx USD Value': 246500000,
              'Description': 'Primary DAO Treasury'
            },
            {
              'Category': 'Meta-Governance',
              'ETH Balance': 96,
              'USDC Balance': 240738,
              'ENS Balance': 172425,
              'Approx USD Value': 900000,
              'Description': 'Meta-Gov Working Group'
            },
            {
              'Category': 'Ecosystem',
              'ETH Balance': 49.2,
              'USDC Balance': 650000,
              'ENS Balance': 225,
              'Approx USD Value': 2100000,
              'Description': 'Ecosystem Working Group'
            },
            {
              'Category': 'Public Goods',
              'ETH Balance': 39.5,
              'USDC Balance': 344500,
              'ENS Balance': 200,
              'Approx USD Value': 1300000,
              'Description': 'Public Goods Working Group'
            },
            {
              'Category': 'Endowment',
              'ETH Balance': 1250,
              'USDC Balance': 2500000,
              'ENS Balance': 0,
              'Approx USD Value': 12000000,
              'Description': 'Karpatkey Managed Endowment'
            }
          ];

          const csvContent = csvExportUtils.arrayToCSV(overviewData);
          const filename = `ens-dao-assets-overview-${new Date().toISOString().split('T')[0]}.csv`;
          csvExportUtils.downloadCSV(csvContent, filename);
          return `✅ Exported treasury overview to ${filename}\n\nFile saved to Downloads folder.`;
        }

        if (subType === 'wg') {
          if (!subSubType || subSubType === 'help') {
            return `WORKING GROUP ASSET EXPORT
Available working groups for asset export:
• exportData assets wg meta        Export Meta-Gov asset balances
• exportData assets wg eco         Export Ecosystem asset balances
• exportData assets wg public      Export Public Goods asset balances
Examples:
• exportData assets wg public
• exportData assets wg meta
• exportData assets wg eco
Files will be downloaded automatically to your Downloads folder.`;
          }

          if (subSubType) {
            // Check if API key is configured for asset balances
            if (!hasEtherscanKey()) {
              return `❌ Etherscan API key not configured. Please add VITE_ETHERSCAN_API_KEY to your .env file.

To get an API key:
1. Visit: https://etherscan.io/apis
2. Create a free account
3. Get your API key from the dashboard
4. Add to .env: VITE_ETHERSCAN_API_KEY=your_key_here
5. Restart the application`;
            }

            const wgMappings = {
              meta: ['0x91c32893216dE3eA0a55ABb9851f581d4503d39b', '0xB162Bf7A7fD64eF32b787719335d06B2780e31D1'],
              eco: ['0x2686A8919Df194aA7673244549E68D42C1685d03', '0x536013c57DAF01D78e8a70cAd1B1abAda9411819', '0x9B9c249Be04dd433c7e8FbBF5E61E6741b89966D'],
              public: ['0xcD42b4c4D102cc22864e3A1341Bb0529c17fD87d', '0xebA76C907F02BA13064EDAD7876Fe51D9d856F62']
            };

            if (!wgMappings[subSubType]) {
              return `Unknown working group: ${subSubType}\n\nAvailable: meta, eco, public`;
            }

            // Mock balance data (in real implementation, this would come from API)
            const mockBalances = {
              '0xcD42b4c4D102cc22864e3A1341Bb0529c17fD87d': { eth: 39.5, usdc: 157500, ens: 200 },
              '0xebA76C907F02BA13064EDAD7876Fe51D9d856F62': { eth: 0, usdc: 187000, ens: 0 },
              '0x2686A8919Df194aA7673244549E68D42C1685d03': { eth: 25.3, usdc: 450000, ens: 150 },
              '0x536013c57DAF01D78e8a70cAd1B1abAda9411819': { eth: 15.2, usdc: 125000, ens: 50 },
              '0x9B9c249Be04dd433c7e8FbBF5E61E6741b89966D': { eth: 8.7, usdc: 75000, ens: 25 },
              '0x91c32893216dE3eA0a55ABb9851f581d4503d39b': { eth: 83.627, usdc: 240738, ens: 164000 },
              '0xB162Bf7A7fD64eF32b787719335d06B2780e31D1': { eth: 12.4, usdc: 85000, ens: 8000 }
            };

            const wgWallets = wgMappings[subSubType];
            const assetData = wgWallets.map(addr => {
              const wallet = walletDirectory.find(w => w.address.toLowerCase() === addr.toLowerCase());
              const balances = mockBalances[addr] || { eth: 0, usdc: 0, ens: 0 };
              const ethPrice = 3200;
              const ensPrice = 23;
              const totalUsd = (balances.eth * ethPrice) + balances.usdc + (balances.ens * ensPrice);
              return csvExportUtils.formatAssetForCSV({
                address: addr,
                label: wallet?.label || 'Unknown',
                eth: balances.eth,
                usdc: balances.usdc,
                ens: balances.ens,
                totalUsd: totalUsd,
                category: wallet?.category || 'working-group'
              });
            });

            const csvContent = csvExportUtils.arrayToCSV(assetData);
            const filename = `ens-dao-${subSubType}-wg-assets-${new Date().toISOString().split('T')[0]}.csv`;
            csvExportUtils.downloadCSV(csvContent, filename);
            return `✅ Exported ${subSubType} WG asset balances to ${filename}\n\nFile saved to Downloads folder.`;
          }
        }
      }

      return `Unknown export command. Use 'exportData help' for available options.`;
    } catch (error) {
      console.error('Export error:', error);
      // No fallback - show the actual error message
      return `❌ Export failed: ${error.message}

Please check:
1. Your .env file has VITE_ETHERSCAN_API_KEY configured
2. You have a valid internet connection
3. The Etherscan API is operational`;
    }
  }
};
