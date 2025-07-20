import { useQuery } from "@tanstack/react-query";
import navbarConfigService from "@/services/navbar-config.service";

export function useNavbarConfigPublic() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["navbar-config"],
    queryFn: async () => {
      const { data } = await navbarConfigService.get();
      return data;
    },
    staleTime: 0, // 1 минута потом
    refetchOnWindowFocus: true,
  });

  return { config: data, loading: isLoading, error: isError };
} 