"use client";

import { useState } from "react";
import {
  type SeoSettings,
  type CreateSeoSettingsDto,
  type SeoPreview,
} from "@/services/seo-settings.service";
import { SeoFormDialog } from "./components/SeoFormDialog";
import { HelpDialog } from "./components/HelpDialog";
import { PreviewDialog } from "./components/PreviewDialog";
import { SeoSettingsTable } from "./components/SeoSettingsTable";
import { defaultFormData, resetFormData } from "./utils";
import { useSeoSettings } from "./hooks";

export default function SeoSettingsManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [editingSeo, setEditingSeo] = useState<SeoSettings | null>(null);
  const [preview, setPreview] = useState<SeoPreview | undefined>(undefined);

  const [formData, setFormData] =
    useState<CreateSeoSettingsDto>(defaultFormData);

  const {
    seoSettings,
    isLoadingSeo,
    isCreating,
    isUpdating,
    isDeleting,
    createSeoSettings,
    updateSeoSettings,
    deleteSeoSettings,
    getPreview,
  } = useSeoSettings();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingSeo) {
      updateSeoSettings({ id: editingSeo.id, data: formData });
      setIsDialogOpen(false);
    } else {
      createSeoSettings(formData);
      setIsDialogOpen(false);
    }
  };

  const handleDelete = async (id: string) => {
    deleteSeoSettings(id);
  };

  const handleEdit = (seo: SeoSettings) => {
    setEditingSeo(seo);
    setFormData({
      pagePath: seo.pagePath,
      pageName: seo.pageName,
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords || "",
      ogTitle: seo.ogTitle || "",
      ogDescription: seo.ogDescription || "",
      ogImage: seo.ogImage || "",
      canonicalUrl: seo.canonicalUrl || "",
      isActive: seo.isActive,
    });
    setIsDialogOpen(true);
  };

  const handlePreview = async (seo: SeoSettings) => {
    setEditingSeo(seo);
    setIsPreviewOpen(true);
    try {
      const previewData = await getPreview(seo);
      setPreview(previewData);
    } catch (error) {
      console.error("Failed to fetch preview:", error);
    }
  };

  const resetForm = () => {
    setEditingSeo(null);
    setFormData(resetFormData());
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          <SeoFormDialog
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            editingSeo={editingSeo}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            isPending={isCreating || isUpdating}
            onReset={resetForm}
          />

          <HelpDialog isOpen={isHelpOpen} onOpenChange={setIsHelpOpen} />
        </div>
      </div>

      <SeoSettingsTable
        seoSettings={seoSettings}
        isLoading={isLoadingSeo}
        isDeleting={isDeleting}
        onEdit={handleEdit}
        onPreview={handlePreview}
        onDelete={handleDelete}
      />

      <PreviewDialog
        isOpen={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        preview={preview}
      />
    </div>
  );
}
