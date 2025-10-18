import React from "react";
import { Badge } from "@/components/ui/shadcn/badge";
import { questionsConfig } from "@/app/(main)/questionnaire/config/questions";

type QuestionnaireViewerProps = {
  questionnaireData: Record<string, unknown>;
};

const QuestionnaireViewer: React.FC<QuestionnaireViewerProps> = ({
  questionnaireData,
}) => {
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
        <div className="text-gray-400 italic text-sm">Не заполнено</div>
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
                className="flex justify-between items-center py-2 px-3 bg-blue-50 rounded border border-blue-100"
              >
                <span className="font-medium text-blue-800">{key}:</span>
                <span className="text-blue-900 font-semibold">{val}</span>
              </div>
            ))}
          </div>
        );
      }

      return (
        <pre className="text-xs bg-gray-50 p-3 rounded border overflow-x-auto whitespace-pre-wrap">
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
        <div className="bg-gray-50 p-3 rounded border">
          <div className="text-gray-900 whitespace-pre-wrap">
            {getAnswerLabel(questionId, value)}
          </div>
        </div>
      );
    }

    // Для чисел и остальных типов
    return (
      <div className="font-medium text-gray-900">
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

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 pb-2 border-b">
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          Опросный лист
        </Badge>
        <span className="text-sm text-gray-500">
          {filledAnswers.length} {filledAnswers.length === 1 ? 'ответ' : filledAnswers.length < 5 ? 'ответа' : 'ответов'}
        </span>
      </div>

      <div className="space-y-3">
        {filledAnswers.map(([questionId, value]) => {
          const question = questionsConfig.find(
            (q) => q.id === parseInt(questionId)
          );

          return (
            <div
              key={questionId}
              className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-800 leading-tight flex-1">
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
                  <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                    📖 Подробное описание
                  </summary>
                  <div className="mt-2 text-xs text-gray-600 bg-gray-50 p-3 rounded border">
                    {question.popoverContent}
                  </div>
                </details>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionnaireViewer;
