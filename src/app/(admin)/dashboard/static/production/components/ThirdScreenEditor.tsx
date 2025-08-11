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
import productionPageConfigService from "@/services/production-page-config.service";
import Image from "next/image";
import { BACKEND_MAIN } from "@/constants";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const handleSave = () => {
    onSave(form);
    toast({ title: "Успех", description: "Третий экран сохранен" });
  };

  const updateEquipment = (
    index: number,
    field: keyof Equipment,
    value: any
  ) => {
    const equipment = [...form.equipment];
    equipment[index] = { ...equipment[index], [field]: value };
    setForm({ ...form, equipment });
  };

  const addEquipment = () => {
    const nextId = (form.equipment.at(-1)?.id ?? 0) + 1;
    setForm({
      ...form,
      equipment: [
        ...form.equipment,
        { id: nextId, title: "", subtitle: "", image: "", order: nextId },
      ],
    });
  };

  const removeEquipment = (index: number) => {
    setForm({
      ...form,
      equipment: form.equipment.filter((_, i) => i !== index),
    });
  };

  const onUploadEquipmentImage = async (index: number, file?: File | null) => {
    if (!file) return;
    const key = `thirdScreen.equipment[${index}].image`;
    const fd = new FormData();
    fd.append(key, file);
    const { data } = await productionPageConfigService.upload(fd);
    const filename = data[key] as string;
    updateEquipment(index, "image", `/uploads/production-page/${filename}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Третий экран: оборудование</CardTitle>
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
          <Label>Оборудование</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addEquipment}
          >
            Добавить оборудование
          </Button>
        </div>

        <div className="space-y-4">
          {form.equipment.map((eq, idx) => (
            <div key={idx} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Элемент {idx + 1}</span>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeEquipment(idx)}
                >
                  Удалить
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2 col-span-1">
                  <Label>Порядок</Label>
                  <Input
                    type="number"
                    value={eq.order}
                    onChange={(e) =>
                      updateEquipment(idx, "order", Number(e.target.value))
                    }
                  />
                </div>
                <div className="space-y-2 col-span-1">
                  <Label>Заголовок</Label>
                  <Input
                    value={eq.title}
                    onChange={(e) =>
                      updateEquipment(idx, "title", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Подзаголовок</Label>
                  <Input
                    value={eq.subtitle}
                    onChange={(e) =>
                      updateEquipment(idx, "subtitle", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Изображение</Label>
                <div className="flex flex-col items-start gap-3">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      onUploadEquipmentImage(idx, e.target.files?.[0])
                    }
                  />
                  {eq.image && (
                    <Image
                      src={`${BACKEND_MAIN}${eq.image}`}
                      alt="eq"
                      width={320}
                      height={180}
                      className="rounded-md border"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Сохранение..." : "Сохранить"}
        </Button>
      </CardContent>
    </Card>
  );
}
