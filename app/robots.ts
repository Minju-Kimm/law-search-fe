import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lexsearch.kr';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/me'], // API routes와 개인 페이지는 크롤링 방지
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
