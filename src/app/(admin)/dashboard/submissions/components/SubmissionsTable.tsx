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
import { Badge } from "@/components/ui/shadcn/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import { Eye, Trash2, Download, FileText, MessageSquare } from "lucide-react";
import { UPLOADS_URL } from "@/constants";
import type { ISubmission } from "@/shared/types/submissions.types";
import { FORM_TYPE_MAP } from "../hooks/useSubmissions";

type SubmissionsTableProps = {
  submissions: ISubmission[];
  handleView: (submission: ISubmission) => void;
  handleDelete: (id: string) => void;
  deletePopoverOpen: string | null;
  setDeletePopoverOpen: (id: string | null) => void;
  deleteMutation: { isPending: boolean };
};

const SubmissionsTable: React.FC<SubmissionsTableProps> = ({
  submissions,
  handleView,
  handleDelete,
  deletePopoverOpen,
  setDeletePopoverOpen,
  deleteMutation,
}) => {
  const handleDownloadFile = (fileName: string) => {
    window.open(`${UPLOADS_URL}/uploads/submissions/${fileName}`, "_blank");
  };

  const renderComments = (comments: string | undefined) => {
    if (!comments) return "—";

    const maxLength = 50;
    const isLong = comments.length > maxLength;
    const displayText = isLong
      ? `${comments.substring(0, maxLength)}...`
      : comments;

    if (isLong) {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-auto p-0 text-left">
              <span className="text-sm">{displayText}</span>
              <MessageSquare className="h-3 w-3 ml-1 text-gray-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 max-h-60 overflow-y-auto">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Комментарий:</h4>
              <p className="text-sm whitespace-pre-wrap">{comments}</p>
            </div>
          </PopoverContent>
        </Popover>
      );
    }

    return <span className="text-sm">{displayText}</span>;
  };

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Тип формы</TableHead>
            <TableHead>Имя</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Телефон</TableHead>
            <TableHead>Комментарии</TableHead>
            <TableHead>Файлы</TableHead>
            <TableHead>Дата создания</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                Нет заявок
              </TableCell>
            </TableRow>
          ) : (
            submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell>
                  <Badge variant="secondary">
                    {FORM_TYPE_MAP[submission.formType]}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{submission.name}</TableCell>
                <TableCell>{submission.email || "—"}</TableCell>
                <TableCell>{submission.phone || "—"}</TableCell>
                <TableCell className="max-w-xs">
                  {renderComments(submission.comments)}
                </TableCell>
                <TableCell>
                  {submission.files && submission.files.length > 0 ? (
                    <div className="flex gap-1 flex-wrap">
                      {submission.files.map((fileName, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={() => handleDownloadFile(fileName)}
                        >
                          <FileText className="h-3 w-3 mr-1" />
                          Файл {index + 1}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell>
                  {new Date(submission.createdAt).toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleView(submission)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Popover
                      open={deletePopoverOpen === submission.id}
                      onOpenChange={(open) =>
                        setDeletePopoverOpen(open ? submission.id : null)
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
                            Вы уверены, что хотите удалить эту заявку?
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
                              onClick={() => handleDelete(submission.id)}
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

export default SubmissionsTable;
