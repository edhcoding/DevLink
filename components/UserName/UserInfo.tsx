import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import TooltipWithIcon from "@/components/TooltipWithIcon";
import { Tables } from "@/database.types";

interface Props {
  profile: Tables<"profiles">;
  error: Error | null;
}

export const UserInfoSkeleton = () => (
  <>
    <Skeleton className="size-24 rounded-full mb-4" />
    <Skeleton className="h-8 w-40 mb-2" />
    <Skeleton className="h-4 w-60 mb-4" />
    <div className="flex gap-14 justify-center mb-8">
      <Skeleton className="size-10 rounded-full" />
      <Skeleton className="size-10 rounded-full" />
      <Skeleton className="size-10 rounded-full" />
    </div>
  </>
);

export const UserInfo = async ({ profile, error }: Props) => {
  if (error) throw error;
  if (!profile) throw new Error("Profile not found");

  return (
    <>
      <Avatar className="size-24 mb-4 text-black dark:text-white">
        <AvatarImage
          src={profile.avatar_url || ""}
          alt="User avatar"
          className="object-cover"
        />
        <AvatarFallback className="hover:bg-muted/50">
          <span className="text-4xl font-bold">
            {profile.username.charAt(0).toUpperCase()}
          </span>
        </AvatarFallback>
      </Avatar>
      <h1 className="text-2xl font-extrabold mb-2 ">@{profile.username}</h1>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-4 font-medium">
        {profile.bio}
      </p>
      <div className="flex gap-14 justify-center mb-8">
        {profile.github_url && (
          <a href={profile.github_url || ""} target="_blank">
            <TooltipWithIcon iconName="github" message="Github" />
          </a>
        )}

        {profile.blog_url && (
          <a href={profile.blog_url || ""} target="_blank">
            <TooltipWithIcon iconName="blog" message="Blog" />
          </a>
        )}

        {profile.linkedin_url && (
          <a href={profile.linkedin_url || ""} target="_blank">
            <TooltipWithIcon iconName="linkedin" message="Linkedin" />
          </a>
        )}
      </div>
    </>
  );
};
