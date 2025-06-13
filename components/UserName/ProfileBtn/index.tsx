"use client";

import useShareOptions from "@/utils/useShareOptions";
import ShareBtn from "@/components/UserName/ShareBtn";
import QRBtn from "@/components/UserName/QRBtn";

export default function ProfileBtn({ username }: { username: string }) {
  const shareOptions = useShareOptions(username);

  return (
    <div className="flex gap-4 mt-4 items-center justify-end">
      <ShareBtn shareOptions={shareOptions} />
      <QRBtn shareOptions={shareOptions} />
    </div>
  );
}
