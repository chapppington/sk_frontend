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
  side = "right",
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
      className={`absolute ${
        side === "right" ? "left-full ml-2" : "right-full mr-2"
      } top-1/2 -translate-y-1/2 w-80 max-w-[calc(100vw-2rem)] p-3 bg-gray-800 rounded-lg text-white text-sm z-50 invisible opacity-0 select-none ${className}`}
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
