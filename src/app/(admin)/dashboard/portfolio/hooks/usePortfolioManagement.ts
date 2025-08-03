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
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingPortfolio(null);
    setFormData(initialFormData);
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
  };
};
