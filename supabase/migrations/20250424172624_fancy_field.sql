/*
  # Add icon URL to tokens table

  1. Changes
    - Add `icon_url` column to `tokens` table to store token icon URLs
    
  2. Notes
    - Column is nullable since not all tokens may have icons
    - Uses text type to accommodate various URL lengths
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'tokens' AND column_name = 'icon_url'
  ) THEN
    ALTER TABLE tokens ADD COLUMN icon_url text;
  END IF;
END $$;