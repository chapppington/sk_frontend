import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import homePageConfigService from "@/services/home-page-config.service";

export function useHomePageConfig() {
  const queryClient = useQueryClient();

  const { data: config, isLoading: loading } = useQuery({
    queryKey: ["home-page-config"],
    queryFn: async () => {
      const { data } = await homePageConfigService.get();
      return data;
    },
  });

  const { mutate: updateConfig, isPending: saving } = useMutation({
    mutationFn: async (data: any) => {
      console.log('Mutation function called with data:', data);
      const result = await homePageConfigService.update(data);
      console.log('Mutation result:', result);
      return result;
    },
    onSuccess: () => {
      console.log('Mutation successful, invalidating queries');
      queryClient.invalidateQueries({ queryKey: ["home-page-config"] });
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    },
  });

  return { config, loading, saving, updateConfig };
}
