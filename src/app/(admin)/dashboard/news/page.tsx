"use client";

import type { INews } from "@/shared/types/news.types";
import { useNewsManagement, categoryMap } from "./hooks/useNews";
import NewsDialog from "./components/NewsDialog";
import NewsTable from "./components/NewsTable";

export default function NewsManagement() {
  const {
    news,
    isLoadingNews,
    createMutation,
    updateMutation,
    deleteMutation,
    isDialogOpen,
    setIsDialogOpen,
    editingNews,
    setEditingNews,
    deletePopoverOpen,
    setDeletePopoverOpen,
    formData,
    setFormData,
  } = useNewsManagement();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("category", formData.category);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("shortContent", formData.shortContent);
    formDataToSend.append("alt", formData.alt);
    formDataToSend.append("date", formData.date);
    if (formData.image) {
      console.log("File being uploaded:", {
        name: formData.image.name,
        type: formData.image.type,
        size: formData.image.size,
      });
      formDataToSend.append("image", formData.image);
    }

    if (editingNews) {
      updateMutation.mutate({ id: editingNews.id, data: formDataToSend });
    } else {
      createMutation.mutate(formDataToSend);
    }
  };

  const handleDelete = async (id: string) => {
    deleteMutation.mutate(id);
    setDeletePopoverOpen(null);
  };

  const handleEdit = (news: INews) => {
    setEditingNews(news);
    setFormData({
      category: news.category,
      title: news.title,
      content: news.content,
      image: undefined,
      shortContent: news.shortContent || "",
      alt: news.alt || "",
      date: news.date ? news.date.slice(0, 10) : "",
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <NewsDialog
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          editingNews={editingNews}
          setEditingNews={setEditingNews}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </div>

      {isLoadingNews ? (
        <div>Загрузка...</div>
      ) : (
        <NewsTable
          news={news}
          categoryMap={categoryMap}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          deletePopoverOpen={deletePopoverOpen}
          setDeletePopoverOpen={setDeletePopoverOpen}
          deleteMutation={deleteMutation}
        />
      )}
    </div>
  );
}
