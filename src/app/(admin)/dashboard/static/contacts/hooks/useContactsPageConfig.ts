import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import contactsPageConfigService from "@/services/contacts-page-config.service";
import { IUpdateContactsPageConfigData } from "@/shared/types/contacts-page-config.types";

export function useContactsPageConfig() {
  const queryClient = useQueryClient();

  const { data: config, isLoading: loading } = useQuery({
    queryKey: ["contacts-page-config"],
    queryFn: async () => {
      const { data } = await contactsPageConfigService.get();
      return data;
    },
  });

  const { mutate: updateConfig, isPending: saving } = useMutation({
    mutationFn: async (data: IUpdateContactsPageConfigData) => {
      return contactsPageConfigService.update(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts-page-config"] });
    },
  });

  return { config, loading, saving, updateConfig };
}
