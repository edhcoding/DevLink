"use client";

import { GithubIconBg } from "@/components/icons";
import DarkModeBtn from "@/components/NavbarWrapper/DarkModeBtn";
import UserDropdown from "@/components/NavbarWrapper/UserDropdown";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tables } from "@/database.types";
import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import useExternalBrowser from "@/hooks/useExternalBrowser";

export default function Navbar({
  profile,
}: {
  profile: Tables<"profiles"> | null;
}) {
  useExternalBrowser();

  return (
    <nav className=" absolute top-0 left-0 right-0 h-14 p-4 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-1 text-white">
        <LinkIcon className="size-5 text-black dark:text-white" />
      </Link>
      <div className="flex h-5 items-center space-x-3 text-sm">
        <DarkModeBtn />
        <Separator orientation="vertical" />
        <Button variant="ghost">
          <a
            href="https://github.com/edhcoding"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <GithubIconBg className="size-5 dark:fill-white" />
            <span className="text-gray-500 text-xs dark:text-white">EDH</span>
          </a>
        </Button>
        {profile && (
          <>
            <Separator orientation="vertical" />
            <UserDropdown profile={profile} />
          </>
        )}
      </div>
    </nav>
  );
}
