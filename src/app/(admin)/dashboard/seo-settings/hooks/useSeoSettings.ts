import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  seoSettingsService,
  type SeoSettings,
  type CreateSeoSettingsDto,
  type UpdateSeoSettingsDto,
  type SeoPreview,
} from "@/services/seo-settings.service";

export const useSeoSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Query for all SEO settings
  const { data: seoSettings = [], isLoading: isLoadingSeo } = useQuery({
    queryKey: ["seo-settings"],
    queryFn: async () => {
      return await seoSettingsService.getAll();
    },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: CreateSeoSettingsDto) => {
      return seoSettingsService.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seo-settings"] });
      toast({
        title: "Успех",
        description: "Настройки мета тегов успешно созданы",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось создать настройки мета тегов",
        variant: "destructive",
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateSeoSettingsDto;
    }) => seoSettingsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seo-settings"] });
      toast({
        title: "Успех",
        description: "Настройки мета тегов успешно обновлены",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить настройки мета тегов",
        variant: "destructive",
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => seoSettingsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seo-settings"] });
      toast({
        title: "Успех",
        description: "Настройки мета тегов успешно удалены",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить настройки мета тегов",
        variant: "destructive",
      });
    },
  });

  // Helper function to get preview
  const getPreview = async (editingSeo: SeoSettings): Promise<SeoPreview> => {
    return await queryClient.fetchQuery({
      queryKey: ["seo-preview", editingSeo.id],
      queryFn: async () => {
        return await seoSettingsService.getPreview(editingSeo.id);
      },
    });
  };

  return {
    // Data
    seoSettings,

    // Loading states
    isLoadingSeo,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,

    // Mutations
    createSeoSettings: createMutation.mutate,
    updateSeoSettings: updateMutation.mutate,
    deleteSeoSettings: deleteMutation.mutate,

    // Helper functions
    getPreview,
  };
};
