"use client";

import { User } from "@supabase/supabase-js";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Rocket, User as UserIcon, Wrench } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "@/lib/supabase/actions/auth/action";
import { useRouter } from "next/navigation";

export default function UserDropdown({
  user,
}: {
  user: User["user_metadata"];
}) {
  console.log(user);
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-6 cursor-pointer">
          <AvatarImage src={user.avatar_url || ""} alt="User avatar" />
          <AvatarFallback className="hover:bg-muted/50">User</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={10}>
        <DropdownMenuItem onClick={() => router.push(`/${user.name}`)}>
          <Avatar className="size-8 cursor-pointer">
            <AvatarImage src={user.avatar_url || ""} alt="User avatar" />
            <AvatarFallback className="hover:bg-muted/50">User</AvatarFallback>
          </Avatar>
          <div className="ml-1 flex flex-col">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex-col items-start">
          <div className="flex items-center gap-1">
            <Rocket className="mr-1 h-[18px] w-[18px]" />
            <span className="font-medium leading-none">안녕하세요!</span>
          </div>
          <p className="text-muted-foreground text-xs">
            오늘도 좋은 하루 되세요!
          </p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push(`/${user.name}`)}>
          <UserIcon className="mr-1" />
          프로필
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push(`/account`)}>
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
