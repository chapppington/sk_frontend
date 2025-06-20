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
import InfoIcon from "@/components/ui/Dropdown/components/InfoIcon";

// Вынести универсальный сниппет в отдельный компонент
function GoogleSnippet({
  title,
  description,
  url,
  renderDescription,
  truncateWithEllipsis,
}: {
  title: string;
  description: string;
  url: string;
  renderDescription: (desc: string) => React.ReactNode;
  truncateWithEllipsis: (text: string, max: number) => string;
}) {
  return (
    <div className="flex flex-col gap-0 rounded-xl p-4 max-w-[600px] mx-auto min-h-[90px] border border-[#e3e3e3] shadow-sm bg-background dark:bg-[#202124] dark:border-[#333]">
      <div className="flex items-center gap-2 mb-1">
        {/* Favicon */}
        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center border border-[#e3e3e3] dark:border-[#333]">
          <img
            src="/favicon.ico"
            alt="favicon"
            className="w-8 h-8 object-contain rounded-full"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>
        <div className="flex flex-col">
          {/* Название сайта */}
          <span className="text-[13px] font-normal text-[#202124] dark:text-[#fff] leading-tight">
            Сибкомплект
          </span>
          {/* URL */}
          <span className="text-[12px] font-medium text-[#5f6368] dark:text-[#bdc1c6] leading-tight">
            {url}
          </span>
        </div>
      </div>
      {/* Заголовок */}
      <div
        className="text-[16px] font-bold leading-tight mt-1 mb-0.5 break-words text-[#1a0dab] dark:text-[#8ab4f8]"
        style={{ wordBreak: "break-word" }}
      >
        {truncateWithEllipsis(title || "Заголовок страницы", 70)}
      </div>
      {/* Описание */}
      <div className="text-[13px] leading-snug break-words text-foreground dark:text-[#bdc1c6] mt-1">
        {renderDescription(
          truncateWithEllipsis(description || "Описание страницы", 160)
        )}
      </div>
    </div>
  );
}

// Компонент сниппета Яндекса
function YandexSnippet({
  title,
  url,
  description,
  renderDescription,
  truncateWithEllipsis,
}: {
  title: string;
  url: string;
  description: string;
  renderDescription: (desc: string) => React.ReactNode;
  truncateWithEllipsis: (text: string, max: number) => string;
}) {
  return (
    <div className="flex flex-row gap-3 rounded-xl p-4 max-w-[600px] mx-auto min-h-[90px] border border-[#e3e3e3] shadow-sm bg-background dark:bg-[#202124] dark:border-[#333]">
      {/* Фавикон слева */}
      <div className="flex flex-col items-center min-w-[40px]">
        <div className="w-7 h-7 rounded bg-white flex items-center justify-center">
          <img
            src="/favicon.ico"
            alt="favicon"
            className="w-6 h-6 object-contain rounded"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>
      </div>
      {/* Контент справа */}
      <div className="flex-1 flex flex-col gap-0">
        {/* Заголовок */}
        <div
          className="text-[16px] font-bold leading-tight mb-1 break-words text-[#1a0dab] dark:text-[#8ab4f8]"
          style={{ wordBreak: "break-word" }}
        >
          {truncateWithEllipsis(title || "Заголовок страницы", 70)}
        </div>
        {/* URL */}
        <div className="text-[13px] font-medium mb-1 text-[#4caf50] dark:text-[#bdc1c6]">
          {url}
        </div>
        {/* Описание */}
        <div className="text-[13px] leading-snug break-words text-foreground dark:text-[#bdc1c6]">
          {renderDescription(
            truncateWithEllipsis(description || "Описание страницы", 160)
          )}
        </div>
      </div>
    </div>
  );
}

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
          formData.description.length <= 160 ? "good" : "warning",
      },
      yandex: {
        title: formData.title,
        description: formData.description,
        url: `${baseUrl}${formData.pagePath}`,
        titleLength: formData.title.length,
        descriptionLength: formData.description.length,
        titleStatus: formData.title.length <= 70 ? "good" : "warning",
        descriptionStatus:
          formData.description.length <= 160 ? "good" : "warning",
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
                    <Label className="flex items-center gap-1">
                      Путь страницы
                    </Label>
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
                    <Label className="flex items-center gap-1">
                      Название страницы
                      <InfoIcon popoverContent="Человекочитаемое название страницы для удобства в админке. Не отображается на сайте и не влияет на SEO." />
                    </Label>
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
                    <Label className="flex items-center gap-1">
                      Title
                      <InfoIcon popoverContent="Title — основной SEO-заголовок страницы. Отображается в результатах поиска и во вкладке браузера. Рекомендуется до 70 символов." />
                    </Label>
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
                    <Label className="flex items-center gap-1">
                      Description
                      <InfoIcon popoverContent="Description — краткое описание страницы для поисковых систем. Показывается в сниппете поисковой выдачи. Рекомендуется до 160 символов." />
                    </Label>
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
                      {formData.description.length}/160 символов
                      {formData.description.length > 160 && (
                        <span className="text-red-500 ml-2">
                          Превышен лимит!
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      Keywords
                      <InfoIcon popoverContent="Ключевые слова через запятую. Сейчас почти не используются поисковиками, но могут быть полезны для внутреннего поиска или аналитики." />
                    </Label>
                    <Input
                      value={formData.keywords}
                      onChange={(e) =>
                        setFormData({ ...formData, keywords: e.target.value })
                      }
                      placeholder="ключевые, слова, через, запятую"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      OG Title
                      <InfoIcon popoverContent="Open Graph Title — заголовок для социальных сетей (Facebook, ВКонтакте и др.). Если не заполнено, используется обычный Title." />
                    </Label>
                    <Input
                      value={formData.ogTitle}
                      onChange={(e) =>
                        setFormData({ ...formData, ogTitle: e.target.value })
                      }
                      placeholder="OG заголовок (необязательно)"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      OG Description
                      <InfoIcon popoverContent="Open Graph Description — описание для социальных сетей. Если не заполнено, используется обычный Description." />
                    </Label>
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
                    <Label className="flex items-center gap-1">
                      OG Image URL
                      <InfoIcon popoverContent="Ссылка на изображение для предпросмотра в социальных сетях (Open Graph). Рекомендуется использовать изображение размером не менее 1200x630px." />
                    </Label>
                    <Input
                      value={formData.ogImage}
                      onChange={(e) =>
                        setFormData({ ...formData, ogImage: e.target.value })
                      }
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      Canonical URL
                      <InfoIcon popoverContent="Канонический URL — основной адрес страницы для поисковых систем. Помогает избежать дублей контента. Обычно совпадает с основным URL страницы." />
                    </Label>
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
                    <Label className="flex items-center gap-1">
                      Активно
                      <InfoIcon popoverContent="Если выключено — SEO-настройки для этой страницы не применяются на сайте." />
                    </Label>
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
                <div className="sticky top-0 bg-background pb-4">
                  <h3 className="text-lg font-semibold mb-4">
                    Предпросмотр карточки поиска
                  </h3>
                </div>

                <div className="space-y-6">
                  {/* Универсальный сниппет */}
                  <div className="space-y-4">
                    <p>Google</p>
                    <GoogleSnippet
                      title={formPreview.google.title}
                      description={formPreview.google.description}
                      url={formPreview.google.url}
                      renderDescription={renderDescription}
                      truncateWithEllipsis={truncateWithEllipsis}
                    />
                    <p>Яндекс</p>
                    <YandexSnippet
                      title={formPreview.yandex.title}
                      url={formPreview.yandex.url}
                      description={formPreview.yandex.description}
                      renderDescription={renderDescription}
                      truncateWithEllipsis={truncateWithEllipsis}
                    />
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
                            item.description.length <= 160
                              ? "default"
                              : "destructive"
                          }
                          className="text-xs"
                        >
                          {item.description.length}/160
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
                <GoogleSnippet
                  title={preview.google.title}
                  description={preview.google.description}
                  url={preview.google.url}
                  renderDescription={renderDescription}
                  truncateWithEllipsis={truncateWithEllipsis}
                />
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
                    Desc: {preview.google.descriptionLength}/160
                  </Badge>
                </div>
              </TabsContent>

              <TabsContent value="yandex" className="space-y-4">
                <YandexSnippet
                  title={preview.yandex.title}
                  url={preview.yandex.url}
                  description={preview.yandex.description}
                  renderDescription={renderDescription}
                  truncateWithEllipsis={truncateWithEllipsis}
                />
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
                    Desc: {preview.yandex.descriptionLength}/160
                  </Badge>
                </div>
              </TabsContent>

              <TabsContent value="og" className="space-y-4">
                <div className="border rounded-lg p-4 bg-background dark:bg-[#202124] border-[#e3e3e3] dark:border-[#333]">
                  {preview.og.image && (
                    <img
                      src={preview.og.image}
                      alt="OG Image"
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                  )}
                  <div className="text-sm mb-2 text-[#202124] dark:text-[#8ab4a5]">
                    {preview.og.url}
                  </div>
                  <div className="text-lg font-medium mb-1 text-[#1a0dab] dark:text-[#8ab4f8]">
                    {preview.og.title || "Заголовок страницы"}
                  </div>
                  <div className="text-sm text-gray-700 dark:text-[#bdc1c6]">
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
