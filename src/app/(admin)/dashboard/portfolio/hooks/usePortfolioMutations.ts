import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import portfolioService from "@/services/portfolio.service";
import sitemapService from "@/services/sitemap.service";

export const usePortfolioMutations = (onSuccess?: () => void) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return portfolioService.create(formData);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });

      // Regenerate sitemap after creating portfolio item
      try {
        await sitemapService.regenerateSitemap();
      } catch (error) {
        console.error("Failed to regenerate sitemap:", error);
      }

      toast({
        title: "Успех",
        description: "Проект успешно создан",
      });
      onSuccess?.();
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось создать проект",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) =>
      portfolioService.update(id, data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });

      // Regenerate sitemap after updating portfolio item
      try {
        await sitemapService.regenerateSitemap();
      } catch (error) {
        console.error("Failed to regenerate sitemap:", error);
      }

      toast({
        title: "Успех",
        description: "Проект успешно обновлен",
      });
      onSuccess?.();
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить проект",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => portfolioService.delete(id),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });

      // Regenerate sitemap after deleting portfolio item
      try {
        await sitemapService.regenerateSitemap();
      } catch (error) {
        console.error("Failed to regenerate sitemap:", error);
      }

      toast({
        title: "Успех",
        description: "Проект успешно удален",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить проект",
        variant: "destructive",
      });
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
