/*
  # Cleanup Conflicting Admin Policies
  
  ## Overview
  Removes conflicting RLS policies on admin_users table to fix the bootstrap issue.
  The problem: Multiple INSERT policies conflict, particularly the super_admin policy
  that prevents first admin creation when the table is empty.
  
  ## Changes Made
  
  1. Policy Cleanup
    - Removes the overly restrictive "Super admins can insert admin_users" policy
    - Removes the problematic "Admin full access to articles" policy (too permissive)
    - Keeps "Allow first admin user creation" policy (allows bootstrap + admin management)
    - Keeps proper admin policies for SELECT, UPDATE, DELETE operations
  
  2. Security Model
    - First admin can be created when admin_users table is empty (bootstrap)
    - Existing admins can create new admins (normal operation)
    - Only admins can view, update, or delete admin user records
    - Super admins maintain elevated permissions through other policies
  
  ## Notes
  - This migration is idempotent and safe to run multiple times
  - The "Allow first admin user creation" policy handles both bootstrap and admin management
  - Articles table maintains proper RLS with separate public/admin policies
*/

-- Remove conflicting super admin INSERT policy that prevents bootstrap
DROP POLICY IF EXISTS "Super admins can insert admin_users" ON admin_users;

-- Remove the overly permissive articles policy
DROP POLICY IF EXISTS "Admin full access to articles" ON articles;

-- Verify the good bootstrap policy exists (it should from previous migration)
-- This policy allows:
-- 1. First admin creation when table is empty
-- 2. Existing admins to create new admins
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'admin_users' 
    AND policyname = 'Allow first admin user creation'
  ) THEN
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
  END IF;
END $$;