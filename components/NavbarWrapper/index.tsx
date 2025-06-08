import Navbar from "@/components/NavbarWrapper/Navbar";
import createClient from "@/lib/supabase/server";

export default async function NavbarWrapper() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  return <Navbar user={user.user} />;
}
