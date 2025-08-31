"use client";

import React from "react";
import { Button } from "@/components/ui/shadcn/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import {
  useSubmissionsManagement,
  FORM_TYPE_MAP,
} from "./hooks/useSubmissions";
import { SubmissionsTable, SubmissionViewDialog } from "./components";
import type { FormType } from "@/shared/types/submissions.types";

export default function SubmissionsManagement() {
  const {
    submissions,
    isLoadingSubmissions,
    deleteMutation,
    selectedFormType,
    setSelectedFormType,
    deletePopoverOpen,
    setDeletePopoverOpen,
    viewingSubmission,
    isViewDialogOpen,
    setIsViewDialogOpen,
    handleView,
    handleDelete,
  } = useSubmissionsManagement();

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Заявки с сайта</h1>
          <p className="text-gray-600 mt-2">
            Управление заявками, поступившими с различных форм сайта
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Select
            value={selectedFormType || "all"}
            onValueChange={(value: FormType | "all") =>
              setSelectedFormType(value === "all" ? "" : (value as FormType))
            }
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Все типы форм" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все типы форм</SelectItem>
              {Object.entries(FORM_TYPE_MAP).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="text-sm text-gray-500">
            Всего: {submissions.length}
          </div>
        </div>
      </div>

      {isLoadingSubmissions ? (
        <div className="flex justify-center items-center py-10">
          <div>Загрузка...</div>
        </div>
      ) : (
        <SubmissionsTable
          submissions={submissions}
          handleView={handleView}
          handleDelete={handleDelete}
          deletePopoverOpen={deletePopoverOpen}
          setDeletePopoverOpen={setDeletePopoverOpen}
          deleteMutation={deleteMutation}
        />
      )}

      <SubmissionViewDialog
        submission={viewingSubmission}
        isOpen={isViewDialogOpen}
        onClose={() => {
          setIsViewDialogOpen(false);
          // Небольшая задержка для плавного закрытия
          setTimeout(() => {
            if (!isViewDialogOpen) {
              // setViewingSubmission(null);
            }
          }, 200);
        }}
      />
    </div>
  );
}
