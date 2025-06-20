"use client";

import Link from "next/link";
import { Button } from "@/components/ui/shadcn/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { PUBLIC_PAGES } from "@/config/pages/public.config";
import authService from "@/services/auth/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MiniLoader } from "@/components/ui/MiniLoader";

export function AdminNav() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();

  const { mutate: mutateLogout, isPending: isLogoutPending } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Redirect immediately
      router.push(PUBLIC_PAGES.LOGIN);

      // Clean up cache in parallel
      queryClient.setQueryData(["profile"], null);
      queryClient.setQueryData(["new tokens"], null);
    },
  });

  const isLogoutLoading = isLogoutPending || isPending;

  return (
    <nav className="w-full border-b p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold">Админ панель</h1>

          <Link
            href="/dashboard/profile"
            className="text-sm font-medium hover:text-primary"
          >
            Профиль
          </Link>
          <Link
            href="/dashboard/news"
            className="text-sm font-medium hover:text-primary"
          >
            Новости
          </Link>
          <Link
            href="/dashboard/portfolio"
            className="text-sm font-medium hover:text-primary"
          >
            Портфолио
          </Link>
          <Link
            href="/dashboard/vacancy"
            className="text-sm font-medium hover:text-primary"
          >
            Вакансии
          </Link>
        </div>
        <Button
          variant="destructive"
          onClick={() => mutateLogout()}
          disabled={isLogoutLoading}
        >
          {isLogoutLoading ? <MiniLoader /> : "Выйти"}
        </Button>
      </div>
    </nav>
  );
}
