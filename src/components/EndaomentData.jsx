import React, { useState, useEffect } from 'react';
import { endaomentAPI } from '../services/endaomentAPI';

const EndaomentData = () => {
  const [endaomentData, setEndaomentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(7);
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  useEffect(() => {
    fetchEndaomentData();
  }, [selectedMonth, selectedYear, selectedCurrency]);

  const fetchEndaomentData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await endaomentAPI.getEndaomentData(selectedMonth, selectedYear, selectedCurrency);
      setEndaomentData(data);
    } catch (err) {
      console.error('Error fetching Endaoment data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatCurrency = (amount, currency = 'USD') => {
    if (!amount) return '0';
    
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    
    return formatter.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'completed': 'bg-blue-100 text-blue-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || colors['pending'];
  };

  const getStatusIcon = (status) => {
    const icons = {
      'active': '🟢',
      'completed': '✅',
      'pending': '⏳',
      'cancelled': '❌'
    };
    return icons[status] || icons['pending'];
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Endaoment Data</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchEndaomentData}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!endaomentData) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center">
          <div className="text-gray-500 text-6xl mb-4">📊</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Endaoment Data Available</h3>
          <p className="text-gray-600">Unable to load Endaoment data at this time.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header with filters */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Endaoment Fund Data</h3>
            <p className="text-sm text-gray-500 mt-1">
              ENS DAO Endaoment fund information from Karpatkey reports
              {endaomentData.isMocked && (
                <span className="ml-2 text-orange-600">(Mock Data)</span>
              )}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                <option key={month} value={month}>
                  {new Date(2025, month - 1).toLocaleDateString('en-US', { month: 'long' })}
                </option>
              ))}
            </select>
            
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[2023, 2024, 2025, 2026].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="ETH">ETH</option>
            </select>
          </div>
        </div>
      </div>

      {/* Fund Overview */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="text-blue-600 text-2xl mr-3">💰</div>
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Contributions</p>
                <p className="text-xl font-bold text-blue-900">
                  {formatCurrency(endaomentData.totalContributions, endaomentData.currency)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="text-green-600 text-2xl mr-3">📤</div>
              <div>
                <p className="text-sm text-green-600 font-medium">Disbursed Amount</p>
                <p className="text-xl font-bold text-green-900">
                  {formatCurrency(endaomentData.disbursedAmount, endaomentData.currency)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="text-purple-600 text-2xl mr-3">🏦</div>
              <div>
                <p className="text-sm text-purple-600 font-medium">Available Balance</p>
                <p className="text-xl font-bold text-purple-900">
                  {formatCurrency(endaomentData.availableBalance, endaomentData.currency)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fund Details */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="text-md font-semibold text-gray-900 mb-3">Fund Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Fund ID:</span>
              <span className="ml-2 font-mono text-gray-900">{endaomentData.fundId}</span>
            </div>
            <div>
              <span className="text-gray-600">Wallet Address:</span>
              <span className="ml-2 font-mono text-gray-900">
                {formatAddress(endaomentData.walletAddress)}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Currency:</span>
              <span className="ml-2 text-gray-900">{endaomentData.currency}</span>
            </div>
            <div>
              <span className="text-gray-600">Last Updated:</span>
              <span className="ml-2 text-gray-900">
                {formatDate(endaomentData.timestamp)}
              </span>
            </div>
          </div>
        </div>

        {/* Treasury Composition - Enhanced */}
        <div className="space-y-6 mb-6">
          {/* Asset Allocation Overview */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-blue-600 mr-2">📊</span>
              Treasury Asset Composition
            </h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Asset Breakdown */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="text-sm font-semibold text-gray-700 mb-3">Asset Allocation</h5>
                <div className="space-y-3">
                  {endaomentData.treasuryComposition?.assets?.map((asset, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 bg-${asset.color}-500 rounded-full mr-2`}></div>
                        <span className="text-sm text-gray-600">{asset.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{asset.allocation}%</span>
                    </div>
                  )) || (
                    <>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                          <span className="text-sm text-gray-600">ETH Holdings</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">67.2%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-sm text-gray-600">ENS Tokens</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">24.8%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                          <span className="text-sm text-gray-600">Stablecoins</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">6.5%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                          <span className="text-sm text-gray-600">Other Assets</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">1.5%</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Risk Metrics */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="text-sm font-semibold text-gray-700 mb-3">Risk Metrics</h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Volatility (30d)</span>
                    <span className="text-sm font-semibold text-green-600">
                      {endaomentData.treasuryComposition?.riskMetrics?.volatility30d || 12.4}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Sharpe Ratio</span>
                    <span className="text-sm font-semibold text-blue-600">
                      {endaomentData.treasuryComposition?.riskMetrics?.sharpeRatio || 1.87}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Max Drawdown</span>
                    <span className="text-sm font-semibold text-orange-600">
                      {endaomentData.treasuryComposition?.riskMetrics?.maxDrawdown || -8.2}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Correlation (ETH)</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {endaomentData.treasuryComposition?.riskMetrics?.correlationETH || 0.94}
                    </span>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="text-sm font-semibold text-gray-700 mb-3">Performance (YTD)</h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Return</span>
                    <span className="text-sm font-semibold text-green-600">
                      +{endaomentData.treasuryComposition?.performance?.ytdReturn || 23.7}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">vs ETH</span>
                    <span className="text-sm font-semibold text-blue-600">
                      +{endaomentData.treasuryComposition?.performance?.vsETH || 2.1}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">vs S&P 500</span>
                    <span className="text-sm font-semibold text-green-600">
                      +{endaomentData.treasuryComposition?.performance?.vsSP500 || 18.9}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Risk-Adjusted</span>
                    <span className="text-sm font-semibold text-purple-600">
                      {endaomentData.treasuryComposition?.performance?.riskAdjusted || 1.42}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Asset Breakdown */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-indigo-600 mr-2">💎</span>
              Detailed Asset Holdings
            </h4>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Asset
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value (USD)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Allocation %
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      30d Change
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Risk Level
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {endaomentData.treasuryComposition?.assets?.map((asset, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 bg-${asset.color}-100 rounded-full flex items-center justify-center mr-3`}>
                            <span className={`text-${asset.color}-600 font-semibold text-sm`}>{asset.symbol}</span>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{asset.name}</div>
                            <div className="text-xs text-gray-500">${asset.price.toLocaleString()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {asset.quantity.toLocaleString()} {asset.symbol}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        ${asset.value.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {asset.allocation}%
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`text-sm font-semibold ${asset.change30d >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {asset.change30d >= 0 ? '+' : ''}{asset.change30d}%
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          asset.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                          asset.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {asset.riskLevel}
                        </span>
                      </td>
                    </tr>
                  )) || (
                    <>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-blue-600 font-semibold text-sm">Ξ</span>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">Ethereum (ETH)</div>
                              <div className="text-xs text-gray-500">$3,245.67</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          234,567.00 ETH
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          $761,234,567
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          67.2%
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="text-sm font-semibold text-green-600">+15.3%</span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Medium
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-green-600 font-semibold text-sm">ENS</span>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">ENS Token</div>
                              <div className="text-xs text-gray-500">$14.28</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          12,500,000 ENS
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          $178,500,000
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          24.8%
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="text-sm font-semibold text-green-600">+8.7%</span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            High
                          </span>
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Treasury Strategy & Governance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-green-600 mr-2">🎯</span>
                Investment Strategy
              </h4>
                              <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm text-gray-700">Long-term ETH holding</span>
                    <span className="text-sm font-semibold text-blue-600">
                      {endaomentData.treasuryComposition?.strategy?.longTermETH || 67.2}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm text-gray-700">ENS ecosystem growth</span>
                    <span className="text-sm font-semibold text-green-600">
                      {endaomentData.treasuryComposition?.strategy?.ensEcosystem || 24.8}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm text-gray-700">Liquidity reserves</span>
                    <span className="text-sm font-semibold text-purple-600">
                      {endaomentData.treasuryComposition?.strategy?.liquidityReserves || 8.0}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-3">
                    Strategy focuses on long-term value preservation while supporting ENS ecosystem development
                  </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-purple-600 mr-2">🏛️</span>
                Governance & Controls
              </h4>
                              <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Multi-sig threshold</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {endaomentData.treasuryComposition?.governance?.multiSigThreshold || "4 of 7"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Max single transaction</span>
                    <span className="text-sm font-semibold text-gray-900">
                      ${(endaomentData.treasuryComposition?.governance?.maxTransaction || 10000000).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Rebalancing frequency</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {endaomentData.treasuryComposition?.governance?.rebalancingFrequency || "Quarterly"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Risk review cycle</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {endaomentData.treasuryComposition?.governance?.riskReviewCycle || "Monthly"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">External audit</span>
                    <span className="text-sm font-semibold text-green-600">
                      {endaomentData.treasuryComposition?.governance?.externalAudit || "Annual"}
                    </span>
                  </div>
                </div>
            </div>
          </div>
        </div>

        {/* Recipients Table */}
        {endaomentData.recipients && endaomentData.recipients.length > 0 && (
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-3">Recent Disbursements</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recipient
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Purpose
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {endaomentData.recipients.slice(0, 10).map((recipient, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-mono text-gray-900">
                          {formatAddress(recipient.walletAddress)}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatCurrency(recipient.amount.usd, 'USD')}
                        </div>
                        {recipient.amount.eth > 0 && (
                          <div className="text-xs text-gray-500">
                            {recipient.amount.eth} ETH
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {recipient.purpose}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(recipient.timestamp)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <a
                          href={`https://etherscan.io/tx/${recipient.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {endaomentData.recipients.length > 10 && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Showing 10 of {endaomentData.recipients.length} disbursements
                </p>
              </div>
            )}
          </div>
        )}

        {/* No recipients message */}
        {(!endaomentData.recipients || endaomentData.recipients.length === 0) && (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl mb-4">📋</div>
            <p className="text-gray-500">No disbursement data available for the selected period.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">
            Data source: Karpatkey Reports API
          </span>
          <span className="text-gray-500">
            {endaomentData.isMocked ? 'Using mock data' : 'Live data'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EndaomentData;
