import Toast from "@/components/Layout/Toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider delayDuration={500}>
        <Toast />
        {children}
      </TooltipProvider>
    </ThemeProvider>
  );
}
