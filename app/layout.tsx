import type { Metadata } from "next";
import "@fontsource/pretendard/400.css";
import "@fontsource/pretendard/500.css";
import "@fontsource/pretendard/600.css";
import "@fontsource/pretendard/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "민법 조문 검색",
  description: "빠르고 정확한 법률 검색",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="antialiased font-pretendard">{children}</body>
    </html>
  );
}
