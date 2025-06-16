import { 
  Connection, 
  PublicKey, 
  Keypair, 
  SystemProgram, 
  Transaction,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction
} from '@solana/web3.js';
import {
  createInitializeMintInstruction,
  TOKEN_PROGRAM_ID,
  MINT_SIZE,
  getMinimumBalanceForRentExemptMint,
  getMint,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  createMintToInstruction,
} from '@solana/spl-token';

export const createSplToken = async (
  connection: Connection,
  payer: string,
  decimals: number = 9,
  freezeAuthority: PublicKey | null = null,
): Promise<PublicKey> => {
  try {
    const payerPublicKey = new PublicKey(payer);
    
    // Check wallet balance first
    const balance = await connection.getBalance(payerPublicKey);
    const mintKeypair = Keypair.generate();
    const mintRent = await getMinimumBalanceForRentExemptMint(connection);
    
    // Calculate minimum required balance (rent + gas fees)
    const minimumBalance = mintRent + (0.01 * LAMPORTS_PER_SOL); // 0.01 SOL for gas fees
    
    console.log(`Current balance: ${balance / LAMPORTS_PER_SOL} SOL`);
    console.log(`Required balance: ${minimumBalance / LAMPORTS_PER_SOL} SOL`);
    console.log(`Payer public key: ${payerPublicKey.toBase58()}`);
    console.log(`Mint public key: ${mintKeypair.publicKey.toBase58()}`);
    
    if (balance < minimumBalance) {
      // Instead of throwing error, request airdrop if on devnet or testnet
      const endpoint = connection.rpcEndpoint;
      if (endpoint.includes('devnet') || endpoint.includes('testnet')) {
        try {
          console.log('Requesting airdrop to cover costs...');
          const signature = await connection.requestAirdrop(payerPublicKey, LAMPORTS_PER_SOL);
          await connection.confirmTransaction(signature);
          console.log('Airdrop successful, proceeding with token creation');
        } catch (airdropError) {
          console.warn('Airdrop failed:', airdropError);
          throw new Error(`Insufficient SOL balance. Required: ${minimumBalance / LAMPORTS_PER_SOL} SOL. Please fund your wallet.`);
        }
      } else {
        throw new Error(`Insufficient SOL balance. Required: ${minimumBalance / LAMPORTS_PER_SOL} SOL`);
      }
    }

    const transaction = new Transaction();
    
    // Get recent blockhash and set transaction properties first
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = payerPublicKey;
    
    // Add account creation instruction
    transaction.add(
      SystemProgram.createAccount({
        fromPubkey: payerPublicKey,
        newAccountPubkey: mintKeypair.publicKey,
        space: MINT_SIZE,
        lamports: mintRent,
        programId: TOKEN_PROGRAM_ID,
      })
    );

    // Add mint initialization instruction
    transaction.add(
      createInitializeMintInstruction(
        mintKeypair.publicKey,
        decimals,
        payerPublicKey,
        freezeAuthority,
        TOKEN_PROGRAM_ID
      )
    );

    // Sign and send the transaction - improved handling
    try {
      // First approach: Using wallet adapter
      if (typeof window !== 'undefined' && window.solana && window.solana.signTransaction) {
        // Partially sign with the mint keypair first
        transaction.partialSign(mintKeypair);
        
        // Request wallet signature through the wallet adapter
        const signedTransaction = await window.solana.signTransaction(transaction);

        // Send and confirm transaction
        const signature = await connection.sendRawTransaction(signedTransaction.serialize(), {
          skipPreflight: false,
          preflightCommitment: 'confirmed',
          maxRetries: 5
        });

        // Wait for confirmation
        const confirmation = await connection.confirmTransaction({
          signature,
          blockhash,
          lastValidBlockHeight,
        });

        if (confirmation.value.err) {
          throw new Error(`Transaction failed: ${confirmation.value.err}`);
        }
        
        console.log('Token created:', mintKeypair.publicKey.toString());
        console.log('Transaction signature:', signature);
      } else {
        throw new Error('Wallet adapter not found. Please ensure your wallet is properly connected.');
      }

      return mintKeypair.publicKey;
    } catch (signError) {
      console.error('Signing error:', signError);
      throw new Error(`Transaction signing failed: ${signError.message}`);
    }
  } catch (error) {
    console.error('Error creating SPL token:', error);
    throw error;
  }
};

export const mintTokens = async (
  connection: Connection,
  payer: string,
  mint: PublicKey,
  destination: string,
  amount: number,
  decimals: number = 9,
): Promise<string> => {
  try {
    const payerPublicKey = new PublicKey(payer);
    const destinationPublicKey = new PublicKey(destination);
    
    // Validate destination public key
    if (!destinationPublicKey) {
      throw new Error('Invalid destination public key');
    }
    
    // Validate mint public key
    if (!mint) {
      throw new Error('Invalid mint public key');
    }
    
    console.log(`Payer public key: ${payerPublicKey.toBase58()}`);
    console.log(`Destination public key: ${destinationPublicKey.toBase58()}`);
    console.log(`Mint public key: ${mint.toBase58()}`);
    
    // Check wallet balance first
    const balance = await connection.getBalance(payerPublicKey);
    const minimumBalance = 0.01 * LAMPORTS_PER_SOL; // 0.01 SOL for gas fees
    
    console.log(`Current balance: ${balance / LAMPORTS_PER_SOL} SOL`);
    console.log(`Required balance: ${minimumBalance / LAMPORTS_PER_SOL} SOL`);
    
    if (balance < minimumBalance) {
      // Instead of throwing error, request airdrop if on devnet or testnet
      const endpoint = connection.rpcEndpoint;
      if (endpoint.includes('devnet') || endpoint.includes('testnet')) {
        try {
          console.log('Requesting airdrop to cover costs...');
          const signature = await connection.requestAirdrop(payerPublicKey, LAMPORTS_PER_SOL);
          await connection.confirmTransaction(signature);
          console.log('Airdrop successful, proceeding with token minting');
        } catch (airdropError) {
          console.warn('Airdrop failed:', airdropError);
          throw new Error(`Insufficient SOL balance. Required: ${minimumBalance / LAMPORTS_PER_SOL} SOL. Please fund your wallet.`);
        }
      } else {
        throw new Error(`Insufficient SOL balance. Required: ${minimumBalance / LAMPORTS_PER_SOL} SOL`);
      }
    }

    try {
      const mintInfo = await getMint(connection, mint);
      
      if (!mintInfo.mintAuthority) {
        throw new Error('Mint has no authority');
      }
      
      // Ensure mint authority matches the payer
      if (mintInfo.mintAuthority.toBase58() !== payerPublicKey.toBase58()) {
        console.warn('Warning: Mint authority does not match payer. This may cause the transaction to fail.');
      }
    } catch (error) {
      console.error('Error getting mint info:', error);
      throw new Error(`Failed to get mint information: ${error.message}`);
    }

    let associatedTokenAccount;
    try {
      associatedTokenAccount = await getAssociatedTokenAddress(
        mint,
        destinationPublicKey
      );
      console.log(`Associated token account: ${associatedTokenAccount.toBase58()}`);
    } catch (error) {
      console.error('Error getting associated token address:', error);
      throw new Error(`Failed to get associated token address: ${error.message}`);
    }

    const transaction = new Transaction();

    // Get recent blockhash and set transaction properties first
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = payerPublicKey;

    // Check if token account exists
    let tokenAccount;
    try {
      tokenAccount = await connection.getAccountInfo(associatedTokenAccount);
    } catch (error) {
      console.error('Error checking token account:', error);
    }
    
    if (!tokenAccount) {
      console.log('Token account does not exist, creating...');
      transaction.add(
        createAssociatedTokenAccountInstruction(
          payerPublicKey,
          associatedTokenAccount,
          destinationPublicKey,
          mint
        )
      );
    }

    // Add mint instruction
    const mintAmount = BigInt(Math.floor(amount * Math.pow(10, decimals)));
    console.log(`Minting ${amount} tokens (${mintAmount} with decimals)`);
    
    transaction.add(
      createMintToInstruction(
        mint,
        associatedTokenAccount,
        payerPublicKey,
        mintAmount
      )
    );

    // Sign and send transaction - improved handling
    try {
      // Using wallet adapter
      if (typeof window !== 'undefined' && window.solana && window.solana.signTransaction) {
        // Request wallet signature
        const signedTransaction = await window.solana.signTransaction(transaction);
        
        // Send and confirm transaction
        const signature = await connection.sendRawTransaction(signedTransaction.serialize(), {
          skipPreflight: false,
          preflightCommitment: 'confirmed',
          maxRetries: 5
        });

        // Wait for confirmation
        const confirmation = await connection.confirmTransaction({
          signature,
          blockhash,
          lastValidBlockHeight,
        });

        if (confirmation.value.err) {
          throw new Error(`Transaction failed: ${confirmation.value.err}`);
        }
        
        console.log('Tokens minted:', amount);
        console.log('Transaction signature:', signature);
        
        return signature;
      } else {
        throw new Error('Wallet adapter not found. Please ensure your wallet is properly connected.');
      }
    } catch (signError) {
      console.error('Signing error:', signError);
      throw new Error(`Transaction signing failed: ${signError.message}`);
    }
  } catch (error) {
    console.error('Error minting tokens:', error);
    throw error;
  }
};