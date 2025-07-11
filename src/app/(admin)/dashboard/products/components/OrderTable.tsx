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
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: product.id });
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
      className="cursor-grab"
    >
      <TableCell className="w-8 text-gray-400">{order}</TableCell>
      <TableCell className="w-8 text-gray-400">
        <GripVertical />
      </TableCell>
      <TableCell>
        {product.previewImageUrl ? (
          <div className="w-16 h-16 rounded-lg overflow-hidden border relative">
            <Image
              src={`${BACKEND_MAIN}${product.previewImageUrl}`}
              alt={product.name}
              fill
              className="object-cover"
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
  );
}
