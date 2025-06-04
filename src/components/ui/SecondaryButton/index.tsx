import { FC } from "react";
import { ISecondaryButtonProps } from "@/components/ui/SecondaryButton/types";
import Link from "next/link";

const SecondaryButton: FC<ISecondaryButtonProps> = ({
  href,
  text,
  className = "",
}) => {
  return (
    <Link
      href={href}
      className={`flex items-center text-white/60 text-lg font-light hover:text-white transition-colors ${className}`}
    >
      <span>{text}</span>
      <svg
        className="ml-2 w-7 h-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        viewBox="0 0 32 32"
      >
        <path d="M8 8 L24 24" />
        <path d="M24 8 L24 24 L8 24" />
      </svg>
    </Link>
  );
};

export default SecondaryButton;
