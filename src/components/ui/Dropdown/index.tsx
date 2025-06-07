"use client";

import gsap from "gsap";
import { useState, useRef, useEffect, FC } from "react";
import { useLenis } from "lenis/react";
import PlusButton from "./components/PlusButton";
import InfoIcon from "./components/InfoIcon";

import { IDropdownProps } from "@/components/ui/Dropdown/types";

const Dropdown: FC<IDropdownProps> = ({
  title,
  defaultOpen = false,
  children,
  popoverContent,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // Show info icon if popoverContent exists
  const shouldShowInfoIcon = !!popoverContent;

  // Toggle animation
  useEffect(() => {
    if (contentRef.current) {
      // Animate content
      gsap.to(contentRef.current, {
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          // Update Lenis after animation completes
          if (lenis) {
            lenis.resize();
          }
        },
      });
    }
  }, [isOpen, lenis]);

  // Update isOpen state when defaultOpen prop changes
  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [defaultOpen]);

  return (
    <div className="dropdown border-t border-white/10 py-8 relative">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <h3 className="text-white text-2xl font-light select-none">
            {title}
          </h3>
          {shouldShowInfoIcon && <InfoIcon popoverContent={popoverContent} />}
        </div>
        <PlusButton isOpen={isOpen} />
      </div>

      <div
        ref={contentRef}
        className="faq-content overflow-hidden"
        style={{
          height: 0,
          opacity: 0,
        }}
      >
        <div className="pt-6">{children}</div>
      </div>
    </div>
  );
};

export default Dropdown;
