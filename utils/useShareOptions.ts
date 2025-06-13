import QRCode from "qrcode";
import { useToast } from "@/hooks/useToast";

export default function useShareOptions(username?: string) {
  const addToast = useToast();

  return () => ({
    generateQR: () => {
      if (!username) return;

      QRCode.toDataURL(`${window.location.origin}/${username}`, {
        width: 256,
        margin: 1,
      }).then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `profile-${username}-qr.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        addToast({ message: "QR코드가 다운로드되었습니다" });
      });
    },
    copySendLink: () => {
      if (!username) return;

      navigator.clipboard.writeText(`${window.location.origin}/${username}`);
      addToast({ message: "클립보드에 복사되었습니다" });
    },
  });
}
