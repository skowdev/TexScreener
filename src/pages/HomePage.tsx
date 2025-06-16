import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import TokenList from '../components/TokenList';
import Features from '../components/Features';
import CTASection from '../components/CTASection';
import TokenCreatorDemo from '../components/TokenCreatorDemo';

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'TAX | Tax Token Launchpad on Solana';
  }, []);

  return (
    <div>
      <Hero />
      <TokenCreatorDemo />
      <TokenList />
      <Features />
      <CTASection />
    </div>
  );
};

export default HomePage;