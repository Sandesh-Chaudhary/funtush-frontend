'use client';

/**
 * Agency Registration Details Page
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Building2, Phone, Globe, Info, Check } from 'lucide-react';
import toast from 'react-hot-toast';

import { AuthLeftPanel } from '@/components/auth/AuthLeftPanel';
import { cn } from '@/lib/utils/cn';
import { saveSessionEverywhere } from '@/lib/auth';
import type { SessionUser } from '@/types/user';

interface SignupDraft {
  email: string;
  password: string;
  role: 'trekker' | 'agency';
}

const DRAFT_KEY = 'funtush_signup_draft';

function toSubdomain(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 30);
}

export default function AgencyWorkspacePage() {
  const router = useRouter();

  const [draft, setDraft] = useState<SignupDraft | null>(null);
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');

  const [errors, setErrors] = useState<{
    businessName?: string;
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
      if (parsed.role !== 'agency') {
        router.push('/register/trekker');
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

    if (!businessName.trim()) newErrors.businessName = 'Business name is required';
    else if (businessName.trim().length < 2) newErrors.businessName = 'Name too short';

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
      await new Promise((r) => setTimeout(r, 700));

      const session: SessionUser = {
        id: `user-agency-${Date.now()}`,
        role: 'agency_admin',
        agency_id: `ag-new-${Date.now()}`,
        name: businessName.trim(),
        email: draft.email,
        country: country.trim(),
        phone: phone.trim(),
        member_since: new Date().toISOString().split('T')[0],
        token: `mock-jwt-agency-${Date.now()}`,
      };

      saveSessionEverywhere(session);
      localStorage.removeItem(DRAFT_KEY);

      toast.success('Agency workspace created! Welcome 🎉');

      setTimeout(() => {
        router.push('/dashboard');
      }, 700);
    } catch {
      toast.error('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  }

  const subdomain = businessName ? toSubdomain(businessName) : 'yourbusiness';

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
            <ProgressBar step={2} labels={['Account', 'Workplace']} />

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
                Set up your agency
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                This creates your workspace and a 14-day free trial
              </p>
            </div>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">

              {/* Business Name */}
              <div>
                <label htmlFor="businessName" className="block text-sm font-semibold text-neutral-900">
                  Business name
                </label>
                <div className="relative mt-1">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input
                    id="businessName"
                    type="text"
                    value={businessName}
                    onChange={(e) => {
                      setBusinessName(e.target.value);
                      if (errors.businessName) setErrors((p) => ({ ...p, businessName: undefined }));
                    }}
                    placeholder="Himalayan Legends Treks"
                    autoComplete="organization"
                    className={cn(
                      'w-full rounded-lg border bg-white pl-9 pr-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors',
                      'placeholder:text-neutral-400 focus:ring-2',
                      errors.businessName
                        ? 'border-danger-400 focus:border-danger-500 focus:ring-danger-100'
                        : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-100'
                    )}
                  />
                </div>
                {errors.businessName && (
                  <p className="mt-1 text-xs text-danger-600">{errors.businessName}</p>
                )}
              </div>

              {/* Subdomain Preview */}
              <div className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2">
                <div className="flex items-center gap-2 text-sm text-neutral-700">
                  <Globe className="h-4 w-4 text-neutral-500" />
                  <span className="text-xs">Your site will be </span>
                  <span className="text-xs font-semibold text-neutral-900">
                    {subdomain}.funtush.com
                  </span>
                </div>
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

              {/* Info Box */}
              <div className="flex gap-2 rounded-lg bg-primary-50 px-3 py-2.5">
                <Info className="h-4 w-4 shrink-0 text-primary-600 mt-0.5" />
                <p className="text-xs text-primary-700 leading-relaxed">
                  This creates a users record (role: <strong>agency_admin</strong>) and provisions a new agency tenant on the 14-day trial tier.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 w-full rounded-lg bg-primary-600 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-60"
              >
                {isLoading ? 'Creating workspace...' : 'Create agency workplace'}
              </button>
            </form>

            {/* ── Footer Note ── */}
            <p className="mt-4 text-center text-sm text-neutral-500">
              Next: a short onboarding wizard, then your dashboard.
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