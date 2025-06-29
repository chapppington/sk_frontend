import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import sitemapService from "@/services/sitemap.service";

export const useSitemap = () => {
  const { toast } = useToast();

  // Fetch sitemap data
  const {
    data: sitemapData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["sitemap-data"],
    queryFn: () => sitemapService.getSitemapData(),
  });

  // Fetch static routes
  const {
    data: staticRoutesData,
    isLoading: isLoadingRoutes,
    refetch: refetchRoutes,
  } = useQuery({
    queryKey: ["static-routes"],
    queryFn: () => sitemapService.getStaticRoutes(),
  });

  // Fetch dynamic routes
  const {
    data: dynamicRoutesData,
    isLoading: isLoadingDynamicRoutes,
    refetch: refetchDynamicRoutes,
  } = useQuery({
    queryKey: ["dynamic-routes"],
    queryFn: () => sitemapService.getDynamicRoutes(),
  });

  // Regenerate sitemap mutation
  const { mutate: regenerateSitemap, isPending: isRegenerating } = useMutation({
    mutationFn: () => sitemapService.regenerateSitemap(),
    onSuccess: (result) => {
      if (result.success) {
        toast({
          title: "Успех",
          description: `Sitemap пересоздан успешно. URL'ов: ${result.urlsCount}`,
        });
        refetch(); // Refresh data after regeneration
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось пересоздать sitemap",
          variant: "destructive",
        });
      }
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось пересоздать sitemap",
        variant: "destructive",
      });
    },
  });

  // Update static routes mutation
  const { mutate: updateStaticRoutes, isPending: isUpdatingRoutes } =
    useMutation({
      mutationFn: (
        routes: Array<{ route: string; priority: number; changeFreq: string }>
      ) => sitemapService.updateStaticRoutes(routes),
      onSuccess: async (result) => {
        if (result.success) {
          refetchRoutes();

          // Автоматически пересоздаем sitemap после обновления статических путей
          try {
            await sitemapService.regenerateSitemap();
            refetch(); // Обновляем данные sitemap
            toast({
              title: "Sitemap обновлен",
              description:
                "Карта сайта автоматически пересоздана после изменения статических путей",
            });
          } catch (error) {
            console.error("Failed to regenerate sitemap:", error);
          }
        } else {
          toast({
            title: "Ошибка",
            description: result.message || "Не удалось обновить статичные пути",
            variant: "destructive",
          });
        }
      },
      onError: () => {
        toast({
          title: "Ошибка",
          description: "Не удалось обновить статичные пути",
          variant: "destructive",
        });
      },
    });

  // Update dynamic routes mutation
  const { mutate: updateDynamicRoutes, isPending: isUpdatingDynamicRoutes } =
    useMutation({
      mutationFn: (dynamicRoutes: any) =>
        sitemapService.updateDynamicRoutes(dynamicRoutes),
      onSuccess: async (result) => {
        if (result.success) {
          refetchDynamicRoutes();

          // Автоматически пересоздаем sitemap после обновления динамических путей
          try {
            await sitemapService.regenerateSitemap();
            refetch(); // Обновляем данные sitemap
            toast({
              title: "Sitemap обновлен",
              description:
                "Карта сайта автоматически пересоздана после изменения динамических путей",
            });
          } catch (error) {
            console.error("Failed to regenerate sitemap:", error);
          }
        } else {
          toast({
            title: "Ошибка",
            description:
              result.message || "Не удалось обновить динамические пути",
            variant: "destructive",
          });
        }
      },
      onError: () => {
        toast({
          title: "Ошибка",
          description: "Не удалось обновить динамические пути",
          variant: "destructive",
        });
      },
    });

  return {
    // Data
    sitemapData,
    staticRoutesData,
    dynamicRoutesData,

    // Loading states
    isLoading,
    isLoadingRoutes,
    isLoadingDynamicRoutes,

    // Mutation states
    isRegenerating,
    isUpdatingRoutes,
    isUpdatingDynamicRoutes,

    // Actions
    regenerateSitemap,
    updateStaticRoutes,
    updateDynamicRoutes,

    // Refetch functions
    refetch,
    refetchRoutes,
    refetchDynamicRoutes,
  };
};
