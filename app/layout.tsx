import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
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
    <html lang="vi" className="bg-background">
      <body
        className={`${inter.variable} antialiased min-h-dvh font-sans`}
      >
        <div className="container mx-auto p-3">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
