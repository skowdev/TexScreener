import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Rocket } from 'lucide-react';

const TokenCreatorDemo: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    supply: '1000000000',
    buyTax: '5',
    sellTax: '7',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-cyan-500/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Try Our <span className="glow-text">Token Creator</span>
            </h2>
            <p className="text-secondary text-lg">
              Experience how easy it is to create your own token. No wallet connection required.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Token Creator Form */}
            <div className="card border border-purple-500/20 p-6">
              {/* Progress bar */}
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex-1 flex items-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step === currentStep
                          ? 'bg-purple-500 text-black'
                          : step < currentStep
                          ? 'bg-green-500 text-black'
                          : 'bg-card-hover text-secondary'
                      }`}
                    >
                      {step}
                    </div>
                    {step < 3 && (
                      <div 
                        className={`flex-1 h-0.5 mx-2 ${
                          step < currentStep ? 'bg-green-500' : 'bg-card-hover'
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Step content */}
              <div className="mb-8">
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold mb-4">Basic Information</h3>
                    <div>
                      <label className="block text-sm font-medium mb-1">Token Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Solana Gold"
                        className="w-full px-4 py-2 bg-card border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Token Symbol</label>
                      <input
                        type="text"
                        name="symbol"
                        value={formData.symbol}
                        onChange={handleInputChange}
                        placeholder="e.g., SGLD"
                        className="w-full px-4 py-2 bg-card border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Total Supply</label>
                      <input
                        type="text"
                        name="supply"
                        value={formData.supply}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-card border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500/50"
                      />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold mb-4">Tax Configuration</h3>
                    <div>
                      <label className="block text-sm font-medium mb-1">Buy Tax (%)</label>
                      <input
                        type="number"
                        name="buyTax"
                        value={formData.buyTax}
                        onChange={handleInputChange}
                        min="0"
                        max="25"
                        className="w-full px-4 py-2 bg-card border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Sell Tax (%)</label>
                      <input
                        type="number"
                        name="sellTax"
                        value={formData.sellTax}
                        onChange={handleInputChange}
                        min="0"
                        max="25"
                        className="w-full px-4 py-2 bg-card border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500/50"
                      />
                    </div>
                    <div className="p-4 bg-card-hover rounded-lg">
                      <h4 className="font-medium mb-3">Tax Distribution</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-secondary mb-1">Liquidity (40%)</label>
                          <div className="h-2 bg-background rounded-full overflow-hidden">
                            <div className="h-full w-[40%] bg-gradient-to-r from-purple-500 to-cyan-500"></div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm text-secondary mb-1">Marketing (30%)</label>
                          <div className="h-2 bg-background rounded-full overflow-hidden">
                            <div className="h-full w-[30%] bg-gradient-to-r from-purple-500 to-cyan-500"></div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm text-secondary mb-1">Development (30%)</label>
                          <div className="h-2 bg-background rounded-full overflow-hidden">
                            <div className="h-full w-[30%] bg-gradient-to-r from-purple-500 to-cyan-500"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold mb-4">Review & Launch</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-card-hover">
                        <p className="text-sm text-secondary mb-1">Token Name</p>
                        <p className="font-medium">{formData.name || 'Not set'}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-card-hover">
                        <p className="text-sm text-secondary mb-1">Symbol</p>
                        <p className="font-medium">{formData.symbol || 'Not set'}</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-card-hover">
                      <p className="text-sm text-secondary mb-1">Total Supply</p>
                      <p className="font-medium">{formData.supply}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-card-hover">
                        <p className="text-sm text-secondary mb-1">Buy Tax</p>
                        <p className="font-medium">{formData.buyTax}%</p>
                      </div>
                      <div className="p-4 rounded-lg bg-card-hover">
                        <p className="text-sm text-secondary mb-1">Sell Tax</p>
                        <p className="font-medium">{formData.sellTax}%</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between">
                {currentStep > 1 && (
                  <button onClick={prevStep} className="btn-outline">
                    Back
                  </button>
                )}
                {currentStep < totalSteps ? (
                  <button onClick={nextStep} className="btn-primary ml-auto">
                    Continue
                  </button>
                ) : (
                  <Link to="/create" className="btn-primary ml-auto">
                    <Zap className="h-4 w-4" />
                    <span>Launch Token</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Features & Benefits */}
            <div className="space-y-6">
              <div className="card border border-purple-500/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-5 w-5 text-purple-400" />
                  <h3 className="font-medium">Why Choose TAX?</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                    </div>
                    <div>
                      <p className="font-medium mb-1">No Coding Required</p>
                      <p className="text-sm text-secondary">Launch your token with our intuitive interface. No technical knowledge needed.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Instant Deployment</p>
                      <p className="text-sm text-secondary">Your token will be live on Solana in minutes, not hours or days.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Flexible Tax Rules</p>
                      <p className="text-sm text-secondary">Customize buy and sell taxes with automatic distribution to designated wallets.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="card border border-purple-500/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Rocket className="h-5 w-5 text-purple-400" />
                  <h3 className="font-medium">Launch Requirements</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-secondary">Initial Liquidity</span>
                    <span className="font-medium">Min. 1 SOL</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-secondary">Creation Fee</span>
                    <span className="font-medium">0.5 SOL</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-secondary">Transaction Fee</span>
                    <span className="font-medium">~0.1 SOL</span>
                  </div>
                </div>
              </div>

              <Link 
                to="/create" 
                className="btn-primary w-full justify-center"
              >
                <span>Ready to Launch?</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenCreatorDemo;