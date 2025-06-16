import React from 'react';
import { Trophy, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import LeaderboardCard from './LeaderboardCard';
import { leaderboardEntries } from '../data/mockData';

const Leaderboard: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-card/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="text-yellow-500 h-6 w-6" />
              <h2 className="text-2xl md:text-3xl font-bold">Token Leaderboard</h2>
            </div>
            <p className="text-secondary">Top performing tokens by 24h trading volume</p>
          </div>
          
          <Link to="/" className="group flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors">
            <span>View full leaderboard</span>
            <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="space-y-3">
          {leaderboardEntries.map((entry, index) => (
            <LeaderboardCard 
              key={entry.id} 
              entry={entry} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;