import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "지금 우리 학교는: 연암",
  description:
    "연암공과대학교 캠퍼스 배경 좀비 서바이벌 턴제 게임. 52턴 동안 생존하여 구조대를 기다려라!",
  openGraph: {
    title: "지금 우리 학교는: 연암",
    description: "연암공과대학교 좀비 서바이벌. 52일을 버텨라!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <main className="min-h-dvh">{children}</main>
      </body>
    </html>
  );
}
