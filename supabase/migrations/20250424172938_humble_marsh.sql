/*
  # Add tax distribution column to tokens table

  1. Changes
    - Add `tax_distribution` JSONB column to store tax distribution settings
    - Column is NOT NULL with a default empty object
    
  2. Notes
    - Uses JSONB for flexible tax distribution configuration
    - Default empty object prevents NULL values
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'tokens' AND column_name = 'tax_distribution'
  ) THEN
    ALTER TABLE tokens ADD COLUMN tax_distribution JSONB NOT NULL DEFAULT '{}'::jsonb;
  END IF;
END $$;