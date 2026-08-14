'use client';

/**
 * Register - Step 1 (Redesigned)
 * 
 * User enters email/password and selects their role
 * Centered card design with left purple panel
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, Briefcase, Check } from 'lucide-react';

import { AuthLeftPanel } from '@/components/auth/AuthLeftPanel';
import { cn } from '@/lib/utils/cn';

// ─── Types ─────────────────────────────────────

type Role = 'trekker' | 'agency';

interface SignupDraft {
  email: string;
  password: string;
  role: Role;
}

const DRAFT_KEY = 'funtush_signup_draft';

// ─── Component ─────────────────────────────────

export default function RegisterStep1Page() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    role?: string;
  }>({});

  const [isLoading, setIsLoading] = useState(false);

  function validate() {
    const newErrors: typeof errors = {};

    if (!email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = 'Please enter a valid email';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8)
      newErrors.password = 'Password must be at least 8 characters';

    if (!role) newErrors.role = 'Please select what you want to do';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleContinue(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate() || !role) return;

    setIsLoading(true);

    const draft: SignupDraft = { email, password, role };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));

    const nextPath = role === 'trekker' ? '/register/trekker' : '/register/agency';
    router.push(nextPath);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4 py-8">

      {/* ═══════════════════════════════════════════ */}
      {/* CENTERED CARD                              */}
      {/* ═══════════════════════════════════════════ */}
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl md:grid-cols-2">

        {/* LEFT — Purple Panel with custom tagline */}
        <AuthLeftPanel
          tagline="One account. Every trek, or your whole agency."
          description="Tell us what you're here to do — the next step only asks for what actually applies to you."
        />

        {/* RIGHT — Register Form */}
        <div className="flex items-center justify-center bg-white px-8 py-10 sm:px-12">

          <div className="w-full max-w-sm">

            {/* ── Progress Bar ── */}
            <ProgressBar step={1} labels={['Account', 'Details']} />

            {/* ── Title ── */}
            <div className="mt-6">
              <h2 className="text-2xl font-bold text-neutral-900">
                Create your account
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                Start with your login — we&apos;ll tailor the next step to you
              </p>
            </div>

            {/* ── Form ── */}
            <form onSubmit={handleContinue} noValidate className="mt-6 space-y-4">

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-neutral-900">
                  Email
                </label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                    }}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={cn(
                      'w-full rounded-lg border bg-white pl-9 pr-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors',
                      'placeholder:text-neutral-400 focus:ring-2',
                      errors.email
                        ? 'border-danger-400 focus:border-danger-500 focus:ring-danger-100'
                        : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-100'
                    )}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-danger-600">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-neutral-900">
                  Password
                </label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((p) => ({ ...p, password: undefined }));
                    }}
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
                    className={cn(
                      'w-full rounded-lg border bg-white pl-9 pr-11 py-2.5 text-sm text-neutral-900 outline-none transition-colors',
                      'placeholder:text-neutral-400 focus:ring-2',
                      errors.password
                        ? 'border-danger-400 focus:border-danger-500 focus:ring-danger-100'
                        : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-100'
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-danger-600">{errors.password}</p>
                )}
              </div>

              {/* ── Role Selector ── */}
              <div className="pt-2">
                <p className="text-sm font-semibold text-neutral-900">
                  What are you here to do?
                </p>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">

                  {/* Trekker Card */}
                  <RoleCard
                    icon={<User className="h-5 w-5" />}
                    title="I want to book treks"
                    description="Browse agencies, book departures, and track your trips in one place."
                    selected={role === 'trekker'}
                    onClick={() => {
                      setRole('trekker');
                      if (errors.role) setErrors((p) => ({ ...p, role: undefined }));
                    }}
                  />

                  {/* Agency Card */}
                  <RoleCard
                    icon={<Briefcase className="h-5 w-5" />}
                    title="I run a trekking agency"
                    description="Set up your workspace, list your treks, and manage bookings and guides."
                    selected={role === 'agency'}
                    onClick={() => {
                      setRole('agency');
                      if (errors.role) setErrors((p) => ({ ...p, role: undefined }));
                    }}
                  />

                </div>

                {errors.role && (
                  <p className="mt-2 text-xs text-danger-600">{errors.role}</p>
                )}
              </div>

              {/* Continue Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 w-full rounded-lg bg-primary-600 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-60"
              >
                Continue
              </button>
            </form>

            {/* ── Divider ── */}
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-neutral-200" />
              <span className="text-xs text-neutral-400">OR</span>
              <div className="h-px flex-1 bg-neutral-200" />
            </div>

            {/* ── Bottom Link ── */}
            <p className="mt-6 text-center text-sm text-neutral-700">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-semibold text-primary-600 hover:underline"
              >
                Log in
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Progress Bar ────────────────────────────

function ProgressBar({ step, labels }: { step: number; labels: string[] }) {
  return (
    <div className="flex items-center gap-3">
      {labels.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === step;
        const isCompleted = stepNumber < step;
        const showLine = index < labels.length - 1;

        return (
          <div key={label} className="flex flex-1 items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors',
                  isCompleted
                    ? 'bg-primary-600 text-white'
                    : isActive
                    ? 'border-2 border-primary-600 bg-white text-primary-600'
                    : 'border-2 border-neutral-300 bg-white text-neutral-400'
                )}
              >
                {isCompleted ? <Check className="h-3 w-3" /> : stepNumber}
              </div>
              <span
                className={cn(
                  'text-sm font-medium',
                  isActive || isCompleted ? 'text-neutral-900' : 'text-neutral-400'
                )}
              >
                {label}
              </span>
            </div>

            {showLine && (
              <div className={cn(
                'h-px flex-1',
                isCompleted ? 'bg-primary-600' : 'bg-neutral-200'
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Role Card ───────────────────────────────

interface RoleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

function RoleCard({ icon, title, description, selected, onClick }: RoleCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'relative flex flex-col items-start gap-2 rounded-xl border-2 p-3 text-left transition-all',
        selected
          ? 'border-primary-600 bg-primary-50'
          : 'border-neutral-200 bg-white hover:border-neutral-300'
      )}
    >
      {/* Radio indicator (top-right) */}
      <div className={cn(
        'absolute right-2.5 top-2.5 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors',
        selected ? 'border-primary-600 bg-primary-600' : 'border-neutral-300 bg-white'
      )}>
        {selected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
      </div>

      {/* Icon */}
      <div className={cn(
        'flex h-8 w-8 items-center justify-center rounded-lg',
        selected ? 'bg-primary-100 text-primary-600' : 'bg-neutral-100 text-neutral-600'
      )}>
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-sm font-bold text-neutral-900">
        {title}
      </h3>

      {/* Description */}
      <p className="text-xs text-neutral-500 leading-relaxed">
        {description}
      </p>
    </button>
  );
}