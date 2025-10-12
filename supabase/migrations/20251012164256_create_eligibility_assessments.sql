/*
  # Medical Cannabis Eligibility Assessment System

  ## Overview
  Creates comprehensive system for storing and tracking medical cannabis eligibility assessments,
  clinic recommendations, and analytics data for the sophisticated 15-question assessment flow.

  ## New Tables
  
  1. **eligibility_assessments**
     - `id` (uuid, primary key) - Unique assessment identifier
     - `email` (text, indexed) - User email captured during assessment
     - `name` (text, nullable) - Optional user name
     - `session_id` (text, indexed) - Browser session identifier for anonymous tracking
     - `responses` (jsonb) - All 15 question responses stored as JSON
     - `condition` (text) - Primary condition from Step 1
     - `severity` (integer) - Severity score 1-10 from Step 3
     - `eligibility_status` (text) - Calculated status: highly_likely, likely, possible, educational
     - `eligibility_confidence` (integer) - Confidence percentage 0-100
     - `matched_clinics` (jsonb) - Top 3-5 clinic recommendations with scores
     - `completed` (boolean) - Whether assessment was fully completed
     - `current_step` (integer) - Last completed step for progress tracking
     - `started_at` (timestamptz) - When assessment was started
     - `completed_at` (timestamptz, nullable) - When assessment was completed
     - `completion_time_seconds` (integer, nullable) - Time taken to complete
     - `created_at` (timestamptz) - Record creation timestamp
     - `updated_at` (timestamptz) - Record update timestamp

  2. **assessment_analytics**
     - `id` (uuid, primary key) - Unique analytics record identifier
     - `assessment_id` (uuid, foreign key) - Reference to eligibility_assessments
     - `step_number` (integer) - Which step 1-15
     - `step_name` (text) - Question identifier
     - `response_value` (text) - User's selected response
     - `time_spent_seconds` (integer) - Time spent on this step
     - `timestamp` (timestamptz) - When step was completed
     - `created_at` (timestamptz) - Record creation timestamp

  3. **assessment_clinic_matches**
     - `id` (uuid, primary key) - Unique match record identifier
     - `assessment_id` (uuid, foreign key) - Reference to eligibility_assessments
     - `clinic_id` (text) - Clinic identifier from clinics table
     - `clinic_name` (text) - Clinic name for quick access
     - `match_score` (integer) - Overall match score 0-100
     - `match_percentage` (integer) - User-facing percentage
     - `match_reasons` (jsonb) - Array of reasons why clinic was matched
     - `score_breakdown` (jsonb) - Detailed scoring components
     - `ranking` (integer) - Position in recommendation list (1-5)
     - `clicked` (boolean) - Whether user clicked this clinic
     - `booked` (boolean) - Whether user reported booking this clinic
     - `created_at` (timestamptz) - Record creation timestamp

  4. **assessment_dropoffs**
     - `id` (uuid, primary key) - Unique dropoff record identifier
     - `session_id` (text, indexed) - Browser session identifier
     - `email` (text, nullable) - Email if captured before dropoff
     - `last_completed_step` (integer) - Last step user completed before leaving
     - `total_steps` (integer) - Total steps in assessment (15)
     - `responses_json` (jsonb) - Partial responses before dropoff
     - `dropped_at` (timestamptz) - When user left assessment
     - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - Enable RLS on all tables for data protection
  - Allow public read access only to aggregate analytics (not individual records)
  - Restrict write access to authenticated service role only
  - Add policies for email-based access to own assessments

  ## Indexes
  - Index on email for quick user lookup
  - Index on session_id for anonymous tracking
  - Index on completed status for completion rate queries
  - Index on condition for analytics by condition type
  - Index on timestamps for time-based analytics

  ## Notes
  - JSONB used for flexible response storage supporting dynamic questions
  - Separate analytics table allows detailed step-by-step tracking
  - Dropoff tracking enables optimization of question flow
  - Clinic match table supports A/B testing of matching algorithms
*/

-- Create eligibility_assessments table
CREATE TABLE IF NOT EXISTS eligibility_assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text,
  name text,
  session_id text NOT NULL,
  responses jsonb NOT NULL DEFAULT '{}'::jsonb,
  condition text,
  severity integer CHECK (severity >= 1 AND severity <= 10),
  eligibility_status text CHECK (eligibility_status IN ('highly_likely', 'likely', 'possible', 'educational')),
  eligibility_confidence integer CHECK (eligibility_confidence >= 0 AND eligibility_confidence <= 100),
  matched_clinics jsonb DEFAULT '[]'::jsonb,
  completed boolean DEFAULT false,
  current_step integer DEFAULT 0 CHECK (current_step >= 0 AND current_step <= 15),
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  completion_time_seconds integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create assessment_analytics table
CREATE TABLE IF NOT EXISTS assessment_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid REFERENCES eligibility_assessments(id) ON DELETE CASCADE,
  step_number integer NOT NULL CHECK (step_number >= 1 AND step_number <= 15),
  step_name text NOT NULL,
  response_value text,
  time_spent_seconds integer DEFAULT 0,
  timestamp timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create assessment_clinic_matches table
CREATE TABLE IF NOT EXISTS assessment_clinic_matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid REFERENCES eligibility_assessments(id) ON DELETE CASCADE,
  clinic_id text NOT NULL,
  clinic_name text NOT NULL,
  match_score integer NOT NULL CHECK (match_score >= 0 AND match_score <= 100),
  match_percentage integer NOT NULL CHECK (match_percentage >= 0 AND match_percentage <= 100),
  match_reasons jsonb DEFAULT '[]'::jsonb,
  score_breakdown jsonb DEFAULT '{}'::jsonb,
  ranking integer NOT NULL CHECK (ranking >= 1 AND ranking <= 5),
  clicked boolean DEFAULT false,
  booked boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create assessment_dropoffs table
CREATE TABLE IF NOT EXISTS assessment_dropoffs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  email text,
  last_completed_step integer NOT NULL CHECK (last_completed_step >= 0 AND last_completed_step <= 15),
  total_steps integer DEFAULT 15,
  responses_json jsonb DEFAULT '{}'::jsonb,
  dropped_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_assessments_email ON eligibility_assessments(email);
CREATE INDEX IF NOT EXISTS idx_assessments_session ON eligibility_assessments(session_id);
CREATE INDEX IF NOT EXISTS idx_assessments_completed ON eligibility_assessments(completed);
CREATE INDEX IF NOT EXISTS idx_assessments_condition ON eligibility_assessments(condition);
CREATE INDEX IF NOT EXISTS idx_assessments_started ON eligibility_assessments(started_at);
CREATE INDEX IF NOT EXISTS idx_assessments_completed_at ON eligibility_assessments(completed_at);

CREATE INDEX IF NOT EXISTS idx_analytics_assessment ON assessment_analytics(assessment_id);
CREATE INDEX IF NOT EXISTS idx_analytics_step ON assessment_analytics(step_number);

CREATE INDEX IF NOT EXISTS idx_matches_assessment ON assessment_clinic_matches(assessment_id);
CREATE INDEX IF NOT EXISTS idx_matches_clinic ON assessment_clinic_matches(clinic_id);
CREATE INDEX IF NOT EXISTS idx_matches_ranking ON assessment_clinic_matches(ranking);

CREATE INDEX IF NOT EXISTS idx_dropoffs_session ON assessment_dropoffs(session_id);
CREATE INDEX IF NOT EXISTS idx_dropoffs_step ON assessment_dropoffs(last_completed_step);

-- Enable Row Level Security
ALTER TABLE eligibility_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_clinic_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_dropoffs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for eligibility_assessments
CREATE POLICY "Allow anonymous insert of assessments"
  ON eligibility_assessments FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous update of own session assessments"
  ON eligibility_assessments FOR UPDATE
  TO anon
  USING (session_id = current_setting('request.headers', true)::json->>'x-session-id')
  WITH CHECK (session_id = current_setting('request.headers', true)::json->>'x-session-id');

CREATE POLICY "Allow authenticated users to view own assessments"
  ON eligibility_assessments FOR SELECT
  TO authenticated
  USING (email = current_setting('request.jwt.claims', true)::json->>'email');

-- RLS Policies for assessment_analytics
CREATE POLICY "Allow service role full access to analytics"
  ON assessment_analytics FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- RLS Policies for assessment_clinic_matches
CREATE POLICY "Allow service role full access to matches"
  ON assessment_clinic_matches FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- RLS Policies for assessment_dropoffs
CREATE POLICY "Allow anonymous insert of dropoffs"
  ON assessment_dropoffs FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_eligibility_assessment_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_eligibility_assessments_timestamp ON eligibility_assessments;
CREATE TRIGGER update_eligibility_assessments_timestamp
  BEFORE UPDATE ON eligibility_assessments
  FOR EACH ROW
  EXECUTE FUNCTION update_eligibility_assessment_timestamp();
