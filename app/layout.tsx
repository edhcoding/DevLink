import { Geist } from "next/font/google";
import NavbarWrapper from "@/components/NavbarWrapper";
import Provider from "@/components/Layout/Provider";
import "./globals.css";
import Particles from "@/components/Home/Particles";

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
