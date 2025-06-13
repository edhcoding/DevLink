"use client";

import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import type useShareOptions from "@/utils/useShareOptions";
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
} from "@radix-ui/react-tooltip";
import { Share2Icon } from "lucide-react";

export default function ShareBtn({
  shareOptions,
}: {
  shareOptions: ReturnType<typeof useShareOptions>;
}) {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <button
          type="button"
          className=" flex gap-2 text-sm"
          aria-label="공유하기"
          onClick={() => shareOptions().copySendLink()}
        >
          <Share2Icon className="size-5" />
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
            링크 공유하기
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
  );
}
