import { TableRow, TableCell } from "@/components/ui/shadcn/table";
import Image from "next/image";
import { BookAIcon, GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IProduct } from "@/shared/types/product.types";
import { BACKEND_MAIN } from "@/constants";

export default function SortableProductRow({
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
      <TableCell className="w-8 text-center text-gray-400">{order}</TableCell>
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