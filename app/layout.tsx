import { Geist } from "next/font/google";
import NavbarWrapper from "@/components/NavbarWrapper";
import Provider from "@/components/Layout/Provider";
import Particles from "@/components/Home/Particles";
import "./globals.css";
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevLink",
  description: "나만의 프로필 링크를 만들고 공유하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.className} antialiased dark:bg-black/95 relative`}
      >
        <Provider>
          <NavbarWrapper />
          <Particles className="absolute inset-0 -z-10" quantity={1000} />
          {children}
        </Provider>
      </body>
    </html>
  );
}
