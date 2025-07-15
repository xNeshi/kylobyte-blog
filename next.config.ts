import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: `${process.env.UPLOADTHING_DOMAIN}`,
      },
    ],
  },
};

export default nextConfig;
