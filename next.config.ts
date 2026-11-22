import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
        ],
      },
      {
        source: '/blueprints/:blueprint/mockups/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: "sandbox allow-scripts; frame-ancestors 'none'" },
        ],
      },
      {
        source: '/html-kit/examples/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: "sandbox allow-scripts; frame-ancestors 'none'" },
        ],
      },
    ];
  },
  serverExternalPackages: ['pino'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react', 'recharts'],
  },
};


export default nextConfig;
