"use client";

import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black text-white border-b border-neutral-800 absolute top-0 left-0 right-0 h-14 p-4 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-1">
        <h1 className="text-xl font-extrabold">DevLink</h1>
        <LinkIcon className="size-5" />
      </Link>
    </nav>
  );
}
