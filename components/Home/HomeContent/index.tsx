"use client";

import { useEffect, useState } from "react";
import DesktopDialog from "@/components/DesktopDialog";
import MobileDrawer from "@/components/MobileDrawer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
} from "@radix-ui/react-tooltip";
import { Info, InfoIcon, Link, LogOut, Plus, QrCode } from "lucide-react";
import { useRouter } from "next/navigation";
import { Database } from "@/database.types";
import { useToast } from "@/hooks/useToast";
import { CONTACT_EMAIL } from "@/constants/contack";

export default function HomeContent({
  profile,
}: {
  profile: Database["public"]["Tables"]["profiles"]["Row"] | null;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [useOpen, setUseOpen] = useState<boolean>(false);
  const isDesktop = useIsDesktop();
  const router = useRouter();

  const addToast = useToast();

  const handleFeedback = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    addToast({
      type: "info",
      message: "이메일이 복사되었어요! 피드백 주시면 감사하겠습니다.",
    });
  };

  useEffect(() => {
    if (profile)
      addToast({
        type: "success",
        message: `안녕하세요! ${profile.username}님`,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden">
      <Card className="w-[320px] border-none bg-transparent shadow-none">
        <CardHeader className="mb-2">
          <CardTitle className="flex items-center justify-center gap-2 text-black dark:text-white text-5xl font-extrabold">
            DevLink
            <Link className="size-8" />
          </CardTitle>
          <CardDescription className="text-black dark:text-white">
            나를 소개할 수 있는 프로필 링크를 만들어보세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tooltip>
            {profile ? (
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  className="font-semibold"
                  onClick={() => router.push("/account")}
                >
                  새로운 링크 만들기
                  <Plus className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  className="font-semibold"
                  onClick={() => router.push("/scan")}
                >
                  프로필 QR코드 접속
                  <QrCode className="size-4" />
                </Button>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full flex items-center font-semibold"
                      onClick={() => setOpen(true)}
                    >
                      새로운 링크 만들기
                      <Plus className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <Button
                    variant="outline"
                    className="font-semibold"
                    onClick={() => router.push("/scan")}
                  >
                    프로필 QR코드 접속
                    <QrCode className="size-4" />
                  </Button>
                </div>
                <div className="w-full h-[1px] space-y-2 bg-black dark:bg-gray-400 my-4" />
                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => setOpen(true)}
                >
                  간편로그인 <LogOut />
                </Button>
              </>
            )}
            <Button
              variant="link"
              onClick={() => setUseOpen(true)}
              className="text-black dark:text-white flex gap-1 text-sm items-center justify-center w-full mt-6"
            >
              <Info className="size-4" /> 사용법
            </Button>
            <TooltipPortal>
              <TooltipContent
                side="top"
                sideOffset={10}
                arrowPadding={1}
                className="TooltipContent"
              >
                <p className="px-2 py-1 text-xs text-white dark:text-black font-semibold bg-black dark:bg-white rounded-md">
                  로그인 후 이용가능해요!
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
        </CardContent>

        {isDesktop ? (
          <DesktopDialog open={open} setOpen={setOpen} />
        ) : (
          <MobileDrawer open={open} setOpen={setOpen} />
        )}

        {/* 사용 방법 모달 */}
        <Dialog open={useOpen} onOpenChange={setUseOpen} modal={false}>
          <DialogPortal>
            <DialogContent className="w-[400px] [&>button]:hidden">
              <DialogHeader>
                <DialogTitle className="text-center text-2xl font-extrabold">
                  사용법
                </DialogTitle>
              </DialogHeader>
              <DialogFooter>
                <div className="w-full text-black dark:text-white">
                  <div className="flex gap-1 flex-col text-pretty">
                    <h2 className="font-extrabold">🔗 프로필 링크 만들기</h2>
                    <ul className="gray-list-decimal [&>li]:mt-1 text-sm font-medium ml-6">
                      <li>
                        로그인 후{" "}
                        <span className="text-rose-500">
                          [새로운 링크 만들기]
                        </span>
                        를 선택해주세요
                      </li>
                      <li>
                        프로필 설정을 통해 나를 소개할 수 있는 링크를 만들 수
                        있어요
                      </li>
                      <li>
                        프로필 우측 하단의 QR코드나 링크 공유 버튼을 통해
                        프로필을 공유할 수 있어요
                      </li>
                    </ul>

                    <h2 className="font-extrabold mt-6">
                      🔗 프로필 QR코드 접속
                    </h2>
                    <ul className="gray-list-decimal [&>li]:mt-1 text-sm font-medium ml-6">
                      <li>
                        로그인 후{" "}
                        <span className="text-rose-500">
                          [프로필 QR코드 접속]
                        </span>
                        를 선택해주세요
                      </li>
                      <li>카메라 접근 권한을 허용해주세요</li>
                      <li>스크린에 표시된 QR코드에 이미지를 찍어주세요</li>
                      <li>프로필 화면으로 이동해 프로필을 확인할 수 있어요</li>
                    </ul>

                    <h2 className="font-bold mt-6 text-amber-300">
                      New Update ⭐️
                    </h2>
                    <ul className="gray-list-decimal [&>li]:mt-1 text-sm font-medium ml-6">
                      <li>
                        우측 상단의 프로필 사진을 클릭해 메뉴를 열 수 있어요
                      </li>
                      <li>욕설 필터링 기능이 추가되었어요</li>
                      <li>QR코드 생성, 접속 기능이 추가되었어요</li>
                    </ul>
                  </div>

                  <div className="text-black dark:text-white mt-10 flex items-center gap-1">
                    <InfoIcon className="size-3 dark:text-gray-300" />
                    <button
                      type="button"
                      className="px-0 text-xs dark:text-gray-300"
                      onClick={handleFeedback}
                    >
                      피드백 보내기
                    </button>
                  </div>
                </div>
                <DialogClose className="absolute right-5 bottom-5">
                  <Button variant="default" size="sm" className="w-[60px]">
                    확인
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </Card>
    </div>
  );
}
