import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Shield, Rocket, ArrowRight } from 'lucide-react';

const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = 'About TAX | Tax Token Launchpad';
  }, []);

  return (
    <div className="py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-500 p-2 rounded">
              <Zap className="text-black h-6 w-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">About TAX</h1>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <p className="text-lg text-secondary leading-relaxed">
              TAX is the premier tax token launchpad on Solana, designed to empower creators and developers 
              to launch custom tokens with flexible tax mechanisms. Our platform combines powerful features with 
              an intuitive interface, making token creation and management accessible to everyone.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
              <div className="card border border-purple-500/20 p-6">
                <Shield className="h-8 w-8 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Secure Platform</h3>
                <p className="text-secondary">
                  Built with industry-leading security practices and regular audits to protect your assets.
                </p>
              </div>

              <div className="card border border-purple-500/20 p-6">
                <Rocket className="h-8 w-8 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Quick Launch</h3>
                <p className="text-secondary">
                  Deploy your token in minutes with our streamlined creation process and intuitive interface.
                </p>
              </div>

              <div className="card border border-purple-500/20 p-6">
                <Zap className="h-8 w-8 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Custom Rules</h3>
                <p className="text-secondary">
                  Configure flexible tax rules and distribution mechanisms tailored to your token's needs.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Our Mission</h2>
            <p className="text-secondary leading-relaxed">
              We're dedicated to democratizing token creation on Solana by providing powerful tools that are 
              accessible to everyone. Our platform enables creators to focus on building their communities 
              while we handle the technical complexities of token deployment and management.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">Why Choose TAX?</h2>
            <ul className="space-y-4 text-secondary">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                </div>
                <span>Intuitive token creation wizard with step-by-step guidance</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                </div>
                <span>Advanced analytics and tracking tools for token performance</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                </div>
                <span>Flexible tax configuration with automatic distribution</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                </div>
                <span>Comprehensive documentation and support resources</span>
              </li>
            </ul>

            <div className="card border border-purple-500/20 p-8 mt-12">
              <h3 className="text-2xl font-bold mb-4">Ready to Launch Your Token?</h3>
              <p className="text-secondary mb-6">
                Create your custom tax token on Solana in minutes with our intuitive platform.
              </p>
              <Link 
                to="/create" 
                className="btn-primary inline-flex items-center gap-2"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;