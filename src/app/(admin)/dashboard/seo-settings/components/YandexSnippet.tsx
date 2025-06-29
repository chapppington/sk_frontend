import React from "react";

interface YandexSnippetProps {
  title: string;
  url: string;
  description: string;
  renderDescription: (desc: string) => React.ReactNode;
  truncateWithEllipsis: (text: string, max: number) => string;
}

export function YandexSnippet({
  title,
  url,
  description,
  renderDescription,
  truncateWithEllipsis,
}: YandexSnippetProps) {
  return (
    <div className="flex flex-row gap-3 rounded-xl p-4 max-w-[600px] mx-auto min-h-[90px] border border-[#e3e3e3] shadow-sm bg-background dark:bg-[#202124] dark:border-[#333]">
      {/* Фавикон слева */}
      <div className="flex flex-col items-center min-w-[40px]">
        <div className="w-7 h-7 rounded bg-white flex items-center justify-center">
          <img
            src="/favicon.ico"
            alt="favicon"
            className="w-6 h-6 object-contain rounded"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>
      </div>
      {/* Контент справа */}
      <div className="flex-1 flex flex-col gap-0">
        {/* Заголовок */}
        <div
          className="text-[16px] font-bold leading-tight mb-1 break-words text-[#1a0dab] dark:text-[#8ab4f8]"
          style={{ wordBreak: "break-word" }}
        >
          {truncateWithEllipsis(title || "Заголовок страницы", 60)}
        </div>
        {/* URL */}
        <div className="text-[13px] font-medium mb-1 text-[#4caf50] dark:text-[#bdc1c6]">
          {url}
        </div>
        {/* Описание */}
        <div className="text-[13px] leading-snug break-words text-foreground dark:text-[#bdc1c6]">
          {renderDescription(
            truncateWithEllipsis(description || "Описание страницы", 160)
          )}
        </div>
      </div>
    </div>
  );
}
