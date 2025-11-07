/*
  # Fix Security Issues

  ## 1. RLS Performance Optimization
    - Fix `franchise_requests` table policy to use `(select auth.jwt())` instead of `auth.jwt()` for better performance at scale

  ## 2. Remove Unused Indexes
    - Drop unused indexes on `franchises` table (6 indexes)
    - Drop unused indexes on `api_cache` table (3 indexes)
    - Drop unused indexes on `api_logs` table (3 indexes)
    - Drop unused indexes on `opportunities` table (2 indexes)
    - Drop unused indexes on `opportunity_categories` table (1 index)
    - Drop unused indexes on `vendor_applications` table (2 indexes)
    - Drop unused indexes on `advertising_applications` table (2 indexes)
    - Drop unused indexes on `approved_vendors` table (2 indexes)
    - Drop unused indexes on `sync_logs` table (3 indexes)

  ## 3. Consolidate Duplicate Permissive Policies
    - Merge duplicate SELECT policies on `api_cache` table
    - Merge duplicate SELECT policies on `api_credentials` table
    - Merge duplicate SELECT policies on `opportunities` table
    - Merge duplicate SELECT policies on `opportunity_categories` table

  ## 4. Fix Function Search Path Issues
    - Add `SECURITY DEFINER` and set search_path for `clean_expired_cache` function
    - Add `SECURITY DEFINER` and set search_path for `get_franchise_stats` function

  ## Important Notes
    - All changes are backward compatible
    - RLS policies maintain the same access control logic
    - Unused indexes are removed to reduce storage and improve write performance
    - Function search paths are secured to prevent search_path hijacking attacks
*/

-- ============================================================================
-- 1. FIX RLS PERFORMANCE ISSUE
-- ============================================================================

-- Drop and recreate the policy with optimized auth function call
DROP POLICY IF EXISTS "Users can view own requests" ON franchise_requests;

CREATE POLICY "Users can view own requests"
  ON franchise_requests
  FOR SELECT
  TO authenticated
  USING (email = (select auth.jwt()->>'email'));

-- ============================================================================
-- 2. REMOVE UNUSED INDEXES
-- ============================================================================

-- Franchises table indexes
DROP INDEX IF EXISTS idx_franchises_industry;
DROP INDEX IF EXISTS idx_franchises_investment;
DROP INDEX IF EXISTS idx_franchises_region;
DROP INDEX IF EXISTS idx_franchises_updated;
DROP INDEX IF EXISTS idx_franchises_active;
DROP INDEX IF EXISTS idx_franchises_source;

-- API cache table indexes
DROP INDEX IF EXISTS idx_api_cache_key;
DROP INDEX IF EXISTS idx_api_cache_source;
DROP INDEX IF EXISTS idx_api_cache_expires;

-- API logs table indexes
DROP INDEX IF EXISTS idx_api_logs_source;
DROP INDEX IF EXISTS idx_api_logs_created;
DROP INDEX IF EXISTS idx_api_logs_status;

-- Opportunities table indexes
DROP INDEX IF EXISTS idx_opportunities_category;
DROP INDEX IF EXISTS idx_opportunities_province;

-- Opportunity categories table indexes
DROP INDEX IF EXISTS idx_opportunity_categories_type;

-- Vendor applications table indexes
DROP INDEX IF EXISTS idx_vendor_applications_status;
DROP INDEX IF EXISTS idx_vendor_applications_created_at;

-- Advertising applications table indexes
DROP INDEX IF EXISTS idx_advertising_applications_status;
DROP INDEX IF EXISTS idx_advertising_applications_created_at;

-- Approved vendors table indexes
DROP INDEX IF EXISTS idx_approved_vendors_service_type;
DROP INDEX IF EXISTS idx_approved_vendors_city;

-- Sync logs table indexes
DROP INDEX IF EXISTS idx_sync_logs_provider;
DROP INDEX IF EXISTS idx_sync_logs_status;
DROP INDEX IF EXISTS idx_sync_logs_created_at;

-- ============================================================================
-- 3. CONSOLIDATE DUPLICATE PERMISSIVE POLICIES
-- ============================================================================

-- API Cache: Merge "Public can read api cache" and "Authenticated users can manage cache"
-- Keep the more restrictive public read policy and the authenticated manage policy
DROP POLICY IF EXISTS "Public can read api cache" ON api_cache;
DROP POLICY IF EXISTS "Authenticated users can manage cache" ON api_cache;

-- Recreate with single SELECT policy and separate INSERT/UPDATE/DELETE policies
CREATE POLICY "Public can read active cache"
  ON api_cache
  FOR SELECT
  TO public
  USING (expires_at > now());

CREATE POLICY "Authenticated users can insert cache"
  ON api_cache
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update cache"
  ON api_cache
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete cache"
  ON api_cache
  FOR DELETE
  TO authenticated
  USING (true);

-- API Credentials: Merge duplicate SELECT policies
DROP POLICY IF EXISTS "Authenticated users can view API credentials" ON api_credentials;
DROP POLICY IF EXISTS "Authenticated users can manage API credentials" ON api_credentials;

-- Recreate with single SELECT policy and separate INSERT/UPDATE/DELETE policies
CREATE POLICY "Authenticated users can view credentials"
  ON api_credentials
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert credentials"
  ON api_credentials
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update credentials"
  ON api_credentials
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete credentials"
  ON api_credentials
  FOR DELETE
  TO authenticated
  USING (true);

-- Opportunities: Merge duplicate SELECT policies
DROP POLICY IF EXISTS "Anyone can view active opportunities" ON opportunities;
DROP POLICY IF EXISTS "Authenticated users can view all opportunities" ON opportunities;

-- Recreate with single comprehensive SELECT policy
CREATE POLICY "Users can view opportunities"
  ON opportunities
  FOR SELECT
  TO anon, authenticated
  USING (
    -- Anonymous users can only see active opportunities
    CASE 
      WHEN auth.role() = 'anon' THEN status = 'active'
      -- Authenticated users can see all opportunities
      ELSE true
    END
  );

-- Opportunity Categories: Merge duplicate SELECT policies
DROP POLICY IF EXISTS "Anyone can view categories" ON opportunity_categories;
DROP POLICY IF EXISTS "Authenticated users can manage categories" ON opportunity_categories;

-- Recreate with single SELECT policy and separate INSERT/UPDATE/DELETE policies
CREATE POLICY "Anyone can view all categories"
  ON opportunity_categories
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert categories"
  ON opportunity_categories
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update categories"
  ON opportunity_categories
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete categories"
  ON opportunity_categories
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- 4. FIX FUNCTION SEARCH PATH ISSUES
-- ============================================================================

-- Fix clean_expired_cache function
CREATE OR REPLACE FUNCTION clean_expired_cache()
RETURNS void 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM api_cache WHERE expires_at < now();
END;
$$;

-- Fix get_franchise_stats function
CREATE OR REPLACE FUNCTION get_franchise_stats()
RETURNS TABLE (
  total_franchises bigint,
  active_franchises bigint,
  industries_count bigint,
  avg_investment_min decimal,
  avg_investment_max decimal,
  data_sources jsonb
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::bigint,
    COUNT(*) FILTER (WHERE is_active = true)::bigint,
    COUNT(DISTINCT industry)::bigint,
    AVG(investment_min)::decimal,
    AVG(investment_max)::decimal,
    jsonb_agg(DISTINCT data_source) FILTER (WHERE data_source IS NOT NULL)
  FROM franchises;
END;
$$;
