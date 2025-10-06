import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import aboutPageConfigService from "@/services/about-page-config.service";

export function useAboutPageConfig() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["about-page-config"],
    queryFn: async () => {
      const { data } = await aboutPageConfigService.get();
      return data;
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      return await aboutPageConfigService.update(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about-page-config"] });
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


