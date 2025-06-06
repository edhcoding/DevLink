import { EmailIcon, GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Dispatch, SetStateAction } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function MobileDrawer({ open, setOpen }: Props) {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-xl font-semibold">
            로그인 후 이용가능해요!
          </DrawerTitle>
          <DrawerDescription>
            로그인 후 나만의 링크를 만들어보세요.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <form className="space-y-2">
            <Button variant="default" className="w-full">
              이메일 회원가입 <EmailIcon />
            </Button>
            <Button variant="default" className="w-full">
              Google 회원가입 <GoogleIcon />
            </Button>
          </form>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
