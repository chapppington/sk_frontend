"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";
import { GripVertical } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { IProduct } from "@/shared/types/product.types";
import SortableProductRow from "./SortableProductRow";



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
        Перетаскивайте строки таблицы для изменения приоритета показа
      </div>
      <div className="rounded-md border overflow-x-auto">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={orderItems.map((p) => p.id)}
            strategy={verticalListSortingStrategy}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Приоритет</TableHead>
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
