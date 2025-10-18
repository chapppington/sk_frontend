import React from "react";

type QuestionnaireViewerProps = {
  questionnaireData: Record<string, unknown>;
};

const QuestionnaireViewer: React.FC<QuestionnaireViewerProps> = ({
  questionnaireData,
}) => {
  // Просто показываем сырые данные с бэкенда
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold mb-2">Сырые данные с бэкенда:</h4>
        <pre className="p-4 bg-gray-100 rounded text-xs overflow-x-auto max-h-96 overflow-y-auto">
          {JSON.stringify(questionnaireData, null, 2)}
        </pre>
      </div>
      
      <div className="text-xs text-gray-500">
        <p>Тип данных: <code className="bg-gray-200 px-1 rounded">{typeof questionnaireData}</code></p>
        <p>Количество ключей: <code className="bg-gray-200 px-1 rounded">
          {questionnaireData && typeof questionnaireData === 'object' ? Object.keys(questionnaireData).length : 'N/A'}
        </code></p>
        {questionnaireData && typeof questionnaireData === 'object' && Object.keys(questionnaireData).length > 0 && (
          <p>Первые ключи: <code className="bg-gray-200 px-1 rounded">
            {Object.keys(questionnaireData).slice(0, 10).join(', ')}
          </code></p>
        )}
      </div>
    </div>
  );
};

export default QuestionnaireViewer;
