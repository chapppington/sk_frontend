"use client";
import { MiniLoader } from "@/components/ui/MiniLoader";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/shadcn/button";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import sitemapService from "@/services/sitemap.service";
import { RefreshCw } from "lucide-react";
import Image from "next/image";

export function ProfileInfo() {
  const { isLoading, user } = useProfile();
  const { toast } = useToast();

  const { mutate: regenerateSitemap, isPending: isRegeneratingSitemap } =
    useMutation({
      mutationFn: () => sitemapService.regenerateSitemap(),
      onSuccess: (result) => {
        if (result.success) {
          toast({
            title: "Успех",
            description: `Sitemap перегенерирован успешно. URL'ов: ${result.urlsCount}`,
          });
        } else {
          toast({
            title: "Ошибка",
            description: "Не удалось перегенерировать sitemap",
            variant: "destructive",
          });
        }
      },
      onError: () => {
        toast({
          title: "Ошибка",
          description: "Не удалось перегенерировать sitemap",
          variant: "destructive",
        });
      },
    });

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

      <div className="mt-8 p-6 border rounded-lg bg-muted/50">
        <h3 className="text-lg font-semibold mb-4">Управление сайтом</h3>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => regenerateSitemap()}
          disabled={isRegeneratingSitemap}
        >
          {isRegeneratingSitemap ? (
            <MiniLoader />
          ) : (
            <RefreshCw className="w-5 h-5" />
          )}
          <span>Обновить Sitemap</span>
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          Перегенерирует sitemap.xml с актуальными данными сайта
        </p>
      </div>
    </div>
  );
}
