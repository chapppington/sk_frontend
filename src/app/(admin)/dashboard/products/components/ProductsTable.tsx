"use client";

import { useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";
import { Pencil } from "lucide-react";
import { IProduct } from "@/shared/types/product.types";
import Image from "next/image";
import { getCategoryLabel } from "@/shared/utils/categoryMapping";
import { DeleteProductPopover } from "./index";
import { UPLOADS_URL } from "@/constants";

interface ProductsTableProps {
  products: IProduct[];
  isLoading: boolean;
  onEdit: (product: IProduct) => void;
  onDelete: (id: string) => void;
  isDeletePending: boolean;
}

export default function ProductsTable({
  products,
  isLoading,
  onEdit,
  onDelete,
  isDeletePending,
}: ProductsTableProps) {
  const [deletePopoverOpen, setDeletePopoverOpen] = useState<string | null>(
    null
  );

  const handleDelete = async (id: string) => {
    onDelete(id);
    setDeletePopoverOpen(null);
  };

  // Сортируем товары по order (по возрастанию)
  const sortedProducts = [...products].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );

  if (isLoading) {
    return (
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Приоритет</TableHead>
              <TableHead>Превью</TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Описание</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Загрузка...
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Приоритет</TableHead>
              <TableHead>Превью</TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Описание</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Нет товаров
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Приоритет</TableHead>
            <TableHead>Превью</TableHead>
            <TableHead>Название</TableHead>
            <TableHead>Категория</TableHead>
            <TableHead>Описание</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedProducts.map((product: IProduct) => (
            <TableRow key={product.id}>
              <TableCell className="text-center">
                {product.order ?? ""}
              </TableCell>
              <TableCell>
                {product.previewImageUrl ? (
                  <div className="w-16 h-16 rounded-lg overflow-hidden border relative">
                    <Image
                      src={`${UPLOADS_URL}${product.previewImageUrl}`}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center border">
                    <span className="text-xs text-gray-500">Нет фото</span>
                  </div>
                )}
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{getCategoryLabel(product.category)}</TableCell>
              <TableCell className="max-w-xs truncate">
                {product.description.length > 100
                  ? product.description.slice(0, 100) + "..."
                  : product.description}
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.isShown ?? true
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    {product.isShown ?? true ? "Активен" : "Скрыт"}
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.showAdvantages ?? true
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    Преимущества
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(product)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <DeleteProductPopover
                    productId={product.id}
                    isOpen={deletePopoverOpen === product.id}
                    onOpenChange={(open) =>
                      setDeletePopoverOpen(open ? product.id : null)
                    }
                    onDelete={handleDelete}
                    isPending={isDeletePending}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
