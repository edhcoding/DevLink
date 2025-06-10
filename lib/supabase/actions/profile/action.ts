"use server";

import createClient from "@/lib/supabase/server";
import { formSchema } from "@/types/form";
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

  // Upload file
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(filePath);

  // Update profile with new avatar URL
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

  // Remove current links
  const { error: deleteError } = await supabase
    .from("links")
    .delete()
    .eq("user_id", user.id);

  if (deleteError) throw deleteError;

  // Create new links
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
