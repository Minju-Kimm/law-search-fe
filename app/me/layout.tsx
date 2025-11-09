import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '마이페이지',
  description: 'LexSearch 마이페이지. 내 정보를 확인하고 관리하세요.',
  robots: {
    index: false, // 개인 페이지는 검색 엔진에서 제외
    follow: false,
  },
};

export default function MeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
