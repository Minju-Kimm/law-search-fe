import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '내 북마크',
  description: 'LexSearch에서 북마크한 법률 조문을 확인하세요.',
  keywords: ['법률검색', '북마크', '법률 북마크'],
  openGraph: {
    title: '내 북마크 | LexSearch',
    description: 'LexSearch에서 북마크한 법률 조문을 확인하세요',
    type: 'website',
  },
  robots: {
    index: false, // 개인 북마크 페이지는 검색 엔진에서 제외
    follow: false,
  },
};

export default function BookmarksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
