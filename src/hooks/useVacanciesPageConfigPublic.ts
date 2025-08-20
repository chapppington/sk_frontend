import { useQuery } from "@tanstack/react-query";
import vacanciesPageConfigService from "@/services/vacancies-page-config.service";

export function useVacanciesPageConfigPublic() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["vacancies-page-config"],
    queryFn: async () => {
      const { data } = await vacanciesPageConfigService.get();
      return data;
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  return { config: data, loading: isLoading, error: isError };
}
