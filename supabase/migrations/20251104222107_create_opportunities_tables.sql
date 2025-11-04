/*
  # Create Opportunities Tables for Franchises and Real Estate

  1. New Tables
    - `opportunities`
      - `id` (uuid, primary key)
      - `title` (text) - Name of the opportunity
      - `type` (text) - franchise, business, real_estate
      - `category` (text) - Industry category
      - `investment_min` (numeric) - Minimum investment
      - `investment_max` (numeric) - Maximum investment
      - `description` (text) - Full description
      - `image_url` (text) - Image URL
      - `website` (text) - Website URL
      - `location` (text) - City, Province
      - `province` (text) - Province/Territory
      - `country` (text) - Country (default Canada)
      - `status` (text) - active, inactive, pending
      - `source` (text) - Where data came from
      - `metadata` (jsonb) - Additional flexible data
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `opportunity_categories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `type` (text) - franchise, business, real_estate
      - `description` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public can view active opportunities
    - Only authenticated users can manage opportunities
*/

-- Create opportunities table
CREATE TABLE IF NOT EXISTS opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL CHECK (type IN ('franchise', 'business', 'real_estate')),
  category text,
  investment_min numeric DEFAULT 0,
  investment_max numeric DEFAULT 0,
  description text,
  image_url text,
  website text,
  location text,
  province text,
  country text DEFAULT 'Canada',
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  source text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create opportunity_categories table
CREATE TABLE IF NOT EXISTS opportunity_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  type text NOT NULL CHECK (type IN ('franchise', 'business', 'real_estate')),
  description text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunity_categories ENABLE ROW LEVEL SECURITY;

-- RLS Policies for opportunities
CREATE POLICY "Anyone can view active opportunities"
  ON opportunities
  FOR SELECT
  TO anon, authenticated
  USING (status = 'active');

CREATE POLICY "Authenticated users can view all opportunities"
  ON opportunities
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert opportunities"
  ON opportunities
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update opportunities"
  ON opportunities
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete opportunities"
  ON opportunities
  FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for opportunity_categories
CREATE POLICY "Anyone can view categories"
  ON opportunity_categories
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage categories"
  ON opportunity_categories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_opportunities_type ON opportunities(type);
CREATE INDEX IF NOT EXISTS idx_opportunities_category ON opportunities(category);
CREATE INDEX IF NOT EXISTS idx_opportunities_status ON opportunities(status);
CREATE INDEX IF NOT EXISTS idx_opportunities_province ON opportunities(province);
CREATE INDEX IF NOT EXISTS idx_opportunities_created_at ON opportunities(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_opportunity_categories_type ON opportunity_categories(type);

-- Insert default categories
INSERT INTO opportunity_categories (name, type, description) VALUES
  ('Food & Beverage', 'franchise', 'Restaurants, cafes, food services'),
  ('Retail', 'franchise', 'Retail stores and shops'),
  ('Services', 'franchise', 'Business and consumer services'),
  ('Health & Fitness', 'franchise', 'Gyms, wellness, health services'),
  ('Education', 'franchise', 'Tutoring, training, education centers'),
  ('Automotive', 'franchise', 'Auto repair, car wash, automotive services'),
  ('Home Services', 'franchise', 'Cleaning, maintenance, repair services'),
  ('Technology', 'franchise', 'IT services, tech support'),
  
  ('Retail Business', 'business', 'Independent retail businesses'),
  ('Service Business', 'business', 'Service-based businesses'),
  ('Manufacturing', 'business', 'Manufacturing and production'),
  ('Distribution', 'business', 'Distribution and wholesale'),
  
  ('Residential', 'real_estate', 'Residential properties and developments'),
  ('Commercial', 'real_estate', 'Commercial real estate'),
  ('Industrial', 'real_estate', 'Industrial properties'),
  ('Mixed Use', 'real_estate', 'Mixed-use developments'),
  ('Land', 'real_estate', 'Land and development opportunities')
ON CONFLICT (name) DO NOTHING;

-- Insert sample franchise opportunities
INSERT INTO opportunities (title, type, category, investment_min, investment_max, description, image_url, location, province, source, metadata) VALUES
  (
    'Tim Hortons Franchise',
    'franchise',
    'Food & Beverage',
    438000,
    2200000,
    'Join Canada''s most iconic coffee and donut chain. Tim Hortons offers a proven business model with comprehensive training and ongoing support. Perfect for entrepreneurs looking to own a beloved Canadian brand.',
    'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    'Multiple Locations',
    'Ontario',
    'franchise_data',
    '{"units": "4000+", "founded": "1964", "support": "comprehensive"}'::jsonb
  ),
  (
    'Subway Canada Franchise',
    'franchise',
    'Food & Beverage',
    116000,
    263000,
    'World''s largest submarine sandwich franchise with flexible formats and proven success. Low initial investment with strong brand recognition and comprehensive training program.',
    'https://images.pexels.com/photos/7129052/pexels-photo-7129052.jpeg',
    'Canada Wide',
    'Multiple',
    'franchise_data',
    '{"units": "3000+", "founded": "1965"}'::jsonb
  ),
  (
    'The UPS Store Franchise',
    'franchise',
    'Services',
    150000,
    400000,
    'Leading provider of packing, shipping, and business services. Comprehensive training program and ongoing support from a globally recognized brand.',
    'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg',
    'Various Locations',
    'British Columbia',
    'franchise_data',
    '{"units": "5000+", "founded": "1980"}'::jsonb
  ),
  (
    'Anytime Fitness Franchise',
    'franchise',
    'Health & Fitness',
    400000,
    800000,
    '24-hour fitness center franchise with strong member retention. Comprehensive support system and proven business model in the growing fitness industry.',
    'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg',
    'Major Cities',
    'Alberta',
    'franchise_data',
    '{"units": "4000+", "founded": "2002", "model": "24-hour"}'::jsonb
  );

-- Insert sample real estate opportunities
INSERT INTO opportunities (title, type, category, investment_min, investment_max, description, image_url, location, province, source, metadata) VALUES
  (
    'Downtown Mixed-Use Development',
    'real_estate',
    'Mixed Use',
    2500000,
    5000000,
    'Prime downtown location with approved plans for mixed-use development. Ground floor commercial with residential units above. Excellent opportunity in growing urban center.',
    'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
    'Toronto',
    'Ontario',
    'real_estate_listing',
    '{"zoning": "mixed-use", "size": "15000 sqft", "units": "20"}'::jsonb
  ),
  (
    'Shopping Plaza Investment',
    'real_estate',
    'Commercial',
    3000000,
    4500000,
    'Established shopping plaza with anchor tenants. Strong cash flow with long-term leases. Prime location with high traffic and excellent visibility.',
    'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg',
    'Vancouver',
    'British Columbia',
    'real_estate_listing',
    '{"type": "plaza", "tenants": "12", "occupancy": "95%"}'::jsonb
  ),
  (
    'Industrial Warehouse Complex',
    'real_estate',
    'Industrial',
    1800000,
    2800000,
    'Modern warehouse complex with high ceilings and loading docks. Ideal for distribution or light manufacturing. Strategic location near major highways.',
    'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg',
    'Calgary',
    'Alberta',
    'real_estate_listing',
    '{"size": "50000 sqft", "docks": "8", "ceiling": "24ft"}'::jsonb
  ),
  (
    'Residential Development Land',
    'real_estate',
    'Land',
    1200000,
    2000000,
    '25-acre parcel with residential zoning approval. Serviced land ready for development. Growing community with strong demand for new housing.',
    'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg',
    'Ottawa',
    'Ontario',
    'real_estate_listing',
    '{"acres": "25", "zoning": "residential", "serviced": true}'::jsonb
  )
ON CONFLICT DO NOTHING;
