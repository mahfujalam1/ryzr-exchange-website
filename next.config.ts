import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // This site is small, so retaining Turbopack's full graph between dev
    // sessions costs considerably more disk/RAM than rebuilding it.
    turbopackFileSystemCacheForDev: false,
    // Compile routes when requested instead of keeping every route warm.
    preloadEntriesOnStart: false,
  },
};

export default nextConfig;
