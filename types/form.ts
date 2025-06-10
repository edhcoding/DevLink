import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "이름은 필수입니다."),
  username: z.string().min(1, "닉네임은 필수입니다."),
  bio: z.string(),
  avatarUrl: z.string(),
  githubUrl: z.string(),
  blogUrl: z.string(),
  linkedinUrl: z.string(),
  links: z.array(
    z.object({
      url: z.string().min(1, "링크 URL은 필수입니다."),
      title: z.string().min(1, "제목은 필수입니다."),
    })
  ),
});

export type FormData = z.infer<typeof formSchema>;
