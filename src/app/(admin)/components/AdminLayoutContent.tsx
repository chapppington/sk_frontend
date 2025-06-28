"use client";

import { useProfile } from "@/hooks/useProfile";
import { AppSidebar } from "./AppSidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/shadcn/sidebar";
import AdminBreadcrumbs from "./AdminBreadcrumbs";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { useIsMobile } from "@/hooks/use-mobile";

export function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useProfile();

  function BreadcrumbsWithSidebarPosition() {
    const sidebar = useSidebar();
    const isMobile = useIsMobile();

    let left = "17rem";
    if (sidebar.state === "collapsed") left = "1rem";

    // На мобильных устройствах кнопка всегда слева
    if (isMobile) {
      left = "1rem";
    }

    return (
      <div
        className="absolute top-4 flex items-center gap-4 z-50 transition-[left] duration-200 ease-linear"
        style={{ left }}
      >
        <SidebarTrigger className="min-w-[3rem] w-12 h-12 shadow-lg bg-background border rounded-full" />
        <AdminBreadcrumbs />
      </div>
    );
  }

  return (
    <>
      {user?.isLoggedIn && (
        <SidebarProvider>
          <div className="flex min-h-screen w-full relative">
            <div className="relative">
              <AppSidebar />
              <BreadcrumbsWithSidebarPosition />
            </div>
            <main className="flex-1 flex flex-col bg-background text-foreground mt-10">
              <div className="container mx-auto px-6">{children}</div>
            </main>
            {/* Fixed theme toggle in top-right corner */}
            <div className="fixed top-4 right-4 z-50">
              <ModeToggle />
            </div>
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
