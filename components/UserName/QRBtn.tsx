"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { QrCode, XIcon } from "lucide-react";
import { useState } from "react";
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
} from "@radix-ui/react-tooltip";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import type useShareOptions from "@/utils/useShareOptions";

export default function QRBtn({
  shareOptions,
}: {
  shareOptions: ReturnType<typeof useShareOptions>;
}) {
  const [qrOpen, setQrOpen] = useState<boolean>(false);

  const handleGenerateQR = () => {
    setQrOpen(false);
    shareOptions().generateQR();
  };

  return (
    <>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <button type="button" onClick={handleGenerateQR} aria-label="QR Code">
            <QrCode className="size-5" />
          </button>
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            side="top"
            sideOffset={10}
            arrowPadding={1}
            className="TooltipContent"
          >
            <p className="px-2 py-1 text-xs text-white dark:text-black font-semibold bg-black dark:bg-white rounded-md">
              프로필 QR코드 다운로드
            </p>
            <TooltipArrow
              width={11}
              hanging={5}
              className="border-none fill-black dark:fill-white"
              aria-hidden="true"
            />
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>

      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogPortal>
          <DialogContent className="w-[400px] [&>button]:hidden">
            <DialogHeader className="relative">
              <DialogTitle className="text-center text-2xl font-extrabold">
                QR Code
              </DialogTitle>
              <DialogClose className="absolute -right-2 -top-2">
                <XIcon className="size-5" />
              </DialogClose>
            </DialogHeader>
            <DialogFooter>fsdaf</DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  );
}
