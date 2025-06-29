import React from "react";
import { Button } from "@/components/ui/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shadcn/dialog";
import { HelpCircle } from "lucide-react";

interface HelpDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HelpDialog({ isOpen, onOpenChange }: HelpDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4" />
          Как этим пользоваться?
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Руководство по настройке SEO-мета тегов</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2">
          <div
            className="space-y-6 text-sm"
            onWheel={(e) => {
              e.stopPropagation();
              const container = e.currentTarget;
              const delta = e.deltaY;
              container.scrollTop += delta;
            }}
          >
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Что такое наборы мета тегов
              </h3>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-blue-700 dark:text-blue-300">
                  Наборы мета тегов — это настройки для каждой страницы сайта,
                  которые определяют, как она будет отображаться в поисковых
                  системах и социальных сетях. Они включают заголовки, описания,
                  ключевые слова и изображения для предпросмотра.
                </p>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <p className="text-amber-700 dark:text-amber-300 text-sm">
                  <strong>Важно:</strong> Эти настройки предназначены только для{" "}
                  <strong>статичных страниц</strong> (например: /about,
                  /contacts, /catalog). Для страниц товаров
                  (/products/[product-name]), новостей (/news/[news-name]),
                  проектов портфолио (/portfolio/[project-name]) SEO
                  настраивается в карточке самой сущности.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Как создать набор мета тегов
              </h3>

              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-foreground">
                    1. Укажите путь страницы
                  </h4>
                  <p className="text-muted-foreground mt-1">
                    Введите точный путь страницы:{" "}
                    <code className="bg-muted px-1 rounded">/about</code>,{" "}
                    <code className="bg-muted px-1 rounded">/catalog</code>
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-foreground">
                    2. Заполните основные поля
                  </h4>
                  <div className="space-y-2 mt-2">
                    <div>
                      <strong className="text-foreground">Title:</strong>
                      <p className="text-muted-foreground text-sm mt-1">
                        Заголовок страницы (до 60 символов). Отображается в
                        поиске и вкладке браузера.
                      </p>
                    </div>

                    <div>
                      <strong className="text-foreground">Description:</strong>
                      <p className="text-muted-foreground text-sm mt-1">
                        Описание страницы (до 160 символов). Показывается в
                        результатах поиска.
                      </p>
                    </div>

                    <div>
                      <strong className="text-foreground">Keywords:</strong>
                      <p className="text-muted-foreground text-sm mt-1">
                        Ключевые слова через запятую.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-foreground">
                    3. Настройте для соцсетей (необязательно)
                  </h4>
                  <p className="text-muted-foreground mt-1">
                    OG Title, Description и Image URL — для красивого
                    отображения при публикации в ВКонтакте, Facebook и других
                    соцсетях.
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-foreground">
                    4. Активируйте настройки ⚠️ ВАЖНО
                  </h4>
                  <p className="text-muted-foreground mt-1">
                    <strong className="text-red-600 dark:text-red-400">
                      Обязательно включите
                    </strong>{" "}
                    переключатель "Активно" — только активные настройки
                    применяются на сайте. Без активации настройки не работают!
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Проверка результата
              </h3>

              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-foreground">
                    Предпросмотр
                  </h4>
                  <p className="text-muted-foreground mt-1">
                    Нажмите кнопку "Глаз" в таблице, чтобы увидеть, как страница
                    будет выглядеть в Google и Яндексе.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-foreground">
                    Счетчики символов
                  </h4>
                  <p className="text-muted-foreground mt-1">
                    Следите за счетчиками под полями Title и Description.
                    Красное предупреждение — превышен лимит.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
