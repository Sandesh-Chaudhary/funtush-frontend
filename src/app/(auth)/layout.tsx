/**
 * Authentication Layout
 * Full-screen centered card with Funtush logo at top
 * Used by: /login, /forgot-password
 */

import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-4 py-12 sm:px-6 lg:px-8">

      {/* ── Funtush Logo ── */}
      <div className="mb-8 flex flex-col items-center">
        <Image
          src="/funtush-logo.png"
          alt="Funtush Logo"
          width={90}
          height={18}
          priority
          className="object-contain"
        />
      </div>

      <div className="w-full max-w-md">
        {children}
      </div>

    </div>
  );
}