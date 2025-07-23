"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shadcn/dialog";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { Textarea } from "@/components/ui/shadcn/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import Image from "next/image";
import { UPLOADS_URL } from "@/constants";
import type { INews } from "@/shared/types/news.types";
import React from "react";
import { NEWS_CATEGORIES } from "../news.config";

type NewsDialogProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  editingNews: INews | null;
  setEditingNews: (news: INews | null) => void;
  formData: {
    category: string;
    title: string;
    content: string;
    image?: File;
    shortContent: string;
    alt: string;
    date: string;
  };
  setFormData: (data: any) => void;
  handleSubmit: (e: React.FormEvent) => void;
};

const NewsDialog: React.FC<NewsDialogProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  editingNews,
  setEditingNews,
  formData,
  setFormData,
  handleSubmit,
}) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setEditingNews(null);
            setFormData({
              category: "production",
              title: "",
              content: "",
              image: undefined,
              shortContent: "",
              alt: "",
              date: "",
            });
          }}
        >
          Добавить новость
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>
            {editingNews ? "Редактировать новость" : "Добавить новость"}
          </DialogTitle>
        </DialogHeader>
        <div
          className="h-[calc(90vh-80px)] overflow-y-auto px-6 pb-6"
          onWheel={(e) => {
            e.stopPropagation();
            const container = e.currentTarget;
            const delta = e.deltaY;
            container.scrollTop += delta;
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Категория</label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {NEWS_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Заголовок</label>
              <Input
                placeholder="Введите заголовок новости"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Содержание</label>
              <Textarea
                placeholder="Введите содержание новости"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="min-h-[200px]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Краткое содержание</label>
              <Textarea
                placeholder="Введите краткое содержание новости"
                value={formData.shortContent}
                onChange={(e) =>
                  setFormData({ ...formData, shortContent: e.target.value })
                }
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Дата публикации</label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Изображение</label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData({ ...formData, image: file });
                  }
                }}
              />
              {editingNews?.imageUrl && !formData.image && (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground mb-2">
                    Текущее изображение:
                  </p>
                  <div className="relative aspect-[16/9] w-[320px]">
                    <Image
                      src={`${UPLOADS_URL}${editingNews.imageUrl}`}
                      alt="Current news image"
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                </div>
              )}
              {formData.image && (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground mb-2">
                    Новое изображение:
                  </p>
                  <div className="relative aspect-[16/9] w-[320px]">
                    <Image
                      src={URL.createObjectURL(formData.image)}
                      alt="New news image"
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Alt текст для SEO</label>
              <Input
                placeholder="Введите описание изображения для поисковых систем"
                value={formData.alt}
                onChange={(e) =>
                  setFormData({ ...formData, alt: e.target.value })
                }
              />
              <p className="text-xs text-muted-foreground">
                Описание изображения для улучшения SEO и доступности
              </p>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Отмена
              </Button>
              <Button type="submit">
                {editingNews ? "Сохранить" : "Создать"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsDialog;
