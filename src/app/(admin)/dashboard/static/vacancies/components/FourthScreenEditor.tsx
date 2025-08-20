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
import IconPicker from "@/components/ui/IconPicker";
import { useToast } from "@/hooks/use-toast";

interface Props {
  data: IVacanciesPageConfig["fourthScreen"];
  onSave: (data: IVacanciesPageConfig["fourthScreen"]) => void;
  saving: boolean;
}

export function FourthScreenEditor({ data, onSave, saving }: Props) {
  const [form, setForm] = useState(data);
  const { toast } = useToast();

  const addAdvantage = () => {
    setForm({
      ...form,
      advantages: [...(form.advantages || []), { icon: "", text: "" }],
    });
  };
  const removeAdvantage = (idx: number) => {
    setForm({
      ...form,
      advantages: form.advantages.filter((_, i) => i !== idx),
    });
  };
  const updateAdvantage = (idx: number, field: "icon" | "text", value: any) => {
    const next = [...form.advantages];
    next[idx][field] = value;
    setForm({ ...form, advantages: next });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Четвертый экран: преимущества (иконки + тексты)</CardTitle>
          <Button
            size="sm"
            onClick={() => {
              onSave(form);
              toast({
                title: "Успех",
                description: "Четвертый экран сохранен",
              });
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
          <Label>Иконка подзаголовка</Label>
          <IconPicker
            value={form.subtitle_icon}
            onChange={(name) => setForm({ ...form, subtitle_icon: name })}
            placeholder="Выберите иконку"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Преимущества</Label>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={addAdvantage}
            >
              Добавить
            </Button>
          </div>
          <div className="space-y-3">
            {form.advantages?.map((v, idx) => (
              <div key={idx} className="border rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-3 gap-3 items-center">
                  <Input
                    className="col-span-2"
                    placeholder="Текст"
                    value={v.text}
                    onChange={(e) =>
                      updateAdvantage(idx, "text", e.target.value)
                    }
                  />
                  <div className="space-y-2">
                    <Label>Иконка</Label>
                    <IconPicker
                      value={v.icon}
                      onChange={(name) => updateAdvantage(idx, "icon", name)}
                      placeholder="Выберите иконку"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeAdvantage(idx)}
                  >
                    Удалить
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
