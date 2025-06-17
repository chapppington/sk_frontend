import { FC } from "react";
import { CatalogTabButtonProps } from "./types";

const CatalogTabButton: FC<CatalogTabButtonProps> = ({
  label,
  isActive,
  onClick,
}) => {
  return (
    <div className="relative flex flex-col items-start group flex-1 xl:flex-none">
      <button
        onClick={onClick}
        className={`text-xl pb-4 transition-colors duration-300 w-full xl:w-[240px] text-left ${
          isActive ? "text-white" : "text-white/60"
        }`}
      >
        {label}
      </button>
      <div
        className={`w-full xl:w-[240px] h-[2px] transition-transform duration-300 ${
          isActive ? "bg-white scale-x-100" : "bg-gray-500 scale-x-95"
        }`}
      />
    </div>
  );
};

export default CatalogTabButton;
