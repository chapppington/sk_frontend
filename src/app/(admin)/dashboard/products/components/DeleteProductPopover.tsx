"use client";

import { Button } from "@/components/ui/shadcn/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import { Trash2 } from "lucide-react";

interface DeleteProductPopoverProps {
  productId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (id: string) => void;
  isPending: boolean;
}

export default function DeleteProductPopover({
  productId,
  isOpen,
  onOpenChange,
  onDelete,
  isPending,
}: DeleteProductPopoverProps) {
  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isPending}>
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <p className="text-sm">Вы уверены, что хотите удалить этот товар?</p>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              Отмена
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(productId)}
              disabled={isPending}
            >
              {isPending ? "Удаление..." : "Удалить"}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
