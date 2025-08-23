import { useQuery } from "@tanstack/react-query";
import contactsPageConfigService from "@/services/contacts-page-config.service";
import { IContactsPageConfig } from "@/shared/types/contacts-page-config.types";

export function useContactsPageConfig() {
  const { data, isLoading, isError } = useQuery<IContactsPageConfig>({
    queryKey: ["contacts-page-config-public"],
    queryFn: async () => {
      const { data } = await contactsPageConfigService.get();
      return data;
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  return {
    config: data,
    loading: isLoading,
    error: isError,
  };
}
