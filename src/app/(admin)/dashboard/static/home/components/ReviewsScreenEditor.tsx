"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import { Label } from "@/components/ui/shadcn/label";
import { Plus } from "lucide-react";
import { ReviewCard } from "./ReviewCard";
import { ReviewEditModal } from "./ReviewEditModal";
import { useToast } from "@/hooks/use-toast";

interface Review {
  image: string;
  title: string;
  jobTitle: string;
  content_path: string;
}

interface ReviewsScreenData {
  title: string;
  subtitle: string;
  reviews: Review[];
}

interface ReviewsScreenEditorProps {
  data: ReviewsScreenData;
  onSave: (data: ReviewsScreenData) => void;
  saving: boolean;
}

export function ReviewsScreenEditor({
  data,
  onSave,
  saving,
}: ReviewsScreenEditorProps) {
  const [form, setForm] = useState<ReviewsScreenData>(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  // Автоматическое сохранение только для отзывов
  useEffect(() => {
    if (form.reviews !== data.reviews) {
      onSave(form);
      toast({
        title: "Успех",
        description: "Экран отзывов успешно сохранен",
      });
    }
  }, [form.reviews, data.reviews, onSave, toast]);

  const handleSaveHeader = () => {
    onSave(form);
    toast({
      title: "Успех",
      description: "Заголовок экрана отзывов успешно сохранен",
    });
  };

  const handleAddReview = () => {
    setEditingReview(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteReview = (index: number) => {
    const newReviews = form.reviews.filter((_, i) => i !== index);
    setForm({ ...form, reviews: newReviews });
  };

  const handleSaveReview = (review: Review) => {
    if (isEditing && editingReview) {
      // Редактирование существующего отзыва
      const index = form.reviews.findIndex((r) => r === editingReview);
      if (index !== -1) {
        const newReviews = [...form.reviews];
        newReviews[index] = review;
        setForm({ ...form, reviews: newReviews });
      }
    } else {
      // Добавление нового отзыва
      setForm({
        ...form,
        reviews: [...form.reviews, review],
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingReview(null);
    setIsEditing(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Экран отзывов</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="reviews_title">Заголовок</Label>
            <Input
              id="reviews_title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Введите заголовок"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reviews_subtitle">Подзаголовок</Label>
            <Input
              id="reviews_subtitle"
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              placeholder="Введите подзаголовок"
            />
          </div>

          <Button onClick={handleSaveHeader} disabled={saving}>
            {saving ? "Сохранение..." : "Сохранить"}
          </Button>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Отзывы ({form.reviews.length})</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddReview}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Добавить отзыв
              </Button>
            </div>

            {form.reviews.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Отзывы не добавлены</p>
                <p className="text-sm">Нажмите "Добавить отзыв" чтобы начать</p>
              </div>
            ) : (
              <div className="grid gap-3">
                {form.reviews.map((review, index) => (
                  <ReviewCard
                    key={index}
                    review={review}
                    index={index}
                    onEdit={handleEditReview}
                    onDelete={handleDeleteReview}
                  />
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <ReviewEditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveReview}
        review={editingReview}
        isEditing={isEditing}
      />
    </>
  );
}
