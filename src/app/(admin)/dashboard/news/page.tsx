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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2 } from "lucide-react";
import newsService from "@/services/news.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UPLOADS_URL } from "@/constants";
import Image from "next/image";
import type { INews } from "@/shared/types/news.types";
import sitemapService from "@/services/sitemap.service";

const categoryMap: Record<string, string> = {
  all: "Все",
  production: "Производство",
  technology: "Технологии",
  event: "События",
  interview: "Интервью",
};

export default function NewsManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<INews | null>(null);
  const [deletePopoverOpen, setDeletePopoverOpen] = useState<string | null>(
    null
  );
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    category: "all",
    title: "",
    content: "",
    image: undefined as File | undefined,
    shortContent: "",
    alt: "",
  });

  const { data: news = [], isLoading: isLoadingNews } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const { data } = await newsService.fetchAll();
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return newsService.create(formData);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });

      // Regenerate sitemap after creating news
      try {
        await sitemapService.regenerateSitemap();
      } catch (error) {
        console.error("Failed to regenerate sitemap:", error);
      }

      toast({
        title: "Успех",
        description: "Новость успешно создана",
      });
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось создать новость",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) =>
      newsService.update(id, data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });

      // Regenerate sitemap after updating news
      try {
        await sitemapService.regenerateSitemap();
      } catch (error) {
        console.error("Failed to regenerate sitemap:", error);
      }

      toast({
        title: "Успех",
        description: "Новость успешно обновлена",
      });
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить новость",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => newsService.delete(id),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });

      // Regenerate sitemap after deleting news
      try {
        await sitemapService.regenerateSitemap();
      } catch (error) {
        console.error("Failed to regenerate sitemap:", error);
      }

      toast({
        title: "Успех",
        description: "Новость успешно удалена",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить новость",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("category", formData.category);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("shortContent", formData.shortContent);
    formDataToSend.append("alt", formData.alt);
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
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingNews(null);
                setFormData({
                  category: "all",
                  title: "",
                  content: "",
                  image: undefined,
                  shortContent: "",
                  alt: "",
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
                      <SelectItem value="all">Все</SelectItem>
                      <SelectItem value="production">Производство</SelectItem>
                      <SelectItem value="technology">Технологии</SelectItem>
                      <SelectItem value="event">События</SelectItem>
                      <SelectItem value="interview">Интервью</SelectItem>
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
                  <label className="text-sm font-medium">
                    Краткое содержание
                  </label>
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
                  <label className="text-sm font-medium">
                    Alt текст для SEO
                  </label>
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
      </div>

      {isLoadingNews ? (
        <div>Загрузка...</div>
      ) : (
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[160px]">Изображение</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Заголовок</TableHead>
                <TableHead>Краткое содержание</TableHead>
                <TableHead>Время чтения</TableHead>
                <TableHead>Дата создания</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {news.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    Нет новостей
                  </TableCell>
                </TableRow>
              ) : (
                news.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.imageUrl && (
                        <div className="w-[160px] aspect-[16/9] relative">
                          <Image
                            src={`${UPLOADS_URL}/${item.imageUrl}`}
                            alt={item.alt || item.title}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {categoryMap[item.category] || item.category}
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {item.shortContent}
                    </TableCell>
                    <TableCell>{item.readingTime} мин</TableCell>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </TableCell>
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
                                Вы уверены, что хотите удалить эту новость?
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
      )}
    </div>
  );
}
