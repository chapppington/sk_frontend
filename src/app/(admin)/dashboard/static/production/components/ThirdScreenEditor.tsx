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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shadcn/dialog";
import { Pencil } from "lucide-react";
import productionPageConfigService from "@/services/production-page-config.service";
import Image from "next/image";
import { UPLOADS_URL } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import ImageCropperDialog from "./ImageCropperDialog";

type Equipment = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  order: number;
};
type ThirdScreenData = {
  title: string;
  subtitle: string;
  equipment: Equipment[];
};

interface Props {
  data: ThirdScreenData;
  onSave: (data: ThirdScreenData) => void;
  saving: boolean;
}

export function ThirdScreenEditor({ data, onSave, saving }: Props) {
  const [form, setForm] = useState<ThirdScreenData>(data);
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(
    null
  );
  const [editForm, setEditForm] = useState<Partial<Equipment>>({});
  const [cropperOpen, setCropperOpen] = useState(false);
  const [cropperImage, setCropperImage] = useState<string>("");
  const [cropperConfig, setCropperConfig] = useState<{
    aspect: number;
    outputWidth: number;
    outputHeight: number;
  }>({ aspect: 1, outputWidth: 530, outputHeight: 400 });
  const { toast } = useToast();

  // Инициализируем 6 элементов оборудования при загрузке
  useEffect(() => {
    if (form.equipment.length < 6) {
      const equipment = [...form.equipment];
      while (equipment.length < 6) {
        const nextId = (equipment.at(-1)?.id ?? 0) + 1;
        equipment.push({
          id: nextId,
          title: "",
          subtitle: "",
          image: "",
          order: nextId,
        });
      }
      setForm({ ...form, equipment });
    }
  }, [data]);

  // Синхронизируем editForm при изменении editingEquipment
  useEffect(() => {
    if (editingEquipment) {
      setEditForm({
        title: editingEquipment.title,
        subtitle: editingEquipment.subtitle,
        image: editingEquipment.image,
      });
    }
  }, [editingEquipment]);

  const handleSave = () => {
    onSave(form);
    toast({ title: "Успех", description: "Третий экран сохранен" });
  };

  const openEditDialog = (equipment: Equipment) => {
    setEditingEquipment(equipment);
    setEditForm({
      title: equipment.title,
      subtitle: equipment.subtitle,
      image: equipment.image,
    });
  };

  const closeEditDialog = () => {
    setEditingEquipment(null);
    setEditForm({});
  };

  const saveEquipmentEdit = () => {
    if (editingEquipment) {
      const equipment = [...form.equipment];
      const index = equipment.findIndex((eq) => eq.id === editingEquipment.id);
      if (index !== -1) {
        const updatedEquipment = {
          ...equipment[index],
          ...editForm,
        };
        equipment[index] = updatedEquipment;
        const updatedForm = { ...form, equipment };
        setForm(updatedForm);

        // Обновляем editForm с новыми данными
        setEditForm({
          title: updatedEquipment.title,
          subtitle: updatedEquipment.subtitle,
          image: updatedEquipment.image,
        });

        // Обновляем editingEquipment с новыми данными
        setEditingEquipment(updatedEquipment);

        // Сразу сохраняем изменения в базу данных
        onSave(updatedForm);

        toast({ title: "Успех", description: "Элемент обновлен и сохранен" });
      }
    }
    closeEditDialog();
  };

  const getCropperConfig = (elementIndex: number) => {
    // Элементы 1, 3 (индексы 0, 2) - 530x400
    if (elementIndex === 0 || elementIndex === 2) {
      return { aspect: 530 / 400, outputWidth: 530, outputHeight: 400 };
    }
    // Элемент 5 (индекс 4) - 800x400
    if (elementIndex === 4) {
      return { aspect: 800 / 400, outputWidth: 800, outputHeight: 400 };
    }
    // Элементы 2, 4, 6 (индексы 1, 3, 5) - 250x400
    return { aspect: 250 / 400, outputWidth: 250, outputHeight: 400 };
  };

  const onUploadEquipmentImage = async (file?: File | null) => {
    if (!file || !editingEquipment) return;

    // Определяем индекс элемента для настройки кроппера
    const elementIndex = form.equipment.findIndex(
      (eq) => eq.id === editingEquipment.id
    );
    const config = getCropperConfig(elementIndex);

    // Создаем URL для предпросмотра
    const imageUrl = URL.createObjectURL(file);
    setCropperImage(imageUrl);
    setCropperConfig(config);
    setCropperOpen(true);
  };

  const handleCroppedImage = async (croppedFile: File) => {
    if (!editingEquipment) return;

    const key = `thirdScreen.equipment[${editingEquipment.id}].image`;
    const fd = new FormData();
    fd.append(key, croppedFile);

    try {
      const { data } = await productionPageConfigService.upload(fd);
      const filename = data[key] as string;
      const newImagePath = `/uploads/production-page/${filename}`;

      // Обновляем только editForm для показа в попапе
      setEditForm({ ...editForm, image: newImagePath });

      toast({
        title: "Успех",
        description: "Изображение обрезано и загружено",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить изображение",
        variant: "destructive",
      });
    }

    // Очищаем URL
    URL.revokeObjectURL(cropperImage);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Третий экран: оборудование (6 элементов)</CardTitle>
            <Button onClick={handleSave} disabled={saving} size="sm">
              {saving ? "Сохранение..." : "Сохранить"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Заголовок экрана</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Подзаголовок экрана</Label>
              <Input
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {form.equipment.slice(0, 6).map((eq, idx) => {
              // Определяем размеры превью в 3 раза меньше оригинала
              let previewStyle = "";

              if (idx === 0 || idx === 2) {
                // Элементы 1, 3 - 530x400 -> 177x133
                previewStyle = "w-[177px] h-[133px]";
              } else if (idx === 4) {
                // Элемент 5 - 800x400 -> 267x133
                previewStyle = "w-[267px] h-[133px]";
              } else {
                // Элементы 2, 4, 6 - 250x400 -> 83x133
                previewStyle = "w-[83px] h-[133px]";
              }

              return (
                <Card key={eq.id} className="relative group">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl font-bold text-gray-400">
                            {eq.order}
                          </span>
                          <h4 className="font-medium text-sm text-gray-900">
                            {eq.title || `Элемент ${idx + 1}`}
                          </h4>
                        </div>
                        {idx % 2 === 0 && eq.subtitle && (
                          <p className="text-xs text-gray-500">{eq.subtitle}</p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 h-8 w-8"
                        onClick={() => openEditDialog(eq)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>

                    {eq.image && (
                      <div
                        className={`relative ${previewStyle} bg-gray-100 rounded-md overflow-hidden border border-gray-300 mx-auto`}
                      >
                        <Image
                          src={`${UPLOADS_URL}${eq.image}`}
                          alt={eq.title || `Элемент ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!editingEquipment} onOpenChange={() => closeEditDialog()}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingEquipment &&
                (() => {
                  const elementIndex = form.equipment.findIndex(
                    (eq) => eq.id === editingEquipment.id
                  );
                  return `Редактировать ${elementIndex + 1}-й элемент`;
                })()}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Заголовок</Label>
              <Input
                value={editForm.title || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
                placeholder="Введите заголовок"
              />
            </div>

            {/* Показываем подзаголовок только для элементов 1, 3, 5 */}
            {editingEquipment &&
              form.equipment.findIndex((eq) => eq.id === editingEquipment.id) %
                2 ===
                0 && (
                <div className="space-y-2">
                  <Label>Подзаголовок</Label>
                  <Input
                    value={editForm.subtitle || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, subtitle: e.target.value })
                    }
                    placeholder="Введите подзаголовок"
                  />
                </div>
              )}

            <div className="space-y-2">
              <Label>Изображение</Label>
              <div className="space-y-3">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onUploadEquipmentImage(e.target.files?.[0])}
                />
                {editForm.image && editingEquipment && (
                  <div className="flex justify-center">
                    <div
                      className={`relative bg-gray-100 rounded-md overflow-hidden border border-gray-300 ${(() => {
                        const elementIndex = form.equipment.findIndex(
                          (eq) => eq.id === editingEquipment.id
                        );
                        if (elementIndex === 0 || elementIndex === 2) {
                          // Элементы 1, 3 - 530x400 -> 265x200
                          return "w-[265px] h-[200px]";
                        } else if (elementIndex === 4) {
                          // Элемент 5 - 800x400 -> 400x200
                          return "w-[400px] h-[200px]";
                        } else {
                          // Элементы 2, 4, 6 - 250x400 -> 125x200
                          return "w-[125px] h-[200px]";
                        }
                      })()}`}
                    >
                      <Image
                        src={`${UPLOADS_URL}${editForm.image}`}
                        alt="Предпросмотр"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
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
            <Button onClick={saveEquipmentEdit} className="flex-1">
              Сохранить
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ImageCropperDialog
        open={cropperOpen}
        onOpenChange={setCropperOpen}
        imageSrc={cropperImage}
        aspect={cropperConfig.aspect}
        outputWidth={cropperConfig.outputWidth}
        outputHeight={cropperConfig.outputHeight}
        filename={`equipment_${editingEquipment?.id || "unknown"}.jpg`}
        mimeType="image/jpeg"
        onCropped={handleCroppedImage}
      />
    </>
  );
}
