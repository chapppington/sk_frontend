"use client";

import { FC } from "react";
import TransitionLink from "@/components/ui/TransitionLink";
import { ICircleIconButtonProps } from "./types";

const CircleIconButton: FC<ICircleIconButtonProps> = ({
  href,
  text,
  className = "",
  onClick,
  ...props
}) => {
  return (
    <TransitionLink
      href={href}
      className={`inline-flex items-center space-x-2 text-white hover:text-white/80 transition-colors group hover:scale-[0.99] active:scale-[0.93] transition-transform ${className}`}
      onClick={onClick}
    >
      <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transform rotate-[-45deg]"
        >
          <path
            d="M5 12H19M19 12L12 5M19 12L12 19"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {text && <span className="text-lg pl-4">{text}</span>}
    </TransitionLink>
  );
};

export default CircleIconButton;
