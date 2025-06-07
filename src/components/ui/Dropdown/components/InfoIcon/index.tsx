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
        className="w-6 h-6 rounded-full flex items-center justify-center text-white hover:text-white hover:bg-white/30 transition-colors border border-white"
      >
        <span className="text-sm select-none">?</span>
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
