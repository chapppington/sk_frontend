"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import { Label } from "@/components/ui/shadcn/label";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { useToast } from "@/hooks/use-toast";
import HistoryEventEditDialog from "./HistoryEventEditDialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import { Pencil, Trash2, GripVertical } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type HistoryEvent = {
  id: number;
  number: string; // period label, e.g. "2007–2009"
  title: string; // short caption
  employees: number; // headcount for the period
  employeesHasPlus: boolean; // show plus sign after number
  areaM2: number; // production area in square meters
  order: number;
};

type HistoryScreenData = {
  brackets_text: string;
  title: string;
  description: string;
  history_events: HistoryEvent[];
};

interface Props {
  data: HistoryScreenData;
  onSave: (data: HistoryScreenData) => void;
  saving: boolean;
}

// Ensure history event ids are unique and stable
function ensureUniqueHistoryEventIds(events: HistoryEvent[]): HistoryEvent[] {
  const seen = new Set<number>();
  const sanitized: HistoryEvent[] = [];
  let maxId = events.reduce((acc, e) => (e.id > acc ? e.id : acc), 0);
  for (const event of events) {
    if (seen.has(event.id)) {
      maxId += 1;
      sanitized.push({ ...event, id: maxId });
      seen.add(maxId);
    } else {
      sanitized.push(event);
      seen.add(event.id);
    }
  }
  return sanitized;
}

export function HistoryScreenEditor({ data, onSave, saving }: Props) {
  const [form, setForm] = useState<HistoryScreenData>(() => ({
    ...data,
    history_events: ensureUniqueHistoryEventIds(data.history_events ?? []),
  }));
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [draftEvent, setDraftEvent] = useState<HistoryEvent | null>(null);
  const [deletePopoverOpenIndex, setDeletePopoverOpenIndex] = useState<
    number | null
  >(null);

  // Re-sanitize if parent updates data prop
  useEffect(() => {
    setForm({
      ...data,
      history_events: ensureUniqueHistoryEventIds(data.history_events ?? []),
    });
  }, [data]);

  const handleSave = () => {
    onSave(form);
    toast({ title: "Успех", description: "Экран истории сохранен" });
  };

  const removeEvent = (index: number) => {
    const updatedForm = {
      ...form,
      history_events: form.history_events.filter((_, i) => i !== index),
    };
    setForm(updatedForm);
    onSave(updatedForm);
    toast({ title: "Готово", description: "Событие истории удалено" });
  };

  const openEdit = (index: number) => {
    setEditingIndex(index);
    setIsCreateMode(false);
    setDraftEvent(null);
    setDialogOpen(true);
  };

  const handleDialogSave = (updatedEvent: HistoryEvent) => {
    if (editingIndex === null) return;
    const updatedEvents = [...form.history_events];
    updatedEvents[editingIndex] = updatedEvent;
    const updatedForm = { ...form, history_events: updatedEvents };
    setForm(updatedForm);
    onSave(updatedForm);
    toast({ title: "Успех", description: "Событие истории сохранено" });
  };

  // DND sortable item
  function SortableHistoryEventRow({ event, idx }: { event: HistoryEvent; idx: number }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: event.id });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    } as React.CSSProperties;
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex items-center justify-between gap-4 p-3"
      >
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            aria-label="Перетащите, чтобы изменить порядок"
            className="p-1 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 cursor-grab active:cursor-grabbing"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="w-4 h-4" aria-hidden />
          </button>
          <div className="truncate">
            <div className="text-sm font-medium truncate">
              {event.number} — {event.title || "Без названия"}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {event.employees}{event.employeesHasPlus ? "+" : ""} сотрудников, {event.areaM2} м²
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => openEdit(idx)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Popover
            open={deletePopoverOpenIndex === idx}
            onOpenChange={(open) =>
              setDeletePopoverOpenIndex(open ? idx : null)
            }
          >
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <div className="text-sm font-medium">
                  Удалить событие истории?
                </div>
                <p className="text-xs text-muted-foreground">
                  Вы уверены, что хотите удалить это событие истории? Это действие
                  невозможно отменить.
                </p>
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeletePopoverOpenIndex(null)}
                  >
                    Отмена
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      removeEvent(idx);
                      setDeletePopoverOpenIndex(null);
                    }}
                  >
                    Удалить
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = form.history_events.findIndex((e) => e.id === active.id);
    const newIndex = form.history_events.findIndex((e) => e.id === over.id);
    const newEvents = arrayMove(form.history_events, oldIndex, newIndex).map(
      (e, idx) => ({ ...e, order: idx + 1 })
    );
    const updatedForm = { ...form, history_events: newEvents };
    setForm(updatedForm);
    onSave(updatedForm);
    toast({ title: "Готово", description: "Порядок событий истории обновлен" });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Экран истории компании</CardTitle>
        <Button onClick={handleSave} disabled={saving} variant="default">
          {saving ? "Сохранение..." : "Сохранить"}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Текст в скобках</Label>
            <Input
              value={form.brackets_text}
              onChange={(e) => setForm({ ...form, brackets_text: e.target.value })}
              placeholder="История"
            />
          </div>
          <div className="space-y-2">
            <Label>Заголовок</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="История компании"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Описание</Label>
          <Textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Описание истории компании"
            rows={3}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>События истории</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const maxId = form.history_events.length
                ? Math.max(...form.history_events.map((e) => e.id))
                : 0;
              const nextId = maxId + 1;
              const nextOrder = form.history_events.length + 1;
              // Open dialog in create mode WITHOUT mutating form
              setIsCreateMode(true);
              setDraftEvent({
                id: nextId,
                number: "",
                title: "",
                employees: 0,
                employeesHasPlus: false,
                areaM2: 0,
                order: nextOrder,
              });
              setEditingIndex(null);
              setDialogOpen(true);
            }}
          >
            + Добавить событие
          </Button>
        </div>

        <div className="mb-3 px-3 py-2 rounded-md border border-yellow-300 bg-yellow-50 text-yellow-800 flex items-center gap-2 text-xs">
          Чтобы изменить порядок, перетащите карточку события за иконку{" "}
          <GripVertical className="w-4 h-4 text-yellow-600" /> — изменения
          сохранятся автоматически
        </div>
        <div className="rounded-md border divide-y">
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={form.history_events.map((e) => e.id)}
              strategy={verticalListSortingStrategy}
            >
              {form.history_events.map((event, idx) => (
                <SortableHistoryEventRow key={event.id} event={event} idx={idx} />
              ))}
            </SortableContext>
          </DndContext>
        </div>

        {dialogOpen && (
          <HistoryEventEditDialog
            open={dialogOpen}
            onOpenChange={(open: boolean) => {
              setDialogOpen(open);
              if (!open) {
                setIsCreateMode(false);
                setDraftEvent(null);
                setEditingIndex(null);
              }
            }}
            event={
              isCreateMode && draftEvent
                ? draftEvent
                : form.history_events[editingIndex as number]
            }
            index={isCreateMode ? form.history_events.length : (editingIndex as number)}
            onSave={(updated: HistoryEvent) => {
              if (isCreateMode) {
                const updatedForm = {
                  ...form,
                  history_events: [...form.history_events, updated],
                };
                setForm(updatedForm);
                onSave(updatedForm);
                toast({ title: "Успех", description: "Событие истории создано" });
              } else {
                handleDialogSave(updated);
              }
              setDialogOpen(false);
              setIsCreateMode(false);
              setDraftEvent(null);
              setEditingIndex(null);
            }}
            isCreate={isCreateMode}
          />
        )}
      </CardContent>
    </Card>
  );
}
