import type { NavigationButtonProps } from "./types";
import { ChevronIcon } from "@/shared/icons/ChevronIcon";

export const NavigationButton = ({
  direction,
  sliderId,
  onClick,
  className = "",
}: NavigationButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-all duration-100 hover:scale-[0.97] active:scale-[0.85] slider-${direction}-${sliderId} ${className}`}
    >
      <ChevronIcon direction={direction} />
    </button>
  );
};
