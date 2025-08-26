import React, { useMemo, useState } from 'react';
import useENSData from '../hooks/useENSData';

const TransactionsTable = () => {
  const [filter, setFilter] = useState('all');
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(amount);
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'expenditure': 'bg-red-100 text-red-800 border border-red-200',
      'revenue': 'bg-green-100 text-green-800 border border-green-200',
      'transfer': 'bg-blue-100 text-blue-800 border border-blue-200',
      'endaoment-disbursement': 'bg-purple-100 text-purple-800 border border-purple-200',
      'eth-to-usdc-swap': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      'other': 'bg-gray-100 text-gray-800 border border-gray-200'
    };
    return colors[category] || colors['other'];
  };

  const categories = ['all', 'erc20', 'erc721', 'erc1155', 'external', 'internal'];
  const [walletFilter, setWalletFilter] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('selectedWalletFilter') || 'all';
    }
    return 'all';
  });

  const { recentTransfers } = useENSData();

  const txs = recentTransfers?.list || [];
  const wallets = useMemo(() => {
    const set = new Set(txs.map((t) => t.address).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, [txs]);

  const filteredTransactions = useMemo(() => {
    let out = txs;
    if (filter !== 'all') out = out.filter((tx) => tx.category === filter);
    if (walletFilter !== 'all') out = out.filter((tx) => tx.address === walletFilter);
    return out;
  }, [txs, filter, walletFilter]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-medium text-gray-900 uppercase tracking-wide">Transaction History</h3>
            <p className="text-sm text-gray-600 mt-2">Recent on-chain transfers across ENS DAO wallets</p>
          </div>
          <div className="flex items-end gap-4">
            <label htmlFor="category-filter" className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
              Filter by Category
            </label>
            <select
              id="category-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
            >
               {categories.map((category) => (
                <option key={category} value={category}>
                   {category === 'all' ? 'All Categories' : category.toUpperCase()}
                </option>
              ))}
            </select>
            <div>
              <label htmlFor="wallet-filter" className="block text-xs font-medium text-gray-300 mb-2 uppercase tracking-wide">
                Wallet
              </label>
              <select
                id="wallet-filter"
                value={walletFilter}
                onChange={(e) => {
                  const v = e.target.value;
                  setWalletFilter(v);
                  if (typeof window !== 'undefined') {
                    sessionStorage.setItem('selectedWalletFilter', v);
                  }
                }}
                className="border border-gray-600 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
              >
                {wallets.map((w) => (
                  <option key={w} value={w}>
                    {w === 'all' ? 'All Wallets' : formatAddress(w)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-[56px] z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Transaction
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                From → To
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Wallet
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTransactions.map((transaction, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900 font-mono">
                      {formatAddress(transaction.hash)}
                    </div>
                    <div className="text-xs text-gray-500">{transaction.asset}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono">{formatAddress(transaction.from)}</span>
                    <span>→</span>
                    <span className="font-mono">{formatAddress(transaction.to)}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900">
                    {transaction.value ? `${transaction.value.toFixed(6)} ${transaction.asset}` : '-'}
                  </div>
                  <div className="text-xs text-gray-500 capitalize">{transaction.direction}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.address ? formatAddress(transaction.address) : '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-0.5 text-[11px] font-medium rounded-full ${getCategoryColor(transaction.category)}`}>
                    {transaction.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.timestamp ? formatDate(transaction.timestamp) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Showing {filteredTransactions.length} of {txs.length} transfers
          </span>
          <span className="text-gray-600">Updated live</span>
        </div>
      </div>
    </div>
  );
};

export default TransactionsTable;