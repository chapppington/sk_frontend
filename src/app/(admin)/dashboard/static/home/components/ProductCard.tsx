"use client";

import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { BACKEND_MAIN } from "@/constants";
import { productCategories } from "@/shared/utils/categoryMapping";
import { useState } from "react";

interface Product {
  title: string;
  image: string;
  description: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
  onEdit: (product: Product) => void;
  onDelete: (index: number) => void;
}

export function ProductCard({
  product,
  index,
  onEdit,
  onDelete,
}: ProductCardProps) {
  const [deletePopoverOpen, setDeletePopoverOpen] = useState(false);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-sm font-medium text-gray-600 flex-shrink-0">
            {index + 1}
          </div>

          {product.image && (
            <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
              <Image
                src={`${BACKEND_MAIN}/uploads/home-page/${product.image}`}
                alt={product.title}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm truncate mb-1">
              {product.title}
            </h3>
            <p className="text-xs text-gray-600 line-clamp-1">
              {product.description || "Описание не указано"}
            </p>
          </div>

          <div className="flex gap-1 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(product)}
              className="h-7 w-7 p-0"
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Popover
              open={deletePopoverOpen}
              onOpenChange={setDeletePopoverOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <p className="text-sm">
                    Вы уверены, что хотите удалить данную продукцию?
                  </p>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeletePopoverOpen(false)}
                    >
                      Отмена
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        onDelete(index);
                        setDeletePopoverOpen(false);
                      }}
                    >
                      Удалить
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
