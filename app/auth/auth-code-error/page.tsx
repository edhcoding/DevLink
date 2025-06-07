"use client";

import { useToast } from "@/hooks/useToast";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function AuthCodeErrorPage() {
  const addToast = useToast();

  useEffect(() => {
    addToast({
      type: "error",
      message: "인증 오류가 발생했어요!",
    });
  }, [addToast]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold">인증 오류가 발생했어요!</h1>
        <p className="mt-4">
          인증 과정에서 오류가 발생했습니다. <br /> 다시 시도해 주세요.
        </p>
        <Link
          href="/"
          className="mt-6 bg-neutral-100 px-4 py-2 rounded-md text-black text-sm inline-flex items-center gap-2 font-semibold hover:bg-neutral-200"
        >
          홈으로 돌아가기 <LogOut className="size-4" />
        </Link>
      </div>
    </div>
  );
}
