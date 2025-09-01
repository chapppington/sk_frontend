import { useMutation } from "@tanstack/react-query";
import submissionsService from "@/services/submissions.service";
import { useToast } from "@/hooks/use-toast";
import type { ICreateSubmissionData } from "@/shared/types/submissions.types";

export function useSubmitForm(onSuccessCallback?: () => void) {
  const { toast } = useToast();

  const submitMutation = useMutation({
    mutationFn: async (data: ICreateSubmissionData) => {
      return submissionsService.create(data);
    },
    onSuccess: () => {
      toast({
        title: "Успех",
        description:
          "Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.",
      });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error: any) => {
      console.error("Ошибка отправки заявки:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Попробуйте еще раз.",
        variant: "destructive",
      });
    },
  });

  return {
    submitForm: submitMutation.mutate,
    isSubmitting: submitMutation.isPending,
    isSuccess: submitMutation.isSuccess,
    error: submitMutation.error,
    reset: submitMutation.reset,
  };
}
