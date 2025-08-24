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
  alwaysOpenOnMobile = false,
  hidePlusButton = false,
  infoIconColor = "default",
  infoIconSide = "right",
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // If alwaysOpenOnMobile and on mobile, force open
  useEffect(() => {
    if (alwaysOpenOnMobile && isMobile) {
      setIsOpen(true);
    }
  }, [alwaysOpenOnMobile, isMobile]);

  // Show info icon if popoverContent exists
  const shouldShowInfoIcon = !!popoverContent;

  // Toggle animation
  useEffect(() => {
    if (contentRef.current) {
      // Animate content for all toggles
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

  return (
    <div className="dropdown border-t border-white/10 py-8 relative">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => {
          if (!(alwaysOpenOnMobile && isMobile)) setIsOpen((prev) => !prev);
        }}
      >
        <div className="flex items-center gap-2">
          <h3 className="text-white text-2xl font-light select-none">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {shouldShowInfoIcon && (
            <InfoIcon
              popoverContent={popoverContent}
              color={infoIconColor}
              side={infoIconSide}
            />
          )}
          {!hidePlusButton && <PlusButton isOpen={isOpen} />}
        </div>
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
