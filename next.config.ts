import type { NextConfig } from "next";

const basePath = process.env.NODE_ENV === "production" ? "/Resume-Nextjs" : "";

const nextConfig: NextConfig = {

  reactStrictMode: true,
  basePath,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
