import { useMemo, useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
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

const ALL_FOOTER_LINKS: { key: string; label: string }[] = [
  { key: "about", label: "О компании" },
  { key: "catalog", label: "Каталог" },
  { key: "news", label: "Новости" },
  { key: "certificates", label: "Сертификаты" },
  { key: "vacancies", label: "Вакансии" },
  { key: "contacts", label: "Контакты" },
  { key: "production", label: "Производство" },
];

function DraggableLink({
  link,
  isSelected,
  onClick,
  dragOverlay = false,
  className = "",
}: {
  link: { key: string; label: string };
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
              {link.label}
            </CardTitle>
          </CardContent>
        </Card>
      </li>
    );
  }
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: link.key,
    data: { link },
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
            {link.label}
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

export function FooterLinksSelector({
  linksInTabletMenu,
  allLinks,
  onChange,
}: {
  linksInTabletMenu: string[];
  allLinks: string[];
  onChange: (tabletMenu: string[], allLinks: string[]) => void;
}) {
  const { toast } = useToast();

  const TABLET_MENU_LIMIT = 4;
  const isTabletMenuFull = linksInTabletMenu.length >= TABLET_MENU_LIMIT;

  // Вычисляем доступные ссылки (не в tablet menu и не в all links)
  const available = useMemo(
    () =>
      ALL_FOOTER_LINKS.filter(
        (l) => !linksInTabletMenu.includes(l.key) && !allLinks.includes(l.key)
      ),
    [linksInTabletMenu, allLinks]
  );

  // Локальные состояния для выделения
  const [selectedAvailable, setSelectedAvailable] = useState<string | null>(
    null
  );
  const [selectedTablet, setSelectedTablet] = useState<string | null>(null);
  const [selectedAll, setSelectedAll] = useState<string | null>(null);
  const [overZone, setOverZone] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  // DnD обработка
  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event;
    setActiveId(null);
    if (!over) return;

    if (
      over.id === "tablet-menu" &&
      available.find((l) => l.key === active.id)
    ) {
      if (isTabletMenuFull) {
        toast({
          title: "Лимит",
          description: `В планшетном меню не более ${TABLET_MENU_LIMIT} ссылок`,
          variant: "destructive",
        });
        setOverZone(null);
        return;
      }
      // Перетащили в планшетное меню
      onChange([...linksInTabletMenu, active.id as string], allLinks);
    } else if (
      over.id === "all-links" &&
      available.find((l) => l.key === active.id)
    ) {
      // Перетащили во все ссылки
      onChange(linksInTabletMenu, [...allLinks, active.id as string]);
    }
    setOverZone(null);
  }

  // DnD: отслеживать активный элемент
  function handleDragStart(event: any) {
    setActiveId(event.active.id as string);
  }

  // Перемещение между списками (кнопки)
  const moveToTabletMenu = () => {
    if (selectedAvailable) {
      if (isTabletMenuFull) {
        toast({
          title: "Лимит",
          description: `В планшетном меню не более ${TABLET_MENU_LIMIT} ссылок`,
          variant: "destructive",
        });
        return;
      }
      onChange([...linksInTabletMenu, selectedAvailable], allLinks);
      setSelectedAvailable(null);
    }
  };

  const moveToAllLinks = () => {
    if (selectedAvailable) {
      onChange(linksInTabletMenu, [...allLinks, selectedAvailable]);
      setSelectedAvailable(null);
    }
  };

  // Удаление по конкретному ключу
  const removeFromTabletMenu = (key: string) => {
    onChange(
      linksInTabletMenu.filter((k) => k !== key),
      allLinks
    );
    setSelectedTablet((prev) => (prev === key ? null : prev));
  };

  const removeFromAllLinks = (key: string) => {
    onChange(
      linksInTabletMenu,
      allLinks.filter((k) => k !== key)
    );
    setSelectedAll((prev) => (prev === key ? null : prev));
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

  // Найти активную ссылку для DragOverlay
  const activeLink = activeId
    ? ALL_FOOTER_LINKS.find((l) => l.key === activeId)
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
          порядок стрелочками. <br />
          Счет идет слева направо: сверху — первая, внизу — последняя.
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 mt-8">
        {/* Доступные */}
        <div className="flex-1">
          <div className="font-semibold mb-2">Доступные ссылки</div>
          <DroppableZone id="available" isOver={false}>
            {available.map((l, idx) => (
              <DraggableLink
                key={l.key}
                link={l}
                isSelected={selectedAvailable === l.key}
                onClick={() => setSelectedAvailable(l.key)}
                className={idx !== available.length - 1 ? "mb-2" : ""}
              />
            ))}
            {available.length === 0 && (
              <li>
                <div className="my-2 px-3 py-2 rounded-md border border-green-300 bg-green-50 text-green-800 dark:border-green-700 dark:bg-green-900/40 dark:text-green-200 text-sm text-center">
                  Все ссылки распределены!
                </div>
              </li>
            )}
          </DroppableZone>
        </div>

        {/* Планшетное меню */}
        <div className="flex-1">
          <div className="font-semibold mb-2 flex items-center gap-2">
            <span>Планшетное меню</span>
            <span className="text-base font-bold text-foreground/80">
              ({linksInTabletMenu.length}/{TABLET_MENU_LIMIT})
            </span>
          </div>
          <DroppableZone id="tablet-menu" isOver={overZone === "tablet-menu"}>
            <div>
              {linksInTabletMenu.map((k, idx) => {
                const link = ALL_FOOTER_LINKS.find((l) => l.key === k);
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
                            {link?.label || k}
                          </CardTitle>
                          <div className="flex gap-1 items-center ml-2">
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              onClick={() =>
                                moveUp(linksInTabletMenu, idx, (arr) =>
                                  onChange(arr, allLinks)
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
                                moveDown(linksInTabletMenu, idx, (arr) =>
                                  onChange(arr, allLinks)
                                )
                              }
                              disabled={idx === linksInTabletMenu.length - 1}
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
                                removeFromTabletMenu(k);
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
              {linksInTabletMenu.length === 0 && (
                <li className="py-2 text-muted-foreground">Нет</li>
              )}
            </div>
          </DroppableZone>
        </div>

        {/* Все ссылки */}
        <div className="flex-1">
          <div className="font-semibold mb-2">Все остальные ссылки</div>
          <DroppableZone id="all-links" isOver={overZone === "all-links"}>
            {allLinks.map((k, idx) => {
              const link = ALL_FOOTER_LINKS.find((l) => l.key === k);
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
                          {link?.label || k}
                        </CardTitle>
                        <div className="flex gap-1 items-center ml-2">
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              moveUp(allLinks, idx, (arr) =>
                                onChange(linksInTabletMenu, arr)
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
                              moveDown(allLinks, idx, (arr) =>
                                onChange(linksInTabletMenu, arr)
                              )
                            }
                            disabled={idx === allLinks.length - 1}
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
                              removeFromAllLinks(k);
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
            {allLinks.length === 0 && (
              <li className="py-2 text-muted-foreground">Нет</li>
            )}
          </DroppableZone>
        </div>
      </div>
      <DragOverlay dropAnimation={null}>
        {activeLink ? (
          <DraggableLink
            link={activeLink}
            isSelected={false}
            onClick={() => {}}
            dragOverlay
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
