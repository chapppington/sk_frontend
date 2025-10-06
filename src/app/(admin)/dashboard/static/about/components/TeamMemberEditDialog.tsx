"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shadcn/dialog";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import { Label } from "@/components/ui/shadcn/label";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { useToast } from "@/hooks/use-toast";
import aboutPageConfigService from "@/services/about-page-config.service";
import Image from "next/image";
import { UPLOADS_URL } from "@/constants";
import ImageCropperDialog from "../../production/components/ImageCropperDialog";

type TeamMember = {
  id: number;
  name: string;
  position: string;
  image: string;
  order: number;
};

interface TeamMemberEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: TeamMember;
  index: number;
  onSave: (member: TeamMember) => void;
  isCreate?: boolean;
}

export default function TeamMemberEditDialog({
  open,
  onOpenChange,
  member,
  index,
  onSave,
  isCreate = false,
}: TeamMemberEditDialogProps) {
  const [form, setForm] = useState<TeamMember>(member);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const [cropperOpen, setCropperOpen] = useState(false);
  const [cropperSrc, setCropperSrc] = useState<string>("");

  useEffect(() => {
    setForm(member);
  }, [member]);

  const handleSave = () => {
    if (!form.name.trim()) {
      toast({
        title: "Ошибка",
        description: "Имя участника команды обязательно",
        variant: "destructive",
      });
      return;
    }

    if (!form.position.trim()) {
      toast({
        title: "Ошибка",
        description: "Должность участника команды обязательна",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      onSave(form);
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving team member:", error);
    } finally {
      setSaving(false);
    }
  };

  const onUploadImage = async (file?: File | null) => {
    if (!file) return;
    setCropperSrc(URL.createObjectURL(file));
    setCropperOpen(true);
  };

  const handleCropped = async (croppedFile: File) => {
    try {
      const fd = new FormData();
      fd.append(`teamScreen.team_members.${index}.image`, croppedFile);
      const { data } = await aboutPageConfigService.upload(fd);
      const filename = data[`teamScreen.team_members.${index}.image`] as string;
      const imagePath = `/uploads/about-page/${filename}`;
      
      setForm({ ...form, image: imagePath });
      toast({ title: "Успех", description: "Фото участника команды сохранено" });
      if (cropperSrc) URL.revokeObjectURL(cropperSrc);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить фото",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isCreate ? "Добавить участника команды" : `Редактировать участника команды`}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Фото</Label>
              <div className="flex flex-col items-start gap-3">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onUploadImage(e.target.files?.[0])}
                />
                {form.image && (
                  <div className="relative w-24 h-24 rounded-full overflow-hidden">
                    <Image
                      src={`${UPLOADS_URL}${form.image}`}
                      alt="avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Введите имя"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Должность</Label>
                <Input
                  id="position"
                  value={form.position}
                  onChange={(e) => setForm({ ...form, position: e.target.value })}
                  placeholder="Введите должность"
                />
              </div>
            </div>


            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Отмена
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Сохранение..." : isCreate ? "Добавить" : "Сохранить"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ImageCropperDialog
        open={cropperOpen}
        onOpenChange={setCropperOpen}
        imageSrc={cropperSrc}
        aspect={1}
        outputWidth={300}
        outputHeight={300}
        filename="team-member-photo.jpg"
        mimeType="image/jpeg"
        onCropped={handleCropped}
      />
    </>
  );
}

