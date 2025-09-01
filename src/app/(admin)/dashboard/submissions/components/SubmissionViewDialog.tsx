import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shadcn/dialog";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import { FileText, Download } from "lucide-react";
import { UPLOADS_URL } from "@/constants";
import type { ISubmission } from "@/shared/types/submissions.types";
import { FORM_TYPE_MAP } from "../hooks/useSubmissions";
import QuestionnaireViewer from "./QuestionnaireViewer";

type SubmissionViewDialogProps = {
  submission: ISubmission | null;
  isOpen: boolean;
  onClose: () => void;
};

const SubmissionViewDialog: React.FC<SubmissionViewDialogProps> = ({
  submission,
  isOpen,
  onClose,
}) => {
  if (!submission) return null;

  const handleDownloadFile = (fileName: string) => {
    window.open(`${UPLOADS_URL}/uploads/submissions/${fileName}`, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Просмотр заявки</DialogTitle>
        </DialogHeader>

        <div
          className="h-[calc(90vh-80px)] overflow-y-auto px-6 pb-6"
          onWheel={(e) => {
            e.stopPropagation();
            const container = e.currentTarget;
            const delta = e.deltaY;
            container.scrollTop += delta;
          }}
        >
          <div className="space-y-6">
            {/* Основная информация */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Тип формы
                </label>
                <div className="mt-1">
                  <Badge variant="secondary">
                    {FORM_TYPE_MAP[submission.formType]}
                  </Badge>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Дата создания
                </label>
                <p className="mt-1">
                  {new Date(submission.createdAt).toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            {/* Контактные данные */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Контактные данные</h3>

              <div>
                <label className="text-sm font-medium text-gray-500">Имя</label>
                <p className="mt-1 font-medium">{submission.name}</p>
              </div>

              {submission.email && (
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Email
                  </label>
                  <p className="mt-1">{submission.email}</p>
                </div>
              )}

              {submission.phone && (
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Телефон
                  </label>
                  <p className="mt-1">{submission.phone}</p>
                </div>
              )}
            </div>

            {/* Комментарии */}
            {submission.comments && (
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Комментарии
                </label>
                <p className="mt-1 p-3 bg-gray-50 rounded-md whitespace-pre-wrap">
                  {submission.comments}
                </p>
              </div>
            )}

            {/* Файлы */}
            {submission.files && submission.files.length > 0 && (
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Прикрепленные файлы
                </label>
                <div className="mt-2 space-y-2">
                  {submission.files.map((fileName, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-md"
                    >
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-sm">Файл {index + 1}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadFile(fileName)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Скачать
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Согласие */}
            <div>
              <label className="text-sm font-medium text-gray-500">
                Согласие на обработку данных
              </label>
              <div className="mt-1">
                <Badge variant={submission.consent ? "default" : "destructive"}>
                  {submission.consent ? "Дано" : "Не дано"}
                </Badge>
              </div>
            </div>

            {/* Данные опросника */}
            {submission.meta?.questionnaireData && (
              <div>
                <label className="text-sm font-medium text-gray-500 mb-3 block">
                  Данные опросного листа
                </label>
                <QuestionnaireViewer
                  questionnaireData={
                    submission.meta.questionnaireData as Record<string, unknown>
                  }
                />
              </div>
            )}

            {/* Прочие мета данные */}
            {submission.meta && !submission.meta.questionnaireData && (
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Дополнительные данные
                </label>
                <pre className="mt-1 p-3 bg-gray-50 rounded-md text-xs overflow-x-auto">
                  {JSON.stringify(submission.meta, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionViewDialog;
