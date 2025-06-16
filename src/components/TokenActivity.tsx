import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, ArrowRight, Rocket, Shield, Zap } from 'lucide-react';

interface TokenTransaction {
  id: string;
  type: 'buy' | 'sell' | 'transfer';
  tokenName: string;
  tokenSymbol: string;
  amount: number;
  price: number;
  timestamp: number;
}

const TokenActivity: React.FC = () => {
  const [transactions, setTransactions] = useState<TokenTransaction[]>([
    { id: '1', type: 'buy', tokenName: 'Solar Ecosystem', tokenSymbol: 'SOLAR', amount: 250000, price: 0.0087, timestamp: Date.now() - 1000 * 30 },
    { id: '2', type: 'sell', tokenName: 'Neon Finance', tokenSymbol: 'NEON', amount: 180000, price: 0.0135, timestamp: Date.now() - 1000 * 60 },
    { id: '3', type: 'buy', tokenName: 'Quantum Pixels', tokenSymbol: 'QPIX', amount: 500000, price: 0.0021, timestamp: Date.now() - 1000 * 90 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const types: ('buy' | 'sell' | 'transfer')[] = ['buy', 'sell'];
      const tokens = [
        { name: 'Solar Ecosystem', symbol: 'SOLAR', price: 0.0087 },
        { name: 'Neon Finance', symbol: 'NEON', price: 0.0135 },
        { name: 'Quantum Pixels', symbol: 'QPIX', price: 0.0021 },
      ];

      const newTransaction: TokenTransaction = {
        id: Math.random().toString(),
        type: types[Math.floor(Math.random() * types.length)],
        ...tokens[Math.floor(Math.random() * tokens.length)],
        amount: Math.floor(Math.random() * 500000) + 100000,
        price: tokens[0].price * (1 + (Math.random() * 0.1 - 0.05)),
        timestamp: Date.now(),
      };

      setTransactions(prev => [newTransaction, ...prev.slice(0, 2)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ago`;
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-cyan-500/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Live Transactions */}
          <div className="lg:col-span-8">
            <div className="card border border-purple-500/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <BarChart3 className="text-purple-400 h-5 w-5" />
                  <h3 className="font-medium">Live Transactions</h3>
                </div>
                <Link to="/leaderboard" className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="space-y-4">
                {transactions.map(tx => (
                  <div 
                    key={tx.id}
                    className="group flex items-center gap-4 p-4 bg-card-hover rounded-lg border border-purple-500/10 transition-all duration-300 hover:border-purple-500/30"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === 'buy' ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}>
                      <span className={`text-sm font-medium ${
                        tx.type === 'buy' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {tx.type.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{tx.tokenName}</h4>
                        <span className="text-sm text-secondary">{tx.tokenSymbol}</span>
                      </div>
                      <div className="text-sm text-secondary">
                        {formatNumber(tx.amount)} tokens @ ${tx.price.toFixed(6)}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        ${formatNumber(tx.amount * tx.price)}
                      </div>
                      <div className="text-xs text-secondary">
                        {formatTimeAgo(tx.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Platform Overview */}
          <div className="lg:col-span-4 space-y-6">
            <div className="card border border-purple-500/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Rocket className="text-purple-400 h-5 w-5" />
                <h3 className="font-medium">Platform Overview</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-secondary">24h Volume</span>
                    <span className="font-medium">$2.8M</span>
                  </div>
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-secondary">Active Tokens</span>
                    <span className="font-medium">235</span>
                  </div>
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-secondary">Total Users</span>
                    <span className="font-medium">15.4K</span>
                  </div>
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card border border-purple-500/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-purple-400 h-5 w-5" />
                <h3 className="font-medium">Security Stats</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-secondary">Verified Tokens</span>
                  <span className="font-medium">89%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary">Avg Liquidity</span>
                  <span className="font-medium">25.5 SOL</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary">Success Rate</span>
                  <span className="font-medium">99.8%</span>
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

export default TokenActivity;