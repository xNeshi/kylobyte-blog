import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: "vai36xa9n7.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
