import type { NavigationButtonProps } from "./types";
import { ChevronIcon } from "@/shared/icons/ChevronIcon";
import React from "react";

export const NavigationButton = React.forwardRef<
  HTMLButtonElement,
  NavigationButtonProps
>(({ direction, sliderId, onClick, className = "" }, ref) => {
  const ariaLabel =
    direction === "prev" ? "Предыдущий слайд" : "Следующий слайд";

  return (
    <button
      ref={ref}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-all duration-100 hover:scale-[0.97] active:scale-[0.85] slider-${direction}-${sliderId} ${className}`}
    >
      <ChevronIcon direction={direction} />
    </button>
  );
});

NavigationButton.displayName = "NavigationButton";
