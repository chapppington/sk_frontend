import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import submissionsService from "@/services/submissions.service";
import { useToast } from "@/hooks/use-toast";
import type { ISubmission, FormType } from "@/shared/types/submissions.types";
import { useState } from "react";

export const FORM_TYPE_MAP: Record<FormType, string> = {
  REQUEST: "Заявка",
  VACANCY: "Вакансия",
  QUESTIONNAIRE: "Анкета",
  DEFAULT: "Прочее",
};

export function useSubmissionsManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedFormType, setSelectedFormType] = useState<FormType | "">("");
  const [deletePopoverOpen, setDeletePopoverOpen] = useState<string | null>(
    null
  );
  const [viewingSubmission, setViewingSubmission] =
    useState<ISubmission | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const { data: submissions = [], isLoading: isLoadingSubmissions } = useQuery({
    queryKey: ["submissions", selectedFormType],
    queryFn: async () => {
      const { data } = await submissionsService.fetchAll(
        selectedFormType || undefined
      );
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => submissionsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      toast({
        title: "Успех",
        description: "Заявка успешно удалена",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить заявку",
        variant: "destructive",
      });
    },
  });

  const handleView = (submission: ISubmission) => {
    setViewingSubmission(submission);
    setIsViewDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    deleteMutation.mutate(id);
    setDeletePopoverOpen(null);
  };

  const sortedSubmissions = [...submissions].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return {
    submissions: sortedSubmissions,
    isLoadingSubmissions,
    deleteMutation,
    selectedFormType,
    setSelectedFormType,
    deletePopoverOpen,
    setDeletePopoverOpen,
    viewingSubmission,
    setViewingSubmission,
    isViewDialogOpen,
    setIsViewDialogOpen,
    handleView,
    handleDelete,
  };
}
