"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";
import Image from "next/image";
import { BACKEND_MAIN } from "@/constants";
import { GripVertical } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IProduct } from "@/shared/types/product.types";

function SortableProductRow({
  product,
  order,
}: {
  product: IProduct;
  order: number;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: product.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-grab active:cursor-grabbing transition-colors transition-shadow duration-200
        ${
          isDragging
            ? "bg-accent/60 dark:bg-gray-800"
            : "hover:bg-accent/40 dark:hover:bg-gray-800 hover:shadow-md"
        }
        `}
    >
      <TableCell className="w-8 text-gray-400">{order}</TableCell>
      <TableCell className="w-8">
        <GripVertical className="text-gray-400 dark:text-gray-300 transition-transform duration-200 group-hover:scale-125 group-hover:-rotate-12" />
      </TableCell>
      <TableCell>
        {product.previewImageUrl ? (
          <div className="w-16 h-16 rounded-lg overflow-hidden border relative">
            <Image
              src={`${BACKEND_MAIN}${product.previewImageUrl}`}
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
    </TableRow>
  );
}

export default function OrderTable({
  orderItems,
  handleDragEnd,
}: {
  orderItems: IProduct[];
  handleDragEnd: (event: any) => void;
}) {
  return (
    <>
      <div className="mb-4 px-4 py-2 rounded-md border border-yellow-300 bg-yellow-50 text-yellow-800 dark:border-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-200 flex items-center gap-2 text-sm">
        <GripVertical className="inline-block w-4 h-4 text-yellow-500 dark:text-yellow-300 mr-1" />
        Перетаскивайте строки таблицы для изменения порядка
      </div>
      <div className="rounded-md border overflow-x-auto">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={orderItems.map((p) => p.id)}
            strategy={verticalListSortingStrategy}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Порядок</TableHead>
                  <TableHead></TableHead>
                  <TableHead>Превью</TableHead>
                  <TableHead>Название</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderItems.map((product, idx) => (
                  <SortableProductRow
                    key={product.id}
                    product={product}
                    order={idx + 1}
                  />
                ))}
              </TableBody>
            </Table>
          </SortableContext>
        </DndContext>
      </div>
    </>
  );
}
