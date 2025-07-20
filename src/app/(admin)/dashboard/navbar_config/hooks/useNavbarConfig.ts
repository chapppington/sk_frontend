import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import navbarConfigService from "@/services/navbar-config.service";
import { useToast } from "@/hooks/use-toast";

export function useNavbarConfig() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: config,
    isLoading: loading,
  } = useQuery({
    queryKey: ["navbar-config"],
    queryFn: async () => {
      const { data } = await navbarConfigService.get();
      return data;
    },
  });

  const { mutate: updateConfig, isPending: saving } = useMutation({
    mutationFn: async (data: any) => {
      return navbarConfigService.update(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["navbar-config"] });
      toast({ title: "Успешно", description: "Конфиг навбара обновлён" });
    },
    onError: () => {
      toast({ title: "Ошибка", description: "Не удалось сохранить конфиг", variant: "destructive" });
    },
  });

  return { config, loading, saving, updateConfig };
}
