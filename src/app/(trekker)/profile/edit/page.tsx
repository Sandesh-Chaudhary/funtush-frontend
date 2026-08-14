'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Profile Edit  redirect page

 * Redirects to /profile
 */

export default function ProfileEditRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/profile');
  }, [router]);

  return null;
}