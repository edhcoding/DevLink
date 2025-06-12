export const copyClipboard = async (
  text: string,
  successAction?: () => void,
  failAction?: () => void
) => {
  try {
    await navigator.clipboard.writeText(text);
    successAction?.();
  } catch (error) {
    console.error("copyClipboard error", error);
    failAction?.();
  }
};
