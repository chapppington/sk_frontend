"use client";

import { useState, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shadcn/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Pencil, FileText, Download, Trash2, GripVertical } from "lucide-react";
import productionPageConfigService from "@/services/production-page-config.service";
import { useToast } from "@/hooks/use-toast";
import { BACKEND_MAIN } from "@/constants";

type DocumentItem = { title: string; link: string };
type FourthItem = {
  id: number;
  title: string;
  content: string;
  documents: DocumentItem[];
  order: number;
};

type FourthScreenData = { items: FourthItem[] };

interface Props {
  data: FourthScreenData;
  onSave: (data: FourthScreenData) => void;
  saving: boolean;
}

// Компонент сортируемой карточки
function SortableItemCard({
  item,
  index,
  onEdit,
  onDelete,
  deletePopoverOpen,
  onDeletePopoverChange,
}: {
  item: FourthItem;
  index: number;
  onEdit: (item: FourthItem, index: number) => void;
  onDelete: (index: number) => void;
  deletePopoverOpen: boolean;
  onDeletePopoverChange: (open: boolean) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    width: isDragging ? "100%" : undefined,
    height: isDragging ? "auto" : undefined,
    minHeight: isDragging ? "120px" : undefined,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`relative group ${isDragging ? "shadow-lg scale-105" : ""}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <div
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded flex-shrink-0"
              >
                <GripVertical className="h-4 w-4 text-gray-400" />
              </div>
              <span className="text-2xl font-bold text-gray-400 flex-shrink-0">
                {index + 1}
              </span>
              <h4 className="font-medium text-sm text-gray-900 truncate">
                {item.title || `Раздел ${index + 1}`}
              </h4>
            </div>
            {item.content && (
              <p className="text-xs text-gray-500 line-clamp-3 ml-8">
                {item.content}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="p-2 h-8 w-8"
              onClick={() => onEdit(item, index)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Popover
              open={deletePopoverOpen}
              onOpenChange={onDeletePopoverChange}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 h-8 w-8 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <p className="text-sm">
                    Вы уверены, что хотите удалить раздел "
                    {item.title || `Раздел ${index + 1}`}"?
                  </p>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDeletePopoverChange(false)}
                    >
                      Отмена
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        onDelete(index);
                        onDeletePopoverChange(false);
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

        {item.documents.length > 0 && (
          <div className="mt-3 space-y-2 ml-8 min-w-0">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <FileText className="h-3 w-3 flex-shrink-0" />
              <span>{item.documents.length} документ(ов)</span>
            </div>
            {item.documents.slice(0, 3).map((doc, docIdx) => (
              <div key={docIdx} className="text-xs text-gray-600 truncate">
                {doc.title || `Документ ${docIdx + 1}`}
              </div>
            ))}
            {item.documents.length > 3 && (
              <div className="text-xs text-gray-400">
                +{item.documents.length - 3} еще
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function FourthScreenEditor({ data, onSave, saving }: Props) {
  const [form, setForm] = useState<FourthScreenData>(() => ({
    ...data,
    items: data.items.map((item, index) => ({
      ...item,
      id: item.id || index + 1,
      order: item.order || index + 1,
    })),
  }));
  const [editingItem, setEditingItem] = useState<FourthItem | null>(null);
  const [editForm, setEditForm] = useState<Partial<FourthItem>>({});
  const [editingItemIndex, setEditingItemIndex] = useState<number>(-1);
  const [deletePopoverOpenIndex, setDeletePopoverOpenIndex] = useState<
    number | null
  >(null);
  const { toast } = useToast();

  // Обновляем форму при изменении data
  useEffect(() => {
    setForm({
      ...data,
      items: data.items.map((item, index) => ({
        ...item,
        id: item.id || index + 1,
        order: item.order || index + 1,
      })),
    });
  }, [data]);

  const handleSave = () => {
    onSave(form);
    toast({ title: "Успех", description: "Четвертый экран сохранен" });
  };

  const addItem = () => {
    const newId = Math.max(...form.items.map((item) => item.id), 0) + 1;
    const newOrder = Math.max(...form.items.map((item) => item.order), 0) + 1;
    const newItem = {
      id: newId,
      title: "",
      content: "",
      documents: [],
      order: newOrder,
    };
    const updatedForm = { ...form, items: [...form.items, newItem] };
    setForm(updatedForm);
    onSave(updatedForm);
  };

  const removeItem = (index: number) => {
    const updatedItems = form.items.filter((_, i) => i !== index);
    // Пересчитываем порядок
    const reorderedItems = updatedItems.map((item, idx) => ({
      ...item,
      order: idx + 1,
    }));
    const updatedForm = { ...form, items: reorderedItems };
    setForm(updatedForm);
    onSave(updatedForm);
    toast({ title: "Готово", description: "Раздел удален" });
  };

  const openEditDialog = (item: FourthItem, index: number) => {
    setEditingItem(item);
    setEditingItemIndex(index);
    setEditForm({
      title: item.title,
      content: item.content,
      documents: [...item.documents],
    });
  };

  const closeEditDialog = () => {
    setEditingItem(null);
    setEditingItemIndex(-1);
    setEditForm({});
  };

  const saveItemEdit = () => {
    if (editingItemIndex !== -1) {
      const items = [...form.items];
      items[editingItemIndex] = {
        ...items[editingItemIndex],
        ...editForm,
      };
      const updatedForm = { ...form, items };
      setForm(updatedForm);

      // Сразу сохраняем изменения в базу данных
      onSave(updatedForm);

      toast({ title: "Успех", description: "Раздел обновлен и сохранен" });
    }
    closeEditDialog();
  };

  const addDoc = () => {
    if (editForm.documents) {
      setEditForm({
        ...editForm,
        documents: [...editForm.documents, { title: "", link: "" }],
      });
    }
  };

  const removeDoc = (docIdx: number) => {
    if (editForm.documents) {
      const documents = editForm.documents.filter((_, i) => i !== docIdx);
      setEditForm({ ...editForm, documents });
    }
  };

  const updateDoc = (docIdx: number, field: keyof DocumentItem, value: any) => {
    if (editForm.documents) {
      const documents = [...editForm.documents];
      documents[docIdx] = { ...documents[docIdx], [field]: value };
      setEditForm({ ...editForm, documents });
    }
  };

  const onUploadDoc = async (docIdx: number, file?: File | null) => {
    if (!file) return;
    const key = `fourthScreen.items[${editingItemIndex}].documents[${docIdx}].link`;
    const fd = new FormData();
    fd.append(key, file);
    const { data } = await productionPageConfigService.upload(fd);
    const filename = data[key] as string;
    updateDoc(docIdx, "link", `/uploads/production-page/${filename}`);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = form.items.findIndex((item) => item.id === active.id);
      const newIndex = form.items.findIndex((item) => item.id === over.id);

      const reorderedItems = arrayMove(form.items, oldIndex, newIndex);
      // Пересчитываем порядок
      const updatedItems = reorderedItems.map((item, idx) => ({
        ...item,
        order: idx + 1,
      }));

      const updatedForm = { ...form, items: updatedItems };
      setForm(updatedForm);
      onSave(updatedForm);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Четвертый экран: документы</CardTitle>
            <Button onClick={handleSave} disabled={saving} size="sm">
              {saving ? "Сохранение..." : "Сохранить"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label>Разделы ({form.items.length})</Label>
            <Button type="button" variant="outline" size="sm" onClick={addItem}>
              Добавить раздел
            </Button>
          </div>

          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={form.items.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {form.items.map((item, idx) => (
                  <SortableItemCard
                    key={item.id}
                    item={item}
                    index={idx}
                    onEdit={openEditDialog}
                    onDelete={removeItem}
                    deletePopoverOpen={deletePopoverOpenIndex === idx}
                    onDeletePopoverChange={(open) =>
                      setDeletePopoverOpenIndex(open ? idx : null)
                    }
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </CardContent>
      </Card>

      <Dialog open={!!editingItem} onOpenChange={() => closeEditDialog()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingItemIndex !== -1 &&
                `Редактировать ${editingItemIndex + 1}-й раздел`}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Заголовок раздела</Label>
              <Input
                value={editForm.title || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
                placeholder="Введите заголовок раздела"
              />
            </div>

            <div className="space-y-2">
              <Label>Описание</Label>
              <Textarea
                value={editForm.content || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, content: e.target.value })
                }
                placeholder="Введите описание раздела"
                rows={3}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Документы</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addDoc}
                >
                  Добавить документ
                </Button>
              </div>

              <div className="space-y-3">
                {editForm.documents?.map((doc, docIdx) => (
                  <div
                    key={docIdx}
                    className="grid grid-cols-3 gap-3 items-center p-3 border rounded-lg"
                  >
                    <Input
                      value={doc.title}
                      onChange={(e) =>
                        updateDoc(docIdx, "title", e.target.value)
                      }
                      placeholder="Название документа"
                    />
                    <div className="col-span-2 flex items-center gap-3">
                      <Input
                        type="file"
                        onChange={(e) =>
                          onUploadDoc(docIdx, e.target.files?.[0])
                        }
                      />
                      {doc.link && (
                        <a
                          href={`${BACKEND_MAIN}${doc.link}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Смотреть
                        </a>
                      )}
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeDoc(docIdx)}
                      >
                        Удалить
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={closeEditDialog}
              className="flex-1"
            >
              Отмена
            </Button>
            <Button onClick={saveItemEdit} className="flex-1">
              Сохранить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
