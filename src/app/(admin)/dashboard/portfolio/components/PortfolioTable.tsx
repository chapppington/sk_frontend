"use client";

import Image from "next/image";
import { Button } from "@/components/ui/shadcn/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import { Pencil, Trash2 } from "lucide-react";
import { BACKEND_MAIN } from "@/constants";
import { IPortfolioItem } from "@/shared/types/portfolio.types";

interface PortfolioTableProps {
  portfolio: IPortfolioItem[];
  isLoading: boolean;
  deletePopoverOpen: string | null;
  setDeletePopoverOpen: (id: string | null) => void;
  handleEdit: (portfolio: IPortfolioItem) => void;
  handleDelete: (id: string) => void;
  deleteMutation: {
    isPending: boolean;
  };
}

export default function PortfolioTable({
  portfolio,
  isLoading,
  deletePopoverOpen,
  setDeletePopoverOpen,
  handleEdit,
  handleDelete,
  deleteMutation,
}: PortfolioTableProps) {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Постер</TableHead>
            <TableHead>Название</TableHead>
            <TableHead>Год</TableHead>
            <TableHead>Описание</TableHead>
            <TableHead>Отзыв</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                Загрузка...
              </TableCell>
            </TableRow>
          ) : portfolio.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                Нет проектов
              </TableCell>
            </TableRow>
          ) : (
            portfolio.map((item: IPortfolioItem) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.poster && (
                    <div className="w-[100px] h-[60px] relative">
                      <Image
                        src={`${BACKEND_MAIN}/uploads/portfolio/${item.poster}`}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.year}</TableCell>
                <TableCell>
                  {item.description.length > 100
                    ? item.description.slice(0, 100) + "..."
                    : item.description}
                </TableCell>
                <TableCell>{item.hasReview ? "Есть" : "Нет"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(item)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Popover
                      open={deletePopoverOpen === item.id}
                      onOpenChange={(open) =>
                        setDeletePopoverOpen(open ? item.id : null)
                      }
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="space-y-4">
                          <p className="text-sm">
                            Вы уверены, что хотите удалить этот проект?
                          </p>
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setDeletePopoverOpen(null)}
                            >
                              Отмена
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(item.id)}
                              disabled={deleteMutation.isPending}
                            >
                              {deleteMutation.isPending
                                ? "Удаление..."
                                : "Удалить"}
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
