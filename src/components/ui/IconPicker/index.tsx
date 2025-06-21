"use client";

import { useState } from "react";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import IconRenderer, { getAvailableIcons } from "@/shared/utils/iconRenderer";

// Создаем массив всех доступных иконок Lucide
const iconNames = getAvailableIcons();

interface IconPickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function IconPicker({
  value,
  onChange,
  placeholder = "Выберите иконку",
}: IconPickerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Фильтруем иконки по поисковому запросу
  const filteredIcons = iconNames.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex gap-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex-1 justify-between"
            type="button"
          >
            <div className="flex items-center gap-2">
              {value ? (
                <>
                  <IconRenderer iconName={value} className="w-4 h-4" />
                  <span>{value}</span>
                </>
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-80 p-0"
          align="start"
          onWheel={(e) => {
            e.stopPropagation();
            const container = e.currentTarget;
            const delta = e.deltaY;
            container.scrollTop += delta;
          }}
          onTouchMove={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск иконок..."
                value={searchTerm}
                onChange={(e) => {
                  e.stopPropagation();
                  setSearchTerm(e.target.value);
                }}
                onKeyDown={(e) => {
                  e.stopPropagation();
                }}
                className="pl-8"
              />
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto p-3">
            <div className="grid grid-cols-6 gap-2">
              {filteredIcons.slice(0, 120).map((iconName) => (
                <Button
                  key={iconName}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-12 w-12 p-0 flex items-center justify-center",
                    value === iconName && "bg-primary text-primary-foreground"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(iconName);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                  }}
                  title={iconName}
                >
                  <IconRenderer iconName={iconName} className="w-5 h-5" />
                </Button>
              ))}
            </div>
            {filteredIcons.length === 0 && (
              <div className="text-center py-4 text-muted-foreground">
                Иконки не найдены
              </div>
            )}
          </div>
          {value && (
            <div className="p-3 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange("");
                  setIsOpen(false);
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
                className="w-full"
              >
                <X className="w-4 h-4 mr-2" />
                Очистить выбор
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
      {value && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange("")}
          className="shrink-0 whitespace-nowrap"
          title="Убрать иконку"
        >
          Убрать иконку
        </Button>
      )}
    </div>
  );
}
