import { containsBadWords } from "@/utils/badwordsFilter";
import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(1, "이름은 필수입니다.")
    .refine((value) => !containsBadWords(value), {
      message: "이름에 비속어를 사용할 수 없습니다.",
    }),
  username: z
    .string()
    .min(1, "닉네임은 필수입니다.")
    .refine((value) => !containsBadWords(value), {
      message: "닉네임에 비속어를 사용할 수 없습니다.",
    }),
  bio: z.string().refine((value) => !containsBadWords(value), {
    message: "자기소개에 비속어를 사용할 수 없습니다.",
  }),
  avatarUrl: z.string(),
  githubUrl: z.string(),
  blogUrl: z.string(),
  linkedinUrl: z.string(),
  links: z.array(
    z.object({
      url: z.string().min(1, "링크 URL은 필수입니다."),
      title: z
        .string()
        .min(1, "제목은 필수입니다.")
        .refine((value) => !containsBadWords(value), {
          message: "링크 제목에 비속어를 사용할 수 없습니다.",
        }),
    })
  ),
});
