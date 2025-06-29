"use client";

import { useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { Plus } from "lucide-react";
import { IProduct } from "@/shared/types/product.types";
import { useProducts } from "./hooks/useProducts";
import { ProductFormDialog, ProductsTable } from "./components";

export default function ProductManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

  // Используем кастомный хук
  const { products, portfolioItems, isLoadingProducts, deleteMutation } =
    useProducts();

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

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <Button onClick={handleAddNew}>
          <Plus className="w-4 h-4 mr-2" />
          Добавить товар
        </Button>
      </div>

      {/* Product Form Dialog */}
      <ProductFormDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        editingProduct={editingProduct}
        portfolioItems={portfolioItems}
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
