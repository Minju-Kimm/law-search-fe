import type { Metadata } from "next";
import "@fontsource/pretendard/400.css";
import "@fontsource/pretendard/500.css";
import "@fontsource/pretendard/600.css";
import "@fontsource/pretendard/700.css";
import "./globals.css";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { Header } from "@/components/Header";
import { ToastProvider } from "@/components/Toast";

export const metadata: Metadata = {
  title: "LexSearch - 가장 빠른 법률검색",
  description: "가장 빠르고 정확한 법률 조문 검색 서비스",
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
          <ToastProvider />
        </AuthProvider>
      </body>
    </html>
  );
}
