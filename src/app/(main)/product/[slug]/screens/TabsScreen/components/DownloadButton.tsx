import { FC } from "react";
import { DocumentationItem } from "@/shared/types/product.types";

interface DownloadButtonProps {
  documentation?: DocumentationItem[];
}

const DownloadButton: FC<DownloadButtonProps> = ({ documentation = [] }) => {
  const handleDownload = (doc: DocumentationItem) => {
    window.open(doc.url, "_blank");
  };

  if (!documentation || documentation.length === 0) {
    return null;
  }

  if (documentation.length === 1) {
    return (
      <button
        onClick={() => handleDownload(documentation[0])}
        className="flex items-center text-white border-b border-white hover:opacity-80"
      >
        <span>Скачать документацию</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 ml-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    );
  }

  return (
    <div className="space-y-2">
      <span className="text-white text-sm">Документация:</span>
      {documentation.map((doc, index) => (
        <button
          key={index}
          onClick={() => handleDownload(doc)}
          className="flex items-center text-white border-b border-white hover:opacity-80 text-sm"
        >
          <span>{doc.title}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      ))}
    </div>
  );
};

export default DownloadButton;
