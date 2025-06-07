import { FC, useState } from "react";
import { InfoIconProps } from "./types";
import Popover from "@/components/ui/Popover";

const InfoIcon: FC<InfoIconProps> = ({ popoverContent }) => {
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
        onMouseEnter={() => setIsPopoverOpen(true)}
        onMouseLeave={() => setIsPopoverOpen(false)}
        onClick={handleClick}
        className="w-6 h-6 rounded-full flex items-center justify-center text-white hover:text-white hover:bg-white/30 transition-colors border border-white"
      >
        <span className="text-sm select-none">?</span>
      </button>

      {/* Desktop Popover */}
      <div className="hidden md:block">
        <Popover
          content={popoverContent}
          isOpen={isPopoverOpen}
          onMouseEnter={() => setIsPopoverOpen(true)}
          onMouseLeave={() => setIsPopoverOpen(false)}
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
              className="text-white hover:text-white/70"
            >
              ✕
            </button>
          </div>
          <div className="text-white text-sm">{popoverContent}</div>
        </div>
      </div>
    </div>
  );
};

export default InfoIcon;
