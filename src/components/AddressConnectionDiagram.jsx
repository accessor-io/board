import React, { useState, useEffect } from 'react';
import { walletDirectory } from '../data/walletDirectory';

const AddressConnectionDiagram = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showConnections, setShowConnections] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [transactionHistory, setTransactionHistory] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedChain, setSelectedChain] = useState('ethereum');

  // Alchemy API configuration
  const ALCHEMY_API_KEY = 'YvbIM24ek8LDHyHo_PhQExjUlwu9mrcV';
  const CHAIN_CONFIGS = {
    ethereum: {
      name: 'Ethereum',
      baseUrl: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      chainId: 1
    },
    optimism: {
      name: 'Optimism',
      baseUrl: `https://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      chainId: 10
    },
    arbitrum: {
      name: 'Arbitrum',
      baseUrl: `https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      chainId: 42161
    },
    base: {
      name: 'Base',
      baseUrl: `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      chainId: 8453
    }
  };

  // Group addresses by category
  const groupedAddresses = walletDirectory.reduce((acc, wallet) => {
    if (!acc[wallet.category]) {
      acc[wallet.category] = [];
    }
    acc[wallet.category].push(wallet);
    return acc;
  }, {});

  // Define connections between addresses
  const connections = [
    {
      from: '0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7', // ENS DAO Wallet
      to: '0x4F2083f5fBede34C2714aFfb3105539775f7FE64', // ENS EnDAOment
      type: 'funding',
      description: 'Treasury funding transfer'
    },
    {
      from: '0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7', // ENS DAO Wallet
      to: '0x2686A8919Df194aA7673244549E68D42C1685d03', // Eco Main
      type: 'funding',
      description: 'Ecosystem working group funding'
    },
    {
      from: '0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7', // ENS DAO Wallet
      to: '0xcD42b4c4D102cc22864e3A1341Bb0529c17fD87d', // Public Goods Main
      type: 'funding',
      description: 'Public goods working group funding'
    },
    {
      from: '0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7', // ENS DAO Wallet
      to: '0x91c32893216dE3eA0a55ABb9851f581d4503d39b', // Metagov Main
      type: 'funding',
      description: 'Metagov working group funding'
    },
    {
      from: '0xcD42b4c4D102cc22864e3A1341Bb0529c17fD87d', // Public Goods Main
      to: '0xebA76C907F02BA13064EDAD7876Fe51D9d856F62', // Public Goods Large Grants
      type: 'delegation',
      description: 'Large grants delegation'
    },
    {
      from: '0x91c32893216dE3eA0a55ABb9851f581d4503d39b', // Metagov Main
      to: '0xB162Bf7A7fD64eF32b787719335d06B2780e31D1', // Metagov Stream
      type: 'streaming',
      description: 'Streaming payments'
    },
    {
      from: '0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5', // Controller 3
      to: '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85', // ENS Registrar
      type: 'governance',
      description: 'ENS governance control'
    },
    {
      from: '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41', // ENS Registry
      to: '0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5', // Controller 3
      type: 'technical',
      description: 'ENS domain management'
    }
  ];

  // Fetch transaction history for an address on a specific chain
  const fetchTransactionHistory = async (address, chain) => {
    const config = CHAIN_CONFIGS[chain];
    if (!config) return [];

    try {
      const response = await fetch(config.baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'alchemy_getAssetTransfers',
          params: [{
            fromBlock: '0x0',
            toBlock: 'latest',
            fromAddress: address,
            category: ['external', 'internal', 'erc20', 'erc721', 'erc1155'],
            withMetadata: true,
            maxCount: '0x32'
          }]
        })
      });

      const data = await response.json();
      if (data.error) {
        console.error(`Error fetching ${chain} transactions:`, data.error);
        return [];
      }

      const outgoingTransfers = data.result?.transfers || [];

      // Fetch incoming transfers
      const incomingResponse = await fetch(config.baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'alchemy_getAssetTransfers',
          params: [{
            fromBlock: '0x0',
            toBlock: 'latest',
            toAddress: address,
            category: ['external', 'internal', 'erc20', 'erc721', 'erc1155'],
            withMetadata: true,
            maxCount: '0x32'
          }]
        })
      });

      const incomingData = await incomingResponse.json();
      const incomingTransfers = incomingData.result?.transfers || [];

      // Combine and format transfers
      const allTransfers = [
        ...outgoingTransfers.map(t => ({ ...t, direction: 'outgoing' })),
        ...incomingTransfers.map(t => ({ ...t, direction: 'incoming' }))
      ];

      return allTransfers.map(transfer => ({
        hash: transfer.hash,
        from: transfer.from,
        to: transfer.to,
        value: transfer.value || '0',
        asset: transfer.asset || 'ETH',
        category: transfer.category,
        direction: transfer.direction,
        blockNumber: transfer.blockNum ? parseInt(transfer.blockNum, 16) : 0,
        timestamp: transfer.metadata?.blockTimestamp || null,
        chain: chain,
        chainName: config.name
      }));
    } catch (error) {
      console.error(`Error fetching ${chain} transactions for ${address}:`, error);
      return [];
    }
  };

  // Fetch transaction history for all addresses on all chains
  const fetchAllTransactionHistory = async () => {
    setLoading(true);
    const allTransactions = {};

    try {
      for (const wallet of walletDirectory) {
        allTransactions[wallet.address] = {};
        
        for (const [chainKey, chainConfig] of Object.entries(CHAIN_CONFIGS)) {
          console.log(`Fetching ${chainConfig.name} transactions for ${wallet.label}...`);
          const transactions = await fetchTransactionHistory(wallet.address, chainKey);
          allTransactions[wallet.address][chainKey] = transactions;
        }
      }

      setTransactionHistory(allTransactions);
    } catch (error) {
      console.error('Error fetching all transaction history:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load transaction history on component mount
  useEffect(() => {
    fetchAllTransactionHistory();
  }, []);

  const getCategoryColor = (category) => {
    const colors = {
      'dao-treasury': 'bg-blue-500',
      'multisig': 'bg-green-500',
      'endaoment': 'bg-purple-500',
      'contract': 'bg-orange-500',
      'working-group': 'bg-red-500',
      'controller': 'bg-indigo-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  const getConnectionColor = (type) => {
    const colors = {
      'funding': 'border-blue-400',
      'delegation': 'border-green-400',
      'streaming': 'border-purple-400',
      'governance': 'border-orange-400',
      'technical': 'border-indigo-400'
    };
    return colors[type] || 'border-gray-400';
  };

  const getChainColor = (chain) => {
    const colors = {
      'ethereum': 'bg-blue-500',
      'optimism': 'bg-red-500',
      'arbitrum': 'bg-blue-600',
      'base': 'bg-blue-400'
    };
    return colors[chain] || 'bg-gray-500';
  };

  const filteredAddresses = selectedCategory === 'all' 
    ? walletDirectory 
    : walletDirectory.filter(wallet => wallet.category === selectedCategory);

  const filteredConnections = showConnections 
    ? connections.filter(conn => 
        filteredAddresses.some(addr => addr.address.toLowerCase() === conn.from.toLowerCase()) ||
        filteredAddresses.some(addr => addr.address.toLowerCase() === conn.to.toLowerCase())
      )
    : [];

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown';
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatValue = (value, asset) => {
    if (asset === 'ETH') {
      return `${parseFloat(value).toFixed(6)} ETH`;
    }
    return `${parseFloat(value).toLocaleString()} ${asset}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">ENS DAO Address Connection Diagram</h1>
          <p className="text-slate-600 mb-4">
            Comprehensive visualization of all ENS DAO wallets, contracts, and their interconnections with full transaction history across Ethereum, Optimism, Arbitrum, and Base
          </p>
          
          {/* Controls */}
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Filter by Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-slate-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Categories</option>
                <option value="dao-treasury">DAO Treasury</option>
                <option value="multisig">Multisig Wallets</option>
                <option value="endaoment">Endaoment Managed</option>
                <option value="contract">Contracts</option>
                <option value="working-group">Working Groups</option>
                <option value="controller">Controllers</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showConnections"
                checked={showConnections}
                onChange={(e) => setShowConnections(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="showConnections" className="text-sm text-slate-700">
                Show Connections
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Chain</label>
              <select
                value={selectedChain}
                onChange={(e) => setSelectedChain(e.target.value)}
                className="border border-slate-300 rounded-md px-3 py-2 text-sm"
              >
                {Object.entries(CHAIN_CONFIGS).map(([key, config]) => (
                  <option key={key} value={key}>{config.name}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <button
                onClick={fetchAllTransactionHistory}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Refresh Transactions'}
              </button>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Legend</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(groupedAddresses).map(([category, wallets]) => (
              <div key={category} className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded-full ${getCategoryColor(category)}`}></div>
                <span className="text-sm text-slate-700 capitalize">{category.replace('-', ' ')} ({wallets.length})</span>
              </div>
            ))}
          </div>
          
          {showConnections && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <h3 className="text-md font-semibold text-slate-900 mb-3">Connection Types</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {['funding', 'delegation', 'streaming', 'governance', 'technical'].map(type => (
                  <div key={type} className="flex items-center space-x-2">
                    <div className={`w-3 h-3 border-2 ${getConnectionColor(type)}`}></div>
                    <span className="text-sm text-slate-700 capitalize">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-slate-200">
            <h3 className="text-md font-semibold text-slate-900 mb-3">Blockchain Networks</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(CHAIN_CONFIGS).map(([key, config]) => (
                <div key={key} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getChainColor(key)}`}></div>
                  <span className="text-sm text-slate-700">{config.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Diagram */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Address Network</h2>
          
          {/* Address Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {filteredAddresses.map((wallet) => (
              <div
                key={wallet.address}
                className={`p-4 rounded-lg border-2 ${getCategoryColor(wallet.category).replace('bg-', 'border-')} bg-white cursor-pointer hover:shadow-md transition-shadow`}
                onClick={() => setSelectedAddress(wallet)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className={`w-3 h-3 rounded-full ${getCategoryColor(wallet.category)}`}></div>
                  <span className="text-xs text-slate-500 capitalize">{wallet.category.replace('-', ' ')}</span>
                </div>
                
                <h3 className="font-semibold text-slate-900 text-sm mb-1">{wallet.label}</h3>
                <p className="text-xs text-slate-600 font-mono mb-2 break-all">
                  {wallet.address}
                </p>
                
                <div className="text-xs text-slate-500">
                  <div>Manager: {wallet.manager}</div>
                  {wallet.ensName && <div>ENS: {wallet.ensName}</div>}
                </div>

                {/* Transaction Summary */}
                {transactionHistory[wallet.address] && (
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <div className="text-xs text-slate-600 mb-2">Recent Transactions:</div>
                    {Object.entries(transactionHistory[wallet.address]).map(([chain, transactions]) => (
                      <div key={chain} className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">{CHAIN_CONFIGS[chain].name}:</span>
                        <span className="font-medium">{transactions.length}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Connections */}
          {showConnections && filteredConnections.length > 0 && (
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-md font-semibold text-slate-900 mb-4">Connections</h3>
              <div className="space-y-3">
                {filteredConnections.map((connection, index) => {
                  const fromWallet = filteredAddresses.find(w => w.address.toLowerCase() === connection.from.toLowerCase());
                  const toWallet = filteredAddresses.find(w => w.address.toLowerCase() === connection.to.toLowerCase());
                  
                  return (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-900">{fromWallet?.label || 'Unknown'}</div>
                        <div className="text-xs text-slate-500 font-mono">{connection.from}</div>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-0.5 ${getConnectionColor(connection.type).replace('border-', 'bg-')}`}></div>
                        <span className="text-xs text-slate-500 mt-1 capitalize">{connection.type}</span>
                      </div>
                      
                      <div className="flex-1 text-right">
                        <div className="text-sm font-medium text-slate-900">{toWallet?.label || 'Unknown'}</div>
                        <div className="text-xs text-slate-500 font-mono">{connection.to}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Statistics */}
          <div className="border-t border-slate-200 pt-6 mt-6">
            <h3 className="text-md font-semibold text-slate-900 mb-4">Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">{filteredAddresses.length}</div>
                <div className="text-sm text-slate-500">Total Addresses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">{filteredConnections.length}</div>
                <div className="text-sm text-slate-500">Connections</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">{Object.keys(groupedAddresses).length}</div>
                <div className="text-sm text-slate-500">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">{filteredAddresses.filter(w => w.manager === 'ens-dao').length}</div>
                <div className="text-sm text-slate-500">DAO Managed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History Modal */}
        {selectedAddress && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{selectedAddress.label}</h2>
                    <p className="text-sm text-slate-600 font-mono">{selectedAddress.address}</p>
                  </div>
                  <button
                    onClick={() => setSelectedAddress(null)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Filter by Chain</label>
                  <select
                    value={selectedChain}
                    onChange={(e) => setSelectedChain(e.target.value)}
                    className="border border-slate-300 rounded-md px-3 py-2 text-sm"
                  >
                    {Object.entries(CHAIN_CONFIGS).map(([key, config]) => (
                      <option key={key} value={key}>{config.name}</option>
                    ))}
                  </select>
                </div>

                {transactionHistory[selectedAddress.address]?.[selectedChain] ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {CHAIN_CONFIGS[selectedChain].name} Transactions ({transactionHistory[selectedAddress.address][selectedChain].length})
                    </h3>
                    
                    <div className="space-y-3">
                      {transactionHistory[selectedAddress.address][selectedChain]
                        .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
                        .map((tx, index) => (
                          <div key={index} className="border border-slate-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <div className={`w-3 h-3 rounded-full ${getChainColor(selectedChain)}`}></div>
                                <span className="text-sm font-medium text-slate-900 capitalize">{tx.direction}</span>
                                <span className="text-xs text-slate-500 capitalize">{tx.category}</span>
                              </div>
                              <span className="text-xs text-slate-500">{formatDate(tx.timestamp)}</span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-slate-500">From:</span>
                                <div className="font-mono text-xs break-all">{tx.from}</div>
                              </div>
                              <div>
                                <span className="text-slate-500">To:</span>
                                <div className="font-mono text-xs break-all">{tx.to}</div>
                              </div>
                            </div>
                            
                            <div className="mt-2 flex items-center justify-between">
                              <div>
                                <span className="text-slate-500 text-sm">Value:</span>
                                <span className="ml-2 font-medium">{formatValue(tx.value, tx.asset)}</span>
                              </div>
                              <div>
                                <span className="text-slate-500 text-sm">Block:</span>
                                <span className="ml-2 font-mono text-xs">{tx.blockNumber}</span>
                              </div>
                            </div>
                            
                            <div className="mt-2">
                              <a
                                href={`https://etherscan.io/tx/${tx.hash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 text-xs"
                              >
                                View on {CHAIN_CONFIGS[selectedChain].name} Explorer →
                              </a>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-slate-500">No transactions found for this address on {CHAIN_CONFIGS[selectedChain].name}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Additional ENS Contracts */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mt-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">ENS Core Contracts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-slate-200 rounded-lg">
              <h3 className="font-semibold text-slate-900 mb-2">ENS Registry</h3>
              <p className="text-sm text-slate-600 font-mono mb-2">0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41</p>
              <p className="text-xs text-slate-500">Core ENS domain registry contract</p>
            </div>
            <div className="p-4 border border-slate-200 rounded-lg">
              <h3 className="font-semibold text-slate-900 mb-2">ENS Registrar</h3>
              <p className="text-sm text-slate-600 font-mono mb-2">0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85</p>
              <p className="text-xs text-slate-500">ENS domain registration contract</p>
            </div>
            <div className="p-4 border border-slate-200 rounded-lg">
              <h3 className="font-semibold text-slate-900 mb-2">ENS Token</h3>
              <p className="text-sm text-slate-600 font-mono mb-2">0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72</p>
              <p className="text-xs text-slate-500">ENS governance token contract</p>
            </div>
            <div className="p-4 border border-slate-200 rounded-lg">
              <h3 className="font-semibold text-slate-900 mb-2">Governor</h3>
              <p className="text-sm text-slate-600 font-mono mb-2">0x323A76393544d5ecca80cd6ef2A560C6A395b7E3</p>
              <p className="text-xs text-slate-500">ENS DAO governance contract</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressConnectionDiagram;
