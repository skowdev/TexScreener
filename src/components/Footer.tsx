import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Github, Disc as Discord } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="pt-16 pb-8 border-t border-purple-500/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="https://i.ibb.co/8nZ96t0s/taxit.png" alt="Tax IT" className="h-8 w-8" />
              <span className="text-xl font-bold tracking-tight glow-text">Tax IT</span>
            </Link>
            <p className="text-secondary text-sm leading-relaxed mb-4">
              The premier tax token launchpad on Solana with customizable tax rules and maximum user control.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://x.com/_TaxIt" className="text-secondary hover:text-purple-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-primary mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/tokens" className="text-secondary text-sm hover:text-purple-400 transition-colors">
                  Explore Tokens
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-secondary text-sm hover:text-purple-400 transition-colors">
                  Launch Token
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-secondary text-sm hover:text-purple-400 transition-colors">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-purple-500/10 pt-8 text-center md:flex md:justify-between">
          <p className="text-secondary text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Tax IT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;