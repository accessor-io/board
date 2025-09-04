import React, { useState, useEffect } from 'react';
import Terminal from './components/Terminal';
import PriceTicker from './components/PriceTicker';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center overflow-hidden">
        {/* Loading Animation */}
        <div className="relative">
          {/* Background Glow */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"
            style={{ width: '400px', height: '400px', transform: 'translate(-50%, -50%)' }}
          />

          {/* Logo Animation */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 bg-gradient-to-br from-white to-slate-300 rounded-lg flex items-center justify-center mb-6 shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <span className="text-slate-900 font-bold text-4xl">Ξ</span>
            </div>

            {/* Loading Text */}
            <div className="text-center">
              <h1 className="text-2xl font-light text-white mb-2 tracking-wide">
                ENS Treasury
              </h1>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`
        }}
      />

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 50 }, (_, i) => (
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
      </div>

      {/* Executive Header */}
      <div className="bg-white border-b border-gray-300 relative">
        {/* Animated Border */}
        <div className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-full animate-pulse" />

        <div className="max-w-full mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-900 to-slate-700 rounded-lg flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all duration-300 relative overflow-hidden">
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                <span className="text-white font-bold text-xl relative z-10">Ξ</span>
              </div>
              <div className="transform transition-all duration-300 group-hover:translate-x-1">
                <h1 className="font-light text-2xl text-slate-900 tracking-tight mb-1">
                  ENS DAO Treasury Management
                </h1>
                <p className="text-xs text-slate-500 uppercase tracking-[0.2em] font-medium">
                  Executive Financial Dashboard
                </p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right transform transition-all duration-300 hover:scale-105">
                <PriceTicker />
              </div>

              {/* Enhanced Status Indicator */}
              <div className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50 group">
                <div className="relative">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
                </div>
                <span className="text-xs text-slate-700 font-medium uppercase tracking-[0.15em] group-hover:text-slate-900 transition-colors">
                  Real-Time Data
                </span>
              </div>

              {/* Enhanced Timestamp */}
              <div className="text-right transform transition-all duration-300 hover:translate-y-[-1px]">
                <div className="text-xs text-slate-500 uppercase tracking-[0.2em] font-medium mb-1">
                  Last Updated
                </div>
                <div className="text-sm text-slate-900 font-light tracking-wide">
                  {new Date().toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZoneName: 'short'
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-full mx-auto relative">
        <Terminal />
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>
    </div>
  );
}

export default App;
