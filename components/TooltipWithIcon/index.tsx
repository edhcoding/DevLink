"use client";

import { BlogIcon, GithubIconBg, LinkedinIcon } from "@/components/icons";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import {
  TooltipContent,
  TooltipArrow,
  TooltipPortal,
} from "@radix-ui/react-tooltip";

interface Props {
  iconName: "github" | "blog" | "linkedin";
  message: string;
}

export default function TooltipWithIcon({ iconName, message }: Props) {
  const icons = [
    {
      iconName: "github",
      icon: (
        <GithubIconBg className="size-10 fill-gray-400 hover:fill-black duration-300 dark:fill-white" />
      ),
    },
    {
      iconName: "blog",
      icon: (
        <BlogIcon className="size-10 fill-gray-400 hover:fill-black duration-300 dark:fill-white" />
      ),
    },
    {
      iconName: "linkedin",
      icon: (
        <LinkedinIcon className="size-10 fill-gray-400 hover:fill-black duration-300 dark:fill-white" />
      ),
    },
  ];

  const icon = icons.find((icon) => icon.iconName === iconName)?.icon;

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>{icon}</TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          side="top"
          sideOffset={10}
          arrowPadding={1}
          className="TooltipContent"
        >
          <p className="px-2 py-1 text-xs text-white dark:text-black font-semibold bg-black dark:bg-white rounded-md">
            {message}
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
