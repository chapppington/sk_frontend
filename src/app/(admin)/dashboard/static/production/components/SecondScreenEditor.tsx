"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import { Label } from "@/components/ui/shadcn/label";
import Image from "next/image";
import { BACKEND_MAIN } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import StageEditDialog from "./StageEditDialog";
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

type Stage = {
  id: number;
  number: string;
  title: string;
  description: string;
  image: string;
};

type SecondScreenData = {
  title: string;
  subtitle: string;
  stages: Stage[];
};

interface Props {
  data: SecondScreenData;
  onSave: (data: SecondScreenData) => void;
  saving: boolean;
}

export function SecondScreenEditor({ data, onSave, saving }: Props) {
  const [form, setForm] = useState<SecondScreenData>(data);
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [draftStage, setDraftStage] = useState<Stage | null>(null);
  const [deletePopoverOpenIndex, setDeletePopoverOpenIndex] = useState<
    number | null
  >(null);

  const handleSave = () => {
    onSave(form);
    toast({ title: "Успех", description: "Второй экран сохранен" });
  };

  const removeStage = (index: number) => {
    const updatedForm = {
      ...form,
      stages: form.stages.filter((_, i) => i !== index),
    };
    setForm(updatedForm);
    onSave(updatedForm);
    toast({ title: "Готово", description: "Этап удален" });
  };

  const openEdit = (index: number) => {
    setEditingIndex(index);
    setIsCreateMode(false);
    setDraftStage(null);
    setDialogOpen(true);
  };

  const handleDialogSave = (updatedStage: Stage) => {
    if (editingIndex === null) return;
    const updatedStages = [...form.stages];
    updatedStages[editingIndex] = updatedStage;
    const updatedForm = { ...form, stages: updatedStages };
    setForm(updatedForm);
    onSave(updatedForm);
    toast({ title: "Успех", description: "Этап сохранен" });
  };

  const handleDialogCroppedSave = (index: number, imagePath: string) => {
    const updatedStages = [...form.stages];
    updatedStages[index] = { ...updatedStages[index], image: imagePath };
    const updatedForm = { ...form, stages: updatedStages };
    setForm(updatedForm);
    onSave(updatedForm);
    toast({ title: "Успех", description: "Изображение этапа сохранено" });
  };

  // DND sortable item
  function SortableStageRow({ stage, idx }: { stage: Stage; idx: number }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: stage.id });
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
          <div className="h-12 w-9 overflow-hidden rounded border bg-muted">
            {stage.image && (
              <Image
                src={`${BACKEND_MAIN}${stage.image}`}
                alt="thumb"
                width={56}
                height={75}
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <div className="truncate">
            <div className="text-sm font-medium truncate">
              Этап {stage.number} — {stage.title || "Без названия"}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {stage.description || "Описание отсутствует"}
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
                  Удалить этап {stage.number}?
                </div>
                <p className="text-xs text-muted-foreground">
                  Вы уверены, что хотите удалить этот этап? Это действие
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
                      removeStage(idx);
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
    const oldIndex = form.stages.findIndex((s) => s.id === active.id);
    const newIndex = form.stages.findIndex((s) => s.id === over.id);
    const newStages = arrayMove(form.stages, oldIndex, newIndex).map(
      (s, idx) => ({ ...s, number: String(idx + 1).padStart(2, "0") })
    );
    const updatedForm = { ...form, stages: newStages };
    setForm(updatedForm);
    onSave(updatedForm);
    toast({ title: "Готово", description: "Порядок этапов обновлен" });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Второй экран: этапы</CardTitle>
        <Button onClick={handleSave} disabled={saving} variant="default">
          {saving ? "Сохранение..." : "Сохранить"}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Заголовок</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Подзаголовок</Label>
            <Input
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label>Этапы</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const nextId = (form.stages.at(-1)?.id ?? 0) + 1;
              const nextNumber = (form.stages.length + 1)
                .toString()
                .padStart(2, "0");
              // Open dialog in create mode WITHOUT mutating form
              setIsCreateMode(true);
              setDraftStage({
                id: nextId,
                number: nextNumber,
                title: "",
                description: "",
                image: "",
              });
              setEditingIndex(null);
              setDialogOpen(true);
            }}
          >
            + Добавить этап
          </Button>
        </div>

        <div className="mb-3 px-3 py-2 rounded-md border border-yellow-300 bg-yellow-50 text-yellow-800 flex items-center gap-2 text-xs">
          
          Чтобы изменить порядок, перетащите карточку этапа за иконку <GripVertical className="w-4 h-4 text-yellow-600" /> — изменения
          сохранятся автоматически, номера пересчитаются автоматически
        </div>
        <div className="rounded-md border divide-y">
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={form.stages.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              {form.stages.map((stage, idx) => (
                <SortableStageRow key={stage.id} stage={stage} idx={idx} />
              ))}
            </SortableContext>
          </DndContext>
        </div>

        {dialogOpen && (
          <StageEditDialog
            open={dialogOpen}
            onOpenChange={(open) => {
              setDialogOpen(open);
              if (!open) {
                setIsCreateMode(false);
                setDraftStage(null);
                setEditingIndex(null);
              }
            }}
            stage={
              isCreateMode && draftStage
                ? draftStage
                : form.stages[editingIndex as number]
            }
            index={isCreateMode ? form.stages.length : (editingIndex as number)}
            onSave={(updated) => {
              if (isCreateMode) {
                const updatedForm = {
                  ...form,
                  stages: [...form.stages, updated],
                };
                setForm(updatedForm);
                onSave(updatedForm);
                toast({ title: "Успех", description: "Этап создан" });
              } else {
                handleDialogSave(updated);
              }
              setDialogOpen(false);
              setIsCreateMode(false);
              setDraftStage(null);
              setEditingIndex(null);
            }}
            onCroppedSave={handleDialogCroppedSave}
            onCroppedDraft={(path) => {
              if (draftStage) setDraftStage({ ...draftStage, image: path });
            }}
            isCreate={isCreateMode}
          />
        )}
      </CardContent>
    </Card>
  );
}
