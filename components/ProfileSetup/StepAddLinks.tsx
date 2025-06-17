"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { memo } from "react";

function StepAddLinks({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "links",
  });

  const handleAddLink = () => {
    append({ url: "", title: "" });
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="mb-2">
        <FormLabel className="text-sm text-muted-foreground mb-12">
          더 많은 링크를 추가해보세요!
        </FormLabel>
      </div>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id}>
            <FormItem>
              <div className="flex space-x-2">
                <FormField
                  control={control}
                  name={`links.${index}.title`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="링크 제목" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`links.${index}.url`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="링크 URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => remove(index)}
                  className="shrink-0"
                >
                  <X />
                </Button>
              </div>
            </FormItem>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="secondary"
        className="mt-2 w-full h-20"
        onClick={handleAddLink}
      >
        링크 추가
      </Button>
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

export default memo(StepAddLinks);
