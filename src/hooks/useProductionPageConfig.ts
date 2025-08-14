import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import productionPageConfigService from "@/services/production-page-config.service";

export function useProductionPageConfig() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["production-page-config"],
    queryFn: async () => {
      const { data } = await productionPageConfigService.get();
      return data;
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      return await productionPageConfigService.update(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["production-page-config"] });
    },
  });

  return {
    config: data,
    loading: isLoading,
    error: isError,
    updateConfig: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
}
