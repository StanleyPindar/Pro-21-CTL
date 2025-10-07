-- Create Admin User Script
-- Run this in your Supabase SQL Editor

-- Step 1: First, you need to create the auth user through Supabase Auth
-- You can do this in two ways:
--
-- Option A: Use the Supabase Dashboard
--   1. Go to Authentication > Users
--   2. Click "Add user" or "Invite"
--   3. Email: admin@admin.com
--   4. Password: admin123
--   5. Auto Confirm User: Yes
--   6. Copy the user ID from the users table
--
-- Option B: Use the Supabase Auth API from your browser console
--   Run this in your browser console at your app URL:
--   ```javascript
--   const { data, error } = await supabaseClient.auth.signUp({
--     email: 'admin@admin.com',
--     password: 'admin123'
--   });
--   console.log(data.user.id); // Copy this user ID
--   ```

-- Step 2: After creating the auth user, run this SQL with the user ID
-- Replace 'USER_ID_HERE' with the actual user ID from Step 1

INSERT INTO admin_users (id, email, role)
VALUES (
  'USER_ID_HERE',  -- Replace with the user ID from auth.users
  'admin@admin.com',
  'admin'
)
ON CONFLICT (id) DO UPDATE
SET email = EXCLUDED.email,
    role = EXCLUDED.role;

-- Verify the admin user was created
SELECT * FROM admin_users WHERE email = 'admin@admin.com';

-- ALTERNATIVE: If you already have the user in auth.users, find their ID:
-- SELECT id FROM auth.users WHERE email = 'admin@admin.com';