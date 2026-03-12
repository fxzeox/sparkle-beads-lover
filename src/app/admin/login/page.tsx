'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

      if (email === adminEmail && password === adminPassword) {
        // Store token in localStorage
        localStorage.setItem('adminToken', adminPassword);
        router.push('/admin');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-800 to-amber-600 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-5">
          {/* Logo */}
          <div className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-amber-500 bg-clip-text text-transparent">
              Sparkle Beads Lover
            </h1>
            <p className="text-gray-400 text-xs mt-1">Admin Login</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-red-700 text-xs font-medium">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-xs font-semibold text-gray-600">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                disabled={loading}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-gray-900 text-sm placeholder-gray-400 outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-100 disabled:bg-gray-50"
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label htmlFor="password" className="block text-xs font-semibold text-gray-600">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-gray-900 text-sm placeholder-gray-400 outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-100 disabled:bg-gray-50"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-blue-700 to-amber-500 text-white text-sm font-semibold transition-all hover:shadow-md hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center">
            <Link
              href="/"
              className="text-xs text-blue-700 hover:text-amber-600 transition-colors"
            >
              Back to Store
            </Link>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-4 rounded-lg bg-white/20 backdrop-blur-sm p-3 text-white text-xs text-center">
          <p>🔐 Use your admin credentials to access the dashboard</p>
        </div>
      </div>
    </main>
  );
}
