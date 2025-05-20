"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";

export interface DropdownProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export default function Dropdown({
  title,
  defaultOpen = false,
  children,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const plusIconRef = useRef<HTMLButtonElement>(null);

  // Toggle animation
  useEffect(() => {
    if (contentRef.current && plusIconRef.current) {
      // Animate content
      gsap.to(contentRef.current, {
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          // Dispatch the layoutchange event when animation completes
          window.dispatchEvent(new CustomEvent("layoutchange"));

          // Additional dispatch after a small delay to catch any post-animation layout changes
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent("layoutchange"));
          }, 100);
        },
      });

      // Animate plus icon
      gsap.to(plusIconRef.current, {
        rotation: isOpen ? 45 : 0,
        duration: 0.07,
        ease: "power1.inOut",
      });

      // Also dispatch the event immediately when dropdown state changes
      window.dispatchEvent(new CustomEvent("layoutchange"));
    }
  }, [isOpen]);

  return (
    <div className="dropdown border-t border-white/10 py-8 relative">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-white text-2xl font-light select-none">{title}</h3>
        <button
          ref={plusIconRef}
          className="plus-icon w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200 ease-in-out cursor-pointer hover:bg-white/10"
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
}
