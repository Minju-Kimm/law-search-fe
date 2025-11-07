import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // API_REWRITE_TARGET 환경 변수가 설정된 경우에만 rewrite 적용 (로컬 개발용)
    const apiTarget = process.env.API_REWRITE_TARGET;

    if (apiTarget) {
      return [
        {
          source: '/api/:path*',
          destination: `${apiTarget}/:path*`,
        },
      ];
    }

    // 프로덕션: NEXT_PUBLIC_API_BASE_URL을 직접 사용하므로 rewrite 불필요
    return [];
  },
};

export default nextConfig;
