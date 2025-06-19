"use client";

import { useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shadcn/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import { Input } from "@/components/ui/shadcn/input";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2 } from "lucide-react";
import portfolioService from "@/services/portfolio.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BACKEND_MAIN } from "@/constants";
import { Switch } from "@/components/ui/shadcn/switch";
import { Label } from "@/components/ui/shadcn/label";
import { IPortfolioItem } from "@/shared/types/portfolio.types";

export default function PortfolioManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPortfolio, setEditingPortfolio] =
    useState<IPortfolioItem | null>(null);
  const [deletePopoverOpen, setDeletePopoverOpen] = useState<string | null>(
    null
  );
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
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
    poster: undefined as File | undefined,
    solutionImages: [] as File[],
    reviewImage: undefined as File | undefined,
    previewVideo: undefined as File | undefined,
    fullVideo: undefined as File | undefined,
  });

  const { data: portfolio = [], isLoading: isLoadingPortfolio } = useQuery({
    queryKey: ["portfolio"],
    queryFn: async () => {
      const { data } = await portfolioService.fetchAll();
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return portfolioService.create(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      toast({
        title: "Успех",
        description: "Проект успешно создан",
      });
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось создать проект",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) =>
      portfolioService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      toast({
        title: "Успех",
        description: "Проект успешно обновлен",
      });
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить проект",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => portfolioService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      toast({
        title: "Успех",
        description: "Проект успешно удален",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить проект",
        variant: "destructive",
      });
    },
  });

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

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Управление портфолио</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingPortfolio(null);
                setFormData({
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
                });
              }}
            >
              Добавить проект
            </Button>
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
                            src={`${BACKEND_MAIN}/uploads/portfolio/${editingPortfolio.poster}`}
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
                                src={`${BACKEND_MAIN}/uploads/portfolio/${image}`}
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
                              src={`${BACKEND_MAIN}/uploads/portfolio/${editingPortfolio.previewVideoPath}`}
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
                      {editingPortfolio?.fullVideoPath &&
                        !formData.fullVideo && (
                          <div className="relative">
                            <video
                              src={`${BACKEND_MAIN}/uploads/portfolio/${editingPortfolio.fullVideoPath}`}
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
                    {(editingPortfolio?.reviewImage ||
                      formData.reviewImage) && (
                      <div className="mt-2 flex gap-2">
                        {editingPortfolio?.reviewImage &&
                          !formData.reviewImage && (
                            <div className="relative">
                              <img
                                src={`${BACKEND_MAIN}/uploads/portfolio/${editingPortfolio.reviewImage}`}
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

                <Button type="submit" className="w-full">
                  {editingPortfolio ? "Сохранить" : "Создать"}
                </Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[160px]">Постер</TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Год</TableHead>
              <TableHead>Описание</TableHead>
              <TableHead>Отзыв</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingPortfolio ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Загрузка...
                </TableCell>
              </TableRow>
            ) : portfolio.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Нет проектов
                </TableCell>
              </TableRow>
            ) : (
              portfolio.map((item: IPortfolioItem) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {item.poster && (
                      <div className="w-[160px] aspect-[16/9] relative">
                        <img
                          src={`${BACKEND_MAIN}/uploads/portfolio/${item.poster}`}
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.year}</TableCell>
                  <TableCell>
                    {item.description.length > 100
                      ? item.description.slice(0, 100) + "..."
                      : item.description}
                  </TableCell>
                  <TableCell>{item.hasReview ? "Есть" : "Нет"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(item)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Popover
                        open={deletePopoverOpen === item.id}
                        onOpenChange={(open) =>
                          setDeletePopoverOpen(open ? item.id : null)
                        }
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="space-y-4">
                            <p className="text-sm">
                              Вы уверены, что хотите удалить этот проект?
                            </p>
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setDeletePopoverOpen(null)}
                              >
                                Отмена
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(item.id)}
                                disabled={deleteMutation.isPending}
                              >
                                {deleteMutation.isPending
                                  ? "Удаление..."
                                  : "Удалить"}
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
