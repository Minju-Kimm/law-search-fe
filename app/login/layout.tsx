import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인',
  description: 'LexSearch 법률검색 서비스에 로그인하세요. 구글, 네이버 소셜 로그인 지원.',
  keywords: ['법률검색', '로그인', 'LexSearch'],
  openGraph: {
    title: '로그인 | LexSearch',
    description: 'LexSearch 법률검색 서비스에 로그인하세요',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
