import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "旅遊樞紐",
    template: "%s · 旅遊樞紐",
  },
  description:
    "個人行程手帳、目的地指南，以及機票酒店外連搜尋。內容存於 repo，唔顯示假價錢。",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-Hant-HK" className={`${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
