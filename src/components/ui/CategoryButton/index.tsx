"use client";

import { FC } from "react";
import { ICategoryButtonProps } from "@/components/ui/CategoryButton/types";

const CategoryButton: FC<ICategoryButtonProps> = ({
  isActive = false,
  children,
  className = "",
  ref,
  ...props
}) => {
  return (
    <button
      ref={ref}
      className={`w-fit inline-block text-left px-4 py-3 rounded-lg transition-all duration-200 border select-none ${
        isActive
          ? "text-white bg-white/10 border-white/20 hover:scale-[0.99] active:scale-[0.93]"
          : "text-white/80 hover:text-white hover:bg-white/5 border-white/10 hover:scale-[0.99] active:scale-[0.93]"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CategoryButton;