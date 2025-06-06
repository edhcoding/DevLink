"use client";

import DesktopDialog from "@/components/DesktopDialog";
import MobileDrawer from "@/components/MobileDrawer";
import { Button } from "@/components/ui/button";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const isDesktop = useIsDesktop();
  console.log(isDesktop);

  return (
    <nav className="bg-black text-white border-b border-neutral-800 absolute top-0 left-0 right-0 h-14 p-4 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-1">
        <h1 className="text-xl font-extrabold">DevLink</h1>
        <LinkIcon className="size-5" />
      </Link>
      <Button
        variant="default"
        className="font-bold border-neutral-800 border"
        onClick={() => setOpen(true)}
      >
        로그인
      </Button>

      {isDesktop ? (
        <DesktopDialog open={open} setOpen={setOpen} />
      ) : (
        <MobileDrawer open={open} setOpen={setOpen} />
      )}
    </nav>
  );
}
