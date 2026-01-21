import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
  transpilePackages: ['@ionic/react', '@ionic/react-router', 'ionicons', '@stencil/core'],
  experimental: {
    optimizePackageImports: ['lucide-react', 'ionicons'],
  },
  turbopack: {},
};

export default nextConfig;
