"use client";

import SignupForm from "@/components/SignupForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Page() {
  const [open, setOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden">
      <Card className="w-[360px] animate-fade-in-fast">
        <CardHeader>
          <CardTitle className="text-2xl">Link True</CardTitle>
          <CardDescription>회원 가입</CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm open={open} setOpen={setOpen} isDesktop={isDesktop} />
        </CardContent>
      </Card>
    </div>
  );
}
