"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileSpreadsheet, AlertCircle, Download } from "lucide-react";
import { CreateProductData } from "@/shared/types/product.types";

interface ExcelImportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (products: CreateProductData[]) => void;
  isImporting: boolean;
}

export default function ExcelImportDialog({
  isOpen,
  onClose,
  onImport,
  isImporting,
}: ExcelImportDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<CreateProductData[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const { toast } = useToast();

  const downloadExampleFile = () => {
    const wb = XLSX.utils.book_new();

    // Создаем пример товара на отдельном листе
    const productData = [
      { field: "Категория", value: "Электрооборудование" },
      { field: "Название товара", value: "Трансформатор ТМ-1000" },
      {
        field: "Описание",
        value: "Мощный трансформатор для промышленного использования",
      },
      { field: "", value: "" },
      { field: "Характеристика 1 - Значение", value: "1000" },
      { field: "Характеристика 1 - Единица измерения", value: "кВт" },
      { field: "Характеристика 1 - Описание", value: "Мощность" },
      { field: "", value: "" },
      { field: "Характеристика 2 - Значение", value: "10" },
      { field: "Характеристика 2 - Единица измерения", value: "кВ" },
      { field: "Характеристика 2 - Описание", value: "Напряжение" },
      { field: "", value: "" },
      { field: "Характеристика 3 - Значение", value: "" },
      { field: "Характеристика 3 - Единица измерения", value: "" },
      { field: "Характеристика 3 - Описание", value: "" },
      { field: "", value: "" },
      { field: "Преимущество 1 - Название", value: "Высокая надежность" },
      {
        field: "Преимущество 1 - Описание",
        value: "Гарантированная надежность работы",
      },
      { field: "", value: "" },
      { field: "Преимущество 2 - Название", value: "Энергоэффективность" },
      {
        field: "Преимущество 2 - Описание",
        value: "Низкое потребление энергии",
      },
      { field: "", value: "" },
      { field: "Преимущество 3 - Название", value: "Долговечность" },
      { field: "Преимущество 3 - Описание", value: "Срок службы более 20 лет" },
      { field: "", value: "" },
      { field: "Преимущество 4 - Название", value: "Простота обслуживания" },
      {
        field: "Преимущество 4 - Описание",
        value: "Минимальные требования к обслуживанию",
      },
      { field: "", value: "" },
      { field: "Преимущество 5 - Название", value: "" },
      { field: "Преимущество 5 - Описание", value: "" },
      { field: "", value: "" },
      {
        field: "Простое описание - Пункт 1",
        value: "Простое описание пункт 1",
      },
      {
        field: "Простое описание - Пункт 2",
        value: "Простое описание пункт 2",
      },
      {
        field: "Простое описание - Пункт 3",
        value: "Простое описание пункт 3",
      },
      { field: "", value: "" },
      {
        field: "Детальное описание - Заголовок 1",
        value: "Технические характеристики",
      },
      {
        field: "Детальное описание - Текст 1",
        value: "Подробное описание технических характеристик",
      },
      { field: "", value: "" },
      { field: "Детальное описание - Заголовок 2", value: "Применение" },
      {
        field: "Детальное описание - Текст 2",
        value: "Области применения оборудования",
      },
      { field: "", value: "" },
      { field: "Детальное описание - Заголовок 3", value: "Конструкция" },
      {
        field: "Детальное описание - Текст 3",
        value: "Особенности конструкции трансформатора",
      },
      { field: "", value: "" },
      { field: "Детальное описание - Заголовок 4", value: "Монтаж" },
      {
        field: "Детальное описание - Текст 4",
        value: "Требования к монтажу и установке",
      },
      { field: "", value: "" },
      { field: "Детальное описание - Заголовок 5", value: "Обслуживание" },
      {
        field: "Детальное описание - Текст 5",
        value: "Рекомендации по обслуживанию",
      },
      { field: "", value: "" },
      { field: "Детальное описание - Заголовок 6", value: "" },
      { field: "Детальное описание - Текст 6", value: "" },
      { field: "", value: "" },
      { field: "Детальное описание - Заголовок 7", value: "" },
      { field: "Детальное описание - Текст 7", value: "" },
      { field: "", value: "" },
      { field: "Детальное описание - Заголовок 8", value: "" },
      { field: "Детальное описание - Текст 8", value: "" },
      { field: "", value: "" },
      { field: "Детальное описание - Заголовок 9", value: "" },
      { field: "Детальное описание - Текст 9", value: "" },
      { field: "", value: "" },
      { field: "Детальное описание - Заголовок 10", value: "" },
      { field: "Детальное описание - Текст 10", value: "" },
      { field: "", value: "" },
      { field: "Детальное описание - Заголовок 11", value: "" },
      { field: "Детальное описание - Текст 11", value: "" },
      { field: "", value: "" },
      { field: "Детальное описание - Заголовок 12", value: "" },
      { field: "Детальное описание - Текст 12", value: "" },
      { field: "", value: "" },
      { field: "Детальное описание - Заголовок 13", value: "" },
      { field: "Детальное описание - Текст 13", value: "" },
      { field: "", value: "" },
      { field: "Детальное описание - Заголовок 14", value: "" },
      { field: "Детальное описание - Текст 14", value: "" },
      { field: "", value: "" },
      { field: "Детальное описание - Заголовок 15", value: "" },
      { field: "Детальное описание - Текст 15", value: "" },
      { field: "", value: "" },
      { field: "Детальное описание - Заголовок 16", value: "" },
      { field: "Детальное описание - Текст 16", value: "" },
    ];

    const productWs = XLSX.utils.json_to_sheet(productData);

    // Устанавливаем ширину колонок
    productWs["!cols"] = [
      { width: 35 }, // Поле
      { width: 25 }, // Значение
    ];

    XLSX.utils.book_append_sheet(wb, productWs, "Товар_1");

    // Создаем второй пример товара
    const productData2 = [
      { field: "Категория", value: "Трансформаторы" },
      {
        field: "Название товара",
        value: "Комплектная трансформаторная подстанция КТП-1000",
      },
      {
        field: "Описание",
        value: "Комплектная трансформаторная подстанция мощностью 1000 кВА",
      },
      { field: "", value: "" },
      { field: "Характеристика 1 - Значение", value: "1000" },
      { field: "Характеристика 1 - Единица измерения", value: "кВА" },
      { field: "Характеристика 1 - Описание", value: "Мощность" },
      { field: "", value: "" },
      { field: "Характеристика 2 - Значение", value: "10" },
      { field: "Характеристика 2 - Единица измерения", value: "кВ" },
      { field: "Характеристика 2 - Описание", value: "Входное напряжение" },
      { field: "", value: "" },
      { field: "Характеристика 3 - Значение", value: "0.4" },
      { field: "Характеристика 3 - Единица измерения", value: "кВ" },
      { field: "Характеристика 3 - Описание", value: "Выходное напряжение" },
      { field: "", value: "" },
      { field: "Преимущество 1 - Название", value: "Компактность" },
      {
        field: "Преимущество 1 - Описание",
        value: "Малые габариты для экономии места",
      },
      { field: "", value: "" },
      { field: "Преимущество 2 - Название", value: "Быстрый монтаж" },
      {
        field: "Преимущество 2 - Описание",
        value: "Готовность к работе сразу после установки",
      },
      { field: "", value: "" },
      { field: "Преимущество 3 - Название", value: "Надежность" },
      {
        field: "Преимущество 3 - Описание",
        value: "Высокая надежность работы в любых условиях",
      },
      { field: "", value: "" },
      { field: "Преимущество 4 - Название", value: "Экономичность" },
      {
        field: "Преимущество 4 - Описание",
        value: "Низкие эксплуатационные расходы",
      },
      { field: "", value: "" },
      { field: "Преимущество 5 - Название", value: "Универсальность" },
      {
        field: "Преимущество 5 - Описание",
        value: "Подходит для различных объектов",
      },
      { field: "", value: "" },
      {
        field: "Простое описание - Пункт 1",
        value: "Готовая к работе подстанция",
      },
      {
        field: "Простое описание - Пункт 2",
        value: "Не требует дополнительной настройки",
      },
      {
        field: "Простое описание - Пункт 3",
        value: "Соответствует всем стандартам",
      },
      { field: "", value: "" },
      { field: "Детальное описание - Заголовок 1", value: "Конструкция" },
      {
        field: "Детальное описание - Текст 1",
        value:
          "Подстанция состоит из трансформатора, распределительных устройств и системы автоматики",
      },
      { field: "", value: "" },
      { field: "Детальное описание - Заголовок 2", value: "Применение" },
      {
        field: "Детальное описание - Текст 2",
        value:
          "Используется для электроснабжения промышленных предприятий и жилых комплексов",
      },
      { field: "", value: "" },
      { field: "Детальное описание - Заголовок 3", value: "Преимущества" },
      {
        field: "Детальное описание - Текст 3",
        value:
          "Экономия времени на монтаж, высокая надежность, соответствие современным стандартам",
      },
      { field: "", value: "" },
      {
        field: "Детальное описание - Заголовок 4",
        value: "Технические характеристики",
      },
      {
        field: "Детальное описание - Текст 4",
        value: "Подробные технические характеристики подстанции",
      },
      { field: "", value: "" },
      {
        field: "Детальное описание - Заголовок 5",
        value: "Монтаж и подключение",
      },
      {
        field: "Детальное описание - Текст 5",
        value: "Пошаговая инструкция по монтажу и подключению",
      },
      { field: "", value: "" },
      { field: "Детальное описание - Заголовок 6", value: "" },
      { field: "Детальное описание - Текст 6", value: "" },
      { field: "", value: "" },
      { field: "Детальное описание - Заголовок 7", value: "" },
      { field: "Детальное описание - Текст 7", value: "" },
      { field: "", value: "" },
      { field: "Детальное описание - Заголовок 8", value: "" },
      { field: "Детальное описание - Текст 8", value: "" },
      { field: "", value: "" },
      { field: "Детальное описание - Заголовок 9", value: "" },
      { field: "Детальное описание - Текст 9", value: "" },
      { field: "", value: "" },
      { field: "Детальное описание - Заголовок 10", value: "" },
      { field: "Детальное описание - Текст 10", value: "" },
      { field: "", value: "" },
      { field: "Детальное описание - Заголовок 11", value: "" },
      { field: "Детальное описание - Текст 11", value: "" },
      { field: "", value: "" },
      { field: "Детальное описание - Заголовок 12", value: "" },
      { field: "Детальное описание - Текст 12", value: "" },
      { field: "", value: "" },
      { field: "Детальное описание - Заголовок 13", value: "" },
      { field: "Детальное описание - Текст 13", value: "" },
      { field: "", value: "" },
      { field: "Детальное описание - Заголовок 14", value: "" },
      { field: "Детальное описание - Текст 14", value: "" },
      { field: "", value: "" },
      { field: "Детальное описание - Заголовок 15", value: "" },
      { field: "Детальное описание - Текст 15", value: "" },
      { field: "", value: "" },
      { field: "Детальное описание - Заголовок 16", value: "" },
      { field: "Детальное описание - Текст 16", value: "" },
    ];

    const productWs2 = XLSX.utils.json_to_sheet(productData2);

    // Устанавливаем ширину колонок
    productWs2["!cols"] = [{ width: 35 }, { width: 25 }];

    XLSX.utils.book_append_sheet(wb, productWs2, "Товар_2");

    XLSX.writeFile(wb, "пример_товаров.xlsx");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (
      !selectedFile.name.endsWith(".xlsx") &&
      !selectedFile.name.endsWith(".xls")
    ) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, выберите файл Excel (.xlsx или .xls)",
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
    parseExcelFile(selectedFile);
  };

  const parseExcelFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const parsedProducts: CreateProductData[] = [];

        // Проходим по всем листам, кроме "Категории"
        workbook.SheetNames.forEach((sheetName, sheetIndex) => {
          if (sheetName === "Категории") return; // Пропускаем лист с категориями

          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

          if (jsonData.length === 0) return;

          try {
            // Создаем объект для сбора данных товара
            const productData: any = {
              category: "",
              name: "",
              description: "",
              importantCharacteristics: [],
              advantages: [],
              simpleDescription: { items: [] },
              detailedDescription: { items: [] },
            };

            // Парсим данные из листа
            jsonData.forEach((row: any) => {
              const field = row.field || "";
              const value = row.value || "";

              // Основные поля
              if (field === "Категория") productData.category = value;
              if (field === "Название товара") productData.name = value;
              if (field === "Описание") productData.description = value;

              // Характеристики
              if (
                field.includes("Характеристика") &&
                field.includes("Значение") &&
                value
              ) {
                const charIndex = field.match(/\d+/)?.[0];
                if (charIndex) {
                  const unitField = `Характеристика ${charIndex} - Единица измерения`;
                  const descField = `Характеристика ${charIndex} - Описание`;

                  const unit =
                    jsonData.find((r: any) => r.field === unitField)?.value ||
                    "";
                  const description =
                    jsonData.find((r: any) => r.field === descField)?.value ||
                    "";

                  if (description) {
                    productData.importantCharacteristics.push({
                      value,
                      unit: unit ? { text: unit } : undefined,
                      description,
                    });
                  }
                }
              }

              // Преимущества
              if (
                field.includes("Преимущество") &&
                field.includes("Название") &&
                value
              ) {
                const advIndex = field.match(/\d+/)?.[0];
                if (advIndex) {
                  const descField = `Преимущество ${advIndex} - Описание`;
                  const description =
                    jsonData.find((r: any) => r.field === descField)?.value ||
                    "";

                  if (description) {
                    productData.advantages.push({
                      label: value,
                      icon: "", // Пустая иконка
                      image: "", // Пустое изображение
                      description,
                    });
                  }
                }
              }

              // Простое описание
              if (
                field.includes("Простое описание") &&
                field.includes("Пункт") &&
                value
              ) {
                productData.simpleDescription.items.push({ text: value });
              }

              // Детальное описание
              if (
                field.includes("Детальное описание") &&
                field.includes("Заголовок") &&
                value
              ) {
                const detIndex = field.match(/\d+/)?.[0];
                if (detIndex) {
                  const textField = `Детальное описание - Текст ${detIndex}`;
                  const text =
                    jsonData.find((r: any) => r.field === textField)?.value ||
                    "";

                  if (text) {
                    productData.detailedDescription.items.push({
                      title: value,
                      description: text,
                    });
                  }
                }
              }
            });

            // Проверяем обязательные поля
            if (
              productData.category &&
              productData.name &&
              productData.description
            ) {
              parsedProducts.push(productData);
            } else {
              console.warn(
                `Лист "${sheetName}" пропущен: отсутствуют обязательные поля`
              );
            }
          } catch (parseError) {
            console.error(
              `Ошибка при парсинге листа "${sheetName}":`,
              parseError
            );
            setErrors((prev) => [
              ...prev,
              `Ошибка в листе "${sheetName}": ${parseError}`,
            ]);
          }
        });

        setPreviewData(parsedProducts);
        setErrors([]);
      } catch (error) {
        setErrors([`Ошибка при чтении файла: ${error}`]);
        setPreviewData([]);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleImport = () => {
    if (previewData.length === 0) {
      toast({
        title: "Ошибка",
        description: "Нет данных для импорта",
        variant: "destructive",
      });
      return;
    }

    onImport(previewData);
  };

  const handleClose = () => {
    setFile(null);
    setPreviewData([]);
    setErrors([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5" />
            Импорт товаров из Excel
          </DialogTitle>
          <DialogDescription>
            Загрузите Excel файл с данными товаров.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2">
          <div
            className="space-y-4"
            onWheel={(e) => {
              e.stopPropagation();
              const container = e.currentTarget;
              const delta = e.deltaY;
              container.scrollTop += delta;
            }}
          >
            {/* Download Example */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-sm text-blue-900">
                    Нужен пример файла?
                  </h4>
                  <p className="text-sm text-blue-700">
                    Скачайте пример Excel файла с правильной структурой данных
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadExampleFile}
                  className="border-blue-300 text-blue-700 hover:bg-blue-100"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Скачать пример
                </Button>
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="excel-file">Выберите Excel файл</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="excel-file"
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileChange}
                  className="flex-1"
                />
                
              </div>
            </div>

            {/* Errors */}
            {errors.length > 0 && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <div className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="w-4 h-4" />
                  <span className="font-medium">Ошибки:</span>
                </div>
                <ul className="mt-2 space-y-1">
                  {errors.map((error, index) => (
                    <li key={index} className="text-sm text-destructive">
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Preview */}
            {previewData.length > 0 && (
              <div className="space-y-2">
                <Label>
                  Предварительный просмотр ({previewData.length} товаров)
                </Label>
                <div className="border rounded-md p-4 max-h-60 overflow-y-auto">
                  {previewData.map((product, index) => (
                    <div
                      key={index}
                      className="mb-3 p-3 bg-muted/50 rounded-md"
                    >
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Категория: {product.category}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Описание: {product.description.substring(0, 100)}...
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Характеристики:{" "}
                        {product.importantCharacteristics.length} шт.
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Преимущества: {product.advantages.length} шт.
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex-shrink-0">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isImporting}
          >
            Отмена
          </Button>
          <Button
            onClick={handleImport}
            disabled={previewData.length === 0 || isImporting}
            className="bg-green-600 hover:bg-green-700"
          >
            {isImporting ? "Импорт..." : "Импортировать"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
