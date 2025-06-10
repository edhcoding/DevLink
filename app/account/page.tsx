import Account from "@/components/Account";
import createClient from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const searchParams = new URLSearchParams({
    next: "/account",
  });

  if (error || !data.user) redirect(`/${searchParams.toString()}`);

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if (profileError) throw error;

  const { data: links, error: linksError } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", profile.id);

  if (linksError) throw linksError;

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen overflow-scroll">
      <Account profile={profile} links={links} />
    </main>
  );
}
