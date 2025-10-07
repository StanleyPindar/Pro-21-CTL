/*
  # Fix Admin SELECT Policy for Login
  
  ## Problem
  The current SELECT policies require users to already be admins to read from admin_users.
  This prevents the login flow from checking if a user is an admin.
  
  ## Solution
  Add a policy that allows authenticated users to read their OWN record from admin_users.
  This allows the login flow to check admin status without requiring admin privileges.
  
  ## Changes
  1. Add policy allowing users to read their own admin status
*/

-- Allow authenticated users to check their own admin status
CREATE POLICY "Users can read own admin status"
  ON admin_users FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());