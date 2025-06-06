import { EmailIcon, GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { DrawerDescription } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithOAuth } from "@/lib/supabase/actions/auth/action";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DesktopDialog({ open, setOpen }: Props) {
  const [emailOpen, setEmailOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogPortal>
        <DialogContent className="w-[400px] [&>button]:hidden bg-zinc-800 border-none">
          <DialogHeader className="relative text-white mb-4">
            <DialogTitle className="text-xl font-extrabold">
              로그인 후 이용 가능해요!
            </DialogTitle>
            <DrawerDescription className="text-white">
              로그인 후 나만의 링크를 만들어보세요.
            </DrawerDescription>
            <DialogClose className="absolute -right-2 -top-2">
              <XIcon className="size-5" />
            </DialogClose>
          </DialogHeader>
          <DialogFooter>
            <div className="flex flex-col gap-2 w-full">
              <DialogTrigger asChild onClick={() => setEmailOpen(true)}>
                <Button variant="default" className="w-full">
                  Email로 계속하기 <EmailIcon />
                </Button>
              </DialogTrigger>
              <Button variant="default" className="w-full">
                Google로 계속하기 <GoogleIcon />
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>

      <Dialog open={emailOpen} onOpenChange={setEmailOpen} modal={false}>
        <DialogPortal>
          <DialogContent className="w-[400px] [&>button]:hidden bg-zinc-800 border-none">
            <DialogHeader className="relative text-white mb-4">
              <DialogTitle className="text-xl font-extrabold">
                로그인
              </DialogTitle>
              <DialogClose className="absolute -right-2 -top-2">
                <XIcon className="size-5" />
              </DialogClose>
            </DialogHeader>
            <DialogFooter>
              <form className="w-full" action={() => signInWithOAuth("google")}>
                <div className="mb-4">
                  <div className="space-y-2 mb-2">
                    <Label htmlFor="email" className="text-white">
                      이메일
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="이메일을 입력해주세요."
                      required
                    />
                  </div>
                  <div className="space-y-2 mb-4">
                    <Label htmlFor="password" className="text-white">
                      비밀번호
                    </Label>
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
                    <Label htmlFor="name" className="text-white">
                      이름
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="X X X"
                      required
                    />
                  </div>
                  <div className="space-y-2 mb-6">
                    <Label htmlFor="username" className="text-white">
                      닉네임
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      name="username"
                      placeholder="X X X"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    onClick={() => console.log("click")}
                  >
                    회원가입
                  </Button>
                </div>
              </form>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </Dialog>
  );
}
