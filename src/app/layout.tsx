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
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Hi-Five Focus"
  },
  formatDetection: {
    telephone: false
  },
  themeColor: "#000000",
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👋</text></svg>',
  },
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
    <html lang="ko" suppressHydrationWarning>
      <body className={outfit.className} suppressHydrationWarning>
        <AuthProvider>
          <div id="main-root">
            {children}
          </div>
        </AuthProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.matchMedia('(display-mode: standalone)').matches) {
                // PWA가 독립 창으로 실행될 때 모바일 사이즈로 조정 시도
                window.resizeTo(430, 850);
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
