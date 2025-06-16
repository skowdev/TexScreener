import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wallet, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [previewToken, setPreviewToken] = useState({
    name: 'TAX',
    buyTax: 5,
    sellTax: 7,
    supply: '1,000,000,000',
    launchDate: 'Mar 15, 2025'
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 z-0">
        {/* Main gradient orb */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle at center, rgba(157, 78, 221, 0.3), transparent 70%)',
            filter: 'blur(80px)',
            animation: 'pulse-slow 4s ease-in-out infinite'
          }}
        />
        
        {/* Secondary orbs */}
        <div 
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle at center, rgba(0, 255, 255, 0.3), transparent 70%)',
            filter: 'blur(60px)',
            animation: 'float 8s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle at center, rgba(157, 78, 221, 0.3), transparent 70%)',
            filter: 'blur(60px)',
            animation: 'float 6s ease-in-out infinite reverse'
          }}
        />

        {/* Animated grid pattern */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(157, 78, 221, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(157, 78, 221, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            mask: 'radial-gradient(circle at center, black, transparent)',
            animation: 'float 20s linear infinite'
          }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-purple-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `scale(${Math.random() * 2 + 0.5})`,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite ${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <div 
              className={`transition-all duration-1000 ease-out transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
                Launch Your <span className="glow-text">Tax Token</span> on Solana <br />
                with Maximum Control
              </h1>
              <p className="text-lg md:text-xl text-secondary mb-8 leading-relaxed">
                The premier launchpad for custom tax token creation, deployment, and management
                on the Solana blockchain. Setup in minutes with no coding required.
              </p>
            </div>
            
            <div 
              className={`flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 transition-all duration-1000 ease-out delay-200 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <Link 
                to="/create" 
                className="btn-primary group w-full sm:w-auto px-6 py-3 text-base"
              >
                <span>Launch Your Token</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button className="btn-outline w-full sm:w-auto px-6 py-3 text-base">
                <Wallet className="h-4 w-4" />
                <span>Connect Wallet</span>
              </button>
            </div>
          </div>

          <div 
            className={`lg:w-1/2 transition-all duration-1000 ease-out delay-400 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="relative">
              {/* Token preview card */}
              <div className="card border border-purple-500/20 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/40 to-cyan-500/40 flex items-center justify-center">
                    <Zap className="text-white h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{previewToken.name}</h3>
                    <p className="text-secondary">Token Preview</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-card-hover border border-purple-500/10">
                      <p className="text-sm text-secondary mb-1">Buy Tax</p>
                      <p className="text-xl font-semibold">{previewToken.buyTax}%</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card-hover border border-purple-500/10">
                      <p className="text-sm text-secondary mb-1">Sell Tax</p>
                      <p className="text-xl font-semibold">{previewToken.sellTax}%</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-secondary">Total Supply</span>
                      <span className="font-medium">{previewToken.supply}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-secondary">Launch Date</span>
                      <span className="font-medium">{previewToken.launchDate}</span>
                    </div>
                  </div>

                  <div className="h-10 w-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded flex items-center justify-center text-black font-medium">
                    Deploy Token
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-purple-500/20 animate-pulse-slow"></div>
                <div className="absolute top-1/4 right-1/4 w-12 h-12 rounded-full bg-cyan-500/20 animate-float"></div>
                <div className="absolute bottom-0 left-1/4 w-16 h-16 rounded-full bg-purple-500/20 animate-pulse-slow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;