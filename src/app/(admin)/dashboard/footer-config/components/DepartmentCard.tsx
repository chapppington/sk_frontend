"use client";

import { Button } from "@/components/ui/shadcn/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import { Edit, Trash2, Phone, Mail } from "lucide-react";

interface DepartmentItem {
  name: string;
  phone: string;
  email: string;
}

interface DepartmentCardProps {
  item: DepartmentItem;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
  deletePopoverOpen: boolean;
  onDeletePopoverChange: (open: boolean) => void;
}

export function DepartmentCard({
  item,
  index,
  onEdit,
  onDelete,
  deletePopoverOpen,
  onDeletePopoverChange,
}: DepartmentCardProps) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            {index + 1}.
          </span>
          <h6 className="text-sm font-medium truncate">{item.name}</h6>
        </div>
        <div className="mt-1 flex gap-4 text-sm text-muted-foreground">
          {item.phone && (
            <span className="flex items-center gap-1 truncate">
              <Phone className="w-3 h-3" />
              {item.phone}
            </span>
          )}
          <span className="flex items-center gap-1 truncate">
            <Mail className="w-3 h-3" />
            {item.email}
          </span>
        </div>
      </div>
      <div className="flex gap-1 ml-2 flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="h-7 w-7 p-0"
        >
          <Edit className="w-3.5 h-3.5" />
        </Button>
        <Popover open={deletePopoverOpen} onOpenChange={onDeletePopoverChange}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-red-500 hover:text-red-600"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <p className="text-sm">
                Вы уверены, что хотите удалить отдел "{item.name}"?
              </p>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDeletePopoverChange(false)}
                >
                  Отмена
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    onDelete();
                    onDeletePopoverChange(false);
                  }}
                >
                  Удалить
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
