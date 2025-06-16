import { Raydium, TxVersion } from '@raydium-io/raydium-sdk-v2';
import { Connection, PublicKey } from '@solana/web3.js';
import Decimal from 'decimal.js';
import BN from 'bn.js';

let raydiumInstance: Raydium | undefined;

const initSdk = async (connection: Connection, wallet: PublicKey) => {
  if (raydiumInstance) return raydiumInstance;

  raydiumInstance = await Raydium.load({
    connection,
    owner: wallet,
    cluster: 'mainnet',
    disableFeatureCheck: true,
    blockhashCommitment: 'finalized'
  });

  return raydiumInstance;
};

export const createPool = async (
  connection: Connection,
  walletAddress: string,
  tokenMint: PublicKey,
  initialPrice: number,
  tokenAmount: number,
  solAmount: number
) => {
  try {
    // Validate numeric inputs
    if (isNaN(initialPrice) || initialPrice <= 0) {
      throw new Error('Invalid initial price');
    }
    if (isNaN(tokenAmount) || tokenAmount <= 0) {
      throw new Error('Invalid token amount');
    }
    if (isNaN(solAmount) || solAmount <= 0) {
      throw new Error('Invalid SOL amount');
    }

    const walletPubkey = new PublicKey(walletAddress);
    
    console.log('Initializing Raydium SDK...');
    const raydium = await initSdk(connection, walletPubkey);

    // Get token information
    console.log('Fetching token information...');
    const tokenInfo = await raydium.token.getTokenInfo(tokenMint);
    const solInfo = await raydium.token.getTokenInfo('So11111111111111111111111111111111111111112'); // SOL mint address

    if (!tokenInfo || !solInfo) {
      throw new Error('Failed to fetch token information');
    }

    console.log('Creating pool with configuration:', {
      token: tokenInfo.symbol,
      initialPrice: initialPrice.toString(),
      tokenAmount: tokenAmount.toString(),
      solAmount: solAmount.toString()
    });

    const { execute } = await raydium.clmm.createPool({
      mint1: tokenInfo,
      mint2: solInfo,
      ammConfig: {
        id: new PublicKey('6VBUBPA2Bev2x7S6LoqkE5YMCAoZ5GgZRvdXhZAzBxks'),
        protocolFeeRate: 0.0025,
        tradeFeeRate: 0.0025,
        tickSpacing: 1,
        fundOwner: walletPubkey,
        description: `${tokenInfo.symbol}/SOL Pool`
      },
      initialPrice: new Decimal(initialPrice),
      startTime: Math.floor(Date.now() / 1000),
      txVersion: TxVersion.V0,
      computeBudgetConfig: {
        units: 600000,
        microLamports: 50000
      }
    });

    console.log('Executing pool creation transaction...');
    const { txId } = await execute({ sendAndConfirm: true });

    console.log('Pool created successfully:', {
      txId,
      explorerUrl: `https://explorer.solana.com/tx/${txId}`
    });

    return {
      success: true,
      signature: txId,
      explorerUrl: `https://explorer.solana.com/tx/${txId}`
    };
  } catch (error) {
    console.error('Error creating Raydium pool:', error);
    throw error;
  }
};