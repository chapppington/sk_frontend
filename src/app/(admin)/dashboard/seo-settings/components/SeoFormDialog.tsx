import React from "react";
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
import InfoIcon from "@/components/ui/Dropdown/components/InfoIcon";
import { GoogleSnippet } from "./GoogleSnippet";
import { YandexSnippet } from "./YandexSnippet";
import {
  renderDescription,
  truncateWithEllipsis,
  getFormPreview,
} from "../utils";
import {
  type SeoSettings,
  type CreateSeoSettingsDto,
} from "@/services/seo-settings.service";

interface SeoFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingSeo: SeoSettings | null;
  formData: CreateSeoSettingsDto;
  setFormData: (data: CreateSeoSettingsDto) => void;
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
  onReset: () => void;
}

export function SeoFormDialog({
  isOpen,
  onOpenChange,
  editingSeo,
  formData,
  setFormData,
  onSubmit,
  isPending,
  onReset,
}: SeoFormDialogProps) {
  const formPreview = getFormPreview(formData);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={onReset}>Добавить набор мета тегов</Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>
            {editingSeo
              ? "Редактировать настройки мета тегов"
              : "Новые настройки мета тегов"}
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
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-1">Путь страницы</Label>
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
                  <InfoIcon popoverContent="Title — основной SEO-заголовок страницы. Отображается в результатах поиска и во вкладке браузера. Рекомендуется до 60 символов." />
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
                  {formData.title.length}/60 символов
                  {formData.title.length > 60 && (
                    <span className="text-red-500 ml-2">Превышен лимит!</span>
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
                    <span className="text-red-500 ml-2">Превышен лимит!</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  Keywords
                  <InfoIcon popoverContent="Ключевые слова через запятую." />
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
                  onClick={() => onOpenChange(false)}
                >
                  Отмена
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending
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
  );
}
