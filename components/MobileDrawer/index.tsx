import { GithubIcon, GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  signInWithGithub,
  signInWithGoogle,
} from "@/lib/supabase/actions/auth/action";
import { Dispatch, SetStateAction } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function MobileDrawer({ open, setOpen }: Props) {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="bg-zinc-800 border-none">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-extrabold text-white">
            로그인 후 이용가능해요!
          </DrawerTitle>
          <DrawerDescription className="text-white">
            로그인 후 나만의 링크를 만들어보세요.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button
            variant="secondary"
            className="w-full"
            onClick={signInWithGoogle}
          >
            Google 회원가입 <GoogleIcon />
          </Button>
          <Button
            variant="default"
            className="w-full"
            onClick={signInWithGithub}
          >
            Github 회원가입 <GithubIcon />
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
