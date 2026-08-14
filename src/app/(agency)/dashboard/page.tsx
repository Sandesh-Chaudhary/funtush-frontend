'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

import ActiveGuides from '@/components/agency/dashboard/ActiveGuides';
import BookingStatus from '@/components/agency/dashboard/BookingStatus';
import DashboardHeader from '@/components/agency/dashboard/DashboardHeader';
import QuickState from '@/components/agency/dashboard/QuickState';
import RecentActivity from '@/components/agency/dashboard/RecentActivity';
import RecentBookings from '@/components/agency/dashboard/RecentBookings';
import RevenueOverview from '@/components/agency/dashboard/RevenueOverview';
import StatCards from '@/components/agency/dashboard/StatCards';
import TopDestinations from '@/components/agency/dashboard/TopDestinations';
import UpcomingTreks from '@/components/agency/dashboard/UpcomingTreks';

const agencyId = 'ag-001';

export default function AgencyDashboardPage() {
  const activeSos = ''; // Placeholder for active SOS check
  return (
    <div className="space-y-4 text-neutral-900">
      <LargeScreenOnly />

      {activeSos && (
        <div className="rounded-2xl border border-danger-300 bg-danger-50 px-4 py-3 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-danger-600 text-white">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-danger-900">Active safety attention required</p>
                <p className="text-xs text-danger-700">
                  An active trek is currently in progress. Review the safety dashboard for live status.
                </p>
              </div>
            </div>
            <Link href="/dashboard/safety" className="text-xs font-semibold text-danger-800 hover:underline">
              View safety →
            </Link>
          </div>
        </div>
      )}

      <div>
        <StatCards agencyId={agencyId} />
      </div>

      <div className="grid gap-2 lg:grid-cols-2 xl:grid-cols-[1.55fr_1fr_1fr]">
        <RevenueOverview agencyId={agencyId} />
        <BookingStatus agencyId={agencyId} />
        <UpcomingTreks agencyId={agencyId} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.55fr_1fr_1fr_1fr]">
        <RecentBookings agencyId={agencyId} />
        <ActiveGuides />
        <TopDestinations /> {/* Placeholder */}
        <QuickState /> {/* Placeholder */}
      </div>
      <div>
        <RecentActivity /> {/* Placeholder */}
      </div>
    </div>
  );
}

function LargeScreenOnly() {
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    (() => setIsLarge(mediaQuery.matches))();

    const handleChange = (event: MediaQueryListEvent) => {
      setIsLarge(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  if (!isLarge) return null;

  return (
    <div className="mb-8">
      <DashboardHeader />
    </div>
  );
}
