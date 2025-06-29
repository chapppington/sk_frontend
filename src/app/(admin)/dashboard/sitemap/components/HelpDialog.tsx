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
          <DialogTitle>Руководство по управлению Sitemap</DialogTitle>
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
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <p className="text-amber-700 dark:text-amber-300 text-sm">
                <strong>Важно:</strong> Sitemap автоматически обновляется при
                изменении статических или динамических путей.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Управление статичными путями
              </h3>

              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-foreground">
                    1. Добавление нового пути
                  </h4>
                  <p className="text-muted-foreground mt-1">
                    Введите путь страницы:{" "}
                    <code className="bg-muted px-1 rounded">/about</code>,{" "}
                    <code className="bg-muted px-1 rounded">/contacts</code>
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-foreground">
                    2. Настройка приоритета
                  </h4>
                  <div className="space-y-2 mt-2">
                    <div>
                      <strong className="text-foreground">Приоритет:</strong>
                      <p className="text-muted-foreground text-sm mt-1">
                        Определяет важность страницы для поисковых систем (от
                        0.1 до 1.0). Главная страница обычно имеет приоритет
                        1.0, остальные страницы — 0.5-0.8.
                      </p>
                    </div>

                    <div>
                      <strong className="text-foreground">
                        Частота обновления:
                      </strong>
                      <p className="text-muted-foreground text-sm mt-1">
                        Указывает, как часто обновляется контент страницы.
                        Влияет на частоту посещения страницы поисковыми
                        роботами.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-foreground">
                    3. Редактирование и удаление
                  </h4>
                  <p className="text-muted-foreground mt-1">
                    Используйте кнопки "Изменить" и "Удалить" для управления
                    существующими путями. Изменения применяются автоматически.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Управление динамическими путями
              </h3>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-foreground">
                    1. Включение/отключение типов контента
                  </h4>
                  <p className="text-muted-foreground mt-1">
                    Отметьте галочками типы контента, которые должны включаться
                    в sitemap: новости, товары, проекты портфолио, вакансии.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-foreground">
                    2. Настройка параметров
                  </h4>
                  <div className="space-y-2 mt-2">
                    <div>
                      <strong className="text-foreground">Приоритет:</strong>
                      <p className="text-muted-foreground text-sm mt-1">
                        Приоритет для всех страниц данного типа контента. Товары
                        обычно имеют высокий приоритет (0.8-0.9).
                      </p>
                    </div>

                    <div>
                      <strong className="text-foreground">
                        Частота обновления:
                      </strong>
                      <p className="text-muted-foreground text-sm mt-1">
                        Как часто обновляется контент данного типа. Новости —
                        "daily", товары — "weekly", проекты — "monthly".
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Просмотр Sitemap
              </h3>

              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-foreground">
                  Просмотр Sitemap
                </h4>
                <p className="text-muted-foreground mt-1">
                  Кнопка "Просмотреть Sitemap" открывает текущий XML-файл в
                  новой вкладке. Полезно для проверки содержимого и структуры.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
