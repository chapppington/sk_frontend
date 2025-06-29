"use client";

import { useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { Plus, FileSpreadsheet, Download, Upload } from "lucide-react";
import { IProduct } from "@/shared/types/product.types";
import { useProducts } from "./hooks/useProducts";
import {
  ProductFormDialog,
  ProductsTable,
  ExcelImportDialog,
  ExcelExportDialog,
} from "./components";

export default function ProductManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

  // Используем кастомный хук
  const {
    products,
    portfolioItems,
    isLoadingProducts,
    deleteMutation,
    importMutation,
  } = useProducts();

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

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          <Button onClick={handleAddNew}>
            <Plus className="w-4 h-4 mr-2" />
            Добавить товар
          </Button>
          <Button
            onClick={handleImportFromExcel}
            className="bg-green-600 hover:bg-green-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Импорт из Excel
          </Button>
          <Button
            onClick={handleExportToExcel}
            variant="outline"
            className="border-blue-300 text-blue-700 hover:bg-blue-50"
          >
            <Upload className="w-4 h-4 mr-2" />
            Экспорт в Excel
          </Button>
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

      {/* Products Table */}
      <ProductsTable
        products={products}
        isLoading={isLoadingProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isDeletePending={deleteMutation.isPending}
      />
    </div>
  );
}
