import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import portfolioService from "@/services/portfolio.service";
import { IPortfolioItem } from "@/shared/types/portfolio.types";
import { usePortfolioMutations } from "./usePortfolioMutations";

interface FormData {
  name: string;
  year: number;
  description: string;
  taskTitle: string;
  taskDescription: string;
  solutionTitle: string;
  solutionDescription: string;
  solutionSubtitle: string;
  solutionSubdescription: string;
  hasReview: boolean;
  reviewTitle: string;
  reviewText: string;
  reviewName: string;
  reviewRole: string;
  poster: File | undefined;
  solutionImages: File[];
  reviewImage: File | undefined;
  previewVideo: File | undefined;
  fullVideo: File | undefined;
  // Флаги для отслеживания удаленных фотографий
  clearPoster: boolean;
  clearSolutionImages: boolean[];
  clearReviewImage: boolean;
  clearPreviewVideo: boolean;
  clearFullVideo: boolean;
}

const initialFormData: FormData = {
  name: "",
  year: new Date().getFullYear(),
  description: "",
  taskTitle: "",
  taskDescription: "",
  solutionTitle: "",
  solutionDescription: "",
  solutionSubtitle: "",
  solutionSubdescription: "",
  hasReview: false,
  reviewTitle: "",
  reviewText: "",
  reviewName: "",
  reviewRole: "",
  poster: undefined,
  solutionImages: [],
  reviewImage: undefined,
  previewVideo: undefined,
  fullVideo: undefined,
  clearPoster: false,
  clearSolutionImages: [],
  clearReviewImage: false,
  clearPreviewVideo: false,
  clearFullVideo: false,
};

export const usePortfolioManagement = () => {
  // State management
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPortfolio, setEditingPortfolio] =
    useState<IPortfolioItem | null>(null);
  const [deletePopoverOpen, setDeletePopoverOpen] = useState<string | null>(
    null
  );
  const [formData, setFormData] = useState<FormData>(initialFormData);

  // Mutations
  const { createMutation, updateMutation, deleteMutation } =
    usePortfolioMutations(() => setIsDialogOpen(false));

  // Data fetching
  const { data: portfolio = [], isLoading: isLoadingPortfolio } = useQuery({
    queryKey: ["portfolio"],
    queryFn: async () => {
      const { data } = await portfolioService.fetchAll();
      return data;
    },
  });

  // Event handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("year", formData.year.toString());
    formDataToSend.append("description", formData.description);
    formDataToSend.append("taskTitle", formData.taskTitle);
    formDataToSend.append("taskDescription", formData.taskDescription);
    formDataToSend.append("solutionTitle", formData.solutionTitle);
    formDataToSend.append("solutionDescription", formData.solutionDescription);
    formDataToSend.append("solutionSubtitle", formData.solutionSubtitle);
    formDataToSend.append(
      "solutionSubdescription",
      formData.solutionSubdescription
    );
    formDataToSend.append("hasReview", formData.hasReview.toString());

    if (formData.hasReview) {
      formDataToSend.append("reviewTitle", formData.reviewTitle);
      formDataToSend.append("reviewText", formData.reviewText);
      formDataToSend.append("reviewName", formData.reviewName);
      formDataToSend.append("reviewRole", formData.reviewRole);
    }

    // Обработка новых файлов
    if (formData.poster) {
      formDataToSend.append("poster", formData.poster);
    }
    if (formData.solutionImages.length > 0) {
      formData.solutionImages.forEach((file) => {
        formDataToSend.append("solutionImages", file);
      });
    }
    if (formData.reviewImage) {
      formDataToSend.append("reviewImage", formData.reviewImage);
    }
    if (formData.previewVideo) {
      formDataToSend.append("previewVideo", formData.previewVideo);
    }
    if (formData.fullVideo) {
      formDataToSend.append("fullVideo", formData.fullVideo);
    }

    // Обработка флагов удаления (только для редактирования)
    if (editingPortfolio) {
      if (formData.clearPoster) {
        formDataToSend.append("clearPoster", "true");
      }
      if (formData.clearReviewImage) {
        formDataToSend.append("clearReviewImage", "true");
      }
      if (formData.clearPreviewVideo) {
        formDataToSend.append("clearPreviewVideo", "true");
      }
      if (formData.clearFullVideo) {
        formDataToSend.append("clearFullVideo", "true");
      }
      // Для solutionImages отправляем массив индексов для удаления
      formData.clearSolutionImages.forEach((shouldClear, index) => {
        if (shouldClear) {
          formDataToSend.append("clearSolutionImageIndex", index.toString());
        }
      });
    }

    if (editingPortfolio) {
      updateMutation.mutate({ id: editingPortfolio.id, data: formDataToSend });
    } else {
      createMutation.mutate(formDataToSend);
    }
  };

  const handleDelete = async (id: string) => {
    deleteMutation.mutate(id);
    setDeletePopoverOpen(null);
  };

  const handleEdit = (portfolio: IPortfolioItem) => {
    setEditingPortfolio(portfolio);
    setFormData({
      name: portfolio.name,
      year: portfolio.year,
      description: portfolio.description,
      taskTitle: portfolio.taskTitle,
      taskDescription: portfolio.taskDescription,
      solutionTitle: portfolio.solutionTitle,
      solutionDescription: portfolio.solutionDescription,
      solutionSubtitle: portfolio.solutionSubtitle,
      solutionSubdescription: portfolio.solutionSubdescription,
      hasReview: portfolio.hasReview,
      reviewTitle: portfolio.reviewTitle || "",
      reviewText: portfolio.reviewText || "",
      reviewName: portfolio.reviewName || "",
      reviewRole: portfolio.reviewRole || "",
      poster: undefined,
      solutionImages: [],
      reviewImage: undefined,
      previewVideo: undefined,
      fullVideo: undefined,
      clearPoster: false,
      clearSolutionImages: new Array(
        portfolio.solutionImages?.length || 0
      ).fill(false),
      clearReviewImage: false,
      clearPreviewVideo: false,
      clearFullVideo: false,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingPortfolio(null);
    setFormData(initialFormData);
  };

  // Функции для удаления фотографий
  const clearPoster = () => {
    setFormData((prev) => ({
      ...prev,
      clearPoster: true,
      poster: undefined,
    }));
  };

  const clearSolutionImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      clearSolutionImages: prev.clearSolutionImages.map((clear, i) =>
        i === index ? true : clear
      ),
    }));
  };

  const clearReviewImage = () => {
    setFormData((prev) => ({
      ...prev,
      clearReviewImage: true,
      reviewImage: undefined,
    }));
  };

  const clearPreviewVideo = () => {
    setFormData((prev) => ({
      ...prev,
      clearPreviewVideo: true,
      previewVideo: undefined,
    }));
  };

  const clearFullVideo = () => {
    setFormData((prev) => ({
      ...prev,
      clearFullVideo: true,
      fullVideo: undefined,
    }));
  };

  return {
    // State
    isDialogOpen,
    setIsDialogOpen,
    editingPortfolio,
    setEditingPortfolio,
    deletePopoverOpen,
    setDeletePopoverOpen,
    formData,
    setFormData,

    // Data
    portfolio,
    isLoadingPortfolio,

    // Mutations
    createMutation,
    updateMutation,
    deleteMutation,

    // Handlers
    handleSubmit,
    handleDelete,
    handleEdit,
    resetForm,

    // Clear functions
    clearPoster,
    clearSolutionImage,
    clearReviewImage,
    clearPreviewVideo,
    clearFullVideo,
  };
};
