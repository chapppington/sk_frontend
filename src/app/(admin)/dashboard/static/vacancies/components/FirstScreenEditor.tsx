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
import { IVacanciesPageConfig } from "@/shared/types/vacancies-page-config.types";
import vacanciesPageConfigService from "@/services/vacancies-page-config.service";
import { useToast } from "@/hooks/use-toast";
import ImageCropperDialog from "@/app/(admin)/dashboard/static/production/components/ImageCropperDialog";

interface Props {
  data: IVacanciesPageConfig["firstScreen"];
  onSave: (data: IVacanciesPageConfig["firstScreen"]) => void;
  saving: boolean;
}

export function FirstScreenEditor({ data, onSave, saving }: Props) {
  const [form, setForm] = useState(data);
  const { toast } = useToast();

  const [cropperOpen, setCropperOpen] = useState(false);
  const [cropperImage, setCropperImage] = useState<string>("");
  const [outputWidth] = useState<number>(1600);
  const [outputHeight] = useState<number>(900);

  const onUploadBg = async (file?: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCropperImage(url);
    setCropperOpen(true);
  };

  const handleCropped = async (croppedFile: File) => {
    const key = `firstScreen.bg_image`;
    const fd = new FormData();
    fd.append(key, croppedFile);
    try {
      const { data } = await vacanciesPageConfigService.upload(fd);
      const filename = data[key] as string;
      setForm({ ...form, bg_image: `/uploads/vacancies-page/${filename}` });
      toast({ title: "Успех", description: "Фон обрезан и загружен" });
    } catch (e) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить фон",
        variant: "destructive",
      });
    } finally {
      if (cropperImage) URL.revokeObjectURL(cropperImage);
    }
  };

  const addStat = () => {
    setForm({
      ...form,
      stats: [
        ...(form.stats || []),
        { value: "", description: "", showOnMobile: true },
      ],
    });
  };
  const removeStat = (idx: number) => {
    setForm({ ...form, stats: form.stats.filter((_, i) => i !== idx) });
  };
  const updateStat = (
    idx: number,
    field: "value" | "description" | "showOnMobile",
    value: any
  ) => {
    const next = [...form.stats];
    // @ts-expect-error narrow
    next[idx][field] = value;
    setForm({ ...form, stats: next });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Первый экран: фон, заголовок, статистика</CardTitle>
          <Button
            size="sm"
            onClick={() => {
              onSave(form);
              toast({ title: "Успех", description: "Первый экран сохранен" });
            }}
            disabled={saving}
          >
            {saving ? "Сохранение..." : "Сохранить"}
          </Button>
        </div>
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

        <div className="space-y-2">
          <Label>Фоновое изображение (обрезка 16:9)</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => onUploadBg(e.target.files?.[0])}
          />
          {form.bg_image && (
            <div className="flex items-center gap-3">
              <div className="text-xs text-muted-foreground shrink-0">
                Текущий фон:
              </div>
              <div className="relative bg-gray-100 rounded-md overflow-hidden w-[400px]">
                <div className="relative w-full pt-[56.25%]">
                  {/* 16:9, 400x225 */}
                  <Image
                    src={`${BACKEND_MAIN}${form.bg_image}`}
                    alt="bg"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Статистика</Label>
            <Button type="button" size="sm" variant="outline" onClick={addStat}>
              Добавить
            </Button>
          </div>
          <div className="space-y-3">
            {form.stats?.map((s, idx) => (
              <div key={idx} className="grid grid-cols-6 gap-3 items-center">
                <Input
                  className="col-span-1"
                  placeholder="Значение"
                  value={s.value}
                  onChange={(e) => updateStat(idx, "value", e.target.value)}
                />
                <Input
                  className="col-span-4"
                  placeholder="Описание"
                  value={s.description}
                  onChange={(e) =>
                    updateStat(idx, "description", e.target.value)
                  }
                />
                <div className="col-span-1 flex items-center gap-2">
                  <Label className="text-xs">Моб.</Label>
                  <input
                    type="checkbox"
                    checked={!!s.showOnMobile}
                    onChange={(e) =>
                      updateStat(idx, "showOnMobile", e.target.checked)
                    }
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeStat(idx)}
                  >
                    Удалить
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <ImageCropperDialog
        open={cropperOpen}
        onOpenChange={setCropperOpen}
        imageSrc={cropperImage}
        aspect={outputWidth / outputHeight}
        outputWidth={outputWidth}
        outputHeight={outputHeight}
        filename={`vacancies_bg_${Date.now()}.jpg`}
        mimeType="image/jpeg"
        onCropped={handleCropped}
      />
    </Card>
  );
}
