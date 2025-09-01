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
      return JSON.stringify(value, null, 2);
    }

    // Поиск лейбла для простых значений
    const option = question.options?.find((opt) => opt.value === value);
    return option?.label || String(value);
  };

  const formatValue = (value: unknown) => {
    if (typeof value === "object" && value !== null) {
      return (
        <pre className="text-xs bg-gray-50 p-2 rounded border overflow-x-auto">
          {JSON.stringify(value, null, 2)}
        </pre>
      );
    }
    return <span className="font-medium">{String(value)}</span>;
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

      <div className="grid gap-4">
        {Object.entries(parsedData).map(([questionId, value]) => {
          if (!value || (Array.isArray(value) && value.length === 0))
            return null;

          return (
            <div key={questionId} className="border rounded-lg p-4 bg-gray-50">
              <div className="mb-2">
                <h4 className="text-sm font-medium text-gray-700">
                  {getQuestionTitle(questionId)}
                </h4>
              </div>

              <div className="text-sm text-gray-900">
                {typeof value === "object" && value !== null ? (
                  formatValue(value)
                ) : (
                  <div className="bg-white p-2 rounded border">
                    {getAnswerLabel(questionId, value)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionnaireViewer;
