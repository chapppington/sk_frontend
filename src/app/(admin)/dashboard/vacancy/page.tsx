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
import vacancyService from "@/services/vacancy.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { IVacancy } from "@/shared/types/vacancy.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import sitemapService from "@/services/sitemap.service";

const categoryMap = {
  hr: "Кадровый резерв",
  production: "Производство",
  sales: "Продажи и маркетинг",
  office: "Офис компании",
} as const;

export default function VacancyManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState<IVacancy | null>(null);
  const [deletePopoverOpen, setDeletePopoverOpen] = useState<string | null>(
    null
  );
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    category: "hr",
    title: "",
    requirements: "",
    experience: "",
    salary: "",
  });

  const { data: vacancies = [], isLoading: isLoadingVacancies } = useQuery({
    queryKey: ["vacancies"],
    queryFn: async () => {
      const { data } = await vacancyService.fetchAll();
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: Partial<IVacancy>) => {
      return vacancyService.create(data);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["vacancies"] });

      // Regenerate sitemap after creating vacancy
      try {
        await sitemapService.regenerateSitemap();
      } catch (error) {
        console.error("Failed to regenerate sitemap:", error);
      }

      toast({
        title: "Успех",
        description: "Вакансия успешно создана",
      });
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось создать вакансию",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<IVacancy> }) =>
      vacancyService.update(id, data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["vacancies"] });

      // Regenerate sitemap after updating vacancy
      try {
        await sitemapService.regenerateSitemap();
      } catch (error) {
        console.error("Failed to regenerate sitemap:", error);
      }

      toast({
        title: "Успех",
        description: "Вакансия успешно обновлена",
      });
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить вакансию",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => vacancyService.delete(id),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["vacancies"] });

      // Regenerate sitemap after deleting vacancy
      try {
        await sitemapService.regenerateSitemap();
      } catch (error) {
        console.error("Failed to regenerate sitemap:", error);
      }

      toast({
        title: "Успех",
        description: "Вакансия успешно удалена",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить вакансию",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSend = {
      category: formData.category,
      title: formData.title,
      requirements: formData.requirements
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      experience: formData.experience
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      salary: Number(formData.salary),
    };
    if (editingVacancy) {
      updateMutation.mutate({ id: editingVacancy.id, data: dataToSend });
    } else {
      createMutation.mutate(dataToSend);
    }
  };

  const handleDelete = async (id: string) => {
    deleteMutation.mutate(id);
    setDeletePopoverOpen(null);
  };

  const handleEdit = (vacancy: IVacancy) => {
    setEditingVacancy(vacancy);
    setFormData({
      category: vacancy.category,
      title: vacancy.title,
      requirements: vacancy.requirements.join("\n"),
      experience: vacancy.experience.join("\n"),
      salary: vacancy.salary.toString(),
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
                setEditingVacancy(null);
                setFormData({
                  category: "hr",
                  title: "",
                  requirements: "",
                  experience: "",
                  salary: "",
                });
              }}
            >
              Добавить вакансию
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] p-0">
            <DialogHeader className="px-6 pt-6">
              <DialogTitle>
                {editingVacancy
                  ? "Редактировать вакансию"
                  : "Добавить вакансию"}
              </DialogTitle>
            </DialogHeader>
            <div
              className="max-h-[calc(90vh-80px)] overflow-y-auto px-6 pb-6"
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
                      {Object.entries(categoryMap).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Должность</label>
                  <Input
                    placeholder="Введите должность"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Требования (по одному на строку)
                  </label>
                  <Textarea
                    placeholder="Введите требования"
                    value={formData.requirements}
                    onChange={(e) =>
                      setFormData({ ...formData, requirements: e.target.value })
                    }
                    className="min-h-[80px]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Опыт (по одному на строку)
                  </label>
                  <Textarea
                    placeholder="Введите опыт"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    className="min-h-[80px]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Зарплата</label>
                  <Input
                    type="number"
                    placeholder="Введите зарплату"
                    value={formData.salary}
                    onChange={(e) =>
                      setFormData({ ...formData, salary: e.target.value })
                    }
                  />
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
                    {editingVacancy ? "Сохранить" : "Создать"}
                  </Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {isLoadingVacancies ? (
        <div>Загрузка...</div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Категория</TableHead>
                <TableHead>Должность</TableHead>
                <TableHead>Требования</TableHead>
                <TableHead>Опыт</TableHead>
                <TableHead>Зарплата</TableHead>
                <TableHead>Дата создания</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vacancies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    Нет вакансий
                  </TableCell>
                </TableRow>
              ) : (
                vacancies.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {categoryMap[item.category as keyof typeof categoryMap] ||
                        item.category}
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>
                      <ul className="list-disc pl-4">
                        {item.requirements.map((req, idx) => (
                          <li key={idx}>{req}</li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>
                      <ul className="list-disc pl-4">
                        {item.experience.map((exp, idx) => (
                          <li key={idx}>{exp}</li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>{item.salary}</TableCell>
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
                                Вы уверены, что хотите удалить эту вакансию?
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
