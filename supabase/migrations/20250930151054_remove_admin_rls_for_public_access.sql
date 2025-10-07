/*
  # Remove RLS restrictions for public admin access
  
  ## Changes
  Make admin_users and articles tables fully accessible without authentication.
  This allows the admin interface to work without login requirements.
  
  1. Add public read/write policies for articles
  2. Add public read policies for admin_users (for checking)
*/

-- Allow anyone to read articles
CREATE POLICY "Public can read articles"
  ON articles FOR SELECT
  TO public
  USING (true);

-- Allow anyone to insert articles
CREATE POLICY "Public can insert articles"
  ON articles FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow anyone to update articles
CREATE POLICY "Public can update articles"
  ON articles FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Allow anyone to delete articles
CREATE POLICY "Public can delete articles"
  ON articles FOR DELETE
  TO public
  USING (true);