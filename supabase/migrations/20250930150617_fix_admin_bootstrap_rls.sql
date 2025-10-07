/*
  # Fix Admin Bootstrap RLS Policy

  ## Problem
  The current policy fails when an authenticated user (who already exists in auth.users)
  tries to add themselves to admin_users table. The policy correctly checks if the table
  is empty, but the authentication context causes the second part of the OR condition
  to be evaluated, which fails because the user isn't in admin_users yet.

  ## Solution
  Simplify the INSERT policy to:
  1. Allow ANY authenticated user to insert if admin_users table is empty (bootstrap)
  2. Allow existing admins to create new admins (normal operation)
  
  The key is that the empty table check takes precedence and bypasses the admin check.

  ## Changes
  1. Drop existing bootstrap policy
  2. Create new simplified policy with correct precedence
*/

-- Drop the existing policy
DROP POLICY IF EXISTS "Allow first admin user creation" ON admin_users;

-- Create new policy with proper bootstrap logic
CREATE POLICY "Allow admin bootstrap and management"
  ON admin_users FOR INSERT
  TO authenticated
  WITH CHECK (
    -- Allow if table is empty (bootstrap - ANY authenticated user can do this)
    NOT EXISTS (SELECT 1 FROM admin_users LIMIT 1)
    OR
    -- OR allow if current user is already an admin
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
      AND is_admin = true
    )
  );