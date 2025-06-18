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
      {user.avatarPath && (
        <Image
          src={user.avatarPath}
          alt="Avatar"
          width={70}
          height={70}
          className="rounded-xl mb-6"
        />
      )}
      <h2 className="text-2xl font-bold">Hi, {user.name || "Anonym"}</h2>
      <br />
      <p className="text-lg">
        Ваш email: {user.email}{" "}
        <i>
          ({user.verificationToken ? "Requires email verification" : "Verified"}
          )
        </i>
      </p>
      <br />
      <p>Rights: {user.rights?.join(", ")}</p>
    </div>
  );
}
