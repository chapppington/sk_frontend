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
  data: IVacanciesPageConfig["sixthScreen"];
  onSave: (data: IVacanciesPageConfig["sixthScreen"]) => void;
  saving: boolean;
}

export function SixthScreenEditor({ data, onSave, saving }: Props) {
  const [form, setForm] = useState(data);
  const { toast } = useToast();

  const addAnswer = () => {
    setForm({
      ...form,
      answers: [...(form.answers || []), { title: "", content: "", list: [] }],
    });
  };
  const removeAnswer = (idx: number) => {
    setForm({ ...form, answers: form.answers.filter((_, i) => i !== idx) });
  };
  const updateAnswer = (
    idx: number,
    field: "title" | "content" | "list",
    value: any
  ) => {
    const next = [...form.answers];
    next[idx][field] = value;
    setForm({ ...form, answers: next });
  };
  const addListItem = (idx: number) => {
    const next = [...form.answers];
    const list = [...(next[idx].list || [])];
    list.push("");
    next[idx].list = list;
    setForm({ ...form, answers: next });
  };
  const updateListItem = (idx: number, listIdx: number, value: string) => {
    const next = [...form.answers];
    if (!next[idx].list) next[idx].list = [];
    next[idx].list![listIdx] = value;
    setForm({ ...form, answers: next });
  };
  const removeListItem = (idx: number, listIdx: number) => {
    const next = [...form.answers];
    next[idx].list = (next[idx].list || []).filter((_, i) => i !== listIdx);
    setForm({ ...form, answers: next });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Шестой экран: FAQ (вопросы и ответы)</CardTitle>
          <Button
            size="sm"
            onClick={() => {
              onSave(form);
              toast({ title: "Успех", description: "Шестой экран сохранен" });
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
            <Label>Ответы</Label>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={addAnswer}
            >
              Добавить
            </Button>
          </div>
          <div className="space-y-3">
            {form.answers?.map((v, idx) => (
              <div key={idx} className="border rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Вопрос"
                    value={v.title}
                    onChange={(e) => updateAnswer(idx, "title", e.target.value)}
                  />
                  <Input
                    placeholder="Ответ"
                    value={v.content}
                    onChange={(e) =>
                      updateAnswer(idx, "content", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Список</Label>
                  <div className="space-y-2">
                    {(v.list || []).map((item, li) => (
                      <div key={li} className="flex items-center gap-2">
                        <Input
                          value={item}
                          onChange={(e) =>
                            updateListItem(idx, li, e.target.value)
                          }
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeListItem(idx, li)}
                        >
                          Удалить
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => addListItem(idx)}
                    >
                      Добавить пункт
                    </Button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeAnswer(idx)}
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
