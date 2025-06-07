import { Geist } from "next/font/google";
import NavbarWrapper from "@/components/NavbarWrapper";
import Provider from "@/components/Layout/Provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased bg-black/95`}>
        <Provider>
          <NavbarWrapper />
          {children}
        </Provider>
      </body>
    </html>
  );
}
