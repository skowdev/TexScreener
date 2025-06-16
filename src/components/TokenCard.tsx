import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Badge, Shield, TrendingUp } from 'lucide-react';
import { formatValue, formatPercentage } from '../utils/format';

interface TokenCardProps {
  token: any;
}

const TokenCard: React.FC<TokenCardProps> = ({ token }) => {
  const stats = token.stats?.[0] || {};
  const price = stats.price || 0;
  const marketCap = stats.market_cap || 0;
  const volume24h = stats.volume_24h || 0;
  const change24h = 0; // TODO: Implement price change calculation

  return (
    <Link
      to={`/token/${token.id}`}
      className="card card-hover group flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center overflow-hidden">
            {token.icon_url ? (
              <img src={token.icon_url} alt={token.name} className="w-6 h-6" />
            ) : (
              <span className="text-lg font-bold text-purple-400">{token.symbol.charAt(0)}</span>
            )}
          </div>
          <div>
            <h3 className="font-medium text-primary group-hover:text-purple-400 transition-colors">
              {token.name}
            </h3>
            <p className="text-secondary text-sm">{token.symbol}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {token.verified && (
            <span className="text-cyan-400" title="Verified">
              <Shield className="w-4 h-4" />
            </span>
          )}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-medium">${price.toFixed(6)}</span>
          <span
            className={`text-sm font-medium flex items-center gap-0.5 ${
              change24h >= 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {formatPercentage(change24h)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-card-hover rounded-lg p-3">
          <p className="text-secondary text-xs mb-1 flex items-center gap-1">
            <Badge className="w-3 h-3" /> Buy Tax
          </p>
          <p className="font-medium">{token.buy_tax}%</p>
        </div>
        <div className="bg-card-hover rounded-lg p-3">
          <p className="text-secondary text-xs mb-1 flex items-center gap-1">
            <Badge className="w-3 h-3" /> Sell Tax
          </p>
          <p className="font-medium">{token.sell_tax}%</p>
        </div>
      </div>

      <div className="mt-auto">
        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="text-secondary flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Volume
            </p>
            <p className="font-medium">${formatValue(volume24h)}</p>
          </div>
          <div className="text-right">
            <p className="text-secondary">Market Cap</p>
            <p className="font-medium">${formatValue(marketCap)}</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight className="w-4 h-4 text-purple-400" />
      </div>
    </Link>
  );
};

export default TokenCard;