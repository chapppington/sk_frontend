import { FC, useRef, useEffect } from "react";
import gsap from "gsap";
import { PlusButtonProps } from "./types";

const PlusButton: FC<PlusButtonProps> = ({
  isOpen = false,
  onClick,
  className = "",
}) => {
  const plusIconRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (plusIconRef.current) {
      gsap.to(plusIconRef.current, {
        rotation: isOpen ? 45 : 0,
        duration: 0.07,
        ease: "power1.inOut",
      });
    }
  }, [isOpen]);

  return (
    <button
      ref={plusIconRef}
      onClick={onClick}
      className={`plus-icon w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200 ease-in-out cursor-pointer hover:bg-white/10 flex-shrink-0 ${className}`}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12 6v12M6 12h12"
        />
      </svg>
    </button>
  );
};

export default PlusButton;
