import { useMemo, useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { PagesConfig } from "@/config/pages.config";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragEndEvent,
  DragOverlay,
} from "@dnd-kit/core";
import { Card, CardContent, CardTitle } from "@/components/ui/shadcn/card";
import { useToast } from "@/hooks/use-toast";
import { GripVertical } from "lucide-react";

const ALL_PAGES: { key: keyof typeof PagesConfig; label: string }[] = [
  { key: "about", label: "О компании" },
  { key: "catalog", label: "Каталог" },
  { key: "news", label: "Новости" },
  { key: "certificates", label: "Сертификаты" },
  { key: "vacancies", label: "Вакансии" },
  { key: "contacts", label: "Контакты" },
  { key: "production", label: "Производство" },
  { key: "questionnaire", label: "Опросные листы" },
];

function DraggablePage({
  page,
  isSelected,
  onClick,
  dragOverlay = false,
  className = "",
}: {
  page: { key: string; label: string };
  isSelected: boolean;
  onClick: () => void;
  dragOverlay?: boolean;
  className?: string;
}) {
  // dragOverlay: если true — не использовать dnd-kit хуки, просто отрисовать
  if (dragOverlay) {
    return (
      <li style={{ listStyle: "none" }}>
        <Card
          className={`border-primary bg-background dark:border-zinc-700 shadow-2xl scale-105 z-50 pointer-events-none select-none ${className}`}
          style={{ minWidth: 180, opacity: 0.95 }}
        >
          <CardContent className="py-3 px-4 flex items-center">
            <CardTitle className="text-base font-medium text-foreground flex items-center gap-2">
              <GripVertical className="w-4 h-4 text-muted-foreground" />
              {page.label}
            </CardTitle>
          </CardContent>
        </Card>
      </li>
    );
  }
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: page.key,
    data: { page },
  });
  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ listStyle: "none" }}
      onClick={onClick}
    >
      <Card
        className={`transition-all duration-150 cursor-pointer select-none border-2 px-0 py-0 bg-background dark:border-zinc-700 border-muted hover:shadow-lg ${className}`}
      >
        <CardContent className="py-3 px-4 flex items-center">
          <CardTitle className="text-base font-medium text-foreground flex items-center gap-2">
            <GripVertical className="w-4 h-4 text-muted-foreground" />
            {page.label}
          </CardTitle>
        </CardContent>
      </Card>
    </li>
  );
}

function DroppableZone({
  id,
  children,
  isOver,
}: {
  id: string;
  children: React.ReactNode;
  isOver: boolean;
}) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <ul
      ref={setNodeRef}
      className={`rounded-md min-h-[220px] bg-background dark:border-zinc-700 transition-colors ${
        isOver ? "ring-2 ring-primary" : ""
      }`}
    >
      {children}
    </ul>
  );
}

export function PagesMenuSelector({
  linksShown,
  linksHidden,
  onChange,
}: {
  linksShown: string[];
  linksHidden: string[];
  onChange: (shown: string[], hidden: string[]) => void;
}) {
  const { toast } = useToast();
  // Вычисляем доступные страницы (не в shown и не в hidden)
  const available = useMemo(
    () =>
      ALL_PAGES.filter(
        (p) => !linksShown.includes(p.key) && !linksHidden.includes(p.key)
      ),
    [linksShown, linksHidden]
  );

  // Локальные состояния для выделения
  const [selectedAvailable, setSelectedAvailable] = useState<string | null>(
    null
  );
  const [selectedShown, setSelectedShown] = useState<string | null>(null);
  const [selectedHidden, setSelectedHidden] = useState<string | null>(null);
  const [overZone, setOverZone] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const MAIN_MENU_LIMIT = 4;
  const isMainMenuFull = linksShown.length >= MAIN_MENU_LIMIT;

  // DnD обработка
  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event;
    setActiveId(null);
    if (!over) return;
    if (over.id === "shown" && available.find((p) => p.key === active.id)) {
      if (isMainMenuFull) {
        toast({
          title: "Лимит",
          description: `В главном меню не более ${MAIN_MENU_LIMIT} ссылок`,
          variant: "destructive",
        });
        setOverZone(null);
        return;
      }
      // Перетащили в главное меню
      onChange([...linksShown, active.id as string], linksHidden);
    } else if (
      over.id === "hidden" &&
      available.find((p) => p.key === active.id)
    ) {
      // Перетащили в выпадающее меню
      onChange(linksShown, [...linksHidden, active.id as string]);
    }
    setOverZone(null);
  }

  // DnD: отслеживать активный элемент
  function handleDragStart(event: any) {
    setActiveId(event.active.id as string);
  }

  // Перемещение между списками (кнопки)
  const moveToShown = () => {
    if (selectedAvailable) {
      if (isMainMenuFull) {
        toast({
          title: "Лимит",
          description: `В главном меню не более ${MAIN_MENU_LIMIT} ссылок`,
          variant: "destructive",
        });
        return;
      }
      onChange([...linksShown, selectedAvailable], linksHidden);
      setSelectedAvailable(null);
    }
  };
  const moveToHidden = () => {
    if (selectedAvailable) {
      onChange(linksShown, [...linksHidden, selectedAvailable]);
      setSelectedAvailable(null);
    }
  };
  // Удаление по конкретному ключу
  const removeFromShown = (key: string) => {
    onChange(
      linksShown.filter((k) => k !== key),
      linksHidden
    );
    setSelectedShown((prev) => (prev === key ? null : prev));
  };
  const removeFromHidden = (key: string) => {
    onChange(
      linksShown,
      linksHidden.filter((k) => k !== key)
    );
    setSelectedHidden((prev) => (prev === key ? null : prev));
  };
  // Сортировка
  const moveUp = (arr: string[], idx: number, cb: (a: string[]) => void) => {
    if (idx > 0) {
      const copy = [...arr];
      [copy[idx - 1], copy[idx]] = [copy[idx], copy[idx - 1]];
      cb(copy);
    }
  };
  const moveDown = (arr: string[], idx: number, cb: (a: string[]) => void) => {
    if (idx < arr.length - 1) {
      const copy = [...arr];
      [copy[idx + 1], copy[idx]] = [copy[idx], copy[idx + 1]];
      cb(copy);
    }
  };

  // Найти активную страницу для DragOverlay
  const activePage = activeId
    ? ALL_PAGES.find((p) => p.key === activeId)
    : null;

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragOver={({ over }) => setOverZone((over?.id as string) || null)}
      onDragCancel={() => setOverZone(null)}
      onDragStart={handleDragStart}
    >
      <div className="mb-4 px-4 py-2 rounded-md border border-yellow-300 bg-yellow-50 text-yellow-800 dark:border-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-200 text-sm">
        <div className="flex items-center gap-2">
          <GripVertical className="inline-block w-4 h-4 text-yellow-500 dark:text-yellow-300 mr-1" />
          Перетаскивайте карточки из левой колонки. Внутри группы меняйте
          порядок стрелочками. <br/>Счет идет слева направо: сверху — первая, внизу —
          последняя.
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 mt-8">
        {/* Доступные */}
        <div className="flex-1">
          <div className="font-semibold mb-2">Доступные страницы</div>
          <DroppableZone id="available" isOver={false}>
            {available.map((p, idx) => (
              <DraggablePage
                key={p.key}
                page={p}
                isSelected={selectedAvailable === p.key}
                onClick={() => setSelectedAvailable(p.key)}
                className={idx !== available.length - 1 ? "mb-2" : ""}
              />
            ))}
            {available.length === 0 && (
              <li>
                <div className="my-2 px-3 py-2 rounded-md border border-green-300 bg-green-50 text-green-800 dark:border-green-700 dark:bg-green-900/40 dark:text-green-200 text-sm text-center">
                  Все страницы распределены!
                </div>
              </li>
            )}
          </DroppableZone>
        </div>
        {/* Главное меню */}
        <div className="flex-1">
          <div className="font-semibold mb-2 flex items-center gap-2">
            <span>Главное меню</span>
            <span className="text-base font-bold text-foreground/80">
              ({linksShown.length}/{MAIN_MENU_LIMIT})
            </span>
          </div>
          <DroppableZone id="shown" isOver={overZone === "shown"}>
            <div>
              {linksShown.map((k, idx) => {
                const page = ALL_PAGES.find((p) => p.key === k);
                return (
                  <li
                    key={k}
                    className="flex items-center py-2 cursor-pointer select-none"
                  >
                    <span className="flex-1">
                      <Card
                        className={`transition-all duration-150 cursor-pointer select-none border-2 px-0 py-0 bg-background dark:border-zinc-700 border-muted hover:shadow-lg`}
                      >
                        <CardContent className="py-3 px-4 flex items-center justify-between">
                          <CardTitle className="text-base font-medium text-foreground flex items-center gap-2">
                            <span className="font-bold text-lg">
                              {idx + 1}.
                            </span>
                            {page?.label || k}
                          </CardTitle>
                          <div className="flex gap-1 items-center ml-2">
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              onClick={() =>
                                moveUp(linksShown, idx, (arr) =>
                                  onChange(arr, linksHidden)
                                )
                              }
                              disabled={idx === 0}
                              aria-label="Вверх"
                            >
                              ↑
                            </Button>
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              onClick={() =>
                                moveDown(linksShown, idx, (arr) =>
                                  onChange(arr, linksHidden)
                                )
                              }
                              disabled={idx === linksShown.length - 1}
                              aria-label="Вниз"
                            >
                              ↓
                            </Button>
                            <Button
                              type="button"
                              size="icon"
                              variant="destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFromShown(k);
                              }}
                              aria-label="Удалить"
                            >
                              ×
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </span>
                  </li>
                );
              })}
              {linksShown.length === 0 && (
                <li className="py-2 text-muted-foreground">Нет</li>
              )}
            </div>
          </DroppableZone>
        </div>
        {/* Выпадающее меню */}
        <div className="flex-1">
          <div className="font-semibold mb-2">Выпадающее меню</div>
          <DroppableZone id="hidden" isOver={overZone === "hidden"}>
            {linksHidden.map((k, idx) => {
              const page = ALL_PAGES.find((p) => p.key === k);
              return (
                <li
                  key={k}
                  className="flex items-center py-2 cursor-pointer select-none"
                >
                  <span className="flex-1">
                    <Card
                      className={`transition-all duration-150 cursor-pointer select-none border-2 px-0 py-0 bg-background dark:border-zinc-700 border-muted hover:shadow-lg`}
                    >
                      <CardContent className="py-3 px-4 flex items-center justify-between">
                        <CardTitle className="text-base font-medium text-foreground flex items-center gap-2">
                          <span className="font-bold text-lg">{idx + 1}.</span>
                          {page?.label || k}
                        </CardTitle>
                        <div className="flex gap-1 items-center ml-2">
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              moveUp(linksHidden, idx, (arr) =>
                                onChange(linksShown, arr)
                              )
                            }
                            disabled={idx === 0}
                            aria-label="Вверх"
                          >
                            ↑
                          </Button>
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              moveDown(linksHidden, idx, (arr) =>
                                onChange(linksShown, arr)
                              )
                            }
                            disabled={idx === linksHidden.length - 1}
                            aria-label="Вниз"
                          >
                            ↓
                          </Button>
                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFromHidden(k);
                            }}
                            aria-label="Удалить"
                          >
                            ×
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </span>
                </li>
              );
            })}
            {linksHidden.length === 0 && (
              <li className="py-2 text-muted-foreground">Нет</li>
            )}
          </DroppableZone>
        </div>
      </div>
      <DragOverlay dropAnimation={null}>
        {activePage ? (
          <DraggablePage
            page={activePage}
            isSelected={false}
            onClick={() => {}}
            dragOverlay
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
