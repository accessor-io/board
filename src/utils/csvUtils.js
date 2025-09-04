// CSV Export Utilities
export const csvExportUtils = {
  arrayToCSV: (data, headers = null) => {
    if (!data || data.length === 0) return '';

    // If no headers provided, use object keys from first item
    const csvHeaders = headers || Object.keys(data[0]);

    // Create CSV header row
    let csvContent = csvHeaders.join(',') + '\n';

    // Add data rows
    data.forEach(item => {
      const row = csvHeaders.map(header => {
        const value = item[header];
        if (value === null || value === undefined) return '';
        const stringValue = String(value);
        // Escape quotes and wrap in quotes if contains comma, quote, or newline
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return '"' + stringValue.replace(/"/g, '""') + '"';
        }
        return stringValue;
      });
      csvContent += row.join(',') + '\n';
    });

    return csvContent;
  },

  downloadCSV: (csvContent, filename) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  },

  formatTransactionForCSV: (tx) => ({
    'Date': tx.timestamp,
    'Block': tx.blockNumber,
    'Hash': tx.hash,
    'From': tx.from,
    'To': tx.to,
    'Value (ETH)': tx.value,
    'Value (USD)': tx.valueUSD || '',
    'Gas Used': tx.gasUsed,
    'Gas Price': tx.gasPrice,
    'Method': tx.method || '',
    'Wallet': tx.wallet,
    'Wallet Category': tx.walletCategory,
    'Token Transfers': tx.tokenTransfers ? tx.tokenTransfers.join('; ') : '',
    'Internal Transactions': tx.internalTxs ? tx.internalTxs.join('; ') : ''
  }),

  formatWalletForCSV: (wallet) => ({
    'Address': wallet.address,
    'Label': wallet.label,
    'Category': wallet.category,
    'Network': wallet.network || 'mainnet',
    'Description': wallet.description || '',
    'Tags': wallet.tags ? wallet.tags.join('; ') : '',
    'Last Activity': wallet.lastActivity || ''
  }),

  formatAssetForCSV: (asset) => ({
    'Address': asset.address,
    'Label': asset.label,
    'ETH Balance': asset.eth || 0,
    'USDC Balance': asset.usdc || 0,
    'ENS Balance': asset.ens || 0,
    'Total USD Value': asset.totalUsd || 0,
    'Category': asset.category || '',
    'Last Updated': asset.lastUpdated || new Date().toISOString()
  })
};
