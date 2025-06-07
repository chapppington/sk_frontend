"use client";

import { useRef, useEffect, FC, ReactNode } from "react";
import gsap from "gsap";
import { IPopoverProps } from "./types";

const Popover: FC<IPopoverProps> = ({
  content,
  isOpen,
  onMouseEnter,
  onMouseLeave,
  className = "",
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (popoverRef.current) {
      gsap.to(popoverRef.current, {
        opacity: isOpen ? 1 : 0,
        scale: isOpen ? 1 : 0.95,
        duration: 0.2,
        ease: "power2.out",
        visibility: isOpen ? "visible" : "hidden",
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={popoverRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute left-full top-1/2 -translate-y-1/2 ml-2 w-80 max-w-[calc(100vw-2rem)] p-3 bg-white/10 backdrop-blur-xl rounded-lg text-white text-sm z-50 invisible opacity-0 select-none
      md:left-full md:translate-x-0
      sm:left-1/2 sm:-translate-x-1/2 sm:ml-0 ${className}`}
      style={{
        maxWidth: "calc(100vw - 2rem)",
        wordBreak: "break-word",
        overflowWrap: "break-word",
      }}
    >
      {content}
    </div>
  );
};

export default Popover;
