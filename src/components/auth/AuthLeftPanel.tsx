'use client';

/**
 * AuthLeftPanel
 * 
 * Shared purple panel used on the left side of all auth pages
 * (Login, Register Step 1, Register Step 2 - Trekker, Register Step 2 - Agency)
 * 
 * Contains: FUNTUSH branding + tagline + feature list
 */

import { MapPin, AlertTriangle, ShoppingBag, Mountain } from 'lucide-react';

const FEATURES = [
  { icon: MapPin, label: 'Real-time trek tracking' },
  { icon: AlertTriangle, label: 'One-tap emergency SOS' },
  { icon: ShoppingBag, label: 'Digital packing checklist' },
];

export function AuthLeftPanel() {
  return (
    <div className="relative hidden min-h-screen bg-primary-600 md:flex md:flex-col md:justify-center md:px-12 lg:px-16">

      {/* ── Brand ── */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
          <Mountain className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight">
          FUNTUSH
        </h1>
      </div>

      {/* ── Tagline ── */}
      <p className="mt-6 text-base font-medium text-white/90 leading-relaxed max-w-sm">
        Your treks, your guide contacts, your safety, all in one place.
      </p>

      {/* ── Description ── */}
      <p className="mt-4 text-sm text-white/80 leading-relaxed max-w-sm">
        Log in to see your upcoming departures, chat with your guide, and access live SOS during your trek.
      </p>

      {/* ── Feature List ── */}
      <div className="mt-10 space-y-4">
        {FEATURES.map((feature) => (
          <div key={feature.label} className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 backdrop-blur-sm">
              <feature.icon className="h-4 w-4 text-white" strokeWidth={2} />
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