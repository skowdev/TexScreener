import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Menu, X, Twitter } from 'lucide-react';
import AuthModal from './AuthModal';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const { connected } = useWallet();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-lg shadow-lg shadow-purple-500/10 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
            <img src="https://i.ibb.co/8nZ96t0s/taxit.png" alt="Tax IT" className="h-8 w-8" />
            <span className="text-xl font-bold tracking-tight glow-text">Tax IT</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors duration-200 hover:text-purple-400 ${
                location.pathname === '/' ? 'text-purple-400' : 'text-primary'
              }`}
            >
              Home
            </Link>
            <Link
              to="/leaderboard"
              className={`text-sm font-medium transition-colors duration-200 hover:text-purple-400 ${
                location.pathname === '/leaderboard' ? 'text-purple-400' : 'text-primary'
              }`}
            >
              Leaderboard
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors duration-200 hover:text-purple-400 ${
                location.pathname === '/about' ? 'text-purple-400' : 'text-primary'
              }`}
            >
              About
            </Link>
            <Link
              to="/create"
              className={`text-sm font-medium transition-colors duration-200 hover:text-purple-400 ${
                location.pathname === '/create' ? 'text-purple-400' : 'text-primary'
              }`}
            >
              Launch
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {!connected && (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="btn-outline"
              >
                Sign In
              </button>
            )}
            <a 
              href="https://x.com/_TaxIt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-purple-400 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <WalletMultiButton className="btn-primary" />
          </div>

          <button
            className="md:hidden text-primary focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div
          className={`fixed inset-0 bg-background/95 backdrop-blur-lg md:hidden z-40 transition-all duration-300 ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
          onClick={toggleMenu}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            <Link
              to="/"
              className={`text-xl font-medium hover:text-purple-400 transition-colors ${
                location.pathname === '/' ? 'text-purple-400' : 'text-primary'
              }`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/leaderboard"
              className={`text-xl font-medium hover:text-purple-400 transition-colors ${
                location.pathname === '/leaderboard' ? 'text-purple-400' : 'text-primary'
              }`}
              onClick={closeMenu}
            >
              Leaderboard
            </Link>
            <Link
              to="/about"
              className={`text-xl font-medium hover:text-purple-400 transition-colors ${
                location.pathname === '/about' ? 'text-purple-400' : 'text-primary'
              }`}
              onClick={closeMenu}
            >
              About
            </Link>
            <Link
              to="/create"
              className={`text-xl font-medium hover:text-purple-400 transition-colors ${
                location.pathname === '/create' ? 'text-purple-400' : 'text-primary'
              }`}
              onClick={closeMenu}
            >
              Launch
            </Link>
            <a 
                href="https://x.com/_TaxIt" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-purple-400 transition-colors mb-2"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
            <div className="flex flex-col items-center gap-4 mt-4">
              {!connected && (
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    closeMenu();
                  }}
                  className="btn-outline w-full"
                >
                  Sign In
                </button>
              )}
              
              <WalletMultiButton className="btn-primary w-full" />
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Navbar;