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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/shadcn/sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MiniLoader } from "@/components/ui/MiniLoader";
import { Button } from "@/components/ui/shadcn/button";
import authService from "@/services/auth/auth.service";
import sitemapService from "@/services/sitemap.service";
import { useToast } from "@/hooks/use-toast";
import {
  Home,
  Newspaper,
  Briefcase,
  Box,
  Users,
  Settings,
  Globe,
  LogOut,
  ChevronDown,
  RefreshCw,
  FileText,
  Tag,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

const navItems = [
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
];

const seoSettingsItems = [
  {
    title: "Мета теги",
    url: "/dashboard/seo-settings",
    icon: Tag,
  },
  {
    title: "Robots.txt",
    url: "/dashboard/robots",
    icon: FileText,
  },
  {
    title: "Sitemap",
    url: "/dashboard/sitemap",
    icon: Globe,
  },
];

const staticContentItems = [
  { title: "Главная", url: "/dashboard/static/home" },
  { title: "О компании", url: "/dashboard/static/about" },
  { title: "О производстве", url: "/dashboard/static/production" },
  { title: "Вакансии", url: "/dashboard/static/vacancies" },
  { title: "Контакты", url: "/dashboard/static/contacts" },
  { title: "Сертификаты", url: "/dashboard/static/certificates" },
  { title: "Политика конфиденциальности", url: "/dashboard/static/privacy" },
];

export function AppSidebar() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { setOpenMobile } = useSidebar();

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
  const [staticOpen, setStaticOpen] = useState(false);

  // Функция для закрытия мобильного сайдбара
  const handleMobileClose = () => {
    setOpenMobile(false);
  };

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
              Управление контентом
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent onWheel={(e) => e.stopPropagation()}>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-3"
                    onClick={handleMobileClose}
                  >
                    <Home className="w-5 h-5" />
                    <span>Профиль</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/dashboard/global-settings"
                    className="flex items-center gap-3"
                    onClick={handleMobileClose}
                  >
                    <Settings className="w-5 h-5" />
                    <span>Глобальные настройки</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setStaticOpen((v) => !v)}>
                  <span>Статичный контент</span>
                  <ChevronDown
                    className={`ml-auto transition-transform ${
                      staticOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </SidebarMenuButton>
                {staticOpen && (
                  <SidebarMenuSub>
                    {staticContentItems.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton href={item.url} asChild>
                          <Link
                            href={item.url}
                            className="whitespace-normal break-words"
                            onClick={handleMobileClose}
                          >
                            {item.title}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Динамический контент</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center gap-3"
                      onClick={handleMobileClose}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>SEO настройки</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {seoSettingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center gap-3"
                      onClick={handleMobileClose}
                    >
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
          <Button
            variant="destructive"
            className="flex items-center gap-2"
            onClick={() => mutateLogout()}
            disabled={isLogoutPending}
          >
            {isLogoutPending ? <MiniLoader /> : <LogOut className="w-5 h-5" />}
            <span>Выйти</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
