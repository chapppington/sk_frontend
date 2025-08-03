"use client";

import { Button } from "@/components/ui/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shadcn/dialog";
import { Input } from "@/components/ui/shadcn/input";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { Switch } from "@/components/ui/shadcn/switch";
import { Label } from "@/components/ui/shadcn/label";
import { BACKEND_MAIN, UPLOADS_URL } from "@/constants";
import { IPortfolioItem } from "@/shared/types/portfolio.types";

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

interface PortfolioDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  editingPortfolio: IPortfolioItem | null;
  setEditingPortfolio: (portfolio: IPortfolioItem | null) => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
  handleSubmit: (e: React.FormEvent) => void;
  createMutation: {
    isPending: boolean;
  };
  updateMutation: {
    isPending: boolean;
  };
  resetForm: () => void;
}

export default function PortfolioDialog({
  isDialogOpen,
  setIsDialogOpen,
  editingPortfolio,
  setEditingPortfolio,
  formData,
  setFormData,
  handleSubmit,
  createMutation,
  updateMutation,
  resetForm,
}: PortfolioDialogProps) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={resetForm}>Добавить проект</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>
            {editingPortfolio ? "Редактировать проект" : "Новый проект"}
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Название проекта</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Год</Label>
              <Input
                type="number"
                value={formData.year}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    year: parseInt(e.target.value),
                  })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Описание проекта</Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Заголовок задачи</Label>
              <Input
                value={formData.taskTitle}
                onChange={(e) =>
                  setFormData({ ...formData, taskTitle: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Описание задачи</Label>
              <Textarea
                value={formData.taskDescription}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    taskDescription: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Заголовок решения</Label>
              <Input
                value={formData.solutionTitle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    solutionTitle: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Описание решения</Label>
              <Textarea
                value={formData.solutionDescription}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    solutionDescription: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Подзаголовок решения</Label>
              <Input
                value={formData.solutionSubtitle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    solutionSubtitle: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Подописание решения</Label>
              <Textarea
                value={formData.solutionSubdescription}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    solutionSubdescription: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Постер</Label>
              <Input
                type="file"
                accept="image/*"
                required
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    poster: e.target.files?.[0],
                  })
                }
              />
              {(editingPortfolio?.poster || formData.poster) && (
                <div className="mt-2 flex gap-2">
                  {editingPortfolio?.poster && !formData.poster && (
                    <div className="relative">
                      <img
                        src={`${UPLOADS_URL}/uploads/portfolio/${editingPortfolio.poster}`}
                        alt="Current poster"
                        className="w-32 aspect-[16/9] object-cover rounded"
                      />
                      <span className="absolute top-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                        Текущий
                      </span>
                    </div>
                  )}
                  {formData.poster && (
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(formData.poster)}
                        alt="New poster"
                        className="w-32 aspect-[16/9] object-cover rounded"
                      />
                      <span className="absolute top-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                        Новый
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Изображения решения (до 2)</Label>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    solutionImages: Array.from(e.target.files || []),
                  })
                }
              />
              {(editingPortfolio?.solutionImages?.length ||
                formData.solutionImages.length) > 0 && (
                <div className="mt-2 flex gap-2">
                  {editingPortfolio?.solutionImages?.map(
                    (image, index) =>
                      !formData.solutionImages[index] && (
                        <div key={image} className="relative">
                          <img
                            src={`${UPLOADS_URL}/uploads/portfolio/${image}`}
                            alt={`Current solution image ${index + 1}`}
                            className="w-32 aspect-[16/9] object-cover rounded"
                          />
                          <span className="absolute top-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                            Текущее {index + 1}
                          </span>
                        </div>
                      )
                  )}
                  {formData.solutionImages.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`New solution image ${index + 1}`}
                        className="w-32 aspect-[16/9] object-cover rounded"
                      />
                      <span className="absolute top-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                        Новое {index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Превью видео</Label>
              <Input
                type="file"
                accept="video/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    previewVideo: e.target.files?.[0],
                  })
                }
              />
              {(editingPortfolio?.previewVideoPath ||
                formData.previewVideo) && (
                <div className="mt-2 flex gap-2">
                  {editingPortfolio?.previewVideoPath &&
                    !formData.previewVideo && (
                      <div className="relative">
                        <video
                          src={`${UPLOADS_URL}/uploads/portfolio/${editingPortfolio.previewVideoPath}`}
                          className="w-32 h-32 object-cover rounded"
                          controls
                        />
                        <span className="absolute top-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                          Текущее
                        </span>
                      </div>
                    )}
                  {formData.previewVideo && (
                    <div className="relative">
                      <video
                        src={URL.createObjectURL(formData.previewVideo)}
                        className="w-32 h-32 object-cover rounded"
                        controls
                      />
                      <span className="absolute top-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                        Новое
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Полное видео</Label>
              <Input
                type="file"
                accept="video/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fullVideo: e.target.files?.[0],
                  })
                }
              />
              {(editingPortfolio?.fullVideoPath || formData.fullVideo) && (
                <div className="mt-2 flex gap-2">
                  {editingPortfolio?.fullVideoPath && !formData.fullVideo && (
                    <div className="relative">
                      <video
                        src={`${UPLOADS_URL}/uploads/portfolio/${editingPortfolio.fullVideoPath}`}
                        className="w-32 h-32 object-cover rounded"
                        controls
                      />
                      <span className="absolute top-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                        Текущее
                      </span>
                    </div>
                  )}
                  {formData.fullVideo && (
                    <div className="relative">
                      <video
                        src={URL.createObjectURL(formData.fullVideo)}
                        className="w-32 h-32 object-cover rounded"
                        controls
                      />
                      <span className="absolute top-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                        Новое
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.hasReview}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, hasReview: checked })
                  }
                />
                <Label>Добавить отзыв</Label>
              </div>
            </div>

            {formData.hasReview && (
              <div className="space-y-4 mt-4">
                <Input
                  placeholder="Заголовок отзыва"
                  value={formData.reviewTitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      reviewTitle: e.target.value,
                    })
                  }
                />
                <Textarea
                  placeholder="Текст отзыва"
                  value={formData.reviewText}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      reviewText: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Имя автора отзыва"
                  value={formData.reviewName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      reviewName: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Должность автора отзыва"
                  value={formData.reviewRole}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      reviewRole: e.target.value,
                    })
                  }
                />
                <div className="space-y-2">
                  <Label>Фото автора отзыва</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFormData({ ...formData, reviewImage: file });
                      }
                    }}
                  />
                </div>
                {(editingPortfolio?.reviewImage || formData.reviewImage) && (
                  <div className="mt-2 flex gap-2">
                    {editingPortfolio?.reviewImage && !formData.reviewImage && (
                      <div className="relative">
                        <img
                          src={`${UPLOADS_URL}/uploads/portfolio/${editingPortfolio.reviewImage}`}
                          alt="Current review image"
                          className="w-32 aspect-[16/9] object-cover rounded"
                        />
                        <span className="absolute top-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                          Текущее
                        </span>
                      </div>
                    )}
                    {formData.reviewImage && (
                      <div className="relative">
                        <img
                          src={URL.createObjectURL(formData.reviewImage)}
                          alt="New review image"
                          className="w-32 aspect-[16/9] object-cover rounded"
                        />
                        <span className="absolute top-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                          Новое
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {createMutation.isPending || updateMutation.isPending
                ? "Сохранение..."
                : editingPortfolio
                ? "Сохранить"
                : "Создать"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
