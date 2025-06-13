/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/useToast";
import { memo, useEffect } from "react";
import { useFormContext } from "react-hook-form";

function StepSummary() {
  const { getValues, formState } = useFormContext();
  const values = getValues();

  const addToast = useToast();

  useEffect(() => {
    if (Object.keys(formState.errors).length > 0) {
      Object.entries(formState.errors).forEach(([fieldName, error]) => {
        if (error && "message" in error)
          addToast({
            type: "error",
            message: `${error.message}`,
          });
        else if (fieldName === "links" && Array.isArray(error))
          error.forEach((linkError) => {
            if (linkError && typeof linkError === "object")
              Object.entries(linkError).forEach(([_, subError]) => {
                if (
                  subError &&
                  typeof subError === "object" &&
                  "message" in subError
                )
                  addToast({
                    type: "error",
                    message: `${subError.message}`,
                  });
              });
          });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.errors]);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <Card className="w-full px-4">
        <div className="flex justify-between gap-2">
          <div>
            <Label className="text-md font-semibold">닉네임</Label>
            <Input value={values.username} disabled />
          </div>
          <div>
            <Label className="text-md font-semibold">이름</Label>
            <Input value={values.name} disabled />
          </div>
        </div>
        {values.bio && (
          <div>
            <Label className="text-md font-semibold">한 줄 소개</Label>
            <Textarea value={values.bio} disabled className="resize-none" />
          </div>
        )}
        {values.githubUrl && (
          <div>
            <Label className="text-md">GitHub URL</Label>
            <Input value={values.githubUrl} disabled />
          </div>
        )}
        {values.blogUrl && (
          <div>
            <Label className="text-md">Blog URL</Label>
            <Input value={values.blogUrl} disabled />
          </div>
        )}
        {values.linkedinUrl && (
          <div>
            <Label className="text-md">LinkedIn URL</Label>
            <Input value={values.linkedinUrl} disabled />
          </div>
        )}
        {values.links.length > 0 && (
          <div className="flex flex-col gap-2">
            <Label className="text-md font-semibold">추가 링크 제목</Label>
            <div className="flex gap-2 flex-wrap">
              {values.links.map((link: { title: string }) => {
                if (link.title.length > 0) {
                  return (
                    <Badge
                      variant="secondary"
                      key={link.title}
                      className="truncate max-w-[100px]"
                    >
                      <span className="truncate">{link.title}</span>
                    </Badge>
                  );
                }
              })}
            </div>
          </div>
        )}
      </Card>
      <Button
        type="submit"
        className="w-full"
        disabled={formState.isSubmitting}
      >
        {formState.isSubmitting ? "저장중..." : "저장하기"}
      </Button>
    </div>
  );
}

export default memo(StepSummary);
