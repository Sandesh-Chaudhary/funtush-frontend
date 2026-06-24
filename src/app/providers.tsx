'use client';

import { ReactNode } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

/**
 * Initialize React Query client
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * Root providers wrapper
 * Wraps the app with necessary providers (React Query, Toast, etc.)
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {/* ── Toast notifications (top-right) ── */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#171717',
            border: '1px solid #e5e5e5',
            fontSize: '14px',
          },
        }}
      />
    </QueryClientProvider>
  );
}