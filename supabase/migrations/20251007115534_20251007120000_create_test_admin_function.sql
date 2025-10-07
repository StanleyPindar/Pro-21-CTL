/*
  # Create Test Admin User Function

  Creates a PostgreSQL function to easily create admin users without going through
  the Supabase Auth signup flow. This is useful for testing and initial setup.

  ## Usage
  SELECT create_admin_user('admin@example.com', 'password123');

  ## Security Notes
  - This function should only be used in development/testing
  - Password is plain text in the function call (encrypted by auth.users logic)
  - Admin users are automatically added to admin_users table
*/

CREATE OR REPLACE FUNCTION create_admin_user(
  user_email text,
  user_password text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_user_id uuid;
  result jsonb;
BEGIN
  -- Check if user already exists
  SELECT id INTO new_user_id
  FROM auth.users
  WHERE email = user_email;

  IF new_user_id IS NOT NULL THEN
    -- User exists, check if already admin
    IF EXISTS (SELECT 1 FROM admin_users WHERE id = new_user_id) THEN
      RETURN jsonb_build_object(
        'success', false,
        'message', 'User already exists and is already an admin',
        'user_id', new_user_id
      );
    ELSE
      -- Add to admin_users
      INSERT INTO admin_users (id, email, role)
      VALUES (new_user_id, user_email, 'admin')
      ON CONFLICT (id) DO NOTHING;
      
      RETURN jsonb_build_object(
        'success', true,
        'message', 'Existing user promoted to admin',
        'user_id', new_user_id
      );
    END IF;
  END IF;

  -- Create new user in auth.users
  new_user_id := gen_random_uuid();
  
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    aud,
    role
  ) VALUES (
    new_user_id,
    '00000000-0000-0000-0000-000000000000',
    user_email,
    crypt(user_password, gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    'authenticated',
    'authenticated'
  );

  -- Add to admin_users table
  INSERT INTO admin_users (id, email, role)
  VALUES (new_user_id, user_email, 'admin');

  RETURN jsonb_build_object(
    'success', true,
    'message', 'Admin user created successfully',
    'user_id', new_user_id,
    'email', user_email
  );

EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object(
    'success', false,
    'message', SQLERRM
  );
END;
$$;