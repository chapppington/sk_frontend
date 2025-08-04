"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shadcn/dialog";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import { Label } from "@/components/ui/shadcn/label";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { BACKEND_MAIN } from "@/constants";
import Image from "next/image";
import homePageConfigService from "@/services/home-page-config.service";

interface Review {
  image: string;
  title: string;
  jobTitle: string;
  content_path: string;
}

interface ReviewForm {
  image: string;
  title: string;
  jobTitle: string;
  content_path: string;
}

interface ReviewEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (review: Review) => void;
  review?: Review | null;
  isEditing: boolean;
}

export function ReviewEditModal({
  isOpen,
  onClose,
  onSave,
  review,
  isEditing,
}: ReviewEditModalProps) {
  const [form, setForm] = useState<ReviewForm>({
    image: "",
    title: "",
    jobTitle: "",
    content_path: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedContentFile, setSelectedContentFile] = useState<File | null>(
    null
  );

  useEffect(() => {
    if (review) {
      setForm({
        image: review.image,
        title: review.title,
        jobTitle: review.jobTitle,
        content_path: review.content_path,
      });
      setSelectedFile(null);
      setSelectedContentFile(null);
    } else {
      setForm({
        image: "",
        title: "",
        jobTitle: "",
        content_path: "",
      });
      setSelectedFile(null);
      setSelectedContentFile(null);
    }
  }, [review, isOpen]);

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      try {
        const response = await homePageConfigService.uploadFile(file);

        const filename = response.data.productImage;
        setForm({ ...form, image: filename });
        setSelectedFile(null);
      } catch (error) {
        console.error("Upload error:", error);
        setSelectedFile(null);
      }
    }
  };

  const handleContentFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedContentFile(file);

      try {
        const response = await homePageConfigService.uploadFile(file);

        const filename = response.data.productImage;
        setForm({ ...form, content_path: filename });
        setSelectedContentFile(null);
      } catch (error) {
        console.error("Upload error:", error);
        setSelectedContentFile(null);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Редактировать отзыв" : "Добавить отзыв"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Имя автора</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Имя автора отзыва"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobTitle">Должность</Label>
            <Input
              id="jobTitle"
              value={form.jobTitle}
              onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
              placeholder="Должность автора"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Фото автора</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {form.image && !selectedFile && (
              <div className="mt-2">
                <p className="text-sm text-muted-foreground mb-2">
                  Текущее фото:
                </p>
                <div className="relative w-32 h-32">
                  <Image
                    src={`${BACKEND_MAIN}/uploads/home-page/${form.image}`}
                    alt="Review author"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </div>
            )}
            {selectedFile && (
              <div className="mt-2">
                <p className="text-sm text-muted-foreground mb-2">
                  Новое фото:
                </p>
                <div className="relative w-32 h-32">
                  <Image
                    src={URL.createObjectURL(selectedFile)}
                    alt="New review author"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content_path">
              Контент отзыва (изображение с текстом)
            </Label>
            <Input
              id="content_path"
              type="file"
              accept="image/*"
              onChange={handleContentFileChange}
            />
            {form.content_path && !selectedContentFile && (
              <div className="mt-2">
                <p className="text-sm text-muted-foreground mb-2">
                  Текущий контент:
                </p>
                <div className="relative w-32 h-32">
                  <Image
                    src={`${BACKEND_MAIN}/uploads/home-page/${form.content_path}`}
                    alt="Review content"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </div>
            )}
            {selectedContentFile && (
              <div className="mt-2">
                <p className="text-sm text-muted-foreground mb-2">
                  Новый контент:
                </p>
                <div className="relative w-32 h-32">
                  <Image
                    src={URL.createObjectURL(selectedContentFile)}
                    alt="New review content"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={handleCancel}>
              Отмена
            </Button>
            <Button onClick={handleSave}>
              {isEditing ? "Сохранить" : "Добавить"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
