"use client";

import { useToast } from "@/hooks/useToast";
import { copyClipboard } from "@/utils/copyClipboard";
import { Share2Icon } from "lucide-react";

export default function ShareBtn() {
  const addToast = useToast();

  const handleCopy = () => {
    copyClipboard(
      window.location.href,
      () => addToast({ type: "success", message: "링크가 복사되었습니다." }),
      () => addToast({ type: "error", message: "링크 복사에 실패했습니다." })
    );
  };

  return (
    <div className="w-full flex justify-center">
      <button
        type="button"
        className="mt-4 flex gap-2 text-sm"
        aria-label="공유하기"
        onClick={handleCopy}
      >
        <Share2Icon className="size-5" />
        공유하기
      </button>
    </div>
  );
}
