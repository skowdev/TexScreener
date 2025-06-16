import React, { useState, useRef } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Upload, Info, AlertTriangle, Twitter, Globe } from 'lucide-react';
import { createSplToken, mintTokens } from '../lib/token';
import { uploadToPinata } from '../lib/pinata';
import { useTokenStore } from '../stores/tokenStore';
import { createPool } from '../lib/raydium';

interface TaxDistribution {
  liquidity: number;
  marketing: number;
  development: number;
}

interface SocialLinks {
  website: string;
  twitter: string;
  telegram: string;
  discord: string;
}

const steps = [
  { id: 'basics', title: 'Basic Info' },
  { id: 'tokenomics', title: 'Tokenomics' },
  { id: 'liquidity', title: 'Liquidity' },
  { id: 'socials', title: 'Socials' },
  { id: 'review', title: 'Review' },
];

const TokenLaunchForm: React.FC = () => {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const navigate = useNavigate();
  const { createToken } = useTokenStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    description: '',
    totalSupply: '1000000000',
    buyTax: 5,
    sellTax: 7,
    initialLiquidity: 1,
    startPrice: 0.0001,
    tickSpacing: 1,
  });

  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    website: '',
    twitter: '',
    telegram: '',
    discord: '',
  });

  const [taxDistribution, setTaxDistribution] = useState<TaxDistribution>({
    liquidity: 40,
    marketing: 30,
    development: 30
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialLinks(prev => ({ ...prev, [name]: value }));
  };

  const handleTaxDistributionChange = (type: keyof TaxDistribution, value: number) => {
    setTaxDistribution(prev => {
      const newDist = { ...prev, [type]: value };
      const total = Object.values(newDist).reduce((sum, val) => sum + val, 0);
      
      if (total > 100) {
        const others = Object.entries(newDist).filter(([key]) => key !== type);
        const remaining = 100 - value;
        others.forEach(([key], index) => {
          if (index === others.length - 1) {
            newDist[key as keyof TaxDistribution] = remaining - others
              .slice(0, -1)
              .reduce((sum, [k]) => sum + newDist[k as keyof TaxDistribution], 0);
          } else {
            newDist[key as keyof TaxDistribution] = Math.floor(remaining / others.length);
          }
        });
      }
      
      return newDist;
    });
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep !== steps.length - 1) {
      nextStep();
      return;
    }
    
    if (!connected || !publicKey) {
      setError('Please connect your wallet first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 1. Create the SPL token
      console.log('Creating SPL token...');
      const tokenMint = await createSplToken(
        connection,
        publicKey.toBase58(), // Convert PublicKey to string
        9, // decimals
        null // freeze authority
      );

      // 2. Mint initial supply to creator
      console.log('Minting initial supply...');
      await mintTokens(
        connection,
        publicKey.toBase58(), // Convert PublicKey to string
        tokenMint,
        publicKey.toBase58(), // Convert PublicKey to string
        parseFloat(formData.totalSupply)
      );

      // 3. Create Raydium pool
      console.log('Creating Raydium pool...');
      await createPool(
        connection,
        publicKey.toBase58(), // Convert PublicKey to string
        tokenMint,
        formData.startPrice,
        parseFloat(formData.totalSupply) * 0.1, // Use 10% of total supply for initial liquidity
        formData.initialLiquidity
      );

      // 4. Upload icon if provided
      let iconUrl = '';
      if (selectedFile) {
        console.log('Uploading token icon...');
        iconUrl = await uploadToPinata(selectedFile);
      }

      // 5. Save token data to database
      console.log('Saving token data...');
      const tokenData = {
        creator_id: publicKey.toBase58(), // Convert PublicKey to string
        name: formData.name,
        symbol: formData.symbol,
        description: formData.description,
        total_supply: formData.totalSupply,
        buy_tax: formData.buyTax,
        sell_tax: formData.sellTax,
        tax_distribution: taxDistribution,
        social_links: socialLinks,
        icon_url: iconUrl,
        mint_address: tokenMint.toString(),
      };

      const createdToken = await createToken(tokenData);
      
      if (createdToken) {
        navigate(`/token/${createdToken.id}`);
      }
    } catch (err: any) {
      console.error('Error launching token:', err);
      setError(err.message || 'Failed to launch token');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Basic Info
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Token Icon</label>
                <div 
                  className="border-2 border-dashed border-purple-500/20 rounded-lg p-4 text-center cursor-pointer hover:border-purple-500/40 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {previewUrl ? (
                    <img 
                      src={previewUrl} 
                      alt="Token icon preview" 
                      className="w-32 h-32 mx-auto rounded-full"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="h-12 w-12 text-purple-400 mb-2" />
                      <p className="text-secondary">Click to upload token icon</p>
                      <p className="text-xs text-secondary mt-1">PNG, JPG up to 2MB</p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Token Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-card border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500/50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Token Symbol</label>
                  <input
                    type="text"
                    name="symbol"
                    value={formData.symbol}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-card border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500/50"
                    required
                    maxLength={5}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-card border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500/50 resize-none"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 1: // Tokenomics
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Total Supply</label>
              <input
                type="number"
                name="totalSupply"
                value={formData.totalSupply}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-card border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500/50"
                required
                min="1000000"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Buy Tax (%)</label>
                <input
                  type="number"
                  name="buyTax"
                  value={formData.buyTax}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-card border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500/50"
                  required
                  min="0"
                  max="25"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Sell Tax (%)</label>
                <input
                  type="number"
                  name="sellTax"
                  value={formData.sellTax}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-card border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500/50"
                  required
                  min="0"
                  max="25"
                />
              </div>
            </div>

            <div className="p-4 bg-card-hover rounded-lg">
              <h3 className="font-medium mb-3">Tax Distribution</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-secondary mb-1">
                    Liquidity ({taxDistribution.liquidity}%)
                  </label>
                  <input
                    type="range"
                    value={taxDistribution.liquidity}
                    onChange={(e) => handleTaxDistributionChange('liquidity', parseInt(e.target.value))}
                    className="w-full h-2 bg-background rounded-full appearance-none cursor-pointer"
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-sm text-secondary mb-1">
                    Marketing ({taxDistribution.marketing}%)
                  </label>
                  <input
                    type="range"
                    value={taxDistribution.marketing}
                    onChange={(e) => handleTaxDistributionChange('marketing', parseInt(e.target.value))}
                    className="w-full h-2 bg-background rounded-full appearance-none cursor-pointer"
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-sm text-secondary mb-1">
                    Development ({taxDistribution.development}%)
                  </label>
                  <input
                    type="range"
                    value={taxDistribution.development}
                    onChange={(e) => handleTaxDistributionChange('development', parseInt(e.target.value))}
                    className="w-full h-2 bg-background rounded-full appearance-none cursor-pointer"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2: // Liquidity
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Initial Liquidity (SOL)</label>
                <input
                  type="number"
                  name="initialLiquidity"
                  value={formData.initialLiquidity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-card border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500/50"
                  required
                  min="1"
                  step="0.1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Start Price (SOL)</label>
                <input
                  type="number"
                  name="startPrice"
                  value={formData.startPrice}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-card border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500/50"
                  required
                  min="0.0000001"
                  step="0.0000001"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tick Spacing</label>
              <input
                type="number"
                name="tickSpacing"
                value={formData.tickSpacing}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-card border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500/50"
                required
                min="1"
              />
            </div>

            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="text-amber-500 h-5 w-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  Make sure you have enough SOL in your wallet for initial liquidity and transaction fees.
                  A minimum of {(parseFloat(formData.initialLiquidity) + 0.1).toFixed(2)} SOL is required.
                </p>
              </div>
            </div>
          </div>
        );
      
      case 3: // Social Links (New Step)
        return (
          <div className="space-y-6">
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg mb-6">
              <div className="flex items-start gap-3">
                <Info className="text-blue-500 h-5 w-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  Social links are optional but recommended to help build your community.
                  You can add them now or update them later from your token dashboard.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-secondary mr-2" />
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Website URL</label>
                  <input
                    type="url"
                    name="website"
                    value={socialLinks.website}
                    onChange={handleSocialLinkChange}
                    placeholder="https://your-website.com"
                    className="w-full px-4 py-2 bg-card border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500/50"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <Twitter className="h-5 w-5 text-secondary mr-2" />
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Twitter URL</label>
                  <input
                    type="url"
                    name="twitter"
                    value={socialLinks.twitter}
                    onChange={handleSocialLinkChange}
                    placeholder="https://twitter.com/your_handle"
                    className="w-full px-4 py-2 bg-card border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500/50"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4: // Review (updated with social links)
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="card bg-card-hover p-4">
                  <h3 className="font-medium mb-3">Basic Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-secondary">Name</span>
                      <span>{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Symbol</span>
                      <span>{formData.symbol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Total Supply</span>
                      <span>{formData.totalSupply}</span>
                    </div>
                  </div>
                </div>

                <div className="card bg-card-hover p-4">
                  <h3 className="font-medium mb-3">Tax Configuration</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-secondary">Buy Tax</span>
                      <span>{formData.buyTax}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Sell Tax</span>
                      <span>{formData.sellTax}%</span>
                    </div>
                  </div>
                </div>
                
                {/* Social links overview */}
                {(socialLinks.website || socialLinks.twitter || socialLinks.telegram || socialLinks.discord) && (
                  <div className="card bg-card-hover p-4">
                    <h3 className="font-medium mb-3">Social Links</h3>
                    <div className="space-y-2">
                      {socialLinks.website && (
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-secondary" />
                          <span className="text-secondary truncate">{socialLinks.website}</span>
                        </div>
                      )}
                      {socialLinks.twitter && (
                        <div className="flex items-center gap-2">
                          <Twitter className="h-4 w-4 text-secondary" />
                          <span className="text-secondary truncate">{socialLinks.twitter}</span>
                        </div>
                      )}
                      {socialLinks.telegram && (
                        <div className="flex items-center gap-2">
                          <Telegram className="h-4 w-4 text-secondary" />
                          <span className="text-secondary truncate">{socialLinks.telegram}</span>
                        </div>
                      )}
                      {socialLinks.discord && (
                        <div className="flex items-center gap-2">
                          <Discord className="h-4 w-4 text-secondary" />
                          <span className="text-secondary truncate">{socialLinks.discord}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="card bg-card-hover p-4">
                  <h3 className="font-medium mb-3">Liquidity Settings</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-secondary">Initial Liquidity</span>
                      <span>{formData.initialLiquidity} SOL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Start Price</span>
                      <span>{formData.startPrice} SOL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Tick Spacing</span>
                      <span>{formData.tickSpacing}</span>
                    </div>
                  </div>
                </div>

                {formData.description && (
                  <div className="card bg-card-hover p-4">
                    <h3 className="font-medium mb-3">Description</h3>
                    <p className="text-secondary text-sm">{formData.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Progress bar */}
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= currentStep
                      ? 'bg-purple-500 text-black'
                      : 'bg-card-hover text-secondary'
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-xs mt-2 text-secondary">{step.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-px ${
                    index < currentStep ? 'bg-purple-500' : 'bg-card-hover'
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step content */}
      {renderStepContent()}

      {/* Error message */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-red-500 h-5 w-5 flex-shrink-0 mt-0.5" />
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex items-center justify-between pt-6">
        {currentStep > 0 && (
          <button
            type="button"
            onClick={prevStep}
            className="btn-outline"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>
        )}

        <div className="ml-auto">
          <button
            type="submit"
            className="btn-primary"
            disabled={loading || (currentStep === steps.length - 1 && !connected)}
          >
            {loading ? (
              'Launching...'
            ) : currentStep < steps.length - 1 ? (
              <>
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              <>
                <span>Launch Token</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TokenLaunchForm;