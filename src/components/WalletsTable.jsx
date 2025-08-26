import React, { useEffect, useMemo, useState } from 'react';
import alchemyAPI from '../services/alchemyAPI';
import { ensFinancialData } from '../data/ensData';
import { walletDirectory } from '../data/walletDirectory';

const WalletsTable = () => {
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

  const getTypeColor = (type) => {
    const colors = {
      'dao-treasury': 'bg-blue-900 text-blue-300 border border-blue-700',
      'endaoment': 'bg-green-900 text-green-300 border border-green-700',
      'controller': 'bg-purple-900 text-purple-300 border border-purple-700',
      'karpatkey-managed': 'bg-orange-900 text-orange-300 border border-orange-700',
      'working-group': 'bg-indigo-900 text-indigo-300 border border-indigo-700',
      'contract': 'bg-gray-800 text-gray-300 border border-gray-600',
      'governance': 'bg-red-900 text-red-300 border border-red-700',
      'service-provider': 'bg-yellow-900 text-yellow-300 border border-yellow-700',
      'other': 'bg-gray-800 text-gray-300 border border-gray-600'
    };
    return colors[type] || colors['other'];
  };

  const [walletData, setWalletData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [expandedWallet, setExpandedWallet] = useState(null);
  const [transactionData, setTransactionData] = useState({});

  const sourceWallets = useMemo(() => walletDirectory.length ? walletDirectory : ensFinancialData.wallets, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        console.log('WalletsTable: Starting to fetch wallet data...');
        const data = await alchemyAPI.getAllWalletData();
        console.log('WalletsTable: Received wallet data:', data);
        if (mounted) {
          setWalletData(data);
          setLastUpdated(new Date());
          console.log('WalletsTable: Updated state with wallet data');
        }
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const getWalletData = (address) => {
    const data = walletData.find(w => w.address.toLowerCase() === address.toLowerCase()) || {};
    console.log('getWalletData for', address, ':', data);
    return data;
  };

  const getTokenCount = (address) => {
    const data = getWalletData(address);
    return data.tokenBalances ? data.tokenBalances.length : 0;
  };

  const getTransactionCount = (address) => {
    const data = getWalletData(address);
    return data.recentTransactions ? data.recentTransactions.length : 0;
  };

  const handleRowClick = async (address) => {
    if (expandedWallet === address) {
      setExpandedWallet(null);
    } else {
      setExpandedWallet(address);
      if (!transactionData[address]) {
        try {
          const transactions = await alchemyAPI.getRecentTransactions(address, 20);
          setTransactionData(prev => ({
            ...prev,
            [address]: transactions
          }));
        } catch (error) {
          console.error('Error fetching transactions for', address, error);
        }
      }
    }
  };

  const formatTransaction = (tx) => {
    const value = tx.value ? parseFloat(tx.value) / Math.pow(10, 18) : 0;
    const date = tx.timestamp ? new Date(tx.timestamp * 1000).toLocaleDateString() : 'Unknown';
    const time = tx.timestamp ? new Date(tx.timestamp * 1000).toLocaleTimeString() : 'Unknown';
    
    let coinType = 'ETH';
    if (tx.category === 'erc20') {
      coinType = tx.tokenSymbol || 'ERC20';
    } else if (tx.category === 'erc721') {
      coinType = 'NFT';
    } else if (tx.category === 'erc1155') {
      coinType = 'ERC1155';
    }
    
    return {
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: value.toFixed(6),
      valueUSD: tx.valueUSD || null,
      date,
      time,
      type: tx.category || 'external',
      coinType,
      tokenName: tx.tokenName || null,
      tokenSymbol: tx.tokenSymbol || null
    };
  };

  const getTokenIcon = (symbol) => {
    const icons = {
      'ETH': (
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
          <path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0z" fill="#627EEA"/>
          <path d="M16.498 4v8.87l7.497 3.35z" fill="#fff" fillOpacity="0.602"/>
          <path d="M16.498 4L9 16.22l7.498-3.35z" fill="#fff"/>
          <path d="M16.498 21.968v6.027L24 17.616z" fill="#fff" fillOpacity="0.602"/>
          <path d="M16.498 27.995v-6.028L9 17.616z" fill="#fff"/>
          <path d="M16.498 20.573l7.497-4.353-7.497-3.348z" fill="#fff" fillOpacity="0.2"/>
          <path d="M9 16.22l7.498 4.353v-7.701z" fill="#fff" fillOpacity="0.602"/>
        </svg>
      ),
      'USDC': (
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
          <path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0z" fill="#2775CA"/>
          <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4zm0 22C10.486 26 6 21.514 6 16S10.486 6 16 6s10 4.486 10 10-4.486 10-10 10z" fill="#fff"/>
          <path d="M16 8c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 12c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z" fill="#2775CA"/>
        </svg>
      ),
      'ENS': (
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
          <path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0z" fill="#5E4FDB"/>
          <path d="M8 8h16v16H8z" fill="#fff"/>
          <path d="M12 12h8v8h-8z" fill="#5E4FDB"/>
          <path d="M14 14h4v4h-4z" fill="#fff"/>
        </svg>
      ),
      'NFT': (
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
          <path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0z" fill="#FF6B6B"/>
          <path d="M8 8h16v16H8z" fill="#fff"/>
          <path d="M12 12h8v8h-8z" fill="#FF6B6B"/>
        </svg>
      ),
      'ERC20': (
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
          <path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0z" fill="#6C757D"/>
          <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4zm0 22C10.486 26 6 21.514 6 16S10.486 6 16 6s10 4.486 10 10-4.486 10-10 10z" fill="#fff"/>
        </svg>
      )
    };
    return icons[symbol] || icons['ERC20'];
  };

  const getMockTokenHoldings = (address) => {
    const hash = address.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const tokens = [
      { symbol: 'ETH', name: 'Ethereum', amount: (Math.abs(hash % 1000) / 100).toFixed(4), valueUSD: (Math.abs(hash % 1000) * 1.85).toFixed(2) },
      { symbol: 'USDC', name: 'USD Coin', amount: (Math.abs(hash % 50000)).toFixed(2), valueUSD: (Math.abs(hash % 50000)).toFixed(2) },
      { symbol: 'ENS', name: 'Ethereum Name Service', amount: (Math.abs(hash % 10000)).toFixed(2), valueUSD: (Math.abs(hash % 10000) * 0.17).toFixed(2) }
    ];
    
    return tokens.slice(0, Math.abs(hash % 3) + 1);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200">
        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">ENS DAO Wallets</h3>
        <div className="text-sm text-slate-600 mt-1">
          Comprehensive wallet overview and management 
          {loading && ' (refreshing...)'}
          {lastUpdated && ` • Last updated: ${lastUpdated.toLocaleTimeString()}`}
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Address / ENS Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                ETH Balance
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Tokens
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Recent TX
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Manager
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {sourceWallets.map((wallet, index) => (
              <React.Fragment key={index}>
                <tr 
                  className="hover:bg-slate-25 transition-colors duration-150 cursor-pointer"
                  onClick={() => handleRowClick(wallet.address)}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-slate-900 font-mono text-sm">
                          {formatAddress(wallet.address)}
                        </div>
                        {(wallet.ensName || wallet.label) && (
                          <div className="text-sm text-blue-600 mt-1">{wallet.ensName || wallet.label}</div>
                        )}
                      </div>
                      <div>
                        <svg 
                          className={`w-4 h-4 text-slate-400 transition-transform ${expandedWallet === wallet.address ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getTypeColor(wallet.type || wallet.category || 'other')}`}>
                      {(wallet.type || wallet.category || 'other').replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-slate-900 font-mono">
                    {(getWalletData(wallet.address).ethBalance ?? 0).toFixed(4)} ETH
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-slate-900">
                    {getTokenCount(wallet.address)} tokens
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-slate-900 font-mono">
                    {getTransactionCount(wallet.address)} tx
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                      (wallet.manager || '').toLowerCase() === 'karpatkey' ? 
                      'bg-orange-100 text-orange-800 border border-orange-200' : 
                      'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}>
                      {wallet.manager || 'ens-dao'}
                    </span>
                  </td>
                </tr>
                
                {/* Expanded Section */}
                {expandedWallet === wallet.address && (
                  <tr className="bg-slate-50">
                    <td colSpan="6" className="px-4 py-4">
                      <div className="space-y-4">
                        {/* Token Holdings */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-slate-900">Token Holdings</h4>
                            <span className="text-sm text-slate-600">
                              {getMockTokenHoldings(wallet.address).length} tokens
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {getMockTokenHoldings(wallet.address).map((token, index) => (
                              <div key={index} className="bg-white rounded border border-slate-200 p-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <div className="flex-shrink-0">{getTokenIcon(token.symbol)}</div>
                                    <div>
                                      <div className="font-medium text-slate-900">{token.symbol}</div>
                                      <div className="text-slate-600 text-sm">{token.name}</div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-medium text-slate-900 font-mono text-sm">{token.amount}</div>
                                    <div className="text-slate-600 text-xs">${token.valueUSD}</div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Transactions */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-slate-900">Recent Transactions</h4>
                            <span className="text-sm text-slate-600">
                              {transactionData[wallet.address]?.length || 0} transactions
                            </span>
                          </div>
                          
                          {transactionData[wallet.address] && transactionData[wallet.address].length > 0 ? (
                            <div className="overflow-x-auto">
                              <table className="min-w-full text-sm">
                                <thead>
                                  <tr className="border-b border-slate-200">
                                    <th className="text-left py-2 text-slate-600 font-medium">Hash</th>
                                    <th className="text-left py-2 text-slate-600 font-medium">From</th>
                                    <th className="text-left py-2 text-slate-600 font-medium">To</th>
                                    <th className="text-left py-2 text-slate-600 font-medium">Value</th>
                                    <th className="text-left py-2 text-slate-600 font-medium">Asset</th>
                                    <th className="text-left py-2 text-slate-600 font-medium">Date/Time</th>
                                    <th className="text-left py-2 text-slate-600 font-medium">Type</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {transactionData[wallet.address].slice(0, 10).map((tx, txIndex) => {
                                    const formattedTx = formatTransaction(tx);
                                    return (
                                      <tr key={txIndex} className="border-b border-slate-100 hover:bg-slate-25">
                                        <td className="py-2 text-blue-600 font-mono text-xs">
                                          {formattedTx.hash ? `${formattedTx.hash.slice(0, 8)}...` : 'N/A'}
                                        </td>
                                        <td className="py-2 text-slate-600 font-mono text-xs">
                                          {formattedTx.from ? formatAddress(formattedTx.from) : 'N/A'}
                                        </td>
                                        <td className="py-2 text-slate-600 font-mono text-xs">
                                          {formattedTx.to ? formatAddress(formattedTx.to) : 'N/A'}
                                        </td>
                                        <td className="py-2 text-slate-900 font-mono text-sm">
                                          <div>
                                            <div>{formattedTx.value}</div>
                                            {formattedTx.valueUSD && (
                                              <div className="text-xs text-slate-500">${formattedTx.valueUSD}</div>
                                            )}
                                          </div>
                                        </td>
                                        <td className="py-2">
                                          <div className="flex items-center space-x-2">
                                            <div className="flex-shrink-0">{getTokenIcon(formattedTx.coinType)}</div>
                                            <span className="font-medium text-slate-900">{formattedTx.coinType}</span>
                                          </div>
                                        </td>
                                        <td className="py-2 text-slate-600 text-xs">
                                          <div>
                                            <div>{formattedTx.date}</div>
                                            <div>{formattedTx.time}</div>
                                          </div>
                                        </td>
                                        <td className="py-2">
                                          <span className={`inline-flex px-2 py-1 text-xs rounded ${
                                            formattedTx.type === 'erc20' ? 'bg-green-100 text-green-800' :
                                            formattedTx.type === 'erc721' ? 'bg-purple-100 text-purple-800' :
                                            formattedTx.type === 'erc1155' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-blue-100 text-blue-800'
                                          }`}>
                                            {formattedTx.type}
                                          </span>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <div className="text-center py-6">
                              <div className="text-slate-500 text-sm">
                                {transactionData[wallet.address] === undefined ? (
                                  <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                                    Loading transactions...
                                  </div>
                                ) : (
                                  'No recent transactions found'
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Total Wallets: {sourceWallets.length}</span>
          <span className="font-medium text-slate-900">
            Total ETH: {sourceWallets.reduce((total, wallet) => total + (getWalletData(wallet.address).ethBalance ?? 0), 0).toFixed(4)} ETH
          </span>
        </div>
      </div>
    </div>
  );
};

export default WalletsTable;
