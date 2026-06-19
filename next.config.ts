import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* ... keeping any other existing config options here ... */
  
  experimental: {
    turbopack: {
      root: __dirname,
    },
  } as any,
};

export default nextConfig;