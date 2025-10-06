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
import Image from "next/image";
import { UPLOADS_URL } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import TeamMemberEditDialog from "./TeamMemberEditDialog";
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

type TeamMember = {
  id: number;
  name: string;
  position: string;
  image: string;
  order: number;
};

type TeamScreenData = {
  brackets_text: string;
  title: string;
  description: string;
  cta_text: string;
  cta_button_text: string;
  cta_button_href: string;
  team_members: TeamMember[];
};

interface Props {
  data: TeamScreenData;
  onSave: (data: TeamScreenData) => void;
  saving: boolean;
}

// Ensure team member ids are unique and stable
function ensureUniqueTeamMemberIds(members: TeamMember[]): TeamMember[] {
  const seen = new Set<number>();
  const sanitized: TeamMember[] = [];
  let maxId = members.reduce((acc, m) => (m.id > acc ? m.id : acc), 0);
  for (const member of members) {
    if (seen.has(member.id)) {
      maxId += 1;
      sanitized.push({ ...member, id: maxId });
      seen.add(maxId);
    } else {
      sanitized.push(member);
      seen.add(member.id);
    }
  }
  return sanitized;
}

export function TeamScreenEditor({ data, onSave, saving }: Props) {
  const [form, setForm] = useState<TeamScreenData>(() => ({
    ...data,
    team_members: ensureUniqueTeamMemberIds(data.team_members ?? []),
  }));
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [draftMember, setDraftMember] = useState<TeamMember | null>(null);
  const [deletePopoverOpenIndex, setDeletePopoverOpenIndex] = useState<
    number | null
  >(null);

  // Re-sanitize if parent updates data prop
  useEffect(() => {
    setForm({
      ...data,
      team_members: ensureUniqueTeamMemberIds(data.team_members ?? []),
    });
  }, [data]);

  const handleSave = () => {
    onSave(form);
    toast({ title: "Успех", description: "Экран команды сохранен" });
  };

  const removeMember = (index: number) => {
    const updatedForm = {
      ...form,
      team_members: form.team_members.filter((_, i) => i !== index),
    };
    setForm(updatedForm);
    onSave(updatedForm);
    toast({ title: "Готово", description: "Участник команды удален" });
  };

  const openEdit = (index: number) => {
    setEditingIndex(index);
    setIsCreateMode(false);
    setDraftMember(null);
    setDialogOpen(true);
  };

  const handleDialogSave = (updatedMember: TeamMember) => {
    if (editingIndex === null) return;
    const updatedMembers = [...form.team_members];
    updatedMembers[editingIndex] = updatedMember;
    const updatedForm = { ...form, team_members: updatedMembers };
    setForm(updatedForm);
    onSave(updatedForm);
    toast({ title: "Успех", description: "Участник команды сохранен" });
  };

  // DND sortable item
  function SortableTeamMemberRow({ member, idx }: { member: TeamMember; idx: number }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: member.id });
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
          <div className="h-12 w-12 overflow-hidden rounded-full border bg-muted">
            {member.image && (
              <Image
                src={`${UPLOADS_URL}${member.image}`}
                alt="avatar"
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <div className="truncate">
            <div className="text-sm font-medium truncate">
              {member.name || "Без имени"}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {member.position || "Должность не указана"}
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
                  Удалить участника команды?
                </div>
                <p className="text-xs text-muted-foreground">
                  Вы уверены, что хотите удалить этого участника команды? Это действие
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
                      removeMember(idx);
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
    const oldIndex = form.team_members.findIndex((m) => m.id === active.id);
    const newIndex = form.team_members.findIndex((m) => m.id === over.id);
    const newMembers = arrayMove(form.team_members, oldIndex, newIndex).map(
      (m, idx) => ({ ...m, order: idx + 1 })
    );
    const updatedForm = { ...form, team_members: newMembers };
    setForm(updatedForm);
    onSave(updatedForm);
    toast({ title: "Готово", description: "Порядок участников команды обновлен" });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Экран команды</CardTitle>
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
              placeholder="FAQ"
            />
          </div>
          <div className="space-y-2">
            <Label>Заголовок</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Наша команда"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Описание</Label>
          <Textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Описание команды"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Текст призыва к действию</Label>
            <Input
              value={form.cta_text}
              onChange={(e) => setForm({ ...form, cta_text: e.target.value })}
              placeholder="Хотите к нам в команду?"
            />
          </div>
          <div className="space-y-2">
            <Label>Текст кнопки</Label>
            <Input
              value={form.cta_button_text}
              onChange={(e) => setForm({ ...form, cta_button_text: e.target.value })}
              placeholder="Смотреть вакансии"
            />
          </div>
          <div className="space-y-2">
            <Label>Ссылка кнопки</Label>
            <Input
              value={form.cta_button_href}
              onChange={(e) => setForm({ ...form, cta_button_href: e.target.value })}
              placeholder="/vacancies"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label>Участники команды</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const maxId = form.team_members.length
                ? Math.max(...form.team_members.map((m) => m.id))
                : 0;
              const nextId = maxId + 1;
              const nextOrder = form.team_members.length + 1;
              // Open dialog in create mode WITHOUT mutating form
              setIsCreateMode(true);
              setDraftMember({
                id: nextId,
                name: "",
                position: "",
                image: "",
                order: nextOrder,
              });
              setEditingIndex(null);
              setDialogOpen(true);
            }}
          >
            + Добавить участника
          </Button>
        </div>

        <div className="mb-3 px-3 py-2 rounded-md border border-yellow-300 bg-yellow-50 text-yellow-800 flex items-center gap-2 text-xs">
          Чтобы изменить порядок, перетащите карточку участника за иконку{" "}
          <GripVertical className="w-4 h-4 text-yellow-600" /> — изменения
          сохранятся автоматически
        </div>
        <div className="rounded-md border divide-y">
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={form.team_members.map((m) => m.id)}
              strategy={verticalListSortingStrategy}
            >
              {form.team_members.map((member, idx) => (
                <SortableTeamMemberRow key={member.id} member={member} idx={idx} />
              ))}
            </SortableContext>
          </DndContext>
        </div>

        {dialogOpen && (
          <TeamMemberEditDialog
            open={dialogOpen}
            onOpenChange={(open) => {
              setDialogOpen(open);
              if (!open) {
                setIsCreateMode(false);
                setDraftMember(null);
                setEditingIndex(null);
              }
            }}
            member={
              isCreateMode && draftMember
                ? draftMember
                : form.team_members[editingIndex as number]
            }
            index={isCreateMode ? form.team_members.length : (editingIndex as number)}
            onSave={(updated) => {
              if (isCreateMode) {
                const updatedForm = {
                  ...form,
                  team_members: [...form.team_members, updated],
                };
                setForm(updatedForm);
                onSave(updatedForm);
                toast({ title: "Успех", description: "Участник команды создан" });
              } else {
                handleDialogSave(updated);
              }
              setDialogOpen(false);
              setIsCreateMode(false);
              setDraftMember(null);
              setEditingIndex(null);
            }}
            isCreate={isCreateMode}
          />
        )}
      </CardContent>
    </Card>
  );
}

