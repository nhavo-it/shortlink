import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Short & QR",
  description:
    "Short & QR giúp bạn rút gọn liên kết dài thành link ngắn gọn, dễ nhớ và đồng thời sinh mã QR chỉ với một thao tác. Ứng dụng hỗ trợ chia sẻ nhanh chóng trên mạng xã hội, tài liệu in ấn, poster, danh thiếp và nhiều trường hợp khác, giúp tối ưu trải nghiệm chia sẻ thông tin tiện lợi, chuyên nghiệp và hiệu quả.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="bg-purple-900">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh font-sans bg-purple-900 text-white`}
      >
        <div className="container mx-auto p-3">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
