"use client";

import { Tables } from "@/database.types";
import { ChangeEvent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import {
  updateProfile,
  uploadAvatar,
} from "@/lib/supabase/actions/profile/action";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormData, formSchema } from "@/types/form";

export default function UserProfileForm({
  profile,
  links,
}: {
  profile: Tables<"profiles">;
  links: Tables<"links">[];
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profile.name,
      username: profile.username,
      bio: profile.bio ?? "",
      avatarUrl: profile.avatar_url ?? "",
      githubUrl: profile.github_url ?? "",
      blogUrl: profile.blog_url ?? "",
      linkedinUrl: profile.linkedin_url ?? "",
      links,
    },
  });

  const onSubmit = async (data: FormData) => {
    await updateProfile(data);
    router.push(`/${profile.username}`);
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });

  const handleAvatarUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", profile.id);
      const publicUrl = await uploadAvatar(formData);
      form.setValue("avatarUrl", publicUrl);
    }
  };

  const handleAddLink = () => {
    append({ url: "", title: "" });
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-4 p-4">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center space-y-2">
            <FormField
              control={form.control}
              name="avatarUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Avatar
                      className="size-24 cursor-pointer"
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
          </div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>닉네임</FormLabel>
                <FormControl>
                  <Input placeholder="사용자 이름을 입력해 주세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이름</FormLabel>
                <FormControl>
                  <Input placeholder="이름을 입력해 주세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>자기소개</FormLabel>
                <FormControl>
                  <Input placeholder="자기소개를 입력해 주세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="githubUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>깃허브 URL</FormLabel>
                <FormControl>
                  <Input placeholder="github URL을 입력해 주세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="blogUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>블로그 URL</FormLabel>
                <FormControl>
                  <Input placeholder="블로그 URL을 입력해 주세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedinUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="LinkedIn URL을 입력해 주세요."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <div className="mb-2">
              <FormLabel>My Link</FormLabel>
            </div>
            <div className="space-y-2">
              {fields.map((field, index) => (
                <div key={field.id}>
                  <FormItem>
                    <div className="flex space-x-2">
                      <FormField
                        control={form.control}
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
                        control={form.control}
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
              variant="outline"
              className="mt-2"
              onClick={handleAddLink}
            >
              링크 추가
            </Button>
          </div>
          <div className="flex justify-center">
            <Button className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "저장중..." : "저장하기"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
