import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Zap, ArrowRight, Coins, Shield, Rocket, Check } from 'lucide-react';
import TokenLaunchForm from '../components/TokenLaunchForm';

const CreateTokenPage: React.FC = () => {
  const { connected } = useWallet();
  const [showDemo, setShowDemo] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    document.title = 'Launch Token | TAX';
  }, []);

  const demoSteps = [
    {
      title: "Configure Token",
      description: "Set your token's name, symbol, and supply. Add a custom icon and description to make it stand out.",
      fields: [
        { label: "Token Name", example: "Solana Gold" },
        { label: "Symbol", example: "SGLD" },
        { label: "Total Supply", example: "1,000,000,000" },
      ]
    },
    {
      title: "Set Tax Rules",
      description: "Define buy and sell taxes, and how they should be distributed between liquidity, marketing, and development.",
      fields: [
        { label: "Buy Tax", example: "5%" },
        { label: "Sell Tax", example: "7%" },
        { label: "Distribution", example: "40% Liquidity, 30% Marketing, 30% Development" },
      ]
    },
    {
      title: "Launch Settings",
      description: "Configure your token's launch parameters including initial liquidity and starting price.",
      fields: [
        { label: "Initial Liquidity", example: "10 SOL" },
        { label: "Starting Price", example: "0.0001 SOL" },
        { label: "Launch Date", example: "Instant or Scheduled" },
      ]
    }
  ];

  return (
    <div className="py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-500 p-2 rounded">
              <Zap className="text-black h-6 w-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Launch Your Token</h1>
          </div>

          {showDemo ? (
            <div className="space-y-8">
              <div className="card border border-purple-500/20 p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Create Your Token</h2>
                    <p className="text-secondary mb-6">
                      Launch your own tax token on Solana in minutes. No coding required.
                      Try our simulator below to see how it works.
                    </p>
                    <div className="space-y-4">
                      {demoSteps.map((step, index) => (
                        <div 
                          key={index}
                          className={`p-4 rounded-lg transition-all duration-300 ${
                            currentStep === index + 1 
                              ? 'bg-purple-500/10 border border-purple-500/30' 
                              : 'bg-card-hover border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              currentStep > index + 1 
                                ? 'bg-green-500' 
                                : currentStep === index + 1 
                                ? 'bg-purple-500' 
                                : 'bg-card'
                            }`}>
                              {currentStep > index + 1 ? (
                                <Check className="h-4 w-4 text-black" />
                              ) : (
                                <span className="text-sm">{index + 1}</span>
                              )}
                            </div>
                            <h3 className="font-medium">{step.title}</h3>
                          </div>
                          <p className="text-secondary text-sm mb-3">{step.description}</p>
                          {currentStep === index + 1 && (
                            <div className="space-y-3">
                              {step.fields.map((field, fieldIndex) => (
                                <div key={fieldIndex}>
                                  <label className="block text-sm font-medium mb-1">{field.label}</label>
                                  <input
                                    type="text"
                                    placeholder={field.example}
                                    className="w-full px-4 py-2 bg-card border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500/50"
                                  />
                                </div>
                              ))}
                              <div className="flex justify-between pt-4">
                                {index > 0 && (
                                  <button 
                                    onClick={() => setCurrentStep(curr => curr - 1)}
                                    className="btn-outline"
                                  >
                                    Back
                                  </button>
                                )}
                                <button 
                                  onClick={() => {
                                    if (index < demoSteps.length - 1) {
                                      setCurrentStep(curr => curr + 1);
                                    } else {
                                      setShowDemo(false);
                                    }
                                  }}
                                  className="btn-primary ml-auto"
                                >
                                  {index === demoSteps.length - 1 ? 'Launch Token' : 'Continue'}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="card bg-card-hover p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Shield className="h-5 w-5 text-purple-400" />
                        <h3 className="font-medium">Why Choose TAX?</h3>
                      </div>
                      <ul className="space-y-3 text-secondary">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                          <span>No coding required</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                          <span>Launch in minutes</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                          <span>Customizable tax rules</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                          <span>Automatic liquidity management</span>
                        </li>
                      </ul>
                    </div>

                    <div className="card bg-card-hover p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Rocket className="h-5 w-5 text-purple-400" />
                        <h3 className="font-medium">Launch Requirements</h3>
                      </div>
                      <ul className="space-y-3 text-secondary">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                          <span>Solana wallet with SOL</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                          <span>Token name & symbol</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                          <span>Initial liquidity (min 1 SOL)</span>
                        </li>
                      </ul>
                    </div>

                    <div className="card bg-card-hover p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Coins className="h-5 w-5 text-purple-400" />
                        <h3 className="font-medium">Estimated Costs</h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-secondary">Token Creation</span>
                          <span>0.5 SOL</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary">Initial Liquidity</span>
                          <span>1-100 SOL</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary">Transaction Fees</span>
                          <span>~0.1 SOL</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => setShowDemo(false)}
                  className="btn-primary"
                >
                  <span>Ready to Launch?</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="card border border-purple-500/20 p-6 md:p-8">
              {!connected ? (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold mb-4">Connect Wallet to Launch</h2>
                  <p className="text-secondary mb-8">
                    Connect your wallet to create and deploy your token
                  </p>
                  <WalletMultiButton className="btn-primary" />
                  <button
                    onClick={() => setShowDemo(true)}
                    className="btn-outline mt-4 w-full"
                  >
                    Back to Simulator
                  </button>
                </div>
              ) : (
                <TokenLaunchForm />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTokenPage;