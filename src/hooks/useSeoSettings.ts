import { useQuery } from "@tanstack/react-query";
import { seoSettingsService } from "@/services/seo-settings.service";

export const useSeoSettings = (pagePath: string) => {
  return useQuery({
    queryKey: ["seo-settings", pagePath],
    queryFn: async () => {
      return await seoSettingsService.getByPagePath(pagePath);
    },
    enabled: !!pagePath,
    staleTime: 5 * 60 * 1000, // 5 минут
    gcTime: 10 * 60 * 1000, // 10 минут
  });
};
