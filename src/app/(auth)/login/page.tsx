"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, MapPin, AlertTriangle, ShoppingBag, Check, Mountain } from 'lucide-react';
import { AuthLeftPanel } from '@/components/auth/AuthLeftPanel';
import { saveSessionEverywhere, ROLE_REDIRECT } from '@/lib/auth';
import { ROUTES } from '@/lib/constants/routes';
import toast from 'react-hot-toast';
import type { SessionUser } from '@/types/user';
import usersData from '../../../../data/users.json';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function validateEmail(value: string) {
    if (!value) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email';
    return '';
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const emailErr = validateEmail(email.trim());
      if (emailErr) {
        toast.error(emailErr);
        setIsLoading(false);
        return;
      }

      // Authenticate against local dataset in data/users.json
      const userRaw = (usersData as any[]).find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
      );

      if (!userRaw || userRaw.password !== password) {
        toast.error('Invalid email or password');
        setIsLoading(false);
        return;
      }

      const sessionUser: SessionUser = {
        id: userRaw.id,
        role: userRaw.role,
        agency_id: userRaw.agency_id ?? null,
        name: userRaw.name,
        email: userRaw.email,
        phone: userRaw.phone,
        member_since: userRaw.member_since,
        country: userRaw.country,
        token: `local-${Date.now()}`,
      };

      try {
        localStorage.setItem('authToken', sessionUser.token);
      } catch {}

      saveSessionEverywhere(sessionUser);

      const dest = ROLE_REDIRECT[sessionUser.role] ?? '/';
      router.push(dest);
    } catch (err: any) {
      console.error('Login failed', err || {});
      toast.error(err?.message || 'Login failed. Check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4 py-8">

      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl md:grid-cols-2">

        {/* LEFT — Purple Panel */}
        <AuthLeftPanel />

        {/* RIGHT — Login Form */}
        <div className="flex items-center justify-center bg-white px-8 py-10 sm:px-12">

          <div className="w-full max-w-sm">

            <h2 className="text-2xl font-bold text-neutral-900">Welcome back</h2>
            <p className="mt-1 text-sm text-neutral-500">Log in to your Funtush trekker account</p>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-neutral-900">Email</label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full rounded-lg border bg-white pl-9 pr-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:ring-2 border-neutral-300 focus:border-primary-500 focus:ring-primary-100"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-neutral-900">Password</label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    autoComplete="current-password"
                    className="w-full rounded-lg border bg-white pl-9 pr-11 py-2.5 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:ring-2 border-neutral-300 focus:border-primary-500 focus:ring-primary-100"
                  />
                  <button type="button" onClick={() => setShowPassword((p) => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me + Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2 select-none">
                  <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-4 w-4 cursor-pointer rounded border-neutral-300 accent-primary-600" />
                  <span className="text-sm text-neutral-700">Remember me</span>
                </label>

                <Link href={ROUTES.AUTH.FORGOT_PASSWORD} className="text-sm font-medium text-primary-600 hover:text-primary-700">Forgot password?</Link>
              </div>

              <button type="submit" disabled={isLoading} className="mt-2 w-full rounded-lg bg-primary-600 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-60">
                {isLoading ? 'Signing in...' : 'Log In'}
              </button>
            </form>

            <div className="mt-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-neutral-200" />
              <span className="text-xs text-neutral-400">OR</span>
              <div className="h-px flex-1 bg-neutral-200" />
            </div>

            <p className="mt-6 text-center text-sm text-neutral-700">
              New to Funtush?{' '}
              <Link href="/register" className="font-semibold text-primary-600 hover:underline">Create an account</Link>
              <br />
              <span className="text-xs text-neutral-500">as a trekker or a trekking agency.</span>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}