import createClient from "@/lib/supabase/server";
import HomeContent from "@/components/Home/HomeContent";

export default async function Home() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", user.user?.email as string);

  return <HomeContent profile={profile?.[0] || null} />;
}
