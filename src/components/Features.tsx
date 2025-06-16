import React from 'react';
import { Gauge, ShieldCheck, Zap, ArrowUpRight, Rocket, Wallet, BadgeCheck, Layers } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: 'Custom Tax Rules',
      description: 'Full control over buy and sell taxes with options to allocate tax distribution to development, liquidity, or marketing wallets.',
    },
    {
      icon: <Gauge className="h-6 w-6" />,
      title: 'Instant Deployment',
      description: 'Launch your token on Solana in minutes with our streamlined wizard and pre-built templates for quick deployment.',
    },
    {
      icon: <Wallet className="h-6 w-6" />,
      title: 'Automatic Liquidity',
      description: 'Set a portion of transaction taxes to automatically add to your token\'s liquidity pool, increasing stability.',
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: 'Advanced Analytics',
      description: 'Track your token\'s performance with real-time charts, holder metrics, and detailed transaction analysis.',
    },
    {
      icon: <BadgeCheck className="h-6 w-6" />,
      title: 'Token Verification',
      description: 'Get your token verified on our platform to increase visibility and trust among potential investors.',
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: 'Multi-Wallet Support',
      description: 'Connect multiple wallets for team management with customizable permissions and roles.',
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Launch Your Tax Token with <span className="glow-text">Powerful Features</span>
          </h2>
          <p className="text-secondary text-lg">
            Everything you need to create, launch, and manage your Solana tax token in one platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card card-hover group p-6 flex flex-col"
            >
              <div className="mb-4 text-purple-400">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-secondary">{feature.description}</p>
              <div className="mt-4 flex items-center gap-1 text-sm text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Learn more</span>
                <ArrowUpRight className="h-3 w-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;