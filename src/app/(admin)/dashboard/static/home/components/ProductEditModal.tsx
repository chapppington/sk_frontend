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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import { UPLOADS_URL } from "@/constants";
import Image from "next/image";
import { productCategories } from "@/shared/utils/categoryMapping";
import homePageConfigService from "@/services/home-page-config.service";

interface Product {
  title: string;
  image: string;
  description: string;
  category: string;
}

interface ProductForm {
  image: string;
  description: string;
  category: string;
}

interface ProductEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product?: Product | null;
  isEditing: boolean;
}

export function ProductEditModal({
  isOpen,
  onClose,
  onSave,
  product,
  isEditing,
}: ProductEditModalProps) {
  const [form, setForm] = useState<ProductForm>({
    image: "",
    description: "",
    category: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (product) {
      setForm({
        image: product.image,
        description: product.description,
        category: product.category,
      });
      setSelectedFile(null);
    } else {
      setForm({
        image: "",
        description: "",
        category: "",
      });
      setSelectedFile(null);
    }
  }, [product, isOpen]);

  const handleSave = () => {
    const productWithTitle = {
      ...form,
      title: getProductTitle(),
    };
    onSave(productWithTitle);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      try {
        const response = await homePageConfigService.uploadFile(file);

        const filename = response.data.productImage;
        setForm({ ...form, image: filename });
        setSelectedFile(null); // Очищаем selectedFile после успешной загрузки
      } catch (error) {
        console.error("Upload error:", error);
        setSelectedFile(null);
      }
    }
  };

  const handleCategoryChange = (value: string) => {
    setForm({
      ...form,
      category: value,
    });
  };

  const getProductTitle = () => {
    const selectedCategory = productCategories.find(
      (cat) => cat.id === form.category
    );
    return selectedCategory ? selectedCategory.name : "";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Редактировать продукцию" : "Добавить продукцию"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Категория</Label>
            <Select value={form.category} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                {productCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Изображение продукции</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {form.image && !selectedFile && (
              <div className="mt-2">
                <p className="text-sm text-muted-foreground mb-2">
                  Текущее изображение:
                </p>
                <div className="relative aspect-[16/9] w-[320px]">
                  <Image
                    src={`${UPLOADS_URL}/uploads/home-page/${form.image}`}
                    alt="Product image"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </div>
            )}
            {selectedFile && (
              <div className="mt-2">
                <p className="text-sm text-muted-foreground mb-2">
                  Новое изображение:
                </p>
                <div className="relative aspect-[16/9] w-[320px]">
                  <Image
                    src={URL.createObjectURL(selectedFile)}
                    alt="New product image"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Описание продукции"
              rows={4}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={handleCancel}>
              Отмена
            </Button>
            <Button onClick={handleSave}>
              {isEditing ? "Сохранить" : "Добавить"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
