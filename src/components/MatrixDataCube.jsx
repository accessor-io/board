import React, { useState, useEffect, useMemo } from 'react';
import { formatCurrency } from '../utils/formatters';

const MatrixDataCube = ({ data }) => {
  const [rotation, setRotation] = useState({ x: 20, y: 45, z: 0 });
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [animationTime, setAnimationTime] = useState(0);
  const [matrixMode, setMatrixMode] = useState('flow'); // flow, correlation, risk, performance
  const [codeRain, setCodeRain] = useState([]);

  // Enhanced treasury data
  const treasuryData = data || {
    totalAUM: 100230000,
    layers: [
      {
        name: 'Liquid Assets',
        value: 85195500,
        color: '#00ff41',
        depth: 0,
        assets: [
          { name: 'ETH', value: 43230690, flow: 2.3, risk: 0.15 },
          { name: 'USDC', value: 15034500, flow: -1.2, risk: 0.02 },
          { name: 'USDT', value: 8000000, flow: 0.8, risk: 0.03 },
          { name: 'DAI', value: 7016100, flow: 0.5, risk: 0.04 }
        ]
      },
      {
        name: 'Staked Assets',
        value: 20046000,
        color: '#ff6b35',
        depth: 1,
        assets: [
          { name: 'stETH', value: 20046000, flow: 4.3, risk: 0.18 }
        ]
      },
      {
        name: 'DeFi Positions',
        value: 12000000,
        color: '#4ecdc4',
        depth: 2,
        assets: [
          { name: 'Compound', value: 5000000, flow: 1.8, risk: 0.12 },
          { name: 'Aave', value: 4000000, flow: 2.1, risk: 0.10 },
          { name: 'Curve', value: 3000000, flow: 3.2, risk: 0.14 }
        ]
      }
    ],
    correlationMatrix: [
      [1.00, 0.85, 0.12, 0.08],
      [0.85, 1.00, 0.05, 0.03],
      [0.12, 0.05, 1.00, 0.92],
      [0.08, 0.03, 0.92, 1.00]
    ],
    riskMetrics: {
      var95: 2.34,
      expectedShortfall: 4.12,
      correlationStrength: 0.73,
      diversificationRatio: 1.23
    }
  };

  // Animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationTime(prev => prev + 1);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // Generate code rain effect
  useEffect(() => {
    const generateCodeRain = () => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$€£¥₿⟨⟩[]{}()';
      const streams = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: (i * 40) % window.innerWidth,
        chars: Array.from({ length: 20 }, () => characters[Math.floor(Math.random() * characters.length)]),
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.8 + 0.2
      }));
      setCodeRain(streams);
    };

    generateCodeRain();
    const interval = setInterval(generateCodeRain, 5000);
    return () => clearInterval(interval);
  }, []);

  // Mouse interaction
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 60;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 60;
    setRotation(prev => ({ ...prev, x: 20 + x, y: 45 + y }));
  };

  // Render data cube layers
  const renderDataCube = () => {
    return treasuryData.layers.map((layer, layerIndex) => {
      const layerY = layerIndex * 120 - 120;
      
      return (
        <div key={layer.name} className="absolute preserve-3d">
          {/* Layer Base */}
          <div
            className="absolute preserve-3d cursor-pointer group"
            style={{
              transform: `translate3d(-150px, ${layerY}px, -150px)`
            }}
            onClick={() => setSelectedLayer(selectedLayer === layerIndex ? null : layerIndex)}
          >
            {/* Layer Plane */}
            <div 
              className="w-80 h-80 border-2 backdrop-blur-sm relative overflow-hidden"
              style={{
                borderColor: layer.color,
                background: `linear-gradient(45deg, ${layer.color}11, ${layer.color}22)`,
                boxShadow: `0 0 40px ${layer.color}44`,
                transform: `rotateX(90deg)`
              }}
            >
              {/* Grid Pattern */}
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `
                    linear-gradient(${layer.color}66 1px, transparent 1px),
                    linear-gradient(90deg, ${layer.color}66 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}
              />
              
              {/* Layer Label */}
              <div 
                className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl"
                style={{ color: layer.color }}
              >
                {layer.name}
              </div>
            </div>

            {/* Asset Data Points */}
            {layer.assets.map((asset, assetIndex) => {
              const position = getAssetPosition(assetIndex, layer.assets.length);
              const height = (asset.value / layer.value) * 100 + 20;
              const pulseIntensity = Math.sin(animationTime * 0.1 + assetIndex) * 0.3 + 0.7;
              
              return (
                <div
                  key={asset.name}
                  className="absolute preserve-3d"
                  style={{
                    transform: `translate3d(${position.x}px, ${-height}px, ${position.z}px)`
                  }}
                >
                  {/* Data Column */}
                  <div 
                    className="w-12 h-12 border border-opacity-60 relative group-hover:scale-110 transition-transform"
                    style={{
                      height: `${height}px`,
                      borderColor: layer.color,
                      background: `linear-gradient(to top, ${layer.color}88, ${layer.color}44)`,
                      boxShadow: `0 0 20px ${layer.color}${Math.floor(pulseIntensity * 255).toString(16).padStart(2, '0')}`
                    }}
                  >
                    {/* Asset Info */}
                    <div 
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold whitespace-nowrap"
                      style={{ color: layer.color }}
                    >
                      {asset.name}
                    </div>
                    
                    {/* Value Display */}
                    <div 
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs text-center whitespace-nowrap"
                      style={{ color: layer.color }}
                    >
                      {formatCurrency(asset.value)}
                    </div>

                    {/* Flow Indicator */}
                    {matrixMode === 'flow' && (
                      <div 
                        className="absolute top-0 right-0 w-2 h-full"
                        style={{
                          background: asset.flow > 0 ? 
                            'linear-gradient(to top, #00ff00, #00ff0044)' : 
                            'linear-gradient(to top, #ff0000, #ff000044)'
                        }}
                      />
                    )}

                    {/* Risk Indicator */}
                    {matrixMode === 'risk' && (
                      <div 
                        className="absolute top-0 left-0 w-full"
                        style={{
                          height: `${asset.risk * 100}%`,
                          background: 'linear-gradient(to top, #ff6b35, #ff6b3544)'
                        }}
                      />
                    )}
                  </div>

                  {/* Data Streams */}
                  {selectedLayer === layerIndex && (
                    <DataStream 
                      start={position} 
                      asset={asset} 
                      color={layer.color} 
                      animationTime={animationTime}
                    />
                  )}
                </div>
              );
            })}

            {/* Correlation Lines */}
            {matrixMode === 'correlation' && selectedLayer === layerIndex && (
              <CorrelationLines 
                assets={layer.assets} 
                correlations={treasuryData.correlationMatrix} 
                color={layer.color}
                animationTime={animationTime}
              />
            )}
          </div>

          {/* Layer Connections */}
          {layerIndex < treasuryData.layers.length - 1 && (
            <LayerConnection 
              from={layerY} 
              to={layerY + 120} 
              color={layer.color}
              animationTime={animationTime}
            />
          )}
        </div>
      );
    });
  };

  const getAssetPosition = (index, total) => {
    const angle = (index / total) * 2 * Math.PI;
    const radius = 100;
    return {
      x: Math.cos(angle) * radius,
      z: Math.sin(angle) * radius
    };
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Matrix Code Rain Background */}
      <div className="absolute inset-0 opacity-20">
        {codeRain.map(stream => (
          <div
            key={stream.id}
            className="absolute text-green-400 font-mono text-xs leading-tight"
            style={{
              left: `${stream.x}px`,
              top: `${(animationTime * stream.speed) % (window.innerHeight + 400) - 400}px`,
              opacity: stream.opacity
            }}
          >
            {stream.chars.map((char, i) => (
              <div 
                key={i} 
                className="block"
                style={{
                  opacity: 1 - (i * 0.05),
                  color: i === 0 ? '#ffffff' : '#00ff41'
                }}
              >
                {char}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Scanner Lines */}
      <div 
        className="absolute w-full h-px bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-80"
        style={{
          top: `${(animationTime * 2) % 100}%`,
          boxShadow: '0 0 20px #00ff41'
        }}
      />

      {/* Main 3D Container */}
      <div 
        className="relative w-full h-full flex items-center justify-center perspective-1500"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setRotation({ x: 20, y: 45, z: 0 })}
      >
        <div 
          className="relative preserve-3d"
          style={{
            transform: `
              rotateX(${rotation.x}deg) 
              rotateY(${rotation.y + animationTime * 0.2}deg) 
              rotateZ(${rotation.z}deg)
              scale(0.8)
            `,
            transition: 'transform 0.3s ease-out'
          }}
        >
          {renderDataCube()}

          {/* Central Data Core */}
          <div className="absolute preserve-3d" style={{ transform: 'translate3d(-50px, -60px, -50px)' }}>
            <div 
              className="w-24 h-24 border-2 border-green-400 bg-black/60 backdrop-blur-md flex items-center justify-center relative"
              style={{
                boxShadow: '0 0 40px #00ff41',
                transform: `rotateX(45deg) rotateY(45deg)`
              }}
            >
              <div className="text-center text-green-400 text-xs">
                <div className="font-bold">CORE</div>
                <div>{formatCurrency(treasuryData.totalAUM)}</div>
              </div>
              
              {/* Pulsing Effect */}
              <div 
                className="absolute inset-0 border-2 border-green-400 animate-ping"
                style={{ animationDuration: '2s' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Control Matrix */}
      <div className="absolute top-6 left-6 bg-black/90 backdrop-blur-md border border-green-400/50 rounded p-4 font-mono text-green-400">
        <div className="text-lg font-bold mb-3">MATRIX CONTROL</div>
        
        <div className="space-y-3">
          <div>
            <div className="text-xs opacity-80 mb-1">VIEW MODE</div>
            <select 
              value={matrixMode} 
              onChange={(e) => setMatrixMode(e.target.value)}
              className="w-full bg-black border border-green-400/50 rounded px-2 py-1 text-xs text-green-400"
            >
              <option value="flow">FLOW ANALYSIS</option>
              <option value="correlation">CORRELATION MATRIX</option>
              <option value="risk">RISK ASSESSMENT</option>
              <option value="performance">PERFORMANCE TRACKING</option>
            </select>
          </div>

          <div className="pt-3 border-t border-green-400/30">
            <div className="text-xs space-y-1">
              <div>TOTAL AUM: {formatCurrency(treasuryData.totalAUM)}</div>
              <div>LAYERS: {treasuryData.layers.length}</div>
              <div>VAR 95%: {treasuryData.riskMetrics.var95}%</div>
              <div>CORRELATION: {treasuryData.riskMetrics.correlationStrength}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Layer Details */}
      {selectedLayer !== null && (
        <div className="absolute top-6 right-6 bg-black/90 backdrop-blur-md border border-green-400/50 rounded p-4 font-mono text-green-400 min-w-64">
          <LayerDetails 
            layer={treasuryData.layers[selectedLayer]} 
            onClose={() => setSelectedLayer(null)}
            mode={matrixMode}
          />
        </div>
      )}

      <style jsx>{`
        .perspective-1500 { perspective: 1500px; }
        .preserve-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
};

// Data Stream Component
const DataStream = ({ start, asset, color, animationTime }) => {
  const streamLength = 100;
  const segments = 20;
  
  return (
    <div className="absolute preserve-3d">
      {Array.from({ length: segments }, (_, i) => {
        const progress = i / segments;
        const z = progress * streamLength;
        const opacity = Math.sin(animationTime * 0.1 - progress * Math.PI) * 0.5 + 0.5;
        
        return (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: color,
              transform: `translate3d(0, 0, ${z}px)`,
              opacity: opacity,
              boxShadow: `0 0 5px ${color}`
            }}
          />
        );
      })}
    </div>
  );
};

// Correlation Lines Component
const CorrelationLines = ({ assets, correlations, color, animationTime }) => {
  return (
    <div className="absolute preserve-3d">
      {assets.map((asset1, i) => 
        assets.slice(i + 1).map((asset2, j) => {
          const actualJ = i + j + 1;
          const correlation = correlations[i] && correlations[i][actualJ] ? correlations[i][actualJ] : 0;
          const opacity = Math.abs(correlation) * Math.sin(animationTime * 0.1) * 0.5 + 0.5;
          
          return (
            <div
              key={`${i}-${actualJ}`}
              className="absolute h-px"
              style={{
                width: '100px',
                background: `linear-gradient(to right, ${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}, transparent)`,
                transform: `translate3d(0, 0, 0) rotateZ(${Math.atan2(actualJ - i, 1) * 180 / Math.PI}deg)`
              }}
            />
          );
        })
      )}
    </div>
  );
};

// Layer Connection Component
const LayerConnection = ({ from, to, color, animationTime }) => {
  const height = to - from;
  const pulseOffset = Math.sin(animationTime * 0.1) * 0.5 + 0.5;
  
  return (
    <div 
      className="absolute w-1 border-l-2 border-dashed opacity-60"
      style={{
        height: `${height}px`,
        borderColor: color,
        transform: `translate3d(0, ${from}px, 0)`,
        boxShadow: `0 0 10px ${color}${Math.floor(pulseOffset * 255).toString(16).padStart(2, '0')}`
      }}
    />
  );
};

// Layer Details Component
const LayerDetails = ({ layer, onClose, mode }) => (
  <div>
    <div className="flex justify-between items-center mb-3">
      <div className="text-lg font-bold" style={{ color: layer.color }}>{layer.name}</div>
      <button onClick={onClose} className="text-green-400 hover:text-green-300 text-xl">&times;</button>
    </div>
    
    <div className="space-y-2 text-xs">
      <div>LAYER VALUE: {formatCurrency(layer.value)}</div>
      <div>ASSET COUNT: {layer.assets.length}</div>
      
      <div className="pt-2 border-t border-green-400/30">
        {layer.assets.map(asset => (
          <div key={asset.name} className="flex justify-between py-1">
            <span>{asset.name}:</span>
            <span>
              {mode === 'flow' && `${asset.flow > 0 ? '+' : ''}${asset.flow}%`}
              {mode === 'risk' && `${(asset.risk * 100).toFixed(1)}%`}
              {(mode === 'correlation' || mode === 'performance') && formatCurrency(asset.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default MatrixDataCube;
