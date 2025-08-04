"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import { Label } from "@/components/ui/shadcn/label";
import { Plus } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { ProductEditModal } from "./ProductEditModal";
import { useToast } from "@/hooks/use-toast";

interface Product {
  title: string;
  image: string;
  description: string;
  category: string;
}

interface ProductsScreenData {
  button_text: string;
  products: Product[];
}

interface ProductsScreenEditorProps {
  data: ProductsScreenData;
  onSave: (data: ProductsScreenData) => void;
  saving: boolean;
}

export function ProductsScreenEditor({
  data,
  onSave,
  saving,
}: ProductsScreenEditorProps) {
  const [form, setForm] = useState<ProductsScreenData>(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  // Автоматическое сохранение при изменении данных
  useEffect(() => {
    if (form !== data) {
      onSave(form);
      toast({
        title: "Успех",
        description: "Экран продукции успешно сохранен",
      });
    }
  }, [form, data, onSave, toast]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (index: number) => {
    const newProducts = form.products.filter((_, i) => i !== index);
    setForm({ ...form, products: newProducts });
  };

  const handleSaveProduct = (product: Product) => {
    if (isEditing && editingProduct) {
      // Редактирование существующего продукта
      const index = form.products.findIndex((p) => p === editingProduct);
      if (index !== -1) {
        const newProducts = [...form.products];
        newProducts[index] = product;
        setForm({ ...form, products: newProducts });
      }
    } else {
      // Добавление нового продукта
      setForm({
        ...form,
        products: [...form.products, product],
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setIsEditing(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Экран продукции</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="button_text">Текст кнопки</Label>
            <Input
              id="button_text"
              value={form.button_text}
              onChange={(e) =>
                setForm({ ...form, button_text: e.target.value })
              }
              placeholder="Введите текст кнопки"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Продукция ({form.products.length})</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddProduct}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Добавить продукцию
              </Button>
            </div>

            {form.products.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Продукция не добавлена</p>
                <p className="text-sm">
                  Нажмите "Добавить продукцию" чтобы начать
                </p>
              </div>
            ) : (
              <div className="grid gap-3">
                {form.products.map((product, index) => (
                  <ProductCard
                    key={index}
                    product={product}
                    index={index}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteProduct}
                  />
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <ProductEditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
        product={editingProduct}
        isEditing={isEditing}
      />
    </>
  );
}
