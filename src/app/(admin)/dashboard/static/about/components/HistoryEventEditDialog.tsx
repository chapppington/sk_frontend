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
import { Switch } from "@/components/ui/shadcn/switch";
import { useToast } from "@/hooks/use-toast";

type HistoryEvent = {
  id: number;
  number: string; // period label, e.g. "2007–2009"
  title: string; // short caption
  employees: number; // headcount for the period
  employeesHasPlus: boolean; // show plus sign after number
  areaM2: number; // production area in square meters
  order: number;
};

interface HistoryEventEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: HistoryEvent;
  index: number;
  onSave: (event: HistoryEvent) => void;
  isCreate?: boolean;
}

export default function HistoryEventEditDialog({
  open,
  onOpenChange,
  event,
  index,
  onSave,
  isCreate = false,
}: HistoryEventEditDialogProps) {
  const [form, setForm] = useState<HistoryEvent>(event);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setForm(event);
  }, [event]);

  const handleSave = () => {
    if (!form.number.trim()) {
      toast({
        title: "Ошибка",
        description: "Период обязателен",
        variant: "destructive",
      });
      return;
    }

    if (!form.title.trim()) {
      toast({
        title: "Ошибка",
        description: "Описание события обязательно",
        variant: "destructive",
      });
      return;
    }

    if (form.employees < 0) {
      toast({
        title: "Ошибка",
        description: "Количество сотрудников не может быть отрицательным",
        variant: "destructive",
      });
      return;
    }

    if (form.areaM2 < 0) {
      toast({
        title: "Ошибка",
        description: "Площадь не может быть отрицательной",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      onSave(form);
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving history event:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isCreate ? "Добавить событие истории" : `Редактировать событие истории`}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="number">Период</Label>
              <Input
                id="number"
                value={form.number}
                onChange={(e) => setForm({ ...form, number: e.target.value })}
                placeholder="2007–2009"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employees">Количество сотрудников</Label>
              <Input
                id="employees"
                type="number"
                min="0"
                value={form.employees}
                onChange={(e) => setForm({ ...form, employees: parseInt(e.target.value) || 0 })}
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="areaM2">Площадь (м²)</Label>
              <Input
                id="areaM2"
                type="number"
                min="0"
                value={form.areaM2}
                onChange={(e) => setForm({ ...form, areaM2: parseInt(e.target.value) || 0 })}
                placeholder="0"
              />
            </div>
            <div className="flex items-center space-x-2 mt-6">
              <Switch
                id="employeesHasPlus"
                checked={form.employeesHasPlus}
                onCheckedChange={(checked) =>
                  setForm({ ...form, employeesHasPlus: checked })
                }
              />
              <Label htmlFor="employeesHasPlus">
                Показывать "+" после количества сотрудников
              </Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Описание события</Label>
            <Textarea
              id="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Переход в энергетическую отрасль, первый государственный заказ"
              rows={3}
            />
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
  );
}

