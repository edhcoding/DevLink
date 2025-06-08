"use client";

import { Button } from "@/components/ui/button";
import { Eclipse } from "lucide-react";
import { useTheme } from "next-themes";

export default function DarkModeBtn() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (resolvedTheme === "dark") setTheme("light");
    else setTheme("dark");
  };

  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      className="size-10 text-black dark:text-white"
    >
      <Eclipse className="size-6" />
    </Button>
  );
}
