"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TooltipWithIcon from "@/components/TooltipWithIcon";
import { memo } from "react";

function StepSocialInfo({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex gap-14 mt-12 mb-4">
        <TooltipWithIcon iconName="github" message="Github" />
        <TooltipWithIcon iconName="blog" message="Blog" />
        <TooltipWithIcon iconName="linkedin" message="Linkedin" />
      </div>
      <p className="text-sm text-muted-foreground mb-12 font-medium">
        소셜 링크를 추가해서 프로필을 더 잘 표현해보세요!
      </p>
      <FormField
        control={control}
        name="githubUrl"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-md">
              Github URL
              <Badge
                variant="outline"
                className="ml-2 h-5 min-w-5 rounded-full px-1 text-xs"
              >
                (선택)
              </Badge>
            </FormLabel>
            <FormControl>
              <Input placeholder="Github URL을 입력해 주세요." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="blogUrl"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-md">
              블로그 URL
              <Badge
                variant="outline"
                className="ml-2 h-5 min-w-5 rounded-full px-1 text-xs"
              >
                (선택)
              </Badge>
            </FormLabel>
            <FormControl>
              <Input placeholder="블로그 URL을 입력해 주세요." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="linkedinUrl"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-md">
              LinkedIn URL
              <Badge
                variant="outline"
                className="ml-2 h-5 min-w-5 rounded-full px-1 text-xs"
              >
                (선택)
              </Badge>
            </FormLabel>
            <FormControl>
              <Input placeholder="LinkedIn URL을 입력해 주세요." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex gap-2 mt-5">
        <Button variant="secondary" onClick={onPrev} className="bg-transparent">
          <ChevronLeft />
          이전
        </Button>
        <Button variant="secondary" onClick={onNext} className="bg-transparent">
          다음
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

export default memo(StepSocialInfo);
