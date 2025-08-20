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
import { IVacanciesPageConfig } from "@/shared/types/vacancies-page-config.types";
import vacanciesPageConfigService from "@/services/vacancies-page-config.service";
import Image from "next/image";
import { UPLOADS_URL } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import ImageCropperDialog from "@/app/(admin)/dashboard/static/production/components/ImageCropperDialog";

interface Props {
  data: IVacanciesPageConfig["fifthScreen"];
  onSave: (data: IVacanciesPageConfig["fifthScreen"]) => void;
  saving: boolean;
}

export function FifthScreenEditor({ data, onSave, saving }: Props) {
  const [form, setForm] = useState(data);
  const { toast } = useToast();

  // Кроппер для фото отзыва
  const [cropperOpen, setCropperOpen] = useState(false);
  const [cropperImage, setCropperImage] = useState<string>("");
  const [croppingIndex, setCroppingIndex] = useState<number | null>(null);
  const outputWidth = 400;
  const outputHeight = 400;

  const addReview = () => {
    setForm({
      ...form,
      reviews: [
        ...(form.reviews || []),
        { name: "", position: "", image: "", text: "", shortText: "" },
      ],
    });
  };
  const removeReview = (idx: number) => {
    setForm({ ...form, reviews: form.reviews.filter((_, i) => i !== idx) });
  };
  const updateReview = (
    idx: number,
    field: keyof (typeof form.reviews)[number],
    value: any
  ) => {
    const next = [...form.reviews];
    next[idx][field] = value;
    setForm({ ...form, reviews: next });
  };

  const onSelectImage = (idx: number, file?: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCroppingIndex(idx);
    setCropperImage(url);
    setCropperOpen(true);
  };

  const handleCropped = async (croppedFile: File) => {
    if (croppingIndex === null) return;
    const key = `fifthScreen.reviews[${croppingIndex}].image`;
    const fd = new FormData();
    fd.append(key, croppedFile);
    try {
      const { data } = await vacanciesPageConfigService.upload(fd);
      const filename = data[key] as string;
      updateReview(
        croppingIndex,
        "image",
        `/uploads/vacancies-page/${filename}`
      );
      toast({ title: "Успех", description: "Фото обрезано и загружено" });
    } catch (e) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить фото",
        variant: "destructive",
      });
    } finally {
      if (cropperImage) URL.revokeObjectURL(cropperImage);
      setCropperOpen(false);
      setCroppingIndex(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items_center justify-between">
          <CardTitle>Пятый экран: отзывы сотрудников</CardTitle>
          <Button
            size="sm"
            onClick={() => {
              onSave(form);
              toast({ title: "Успех", description: "Пятый экран сохранен" });
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
          <div className="flex items-center justify-between">
            <Label>Отзывы</Label>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={addReview}
            >
              Добавить
            </Button>
          </div>
          <div className="space-y-3">
            {form.reviews?.map((v, idx) => (
              <div key={idx} className="border rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-5 gap-3 items-center">
                  <div className="col-span-1 space-y-1">
                    <Label>Имя</Label>
                    <Input
                      value={v.name}
                      onChange={(e) =>
                        updateReview(idx, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-1 space-y-1">
                    <Label>Должность</Label>
                    <Input
                      value={v.position}
                      onChange={(e) =>
                        updateReview(idx, "position", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-3 space-y-1">
                    <Label>Короткий текст</Label>
                    <Input
                      value={v.shortText}
                      onChange={(e) =>
                        updateReview(idx, "shortText", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>Полный текст</Label>
                  <Input
                    value={v.text}
                    onChange={(e) => updateReview(idx, "text", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Фото</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onSelectImage(idx, e.target.files?.[0])}
                  />
                  {v.image && (
                    <div className="relative w-24 h-24 bg-gray-100 rounded overflow-hidden">
                      <Image
                        src={`${UPLOADS_URL}${v.image}`}
                        alt="photo"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeReview(idx)}
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
        aspect={1}
        outputWidth={outputWidth}
        outputHeight={outputHeight}
        filename={`vacancy_review_${Date.now()}.jpg`}
        mimeType="image/jpeg"
        onCropped={handleCropped}
      />
    </Card>
  );
}
