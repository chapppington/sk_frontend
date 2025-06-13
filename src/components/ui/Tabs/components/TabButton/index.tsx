import { FC } from "react";
import { TabButtonProps, ButtonSize } from "./types";

export const TabButton: FC<TabButtonProps> = ({
  value,
  label,
  isActive,
  onClick,
  size = "md",
}) => {
  const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      data-value={value}
      onClick={() => onClick(value)}
      className={`${
        sizeClasses[size]
      } font-medium transition-colors duration-200 ${
        isActive ? "text-white" : "text-white/60 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
};
