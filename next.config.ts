import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'restaurant-api.dicoding.dev',
      },
    ],
  }
};

export default nextConfig;
