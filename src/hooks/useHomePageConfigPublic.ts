import { useQuery } from "@tanstack/react-query";
import homePageConfigService from "@/services/home-page-config.service";

export function useHomePageConfigPublic() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["home-page-config"],
    queryFn: async () => {
      const { data } = await homePageConfigService.get();
      return data;
    },
    staleTime: 0, // 1 минута потом
    refetchOnWindowFocus: true,
  });

  return { config: data, loading: isLoading, error: isError };
}
