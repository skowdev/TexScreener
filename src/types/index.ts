export interface Token {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  price: number;
  marketCap: number;
  volume24h: number;
  change24h: number;
  buyTax: number;
  sellTax: number;
  createdAt: string;
  launchDate: string;
  verified: boolean;
  creator: string;
  totalSupply: string;
  description: string;
  taxDistribution: TaxDistribution;
}

export interface TaxDistribution {
  liquidity: number;
  marketing: number;
  development: number;
}

export interface TokenFormData {
  name: string;
  symbol: string;
  description: string;
  totalSupply: string;
  buyTax: number;
  sellTax: number;
  taxDistribution: TaxDistribution;
  initialLiquidity: number;
  startPrice: number;
  tickSpacing: number;
}

export interface LeaderboardEntry {
  id: string;
  tokenId: string;
  tokenName: string;
  tokenSymbol: string;
  tokenIcon: string;
  metric: 'volume' | 'price' | 'holders';
  value: number;
  rank: number;
  change24h: number;
}