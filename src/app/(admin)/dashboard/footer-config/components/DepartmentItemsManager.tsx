"use client";

import { useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shadcn/dialog";
import { Plus } from "lucide-react";
import { DepartmentForm } from "./DepartmentForm";

interface DepartmentItem {
  name: string;
  phone: string;
  email: string;
}

interface DepartmentItemsManagerProps {
  items: DepartmentItem[];
  onChange: (items: DepartmentItem[]) => void;
}

export function DepartmentItemsManager({
  items,
  onChange,
}: DepartmentItemsManagerProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<DepartmentItem>({
    name: "",
    phone: "",
    email: "",
  });

  const handleAdd = () => {
    setEditingIndex(null);
    setFormData({ name: "", phone: "", email: "" });
    setDialogOpen(true);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setFormData(items[index]);
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (formData.name && formData.email) {
      if (editingIndex !== null) {
        // Editing existing item
        const updatedItems = [...items];
        updatedItems[editingIndex] = formData;
        onChange(updatedItems);
      } else {
        // Adding new item
        onChange([...items, formData]);
      }
      setDialogOpen(false);
      setEditingIndex(null);
      setFormData({ name: "", phone: "", email: "" });
    }
  };

  const handleDelete = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    onChange(updatedItems);
  };

  const handleCancel = () => {
    setDialogOpen(false);
    setEditingIndex(null);
    setFormData({ name: "", phone: "", email: "" });
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Добавить отдел
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingIndex !== null ? "Редактировать отдел" : "Добавить отдел"}
            </DialogTitle>
          </DialogHeader>
          <DepartmentForm
            data={formData}
            onChange={setFormData}
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleCancel}>
              Отмена
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!formData.name || !formData.email}
            >
              {editingIndex !== null ? "Сохранить" : "Добавить"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

