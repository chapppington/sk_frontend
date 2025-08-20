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
  data: IVacanciesPageConfig["secondScreen"];
  onSave: (data: IVacanciesPageConfig["secondScreen"]) => void;
  saving: boolean;
}

export function SecondScreenEditor({ data, onSave, saving }: Props) {
  const [form, setForm] = useState(data);
  const { toast } = useToast();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Второй экран: заголовок и подзаголовок</CardTitle>
          <Button
            size="sm"
            onClick={() => {
              onSave(form);
              toast({ title: "Успех", description: "Второй экран сохранен" });
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
      </CardContent>
    </Card>
  );
}
