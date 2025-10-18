import React, { useState } from "react";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import { questionsConfig } from "@/app/(main)/questionnaire/config/questions";

type QuestionnaireViewerProps = {
  questionnaireData: Record<string, unknown>;
};

const QuestionnaireViewer: React.FC<QuestionnaireViewerProps> = ({
  questionnaireData,
}) => {
  const [viewMode, setViewMode] = useState<"full" | "compact">("compact");
  const getQuestionTitle = (questionId: string) => {
    const question = questionsConfig.find((q) => q.id === parseInt(questionId));
    return question?.title || `Вопрос ${questionId}`;
  };

  const getAnswerLabel = (questionId: string, value: unknown): string => {
    const question = questionsConfig.find((q) => q.id === parseInt(questionId));
    
    if (!question) return String(value);

    // Если значение - массив (множественный выбор)
    if (Array.isArray(value)) {
      if (value.length === 0) return "—";
      return value
        .map((v) => {
          const option = question.options?.find((opt) => opt.value === v);
          return option?.label || v;
        })
        .join(", ");
    }

    // Если значение - объект (например, для feeder_sections)
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value, null, 2);
    }

    // Если пустое значение
    if (value === "" || value === null || value === undefined) {
      return "—";
    }

    // Ищем соответствующий option
    const option = question.options?.find((opt) => opt.value === value);
    return option?.label || String(value);
  };

  const formatValue = (questionId: string, value: unknown) => {
    const question = questionsConfig.find((q) => q.id === parseInt(questionId));

    // Пустые значения
    if (
      value === "" ||
      value === null ||
      value === undefined ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return (
        <div className="text-gray-400 dark:text-gray-500 italic text-sm">Не заполнено</div>
      );
    }

    // Для объектов (например, feeder_sections)
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      if (question?.type === "feeder_sections") {
        return (
          <div className="space-y-2">
            {Object.entries(value as Record<string, any>).map(([key, val]) => (
              <div
                key={key}
                className="flex justify-between items-center py-2 px-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-100 dark:border-blue-800"
              >
                <span className="font-medium text-blue-800 dark:text-blue-300">{key}:</span>
                <span className="text-blue-900 dark:text-blue-200 font-semibold">{val}</span>
              </div>
            ))}
          </div>
        );
      }

      return (
        <pre className="text-xs bg-gray-50 dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700 overflow-x-auto whitespace-pre-wrap text-gray-900 dark:text-gray-100">
          {JSON.stringify(value, null, 2)}
        </pre>
      );
    }

    // Для массивов (множественный выбор)
    if (Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-2">
          {value.map((v, idx) => {
            const option = question?.options?.find((opt) => opt.value === v);
            return (
              <Badge key={idx} variant="secondary" className="text-sm">
                {option?.label || v}
              </Badge>
            );
          })}
        </div>
      );
    }

    // Для текстовых ответов
    if (question?.type === "text" || typeof value === "string") {
      return (
        <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700">
          <div className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
            {getAnswerLabel(questionId, value)}
          </div>
        </div>
      );
    }

    // Для чисел и остальных типов
    return (
      <div className="font-medium text-gray-900 dark:text-gray-100">
        {getAnswerLabel(questionId, value)}
      </div>
    );
  };

  // Фильтруем только заполненные ответы и сортируем по ID вопроса
  const filledAnswers = Object.entries(questionnaireData)
    .filter(
      ([_, value]) =>
        value !== "" &&
        value !== null &&
        value !== undefined &&
        !(Array.isArray(value) && value.length === 0)
    )
    .sort(([a], [b]) => parseInt(a) - parseInt(b));

  // Компактное представление
  const renderCompactView = () => (
    <div className="space-y-2">
      {filledAnswers.map(([questionId, value]) => {
        const question = questionsConfig.find(
          (q) => q.id === parseInt(questionId)
        );

        return (
          <div
            key={questionId}
            className="flex items-start gap-3 py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors"
          >
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 min-w-[30px]">
              {questionId.padStart(2, '0')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {question?.title?.replace(/^\d+\s*·\s*/, '') || `Вопрос ${questionId}`}
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {getAnswerLabel(questionId, value)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // Полное представление
  const renderFullView = () => (
    <div className="space-y-3">
      {filledAnswers.map(([questionId, value]) => {
        const question = questionsConfig.find(
          (q) => q.id === parseInt(questionId)
        );

        return (
          <div
            key={questionId}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-tight flex-1">
                {getQuestionTitle(questionId)}
              </h4>
              {question?.type && (
                <Badge variant="outline" className="ml-2 text-xs">
                  {question.type}
                </Badge>
              )}
            </div>

            <div className="text-sm">{formatValue(questionId, value)}</div>

            {question?.popoverContent && (
              <details className="mt-3">
                <summary className="text-xs text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">
                  📖 Подробное описание
                </summary>
                <div className="mt-2 text-xs text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700">
                  {question.popoverContent}
                </div>
              </details>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
            Опросный лист
          </Badge>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {filledAnswers.length} {filledAnswers.length === 1 ? 'ответ' : filledAnswers.length < 5 ? 'ответа' : 'ответов'}
          </span>
        </div>
        
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <Button
            variant={viewMode === "compact" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("compact")}
            className="h-7 text-xs"
          >
            Кратко
          </Button>
          <Button
            variant={viewMode === "full" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("full")}
            className="h-7 text-xs"
          >
            Подробно
          </Button>
        </div>
      </div>

      {viewMode === "compact" ? renderCompactView() : renderFullView()}
    </div>
  );
};

export default QuestionnaireViewer;
