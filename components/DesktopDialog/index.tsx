import { GithubIcon, GoogleIcon } from "@/components/icons";
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
import {
  signInWithGithub,
  signInWithGoogle,
} from "@/lib/supabase/actions/auth/action";
import { XIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DesktopDialog({ open, setOpen }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPortal>
        <DialogContent className="w-[400px] [&>button]:hidden">
          <DialogHeader className="relative mb-4">
            <DialogTitle className="text-xl font-extrabold">
              로그인 후 이용 가능해요!
            </DialogTitle>
            <DrawerDescription>
              로그인 후 나만의 링크를 만들어보세요.
            </DrawerDescription>
            <DialogClose className="absolute -right-2 -top-2">
              <XIcon className="size-5" />
            </DialogClose>
          </DialogHeader>
          <DialogFooter>
            <div className="flex flex-col gap-4 w-full font-semibold">
              <Button
                variant="outline"
                className="w-full"
                onClick={signInWithGoogle}
              >
                Google로 계속하기 <GoogleIcon />
              </Button>
              <Button
                variant="default"
                className="w-full"
                onClick={signInWithGithub}
              >
                Github로 계속하기
                <GithubIcon className="stroke-white dark:stroke-black" />
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
