import React from "react";
import Image from "next/image";

interface GoogleSnippetProps {
  title: string;
  description: string;
  url: string;
  renderDescription: (desc: string) => React.ReactNode;
  truncateWithEllipsis: (text: string, max: number) => string;
}

export function GoogleSnippet({
  title,
  description,
  url,
  renderDescription,
  truncateWithEllipsis,
}: GoogleSnippetProps) {
  return (
    <div className="flex flex-col gap-0 rounded-xl p-4 max-w-[600px] mx-auto min-h-[90px] border border-[#e3e3e3] shadow-sm bg-background dark:bg-[#202124] dark:border-[#333]">
      <div className="flex items-center gap-2 mb-1">
        {/* Favicon */}
        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center border border-[#e3e3e3] dark:border-[#333]">
          <Image
            src="/favicon.ico"
            alt="favicon"
            width={32}
            height={32}
            className="w-8 h-8 object-contain rounded-full"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>
        <div className="flex flex-col">
          {/* Название сайта */}
          <span className="text-[13px] font-normal text-[#202124] dark:text-[#fff] leading-tight">
            Сибкомплект
          </span>
          {/* URL */}
          <span className="text-[12px] font-medium text-[#5f6368] dark:text-[#bdc1c6] leading-tight">
            {url}
          </span>
        </div>
      </div>
      {/* Заголовок */}
      <div
        className="text-[16px] font-bold leading-tight mt-1 mb-0.5 break-words text-[#1a0dab] dark:text-[#8ab4f8]"
        style={{ wordBreak: "break-word" }}
      >
        {truncateWithEllipsis(title || "Заголовок страницы", 60)}
      </div>
      {/* Описание */}
      <div className="text-[13px] leading-snug break-words text-foreground dark:text-[#bdc1c6] mt-1">
        {renderDescription(
          truncateWithEllipsis(description || "Описание страницы", 160)
        )}
      </div>
    </div>
  );
}
