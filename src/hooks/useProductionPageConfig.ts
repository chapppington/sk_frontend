import { useQuery } from "@tanstack/react-query";
import productionPageConfigService from "@/services/production-page-config.service";

export function useProductionPageConfig() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["production-page-config"],
    queryFn: async () => {
      const { data } = await productionPageConfigService.get();
      return data;
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  return { config: data, loading: isLoading, error: isError };
}
