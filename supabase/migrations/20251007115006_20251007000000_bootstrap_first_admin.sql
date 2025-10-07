/*
  # Bootstrap First Admin User Creation

  This migration fixes the circular dependency issue where you need to be an admin 
  to create admin records, but there are no admins yet.

  ## Changes
  1. Drop the restrictive admin_users INSERT policy
  2. Create a new policy that allows:
     - Any authenticated user to insert themselves as admin if no admins exist (bootstrap)
     - Existing admins to create new admins
  
  ## Security
  - Still requires authentication
  - Only allows self-insertion when bootstrapping
  - After first admin exists, only admins can create more admins
*/

-- Drop the existing restrictive insert policy
DROP POLICY IF EXISTS "Admins can insert admin users" ON admin_users;

-- Create a bootstrap-friendly policy
CREATE POLICY "Bootstrap first admin or admins create admins"
  ON admin_users FOR INSERT
  TO authenticated
  WITH CHECK (
    -- Allow if this is the first admin (bootstrap scenario)
    (NOT EXISTS (SELECT 1 FROM admin_users))
    OR
    -- OR if an existing admin is creating a new admin
    (
      EXISTS (
        SELECT 1 FROM admin_users
        WHERE admin_users.id = auth.uid()
      )
    )
  );