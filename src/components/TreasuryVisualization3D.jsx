import React, { useState, useEffect, useMemo } from 'react';
import { formatCurrency } from '../utils/formatters';

const TreasuryVisualization3D = ({ data }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [animationPhase, setAnimationPhase] = useState(0);

  // Default treasury data if none provided
  const defaultData = {
    totalAUM: 926800000, // $926.8M
    liquidAssets: 840200000, // $840.2M
    monthlyOutflow: 642000, // $642K
    custodyAccounts: 12,
    assets: [
      { name: 'ETH', value: 400000000, percentage: 43.2, color: '#627EEA' },
      { name: 'USDC', value: 250000000, percentage: 27.0, color: '#2775CA' },
      { name: 'stETH', value: 150000000, percentage: 16.2, color: '#00D4AA' },
      { name: 'USDT', value: 80000000, percentage: 8.6, color: '#26A17B' },
      { name: 'DAI', value: 30000000, percentage: 3.2, color: '#F5AC37' },
      { name: 'Other', value: 16800000, percentage: 1.8, color: '#9B59B6' }
    ],
    performance: {
      apy: 4.3,
      sharpeRatio: 1.42,
      volatility: 12.8,
      maxDrawdown: -6.2
    }
  };

  const treasuryData = data || defaultData;

  // Animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Mouse movement handler for 3D rotation
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    setRotation({ x, y });
  };

  // Generate 3D asset segments
  const assetSegments = useMemo(() => {
    let cumulativeAngle = 0;
    return treasuryData.assets.map((asset, index) => {
      const angle = (asset.percentage / 100) * 360;
      const segment = {
        ...asset,
        startAngle: cumulativeAngle,
        endAngle: cumulativeAngle + angle,
        angle,
        index
      };
      cumulativeAngle += angle;
      return segment;
    });
  }, [treasuryData.assets]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
        <div 
          className="absolute inset-0 bg-gradient-to-l from-green-600/10 to-blue-600/10"
          style={{
            transform: `rotate(${animationPhase * 0.2}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
      </div>

      {/* Main 3D Container */}
      <div 
        className="relative w-full h-full flex items-center justify-center perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setRotation({ x: 0, y: 0 })}
      >
        {/* Central 3D Treasury Sphere */}
        <div 
          className="relative preserve-3d"
          style={{
            transform: `rotateX(${rotation.x + animationPhase * 0.5}deg) rotateY(${rotation.y + animationPhase * 0.3}deg)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          {/* Main Treasury Sphere */}
          <div className="relative w-96 h-96 preserve-3d">
            {/* Central Core */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/80 to-purple-600/80 shadow-2xl backdrop-blur-sm border border-white/20">
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-blue-400/60 to-purple-500/60 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-xs font-medium mb-1 opacity-80">Total AUM</div>
                  <div className="text-2xl font-bold">{formatCurrency(treasuryData.totalAUM)}</div>
                  <div className="text-xs opacity-60 mt-1">Non-Custodial Assets</div>
                </div>
              </div>
            </div>

            {/* Orbiting Asset Segments */}
            {assetSegments.map((asset, index) => {
              const orbitRadius = 200 + (index * 15);
              const orbitSpeed = 0.5 + (index * 0.1);
              const currentAngle = animationPhase * orbitSpeed + asset.startAngle;
              
              return (
                <div
                  key={asset.name}
                  className="absolute preserve-3d cursor-pointer group"
                  style={{
                    transform: `
                      rotateY(${currentAngle}deg) 
                      translateZ(${orbitRadius}px) 
                      rotateY(-${currentAngle}deg)
                      ${selectedSegment === index ? 'scale(1.2)' : 'scale(1)'}
                    `,
                    transition: 'transform 0.3s ease-out'
                  }}
                  onClick={() => setSelectedSegment(selectedSegment === index ? null : index)}
                >
                  {/* Asset Segment */}
                  <div 
                    className="w-20 h-20 rounded-lg shadow-xl border border-white/30 flex items-center justify-center text-white font-bold text-xs backdrop-blur-sm group-hover:scale-110 transition-transform"
                    style={{
                      background: `linear-gradient(135deg, ${asset.color}dd, ${asset.color}aa)`,
                      boxShadow: `0 0 20px ${asset.color}66`
                    }}
                  >
                    <div className="text-center">
                      <div className="text-lg font-bold">{asset.name}</div>
                      <div className="text-xs opacity-80">{asset.percentage}%</div>
                    </div>
                  </div>

                  {/* Asset Details Popup */}
                  {selectedSegment === index && (
                    <div 
                      className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-md rounded-lg p-4 shadow-xl border border-gray-200 min-w-48 z-50"
                      style={{
                        transform: 'translateX(-50%) rotateY(0deg)'
                      }}
                    >
                      <div className="text-gray-800">
                        <div className="font-bold text-lg text-center mb-2" style={{ color: asset.color }}>
                          {asset.name}
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Value:</span>
                            <span className="font-medium">{formatCurrency(asset.value)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Percentage:</span>
                            <span className="font-medium">{asset.percentage}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Allocation:</span>
                            <span className="font-medium">Strategic</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Performance Metrics Floating Elements */}
            {[
              { label: 'APY', value: `${treasuryData.performance.apy}%`, color: '#10B981', position: { x: 250, y: -100, z: 100 } },
              { label: 'Sharpe', value: treasuryData.performance.sharpeRatio, color: '#8B5CF6', position: { x: -250, y: -50, z: 150 } },
              { label: 'Volatility', value: `${treasuryData.performance.volatility}%`, color: '#F59E0B', position: { x: 200, y: 150, z: -100 } },
              { label: 'Max DD', value: `${treasuryData.performance.maxDrawdown}%`, color: '#EF4444', position: { x: -200, y: 100, z: -150 } }
            ].map((metric, index) => (
              <div
                key={metric.label}
                className="absolute preserve-3d"
                style={{
                  transform: `
                    translate3d(${metric.position.x}px, ${metric.position.y}px, ${metric.position.z}px)
                    rotateY(${animationPhase * 0.8 + index * 90}deg)
                  `
                }}
              >
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-2xl backdrop-blur-sm border border-white/20"
                  style={{
                    background: `linear-gradient(135deg, ${metric.color}dd, ${metric.color}aa)`,
                    boxShadow: `0 0 30px ${metric.color}44`
                  }}
                >
                  <div className="text-center">
                    <div className="text-xs opacity-80">{metric.label}</div>
                    <div className="text-sm font-bold">{metric.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side Information Panel */}
        <div className="absolute top-8 left-8 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-white max-w-sm">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            ENS Treasury 3D
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="opacity-80">Liquid Assets:</span>
              <span className="font-medium">{formatCurrency(treasuryData.liquidAssets)}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-80">Monthly Outflow:</span>
              <span className="font-medium">{formatCurrency(treasuryData.monthlyOutflow)}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-80">Custody Accounts:</span>
              <span className="font-medium">{treasuryData.custodyAccounts}</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="text-xs opacity-60">
              🎯 Hover and click on asset segments for details
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <div className="text-white text-center">
            <div className="text-xs opacity-80 mb-2">3D Controls</div>
            <div className="flex space-x-2">
              <button 
                className="px-3 py-1 bg-blue-500/50 rounded-lg text-xs hover:bg-blue-500/70 transition-colors"
                onClick={() => setRotation({ x: 0, y: 0 })}
              >
                Reset
              </button>
              <button 
                className="px-3 py-1 bg-purple-500/50 rounded-lg text-xs hover:bg-purple-500/70 transition-colors"
                onClick={() => setSelectedSegment(null)}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for 3D transforms */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
};

export default TreasuryVisualization3D;
