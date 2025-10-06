import { useQuery } from "@tanstack/react-query";
import aboutPageConfigService from "@/services/about-page-config.service";

export function useAboutPageConfigPublic() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["about-page-config-public"],
    queryFn: async () => {
      const { data } = await aboutPageConfigService.get();
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return {
    config: data,
    loading: isLoading,
    error: isError,
  };
}
