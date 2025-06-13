"use server";

import createClient from "@/lib/supabase/server";
import { formSchema } from "@/constants/form";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function uploadAvatar(formData: FormData) {
  const supabase = await createClient();
  const file = formData.get("file") as File;
  const userId = formData.get("userId") as string;

  if (!file || !userId) throw new Error("File and userId are required");

  const timestamp = Date.now();
  const fileExtension = file.name.split(".").pop();
  const filePath = `${userId}/avatar-${timestamp}.${fileExtension}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(filePath);

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: publicUrl })
    .eq("id", userId)
    .single();

  if (updateError) throw updateError;

  revalidatePath("/account");

  return publicUrl;
}

export async function updateProfile(formData: z.infer<typeof formSchema>) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not found");

  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      name: formData.name,
      username: formData.username,
      bio: formData.bio,
      avatar_url: formData.avatarUrl,
      github_url: formData.githubUrl,
      blog_url: formData.blogUrl,
    })
    .eq("id", user.id);

  if (profileError) throw profileError;

  const { error: deleteError } = await supabase
    .from("links")
    .delete()
    .eq("user_id", user.id);

  if (deleteError) throw deleteError;

  const linksToInsert = formData.links.map((link) => ({
    user_id: user.id,
    url: link.url,
    title: link.title,
  }));

  const { error: insertError } = await supabase
    .from("links")
    .insert(linksToInsert);

  if (insertError) throw insertError;

  revalidatePath("/account");

  return { success: true };
}

export async function removeAvatar(userId: string) {
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("id", userId)
    .single();

  if (error) throw error;

  if (profile.avatar_url) {
    const avatarUrl = profile.avatar_url; // 파일 경로
    const filePath = avatarUrl.split("/").pop(); // url에서 파일 이름 추출

    if (filePath) {
      const { error: removeError } = await supabase.storage
        .from("avatars")
        .remove([`${userId}/${filePath}`]);

      if (removeError) throw removeError;
    }
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: null })
    .eq("id", userId)
    .single();

  if (updateError) throw updateError;

  revalidatePath("/account");

  return { success: true };
}
