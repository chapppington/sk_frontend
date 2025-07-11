"use client";

import { useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { Plus, Download, Upload } from "lucide-react";
import { IProduct } from "@/shared/types/product.types";
import { useProducts } from "./hooks/useProducts";
import {
  ProductFormDialog,
  ProductsTable,
  ExcelImportDialog,
  ExcelExportDialog,
} from "./components";
import { arrayMove } from '@dnd-kit/sortable';
import OrderTable from "./components/OrderTable";

export default function ProductManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [isOrderEditMode, setIsOrderEditMode] = useState(false);
  const [orderItems, setOrderItems] = useState<IProduct[]>([]);

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
            className="bg-green-600 hover:bg-green-700 dark:text-[#f2f2f2]"
            disabled={isOrderEditMode}
          >
            <Download className="w-4 h-4 mr-2" />
            Импорт из Excel
          </Button>
          <Button
            onClick={handleExportToExcel}
            variant="outline"
            className="border-green-600 text-green-700 hover:bg-green-50 dark:border-green-400 dark:text-green-300 dark:hover:bg-green-900/40"
            disabled={isOrderEditMode}
          >
            <Upload className="w-4 h-4 mr-2" />
            Экспорт в Excel
          </Button>
          {!isOrderEditMode ? (
            <Button
              onClick={handleOrderMode}
              className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
              disabled={isOrderEditMode}
            >
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
