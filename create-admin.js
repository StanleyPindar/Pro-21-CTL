import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createAdminUser() {
  try {
    console.log('Creating admin user account...');

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: 'admin@admin.com',
      password: 'admin123',
    });

    if (signUpError) {
      if (signUpError.message.includes('already registered')) {
        console.log('User already exists. Attempting to get user ID...');

        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: 'admin@admin.com',
          password: 'admin123',
        });

        if (signInError) {
          throw signInError;
        }

        const userId = signInData.user.id;
        console.log(`User ID: ${userId}`);

        console.log('Adding user to admin_users table...');
        const { error: insertError } = await supabase
          .from('admin_users')
          .upsert([
            {
              user_id: userId,
              email: 'admin@admin.com',
              is_admin: true,
              is_super_admin: false
            }
          ]);

        if (insertError) {
          throw insertError;
        }

        await supabase.auth.signOut();

        console.log('\n✅ Admin user setup complete!');
        console.log('Email: admin@admin.com');
        console.log('Password: admin123');
        console.log(`User ID: ${userId}`);
        console.log('\nYou can now login at /admin/login');
        return;
      }
      throw signUpError;
    }

    const userId = signUpData.user.id;
    console.log(`✅ User created with ID: ${userId}`);

    console.log('Adding user to admin_users table...');
    const { error: insertError } = await supabase
      .from('admin_users')
      .insert([
        {
          user_id: userId,
          email: 'admin@admin.com',
          is_admin: true,
          is_super_admin: false
        }
      ]);

    if (insertError) {
      throw insertError;
    }

    console.log('\n✅ Admin user created successfully!');
    console.log('Email: admin@admin.com');
    console.log('Password: admin123');
    console.log(`User ID: ${userId}`);
    console.log('\nYou can now login at /admin/login');

  } catch (error) {
    console.error('Error creating admin user:', error.message);
    process.exit(1);
  }
}

createAdminUser();