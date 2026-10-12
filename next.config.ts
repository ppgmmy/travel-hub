import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      {
        source: "/trips/huanggang-futian-2026-10",
        destination: "/trips/qianhai-2026-10",
        permanent: true,
      },
      {
        source: "/guides/huanggang-futian",
        destination: "/guides/qianhai",
        permanent: true,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
