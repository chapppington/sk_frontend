import Link from "next/link";
import { FC } from "react";

interface MainButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}

const sizeStyles = {
  sm: {
    text: "text-sm font-base",
    padding: "pl-4 pr-[2px] py-[2px]",
    iconSize: "w-10 h-10",
    iconContainer: "w-10 h-10 ml-4",
    icon: "w-5 h-5",
    fontSize: "text-[14px]",
    clipPath:
      "polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)",
    borderRadius: "8px",
    iconClipPath:
      "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)",
    iconBorderRadius: "6px",
  },
  md: {
    text: "text-base font-base",
    padding: "pl-6 pr-[2px] py-[2px]",
    iconSize: "w-12 h-12",
    iconContainer: "w-12 h-12 ml-6",
    icon: "w-6 h-6",
    fontSize: "text-[16px]",
    clipPath:
      "polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%)",
    borderRadius: "9px",
    iconClipPath:
      "polygon(0 0, 100% 0, 100% calc(100% - 17px), calc(100% - 17px) 100%, 0 100%)",
    iconBorderRadius: "7px",
  },
  lg: {
    text: "text-lg font-semibold",
    padding: "pl-8 pr-[2px] py-[2px]",
    iconSize: "w-14 h-14",
    iconContainer: "w-14 h-14 ml-8",
    icon: "w-7 h-7",
    fontSize: "text-[18px]",
    clipPath:
      "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
    borderRadius: "10px",
    iconClipPath:
      "polygon(0 0, 100% 0, 100% calc(100% - 19px), calc(100% - 19px) 100%, 0 100%)",
    iconBorderRadius: "8px",
  },
  xl: {
    text: "text-xl font-semibold",
    padding: "pl-10 pr-[2px] py-[2px]",
    iconSize: "w-16 h-16",
    iconContainer: "w-16 h-16 ml-10",
    icon: "w-8 h-8",
    fontSize: "text-[20px]",
    clipPath:
      "polygon(0 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%)",
    borderRadius: "11px",
    iconClipPath:
      "polygon(0 0, 100% 0, 100% calc(100% - 21px), calc(100% - 21px) 100%, 0 100%)",
    iconBorderRadius: "9px",
  },
  "2xl": {
    text: "text-2xl font-bold",
    padding: "pl-12 pr-[2px] py-[2px]",
    iconSize: "w-20 h-20",
    iconContainer: "w-20 h-20 ml-12",
    icon: "w-10 h-10",
    fontSize: "text-[24px]",
    clipPath:
      "polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%)",
    borderRadius: "12px",
    iconClipPath:
      "polygon(0 0, 100% 0, 100% calc(100% - 23px), calc(100% - 23px) 100%, 0 100%)",
    iconBorderRadius: "10px",
  },
};

const MainButton: FC<MainButtonProps> = ({
  text,
  onClick,
  className = "",
  size = "md",
}) => {
  const styles = sizeStyles[size];

  return (
    <Link
      href="#"
      onClick={onClick}
      className={`mt-6 inline-flex bg-white relative w-fit ${className}`}
      style={{
        clipPath: styles.clipPath,
        borderRadius: styles.borderRadius,
      }}
    >
      <div className={`flex items-center ${styles.padding}`}>
        <span
          className={`text-black ${styles.text} ${styles.fontSize} whitespace-nowrap`}
        >
          {text}
        </span>
        <div
          className={`${styles.iconContainer} bg-black flex items-center justify-center`}
          style={{
            clipPath: styles.iconClipPath,
            borderRadius: styles.iconBorderRadius,
          }}
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
    </Link>
  );
};

export default MainButton;
