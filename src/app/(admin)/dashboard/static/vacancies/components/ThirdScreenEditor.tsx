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
import { useToast } from "@/hooks/use-toast";

interface Props {
  data: IVacanciesPageConfig["thirdScreen"];
  onSave: (data: IVacanciesPageConfig["thirdScreen"]) => void;
  saving: boolean;
}

export function ThirdScreenEditor({ data, onSave, saving }: Props) {
  const [form, setForm] = useState(data);
  const { toast } = useToast();

  const addValue = () => {
    setForm({
      ...form,
      values: [
        ...(form.values || []),
        { title: "", subtitle: "", icon_path: "" },
      ],
    });
  };
  const removeValue = (idx: number) => {
    setForm({ ...form, values: form.values.filter((_, i) => i !== idx) });
  };
  const updateValue = (
    idx: number,
    field: "title" | "subtitle" | "icon_path",
    value: any
  ) => {
    const next = [...form.values];

    next[idx][field] = value;
    setForm({ ...form, values: next });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Третий экран: ценности (тексты)</CardTitle>
          <Button
            size="sm"
            onClick={() => {
              onSave(form);
              toast({ title: "Успех", description: "Третий экран сохранен" });
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
            <Label>Ценности</Label>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={addValue}
            >
              Добавить
            </Button>
          </div>
          <div className="space-y-3">
            {form.values?.map((v, idx) => (
              <div key={idx} className="border rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label>Заголовок</Label>
                    <Input
                      value={v.title}
                      onChange={(e) =>
                        updateValue(idx, "title", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Подзаголовок</Label>
                    <Input
                      value={v.subtitle}
                      onChange={(e) =>
                        updateValue(idx, "subtitle", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeValue(idx)}
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
