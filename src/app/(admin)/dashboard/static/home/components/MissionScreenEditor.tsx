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
import { useToast } from "@/hooks/use-toast";

interface MissionScreenData {
  mission_title: string;
  mission_text: string;
  button_text: string;
}

interface MissionScreenEditorProps {
  data: MissionScreenData;
  onSave: (data: MissionScreenData) => void;
  saving: boolean;
}

export function MissionScreenEditor({
  data,
  onSave,
  saving,
}: MissionScreenEditorProps) {
  const [form, setForm] = useState<MissionScreenData>(data);
  const { toast } = useToast();

  const handleSave = () => {
    onSave(form);
    toast({
      title: "Успех",
      description: "Экран миссии успешно сохранен",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Экран миссии</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="mission_title">Заголовок миссии</Label>
          <Input
            id="mission_title"
            value={form.mission_title}
            onChange={(e) =>
              setForm({ ...form, mission_title: e.target.value })
            }
            placeholder="Введите заголовок миссии"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mission_text">Текст миссии</Label>
          <Textarea
            id="mission_text"
            value={form.mission_text}
            onChange={(e) => setForm({ ...form, mission_text: e.target.value })}
            placeholder="Введите текст миссии"
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="button_text">Текст кнопки</Label>
          <Input
            id="button_text"
            value={form.button_text}
            onChange={(e) => setForm({ ...form, button_text: e.target.value })}
            placeholder="Введите текст кнопки"
          />
        </div>

        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Сохранение..." : "Сохранить"}
        </Button>
      </CardContent>
    </Card>
  );
}
