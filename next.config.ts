import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // No serverExternalPackages needed now
  },
  eslint: {
    ignoreDuringBuilds: true, // Still helpful for quick Vercel deploys
  },
};

export default nextConfig;

