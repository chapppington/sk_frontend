"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/shadcn/sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { MiniLoader } from "@/components/ui/MiniLoader";
import authService from "@/services/auth/auth.service";
import {
  Home,
  Newspaper,
  Briefcase,
  Box,
  Users,
  Settings,
  Globe,
  LogOut,
} from "lucide-react";
import { useTheme } from "next-themes";

const navItems = [
  {
    title: "Профиль",
    url: "/dashboard/profile",
    icon: Home,
  },
  {
    title: "Новости",
    url: "/dashboard/news",
    icon: Newspaper,
  },
  {
    title: "Портфолио",
    url: "/dashboard/portfolio",
    icon: Briefcase,
  },
  {
    title: "Товары",
    url: "/dashboard/products",
    icon: Box,
  },
  {
    title: "Вакансии",
    url: "/dashboard/vacancy",
    icon: Users,
  },
  {
    title: "SEO настройки",
    url: "/dashboard/seo-settings",
    icon: Globe,
  },
  {
    title: "Глобальные настройки",
    url: "/dashboard/global-settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: mutateLogout, isPending: isLogoutPending } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      router.push("/login");
      queryClient.setQueryData(["profile"], null);
      queryClient.setQueryData(["new tokens"], null);
    },
  });
  const { theme, resolvedTheme } = useTheme();
  const isDark = theme === "dark" || resolvedTheme === "dark";

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-start h-16 px-2 gap-3">
          <img
            src={isDark ? "/светлый.svg" : "/цвет.svg"}
            alt="Логотип"
            className="h-8"
          />
          <div className="flex flex-col">
            <span className="font-bold text-sm leading-tight">СИБКОМПЛЕКТ</span>
            <span className="text-xs text-muted-foreground leading-tight mt-1">
              Админ панель
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Навигация</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-2 p-4 border-t">
          <ModeToggle />
          <button
            className="flex items-center gap-2 text-destructive hover:underline"
            onClick={() => mutateLogout()}
            disabled={isLogoutPending}
          >
            {isLogoutPending ? <MiniLoader /> : <LogOut className="w-5 h-5" />}
            <span>Выйти</span>
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
