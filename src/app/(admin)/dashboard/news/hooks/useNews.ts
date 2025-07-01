import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import newsService from "@/services/news.service";
import sitemapService from "@/services/sitemap.service";
import { useToast } from "@/hooks/use-toast";
import type { INews } from "@/shared/types/news.types";
import { useState } from "react";

export const categoryMap: Record<string, string> = {
  production: "Производство",
  technology: "Технологии",
  event: "События",
  interview: "Интервью",
};

export function useNewsManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<INews | null>(null);
  const [deletePopoverOpen, setDeletePopoverOpen] = useState<string | null>(
    null
  );
  const [formData, setFormData] = useState({
    category: "production",
    title: "",
    content: "",
    image: undefined as File | undefined,
    shortContent: "",
    alt: "",
  });

  const { data: news = [], isLoading: isLoadingNews } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const { data } = await newsService.fetchAll();
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return newsService.create(formData);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      try {
        await sitemapService.regenerateSitemap();
      } catch (error) {
        console.error("Failed to regenerate sitemap:", error);
      }
      toast({
        title: "Успех",
        description: "Новость успешно создана",
      });
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось создать новость",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) =>
      newsService.update(id, data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      try {
        await sitemapService.regenerateSitemap();
      } catch (error) {
        console.error("Failed to regenerate sitemap:", error);
      }
      toast({
        title: "Успех",
        description: "Новость успешно обновлена",
      });
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить новость",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => newsService.delete(id),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      try {
        await sitemapService.regenerateSitemap();
      } catch (error) {
        console.error("Failed to regenerate sitemap:", error);
      }
      toast({
        title: "Успех",
        description: "Новость успешно удалена",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить новость",
        variant: "destructive",
      });
    },
  });

  return {
    news,
    isLoadingNews,
    createMutation,
    updateMutation,
    deleteMutation,
    isDialogOpen,
    setIsDialogOpen,
    editingNews,
    setEditingNews,
    deletePopoverOpen,
    setDeletePopoverOpen,
    formData,
    setFormData,
  };
}
