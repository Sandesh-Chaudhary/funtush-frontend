'use client';

/**
 * Trekker Registration Details Page
 * Centered card design
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Phone, Globe, Check } from 'lucide-react';
import toast from 'react-hot-toast';

import { AuthLeftPanel } from '@/components/auth/AuthLeftPanel';
import { cn } from '@/lib/utils/cn';
import { saveSessionEverywhere } from '@/lib/auth';
import type { SessionUser } from '@/types/user';

// ─── Types ─────────────────────────────────────

interface SignupDraft {
  email: string;
  password: string;
  role: 'trekker' | 'agency';
}

const DRAFT_KEY = 'funtush_signup_draft';

// ─── Component ─────────────────────────────────

export default function TrekkerDetailsPage() {
  const router = useRouter();

  const [draft, setDraft] = useState<SignupDraft | null>(null);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');

  const [errors, setErrors] = useState<{
    fullName?: string;
    phone?: string;
    country?: string;
  }>({});

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) {
      toast.error('Please start signup from the beginning');
      router.push('/register');
      return;
    }

    try {
      const parsed = JSON.parse(raw) as SignupDraft;
      if (parsed.role !== 'trekker') {
        router.push('/register/agency');
        return;
      }
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDraft(parsed);
    } catch {
      router.push('/register');
    }
  }, [router]);

  function validate() {
    const newErrors: typeof errors = {};

    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    else if (fullName.trim().length < 2) newErrors.fullName = 'Name too short';

    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    else {
      const digitCount = phone.replace(/\D/g, '').length;
      if (digitCount < 7) newErrors.phone = 'Phone must have at least 7 digits';
      else if (digitCount > 15) newErrors.phone = 'Phone number too long';
    }

    if (!country.trim()) newErrors.country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate() || !draft) return;

    setIsLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 600));

      const session: SessionUser = {
        id: `user-new-${Date.now()}`,
        role: 'trekker',
        agency_id: null,
        name: fullName.trim(),
        email: draft.email,
        country: country.trim(),
        phone: phone.trim(),
        member_since: new Date().toISOString().split('T')[0],
        token: `mock-jwt-new-${Date.now()}`,
      };

      saveSessionEverywhere(session);
      localStorage.removeItem(DRAFT_KEY);

      toast.success('Account created! Welcome to Funtush 🎉');

      setTimeout(() => {
        router.push('/my-treks');
      }, 600);
    } catch {
      toast.error('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  }

  if (!draft) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4 py-8">

      {/* CENTERED CARD */}
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl md:grid-cols-2">

        {/* LEFT — Purple Panel */}
        <AuthLeftPanel
          tagline="One account. Every trek, or your whole agency."
          description="Tell us what you're here to do — the next step only asks for what actually applies to you."
        />

        {/* RIGHT — Form */}
        <div className="flex items-center justify-center bg-white px-8 py-10 sm:px-12">

          <div className="w-full max-w-sm">

            {/* ── Progress Bar ── */}
            <ProgressBar step={2} labels={['Account', 'Details']} />

            {/* ── Back Link ── */}
            <button
              type="button"
              onClick={() => router.back()}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition hover:text-neutral-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            {/* ── Title ── */}
            <div className="mt-4">
              <h2 className="text-2xl font-bold text-neutral-900">
                Tell us about you
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                Just a few details and you&apos;re in
              </p>
            </div>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">

              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-neutral-900">
                  Full Name
                </label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors((p) => ({ ...p, fullName: undefined }));
                    }}
                    placeholder="Sophia Laurent"
                    autoComplete="name"
                    className={cn(
                      'w-full rounded-lg border bg-white pl-9 pr-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors',
                      'placeholder:text-neutral-400 focus:ring-2',
                      errors.fullName
                        ? 'border-danger-400 focus:border-danger-500 focus:ring-danger-100'
                        : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-100'
                    )}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-xs text-danger-600">{errors.fullName}</p>
                )}
              </div>

              {/* Phone + Country */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-neutral-900">
                    Phone Number
                  </label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^\d\s+\-()]/g, '');
                        setPhone(value);
                        if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                      }}
                      placeholder="+33 6 12 34 56 78"
                      autoComplete="tel"
                      className={cn(
                        'w-full rounded-lg border bg-white pl-9 pr-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors',
                        'placeholder:text-neutral-400 focus:ring-2',
                        errors.phone
                          ? 'border-danger-400 focus:border-danger-500 focus:ring-danger-100'
                          : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-100'
                      )}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-xs text-danger-600">{errors.phone}</p>
                  )}
                </div>

                {/* Country */}
                <div>
                  <label htmlFor="country" className="block text-sm font-semibold text-neutral-900">
                    Country
                  </label>
                  <div className="relative mt-1">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      id="country"
                      type="text"
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                        if (errors.country) setErrors((p) => ({ ...p, country: undefined }));
                      }}
                      placeholder="Nepal"
                      autoComplete="country-name"
                      className={cn(
                        'w-full rounded-lg border bg-white pl-9 pr-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors',
                        'placeholder:text-neutral-400 focus:ring-2',
                        errors.country
                          ? 'border-danger-400 focus:border-danger-500 focus:ring-danger-100'
                          : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-100'
                      )}
                    />
                  </div>
                  {errors.country && (
                    <p className="mt-1 text-xs text-danger-600">{errors.country}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 w-full rounded-lg bg-primary-600 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-60"
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </button>
            </form>

            {/* ── Footer Note ── */}
            <p className="mt-4 text-center text-sm text-neutral-500">
              You&apos;ll be redirected to My treks right away.
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