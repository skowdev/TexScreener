import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import TokenCard from './TokenCard';
import { useTokens } from '../hooks/useTokens';

const TokenList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'volume' | 'date' | 'marketCap'>('marketCap');
  const { tokens, loading } = useTokens();
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'name' | 'volume' | 'date' | 'marketCap');
  };
  
  const filteredTokens = tokens.filter(token => 
    token.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const sortedTokens = [...filteredTokens].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'volume':
        return (b.stats?.volume_24h || 0) - (a.stats?.volume_24h || 0);
      case 'date':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'marketCap':
      default:
        return (b.stats?.market_cap || 0) - (a.stats?.market_cap || 0);
    }
  });

  if (loading) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-secondary">Loading tokens...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Tokens</h2>
            <p className="text-secondary">Discover the latest and most popular tax tokens on Solana</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary h-4 w-4" />
              <input
                type="text"
                placeholder="Search tokens..."
                className="w-full pl-10 pr-4 py-2 bg-card border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500/50 placeholder:text-secondary text-sm"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary h-4 w-4" />
              <select
                className="appearance-none w-full pl-10 pr-8 py-2 bg-card border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500/50 text-sm cursor-pointer"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="marketCap">Market Cap</option>
                <option value="volume">Volume</option>
                <option value="date">Newest</option>
                <option value="name">Name</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-secondary">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTokens.map(token => (
            <TokenCard key={token.id} token={token} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TokenList