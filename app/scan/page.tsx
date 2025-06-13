"use client";

import { useRouter } from "next/navigation";
import QRScanner from "@/components/Scan/QRScanner";

export default function ScanPage() {
  const router = useRouter();

  const handleScan = (result: string) => {
    try {
      const url = new URL(result);
      const username = url.pathname.slice(1); // 첫 번째 '/' 제거
      router.push(`/${username}`);
    } catch (error) {
      console.error("Invalid URL format", error);
    }
  };

  const handleError = (error: Error) => {
    console.error("Error scanning QR code", error);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="absolute top-4 text-black text-base hidden sm:block">
        QR Scanner
      </div>
      <div className="relative w-screen h-[80vh] text-center">
        <QRScanner onScan={handleScan} onError={handleError} />
        <div className="absolute bottom-20 w-full">
          <p className="text-center text-sm font-bold text-white bg-black/50 py-2 sm:text-lg">
            카메라 접근 권한을 허용해주세요. <br />
            스크린에 표시된 QR코드에 이미지를 찍어주세요
          </p>
        </div>
      </div>
    </div>
  );
}
