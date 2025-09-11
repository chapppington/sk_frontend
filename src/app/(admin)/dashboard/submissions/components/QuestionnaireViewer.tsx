import React from "react";
import { Badge } from "@/components/ui/shadcn/badge";
import { questionsConfig } from "@/app/(main)/questionnaire/config/questions";

type QuestionnaireViewerProps = {
  questionnaireData: Record<string, unknown>;
};

const QuestionnaireViewer: React.FC<QuestionnaireViewerProps> = ({
  questionnaireData,
}) => {
  // Если данные пришли как строка, парсим их
  let parsedData = questionnaireData;
  if (typeof questionnaireData === "string") {
    try {
      parsedData = JSON.parse(questionnaireData);
    } catch (e) {
      console.error("Failed to parse questionnaire data:", e);
      return <div>Ошибка парсинга данных опросника</div>;
    }
  }

  // Если данные разбились на символы (объект с числовыми ключами), собираем обратно
  if (
    typeof parsedData === "object" &&
    parsedData !== null &&
    Object.keys(parsedData).every((key) => !isNaN(Number(key)))
  ) {
    try {
      const reconstructed = Object.values(parsedData).join("");
      parsedData = JSON.parse(reconstructed);
    } catch (e) {
      console.error("Failed to reconstruct questionnaire data:", e);
      return <div>Ошибка восстановления данных опросника</div>;
    }
  }
  const getQuestionTitle = (questionId: string) => {
    const question = questionsConfig.find((q) => q.id === parseInt(questionId));
    return question?.title || `Вопрос ${questionId}`;
  };

  const getAnswerLabel = (questionId: string, value: unknown) => {
    const question = questionsConfig.find((q) => q.id === parseInt(questionId));

    if (!question) return String(value);

    // Обработка различных типов ответов
    if (Array.isArray(value)) {
      return value
        .map((v) => {
          const option = question.options?.find((opt) => opt.value === v);
          return option?.label || v;
        })
        .join(", ");
    }

    if (typeof value === "object" && value !== null) {
      // Обработка сложных объектов (например, для фидерных секций)
      if (question.type === "feeder_sections") {
        return Object.entries(value as Record<string, any>)
          .map(([key, val]) => `${key}: ${val}`)
          .join(", ");
      }
      return JSON.stringify(value, null, 2);
    }

    // Поиск лейбла для простых значений
    const option = question.options?.find((opt) => opt.value === value);
    return option?.label || String(value);
  };

  const formatValue = (questionId: string, value: unknown) => {
    const question = questionsConfig.find((q) => q.id === parseInt(questionId));

    if (typeof value === "object" && value !== null) {
      // Для фидерных секций показываем в удобном формате
      if (question?.type === "feeder_sections") {
        return (
          <div className="space-y-2">
            {Object.entries(value as Record<string, any>).map(([key, val]) => (
              <div
                key={key}
                className="flex justify-between items-center py-2 px-3 bg-blue-50 rounded border"
              >
                <span className="font-medium text-blue-800">{key}:</span>
                <span className="text-blue-900 font-semibold">{val}</span>
              </div>
            ))}
          </div>
        );
      }

      // Для других объектов показываем JSON
      return (
        <pre className="text-xs bg-gray-50 p-3 rounded border overflow-x-auto whitespace-pre-wrap">
          {JSON.stringify(value, null, 2)}
        </pre>
      );
    }

    // Специальная обработка для разных типов вопросов
    if (question?.type === "text") {
      return (
        <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
          <div className="text-sm text-yellow-800 font-medium mb-1">
            Текстовый ответ:
          </div>
          <div className="text-gray-900 whitespace-pre-wrap">
            {String(value)}
          </div>
        </div>
      );
    }

    if (question?.type === "slider") {
      return (
        <div className="bg-green-50 p-3 rounded border border-green-200">
          <div className="flex items-center gap-2">
            <span className="text-sm text-green-800 font-medium">
              Значение:
            </span>
            <span className="text-lg font-bold text-green-900">
              {String(value)}
            </span>
          </div>
        </div>
      );
    }

    // Обычные ответы с выбором
    return (
      <div className="bg-white p-3 rounded border border-gray-200 shadow-sm">
        <span className="font-medium text-gray-900">
          {getAnswerLabel(questionId, value)}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-700 border-blue-200"
        >
          Опросный лист
        </Badge>
        <span className="text-sm text-gray-500">
          {Object.keys(parsedData).length} ответов
        </span>
      </div>

      <div className="space-y-3">
        {Object.entries(parsedData)
          .filter(
            ([_, value]) =>
              value && !(Array.isArray(value) && value.length === 0)
          )
          .sort(([a], [b]) => parseInt(a) - parseInt(b)) // Сортируем по номеру вопроса
          .map(([questionId, value]) => {
            const question = questionsConfig.find(
              (q) => q.id === parseInt(questionId)
            );

            return (
              <div
                key={questionId}
                className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-sm font-semibold text-gray-800 leading-tight">
                    {getQuestionTitle(questionId)}
                  </h4>
                  {question?.popoverContent && (
                    <div className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {question.type || "выбор"}
                    </div>
                  )}
                </div>

                <div className="text-sm">{formatValue(questionId, value)}</div>

                {question?.popoverContent && (
                  <details className="mt-3">
                    <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                      Подробное описание
                    </summary>
                    <div className="mt-2 text-xs text-gray-600 bg-gray-50 p-2 rounded border">
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
