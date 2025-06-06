"use server";

import createClient from "@/lib/supabase/server";
import { headers } from "next/headers";
import type { Provider } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const username = formData.get("username") as string;

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        name: username,
      },
    },
  });

  if (error) throw error;
  else redirect("/");
}

export async function signInWithOAuth(provider: Provider) {
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
