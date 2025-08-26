import React, { useState } from 'react';
import { ensTokenData, formatENSAmount, formatENSValue, calculatePercentage } from '../data/ensTokenData';
import { componentClasses } from '../styles/designSystem';
import { LineChart, BarChart, PieChart } from './charts';

const ENSTokenTracker = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeframe, setTimeframe] = useState('7d');

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'distribution', name: 'Distribution' },
    { id: 'governance', name: 'Governance' },
    { id: 'market', name: 'Market Data' },
    { id: 'staking', name: 'Staking' },
    { id: 'transactions', name: 'Transactions' }
  ];

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriceChangeColor = (change) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getPriceChangeIcon = (change) => {
    if (change > 0) return '↗';
    if (change < 0) return '↘';
    return '→';
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Token Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={componentClasses.card.base}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-black">Price</p>
              <p className="text-2xl font-bold text-black">${ensTokenData.tokenContract.price}</p>
              <div className={`flex items-center text-sm ${getPriceChangeColor(ensTokenData.tokenContract.priceChange24h)}`}>
                <span>{getPriceChangeIcon(ensTokenData.tokenContract.priceChange24h)}</span>
                <span className="ml-1">{Math.abs(ensTokenData.tokenContract.priceChange24h)}%</span>
                <span className="ml-1">24h</span>
              </div>
            </div>
            <div className="text-3xl">🔵</div>
          </div>
        </div>

        <div className={componentClasses.card.base}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-black">Market Cap</p>
              <p className="text-2xl font-bold text-black">${(ensTokenData.tokenContract.marketCap / 1000000000).toFixed(2)}B</p>
              <p className="text-sm text-black">Rank #{ensTokenData.tokenContract.marketRank}</p>
            </div>
            <div className="text-3xl">📊</div>
          </div>
        </div>

        <div className={componentClasses.card.base}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-black">Volume 24h</p>
              <p className="text-2xl font-bold text-black">${(ensTokenData.marketData.volumeData['24h'] / 1000000).toFixed(1)}M</p>
              <p className="text-sm text-black">Circulating: {formatENSAmount(ensTokenData.tokenContract.circulatingSupply)}</p>
            </div>
            <div className="text-3xl">📈</div>
          </div>
        </div>

        <div className={componentClasses.card.base}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-black">Total Holders</p>
              <p className="text-2xl font-bold text-black">{ensTokenData.distribution.totalHolders.toLocaleString()}</p>
              <p className="text-sm text-black">Staked: {formatENSAmount(ensTokenData.staking.totalStaked)}</p>
            </div>
            <div className="text-3xl">👥</div>
          </div>
        </div>
      </div>

      {/* Price Chart */}
      <div className={componentClasses.card.base}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-black">Price History</h3>
          <div className="flex space-x-2">
            {['24h', '7d', '30d'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-3 py-1 rounded text-sm transition-all duration-200 ease-in-out ${
                  timeframe === period
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        <div className="h-64">
          <LineChart
            data={ensTokenData.marketData.priceHistory[timeframe]}
            xKey="timestamp"
            yKey="price"
            color="#3B82F6"
            title="ENS Price"
          />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={componentClasses.card.base}>
          <h4 className="text-lg font-semibold text-black mb-3">Governance</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-black">Total Proposals:</span>
              <span className="font-semibold text-black">{ensTokenData.governance.totalProposals}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-black">Active Proposals:</span>
              <span className="font-semibold text-black">{ensTokenData.governance.activeProposals}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-black">Avg Participation:</span>
              <span className="font-semibold text-black">{ensTokenData.governance.averageParticipation}%</span>
            </div>
          </div>
        </div>

        <div className={componentClasses.card.base}>
          <h4 className="text-lg font-semibold text-black mb-3">Staking</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-black">Total Staked:</span>
              <span className="font-semibold text-black">{formatENSAmount(ensTokenData.staking.totalStaked)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-black">APY:</span>
              <span className="font-semibold text-black">{ensTokenData.staking.stakingAPY}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-black">Daily Rewards:</span>
              <span className="font-semibold text-black">{formatENSAmount(ensTokenData.staking.stakingRewards.daily)}</span>
            </div>
          </div>
        </div>

        <div className={componentClasses.card.base}>
          <h4 className="text-lg font-semibold text-black mb-3">Token Info</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-black">Total Supply:</span>
              <span className="font-semibold text-black">{formatENSAmount(ensTokenData.tokenContract.totalSupply)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-black">Circulating:</span>
              <span className="font-semibold text-black">{formatENSAmount(ensTokenData.tokenContract.circulatingSupply)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-black">Decimals:</span>
              <span className="font-semibold text-black">{ensTokenData.tokenContract.decimals}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDistribution = () => (
    <div className="space-y-6">
      {/* Distribution Chart */}
      <div className={componentClasses.card.base}>
        <h3 className="text-lg font-semibold text-black mb-4">Token Distribution</h3>
        <div className="h-64">
          <PieChart
            data={Object.entries(ensTokenData.distribution.distributionBreakdown).map(([key, value]) => ({
              name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
              value: value
            }))}
            title="ENS Distribution"
          />
        </div>
      </div>

      {/* Top Holders */}
      <div className={componentClasses.card.base}>
        <h3 className="text-lg font-semibold text-black mb-4">Top Holders</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-semibold text-black">Address</th>
                <th className="text-left py-2 text-sm font-semibold text-black">Balance</th>
                <th className="text-left py-2 text-sm font-semibold text-black">Percentage</th>
                <th className="text-left py-2 text-sm font-semibold text-black">Category</th>
              </tr>
            </thead>
            <tbody>
              {ensTokenData.distribution.topHolders.map((holder, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-2">
                    <div>
                      <div className="font-medium text-black">{formatAddress(holder.address)}</div>
                      {holder.ensName && (
                        <div className="text-sm text-black">{holder.ensName}</div>
                      )}
                    </div>
                  </td>
                  <td className="py-2">
                    <div className="font-medium text-black">{formatENSAmount(holder.balance)}</div>
                    <div className="text-sm text-black">{formatENSValue(holder.balance)}</div>
                  </td>
                  <td className="py-2">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${holder.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-black">{holder.percentage}%</span>
                    </div>
                  </td>
                  <td className="py-2">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {holder.category}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderGovernance = () => (
    <div className="space-y-6">
      {/* Governance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={componentClasses.card.base}>
          <div className="text-center">
            <div className="text-3xl font-bold text-black">{ensTokenData.governance.totalProposals}</div>
            <div className="text-sm text-black">Total Proposals</div>
          </div>
        </div>
        <div className={componentClasses.card.base}>
          <div className="text-center">
            <div className="text-3xl font-bold text-black">{ensTokenData.governance.activeProposals}</div>
            <div className="text-sm text-black">Active Proposals</div>
          </div>
        </div>
        <div className={componentClasses.card.base}>
          <div className="text-center">
            <div className="text-3xl font-bold text-black">{ensTokenData.governance.averageParticipation}%</div>
            <div className="text-sm text-black">Avg Participation</div>
          </div>
        </div>
      </div>

      {/* Recent Proposals */}
      <div className={componentClasses.card.base}>
        <h3 className="text-lg font-semibold text-black mb-4">Recent Proposals</h3>
        <div className="space-y-4">
          {ensTokenData.governance.recentProposals.map((proposal) => (
            <div key={proposal.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-black">{proposal.title}</h4>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  proposal.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {proposal.status}
                </span>
              </div>
              <p className="text-sm text-black mb-3">{proposal.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-black">Total Votes:</span>
                  <div className="font-semibold text-black">{formatENSAmount(proposal.totalVotes)}</div>
                </div>
                <div>
                  <span className="text-black">Participation:</span>
                  <div className="font-semibold text-black">{proposal.participation}%</div>
                </div>
                <div>
                  <span className="text-black">For:</span>
                  <div className="font-semibold text-black">{formatENSAmount(proposal.forVotes)}</div>
                </div>
                <div>
                  <span className="text-black">Against:</span>
                  <div className="font-semibold text-black">{formatENSAmount(proposal.againstVotes)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Voters */}
      <div className={componentClasses.card.base}>
        <h3 className="text-lg font-semibold text-black mb-4">Top Voters</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-semibold text-black">Address</th>
                <th className="text-left py-2 text-sm font-semibold text-black">Total Votes</th>
                <th className="text-left py-2 text-sm font-semibold text-black">Participation</th>
                <th className="text-left py-2 text-sm font-semibold text-black">Last Vote</th>
              </tr>
            </thead>
            <tbody>
              {ensTokenData.governance.topVoters.map((voter, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-2">
                    <div>
                      <div className="font-medium text-black">{formatAddress(voter.address)}</div>
                      {voter.ensName && (
                        <div className="text-sm text-black">{voter.ensName}</div>
                      )}
                    </div>
                  </td>
                  <td className="py-2 font-medium text-black">{formatENSAmount(voter.totalVotes)}</td>
                  <td className="py-2">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {voter.participationRate}%
                    </span>
                  </td>
                  <td className="py-2 text-sm text-black">{formatDate(voter.lastVote)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMarket = () => (
    <div className="space-y-6">
      {/* Market Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={componentClasses.card.base}>
          <div className="text-center">
            <div className="text-2xl font-bold text-black">${(ensTokenData.marketData.marketMetrics.marketCap / 1000000000).toFixed(2)}B</div>
            <div className="text-sm text-black">Market Cap</div>
          </div>
        </div>
        <div className={componentClasses.card.base}>
          <div className="text-center">
            <div className="text-2xl font-bold text-black">${(ensTokenData.marketData.marketMetrics.fullyDilutedMarketCap / 1000000000).toFixed(2)}B</div>
            <div className="text-sm text-black">Fully Diluted</div>
          </div>
        </div>
        <div className={componentClasses.card.base}>
          <div className="text-center">
            <div className="text-2xl font-bold text-black">{ensTokenData.marketData.marketMetrics.priceToBookRatio}</div>
            <div className="text-sm text-black">P/B Ratio</div>
          </div>
        </div>
        <div className={componentClasses.card.base}>
          <div className="text-center">
            <div className="text-2xl font-bold text-black">{ensTokenData.marketData.marketMetrics.priceToSalesRatio}</div>
            <div className="text-sm text-black">P/S Ratio</div>
          </div>
        </div>
      </div>

      {/* Volume Chart */}
      <div className={componentClasses.card.base}>
        <h3 className="text-lg font-semibold text-black mb-4">Trading Volume</h3>
        <div className="h-64">
          <BarChart
            data={[
              { period: '24h', volume: ensTokenData.marketData.volumeData['24h'] },
              { period: '7d', volume: ensTokenData.marketData.volumeData['7d'] },
              { period: '30d', volume: ensTokenData.marketData.volumeData['30d'] }
            ]}
            xKey="period"
            yKey="volume"
            color="#10B981"
            title="Trading Volume"
          />
        </div>
      </div>

      {/* Market Links */}
      <div className={componentClasses.card.base}>
        <h3 className="text-lg font-semibold text-black mb-4">Market Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href={ensTokenData.links.coingecko}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 ease-in-out"
          >
            <div className="text-2xl mr-3">🦎</div>
            <div>
              <div className="font-medium text-black">CoinGecko</div>
              <div className="text-sm text-black">View on CoinGecko</div>
            </div>
          </a>
          <a
            href={ensTokenData.links.coinmarketcap}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 ease-in-out"
          >
            <div className="text-2xl mr-3">📊</div>
            <div>
              <div className="font-medium text-black">CoinMarketCap</div>
              <div className="text-sm text-black">View on CoinMarketCap</div>
            </div>
          </a>
          <a
            href={ensTokenData.links.etherscan}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 ease-in-out"
          >
            <div className="text-2xl mr-3">🔍</div>
            <div>
              <div className="font-medium text-black">Etherscan</div>
              <div className="text-sm text-black">View on Etherscan</div>
            </div>
          </a>
          <a
            href={ensTokenData.links.governance}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 ease-in-out"
          >
            <div className="text-2xl mr-3">🗳️</div>
            <div>
              <div className="font-medium text-black">Governance</div>
              <div className="text-sm text-black">View on Snapshot</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );

  const renderStaking = () => (
    <div className="space-y-6">
      {/* Staking Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={componentClasses.card.base}>
          <div className="text-center">
            <div className="text-3xl font-bold text-black">{formatENSAmount(ensTokenData.staking.totalStaked)}</div>
            <div className="text-sm text-black">Total Staked</div>
          </div>
        </div>
        <div className={componentClasses.card.base}>
          <div className="text-center">
            <div className="text-3xl font-bold text-black">{ensTokenData.staking.stakingAPY}%</div>
            <div className="text-sm text-black">APY</div>
          </div>
        </div>
        <div className={componentClasses.card.base}>
          <div className="text-center">
            <div className="text-3xl font-bold text-black">{formatENSAmount(ensTokenData.staking.stakingRewards.daily)}</div>
            <div className="text-sm text-black">Daily Rewards</div>
          </div>
        </div>
      </div>

      {/* Staking Pools */}
      <div className={componentClasses.card.base}>
        <h3 className="text-lg font-semibold text-black mb-4">Staking Pools</h3>
        <div className="space-y-4">
          {ensTokenData.staking.stakingPools.map((pool, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-black">{pool.name}</h4>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  {pool.apy}% APY
                </span>
              </div>
              <p className="text-sm text-black mb-3">{pool.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-black">Total Staked:</span>
                  <div className="font-semibold text-black">{formatENSAmount(pool.totalStaked)}</div>
                </div>
                <div>
                  <span className="text-black">Participants:</span>
                  <div className="font-semibold text-black">{pool.participants.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-black">Contract:</span>
                  <div className="font-semibold text-black">{formatAddress(pool.address)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rewards Breakdown */}
      <div className={componentClasses.card.base}>
        <h3 className="text-lg font-semibold text-black mb-4">Rewards Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-black">{formatENSAmount(ensTokenData.staking.stakingRewards.daily)}</div>
            <div className="text-sm text-black">Daily</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-black">{formatENSAmount(ensTokenData.staking.stakingRewards.weekly)}</div>
            <div className="text-sm text-black">Weekly</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-black">{formatENSAmount(ensTokenData.staking.stakingRewards.monthly)}</div>
            <div className="text-sm text-black">Monthly</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-black">{formatENSAmount(ensTokenData.staking.stakingRewards.yearly)}</div>
            <div className="text-sm text-black">Yearly</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTransactions = () => (
    <div className="space-y-6">
      {/* Recent Transactions */}
      <div className={componentClasses.card.base}>
        <h3 className="text-lg font-semibold text-black mb-4">Recent Transactions</h3>
        <div className="space-y-4">
          {ensTokenData.recentTransactions.map((tx, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    tx.type === 'Transfer' ? 'bg-blue-100 text-blue-800' :
                    tx.type === 'Governance' ? 'bg-purple-100 text-purple-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {tx.type}
                  </span>
                  <span className="text-sm text-black">{formatDate(tx.timestamp)}</span>
                </div>
                <a
                  href={`https://etherscan.io/tx/${tx.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  View on Etherscan
                </a>
              </div>
              <p className="text-sm text-black mb-2">{tx.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-black">From:</span>
                  <div className="font-semibold text-black">{formatAddress(tx.from)}</div>
                </div>
                <div>
                  <span className="text-black">To:</span>
                  <div className="font-semibold text-black">{formatAddress(tx.to)}</div>
                </div>
                <div>
                  <span className="text-black">Amount:</span>
                  <div className="font-semibold text-black">{formatENSAmount(tx.amount)}</div>
                </div>
                <div>
                  <span className="text-black">Value:</span>
                  <div className="font-semibold text-black">{formatENSValue(tx.amount)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'distribution':
        return renderDistribution();
      case 'governance':
        return renderGovernance();
      case 'market':
        return renderMarket();
      case 'staking':
        return renderStaking();
      case 'transactions':
        return renderTransactions();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">ENS Token Tracker</h1>
          <p className="text-black">Comprehensive tracking of ENS ERC-20 token metrics, distribution, and governance</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-black">🔵</div>
          <div className="text-sm text-black">ENS Token</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-all duration-200 ease-in-out ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-black hover:text-blue-600 hover:border-blue-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default ENSTokenTracker;
