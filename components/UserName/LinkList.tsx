import type { Tables } from "@/database.types";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import parse from "node-html-parser";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import ProfileBtn from "@/components/UserName/ProfileBtn";

interface Props {
  links: Tables<"links">[] | null;
  error: Error | null;
  username: string;
}

export const LinkListSkeleton = () => (
  <div className="space-y-4 max-w-[400px] w-full">
    {[...Array(3)].map((_, index) => (
      <Skeleton key={index} className="h-32 w-full rounded-md" />
    ))}
  </div>
);

async function getOgImage(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      cache: "force-cache",
    });
    const html = await response.text();
    const root = parse(html);
    return (
      root
        .querySelector('meta[property="og:image"]')
        ?.getAttribute("content") || null
    );
  } catch (error) {
    console.error("Error fetching OG image:", error);
    return null;
  }
}

export default async function LinkList({ links, error, username }: Props) {
  if (error) throw error;
  if (!links) return null;

  const linksWithOgImages = await Promise.all(
    links.map(async (link: Tables<"links">) => ({
      ...link,
      ogImage: await getOgImage(link.url),
    }))
  );

  if (links.length === 0)
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <Separator className="mb-8" />
        <p className="text-2xl font-semibold text-black dark:text-white">
          아직 추가된 링크가 없습니다.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          새로운 링크를 추가하여 시작해보세요!
        </p>
        <Separator className="mt-8" />
        <Button variant="outline" className="mt-8" asChild>
          <Link href="/account">
            링크 추가하기 <ChevronRight />
          </Link>
        </Button>
      </div>
    );

  return (
    <div className="flex flex-col gap-4 max-w-[400px] w-full px-4">
      {linksWithOgImages.map((link) => (
        <Link href={link.url} key={link.id}>
          <Card className="py-4 shadow-md">
            <CardContent className="flex space-x-6 items-center">
              <div className="w-16 h-16 rounded-xl overflow-hidden relative">
                <Image
                  src={link.ogImage || "/default-og-image.png"}
                  alt={link.title}
                  fill
                  className="object-cover w-full h-full"
                  quality={85}
                />
              </div>
              <div className="flex-1 truncate">
                <h2 className="text-xl font-medium truncate">{link.title}</h2>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
      <ProfileBtn username={username} />
    </div>
  );
}
