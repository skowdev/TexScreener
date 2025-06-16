/*
  # Fix profile references and constraints

  1. Changes
    - Drop the foreign key constraint on profiles.id
    - Modify profiles.id to be text to match Solana addresses
    - Update tokens.creator_id to be text
    - Re-add foreign key constraint
    
  2. Security
    - Maintains referential integrity with new column types
*/

-- Drop existing foreign key constraints
ALTER TABLE tokens DROP CONSTRAINT IF EXISTS tokens_creator_id_fkey;
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Modify profiles table
ALTER TABLE profiles 
  ALTER COLUMN id TYPE text,
  DROP CONSTRAINT IF EXISTS profiles_pkey,
  ADD PRIMARY KEY (id);

-- Modify tokens table
ALTER TABLE tokens
  ALTER COLUMN creator_id TYPE text;

-- Re-add foreign key constraint
ALTER TABLE tokens
  ADD CONSTRAINT tokens_creator_id_fkey 
  FOREIGN KEY (creator_id) 
  REFERENCES profiles(id);