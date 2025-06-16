/*
  # Update token schema
  
  1. Changes
    - Add mint_address column to tokens table
    - Update tax_distribution column constraints
    - Add indexes for better query performance
*/

DO $$ 
BEGIN
  -- Add mint_address column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'tokens' AND column_name = 'mint_address'
  ) THEN
    ALTER TABLE tokens ADD COLUMN mint_address text;
  END IF;

  -- Update tax_distribution column
  ALTER TABLE tokens 
    ALTER COLUMN tax_distribution SET DEFAULT '{"liquidity": 40, "marketing": 30, "development": 30}'::jsonb,
    ALTER COLUMN tax_distribution SET NOT NULL;

  -- Add indexes
  CREATE INDEX IF NOT EXISTS idx_tokens_mint_address ON tokens(mint_address);
  CREATE INDEX IF NOT EXISTS idx_tokens_verified ON tokens(verified);
END $$;