import React from "react";
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
import { Pencil, Trash2, Eye } from "lucide-react";
import { Badge } from "@/components/ui/shadcn/badge";
import { type SeoSettings } from "@/services/seo-settings.service";

interface SeoSettingsTableProps {
  seoSettings: SeoSettings[];
  isLoading: boolean;
  isDeleting: boolean;
  onEdit: (seo: SeoSettings) => void;
  onPreview: (seo: SeoSettings) => void;
  onDelete: (id: string) => void;
}

export function SeoSettingsTable({
  seoSettings,
  isLoading,
  isDeleting,
  onEdit,
  onPreview,
  onDelete,
}: SeoSettingsTableProps) {
  const [deletePopoverOpen, setDeletePopoverOpen] = React.useState<
    string | null
  >(null);

  const handleDelete = (id: string) => {
    onDelete(id);
    setDeletePopoverOpen(null);
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Страница</TableHead>
            <TableHead>Путь</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {seoSettings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                Нет наборов мета тегов
              </TableCell>
            </TableRow>
          ) : (
            seoSettings.map((item: SeoSettings) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.pageName}</TableCell>
                <TableCell className="font-mono text-sm">
                  {item.pagePath}
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {item.title}
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {item.description}
                </TableCell>
                <TableCell>
                  <Badge variant={item.isActive ? "success" : "destructive"}>
                    {item.isActive ? "Активно" : "Неактивно"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onPreview(item)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(item)}
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
                          disabled={isDeleting}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="space-y-4">
                          <p className="text-sm">
                            Вы уверены, что хотите удалить этот набор мета
                            тегов?
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
                              disabled={isDeleting}
                            >
                              {isDeleting ? "Удаление..." : "Удалить"}
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
