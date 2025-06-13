import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { LoaderCircle, QrCode } from "lucide-react";
import { QrScannerOptions } from "@/constants/qrscanner";
import { cn } from "@/utils/cn";

interface Props {
  onScan: (result: string) => void;
  onError?: (error: Error) => void;
}

export default function QRScanner({ onScan, onError }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!videoRef.current) return;

    if (!QrScanner.hasCamera()) {
      setError("카메라를 찾을 수 없습니다.");
      setIsLoading(false);
      return;
    }

    const scanner = new QrScanner(
      videoRef.current,
      (result) => {
        onScan(result.data);
      },
      QrScannerOptions
    );

    scanner
      .start()
      .then(() => {
        console.log("카메라 초기화 완료");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("카메라 초기화 실패", err);
        if (onError) onError(err);
        setError(err.message);
        setIsLoading(false);
      });

    return () => {
      scanner.destroy();
    };
  }, [onScan, onError]);

  return (
    <div className="size-full relative">
      <video
        ref={videoRef}
        className={cn(
          "size-full object-cover transition-opacity duration-300 bg-black dark:bg-transparent",
          {
            "opacity-0": isLoading,
            "opacity-100": !isLoading,
          }
        )}
      />
      {isLoading ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <LoaderCircle className="animate-spin size-10 mb-4" />
          <p className="font-medium">카메라 초기화 중 ...</p>
        </div>
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center border-2 border-white aspect-square size-48">
          <QrCode className="size-48 text-white" />
        </div>
      )}
      {error && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-red-500">
          {error}
        </div>
      )}
    </div>
  );
}
