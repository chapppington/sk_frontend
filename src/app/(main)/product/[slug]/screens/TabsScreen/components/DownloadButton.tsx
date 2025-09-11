import { FC } from "react";
import { UPLOADS_URL } from "@/constants";

interface DownloadButtonProps {
  documentation?: string;
}

const DownloadButton: FC<DownloadButtonProps> = ({ documentation }) => {
  const handleDownload = () => {
    if (documentation) {
      const url = `${UPLOADS_URL}uploads/products/${documentation}`;
      console.log("Downloading file from URL:", url);
      const link = document.createElement("a");
      link.href = url;
      link.download = documentation;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!documentation) {
    return null;
  }

  return (
    <button
      onClick={handleDownload}
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
};

export default DownloadButton;
