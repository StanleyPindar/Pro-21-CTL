/*
  # Allow First Admin User Creation

  This migration adds a special policy to allow the first admin user to be created
  when the admin_users table is empty (bootstrap scenario).

  The policy allows INSERT when:
  1. The user is authenticated
  2. No admin users exist yet in the table
  3. The user is inserting their own user_id
*/

-- Drop the restrictive insert policy
DROP POLICY IF EXISTS "Admins can insert admin users" ON admin_users;

-- Create a new policy that allows first admin creation
CREATE POLICY "Allow first admin user creation"
  ON admin_users FOR INSERT
  TO authenticated
  WITH CHECK (
    -- Allow if no admin users exist yet (bootstrap case)
    (NOT EXISTS (SELECT 1 FROM admin_users))
    OR
    -- OR if an existing admin is creating a new admin
    (
      EXISTS (
        SELECT 1 FROM admin_users
        WHERE admin_users.user_id = auth.uid()
        AND admin_users.is_admin = true
      )
    )
  );