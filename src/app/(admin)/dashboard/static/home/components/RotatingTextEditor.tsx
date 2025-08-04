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
import { useToast } from "@/hooks/use-toast";

interface RotatingTextEditorProps {
  text: string;
  onSave: (text: string) => void;
  saving: boolean;
}

export function RotatingTextEditor({
  text,
  onSave,
  saving,
}: RotatingTextEditorProps) {
  const [value, setValue] = useState(text);
  const { toast } = useToast();

  const handleSave = () => {
    onSave(value);
    toast({
      title: "Успех",
      description: "Вращающийся текст успешно сохранен",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Вращающийся текст</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="rotatingText">Текст</Label>
          <Input
            id="rotatingText"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Введите вращающийся текст"
          />
          <p className="text-sm text-muted-foreground">
            Введите одну фразу. Она автоматически продублируется 3 раза на сайте
            для создания эффекта бесконечной прокрутки.
          </p>
        </div>

        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Сохранение..." : "Сохранить"}
        </Button>
      </CardContent>
    </Card>
  );
}
