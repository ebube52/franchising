/*
  # Create Vendor and Advertising Application Tables

  1. New Tables
    - `vendor_applications`
      - `id` (uuid, primary key)
      - `full_legal_company_name` (text)
      - Address fields:
        - `street_number` (text)
        - `street_name` (text)
        - `city` (text)
        - `province` (text)
        - `postal_code` (text)
        - `country` (text)
      - Primary contact fields:
        - `contact_name` (text)
        - `contact_title` (text)
        - `contact_email` (text)
        - `contact_phone` (text)
      - `service_type` (text)
      - `documents` (jsonb) - stores uploaded document information
      - `status` (text) - pending, approved, rejected
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `advertising_applications`
      - `id` (uuid, primary key)
      - `company_name` (text)
      - `contact_name` (text)
      - `contact_email` (text)
      - `contact_phone` (text)
      - `advertising_type` (text)
      - `budget_range` (text)
      - `message` (text)
      - `status` (text) - pending, approved, rejected
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `approved_vendors`
      - Contains the same fields as vendor_applications for approved vendors
      - Publicly visible with RLS policies

  2. Security
    - Enable RLS on all tables
    - Public can insert applications (for form submissions)
    - Only authenticated users can view/manage applications
    - Public can view approved vendors
*/

-- Create vendor_applications table
CREATE TABLE IF NOT EXISTS vendor_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_legal_company_name text NOT NULL,
  street_number text NOT NULL,
  street_name text NOT NULL,
  city text NOT NULL,
  province text NOT NULL,
  postal_code text NOT NULL,
  country text NOT NULL DEFAULT 'Canada',
  contact_name text NOT NULL,
  contact_title text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text NOT NULL,
  service_type text NOT NULL,
  documents jsonb DEFAULT '[]'::jsonb,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create advertising_applications table
CREATE TABLE IF NOT EXISTS advertising_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text NOT NULL,
  advertising_type text NOT NULL,
  budget_range text,
  message text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create approved_vendors table (publicly viewable)
CREATE TABLE IF NOT EXISTS approved_vendors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_legal_company_name text NOT NULL,
  street_number text NOT NULL,
  street_name text NOT NULL,
  city text NOT NULL,
  province text NOT NULL,
  postal_code text NOT NULL,
  country text NOT NULL DEFAULT 'Canada',
  contact_name text NOT NULL,
  contact_title text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text NOT NULL,
  service_type text NOT NULL,
  logo_url text,
  description text,
  website text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE vendor_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE advertising_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE approved_vendors ENABLE ROW LEVEL SECURITY;

-- RLS Policies for vendor_applications
CREATE POLICY "Anyone can submit vendor applications"
  ON vendor_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view vendor applications"
  ON vendor_applications
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update vendor applications"
  ON vendor_applications
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for advertising_applications
CREATE POLICY "Anyone can submit advertising applications"
  ON advertising_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view advertising applications"
  ON advertising_applications
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update advertising applications"
  ON advertising_applications
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for approved_vendors
CREATE POLICY "Anyone can view approved vendors"
  ON approved_vendors
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert approved vendors"
  ON approved_vendors
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update approved vendors"
  ON approved_vendors
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete approved vendors"
  ON approved_vendors
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_vendor_applications_status ON vendor_applications(status);
CREATE INDEX IF NOT EXISTS idx_vendor_applications_created_at ON vendor_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_advertising_applications_status ON advertising_applications(status);
CREATE INDEX IF NOT EXISTS idx_advertising_applications_created_at ON advertising_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_approved_vendors_service_type ON approved_vendors(service_type);
CREATE INDEX IF NOT EXISTS idx_approved_vendors_city ON approved_vendors(city);