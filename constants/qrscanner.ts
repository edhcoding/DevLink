export const QrScannerOptions = {
  preferredCamera: "environment", // 후면 카메라 우선 사용
  highlightScanRegion: false, // 스캔 영역 하이라이트
  highlightCodeOutline: true, // QR코드 인식 시 외곽선 표시
  maxScansPerSecond: 5, // 배터리 소모 줄이기 위해 스캔 속도 제한
};
