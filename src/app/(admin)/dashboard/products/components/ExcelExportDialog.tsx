"use client";

import * as XLSX from "xlsx";
import { Button } from "@/components/ui/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shadcn/dialog";
import { useToast } from "@/hooks/use-toast";
import { FileSpreadsheet, Download, AlertCircle } from "lucide-react";
import { IProduct } from "@/shared/types/product.types";

interface ExcelExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  products: IProduct[];
  isExporting: boolean;
}

export default function ExcelExportDialog({
  isOpen,
  onClose,
  products,
  isExporting,
}: ExcelExportDialogProps) {
  const { toast } = useToast();

  const exportToExcel = () => {
    if (products.length === 0) {
      toast({
        title: "Нет данных для экспорта",
        description: "Список товаров пуст",
        variant: "destructive",
      });
      return;
    }

    // Русские заголовки для пользователя
    const headersRu = [
      "ID",
      "Категория",
      "Название товара",
      "Описание",
      // Характеристики (3)
      "Характеристика 1 - Значение",
      "Характеристика 1 - Единица измерения",
      "Характеристика 1 - Описание",
      "Характеристика 2 - Значение",
      "Характеристика 2 - Единица измерения",
      "Характеристика 2 - Описание",
      "Характеристика 3 - Значение",
      "Характеристика 3 - Единица измерения",
      "Характеристика 3 - Описание",
      // Преимущества (5)
      "Преимущество 1 - Название",
      "Преимущество 1 - Описание",
      "Преимущество 2 - Название",
      "Преимущество 2 - Описание",
      "Преимущество 3 - Название",
      "Преимущество 3 - Описание",
      "Преимущество 4 - Название",
      "Преимущество 4 - Описание",
      "Преимущество 5 - Название",
      "Преимущество 5 - Описание",
      // Простое описание (3)
      "Простое описание - Пункт 1",
      "Простое описание - Пункт 2",
      "Простое описание - Пункт 3",
      // Детальное описание (16)
      ...Array.from({ length: 16 }, (_, i) => [
        `Детальное описание - Заголовок ${i + 1}`,
        `Детальное описание - Текст ${i + 1}`,
      ]).flat(),
    ];

    // Формируем заголовки
    const headers = [
      "id",
      "category",
      "name",
      "description",
      // Характеристики (3)
      "char_1_value",
      "char_1_unit",
      "char_1_desc",
      "char_2_value",
      "char_2_unit",
      "char_2_desc",
      "char_3_value",
      "char_3_unit",
      "char_3_desc",
      // Преимущества (5)
      "adv_1_label",
      "adv_1_desc",
      "adv_2_label",
      "adv_2_desc",
      "adv_3_label",
      "adv_3_desc",
      "adv_4_label",
      "adv_4_desc",
      "adv_5_label",
      "adv_5_desc",
      // Простое описание (3)
      "simple_1",
      "simple_2",
      "simple_3",
      // Детальное описание (16)
      ...Array.from({ length: 16 }, (_, i) => [
        `detailed_${i + 1}_title`,
        `detailed_${i + 1}_desc`,
      ]).flat(),
    ];

    // Формируем строки
    const rows = products.map((product) => {
      const row: { [key: string]: string } = {
        id: product.id || "",
        category: product.category || "",
        name: product.name || "",
        description: product.description || "",
      };
      // Характеристики
      for (let i = 0; i < 3; i++) {
        const char = product.importantCharacteristics?.[i] || {};
        row[`char_${i + 1}_value`] = char.value || "";
        row[`char_${i + 1}_unit`] =
          typeof char.unit === "string" ? char.unit : char.unit?.text || "";
        row[`char_${i + 1}_desc`] = char.description || "";
      }
      // Преимущества
      for (let i = 0; i < 5; i++) {
        const adv = product.advantages?.[i] || {};
        row[`adv_${i + 1}_label`] = adv.label || "";
        row[`adv_${i + 1}_desc`] = adv.description || "";
      }
      // Простое описание
      for (let i = 0; i < 3; i++) {
        row[`simple_${i + 1}`] =
          product.simpleDescription?.items?.[i]?.text || "";
      }
      // Детальное описание (16)
      for (let i = 0; i < 16; i++) {
        row[`detailed_${i + 1}_title`] =
          product.detailedDescription?.items?.[i]?.title || "";
        row[`detailed_${i + 1}_desc`] =
          product.detailedDescription?.items?.[i]?.description || "";
      }
      return row;
    });

    // Создаем worksheet
    const ws = XLSX.utils.json_to_sheet([
      headers.reduce<{ [key: string]: string }>((acc, h, i) => {
        acc[h] = headersRu[i] || h;
        return acc;
      }, {}),
      ...rows,
    ]);
    // Устанавливаем ширину колонок
    ws["!cols"] = headers.map(() => ({ width: 20 }));

    // Создаем workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Товары");

    // Имя файла
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];
    const fileName = `товары_экспорт_${dateStr}.xlsx`;
    XLSX.writeFile(wb, fileName);

    toast({
      title: "Экспорт завершен",
      description: `Экспортировано ${products.length} товаров в файл ${fileName}`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5" />
            Экспорт товаров в Excel
          </DialogTitle>
          <DialogDescription>
            Экспортируйте все товары в Excel файл для редактирования или
            резервного копирования.
          </DialogDescription>
        </DialogHeader>

        <div
          className="space-y-4"
          onWheel={(e) => {
            e.stopPropagation();
            const container = e.currentTarget;
            const delta = e.deltaY;
            container.scrollTop += delta;
          }}
        >
          {products.length === 0 ? (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="w-4 h-4" />
                <span className="font-medium">Нет данных для экспорта</span>
              </div>
              <p className="text-sm text-destructive mt-1">
                Список товаров пуст. Добавьте товары перед экспортом.
              </p>
            </div>
          ) : (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex items-center gap-2 text-blue-900">
                <FileSpreadsheet className="w-4 h-4" />
                <span className="font-medium">Готово к экспорту</span>
              </div>
              <p className="text-sm text-blue-700 mt-1">
                Будет экспортировано <strong>{products.length}</strong> товаров.
                Каждый товар будет на отдельном листе.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isExporting}>
            Отмена
          </Button>
          <Button
            onClick={exportToExcel}
            disabled={products.length === 0 || isExporting}
            className="bg-green-600 hover:bg-green-700"
          >
            {isExporting ? (
              "Экспорт..."
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Экспортировать
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
