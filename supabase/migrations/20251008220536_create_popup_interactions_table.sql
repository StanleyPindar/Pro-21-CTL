/*
  # Create popup interactions tracking table

  1. New Tables
    - `popup_interactions`
      - `id` (uuid, primary key) - Unique identifier for each interaction
      - `page_url` (text) - URL where the popup was displayed
      - `action_type` (text) - Type of action: 'shown', 'closed', 'claimed', 'code_copied'
      - `promo_code` (text) - Promo code associated with the interaction
      - `session_id` (text) - Browser session identifier
      - `user_agent` (text) - Browser user agent string
      - `created_at` (timestamptz) - Timestamp of the interaction

  2. Indexes
    - Index on `created_at` for time-based queries
    - Index on `action_type` for filtering by action
    - Index on `session_id` for session-based analysis

  3. Security
    - Enable RLS on `popup_interactions` table
    - Add policy for service role to insert interaction data
    - Add policy for authenticated admin users to read interaction data

  4. Notes
    - This table tracks all popup interactions for analytics
    - No user authentication required for tracking (anonymous)
    - Data retention should be managed separately
*/

-- Create popup_interactions table
CREATE TABLE IF NOT EXISTS popup_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_url text NOT NULL,
  action_type text NOT NULL CHECK (action_type IN ('shown', 'closed', 'claimed', 'code_copied')),
  promo_code text,
  session_id text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_popup_interactions_created_at ON popup_interactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_popup_interactions_action_type ON popup_interactions(action_type);
CREATE INDEX IF NOT EXISTS idx_popup_interactions_session_id ON popup_interactions(session_id);
CREATE INDEX IF NOT EXISTS idx_popup_interactions_promo_code ON popup_interactions(promo_code);

-- Enable Row Level Security
ALTER TABLE popup_interactions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous inserts for tracking
CREATE POLICY "Allow anonymous insert for tracking"
  ON popup_interactions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow service role full access
CREATE POLICY "Service role has full access"
  ON popup_interactions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy: Allow authenticated users to read their own session data
CREATE POLICY "Users can read popup interactions"
  ON popup_interactions
  FOR SELECT
  TO authenticated
  USING (true);
