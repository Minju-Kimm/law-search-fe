import type { Metadata } from "next";
import "@fontsource/pretendard/400.css";
import "@fontsource/pretendard/500.css";
import "@fontsource/pretendard/600.css";
import "@fontsource/pretendard/700.css";
import "./globals.css";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { BookmarkProvider } from "@/lib/contexts/BookmarkContext";
import { Header } from "@/components/Header";
import { ToastProvider } from "@/components/Toast";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lexsearch.kr';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "LexSearch - 가장 빠른 법률검색",
    template: "%s | LexSearch"
  },
  description: "가장 빠르고 정확한 법률 조문 검색 서비스. 민법, 형법, 민사소송법, 형사소송법을 빠르게 검색하세요.",
  keywords: ["법률검색", "조문검색", "민법", "형법", "민사소송법", "형사소송법", "법률", "법", "조문", "LexSearch"],
  authors: [{ name: "LexSearch" }],
  creator: "LexSearch",
  publisher: "LexSearch",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: baseUrl,
    siteName: 'LexSearch',
    title: 'LexSearch - 가장 빠른 법률검색',
    description: '가장 빠르고 정확한 법률 조문 검색 서비스. 민법, 형법, 민사소송법, 형사소송법을 빠르게 검색하세요.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LexSearch - 가장 빠른 법률검색',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LexSearch - 가장 빠른 법률검색',
    description: '가장 빠르고 정확한 법률 조문 검색 서비스',
    images: ['/og-image.png'],
    creator: '@lexsearch',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '', // Google Search Console에서 발급받은 코드 입력
    other: {
      naver: '', // 네이버 웹마스터 도구에서 발급받은 코드 입력
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${baseUrl}/#webapp`,
        'name': 'LexSearch',
        'url': baseUrl,
        'description': '가장 빠르고 정확한 법률 조문 검색 서비스',
        'applicationCategory': 'LegalService',
        'operatingSystem': 'Web Browser',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'KRW',
        },
        'browserRequirements': 'Requires JavaScript. Requires HTML5.',
        'inLanguage': 'ko-KR',
      },
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        'name': 'LexSearch',
        'url': baseUrl,
        'logo': {
          '@type': 'ImageObject',
          'url': `${baseUrl}/favicon.ico`,
        },
        'sameAs': [],
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        'url': baseUrl,
        'name': 'LexSearch',
        'description': '가장 빠르고 정확한 법률 조문 검색 서비스',
        'publisher': {
          '@id': `${baseUrl}/#organization`,
        },
        'potentialAction': {
          '@type': 'SearchAction',
          'target': {
            '@type': 'EntryPoint',
            'urlTemplate': `${baseUrl}/?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
        'inLanguage': 'ko-KR',
      },
    ],
  };

  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-pretendard">
        <AuthProvider>
          <BookmarkProvider>
            <Header />
            {children}
            <ToastProvider />
          </BookmarkProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
