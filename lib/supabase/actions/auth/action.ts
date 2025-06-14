"use server";

import createClient from "@/lib/supabase/server";
import { headers } from "next/headers";
import type { Provider } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function signInWithOAuth(provider: Provider) {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  const auth_callback_url = `${origin}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
    },
  });

  if (error) throw error;
  else redirect(data.url as string);
}

async function signOut() {
  const supabase = await createClient();
  supabase.auth.signOut();

  revalidatePath("/");
  redirect("/");
}

const signInWithGoogle = async () => await signInWithOAuth("google");
const signInWithGithub = async () => await signInWithOAuth("github");

export { signInWithGoogle, signInWithGithub, signOut };
