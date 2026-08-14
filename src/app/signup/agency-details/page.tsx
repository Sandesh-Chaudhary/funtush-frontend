'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  MapPin,
  AlertTriangle,
  ShoppingBag,
  Check,
  Mountain,
  ChevronLeft,
} from 'lucide-react';

export default function AgencyDetailsPage() {
  const router = useRouter();

  const [agencyName, setAgencyName] = useState('Highland Treks');
  const [agencyPhone, setAgencyPhone] = useState('+977 9812345678');
  const [country, setCountry] = useState('Nepal');
  const [workEmail, setWorkEmail] = useState('');
  const [registrationNum, setRegistrationNum] = useState('');

  const handleCreateWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-neutral-600 p-4 sm:p-6 select-none">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        
        {/* Left Branding Panel */}
        <div className="relative hidden w-[42%] flex-col justify-between bg-[#5B50FB] p-10 text-white md:flex">
          <div className="absolute top-0 left-0 h-20 w-20 rounded-br-full bg-white/10" />

          <div className="relative z-10 flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#5B50FB]">
              <Mountain className="h-5 w-5 fill-current" />
            </div>
            <span className="text-2xl font-black tracking-wide uppercase">FUNTUSH</span>
          </div>

          <div className="relative z-10 my-auto space-y-4 py-8">
            <h1 className="text-xl font-bold leading-snug">
              Your treks, your guide contacts, your safety, all in one place.
            </h1>
            <p className="text-xs font-normal text-white/80 leading-relaxed">
              Log in to see your upcoming departures, chat with your guide, and access live SOS during your trek.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10">
                  <MapPin className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-xs font-medium text-white">Real-time trek tracking</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10">
                  <AlertTriangle className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-xs font-medium text-white">One-tap emergency SOS</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10">
                  <ShoppingBag className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-xs font-medium text-white">Digital packing checklist</span>
              </div>
            </div>
          </div>

          <div />
        </div>

        {/* Right Form Panel */}
        <div className="flex w-full flex-col justify-center px-8 py-10 md:w-[58%] md:px-14">
          <div className="mx-auto w-full max-w-sm">
            
            {/* Step Bar (Step 2 Active) */}
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5B50FB] text-xs font-bold text-white">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <span className="text-xs font-semibold text-[#5B50FB]">Account</span>
              </div>

              <div className="h-[1px] w-24 bg-[#5B50FB]" />

              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-neutral-800 text-xs font-bold text-neutral-800">
                  2
                </div>
                <span className="text-xs font-bold text-neutral-800">Details</span>
              </div>
            </div>

            {/* Back Button */}
            <Link
              href="/signup"
              className="mb-4 flex items-center gap-1 text-xs font-semibold text-neutral-600 transition hover:text-neutral-900"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Link>

            {/* Form Title */}
            <div className="mb-6 text-left">
              <h2 className="text-2xl font-black text-neutral-900">
                Tell us about your agency
              </h2>
              <p className="mt-1 text-xs text-neutral-500">
                Set up your agency workspace and start listing treks
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateWorkspace} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">
                  Agency Name
                </label>
                <input
                  type="text"
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                  placeholder="e.g. Highland Treks"
                  className="w-full rounded-lg border border-neutral-200 px-3.5 py-2 text-xs text-neutral-800 outline-none focus:border-[#5B50FB]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Agency Phone
                  </label>
                  <input
                    type="text"
                    value={agencyPhone}
                    onChange={(e) => setAgencyPhone(e.target.value)}
                    placeholder="+977 9812345678"
                    className="w-full rounded-lg border border-neutral-200 px-3.5 py-2 text-xs text-neutral-800 outline-none focus:border-[#5B50FB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Nepal"
                    className="w-full rounded-lg border border-neutral-200 px-3.5 py-2 text-xs text-neutral-800 outline-none focus:border-[#5B50FB]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">
                  Official Work Email
                </label>
                <input
                  type="email"
                  value={workEmail}
                  onChange={(e) => setWorkEmail(e.target.value)}
                  placeholder="contact@agency.com"
                  className="w-full rounded-lg border border-neutral-200 px-3.5 py-2 text-xs text-neutral-800 outline-none focus:border-[#5B50FB]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">
                  Business Registration Number <span className="font-normal text-neutral-400">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={registrationNum}
                  onChange={(e) => setRegistrationNum(e.target.value)}
                  placeholder="REG-123456"
                  className="w-full rounded-lg border border-neutral-200 px-3.5 py-2 text-xs text-neutral-800 outline-none focus:border-[#5B50FB]"
                />
              </div>

              <button
                type="submit"
                className="mt-4 w-full cursor-pointer rounded-xl bg-[#5B50FB] py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#4a3fe4] active:scale-[0.99]"
              >
                Create agency workspace
              </button>

              <p className="pt-1 text-center text-[11px] text-neutral-500">
                You'll be redirected to your <span className="font-bold text-neutral-800">Agency Dashboard</span> right away.
              </p>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}