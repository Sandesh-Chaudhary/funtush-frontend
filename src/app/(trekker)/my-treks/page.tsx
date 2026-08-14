'use client';

/**
 * My Treks Page 
 */

import { useState, useEffect, useMemo } from 'react';
import { Compass } from 'lucide-react';

import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils/cn';
import { getUserTreks } from '@/lib/treks';
import { TrekCard } from '@/components/trekker/treks/trek-card';
import type { TrekTabCategory, RawBooking, RawPackage, RawAgency, RawGuide } from '@/types/trek';

// Import JSON data
import bookingsData from '../../../../data/bookings.json';
import packagesData from '../../../../data/packages.json';
import agenciesData from '../../../../data/agencies.json';
import guidesData from '../../../../data/guides.json';

const bookings = bookingsData as RawBooking[];
const packages = packagesData as unknown as RawPackage[];
const agencies = agenciesData as RawAgency[];
const guides = guidesData as RawGuide[];

// ─── Tab Config ────────────────────────────

const TABS: Array<{ key: TrekTabCategory; label: string }> = [
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
];

const EMPTY_MESSAGES: Record<TrekTabCategory, string> = {
  upcoming: 'No upcoming treks',
  active: 'No active treks',
  completed: 'No completed treks',
  cancelled: 'No cancelled treks',
};

// ─── Component ────────────────────────────

export default function MyTreksPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TrekTabCategory>('upcoming');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setMounted(true);
}, []);

  const userTreks = useMemo(() => {
    if (!user) return [];
    return getUserTreks(user.id, bookings, packages, agencies, guides);
  }, [user]);

  const filteredTreks = useMemo(
    () => userTreks.filter((t) => t.category === activeTab),
    [userTreks, activeTab]
  );

  const counts = useMemo(() => {
    const result: Record<TrekTabCategory, number> = {
      upcoming: 0,
      active: 0,
      completed: 0,
      cancelled: 0,
    };
    userTreks.forEach((t) => result[t.category]++);
    return result;
  }, [userTreks]);

  return (
    <div className="mx-auto max-w-4xl space-y-6">

      {/* ── Page Header ── */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-neutral-900">My Treks</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Every trek you&apos;ve booked, across every agency, in one place.
        </p>
      </div>

      {/* ── Tabs (Pill Style) ── */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          const count = counts[tab.key];

          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-white text-neutral-700 hover:bg-neutral-50 border border-neutral-200'
              )}
            >
              {tab.label}
              <span
                suppressHydrationWarning
                className={cn(
                  'inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs font-semibold',
                  count === 0 && 'hidden',
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-neutral-100 text-neutral-600'
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Trek Cards List ── */}
      <div className="space-y-4">
        {!mounted ? (
          /* Loading skeleton while hydrating */
          <>
            {[1, 2].map((i) => (
              <div key={i} className="h-40 animate-pulse rounded-2xl bg-neutral-100" />
            ))}
          </>
        ) : filteredTreks.length > 0 ? (
          filteredTreks.map((trek, idx) => (
            <TrekCard key={trek.bookingId} trek={trek} variantIndex={idx} />
          ))
        ) : (
          /* Empty State */
          <div className="rounded-2xl border-2 border-dashed border-neutral-200 bg-white p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
              <Compass className="h-7 w-7 text-neutral-400" />
            </div>
            <p className="mt-4 text-base font-semibold text-neutral-700">
              {EMPTY_MESSAGES[activeTab]}
            </p>
            <p className="mt-1 text-sm text-neutral-500">
              Discover packages at{' '}
              <a
                href="https://funtush.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 font-medium hover:underline"
              >
                funtush.com
              </a>
            </p>
          </div>
        )}
      </div>

    </div>
  );
}