"use client";

import { useProfile } from "@/hooks/useProfile";
import { AppSidebar } from "./AppSidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/shadcn/sidebar";

export function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useProfile();

  return (
    <>
      {user?.isLoggedIn && (
        <SidebarProvider>
          <div className="flex min-h-screen w-full relative">
            <div className="relative">
              <AppSidebar />
              <SidebarTrigger className="absolute top-4 -right-14 z-50 w-12 h-12 shadow-lg bg-background border rounded-full" />
            </div>
            <main className="flex-1 flex flex-col bg-background text-foreground mt-10">
              <div className="container mx-auto px-6">{children}</div>
            </main>
          </div>
        </SidebarProvider>
      )}
      {!user?.isLoggedIn && (
        <main className="flex min-h-screen flex-col items-center justify-between bg-background text-foreground mt-10">
          {children}
        </main>
      )}
    </>
  );
}
