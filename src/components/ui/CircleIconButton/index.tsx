"use client";

import { FC, ButtonHTMLAttributes } from "react";
import TransitionLink from "@/components/ui/TransitionLink";
import { ICircleIconButtonProps } from "./types";
import CircleWithArrowIcon from "@/icons/CircleWithArrowIcon";

const CircleIconButton: FC<ICircleIconButtonProps> = ({
  href,
  text,
  className = "",
  onClick,
  ...props
}) => {
  const buttonContent = (
    <>
      <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors">
        <CircleWithArrowIcon />
      </div>
      {text && <span className="text-lg pl-4">{text}</span>}
    </>
  );

  if (href) {
    return (
      <TransitionLink
        href={href}
        className={`inline-flex items-center space-x-2 text-white hover:text-white/80 transition-colors group hover:scale-[0.99] active:scale-[0.93] transition-transform ${className}`}
        onClick={onClick}
        {...props}
      >
        {buttonContent}
      </TransitionLink>
    );
  }

  return (
    <button
      type="button"
      className={`inline-flex items-center space-x-2 text-white hover:text-white/80 transition-colors group hover:scale-[0.99] active:scale-[0.93] transition-transform ${className}`}
      onClick={onClick}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {buttonContent}
    </button>
  );
};

export default CircleIconButton;
