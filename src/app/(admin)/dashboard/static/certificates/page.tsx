"use client";

import { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
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
import { useCertificatesPageConfig } from "@/hooks/useCertificatesPageConfig";
import {
  ICertificatesPageConfig,
  IUpdateCertificatesPageConfigData,
} from "@/shared/types/certificates-page-config.types";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil, Trash2, FileText } from "lucide-react";
import certificatesPageConfigService from "@/services/certificates-page-config.service";
import { BACKEND_MAIN } from "@/constants";
import { useToast } from "@/hooks/use-toast";

type Doc = { title: string; link: string };
type Item = {
  id: number;
  title: string;
  content: string;
  order: number;
  documents: Doc[];
};

function SortableItem({
  item,
  index,
  onEdit,
  onDelete,
  deletePopoverOpen,
  onDeletePopoverChange,
}: {
  item: Item;
  index: number;
  onEdit: (item: Item, index: number) => void;
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
  } as React.CSSProperties;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`relative group ${isDragging ? "shadow-lg" : ""}`}
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

export default function CertificatesPage() {
  const { config, loading, updateConfig, isUpdating } =
    useCertificatesPageConfig();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("0");
  const [form, setForm] = useState<ICertificatesPageConfig | null>(null);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [editForm, setEditForm] = useState<Partial<Item>>({});
  const [editingItemIndex, setEditingItemIndex] = useState<number>(-1);
  const [deletePopoverOpenIndex, setDeletePopoverOpenIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (!config) return;
    setForm({
      ...config,
      tabs: config.tabs.map((t) => ({
        ...t,
        items: t.items.map((it, idx) => ({
          ...it,
          id: it.id || idx + 1,
          order: it.order || idx + 1,
        })),
      })),
    });
  }, [config]);

  if (loading || !form) return <div className="p-6">Загрузка...</div>;

  const save = (updated: ICertificatesPageConfig, showToast?: boolean) => {
    setForm(updated);
    const payload: IUpdateCertificatesPageConfigData = { tabs: updated.tabs };
    updateConfig(payload, {
      onSuccess: () => {
        if (showToast) {
          toast({ title: "Готово", description: "Настройки сохранены" });
        }
      },
    });
  };

  const addTab = () => {
    const updated: ICertificatesPageConfig = {
      ...form,
      tabs: [...form.tabs, { name: "Новый раздел", items: [] }],
    };
    save(updated);
    setActiveTab(String(updated.tabs.length - 1));
  };

  const removeTab = (tabIndex: number) => {
    const updatedTabs = form.tabs.filter((_, i) => i !== tabIndex);
    const updated = { ...form, tabs: updatedTabs };
    save(updated as ICertificatesPageConfig);
    setActiveTab("0");
  };

  const addItem = (tabIndex: number) => {
    const tab = form.tabs[tabIndex];
    const newId = Math.max(0, ...tab.items.map((i) => i.id)) + 1;
    const newOrder = Math.max(0, ...tab.items.map((i) => i.order)) + 1;
    const updated = { ...form };
    updated.tabs[tabIndex].items.push({
      id: newId,
      title: "",
      content: "",
      order: newOrder,
      documents: [],
    });
    save(updated);
  };

  const removeItem = (tabIndex: number, index: number) => {
    const updated = { ...form };
    updated.tabs[tabIndex].items = updated.tabs[tabIndex].items
      .filter((_, i) => i !== index)
      .map((it, idx) => ({ ...it, order: idx + 1 }));
    save(updated);
  };

  const openEditDialog = (item: Item, index: number) => {
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
  const saveItemEdit = (tabIndex: number) => {
    if (editingItemIndex === -1) return;
    const updated = { ...form } as ICertificatesPageConfig;
    updated.tabs[tabIndex].items[editingItemIndex] = {
      ...updated.tabs[tabIndex].items[editingItemIndex],
      ...editForm,
    } as Item;
    save(updated);
    closeEditDialog();
  };

  const addDoc = () => {
    if (!editForm.documents) return;
    setEditForm({
      ...editForm,
      documents: [...editForm.documents, { title: "", link: "" }],
    });
  };
  const removeDoc = (docIdx: number) => {
    if (!editForm.documents) return;
    setEditForm({
      ...editForm,
      documents: editForm.documents.filter((_, i) => i !== docIdx),
    });
  };
  const updateDoc = (docIdx: number, field: keyof Doc, value: string) => {
    if (!editForm.documents) return;
    const docs = [...editForm.documents];
    docs[docIdx] = { ...docs[docIdx], [field]: value } as Doc;
    setEditForm({ ...editForm, documents: docs });
  };
  const onUploadDoc = async (
    tabIndex: number,
    docIdx: number,
    file?: File | null
  ) => {
    if (!file) return;
    const key = `tabs[${tabIndex}].items[${editingItemIndex}].documents[${docIdx}].link`;
    const fd = new FormData();
    fd.append(key, file);
    const { data } = await certificatesPageConfigService.upload(fd);
    const filename = data[key] as string;
    updateDoc(docIdx, "link", `/uploads/certificates/${filename}`);
  };

  const handleDragEnd = (tabIndex: number, event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const items = form.tabs[tabIndex].items;
      const oldIndex = items.findIndex((it) => it.id === active.id);
      const newIndex = items.findIndex((it) => it.id === over.id);
      const reordered = arrayMove(items, oldIndex, newIndex).map((it, idx) => ({
        ...it,
        order: idx + 1,
      }));
      const updated = { ...form } as ICertificatesPageConfig;
      updated.tabs[tabIndex].items = reordered;
      save(updated);
    }
  };

  return (
    <div className="p-6 mt-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex gap-2 flex-wrap">
          {form.tabs.map((tab, idx) => (
            <TabsTrigger key={idx} value={String(idx)}>
              {tab.name || `Раздел ${idx + 1}`}
            </TabsTrigger>
          ))}
          <Button variant="outline" size="sm" onClick={addTab}>
            Добавить раздел
          </Button>
        </TabsList>
        <div className="mt-6">
          {form.tabs.map((tab, idx) => (
            <TabsContent
              key={idx}
              value={String(idx)}
              className="mt-0 space-y-6"
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Раздел: {tab.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeTab(idx)}
                      >
                        Удалить раздел
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div>
                      <label className="text-sm text-gray-600">
                        Название раздела
                      </label>
                      <Input
                        value={tab.name}
                        onChange={(e) => {
                          const updated = {
                            ...form,
                          } as ICertificatesPageConfig;
                          updated.tabs[idx].name = e.target.value;
                          setForm(updated);
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Пункты ({tab.items.length})
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addItem(idx)}
                    >
                      Добавить пункт
                    </Button>
                  </div>

                  <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={(ev) => handleDragEnd(idx, ev)}
                  >
                    <SortableContext
                      items={tab.items.map((it) => it.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-4">
                        {tab.items.map((item, itemIdx) => (
                          <SortableItem
                            key={item.id}
                            item={item}
                            index={itemIdx}
                            onEdit={openEditDialog}
                            onDelete={(i) => removeItem(idx, i)}
                            deletePopoverOpen={
                              deletePopoverOpenIndex === itemIdx
                            }
                            onDeletePopoverChange={(open) =>
                              setDeletePopoverOpenIndex(open ? itemIdx : null)
                            }
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                </CardContent>
              </Card>
            </TabsContent>
          ))}

          <div className="mt-4 flex justify-end">
            <Button onClick={() => save(form, true)} disabled={isUpdating}>
              {isUpdating ? "Сохранение..." : "Сохранить"}
            </Button>
          </div>
        </div>
      </Tabs>

      <Dialog open={!!editingItem} onOpenChange={() => closeEditDialog()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Редактирование пункта</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Заголовок</label>
              <Input
                value={editForm.title || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Содержимое</label>
              <Textarea
                value={editForm.content || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, content: e.target.value })
                }
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Документы ({editForm.documents?.length || 0})
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addDoc}
                >
                  Добавить документ
                </Button>
              </div>
              {(editForm.documents || []).map((doc, docIdx) => (
                <div
                  key={docIdx}
                  className="grid grid-cols-3 gap-3 items-center p-3 border rounded-lg"
                >
                  <Input
                    placeholder="Название документа"
                    value={doc.title}
                    onChange={(e) => updateDoc(docIdx, "title", e.target.value)}
                  />
                  <div className="col-span-2 flex items-center gap-3">
                    <Input
                      type="file"
                      onChange={(e) =>
                        onUploadDoc(
                          Number(activeTab),
                          docIdx,
                          e.target.files?.[0]
                        )
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
                      variant="destructive"
                      type="button"
                      onClick={() => removeDoc(docIdx)}
                    >
                      Удалить
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={closeEditDialog}>
                Отмена
              </Button>
              <Button onClick={() => saveItemEdit(Number(activeTab))}>
                Сохранить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
