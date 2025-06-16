import LinkList, { LinkListSkeleton } from "@/components/UserName/LinkList";
import { UserInfo, UserInfoSkeleton } from "@/components/UserName/UserInfo";
import createClient from "@/lib/supabase/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username);
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", decodedUsername)
    .single();

  if (!profile) return { title: "User Profile Not Found" };

  return {
    title: `@${profile.username} | DevLink`,
    description: profile.bio || `${profile.username}'s profile`,
    openGraph: {
      images: [{ url: profile.avatar_url || "/logo2.webp" }],
    },
  };
}

export default async function Page({ params }: Props) {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username);

  const supabase = await createClient();

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", decodedUsername)
    .single();

  const { data: links, error: linksError } = await supabase
    .from("links")
    .select("*, profiles!inner(username)")
    .eq("profiles.username", decodedUsername);

  if (profile?.username !== decodedUsername) notFound();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center pt-10 pb-6 w-full max-w-md">
        <Suspense fallback={<UserInfoSkeleton />}>
          <UserInfo profile={profile} error={profileError} />
        </Suspense>
        <Suspense fallback={<LinkListSkeleton />}>
          <LinkList
            links={links}
            error={linksError}
            username={decodedUsername}
          />
        </Suspense>
      </div>
    </main>
  );
}
