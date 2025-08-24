import React, { useState, useEffect, useMemo } from 'react';
import { formatCurrency } from '../utils/formatters';

const RubiksCubeTreasury = ({ data }) => {
  const [rotation, setRotation] = useState({ x: -15, y: 45, z: 0 });
  const [selectedFace, setSelectedFace] = useState(null);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [autoRotate, setAutoRotate] = useState(true);
  const [cubeSize, setCubeSize] = useState(200);
  const [animationTime, setAnimationTime] = useState(0);

  // Treasury data with asset logos and info
  const treasuryData = data || {
    totalAUM: 100230000,
    assets: [
      { 
        name: 'ETH', 
        value: 43230690, 
        percentage: 43.2, 
        color: '#627EEA',
        logo: 'Ξ',
        description: 'Ethereum - Primary treasury asset'
      },
      { 
        name: 'stETH', 
        value: 20046000, 
        percentage: 20.0, 
        color: '#00D4AA',
        logo: 'ⱦ',
        description: 'Staked Ethereum - Liquid staking'
      },
      { 
        name: 'USDC', 
        value: 15034500, 
        percentage: 15.0, 
        color: '#2775CA',
        logo: '$',
        description: 'USD Coin - Stable asset'
      },
      { 
        name: 'WETH', 
        value: 10023000, 
        percentage: 10.0, 
        color: '#F0F8FF',
        logo: 'Ⓦ',
        description: 'Wrapped Ethereum'
      },
      { 
        name: 'DAI', 
        value: 7016100, 
        percentage: 7.0, 
        color: '#F5AC37',
        logo: '◈',
        description: 'DAI Stablecoin'
      },
      { 
        name: 'USDT', 
        value: 4879710, 
        percentage: 4.8, 
        color: '#26A17B',
        logo: '₮',
        description: 'Tether USD'
      }
    ]
  };

  // Animation loop
  useEffect(() => {
    let interval;
    if (autoRotate) {
      interval = setInterval(() => {
        setAnimationTime(prev => prev + 1);
        setRotation(prev => ({
          ...prev,
          y: prev.y + 0.5 * animationSpeed
        }));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [autoRotate, animationSpeed]);

  // Mouse interaction
  const handleMouseMove = (e) => {
    if (!autoRotate) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientY - rect.top) / rect.height - 0.5) * 80;
      const y = ((e.clientX - rect.left) / rect.width - 0.5) * 80;
      setRotation({ x: -15 + x, y: 45 + y, z: 0 });
    }
  };

  // Cube faces configuration
  const cubeConfig = [
    { 
      name: 'front', 
      transform: `translateZ(${cubeSize/2}px)`,
      assets: treasuryData.assets.slice(0, 9),
      bgColor: 'from-gray-900 to-black'
    },
    { 
      name: 'back', 
      transform: `translateZ(-${cubeSize/2}px) rotateY(180deg)`,
      assets: treasuryData.assets.slice(0, 9),
      bgColor: 'from-black to-gray-800'
    },
    { 
      name: 'right', 
      transform: `rotateY(90deg) translateZ(${cubeSize/2}px)`,
      assets: treasuryData.assets.slice(0, 9),
      bgColor: 'from-gray-800 to-gray-900'
    },
    { 
      name: 'left', 
      transform: `rotateY(-90deg) translateZ(${cubeSize/2}px)`,
      assets: treasuryData.assets.slice(0, 9),
      bgColor: 'from-gray-700 to-black'
    },
    { 
      name: 'top', 
      transform: `rotateX(90deg) translateZ(${cubeSize/2}px)`,
      assets: treasuryData.assets.slice(0, 9),
      bgColor: 'from-gray-600 to-gray-900'
    },
    { 
      name: 'bottom', 
      transform: `rotateX(-90deg) translateZ(${cubeSize/2}px)`,
      assets: treasuryData.assets.slice(0, 9),
      bgColor: 'from-black to-gray-700'
    }
  ];

  // Generate 3x3 grid for each face
  const generateFaceGrid = (faceAssets, faceIndex) => {
    const grid = [];
    for (let i = 0; i < 9; i++) {
      const asset = faceAssets[i % faceAssets.length];
      const row = Math.floor(i / 3);
      const col = i % 3;
      
      grid.push(
        <div
          key={`${faceIndex}-${i}`}
          className="relative border border-white/20 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/10"
          style={{
            position: 'absolute',
            width: `${cubeSize/3}px`,
            height: `${cubeSize/3}px`,
            left: `${col * cubeSize/3}px`,
            top: `${row * cubeSize/3}px`,
            backdropFilter: 'blur(2px)'
          }}
          onClick={() => setSelectedFace({ face: faceIndex, asset, position: i })}
        >
          {/* Asset Logo */}
          <div 
            className="text-white font-bold text-2xl transition-all duration-500 hover:scale-125"
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))'
            }}
          >
            {asset.logo}
          </div>
          
          {/* Asset Name Overlay */}
          <div 
            className="absolute inset-0 flex items-end justify-center pb-1 opacity-0 hover:opacity-100 transition-opacity duration-300"
          >
            <span className="text-xs font-bold text-white bg-black/60 px-1 rounded">
              {asset.name}
            </span>
          </div>

          {/* Percentage Indicator */}
          <div 
            className="absolute top-0 right-0 w-2 h-2 rounded-full"
            style={{
              background: `linear-gradient(45deg, ${asset.color}, white)`,
              boxShadow: `0 0 6px ${asset.color}`
            }}
          />

          {/* Reflection Effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 0 100%)'
            }}
          />
        </div>
      );
    }
    return grid;
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}
      />

      {/* Floating Particles */}
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}

      {/* Main Container */}
      <div 
        className="relative w-full h-full flex items-center justify-center perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => !autoRotate && setRotation({ x: -15, y: 45, z: 0 })}
      >
        {/* Rubik's Cube */}
        <div 
          className="relative preserve-3d cursor-pointer"
          style={{
            width: `${cubeSize}px`,
            height: `${cubeSize}px`,
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
            transition: autoRotate ? 'none' : 'transform 0.3s ease-out'
          }}
        >
          {/* Cube Faces */}
          {cubeConfig.map((face, faceIndex) => (
            <div
              key={face.name}
              className={`absolute w-full h-full bg-gradient-to-br ${face.bgColor} border-2 border-white/30`}
              style={{
                transform: face.transform,
                boxShadow: 'inset 0 0 50px rgba(0,0,0,0.5), 0 0 50px rgba(255,255,255,0.1)'
              }}
            >
              {/* Face Grid */}
              <div className="relative w-full h-full">
                {generateFaceGrid(face.assets, faceIndex)}
              </div>

              {/* Face Label */}
              <div 
                className="absolute bottom-2 right-2 text-xs font-bold text-white/60 uppercase tracking-wider"
              >
                {face.name}
              </div>
            </div>
          ))}

          {/* Center Core Glow */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
              transform: `translateZ(0)`
            }}
          />
        </div>

        {/* Ambient Lighting Effects */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, rgba(100, 200, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(255, 100, 200, 0.1) 0%, transparent 50%)
            `
          }}
        />
      </div>

      {/* Control Panel */}
      <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-md rounded-lg p-4 border border-white/20 text-white">
        <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Rubik's Treasury Cube
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium mb-2 opacity-80">Auto Rotate</label>
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`w-full px-3 py-1 rounded text-xs font-medium transition-colors ${
                autoRotate 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              {autoRotate ? 'ON' : 'OFF'}
            </button>
          </div>

          <div>
            <label className="block text-xs font-medium mb-2 opacity-80">
              Speed: {animationSpeed}x
            </label>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
              className="w-full accent-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-2 opacity-80">
              Size: {cubeSize}px
            </label>
            <input
              type="range"
              min="150"
              max="300"
              step="10"
              value={cubeSize}
              onChange={(e) => setCubeSize(parseInt(e.target.value))}
              className="w-full accent-white"
            />
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="text-xs space-y-1 opacity-80">
            <div>Total AUM: {formatCurrency(treasuryData.totalAUM)}</div>
            <div>Assets: {treasuryData.assets.length}</div>
            <div>Faces: 6 x 9 squares</div>
          </div>
        </div>
      </div>

      {/* Asset Details Panel */}
      {selectedFace && (
        <div className="absolute top-6 right-6 bg-black/90 backdrop-blur-md rounded-lg p-4 border border-white/20 text-white min-w-80">
          <AssetDetails 
            asset={selectedFace.asset} 
            face={selectedFace.face}
            position={selectedFace.position}
            onClose={() => setSelectedFace(null)} 
          />
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md rounded-lg p-4 border border-white/20 text-white">
        <h4 className="text-sm font-bold mb-3">Asset Legend</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {treasuryData.assets.map((asset, index) => (
            <div key={asset.name} className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded border border-white/30 flex items-center justify-center font-bold"
                style={{ 
                  background: `linear-gradient(45deg, ${asset.color}40, black)`,
                  color: 'white'
                }}
              >
                {asset.logo}
              </div>
              <span>{asset.name}</span>
              <span className="opacity-60">{asset.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-md rounded-lg p-4 border border-white/20 text-white text-xs">
        <div className="space-y-1 opacity-80">
          <div>🖱️ Hover to manually rotate (auto-rotate off)</div>
          <div>🔲 Click squares for asset details</div>
          <div>⚙️ Adjust speed and size in controls</div>
          <div>🎲 Each face shows the same treasury assets</div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

// Asset Details Component
const AssetDetails = ({ asset, face, position, onClose }) => {
  const row = Math.floor(position / 3) + 1;
  const col = (position % 3) + 1;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-lg font-bold" style={{ color: asset.color }}>
          {asset.logo} {asset.name}
        </h4>
        <button 
          onClick={onClose} 
          className="text-white/60 hover:text-white text-xl font-bold"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-3 text-sm">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="opacity-60 text-xs">Value</div>
            <div className="font-medium">{formatCurrency(asset.value)}</div>
          </div>
          <div>
            <div className="opacity-60 text-xs">Allocation</div>
            <div className="font-medium">{asset.percentage}%</div>
          </div>
        </div>
        
        <div>
          <div className="opacity-60 text-xs mb-1">Description</div>
          <div>{asset.description}</div>
        </div>
        
        <div className="pt-3 border-t border-white/20">
          <div className="opacity-60 text-xs">Position on Cube</div>
          <div className="font-medium">
            Face {face + 1} • Row {row} • Column {col}
          </div>
        </div>

        <div className="bg-white/10 rounded p-2">
          <div className="opacity-60 text-xs mb-1">Asset Color</div>
          <div className="flex items-center space-x-2">
            <div 
              className="w-4 h-4 rounded border border-white/30"
              style={{ backgroundColor: asset.color }}
            />
            <span className="font-mono text-xs">{asset.color}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RubiksCubeTreasury;
