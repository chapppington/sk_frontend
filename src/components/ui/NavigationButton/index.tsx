import type { NavigationButtonProps } from "../types";

export const NavigationButton = ({
  direction,
  sliderId,
}: NavigationButtonProps) => {
  return (
    <button
      className={`w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors slider-${direction}-${sliderId}`}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d={direction === "next" ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
        />
      </svg>
    </button>
  );
};
