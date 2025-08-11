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
import productionPageConfigService from "@/services/production-page-config.service";
import { useToast } from "@/hooks/use-toast";

type DocumentItem = { title: string; link: string };
type FourthItem = { title: string; content: string; documents: DocumentItem[] };

type FourthScreenData = { items: FourthItem[] };

interface Props {
  data: FourthScreenData;
  onSave: (data: FourthScreenData) => void;
  saving: boolean;
}

export function FourthScreenEditor({ data, onSave, saving }: Props) {
  const [form, setForm] = useState<FourthScreenData>(data);
  const { toast } = useToast();

  const handleSave = () => {
    onSave(form);
    toast({ title: "Успех", description: "Четвертый экран сохранен" });
  };

  const addItem = () =>
    setForm({
      ...form,
      items: [...form.items, { title: "", content: "", documents: [] }],
    });
  const removeItem = (index: number) =>
    setForm({ ...form, items: form.items.filter((_, i) => i !== index) });

  const updateItem = (index: number, field: keyof FourthItem, value: any) => {
    const items = [...form.items];
    items[index] = { ...items[index], [field]: value };
    setForm({ ...form, items });
  };

  const addDoc = (itemIdx: number) => {
    const items = [...form.items];
    items[itemIdx].documents.push({ title: "", link: "" });
    setForm({ ...form, items });
  };

  const removeDoc = (itemIdx: number, docIdx: number) => {
    const items = [...form.items];
    items[itemIdx].documents = items[itemIdx].documents.filter(
      (_, i) => i !== docIdx
    );
    setForm({ ...form, items });
  };

  const updateDoc = (
    itemIdx: number,
    docIdx: number,
    field: keyof DocumentItem,
    value: any
  ) => {
    const items = [...form.items];
    items[itemIdx].documents[docIdx] = {
      ...items[itemIdx].documents[docIdx],
      [field]: value,
    };
    setForm({ ...form, items });
  };

  const onUploadDoc = async (
    itemIdx: number,
    docIdx: number,
    file?: File | null
  ) => {
    if (!file) return;
    const key = `fourthScreen.items[${itemIdx}].documents[${docIdx}].link`;
    const fd = new FormData();
    fd.append(key, file);
    const { data } = await productionPageConfigService.upload(fd);
    const filename = data[key] as string;
    updateDoc(itemIdx, docIdx, "link", `/uploads/production-page/${filename}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Четвертый экран: документы</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label>Разделы</Label>
          <Button type="button" variant="outline" size="sm" onClick={addItem}>
            Добавить раздел
          </Button>
        </div>

        <div className="space-y-6">
          {form.items.map((item, idx) => (
            <div key={idx} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Раздел {idx + 1}</span>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeItem(idx)}
                >
                  Удалить
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Заголовок</Label>
                  <Input
                    value={item.title}
                    onChange={(e) => updateItem(idx, "title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Текст</Label>
                  <Textarea
                    value={item.content}
                    onChange={(e) => updateItem(idx, "content", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Документы</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addDoc(idx)}
                  >
                    Добавить документ
                  </Button>
                </div>

                <div className="space-y-3">
                  {item.documents.map((doc, dIdx) => (
                    <div
                      key={dIdx}
                      className="grid grid-cols-3 gap-3 items-center"
                    >
                      <Input
                        value={doc.title}
                        onChange={(e) =>
                          updateDoc(idx, dIdx, "title", e.target.value)
                        }
                        placeholder="Название документа"
                      />
                      <div className="col-span-2 flex items-center gap-3">
                        <Input
                          type="file"
                          onChange={(e) =>
                            onUploadDoc(idx, dIdx, e.target.files?.[0])
                          }
                        />
                        {doc.link && (
                          <a
                            href={doc.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm underline"
                          >
                            Открыть
                          </a>
                        )}
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeDoc(idx, dIdx)}
                        >
                          Удалить
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Сохранение..." : "Сохранить"}
        </Button>
      </CardContent>
    </Card>
  );
}
