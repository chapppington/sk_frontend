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
import { Pencil, Trash2, Eye } from "lucide-react";
import {
  seoSettingsService,
  type SeoSettings,
  type CreateSeoSettingsDto,
  type UpdateSeoSettingsDto,
  type SeoPreview,
} from "@/services/seo-settings.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Switch } from "@/components/ui/shadcn/switch";
import { Label } from "@/components/ui/shadcn/label";
import { Badge } from "@/components/ui/shadcn/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn/tabs";

export default function SeoSettingsManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [editingSeo, setEditingSeo] = useState<SeoSettings | null>(null);
  const [deletePopoverOpen, setDeletePopoverOpen] = useState<string | null>(
    null
  );
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<CreateSeoSettingsDto>({
    pagePath: "",
    pageName: "",
    title: "",
    description: "",
    keywords: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    canonicalUrl: "",
    isActive: true,
  });

  const { data: seoSettings = [], isLoading: isLoadingSeo } = useQuery({
    queryKey: ["seo-settings"],
    queryFn: async () => {
      return await seoSettingsService.getAll();
    },
  });

  const { data: preview, refetch: refetchPreview } = useQuery<SeoPreview>({
    queryKey: ["seo-preview", editingSeo?.id],
    queryFn: async () => {
      if (!editingSeo) throw new Error("No SEO setting selected");
      return await seoSettingsService.getPreview(editingSeo.id);
    },
    enabled: !!editingSeo && isPreviewOpen,
  });

  const createMutation = useMutation({
    mutationFn: async (data: CreateSeoSettingsDto) => {
      return seoSettingsService.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seo-settings"] });
      toast({
        title: "Успех",
        description: "SEO настройки успешно созданы",
      });
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось создать SEO настройки",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateSeoSettingsDto;
    }) => seoSettingsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seo-settings"] });
      toast({
        title: "Успех",
        description: "SEO настройки успешно обновлены",
      });
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить SEO настройки",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => seoSettingsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seo-settings"] });
      toast({
        title: "Успех",
        description: "SEO настройки успешно удалены",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить SEO настройки",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingSeo) {
      updateMutation.mutate({ id: editingSeo.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = async (id: string) => {
    deleteMutation.mutate(id);
    setDeletePopoverOpen(null);
  };

  const handleEdit = (seo: SeoSettings) => {
    setEditingSeo(seo);
    setFormData({
      pagePath: seo.pagePath,
      pageName: seo.pageName,
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords || "",
      ogTitle: seo.ogTitle || "",
      ogDescription: seo.ogDescription || "",
      ogImage: seo.ogImage || "",
      canonicalUrl: seo.canonicalUrl || "",
      isActive: seo.isActive,
    });
    setIsDialogOpen(true);
  };

  const handlePreview = (seo: SeoSettings) => {
    setEditingSeo(seo);
    setIsPreviewOpen(true);
    refetchPreview();
  };

  const resetForm = () => {
    setEditingSeo(null);
    setFormData({
      pagePath: "",
      pageName: "",
      title: "",
      description: "",
      keywords: "",
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
      canonicalUrl: "",
      isActive: true,
    });
  };

  // Функция для создания предпросмотра на основе текущих данных формы
  const getFormPreview = () => {
    const baseUrl =
      process.env.NEXT_PUBLIC_FRONTEND_URL || "https://sibkomplekt.ru";

    return {
      google: {
        title: formData.title,
        description: formData.description,
        url: `${baseUrl}${formData.pagePath}`,
        titleLength: formData.title.length,
        descriptionLength: formData.description.length,
        titleStatus: formData.title.length <= 70 ? "good" : "warning",
        descriptionStatus:
          formData.description.length <= 180 ? "good" : "warning",
      },
      yandex: {
        title: formData.title,
        description: formData.description,
        url: `${baseUrl}${formData.pagePath}`,
        titleLength: formData.title.length,
        descriptionLength: formData.description.length,
        titleStatus: formData.title.length <= 70 ? "good" : "warning",
        descriptionStatus:
          formData.description.length <= 200 ? "good" : "warning",
      },
      og: {
        title: formData.ogTitle || formData.title,
        description: formData.ogDescription || formData.description,
        image: formData.ogImage,
        url: `${baseUrl}${formData.pagePath}`,
      },
    };
  };

  const formPreview = getFormPreview();

  // Добавить функцию для рендера жирного текста в description
  function renderDescription(desc: string) {
    // Примитивно: **жирный** или <b>жирный</b> или <strong>жирный</strong>
    // Можно доработать под markdown, если нужно
    const parts = desc.split(
      /(\*\*[^*]+\*\*|<b>[^<]+<\/b>|<strong>[^<]+<\/strong>)/g
    );
    return parts.map((part, i) => {
      if (/^\*\*[^*]+\*\*$/.test(part)) {
        return (
          <b key={i} className="font-bold text-[#fff]">
            {part.replace(/\*\*/g, "")}
          </b>
        );
      }
      if (/^<b>[^<]+<\/b>$/.test(part)) {
        return (
          <b key={i} className="font-bold text-[#fff]">
            {part.replace(/<\/?b>/g, "")}
          </b>
        );
      }
      if (/^<strong>[^<]+<\/strong>$/.test(part)) {
        return (
          <b key={i} className="font-bold text-[#fff]">
            {part.replace(/<\/?strong>/g, "")}
          </b>
        );
      }
      return <span key={i}>{part}</span>;
    });
  }

  function truncateWithEllipsis(text: string, max: number) {
    return text.length > max ? text.slice(0, max - 1) + "…" : text;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Управление SEO настройками</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>Добавить SEO настройки</Button>
          </DialogTrigger>
          <DialogContent className="max-w-6xl h-[90vh] p-0">
            <DialogHeader className="px-6 pt-6">
              <DialogTitle>
                {editingSeo
                  ? "Редактировать SEO настройки"
                  : "Новые SEO настройки"}
              </DialogTitle>
            </DialogHeader>
            <div className="flex h-[calc(90vh-80px)]">
              {/* Левая часть - форма */}
              <div
                className="w-1/2 border-r overflow-y-auto px-6 pb-6"
                onWheel={(e) => {
                  e.stopPropagation();
                  const container = e.currentTarget;
                  const delta = e.deltaY;
                  container.scrollTop += delta;
                }}
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Путь страницы</Label>
                    <Input
                      value={formData.pagePath}
                      onChange={(e) =>
                        setFormData({ ...formData, pagePath: e.target.value })
                      }
                      placeholder="/about"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Название страницы</Label>
                    <Input
                      value={formData.pageName}
                      onChange={(e) =>
                        setFormData({ ...formData, pageName: e.target.value })
                      }
                      placeholder="О компании"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Заголовок страницы"
                      required
                    />
                    <div className="text-sm text-gray-500">
                      {formData.title.length}/70 символов
                      {formData.title.length > 70 && (
                        <span className="text-red-500 ml-2">
                          Превышен лимит!
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Описание страницы"
                      rows={3}
                      required
                    />
                    <div className="text-sm text-gray-500">
                      {formData.description.length}/180 символов
                      {formData.description.length > 180 && (
                        <span className="text-red-500 ml-2">
                          Превышен лимит!
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Keywords</Label>
                    <Input
                      value={formData.keywords}
                      onChange={(e) =>
                        setFormData({ ...formData, keywords: e.target.value })
                      }
                      placeholder="ключевые, слова, через, запятую"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>OG Title</Label>
                    <Input
                      value={formData.ogTitle}
                      onChange={(e) =>
                        setFormData({ ...formData, ogTitle: e.target.value })
                      }
                      placeholder="OG заголовок (необязательно)"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>OG Description</Label>
                    <Textarea
                      value={formData.ogDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          ogDescription: e.target.value,
                        })
                      }
                      placeholder="OG описание (необязательно)"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>OG Image URL</Label>
                    <Input
                      value={formData.ogImage}
                      onChange={(e) =>
                        setFormData({ ...formData, ogImage: e.target.value })
                      }
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Canonical URL</Label>
                    <Input
                      value={formData.canonicalUrl}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          canonicalUrl: e.target.value,
                        })
                      }
                      placeholder="https://example.com/page"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formData.isActive}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, isActive: checked })
                      }
                    />
                    <Label>Активно</Label>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Отмена
                    </Button>
                    <Button
                      type="submit"
                      disabled={
                        createMutation.isPending || updateMutation.isPending
                      }
                    >
                      {createMutation.isPending || updateMutation.isPending
                        ? "Сохранение..."
                        : editingSeo
                        ? "Сохранить"
                        : "Создать"}
                    </Button>
                  </div>
                </form>
              </div>

              {/* Правая часть - предпросмотр (sticky) */}
              <div className="w-1/2 px-6 pb-6">
                <div className="sticky top-0 bg-white pb-4">
                  <h3 className="text-lg font-semibold mb-4">
                    Предпросмотр сниппетов
                  </h3>
                </div>

                <div className="space-y-6">
                  {/* Универсальный сниппет */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 bg-white rounded p-3 max-w-[600px] mx-auto min-h-[60px] border border-[#e3e3e3] shadow-sm">
                      {/* Фавикон */}
                      <img
                        src="/favicon.ico"
                        alt="favicon"
                        className="w-6 h-6 rounded bg-white object-contain mt-1 border border-[#e3e3e3]"
                        style={{ background: "#fff" }}
                        onError={(e) =>
                          (e.currentTarget.style.display = "none")
                        }
                      />
                      {/* Контент */}
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-[18px] font-bold text-[#1967d2] leading-tight mb-1 break-words"
                          style={{ wordBreak: "break-word" }}
                        >
                          {truncateWithEllipsis(
                            formPreview.google.title || "Заголовок страницы",
                            70
                          )}
                        </div>
                        <div className="text-[15px] font-bold text-[#5f6368] mb-1 truncate">
                          {formPreview.google.url
                            .replace(/^https?:\/\//, "")
                            .replace(/\/$/, "")}
                        </div>
                        <div className="text-[#222] text-[15px] leading-snug break-words">
                          {renderDescription(
                            truncateWithEllipsis(
                              formPreview.google.description ||
                                "Описание страницы",
                              180
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoadingSeo ? (
        <div>Загрузка...</div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Страница</TableHead>
                <TableHead>Путь</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {seoSettings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Нет SEO настроек
                  </TableCell>
                </TableRow>
              ) : (
                seoSettings.map((item: SeoSettings) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item.pageName}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {item.pagePath}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate" title={item.title}>
                        {item.title}
                      </div>
                      <div className="flex gap-1 mt-1">
                        <Badge
                          variant={
                            item.title.length <= 70 ? "default" : "destructive"
                          }
                          className="text-xs"
                        >
                          {item.title.length}/70
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className="max-w-xs truncate"
                        title={item.description}
                      >
                        {item.description}
                      </div>
                      <div className="flex gap-1 mt-1">
                        <Badge
                          variant={
                            item.description.length <= 180
                              ? "default"
                              : "destructive"
                          }
                          className="text-xs"
                        >
                          {item.description.length}/180
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={item.isActive ? "success" : "destructive"}
                      >
                        {item.isActive ? "Активно" : "Неактивно"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handlePreview(item)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
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
                                Вы уверены, что хотите удалить эти SEO
                                настройки?
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

      {/* Модальное окно предпросмотра */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Предпросмотр SEO</DialogTitle>
          </DialogHeader>
          {preview && (
            <Tabs defaultValue="google" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="google">Google</TabsTrigger>
                <TabsTrigger value="yandex">Яндекс</TabsTrigger>
                <TabsTrigger value="og">Open Graph</TabsTrigger>
              </TabsList>

              <TabsContent value="google" className="space-y-4">
                <div className="border rounded-lg p-4 bg-white">
                  <div className="text-sm text-gray-500 mb-2">
                    {preview.google.url}
                  </div>
                  <div className="text-blue-600 text-lg font-medium mb-1">
                    {preview.google.title}
                  </div>
                  <div className="text-sm text-gray-700">
                    {preview.google.description}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Badge
                      variant={
                        preview.google.titleStatus === "good"
                          ? "default"
                          : "destructive"
                      }
                    >
                      Title: {preview.google.titleLength}/70
                    </Badge>
                    <Badge
                      variant={
                        preview.google.descriptionStatus === "good"
                          ? "default"
                          : "destructive"
                      }
                    >
                      Desc: {preview.google.descriptionLength}/180
                    </Badge>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="yandex" className="space-y-4">
                <div className="border rounded-lg p-4 bg-white">
                  <div className="text-sm text-gray-500 mb-2">
                    {preview.yandex.url}
                  </div>
                  <div className="text-blue-600 text-lg font-medium mb-1">
                    {preview.yandex.title}
                  </div>
                  <div className="text-sm text-gray-700">
                    {preview.yandex.description}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Badge
                      variant={
                        preview.yandex.titleStatus === "good"
                          ? "default"
                          : "destructive"
                      }
                    >
                      Title: {preview.yandex.titleLength}/70
                    </Badge>
                    <Badge
                      variant={
                        preview.yandex.descriptionStatus === "good"
                          ? "default"
                          : "destructive"
                      }
                    >
                      Desc: {preview.yandex.descriptionLength}/200
                    </Badge>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="og" className="space-y-4">
                <div className="border rounded-lg p-4 bg-white">
                  {preview.og.image && (
                    <img
                      src={preview.og.image}
                      alt="OG Image"
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                  )}
                  <div className="text-sm text-gray-500 mb-2">
                    {preview.og.url}
                  </div>
                  <div className="text-blue-600 text-lg font-medium mb-1">
                    {preview.og.title || "Заголовок страницы"}
                  </div>
                  <div className="text-sm text-gray-700">
                    {preview.og.description || "Описание страницы"}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
