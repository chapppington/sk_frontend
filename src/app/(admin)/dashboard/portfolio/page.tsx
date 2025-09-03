"use client";

import { usePortfolioManagement } from "@/app/(admin)/dashboard/portfolio/hooks";
import {
  PortfolioTable,
  PortfolioDialog,
} from "@/app/(admin)/dashboard/portfolio/components";

export default function PortfolioManagement() {
  const {
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
  } = usePortfolioManagement();

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <PortfolioDialog
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          editingPortfolio={editingPortfolio}
          setEditingPortfolio={setEditingPortfolio}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          createMutation={createMutation}
          updateMutation={updateMutation}
          resetForm={resetForm}
          clearPoster={clearPoster}
          clearSolutionImage={clearSolutionImage}
          clearReviewImage={clearReviewImage}
          clearPreviewVideo={clearPreviewVideo}
          clearFullVideo={clearFullVideo}
        />
      </div>

      <PortfolioTable
        portfolio={portfolio}
        isLoading={isLoadingPortfolio}
        deletePopoverOpen={deletePopoverOpen}
        setDeletePopoverOpen={setDeletePopoverOpen}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        deleteMutation={deleteMutation}
      />
    </div>
  );
}
