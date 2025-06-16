import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shield, ExternalLink, Copy, Clock, AreaChart, Users, BarChart3, ArrowLeft, Wallet } from 'lucide-react';
import { tokens } from '../data/mockData';
import { Token } from '../types';
import { formatValue, formatPercentage } from '../utils/format';

const TokenDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [token, setToken] = useState<Token | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'holders'>('overview');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Find token from mock data
    const foundToken = tokens.find(t => t.id === id);
    
    if (foundToken) {
      setToken(foundToken);
      document.title = `${foundToken.name} (${foundToken.symbol}) | TAX`;
    }
  }, [id]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!token) {
    return (
      <div className="py-32 container mx-auto px-4">
        <div className="card p-10 text-center">
          <h2 className="text-2xl font-bold mb-4">Token Not Found</h2>
          <p className="text-secondary mb-6">The token you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="btn-primary">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-32">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-secondary hover:text-purple-400 transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to all tokens</span>
        </Link>
        
        <div className="card border border-purple-500/20 p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center overflow-hidden">
                {token.icon ? (
                  <img src={token.icon} alt={token.name} className="w-10 h-10" />
                ) : (
                  <span className="text-2xl font-bold text-purple-400">{token.symbol.charAt(0)}</span>
                )}
              </div>
              
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-bold">{token.name}</h1>
                  {token.verified && (
                    <span className="text-cyan-400" title="Verified">
                      <Shield className="w-5 h-5" />
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-lg text-secondary">{token.symbol}</span>
                  <button 
                    className="text-secondary hover:text-purple-400 transition-colors focus:outline-none"
                    onClick={() => copyToClipboard(token.symbol)}
                    title="Copy token symbol"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  {copied && (
                    <span className="text-xs text-purple-400">Copied!</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="md:ml-auto">
              <div className="flex flex-col items-end">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">${token.price.toFixed(6)}</span>
                  <span
                    className={`text-sm font-medium flex items-center gap-0.5 ${
                      token.change24h >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {formatPercentage(token.change24h)}
                  </span>
                </div>
                <span className="text-secondary text-sm">Price (USD)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card border border-purple-500/20 p-6">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="text-purple-400 h-5 w-5" />
              <h3 className="font-medium">Market Cap</h3>
            </div>
            <p className="text-2xl font-bold">${formatValue(token.marketCap)}</p>
          </div>
          
          <div className="card border border-purple-500/20 p-6">
            <div className="flex items-center gap-3 mb-2">
              <AreaChart className="text-purple-400 h-5 w-5" />
              <h3 className="font-medium">24h Volume</h3>
            </div>
            <p className="text-2xl font-bold">${formatValue(token.volume24h)}</p>
          </div>
          
          <div className="card border border-purple-500/20 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="text-purple-400 h-5 w-5" />
              <h3 className="font-medium">Holders</h3>
            </div>
            <p className="text-2xl font-bold">1,235</p>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-purple-500/20 mb-8">
          <div className="flex overflow-x-auto">
            <button
              className={`px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent hover:text-purple-400'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'analytics'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent hover:text-purple-400'
              }`}
              onClick={() => setActiveTab('analytics')}
            >
              Analytics
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'holders'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent hover:text-purple-400'
              }`}
              onClick={() => setActiveTab('holders')}
            >
              Holders
            </button>
          </div>
        </div>
        
        {/* Tab content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left column */}
          <div className="md:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="card border border-purple-500/20 p-6">
                  <h3 className="text-xl font-bold mb-4">About {token.name}</h3>
                  <p className="text-secondary leading-relaxed mb-6">{token.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Token Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-secondary text-sm">Total Supply</span>
                          <span>{token.totalSupply}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary text-sm">Launch Date</span>
                          <span>{token.launchDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary text-sm">Creator</span>
                          <div className="flex items-center gap-1">
                            <span className="text-sm truncate max-w-[120px]">{token.creator.substring(0, 6)}...{token.creator.substring(token.creator.length - 4)}</span>
                            <button 
                              className="text-secondary hover:text-purple-400 transition-colors focus:outline-none"
                              onClick={() => copyToClipboard(token.creator)}
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Tax Configuration</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-secondary text-sm">Buy Tax</span>
                          <span>{token.buyTax}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary text-sm">Sell Tax</span>
                          <span>{token.sellTax}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary text-sm">Tax Distribution</span>
                          <span>
                            <Link to="#" className="text-purple-400 text-sm hover:underline">View Details</Link>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card border border-purple-500/20 p-6">
                  <h3 className="text-xl font-bold mb-4">Price Chart</h3>
                  <div className="flex items-center justify-center h-64 bg-card-hover rounded-lg border border-purple-500/10">
                    <p className="text-secondary">Interactive price chart will be displayed here</p>
                  </div>
                </div>
                
                <div className="card border border-purple-500/20 p-6">
                  <h3 className="text-xl font-bold mb-4">Recent Transactions</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-purple-500/10">
                          <th className="text-left py-3 px-4 text-secondary text-sm font-medium">Type</th>
                          <th className="text-left py-3 px-4 text-secondary text-sm font-medium">Amount</th>
                          <th className="text-left py-3 px-4 text-secondary text-sm font-medium">From</th>
                          <th className="text-left py-3 px-4 text-secondary text-sm font-medium">To</th>
                          <th className="text-left py-3 px-4 text-secondary text-sm font-medium">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-purple-500/10">
                          <td className="py-3 px-4">
                            <span className="text-sm px-2 py-1 rounded-full bg-green-500/10 text-green-500">Buy</span>
                          </td>
                          <td className="py-3 px-4">1,250,000 {token.symbol}</td>
                          <td className="py-3 px-4 text-sm">0x3a...4c2d</td>
                          <td className="py-3 px-4 text-sm">0x7f...9e1b</td>
                          <td className="py-3 px-4 text-secondary text-sm">2 mins ago</td>
                        </tr>
                        <tr className="border-b border-purple-500/10">
                          <td className="py-3 px-4">
                            <span className="text-sm px-2 py-1 rounded-full bg-red-500/10 text-red-500">Sell</span>
                          </td>
                          <td className="py-3 px-4">750,000 {token.symbol}</td>
                          <td className="py-3 px-4 text-sm">0x5d...8f3e</td>
                          <td className="py-3 px-4 text-sm">0x2b...7a9c</td>
                          <td className="py-3 px-4 text-secondary text-sm">15 mins ago</td>
                        </tr>
                        <tr className="border-b border-purple-500/10">
                          <td className="py-3 px-4">
                            <span className="text-sm px-2 py-1 rounded-full bg-green-500/10 text-green-500">Buy</span>
                          </td>
                          <td className="py-3 px-4">3,500,000 {token.symbol}</td>
                          <td className="py-3 px-4 text-sm">0x9b...2e7d</td>
                          <td className="py-3 px-4 text-sm">0x1c...6f4a</td>
                          <td className="py-3 px-4 text-secondary text-sm">28 mins ago</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'analytics' && (
              <div className="card border border-purple-500/20 p-6">
                <h3 className="text-xl font-bold mb-6">Token Analytics</h3>
                <div className="flex flex-col items-center justify-center h-64">
                  <p className="text-secondary mb-4">Detailed analytics will be available soon</p>
                  <button className="btn-outline">
                    <Clock className="h-4 w-4" />
                    <span>Get Notified</span>
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'holders' && (
              <div className="card border border-purple-500/20 p-6">
                <h3 className="text-xl font-bold mb-4">Top Token Holders</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-purple-500/10">
                        <th className="text-left py-3 px-4 text-secondary text-sm font-medium">Rank</th>
                        <th className="text-left py-3 px-4 text-secondary text-sm font-medium">Address</th>
                        <th className="text-left py-3 px-4 text-secondary text-sm font-medium">Balance</th>
                        <th className="text-left py-3 px-4 text-secondary text-sm font-medium">Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-purple-500/10">
                        <td className="py-3 px-4">#1</td>
                        <td className="py-3 px-4 text-sm">0x7a...4c2d</td>
                        <td className="py-3 px-4">150,000,000 {token.symbol}</td>
                        <td className="py-3 px-4">15.00%</td>
                      </tr>
                      <tr className="border-b border-purple-500/10">
                        <td className="py-3 px-4">#2</td>
                        <td className="py-3 px-4 text-sm">0x5d...8f3e</td>
                        <td className="py-3 px-4">120,000,000 {token.symbol}</td>
                        <td className="py-3 px-4">12.00%</td>
                      </tr>
                      <tr className="border-b border-purple-500/10">
                        <td className="py-3 px-4">#3</td>
                        <td className="py-3 px-4 text-sm">0x9b...2e7d</td>
                        <td className="py-3 px-4">95,000,000 {token.symbol}</td>
                        <td className="py-3 px-4">9.50%</td>
                      </tr>
                      <tr className="border-b border-purple-500/10">
                        <td className="py-3 px-4">#4</td>
                        <td className="py-3 px-4 text-sm">0x1c...6f4a</td>
                        <td className="py-3 px-4">75,000,000 {token.symbol}</td>
                        <td className="py-3 px-4">7.50%</td>
                      </tr>
                      <tr className="border-b border-purple-500/10">
                        <td className="py-3 px-4">#5</td>
                        <td className="py-3 px-4 text-sm">0x3f...8d2e</td>
                        <td className="py-3 px-4">60,000,000 {token.symbol}</td>
                        <td className="py-3 px-4">6.00%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          
          {/* Right column */}
          <div className="md:col-span-1">
            <div className="space-y-6">
              <div className="card border border-purple-500/20 p-6">
                <h3 className="font-medium mb-4">Trade {token.symbol}</h3>
                <button className="btn-primary w-full mb-3">
                  <Wallet className="h-4 w-4" />
                  <span>Connect Wallet</span>
                </button>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline w-full flex items-center justify-center gap-2"
                >
                  <span>View on Explorer</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              
              <div className="card border border-purple-500/20 p-6">
                <h3 className="font-medium mb-4">Token Contract</h3>
                <div className="bg-card-hover rounded-lg p-3 flex items-center justify-between mb-4">
                  <span className="text-sm truncate max-w-[170px]">
                    {token.creator}
                  </span>
                  <button 
                    className="text-secondary hover:text-purple-400 transition-colors focus:outline-none"
                    onClick={() => copyToClipboard(token.creator)}
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-secondary text-sm">This token was created on {token.createdAt}</p>
              </div>
              
              <div className="card border border-purple-500/20 p-6">
                <h3 className="font-medium mb-4">Social Links</h3>
                <div className="space-y-2">
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-secondary hover:text-purple-400 transition-colors"
                  >
                    <span className="text-sm">Website</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-secondary hover:text-purple-400 transition-colors"
                  >
                    <span className="text-sm">Twitter</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-secondary hover:text-purple-400 transition-colors"
                  >
                    <span className="text-sm">Telegram</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-secondary hover:text-purple-400 transition-colors"
                  >
                    <span className="text-sm">Discord</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDetailPage;