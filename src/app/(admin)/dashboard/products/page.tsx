"use client";

import { useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { Plus, FileSpreadsheet, Download, Upload, GripVertical } from "lucide-react";
import { IProduct } from "@/shared/types/product.types";
import { useProducts } from "./hooks/useProducts";
import {
  ProductFormDialog,
  ProductsTable,
  ExcelImportDialog,
  ExcelExportDialog,
} from "./components";
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import OrderTable from "./components/OrderTable";

export default function ProductManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [isOrderEditMode, setIsOrderEditMode] = useState(false);
  const [orderItems, setOrderItems] = useState<IProduct[]>([]);
  const { toast } = useToast();

  // Используем кастомный хук с onSuccess для обновления порядка
  const {
    products,
    portfolioItems,
    isLoadingProducts,
    deleteMutation,
    importMutation,
    updateOrderMutation,
  } = useProducts({
    onSuccess: () => {
      setIsOrderEditMode(false);
    },
  });

  // Мутация для обновления порядка
  const orderMutation = useMutation({
    mutationFn: async (orderPayload: { id: string; order: number }[]) => {
      await fetch("/api/products/order", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });
    },
    onSuccess: () => {
      toast({ title: "Порядок обновлён" });
    },
    onError: () => {
      toast({ title: "Ошибка при обновлении порядка", variant: "destructive" });
    },
  });

  const handleDelete = async (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleEdit = (product: IProduct) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProduct(null);
  };

  const handleImportFromExcel = () => {
    setIsImportDialogOpen(true);
  };

  const handleCloseImportDialog = () => {
    setIsImportDialogOpen(false);
  };

  const handleExportToExcel = () => {
    setIsExportDialogOpen(true);
  };

  const handleCloseExportDialog = () => {
    setIsExportDialogOpen(false);
  };

  const handleImport = (products: any[]) => {
    importMutation.mutate(products);
    setIsImportDialogOpen(false);
  };

  // Включение режима сортировки
  const handleOrderMode = () => {
    const sorted = [...products].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    setOrderItems(sorted);
    setIsOrderEditMode(true);
  };
  // Выключение режима сортировки
  const handleOrderModeOff = () => {
    setIsOrderEditMode(false);
  };

  // Drag-n-drop обработка
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = orderItems.findIndex(i => i.id === active.id);
      const newIndex = orderItems.findIndex(i => i.id === over.id);
      const newItems = arrayMove(orderItems, oldIndex, newIndex);
      setOrderItems(newItems);
      // PATCH на backend через хук
      const orderPayload = newItems.map((item, idx) => ({ id: item.id, order: idx + 1 }));
      updateOrderMutation.mutate(orderPayload);
    }
  };

  // Компонент строки для сортировки
  function SortableProductItem({ product }: { product: IProduct }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: product.id });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      background: '#fff',
      borderBottom: '1px solid #eee',
      display: 'flex',
      alignItems: 'center',
      padding: '12px',
      cursor: 'grab',
    };
    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <GripVertical className="mr-3 text-gray-400" />
        <span>{product.name}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          <Button onClick={handleAddNew} disabled={isOrderEditMode}>
            <Plus className="w-4 h-4 mr-2" />
            Добавить товар
          </Button>
          <Button
            onClick={handleImportFromExcel}
            className="bg-green-600 hover:bg-green-700"
            disabled={isOrderEditMode}
          >
            <Download className="w-4 h-4 mr-2" />
            Импорт из Excel
          </Button>
          <Button
            onClick={handleExportToExcel}
            variant="outline"
            className="border-blue-300 text-blue-700 hover:bg-blue-50"
            disabled={isOrderEditMode}
          >
            <Upload className="w-4 h-4 mr-2" />
            Экспорт в Excel
          </Button>
          {!isOrderEditMode ? (
            <Button variant="outline" onClick={handleOrderMode}>
              Изменить порядок
            </Button>
          ) : (
            <Button variant="destructive" onClick={handleOrderModeOff}>
              Завершить изменение порядка
            </Button>
          )}
        </div>
      </div>

      {/* Product Form Dialog */}
      <ProductFormDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        editingProduct={editingProduct}
        portfolioItems={portfolioItems}
      />

      {/* Excel Import Dialog */}
      <ExcelImportDialog
        isOpen={isImportDialogOpen}
        onClose={handleCloseImportDialog}
        onImport={handleImport}
        isImporting={importMutation.isPending}
      />

      {/* Excel Export Dialog */}
      <ExcelExportDialog
        isOpen={isExportDialogOpen}
        onClose={handleCloseExportDialog}
        products={products}
        isExporting={false}
      />

      {/* Products Table или OrderTable */}
      {!isOrderEditMode ? (
        <ProductsTable
          products={products}
          isLoading={isLoadingProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isDeletePending={deleteMutation.isPending}
        />
      ) : (
        <OrderTable orderItems={orderItems} handleDragEnd={handleDragEnd} />
      )}
    </div>
  );
}
