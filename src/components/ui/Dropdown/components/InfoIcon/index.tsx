import { FC, useState } from "react";
import { InfoIconProps } from "./types";
import Popover from "@/components/ui/Popover";
import { Info } from "lucide-react";

const InfoIcon: FC<InfoIconProps> = ({
  popoverContent,
  color = "default",
  side = "right",
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isMobilePopupOpen, setIsMobilePopupOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.innerWidth < 768) {
      // md breakpoint
      setIsMobilePopupOpen(!isMobilePopupOpen);
    }
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMobilePopupOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onMouseEnter={() => setIsPopoverOpen(true)}
        onMouseLeave={() => setIsPopoverOpen(false)}
        onClick={handleClick}
        className="w-6 h-6 rounded-full flex items-center justify-center bg-transparent hover:bg-[#e3e3e3]/40 dark:hover:bg-[#333]/40 transition-colors"
      >
        <Info
          className={`w-4 h-4 ${
            color === "white" ? "text-white" : "text-[#202124] dark:text-[#fff]"
          }`}
          strokeWidth={2}
        />
      </button>

      {/* Desktop Popover */}
      <div className="hidden md:block">
        <Popover
          content={popoverContent}
          isOpen={isPopoverOpen}
          onMouseEnter={() => setIsPopoverOpen(true)}
          onMouseLeave={() => setIsPopoverOpen(false)}
          side={side}
        />
      </div>

      {/* Mobile Popup */}
      <div
        className={`md:hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${
          isMobilePopupOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-gray-800 rounded-lg p-4 max-w-[90vw] max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-white text-lg font-medium">Пояснение</h3>
            <button
              onClick={handleCloseClick}
              className={`text-white hover:text-white/70`}
            >
              ✕
            </button>
          </div>
          <div className={`text-white text-sm`}>{popoverContent}</div>
        </div>
      </div>
    </div>
  );
};

export default InfoIcon;
