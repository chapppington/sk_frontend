"use client";

import { useState } from "react";
import { DepartmentCard } from "./DepartmentCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shadcn/dialog";
import { DepartmentForm } from "./DepartmentForm";
import { Button } from "@/components/ui/shadcn/button";
import { formatPhoneNumber } from "@/shared/utils/formatPhoneNumber";

interface DepartmentItem {
  name: string;
  phone: string;
  email: string;
}

interface DepartmentListWithActionsProps {
  items: DepartmentItem[];
  onChange: (items: DepartmentItem[]) => void;
}

export function DepartmentListWithActions({
  items,
  onChange,
}: DepartmentListWithActionsProps) {
  const [deletePopoverOpen, setDeletePopoverOpen] = useState<number | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<DepartmentItem>({
    name: "",
    phone: "",
    email: "",
  });

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

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Нет добавленных отделов</p>
        <p className="text-sm">
          Нажмите "Добавить отдел" чтобы создать первый отдел
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item, index) => (
          <DepartmentCard
            key={index}
            item={item}
            index={index}
            onEdit={() => handleEdit(index)}
            onDelete={() => handleDelete(index)}
            deletePopoverOpen={deletePopoverOpen === index}
            onDeletePopoverChange={(open) =>
              setDeletePopoverOpen(open ? index : null)
            }
          />
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Редактировать отдел</DialogTitle>
          </DialogHeader>
          <DepartmentForm data={formData} onChange={setFormData} />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleCancel}>
              Отмена
            </Button>
            <Button
              onClick={handleSave}
              disabled={!formData.name || !formData.email}
            >
              Сохранить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
