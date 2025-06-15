"use client";

import { useEffect, useCallback } from "react";
import { isInAppBrowser, isIOS, isKakaoTalk, isLine } from "@/utils/browser";
import { useToast } from "@/hooks/useToast";

// 인앱 브라우저 감지 및 외부 브라우저로 리다이렉트 처리
const useExternalBrowser = () => {
  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
  }, []);

  const addToast = useToast();

  useEffect(() => {
    if (!isInAppBrowser()) return;

    const currentUrl = window.location.href;

    if (isKakaoTalk()) {
      // 카카오톡 외부 브라우저로 열기
      window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(
        currentUrl
      )}`;
    } else if (isLine()) {
      // 라인 외부 브라우저로 열기
      const separator = currentUrl.includes("?") ? "&" : "?";
      window.location.href = `${currentUrl}${separator}openExternalBrowser=1`;
    } else if (isIOS()) {
      // iOS의 경우 Safari로 열기
      copyToClipboard(currentUrl);
      addToast({
        type: "info",
        message:
          "URL이 복사되었습니다. Safari가 열리면 주소창을 길게 눌러 '붙여넣기 및 이동'을 선택해주세요.",
      });
    } else {
      // 안드로이드의 경우 Chrome으로 열기
      window.location.href = `intent://${window.location.host}${window.location.pathname}${window.location.search}#Intent;scheme=https;package=com.android.chrome;end`;
    }
  }, [copyToClipboard, addToast]);
};

export default useExternalBrowser;
