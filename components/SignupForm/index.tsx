"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { signInWithOAuth, signup } from "@/lib/supabase/actions/auth/action";
import { GoogleIcon } from "@/components/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LogOut } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Dispatch, SetStateAction } from "react";

export default function SignupForm({
  open,
  setOpen,
  isDesktop,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isDesktop: boolean;
}) {
  return (
    <>
      <form action={signup}>
        <div className="mb-4">
          <div className="space-y-2 mb-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요."
              required
            />
          </div>
          <div className="space-y-2 mb-4">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              name="password"
              minLength={6}
              placeholder="********"
              required
            />
          </div>
          <div className="space-y-2 mb-4">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="X X X"
              required
            />
          </div>
          <div className="space-y-2 mb-4">
            <Label htmlFor="username">닉네임</Label>
            <Input
              id="username"
              type="text"
              name="username"
              placeholder="X X X"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            회원가입
          </Button>
        </div>
      </form>
      <div className="relative mb-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            혹은 다른 소셜 계정으로 로그인
          </span>
        </div>
      </div>

      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              간편로그인 <LogOut className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] w-full">
            <DialogHeader>
              <DialogTitle>로그인</DialogTitle>
              <DialogDescription>
                간편로그인을 통해 더 빠르게 회원가입을 진행해보세요.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="w-full">
              <form action={() => signInWithOAuth("google")}>
                <Button variant="outline" className="w-full">
                  Google로 계속하기
                  <GoogleIcon className="h-4 w-4" />
                </Button>
              </form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full">
              간편로그인 <LogOut className="h-4 w-4" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>로그인</DrawerTitle>
              <DrawerDescription>
                간편로그인을 통해 더 빠르게 회원가입을 진행해보세요.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="pt-2">
              {/* <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose> */}
              <form action={() => signInWithOAuth("google")}>
                <Button variant="outline" className="w-full">
                  Google로 계속하기
                  <GoogleIcon className="h-4 w-4" />
                </Button>
              </form>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
      {/* <Dialog>
        <DialogTrigger asChild className="w-full">
          <Button variant="outline">
            간편로그인 <LogOut className="h-4 w-4" />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>로그인</DialogTitle>
            <DialogDescription>
              간편로그인을 통해 더 빠르게 회원가입을 진행해보세요.
            </DialogDescription>
          </DialogHeader>

          <form action={() => signInWithOAuth("google")}>
            <Button variant="outline" className="w-full">
              Google로 계속하기
              <GoogleIcon className="h-4 w-4" />
            </Button>
          </form>
        </DialogContent>
      </Dialog> */}
    </>
  );
}
