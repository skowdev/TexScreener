/*
  # Initial schema setup for Passive platform

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `username` (text, unique)
      - `full_name` (text)
      - `avatar_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `tokens`
      - `id` (uuid, primary key)
      - `creator_id` (uuid, references profiles)
      - `name` (text)
      - `symbol` (text)
      - `description` (text)
      - `total_supply` (numeric)
      - `buy_tax` (numeric)
      - `sell_tax` (numeric)
      - `verified` (boolean)
      - `launch_date` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `token_stats`
      - `id` (uuid, primary key)
      - `token_id` (uuid, references tokens)
      - `price` (numeric)
      - `market_cap` (numeric)
      - `volume_24h` (numeric)
      - `holders_count` (integer)
      - `updated_at` (timestamp)

    - `token_transactions`
      - `id` (uuid, primary key)
      - `token_id` (uuid, references tokens)
      - `from_address` (text)
      - `to_address` (text)
      - `amount` (numeric)
      - `type` (text)
      - `created_at` (timestamp)
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users,
  username text UNIQUE,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tokens table
CREATE TABLE tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid REFERENCES profiles(id),
  name text NOT NULL,
  symbol text NOT NULL,
  description text,
  total_supply numeric NOT NULL,
  buy_tax numeric NOT NULL,
  sell_tax numeric NOT NULL,
  verified boolean DEFAULT false,
  launch_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create token_stats table
CREATE TABLE token_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token_id uuid REFERENCES tokens(id) ON DELETE CASCADE,
  price numeric NOT NULL DEFAULT 0,
  market_cap numeric NOT NULL DEFAULT 0,
  volume_24h numeric NOT NULL DEFAULT 0,
  holders_count integer NOT NULL DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

-- Create token_transactions table
CREATE TABLE token_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token_id uuid REFERENCES tokens(id) ON DELETE CASCADE,
  from_address text NOT NULL,
  to_address text NOT NULL,
  amount numeric NOT NULL,
  type text NOT NULL CHECK (type IN ('buy', 'sell', 'transfer')),
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX idx_tokens_creator_id ON tokens(creator_id);
CREATE INDEX idx_token_stats_token_id ON token_stats(token_id);
CREATE INDEX idx_token_transactions_token_id ON token_transactions(token_id);
CREATE INDEX idx_token_transactions_created_at ON token_transactions(created_at);