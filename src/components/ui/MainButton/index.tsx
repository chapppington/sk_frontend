"use client";

import { FC, useRef } from "react";
import TransitionLink from "@/components/ui/TransitionLink";
import { IMainButtonProps } from "./types";
import { sizeStyles } from "./sizeStyles";
import stylesModule from "./styles.module.css";

const MainButton: FC<IMainButtonProps> = ({
  text,
  onClick,
  className = "",
  size = "md",
  href = "#",
  disableRedirect = false,
  transparent = false,
  fullWidth = false,
}) => {
  const styles = sizeStyles[size];
  const anchorRef = useRef<HTMLAnchorElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);

  const buttonContent = (
    <div
      className={`flex items-center ${
        fullWidth ? "justify-between w-full" : ""
      } ${styles.padding}`}
    >
      <span
        className={`${transparent ? "text-white" : "text-black"} ${
          styles.text
        } ${styles.fontSize} whitespace-nowrap select-none`}
      >
        {text}
      </span>
      <div
        className={`${styles.iconContainer} ${
          transparent ? "bg-white" : "bg-black"
        } flex items-center justify-center ${styles.iconClipPathClass} ${
          styles.iconBorderRadiusClass
        }`}
      >
        <svg
          className={`${styles.icon} ${
            transparent ? "text-black" : "text-white"
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 19.5l15-15 M19.5 19.5v-15 M4.5 4.5h15"
          />
        </svg>
      </div>
    </div>
  );

  const commonProps = {
    onClick,
    className: `mt-6 inline-flex ${
      transparent
        ? "bg-transparent border border-white main-btn-dark-fix"
        : "bg-white"
    } relative ${fullWidth ? "w-full" : "w-fit"}${
      className ? ` ${className}` : ""
    } ${styles.clipPathClass} ${styles.borderRadiusClass} ${
      transparent ? stylesModule["main-btn-dark-fix"] : ""
    }`,
  };

  if (disableRedirect) {
    return (
      <div ref={divRef} {...commonProps}>
        {buttonContent}
      </div>
    );
  }

  return (
    <TransitionLink ref={anchorRef} href={href} {...commonProps}>
      {buttonContent}
    </TransitionLink>
  );
};

export default MainButton;
