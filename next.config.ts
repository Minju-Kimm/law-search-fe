import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/:path*',
      },
    ];
  },

  // 이미지 최적화 설정
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Google 프로필 이미지
      },
      {
        protocol: 'https',
        hostname: '*.pstatic.net', // 네이버 프로필 이미지
      },
    ],
    formats: ['image/avif', 'image/webp'], // 최신 이미지 포맷 사용
  },

  // 성능 및 보안 헤더
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN', // 클릭재킹 방지
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // MIME 타입 스니핑 방지
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(self), geolocation=()',
          },
        ],
      },
    ];
  },

  // 실험적 기능
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'], // 패키지 임포트 최적화
  },
};

export default nextConfig;
