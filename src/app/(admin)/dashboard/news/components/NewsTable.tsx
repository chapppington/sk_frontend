import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";
import { Button } from "@/components/ui/shadcn/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { BACKEND_MAIN } from "@/constants";
import type { INews } from "@/shared/types/news.types";

type NewsTableProps = {
  news: INews[];
  categoryMap: Record<string, string>;
  handleEdit: (news: INews) => void;
  handleDelete: (id: string) => void;
  deletePopoverOpen: string | null;
  setDeletePopoverOpen: (id: string | null) => void;
  deleteMutation: { isPending: boolean };
};

const NewsTable: React.FC<NewsTableProps> = ({
  news,
  categoryMap,
  handleEdit,
  handleDelete,
  deletePopoverOpen,
  setDeletePopoverOpen,
  deleteMutation,
}) => {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Изображение</TableHead>
            <TableHead>Категория</TableHead>
            <TableHead>Заголовок</TableHead>
            <TableHead>Краткое содержание</TableHead>
            <TableHead>Время чтения</TableHead>
            <TableHead>Дата создания</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {news.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Нет новостей
              </TableCell>
            </TableRow>
          ) : (
            news.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.imageUrl && (
                    <div className="w-[100px] h-[60px] relative">
                      <Image
                        src={`${BACKEND_MAIN}${item.imageUrl}`}
                        alt={item.alt || item.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {categoryMap[item.category] || item.category}
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {item.shortContent}
                </TableCell>
                <TableCell>{item.readingTime} мин</TableCell>
                <TableCell>
                  {item.date
                    ? new Date(item.date).toLocaleDateString()
                    : new Date(item.createdAt).toLocaleDateString()}
                </TableCell>
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
                            Вы уверены, что хотите удалить эту новость?
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
};

export default NewsTable;
