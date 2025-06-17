"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Wrench } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "@/lib/supabase/actions/auth/action";
import { useRouter } from "next/navigation";
import { Tables } from "@/database.types";

export default function UserDropdown({
  profile,
}: {
  profile: Tables<"profiles">;
}) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-6 cursor-pointer">
          <AvatarImage src={profile.avatar_url || ""} alt="User avatar" />
          <AvatarFallback className="hover:bg-muted/50 text-xs">
            User
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={10}>
        <DropdownMenuItem onClick={() => router.push(`/${profile.username}`)}>
          <Avatar className="size-8 cursor-pointer">
            <AvatarImage src={profile.avatar_url || ""} alt="User avatar" />
            <AvatarFallback className="hover:bg-muted/50">User</AvatarFallback>
          </Avatar>
          <div className="ml-1 flex flex-col">
            <p className="text-sm font-medium">{profile.name}</p>
            <p className="text-xs text-muted-foreground">{profile.email}</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push(`/${profile.username}`)}>
          <User className="mr-1" />내 프로필
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push(`/profile-setup`)}>
          <Wrench className="mr-1" /> 프로필 설정
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>
          <LogOut className="mr-1" /> 로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
