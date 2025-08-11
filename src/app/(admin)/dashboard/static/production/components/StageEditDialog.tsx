"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/shadcn/dialog";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { Textarea } from "@/components/ui/shadcn/textarea";
import Image from "next/image";
import { BACKEND_MAIN } from "@/constants";
import ImageCropperDialog from "./ImageCropperDialog";
import productionPageConfigService from "@/services/production-page-config.service";

type Stage = {
  id: number;
  number: string;
  title: string;
  description: string;
  image: string;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stage: Stage;
  index: number;
  onSave: (updated: Stage) => void;
  onCroppedSave: (index: number, imagePath: string) => void;
  isCreate?: boolean;
  onCroppedDraft?: (imagePath: string) => void;
};

export default function StageEditDialog({
  open,
  onOpenChange,
  stage,
  index,
  onSave,
  onCroppedSave,
  isCreate = false,
  onCroppedDraft,
}: Props) {
  const [form, setForm] = useState<Stage>(stage);
  const [cropperOpen, setCropperOpen] = useState(false);
  const [cropperSrc, setCropperSrc] = useState<string>("");

  const handleFileChange = (file?: File | null) => {
    if (!file) return;
    setCropperSrc(URL.createObjectURL(file));
    setCropperOpen(true);
  };

  const handleCropped = async (croppedFile: File) => {
    const key = `secondScreen.stages[${index}].image`;
    const fd = new FormData();
    fd.append(key, croppedFile);
    const { data } = await productionPageConfigService.upload(fd);
    const filename = data[key] as string;
    const imagePath = `/uploads/production-page/${filename}`;
    setForm((prev) => ({ ...prev, image: imagePath }));
    if (isCreate && onCroppedDraft) {
      onCroppedDraft(imagePath);
    } else {
      onCroppedSave(index, imagePath);
    }
    if (cropperSrc) URL.revokeObjectURL(cropperSrc);
  };

  const handleSubmit = () => {
    onSave(form);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {isCreate ? "Создать этап" : `Редактировать этап ${form.number}`}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Номер</Label>
              <Input
                value={form.number}
                onChange={(e) => setForm({ ...form, number: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Заголовок</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Описание</Label>
            <Textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Изображение</Label>
            <div className="flex flex-col items-start gap-3">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e.target.files?.[0])}
              />
              {form.image && (
                <Image
                  src={`${BACKEND_MAIN}${form.image}`}
                  alt="stage"
                  width={320}
                  height={430}
                  className="rounded-md border"
                />
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button onClick={handleSubmit}>
            {isCreate ? "Создать" : "Сохранить"}
          </Button>
        </DialogFooter>

        <ImageCropperDialog
          open={cropperOpen}
          onOpenChange={setCropperOpen}
          imageSrc={cropperSrc}
          aspect={320 / 430}
          outputWidth={320}
          outputHeight={430}
          filename={`stage-${index}.jpg`}
          mimeType="image/jpeg"
          onCropped={handleCropped}
        />
      </DialogContent>
    </Dialog>
  );
}
