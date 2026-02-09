import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Hi-Five Focus | 5-슬롯 타임박싱 타이머",
  description: "전략적인 포기와 압도적 집중, 하이파이브 포커스로 하루 5개 핵심 과업에 몰입하세요.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={outfit.className}>
        <AuthProvider>
          <div id="main-root">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
