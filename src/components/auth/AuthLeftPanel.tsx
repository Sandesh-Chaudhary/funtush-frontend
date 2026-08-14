'use client';

/**
 * AuthLeftPanel
 * 
 * Shared purple panel for auth pages
 * Accepts custom tagline (login vs register have different tag lines)
 */

import { MapPin, AlertTriangle, ShoppingBag, Mountain } from 'lucide-react';

const FEATURES = [
  { icon: MapPin, label: 'Real-time trek tracking' },
  { icon: AlertTriangle, label: 'One-tap emergency SOS' },
  { icon: ShoppingBag, label: 'Digital packing checklist' },
];

interface AuthLeftPanelProps {
  tagline?: string;
  description?: string;
}

export function AuthLeftPanel({
  tagline = 'Your treks, your guide contacts, your safety — all in one place.',
  description = 'Log in to see your upcoming departures, chat with your guide, and access live SOS during your trek.',
}: AuthLeftPanelProps) {
  return (
    <div className="relative hidden overflow-hidden bg-primary-600 md:flex md:flex-col md:justify-center md:px-10 lg:px-12">

      {/* Decorative circles (top-right + bottom-left) */}
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-white/10" />
      <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-white/10" />

      {/* ── Brand ── */}
      <div className="relative flex items-center gap-2">
        <Mountain className="h-6 w-6 text-white" strokeWidth={2.5} />
        <h1 className="text-2xl font-bold text-white tracking-tight">
          FUNTUSH.
        </h1>
      </div>

      {/* ── Tagline ── */}
      <p className="relative mt-8 text-xl font-bold text-white leading-tight max-w-sm">
        {tagline}
      </p>

      {/* ── Description ── */}
      <p className="relative mt-4 text-sm text-white/85 leading-relaxed max-w-sm">
        {description}
      </p>

      {/* ── Feature List ── */}
      <div className="relative mt-10 space-y-3">
        {FEATURES.map((feature) => (
          <div key={feature.label} className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/15">
              <feature.icon className="h-3.5 w-3.5 text-white" strokeWidth={2} />
            </div>
            <span className="text-sm font-medium text-white">
              {feature.label}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}