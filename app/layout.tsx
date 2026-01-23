import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bản Đồ Xây Nhà AI - Trợ lý ảo xây dựng nhà thông minh",
  description: "Nền tảng AI hỗ trợ xây dựng nhà thông minh với thiết kế nội thất, tìm kiếm nhà thầu và nhiều công cụ hữu ích khác.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${poppins.variable} ${openSans.variable} antialiased bg-slate-50 text-slate-800`}
      >
        {children}
      </body>
    </html>
  );
}
