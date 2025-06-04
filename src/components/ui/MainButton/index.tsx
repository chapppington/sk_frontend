"use client";

import { FC, useRef } from "react";
import Link from "next/link";
import { IMainButtonProps } from "./types";
import { sizeStyles } from "./sizeStyles";

const MainButton: FC<IMainButtonProps> = ({
  text,
  onClick,
  className = "",
  size = "md",
  href = "#",
  disableRedirect = false,
}) => {
  const styles = sizeStyles[size];
  const anchorRef = useRef<HTMLAnchorElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);

  const buttonContent = (
    <div className={`flex items-center ${styles.padding}`}>
      <span
        className={`text-black ${styles.text} ${styles.fontSize} whitespace-nowrap select-none`}
      >
        {text}
      </span>
      <div
        className={`${styles.iconContainer} bg-black flex items-center justify-center ${styles.iconClipPathClass} ${styles.iconBorderRadiusClass}`}
      >
        <svg
          className={`${styles.icon} text-white`}
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
    className: `mt-6 inline-flex bg-white relative w-fit${
      className ? ` ${className}` : ""
    } ${styles.clipPathClass} ${styles.borderRadiusClass}`,
  };

  return disableRedirect ? (
    <div ref={divRef} {...commonProps}>
      {buttonContent}
    </div>
  ) : (
    <Link ref={anchorRef} href={href} {...commonProps}>
      {buttonContent}
    </Link>
  );
};

export default MainButton;
