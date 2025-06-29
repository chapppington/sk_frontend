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

    const wb = XLSX.utils.book_new();
    const usedSheetNames = new Set();

    products.forEach((product, index) => {
      const productData = [
        { field: "Категория", value: product.category || "" },
        { field: "Название товара", value: product.name || "" },
        { field: "Описание", value: product.description || "" },
        { field: "", value: "" },
      ];

      // Добавляем характеристики
      if (
        product.importantCharacteristics &&
        product.importantCharacteristics.length > 0
      ) {
        product.importantCharacteristics.forEach((char, charIndex) => {
          if (charIndex < 3) {
            // Максимум 3 характеристики
            productData.push(
              {
                field: `Характеристика ${charIndex + 1} - Значение`,
                value: char.value || "",
              },
              {
                field: `Характеристика ${charIndex + 1} - Единица измерения`,
                value:
                  typeof char.unit === "string"
                    ? char.unit
                    : char.unit?.text || "",
              },
              {
                field: `Характеристика ${charIndex + 1} - Описание`,
                value: char.description || "",
              },
              { field: "", value: "" }
            );
          }
        });
      }

      // Добавляем пустые характеристики если их меньше 3
      const existingChars = product.importantCharacteristics?.length || 0;
      for (let i = existingChars; i < 3; i++) {
        productData.push(
          { field: `Характеристика ${i + 1} - Значение`, value: "" },
          { field: `Характеристика ${i + 1} - Единица измерения`, value: "" },
          { field: `Характеристика ${i + 1} - Описание`, value: "" },
          { field: "", value: "" }
        );
      }

      // Добавляем преимущества
      if (product.advantages && product.advantages.length > 0) {
        product.advantages.forEach((advantage, advIndex) => {
          if (advIndex < 5) {
            // Максимум 5 преимуществ
            productData.push(
              {
                field: `Преимущество ${advIndex + 1} - Название`,
                value: advantage.label || "",
              },
              {
                field: `Преимущество ${advIndex + 1} - Описание`,
                value: advantage.description || "",
              },
              { field: "", value: "" }
            );
          }
        });
      }

      // Добавляем пустые преимущества если их меньше 5
      const existingAdvs = product.advantages?.length || 0;
      for (let i = existingAdvs; i < 5; i++) {
        productData.push(
          { field: `Преимущество ${i + 1} - Название`, value: "" },
          { field: `Преимущество ${i + 1} - Описание`, value: "" },
          { field: "", value: "" }
        );
      }

      // Добавляем простое описание
      if (
        product.simpleDescription &&
        product.simpleDescription.items &&
        product.simpleDescription.items.length > 0
      ) {
        product.simpleDescription.items.forEach((item, itemIndex) => {
          if (itemIndex < 3) {
            // Максимум 3 пункта
            productData.push({
              field: `Простое описание - Пункт ${itemIndex + 1}`,
              value: item.text || "",
            });
          }
        });
      }

      // Добавляем пустые пункты простого описания если их меньше 3
      const existingSimple = product.simpleDescription?.items?.length || 0;
      for (let i = existingSimple; i < 3; i++) {
        productData.push({
          field: `Простое описание - Пункт ${i + 1}`,
          value: "",
        });
      }

      productData.push({ field: "", value: "" });

      // Добавляем детальное описание
      if (
        product.detailedDescription &&
        product.detailedDescription.items &&
        product.detailedDescription.items.length > 0
      ) {
        product.detailedDescription.items.forEach((section, sectionIndex) => {
          if (sectionIndex < 16) {
            // Максимум 16 разделов
            productData.push(
              {
                field: `Детальное описание - Заголовок ${sectionIndex + 1}`,
                value: section.title || "",
              },
              {
                field: `Детальное описание - Текст ${sectionIndex + 1}`,
                value: section.description || "",
              },
              { field: "", value: "" }
            );
          }
        });
      }

      // Добавляем пустые разделы детального описания если их меньше 16
      const existingDetailed = product.detailedDescription?.items?.length || 0;
      for (let i = existingDetailed; i < 16; i++) {
        productData.push(
          { field: `Детальное описание - Заголовок ${i + 1}`, value: "" },
          { field: `Детальное описание - Текст ${i + 1}`, value: "" },
          { field: "", value: "" }
        );
      }

      const productWs = XLSX.utils.json_to_sheet(productData);

      // Устанавливаем ширину колонок
      productWs["!cols"] = [
        { width: 35 }, // Поле
        { width: 25 }, // Значение
      ];

      // Генерируем уникальное название листа
      let sheetName = product.name
        ? product.name.substring(0, 25) // Оставляем больше места для ID
        : `Товар_${index + 1}`;

      // Добавляем уникальный идентификатор к названию листа
      sheetName = `${sheetName}_${index + 1}`;

      // Проверяем, что название не превышает 31 символ
      if (sheetName.length > 31) {
        sheetName = sheetName.substring(0, 31);
      }

      // Проверяем уникальность названия листа
      let counter = 1;
      let finalSheetName = sheetName;
      while (usedSheetNames.has(finalSheetName)) {
        const suffix = `_${counter}`;
        finalSheetName = sheetName.substring(0, 31 - suffix.length) + suffix;
        counter++;
      }

      usedSheetNames.add(finalSheetName);

      XLSX.utils.book_append_sheet(wb, productWs, finalSheetName);
    });

    // Создаем имя файла с текущей датой
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
