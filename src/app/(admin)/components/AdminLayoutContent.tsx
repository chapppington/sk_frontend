"use client";

import { useProfile } from "@/hooks/useProfile";
import { AdminNav } from "./AdminNav";

export function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useProfile();

  return (
    <>
      {user?.isLoggedIn && <AdminNav />}
      <main className="flex min-h-screen flex-col items-center justify-between p-8">
        {children}
      </main>
    </>
  );
}
