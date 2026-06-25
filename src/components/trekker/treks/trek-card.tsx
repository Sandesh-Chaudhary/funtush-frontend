'use client';

/**
 * TrekCard — displays a single trek on My Treks page
 */

import Link from 'next/link';
import { Calendar, Users, User, Building2, Clock } from 'lucide-react';

import { cn } from '@/lib/utils/cn';
import { formatCountdown } from '@/lib/treks';
import type { TrekViewModel } from '@/types/trek';

// ─── Status Badge Colors ────────────────────────────────────

const STATUS_STYLES: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  inquiry: 'bg-blue-100 text-blue-700',
  completed: 'bg-neutral-100 text-neutral-700',
  cancelled: 'bg-red-100 text-red-700',
  refunded: 'bg-red-100 text-red-700',
};

// ─── Format Date ────────────────────────────────────────────

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// ─── Component ──────────────────────────────────────────────

interface TrekCardProps {
  trek: TrekViewModel;
}

export function TrekCard({ trek }: TrekCardProps) {
  const statusStyle = STATUS_STYLES[trek.status] ?? 'bg-neutral-100 text-neutral-700';
  const countdownText = formatCountdown(trek.daysUntilDeparture, trek.status);

  return (
    <Link
      href={`/my-treks/${trek.bookingId}`}
      className="block rounded-xl border border-neutral-200 bg-white p-5 transition hover:border-primary-300 hover:shadow-md"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        {/* ── Left: Trek Info ── */}
        <div className="flex-1 space-y-3">

          {/* Title + Status badge */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-neutral-900">
              {trek.packageName}
            </h3>
            <span
              className={cn(
                'shrink-0 rounded-full px-3 py-1 text-xs font-medium capitalize',
                statusStyle
              )}
            >
              {trek.status}
            </span>
          </div>

          {/* Agency */}
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Building2 className="h-4 w-4" />
            <span>{trek.agencyName}</span>
          </div>

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-3 text-sm text-neutral-600 sm:grid-cols-3">

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(trek.departureDate)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{trek.groupSize} {trek.groupSize > 1 ? 'people' : 'person'}</span>
            </div>

            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{trek.guideName}</span>
            </div>

          </div>

        </div>

        {/* ── Right: Countdown ── */}
        <div className="shrink-0 sm:text-right">
          <div className="flex items-center gap-1 text-xs font-medium text-neutral-500 sm:justify-end">
            <Clock className="h-3 w-3" />
            <span>{countdownText}</span>
          </div>
          <p className="mt-1 text-sm font-semibold text-neutral-900">
            ${trek.totalPrice.toLocaleString()}
          </p>
        </div>

      </div>
    </Link>
  );
}