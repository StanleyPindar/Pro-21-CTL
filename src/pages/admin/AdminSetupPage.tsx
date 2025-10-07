import { useState, FormEvent } from 'react';
import { supabase } from '../../lib/supabase';
import { Shield, Check, AlertCircle } from 'lucide-react';

export default function AdminSetupPage() {
  const [email, setEmail] = useState('admin@admin.com');
  const [password, setPassword] = useState('admin123');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');

  const handleSetup = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('Creating admin user...');

    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password
      });

      if (signUpError) {
        if (signUpError.message.includes('already registered')) {
          setMessage('User exists. Trying to sign in and add to admin_users...');

          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (signInError) {
            throw new Error(`Sign in failed: ${signInError.message}`);
          }

          const uid = signInData.user?.id;
          if (!uid) throw new Error('No user ID returned');

          setUserId(uid);

          const { error: insertError } = await supabase
            .from('admin_users')
            .upsert([
              {
                user_id: uid,
                email: email,
                is_admin: true,
                is_super_admin: false
              }
            ]);

          if (insertError) {
            throw new Error(`Failed to add to admin_users: ${insertError.message}`);
          }

          await supabase.auth.signOut();

          setStatus('success');
          setMessage(`Admin user setup complete! User ID: ${uid}`);
          return;
        }
        throw signUpError;
      }

      const uid = signUpData.user?.id;
      if (!uid) throw new Error('No user ID returned from signup');

      setUserId(uid);
      setMessage(`User created with ID: ${uid}. Adding to admin_users table...`);

      const { error: insertError } = await supabase
        .from('admin_users')
        .insert([
          {
            user_id: uid,
            email: email,
            is_admin: true,
            is_super_admin: false
          }
        ]);

      if (insertError) {
        throw new Error(`Failed to add to admin_users: ${insertError.message}`);
      }

      setStatus('success');
      setMessage(`Admin user created successfully! User ID: ${uid}`);

    } catch (error: unknown) {
      setStatus('error');
      setMessage(error.message || 'An error occurred');
      console.error('Setup error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Setup</h1>
            <p className="text-slate-600">Create your first admin user</p>
          </div>

          {status === 'success' ? (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-900 mb-1">Setup Complete!</h3>
                    <p className="text-sm text-green-700">{message}</p>
                    {userId && (
                      <p className="text-xs text-green-600 mt-2 font-mono bg-green-100 p-2 rounded">
                        User ID: {userId}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-slate-700 bg-slate-50 p-4 rounded-lg">
                <p className="font-semibold">Login Credentials:</p>
                <p>Email: <code className="bg-white px-2 py-1 rounded">{email}</code></p>
                <p>Password: <code className="bg-white px-2 py-1 rounded">{password}</code></p>
              </div>

              <a
                href="/admin/login"
                className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Go to Admin Login
              </a>
            </div>
          ) : (
            <form onSubmit={handleSetup} className="space-y-6">
              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-red-900 mb-1">Setup Failed</h3>
                      <p className="text-sm text-red-700">{message}</p>
                    </div>
                  </div>
                </div>
              )}

              {status === 'loading' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-700">{message}</p>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Admin Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={status === 'loading'}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                  Admin Password
                </label>
                <input
                  id="password"
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={status === 'loading'}
                />
                <p className="mt-1 text-xs text-slate-500">
                  Minimum 6 characters
                </p>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Creating Admin User...' : 'Create Admin User'}
              </button>

              <p className="text-xs text-slate-500 text-center">
                This page creates an admin user and adds them to the admin_users table
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}