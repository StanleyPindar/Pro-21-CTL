/*
  # Fix Dangerous Public RLS Policies

  ## Security Issue
  Migration 20250930151054 created dangerous policies allowing ANYONE to insert/update/delete articles.
  This is a critical security vulnerability.

  ## Changes
  1. Drop all dangerous public policies (insert, update, delete)
  2. Drop the overly permissive "Public can read articles" policy
  3. Keep only "Public can read published articles" for proper read access
  4. Keep admin policies for authenticated admin users

  ## Result
  - Public users can ONLY read published articles
  - Only authenticated admins can insert/update/delete articles
  - Maintains proper security and data integrity
*/

-- Drop all dangerous public policies
DROP POLICY IF EXISTS "Public can delete articles" ON articles;
DROP POLICY IF EXISTS "Public can insert articles" ON articles;
DROP POLICY IF EXISTS "Public can update articles" ON articles;
DROP POLICY IF EXISTS "Public can read articles" ON articles;

-- The "Public can read published articles" policy already exists and is correct
-- The admin policies already exist and are correct
-- No need to recreate them
