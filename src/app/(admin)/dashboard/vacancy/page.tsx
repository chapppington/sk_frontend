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
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, ChevronDown, ChevronUp, Plus, X } from "lucide-react";
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
  const [expandedRequirements, setExpandedRequirements] = useState<Set<string>>(
    new Set()
  );
  const [expandedExperience, setExpandedExperience] = useState<Set<string>>(
    new Set()
  );
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    category: "hr",
    title: "",
    requirements: [""],
    experience: [""],
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
      requirements: formData.requirements.filter(Boolean),
      experience: formData.experience.filter(Boolean),
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
      requirements:
        vacancy.requirements.length > 0 ? vacancy.requirements : [""],
      experience: vacancy.experience.length > 0 ? vacancy.experience : [""],
      salary: vacancy.salary.toString(),
    });
    setIsDialogOpen(true);
  };

  const toggleRequirements = (vacancyId: string) => {
    const newExpanded = new Set(expandedRequirements);
    if (newExpanded.has(vacancyId)) {
      newExpanded.delete(vacancyId);
    } else {
      newExpanded.add(vacancyId);
    }
    setExpandedRequirements(newExpanded);
  };

  const toggleExperience = (vacancyId: string) => {
    const newExpanded = new Set(expandedExperience);
    if (newExpanded.has(vacancyId)) {
      newExpanded.delete(vacancyId);
    } else {
      newExpanded.add(vacancyId);
    }
    setExpandedExperience(newExpanded);
  };

  const addRequirement = () => {
    if (formData.requirements.length < 5) {
      setFormData({
        ...formData,
        requirements: [...formData.requirements, ""],
      });
    }
  };

  const removeRequirement = (index: number) => {
    if (formData.requirements.length > 1) {
      const newRequirements = formData.requirements.filter(
        (_, i) => i !== index
      );
      setFormData({
        ...formData,
        requirements: newRequirements,
      });
    }
  };

  const updateRequirement = (index: number, value: string) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData({
      ...formData,
      requirements: newRequirements,
    });
  };

  const addExperience = () => {
    if (formData.experience.length < 2) {
      setFormData({
        ...formData,
        experience: [...formData.experience, ""],
      });
    }
  };

  const removeExperience = (index: number) => {
    if (formData.experience.length > 1) {
      const newExperience = formData.experience.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        experience: newExperience,
      });
    }
  };

  const updateExperience = (index: number, value: string) => {
    const newExperience = [...formData.experience];
    newExperience[index] = value;
    setFormData({
      ...formData,
      experience: newExperience,
    });
  };

  const renderRequirements = (requirements: string[], vacancyId: string) => {
    const isExpanded = expandedRequirements.has(vacancyId);

    if (requirements.length === 0) {
      return <span className="text-gray-400 text-sm">Нет требований</span>;
    }

    if (!isExpanded) {
      return (
        <div>
          <div className="text-xs text-gray-500">
            Элементов: {requirements.length}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs mt-1"
            onClick={() => toggleRequirements(vacancyId)}
          >
            <ChevronDown className="h-3 w-3 mr-1" />
            Показать
          </Button>
        </div>
      );
    }

    return (
      <div>
        <ul className="list-disc pl-4">
          {requirements.map((req, idx) => (
            <li key={idx} className="text-sm">
              {req}
            </li>
          ))}
        </ul>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-2 text-xs mt-1"
          onClick={() => toggleRequirements(vacancyId)}
        >
          <ChevronUp className="h-3 w-3 mr-1" />
          Скрыть
        </Button>
      </div>
    );
  };

  const renderExperience = (experience: string[], vacancyId: string) => {
    const isExpanded = expandedExperience.has(vacancyId);

    if (experience.length === 0) {
      return <span className="text-gray-400 text-sm">Нет опыта</span>;
    }

    if (!isExpanded) {
      return (
        <div>
          <div className="text-xs text-gray-500">
            Элементов: {experience.length}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs mt-1"
            onClick={() => toggleExperience(vacancyId)}
          >
            <ChevronDown className="h-3 w-3 mr-1" />
            Показать
          </Button>
        </div>
      );
    }

    return (
      <div>
        <ul className="list-disc pl-4">
          {experience.map((exp, idx) => (
            <li key={idx} className="text-sm">
              {exp}
            </li>
          ))}
        </ul>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-2 text-xs mt-1"
          onClick={() => toggleExperience(vacancyId)}
        >
          <ChevronUp className="h-3 w-3 mr-1" />
          Скрыть
        </Button>
      </div>
    );
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
                  requirements: [""],
                  experience: [""],
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
                  <label className="text-sm font-medium">Требования</label>
                  <div className="space-y-2">
                    {formData.requirements.map((requirement, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600 shrink-0">
                          {index + 1}
                        </div>
                        <Input
                          placeholder={`Требование ${index + 1}`}
                          value={requirement}
                          onChange={(e) =>
                            updateRequirement(index, e.target.value)
                          }
                          className="flex-1"
                        />
                        {formData.requirements.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeRequirement(index)}
                            className="shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addRequirement}
                      className="w-full"
                      disabled={formData.requirements.length >= 5}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {formData.requirements.length >= 5
                        ? "Достигнут лимит требований (максимум 5)"
                        : "Добавить требование"}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Опыт</label>
                  <div className="space-y-2">
                    {formData.experience.map((exp, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600 shrink-0">
                          {index + 1}
                        </div>
                        <Input
                          placeholder={`Опыт ${index + 1}`}
                          value={exp}
                          onChange={(e) =>
                            updateExperience(index, e.target.value)
                          }
                          className="flex-1"
                        />
                        {formData.experience.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeExperience(index)}
                            className="shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addExperience}
                      className="w-full"
                      disabled={formData.experience.length >= 2}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {formData.experience.length >= 2
                        ? "Достигнут лимит опыта (максимум 2)"
                        : "Добавить опыт"}
                    </Button>
                  </div>
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
        <div className="rounded-md border overflow-x-auto">
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
                      {renderRequirements(item.requirements, item.id)}
                    </TableCell>
                    <TableCell>
                      {renderExperience(item.experience, item.id)}
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
