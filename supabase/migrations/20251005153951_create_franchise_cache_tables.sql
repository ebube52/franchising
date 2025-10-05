/*
  # Franchise Data Caching System

  1. New Tables
    - `franchises`
      - `id` (text, primary key) - Unique franchise identifier
      - `name` (text) - Franchise name
      - `brand` (text) - Brand name
      - `industry` (text) - Industry category
      - `investment_min` (decimal) - Minimum investment required
      - `investment_max` (decimal) - Maximum investment required
      - `region` (jsonb) - Array of regions where available
      - `description` (text) - Franchise description
      - `image` (text) - Image URL
      - `business_model` (text) - Business model type
      - `support_provided` (jsonb) - Array of support types
      - `franchise_fee` (decimal) - Initial franchise fee
      - `royalty_fee` (text) - Royalty fee structure
      - `territories` (integer) - Number of territories
      - `established` (integer) - Year established
      - `website` (text) - Website URL
      - `contact_info` (jsonb) - Contact information
      - `requirements` (jsonb) - Franchise requirements
      - `data_source` (text) - Source of data (API, manual, scraper)
      - `raw_data` (jsonb) - Full raw data from source
      - `last_updated` (timestamptz) - Last update timestamp
      - `created_at` (timestamptz) - Creation timestamp
      - `is_active` (boolean) - Whether franchise is currently active

    - `api_cache`
      - `id` (uuid, primary key)
      - `cache_key` (text, unique) - Cache identifier
      - `api_source` (text) - API source name
      - `request_params` (jsonb) - Request parameters used
      - `response_data` (jsonb) - Cached response data
      - `expires_at` (timestamptz) - Expiration timestamp
      - `created_at` (timestamptz) - Creation timestamp

    - `api_logs`
      - `id` (uuid, primary key)
      - `api_source` (text) - API source name
      - `endpoint` (text) - API endpoint called
      - `status_code` (integer) - HTTP status code
      - `request_params` (jsonb) - Request parameters
      - `error_message` (text) - Error message if failed
      - `response_time_ms` (integer) - Response time in milliseconds
      - `created_at` (timestamptz) - Timestamp of request

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access to franchises
    - Add policies for authenticated admin access to manage data
*/

-- Create franchises table
CREATE TABLE IF NOT EXISTS franchises (
  id text PRIMARY KEY,
  name text NOT NULL,
  brand text,
  industry text,
  investment_min decimal,
  investment_max decimal,
  region jsonb DEFAULT '[]'::jsonb,
  description text,
  image text,
  business_model text,
  support_provided jsonb DEFAULT '[]'::jsonb,
  franchise_fee decimal,
  royalty_fee text,
  territories integer,
  established integer,
  website text,
  contact_info jsonb DEFAULT '{}'::jsonb,
  requirements jsonb DEFAULT '{}'::jsonb,
  data_source text DEFAULT 'manual',
  raw_data jsonb DEFAULT '{}'::jsonb,
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

-- Create api_cache table
CREATE TABLE IF NOT EXISTS api_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cache_key text UNIQUE NOT NULL,
  api_source text NOT NULL,
  request_params jsonb DEFAULT '{}'::jsonb,
  response_data jsonb DEFAULT '{}'::jsonb,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create api_logs table
CREATE TABLE IF NOT EXISTS api_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  api_source text NOT NULL,
  endpoint text NOT NULL,
  status_code integer,
  request_params jsonb DEFAULT '{}'::jsonb,
  error_message text,
  response_time_ms integer,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_franchises_industry ON franchises(industry);
CREATE INDEX IF NOT EXISTS idx_franchises_investment ON franchises(investment_min, investment_max);
CREATE INDEX IF NOT EXISTS idx_franchises_region ON franchises USING gin(region);
CREATE INDEX IF NOT EXISTS idx_franchises_updated ON franchises(last_updated);
CREATE INDEX IF NOT EXISTS idx_franchises_active ON franchises(is_active);
CREATE INDEX IF NOT EXISTS idx_franchises_source ON franchises(data_source);

CREATE INDEX IF NOT EXISTS idx_api_cache_key ON api_cache(cache_key);
CREATE INDEX IF NOT EXISTS idx_api_cache_source ON api_cache(api_source);
CREATE INDEX IF NOT EXISTS idx_api_cache_expires ON api_cache(expires_at);

CREATE INDEX IF NOT EXISTS idx_api_logs_source ON api_logs(api_source);
CREATE INDEX IF NOT EXISTS idx_api_logs_created ON api_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_api_logs_status ON api_logs(status_code);

-- Enable Row Level Security
ALTER TABLE franchises ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_logs ENABLE ROW LEVEL SECURITY;

-- Public read access to active franchises
CREATE POLICY "Public can read active franchises"
  ON franchises FOR SELECT
  TO public
  USING (is_active = true);

-- Public read access to cached data
CREATE POLICY "Public can read api cache"
  ON api_cache FOR SELECT
  TO public
  USING (expires_at > now());

-- Authenticated users can insert/update franchises
CREATE POLICY "Authenticated users can insert franchises"
  ON franchises FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update franchises"
  ON franchises FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can manage cache
CREATE POLICY "Authenticated users can manage cache"
  ON api_cache FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can view logs
CREATE POLICY "Authenticated users can view logs"
  ON api_logs FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can insert logs
CREATE POLICY "Authenticated users can insert logs"
  ON api_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Function to clean expired cache
CREATE OR REPLACE FUNCTION clean_expired_cache()
RETURNS void AS $$
BEGIN
  DELETE FROM api_cache WHERE expires_at < now();
END;
$$ LANGUAGE plpgsql;

-- Function to get franchise statistics
CREATE OR REPLACE FUNCTION get_franchise_stats()
RETURNS TABLE (
  total_franchises bigint,
  active_franchises bigint,
  industries_count bigint,
  avg_investment_min decimal,
  avg_investment_max decimal,
  data_sources jsonb
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::bigint as total_franchises,
    COUNT(*) FILTER (WHERE is_active = true)::bigint as active_franchises,
    COUNT(DISTINCT industry)::bigint as industries_count,
    AVG(investment_min) as avg_investment_min,
    AVG(investment_max) as avg_investment_max,
    jsonb_object_agg(data_source, cnt) as data_sources
  FROM (
    SELECT 
      *,
      COUNT(*) OVER (PARTITION BY data_source) as cnt
    FROM franchises
  ) subquery;
END;
$$ LANGUAGE plpgsql;
