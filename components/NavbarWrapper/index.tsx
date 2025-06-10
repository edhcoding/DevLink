import Navbar from "@/components/NavbarWrapper/Navbar";
import createClient from "@/lib/supabase/server";

export default async function NavbarWrapper() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.user?.id || "")
    .single();

  return <Navbar profile={profile} />;
}
