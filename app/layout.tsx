import type { Metadata } from "next";
import "@fontsource/pretendard/400.css";
import "@fontsource/pretendard/500.css";
import "@fontsource/pretendard/600.css";
import "@fontsource/pretendard/700.css";
import "./globals.css";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "법률 조문 검색 - 민법 & 형법",
  description: "빠르고 정확한 민법 & 형법 조문 검색 서비스",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="antialiased font-pretendard">
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
