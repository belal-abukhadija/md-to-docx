import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Empty turbopack config silences the Turbopack/webpack conflict error.
  // Monaco Editor and all client-side libs work fine under Turbopack without custom webpack.
  turbopack: {},
  // Allow cross-origin images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
