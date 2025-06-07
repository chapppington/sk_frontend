import { FC, useState } from "react";
import { InfoIconProps } from "./types";
import Popover from "@/components/ui/Popover";

const InfoIcon: FC<InfoIconProps> = ({ popoverContent }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onMouseEnter={() => setIsPopoverOpen(true)}
        onMouseLeave={() => setIsPopoverOpen(false)}
        className="w-6 h-6 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <Popover
        content={popoverContent}
        isOpen={isPopoverOpen}
        onMouseEnter={() => setIsPopoverOpen(true)}
        onMouseLeave={() => setIsPopoverOpen(false)}
      />
    </div>
  );
};

export default InfoIcon;
