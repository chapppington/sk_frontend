"use client";
import { MiniLoader } from "@/components/ui/MiniLoader";
import { useProfile } from "@/hooks/useProfile";
import Image from "next/image";

export function ProfileInfo() {
  const { isLoading, user } = useProfile();

  if (isLoading)
    return (
      <div className="mt-10">
        <MiniLoader width={150} height={150} />
      </div>
    );

  return (
    <div className="mt-10">
      <div className="mb-8 p-6 border rounded-lg bg-muted/50">
        <h3 className="text-lg font-semibold mb-4">Информация о профиле</h3>
        {user.avatarPath && (
          <Image
            src={user.avatarPath}
            alt="Avatar"
            width={70}
            height={70}
            className="rounded-xl mb-6"
          />
        )}
        <br />
        <p className="text-lg">
          Ваш email: {user.email}{" "}
          <i>
            (
            {user.verificationToken
              ? "Requires email verification"
              : "Verified"}
            )
          </i>
        </p>
        <br />
        <p>Rights: {user.rights?.join(", ")}</p>
      </div>
    </div>
  );
}
