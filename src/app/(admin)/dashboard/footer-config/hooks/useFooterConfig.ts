import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import footerConfigService from "@/services/footer-config.service";

export function useFooterConfig() {
  const queryClient = useQueryClient();

  const { data: config, isLoading: loading } = useQuery({
    queryKey: ["footer-config"],
    queryFn: async () => {
      const { data } = await footerConfigService.get();
      return data;
    },
  });

  const { mutate: updateConfig, isPending: saving } = useMutation({
    mutationFn: async (data: any) => {
      console.log('Mutation function called with data:', data);
      const result = await footerConfigService.update(data);
      console.log('Mutation result:', result);
      return result;
    },
    onSuccess: () => {
      console.log('Mutation successful, invalidating queries');
      queryClient.invalidateQueries({ queryKey: ["footer-config"] });
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    },
  });

  return { config, loading, saving, updateConfig };
}
