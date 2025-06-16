import React, { useEffect } from 'react';
import { Trophy } from 'lucide-react';
import LeaderboardCard from '../components/LeaderboardCard';
import { leaderboardEntries } from '../data/mockData';

const LeaderboardPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Token Leaderboard | TAX';
  }, []);

  return (
    <div className="py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="text-yellow-500 h-8 w-8" />
            <h1 className="text-3xl md:text-4xl font-bold">Token Leaderboard</h1>
          </div>
          <p className="text-secondary text-lg mb-8">
            Discover the top performing tokens on our platform ranked by trading volume, market cap, and holder growth.
          </p>

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
      </div>
    </div>
  );
};

export default LeaderboardPage;