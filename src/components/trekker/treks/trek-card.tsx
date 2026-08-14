'use client';

/**
 * TrekCard 
 */

import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { Calendar, Users, Compass } from 'lucide-react';
import type { TrekViewModel } from '@/types/trek';

// ─── Gradient Colors Per Category ─────────────────

const CATEGORY_GRADIENTS: Record<string, string> = {
  active: 'bg-gradient-to-r from-emerald-500 to-green-500',
  upcoming: 'bg-gradient-to-r from-indigo-500 to-purple-500',
  completed: 'bg-gradient-to-r from-neutral-500 to-neutral-600',
  cancelled: 'bg-gradient-to-r from-red-400 to-rose-500',
};

// Cycle through gradients for upcoming treks (to add variety)
const UPCOMING_VARIANTS = [
  'bg-gradient-to-r from-indigo-500 to-purple-500',
  'bg-gradient-to-r from-cyan-500 to-blue-500',
  'bg-gradient-to-r from-blue-500 to-indigo-500',
];

// ─── Icon Per Category ─────────────────

const CATEGORY_ICONS: Record<string, string> = {
  active: '🏔️',
  upcoming: '🏔️',
  completed: '✅',
  cancelled: '❌',
};

// ─── Format Date Range ─────────────────

function formatDateRange(dateStr: string, durationDays: number): string {
  const start = new Date(dateStr);
  const end = new Date(start);
  end.setDate(end.getDate() + durationDays - 1);

  const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return `${startStr} – ${endStr}`;
}

function getDaysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const departure = new Date(dateStr);
  departure.setHours(0, 0, 0, 0);
  return Math.ceil((departure.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function getAgencyInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
}

// ─── Status Pill Styles ─────────────────

const STATUS_PILL_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
  confirmed: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  active: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  inquiry: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
  completed: { bg: 'bg-neutral-100', text: 'text-neutral-700', dot: 'bg-neutral-500' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
  refunded: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
};

// ─── Component ─────────────────

interface TrekCardProps {
  trek: TrekViewModel;
  variantIndex?: number; // for upcoming card color variety
}

export function TrekCard({ trek, variantIndex = 0 }: TrekCardProps) {

  // Pick gradient based on category (upcoming cycles through variants)
  let gradientClass = CATEGORY_GRADIENTS[trek.category] ?? CATEGORY_GRADIENTS.upcoming;
  if (trek.category === 'upcoming') {
    gradientClass = UPCOMING_VARIANTS[variantIndex % UPCOMING_VARIANTS.length];
  }

  const icon = CATEGORY_ICONS[trek.category] ?? '🏔️';
  const daysUntil = getDaysUntil(trek.departureDate);
  const agencyInitials = getAgencyInitials(trek.agencyName);
  const pillStyle = STATUS_PILL_STYLES[trek.status] ?? STATUS_PILL_STYLES.confirmed;

  // Status label based on category
  const statusLabel = getStatusLabel(trek);

  return (
    <Link
      href={`/my-treks/${trek.bookingId}`}
      className="block overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all hover:shadow-md"
    >

      {/* ═══════════════════════════════════════════ */}
      {/* GRADIENT HEADER                            */}
      {/* ═══════════════════════════════════════════ */}
      <div className={cn('px-5 py-4', gradientClass)}>
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm text-lg">
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="truncate text-lg font-bold text-white">
              {trek.packageName}
            </h3>
            <p className="mt-0.5 text-sm text-white/85">
              {trek.agencyName}
            </p>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* WHITE BODY                                 */}
      {/* ═══════════════════════════════════════════ */}
      <div className="px-5 py-4 space-y-3">

        {/* Agency Row */}
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">
            {agencyInitials}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-neutral-600">
            <span className="font-medium text-neutral-900">{trek.agencyName}</span>
            <span>·</span>
            <span>Nepal</span>
          </div>
        </div>

        {/* Meta Row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-600">

          {/* Date OR Day X of Y */}
          {trek.category === 'active' ? (
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>Day 4 of {trek.durationDays}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{formatDateRange(trek.departureDate, trek.durationDays)}</span>
            </div>
          )}

          {/* Duration */}
          {trek.category !== 'active' && (
            <div className="flex items-center gap-1.5">
              <Compass className="h-4 w-4" />
              <span>{trek.durationDays} Days</span>
            </div>
          )}

          {/* Guide (only for active) */}
          {trek.category === 'active' && trek.guideName && (
            <div className="flex items-center gap-1.5">
              <Compass className="h-4 w-4" />
              <span>Guide: <span className="font-medium text-neutral-900">{trek.guideName}</span></span>
            </div>
          )}

          {/* Group Size */}
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            <span>{trek.groupSize} pax</span>
          </div>
        </div>

        {/* Status Row */}
        <div className="flex items-center justify-between pt-1">
          <div className={cn('inline-flex items-center gap-1.5 rounded-full px-3 py-1', pillStyle.bg)}>
            <span className={cn('h-1.5 w-1.5 rounded-full', pillStyle.dot)} />
            <span className={cn('text-xs font-semibold', pillStyle.text)}>
              {statusLabel}
            </span>
          </div>

          {/* Live tracking indicator (only for active) */}
          {trek.category === 'active' && (
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              <span className="text-xs font-medium text-neutral-600">Live tracking on</span>
            </div>
          )}

          {/* Departs in X days (only for upcoming) */}
          {trek.category === 'upcoming' && daysUntil > 0 && (
            <span className="text-xs font-medium text-neutral-500">
              Departs in {daysUntil} days
            </span>
          )}
        </div>

      </div>
    </Link>
  );
}

// ─── Helper: Status Label ─────────────────

function getStatusLabel(trek: TrekViewModel): string {
  if (trek.category === 'active') return 'Active — On Trail';
  if (trek.category === 'completed') return 'Completed';
  if (trek.category === 'cancelled') return 'Cancelled';

  // upcoming
  if (trek.status === 'confirmed') return 'Confirmed';
  if (trek.status === 'pending') return 'Pending';

  return 'Upcoming';
}