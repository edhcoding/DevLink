"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tables } from "@/database.types";
import {
  removeAvatar,
  uploadAvatar,
} from "@/lib/supabase/actions/profile/action";
import { ChevronRight, FileUp, Trash2 } from "lucide-react";
import { ChangeEvent, memo, useRef } from "react";
import { useFormContext } from "react-hook-form";

function StepProfile({
  profile,
  onNext,
}: {
  profile: Tables<"profiles">;
  onNext: () => void;
}) {
  const { control, setValue } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", profile.id);
      const publicUrl = await uploadAvatar(formData);
      setValue("avatarUrl", publicUrl);
    }
  };

  const handleRemoveAvatar = async () => {
    const { success } = await removeAvatar(profile.id);
    if (success) setValue("avatarUrl", "");
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <FormField
        control={control}
        name="avatarUrl"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Avatar
                className="size-28 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <AvatarImage src={field.value || ""} alt="User avatar" />
                <AvatarFallback className="hover:bg-muted/50">
                  User
                </AvatarFallback>
              </Avatar>
            </FormControl>
          </FormItem>
        )}
      />
      <Input
        ref={fileInputRef}
        id="avatar-upload"
        type="file"
        className="hidden"
        onChange={handleAvatarUpload}
        accept="image/*"
      />
      <div className="flex flex-col gap-3">
        <Button
          type="button"
          variant="default"
          onClick={() => fileInputRef.current?.click()}
          className="font-bold"
        >
          이미지 업로드 <FileUp />
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleRemoveAvatar}
          className="hover:text-rose-500 font-bold"
        >
          이미지 삭제 <Trash2 />
        </Button>
      </div>
      {/* 이미지 제거 버튼 - 추후 추가 */}
      <FormField
        control={control}
        name="username"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-md font-bold">닉네임</FormLabel>
            <FormControl>
              <Input placeholder="닉네임을 입력해 주세요" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-md font-bold">이름</FormLabel>
            <FormControl>
              <Input placeholder="이름을 입력해 주세요" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="bio"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-md font-bold">
              한 줄 소개
              <Badge
                variant="outline"
                className="ml-2 h-5 min-w-5 rounded-full px-1 text-xs"
              >
                (선택)
              </Badge>
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="한 줄 소개를 입력해 주세요"
                className="resize-none"
                maxLength={100}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button
        variant="secondary"
        onClick={onNext}
        className="mt-5 bg-transparent"
      >
        다음
        <ChevronRight />
      </Button>
    </div>
  );
}

export default memo(StepProfile);
