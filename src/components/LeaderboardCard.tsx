import React from 'react';
import { Link } from 'react-router-dom';
import { LeaderboardEntry } from '../types';
import { formatValue, formatPercentage } from '../utils/format';

interface LeaderboardCardProps {
  entry: LeaderboardEntry;
  index: number;
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ entry, index }) => {
  const getBgColor = (index: number) => {
    if (index === 0) return 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/30';
    if (index === 1) return 'bg-gradient-to-r from-slate-400/20 to-slate-500/20 border-slate-400/30';
    if (index === 2) return 'bg-gradient-to-r from-amber-700/20 to-amber-800/20 border-amber-700/30';
    return '';
  };

  const getRankBadge = (index: number) => {
    if (index === 0) return 'bg-yellow-500 text-black';
    if (index === 1) return 'bg-slate-400 text-black';
    if (index === 2) return 'bg-amber-700 text-white';
    return 'bg-card-hover text-primary';
  };

  return (
    <Link
      to={`/token/${entry.tokenId}`}
      className={`card card-hover flex items-center gap-4 ${getBgColor(index)}`}
    >
      <span className={`flex items-center justify-center w-6 h-6 rounded-full font-bold text-sm ${getRankBadge(index)}`}>
        {index + 1}
      </span>
      
      <div className="flex items-center gap-3 flex-1">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center overflow-hidden">
          {entry.tokenIcon ? (
            <img src={entry.tokenIcon} alt={entry.tokenName} className="w-5 h-5" />
          ) : (
            <span className="text-sm font-bold text-purple-400">{entry.tokenSymbol.charAt(0)}</span>
          )}
        </div>
        
        <div>
          <h3 className="font-medium">{entry.tokenName}</h3>
          <p className="text-secondary text-sm">{entry.tokenSymbol}</p>
        </div>
      </div>
      
      <div className="text-right">
        <p className="font-medium">${formatValue(entry.value)}</p>
        <p
          className={`text-sm flex items-center justify-end gap-0.5 ${
            entry.change24h >= 0 ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {formatPercentage(entry.change24h)}
        </p>
      </div>
    </Link>
  );
};

export default LeaderboardCard;