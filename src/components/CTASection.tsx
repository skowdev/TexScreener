import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="card border border-purple-500/20 p-8 md:p-12 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="md:flex-1">
                <div className="bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Zap className="text-purple-400 h-8 w-8" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to launch your own token on Solana?
                </h2>
                <p className="text-secondary text-lg mb-6">
                  Create a custom tax token in minutes with our intuitive platform.
                  No coding required — just connect your wallet and start building.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/create" 
                    className="btn-primary group"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link 
                    to="/" 
                    className="btn-outline"
                  >
                    <span>Learn More</span>
                  </Link>
                </div>
              </div>
              
              <div className="hidden md:block md:flex-1">
                <div className="relative">
                  {/* Abstract token visualization */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-purple-500/20 animate-pulse-glow"></div>
                  <div className="absolute top-1/4 right-1/4 w-12 h-12 rounded-full bg-cyan-500/20 animate-float"></div>
                  <div className="absolute bottom-0 left-1/4 w-16 h-16 rounded-full bg-green-500/20 animate-pulse"></div>
                  
                  <div className="rounded-xl bg-card-hover border border-purple-500/30 p-6 h-full">
                    <div className="flex flex-col h-full">
                      <div className="mb-4">
                        <div className="text-xl font-semibold mb-2">Launch Summary</div>
                        <div className="h-1 w-24 bg-purple-500/40 rounded-full"></div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-secondary">Token Name</span>
                          <span className="font-medium">Tax IT</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-secondary">Buy Tax</span>
                          <span className="font-medium">5%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-secondary">Sell Tax</span>
                          <span className="font-medium">7%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-secondary">Initial Supply</span>
                          <span className="font-medium">1,000,000,000</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-secondary">Launch Date</span>
                          <span className="font-medium">Mar 15, 2025</span>
                        </div>
                      </div>
                      
                      <div className="mt-auto pt-4">
                        <div className="h-10 w-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded flex items-center justify-center text-black font-medium">
                          Deploy Token
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;