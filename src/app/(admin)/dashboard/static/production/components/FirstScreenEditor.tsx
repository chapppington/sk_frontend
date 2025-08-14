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
import { Textarea } from "@/components/ui/shadcn/textarea";
import { Switch } from "@/components/ui/shadcn/switch";
import { useToast } from "@/hooks/use-toast";
import productionPageConfigService from "@/services/production-page-config.service";
import Image from "next/image";
import { UPLOADS_URL } from "@/constants";
import ImageCropperDialog from "./ImageCropperDialog";

type FirstScreenData = {
  bg_image: string;
  title: string;
  subtitle: string;
  button_text: string;
  button_href: string;
  stats: Array<{
    value: string;
    description: string;
    showOnMobile: boolean;
  }>;
};

interface FirstScreenEditorProps {
  data: FirstScreenData;
  onSave: (data: FirstScreenData) => void;
  saving: boolean;
}

export function FirstScreenEditor({
  data,
  onSave,
  saving,
}: FirstScreenEditorProps) {
  const [form, setForm] = useState<FirstScreenData>(data);
  const { toast } = useToast();
  const [cropperOpen, setCropperOpen] = useState(false);
  const [cropperSrc, setCropperSrc] = useState<string>("");

  const handleSave = () => {
    onSave(form);
    toast({ title: "Успех", description: "Первый экран сохранен" });
  };

  const updateStat = (
    index: number,
    field: keyof (typeof form.stats)[0],
    value: any
  ) => {
    const newStats = [...form.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setForm({ ...form, stats: newStats });
  };

  const addStat = () => {
    setForm({
      ...form,
      stats: [
        ...form.stats,
        { value: "", description: "", showOnMobile: true },
      ],
    });
  };

  const removeStat = (index: number) => {
    setForm({ ...form, stats: form.stats.filter((_, i) => i !== index) });
  };

  const onUploadBg = async (file?: File | null) => {
    if (!file) return;
    setCropperSrc(URL.createObjectURL(file));
    setCropperOpen(true);
  };

  const handleCropped = async (croppedFile: File) => {
    const fd = new FormData();
    fd.append("firstScreen.bg_image", croppedFile);
    const { data } = await productionPageConfigService.upload(fd);
    const filename = data["firstScreen.bg_image"] as string;
    const bgPath = `/uploads/production-page/${filename}`;
    const updatedForm = { ...form, bg_image: bgPath };
    setForm(updatedForm);
    onSave(updatedForm);
    toast({ title: "Успех", description: "Фон первого экрана сохранен" });
    if (cropperSrc) URL.revokeObjectURL(cropperSrc);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Первый экран</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Фон</Label>
          <div className="flex flex-col items-start gap-3">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => onUploadBg(e.target.files?.[0])}
            />
            {form.bg_image && (
              <div className="relative aspect-[16/9] w-[320px]">
                <Image
                  src={`${UPLOADS_URL}${form.bg_image}`}
                  alt="bg"
                  fill
                  className="object-cover rounded-md border"
                />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Заголовок</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Введите заголовок"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subtitle">Подзаголовок</Label>
          <Textarea
            id="subtitle"
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            placeholder="Введите подзаголовок"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="button_text">Текст кнопки</Label>
            <Input
              id="button_text"
              value={form.button_text}
              onChange={(e) =>
                setForm({ ...form, button_text: e.target.value })
              }
              placeholder="Введите текст кнопки"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="button_href">Ссылка кнопки</Label>
            <Input
              id="button_href"
              value={form.button_href}
              onChange={(e) =>
                setForm({ ...form, button_href: e.target.value })
              }
              placeholder="/contacts"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Большие числа</Label>
            <Button type="button" variant="outline" size="sm" onClick={addStat}>
              Добавить число
            </Button>
          </div>

          {form.stats.map((stat, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Число {index + 1}</span>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeStat(index)}
                >
                  Удалить
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Значение</Label>
                  <Input
                    value={stat.value}
                    onChange={(e) => updateStat(index, "value", e.target.value)}
                    placeholder="20+"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Описание</Label>
                  <Input
                    value={stat.description}
                    onChange={(e) =>
                      updateStat(index, "description", e.target.value)
                    }
                    placeholder="лет на рынке"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id={`showOnMobile-${index}`}
                  checked={stat.showOnMobile}
                  onCheckedChange={(checked) =>
                    updateStat(index, "showOnMobile", checked)
                  }
                />
                <Label htmlFor={`showOnMobile-${index}`}>
                  Показывать на мобильных
                </Label>
              </div>
            </div>
          ))}
        </div>

        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Сохранение..." : "Сохранить"}
        </Button>
        <ImageCropperDialog
          open={cropperOpen}
          onOpenChange={setCropperOpen}
          imageSrc={cropperSrc}
          aspect={1920 / 1080}
          outputWidth={1920}
          outputHeight={1080}
          filename="first-screen-bg.jpg"
          mimeType="image/jpeg"
          onCropped={handleCropped}
        />
      </CardContent>
    </Card>
  );
}
