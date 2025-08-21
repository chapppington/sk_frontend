import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import certificatesPageConfigService from "@/services/certificates-page-config.service";
import {
  ICertificatesPageConfig,
  IUpdateCertificatesPageConfigData,
} from "@/shared/types/certificates-page-config.types";

export function useCertificatesPageConfig() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<ICertificatesPageConfig>({
    queryKey: ["certificates-page-config"],
    queryFn: async () => {
      const { data } = await certificatesPageConfigService.get();
      return data;
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  const updateMutation = useMutation({
    mutationFn: async (data: IUpdateCertificatesPageConfigData) => {
      return await certificatesPageConfigService.update(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates-page-config"] });
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
