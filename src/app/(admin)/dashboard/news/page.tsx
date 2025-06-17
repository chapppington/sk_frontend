"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2 } from "lucide-react";
import newsService from "@/services/news.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BACKEND_MAIN } from "@/constants";

const categoryMap: Record<string, string> = {
  all: "Все",
  production: "Производство",
  technology: "Технологии",
  event: "События",
  interview: "Интервью",
};

interface INews {
  id: string;
  category: string;
  title: string;
  content: string;
  createdAt: string;
  imageUrl?: string;
  readingTime: number;
}

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
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
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Управление новостями</h1>
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
                });
              }}
            >
              Добавить новость
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingNews ? "Редактировать новость" : "Добавить новость"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
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
              <Input
                placeholder="Заголовок"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <Textarea
                placeholder="Содержание"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
              />
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
                    <img
                      src={`${BACKEND_MAIN}${editingNews.imageUrl}`}
                      alt="Текущее изображение новости"
                      className="w-32 h-32 object-cover rounded"
                    />
                  </div>
                )}
              </div>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {createMutation.isPending || updateMutation.isPending
                  ? "Сохранение..."
                  : editingNews
                  ? "Обновить"
                  : "Создать"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoadingNews ? (
        <div>Загрузка...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Изображение</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Заголовок</TableHead>
              <TableHead>Содержание</TableHead>
              <TableHead>Время чтения</TableHead>
              <TableHead>Дата создания</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {news.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.imageUrl && (
                    <img
                      src={`${BACKEND_MAIN}${item.imageUrl}`}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </TableCell>
                <TableCell>
                  {categoryMap[item.category] || item.category}
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {item.content}
                </TableCell>
                <TableCell>{item.readingTime} мин</TableCell>
                <TableCell>
                  {new Date(item.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(item)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Popover
                      open={deletePopoverOpen === item.id}
                      onOpenChange={(open: boolean) =>
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
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
