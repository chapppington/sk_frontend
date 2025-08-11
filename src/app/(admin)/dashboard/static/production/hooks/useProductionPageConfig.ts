import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import productionPageConfigService from "@/services/production-page-config.service";

export function useProductionPageConfig() {
  const queryClient = useQueryClient();

  const { data: config, isLoading: loading } = useQuery({
    queryKey: ["production-page-config"],
    queryFn: async () => {
      const { data } = await productionPageConfigService.get();
      return data;
    },
  });

  const { mutate: updateConfig, isPending: saving } = useMutation({
    mutationFn: async (data: any) => {
      return productionPageConfigService.update(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["production-page-config"] });
    },
  });

  return { config, loading, saving, updateConfig };
}
