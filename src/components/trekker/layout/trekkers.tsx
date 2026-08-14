'use client';

/**
 * TrekkerTopbar 
 */

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Map, Bell, User as UserIcon, LogOut, Mountain, ChevronDown } from 'lucide-react';

import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/lib/constants/routes';
import { cn } from '@/lib/utils/cn';
import { getReadNotificationIds } from '@/lib/auth';

// ─── Constants ────────────────────────────────

const NAV_LINKS = [
  { key: 'my-treks', label: 'My Treks', href: ROUTES.TREKKER.MY_TREKS, icon: Map },
  { key: 'notifications', label: 'Notifications', href: '/notifications', icon: Bell },
  { key: 'profile', label: 'Profile', href: ROUTES.TREKKER.PROFILE, icon: UserIcon },
];

const TOTAL_NOTIFICATIONS = 5;

// ─── Helper: Get User Initials ─────────────────

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

// ─── Component ────────────────────────────────

export function TrekkerTopbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Track unread notifications
  useEffect(() => {
    const updateCount = () => {
      const readIds = getReadNotificationIds();
      setUnreadCount(Math.max(0, TOTAL_NOTIFICATIONS - readIds.length));
    };

    updateCount();

    window.addEventListener('focus', updateCount);
    return () => window.removeEventListener('focus', updateCount);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [dropdownOpen]);

  const userName = user?.name ?? 'Guest';
  const initials = getInitials(userName);
  const hasUnread = unreadCount > 0;

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ═════════════════════════════════════════ */}
        {/* LEFT — Brand                              */}
        {/* ═════════════════════════════════════════ */}
        <Link
          href={ROUTES.TREKKER.MY_TREKS}
          className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
        >
          <Mountain className="h-5 w-5 text-primary-600" strokeWidth={2.5} />
          <span className="text-lg font-bold tracking-tight text-primary-600">
            FUNTUSH.
          </span>
        </Link>

        {/* ═════════════════════════════════════════ */}
        {/* CENTER — Navigation                       */}
        {/* ═════════════════════════════════════════ */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname.startsWith(link.href);
            const showBadge = link.key === 'notifications' && hasUnread;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
                {showBadge && (
                  <span className="ml-0.5 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-danger-500 px-1 text-[10px] font-semibold text-white">
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* ═════════════════════════════════════════ */}
        {/* RIGHT — Bell + Avatar                      */}
        {/* ═════════════════════════════════════════ */}
        <div className="flex items-center gap-3">

          {/* Notification Bell */}
          <Link
            href="/notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {hasUnread && (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger-500 ring-2 ring-white" />
            )}
          </Link>

          {/* Avatar with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1 rounded-full transition-all hover:opacity-80"
              aria-label="User menu"
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white"
                suppressHydrationWarning
              >
                {initials}
              </div>
              <ChevronDown
                className={cn(
                  'h-3 w-3 text-neutral-500 transition-transform',
                  dropdownOpen && 'rotate-180'
                )}
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg">

                {/* User Info */}
                <div className="border-b border-neutral-100 px-4 py-3">
                  <p className="truncate text-sm font-semibold text-neutral-900" suppressHydrationWarning>
                    {userName}
                  </p>
                  <p className="truncate text-xs text-neutral-500" suppressHydrationWarning>
                    {user?.email ?? 'guest@funtush.com'}
                  </p>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <Link
                    href={ROUTES.TREKKER.PROFILE}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 transition-colors hover:bg-neutral-50"
                  >
                    <UserIcon className="h-4 w-4" />
                    View Profile
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-danger-600 transition-colors hover:bg-danger-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}