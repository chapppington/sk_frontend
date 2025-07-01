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
import { productCategories } from "@/shared/utils/categoryMapping";

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
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
        const parsedProducts: CreateProductData[] = [];
        jsonData.forEach((row: any, index: number) => {
          // Пропускаем только второй (системный) ряд с русскими заголовками
          if (index === 0) return;
          const productData: any = {
            id: row.id || undefined,
            category: row.category || "",
            name: row.name || "",
            description: row.description || "",
            importantCharacteristics: [],
            advantages: [],
            simpleDescription: { items: [] },
            detailedDescription: { items: [] },
          };
          // Характеристики
          for (let i = 0; i < 3; i++) {
            const value = row[`char_${i + 1}_value`] || "";
            const unit = row[`char_${i + 1}_unit`] || "";
            const desc = row[`char_${i + 1}_desc`] || "";
            if (value || unit || desc) {
              productData.importantCharacteristics.push({
                value,
                unit: unit ? { text: unit } : undefined,
                description: desc,
              });
            }
          }
          // Преимущества
          for (let i = 0; i < 5; i++) {
            const label = row[`adv_${i + 1}_label`] || "";
            const description = row[`adv_${i + 1}_desc`] || "";
            if (label || description) {
              productData.advantages.push({
                label,
                icon: "",
                image: "",
                description,
              });
            }
          }
          // Простое описание
          for (let i = 0; i < 3; i++) {
            const text = row[`simple_${i + 1}`] || "";
            if (text) productData.simpleDescription.items.push({ text });
          }
          // Детальное описание (16)
          for (let i = 0; i < 16; i++) {
            const title = row[`detailed_${i + 1}_title`] || "";
            const description = row[`detailed_${i + 1}_desc`] || "";
            if (title || description) {
              productData.detailedDescription.items.push({
                title,
                description,
              });
            }
          }
          // Проверяем обязательные поля
          if (
            productData.category &&
            productData.name &&
            productData.description
          ) {
            parsedProducts.push(productData);
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
