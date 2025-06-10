import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <div className="max-w-md flex flex-col items-center justify-center gap-5">
        <h1 className="text-4xl font-bold">404 Not Found</h1>
        <Separator />
        <p className="text-gray-600 dark:text-gray-400 text-center">
          사용자 정보를 불러오는데 실패했습니다. <br /> 홈으로 이동해주세요.
        </p>
        <Button variant="secondary" asChild>
          <Link href="/">홈으로 이동</Link>
        </Button>
      </div>
    </div>
  );
}
