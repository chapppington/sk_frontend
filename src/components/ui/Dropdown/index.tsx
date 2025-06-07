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
  const isFirstRender = useRef(true);

  // Show info icon if popoverContent exists
  const shouldShowInfoIcon = !!popoverContent;

  // Toggle animation
  useEffect(() => {
    if (contentRef.current) {
      // Skip animation on first render if defaultOpen is true
      if (isFirstRender.current && defaultOpen) {
        gsap.set(contentRef.current, {
          height: "auto",
          opacity: 1,
        });
        isFirstRender.current = false;
        return;
      }

      // Animate content for subsequent toggles
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
  }, [isOpen, lenis, defaultOpen]);

  // Reset isFirstRender when defaultOpen changes
  useEffect(() => {
    isFirstRender.current = true;
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
          height: defaultOpen ? "auto" : 0,
          opacity: defaultOpen ? 1 : 0,
        }}
      >
        <div className="pt-6">{children}</div>
      </div>
    </div>
  );
};

export default Dropdown;
