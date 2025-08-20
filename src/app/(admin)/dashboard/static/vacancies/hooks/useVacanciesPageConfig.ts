import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import vacanciesPageConfigService from "@/services/vacancies-page-config.service";

export function useVacanciesPageConfig() {
  const queryClient = useQueryClient();

  const { data: config, isLoading: loading } = useQuery({
    queryKey: ["vacancies-page-config"],
    queryFn: async () => {
      const { data } = await vacanciesPageConfigService.get();
      return data;
    },
  });

  const { mutateAsync: updateConfig, isPending: isUpdating } = useMutation({
    mutationFn: async (data: any) => vacanciesPageConfigService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vacancies-page-config"] });
    },
  });

  const uploadOne = async (fieldKey: string, file: File) => {
    return vacanciesPageConfigService.uploadOne(fieldKey, file);
  };

  return { config, loading, updateConfig, isUpdating, uploadOne };
}
