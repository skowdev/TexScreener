import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, ArrowRight, Zap, Shield, BarChart3 } from 'lucide-react';

const StatsBar: React.FC = () => {
  const [activeTokens, setActiveTokens] = useState<Array<{
    id: string;
    name: string;
    symbol: string;
    price: number;
    change: number;
    volume: number;
    timestamp: number;
  }>>([
    { id: '1', name: 'Solar Ecosystem', symbol: 'SOLAR', price: 0.0087, change: 23.8, volume: 920000, timestamp: Date.now() - 1000 * 60 * 2 },
    { id: '2', name: 'Neon Finance', symbol: 'NEON', price: 0.0135, change: -5.2, volume: 1450000, timestamp: Date.now() - 1000 * 60 * 5 },
    { id: '3', name: 'Quantum Pixels', symbol: 'QPIX', price: 0.0021, change: 17.3, volume: 315000, timestamp: Date.now() - 1000 * 60 * 8 },
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setActiveTokens(current => 
        current.map(token => ({
          ...token,
          price: token.price * (1 + (Math.random() * 0.02 - 0.01)),
          change: token.change + (Math.random() * 2 - 1),
          volume: token.volume * (1 + (Math.random() * 0.05)),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ago`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(2)}K`;
    return num.toFixed(2);
  };

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Activity */}
          <div className="lg:col-span-2 card border border-purple-500/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="text-purple-400 h-5 w-5" />
                <h3 className="font-medium">Live Token Activity</h3>
              </div>
              <Link to="/leaderboard" className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {activeTokens.map(token => (
                <div key={token.id} className="flex items-center gap-4 p-4 bg-card-hover rounded-lg border border-purple-500/10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-purple-400">{token.symbol.charAt(0)}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{token.name}</h4>
                      <span className="text-sm text-secondary">{token.symbol}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-secondary">${token.price.toFixed(6)}</span>
                      <span className={token.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                        {token.change >= 0 ? '+' : ''}{token.change.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium">${formatNumber(token.volume)}</div>
                    <div className="text-xs text-secondary">{formatTimeAgo(token.timestamp)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="card border border-purple-500/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Rocket className="text-purple-400 h-5 w-5" />
                <h3 className="font-medium">Recent Launches</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-secondary">Today</span>
                  <span className="font-medium">12 tokens</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary">This Week</span>
                  <span className="font-medium">48 tokens</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary">This Month</span>
                  <span className="font-medium">235 tokens</span>
                </div>
              </div>
            </div>

            <div className="card border border-purple-500/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-purple-400 h-5 w-5" />
                <h3 className="font-medium">Platform Stats</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-secondary">Total Volume</span>
                  <span className="font-medium">$48.2M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary">Active Users</span>
                  <span className="font-medium">15.4K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary">Avg Launch Time</span>
                  <span className="font-medium">45 sec</span>
                </div>
              </div>
            </div>

            <Link 
              to="/create" 
              className="btn-primary w-full justify-center"
            >
              <Zap className="h-4 w-4" />
              <span>Launch Your Token</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsBar;