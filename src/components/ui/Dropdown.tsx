"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";

interface Document {
  title: string;
  link: string;
}

export interface DropdownProps {
  title: string;
  content?: string;
  documents?: Document[];
  defaultOpen?: boolean;
  customContent?: ReactNode;
}

export default function Dropdown({
  title,
  content,
  documents,
  defaultOpen = false,
  customContent,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const plusIconRef = useRef<HTMLButtonElement>(null);
  const docLinksRef = useRef<HTMLDivElement[]>([]);

  // Toggle animation
  useEffect(() => {
    if (contentRef.current && plusIconRef.current) {
      // Animate content
      gsap.to(contentRef.current, {
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
        duration: 0.3,
        ease: "power2.inOut",
      });

      // Animate plus icon
      gsap.to(plusIconRef.current, {
        rotation: isOpen ? 45 : 0,
        duration: 0.07,
        ease: "power1.inOut",
      });
    }
  }, [isOpen]);

  // Document links animation
  useEffect(() => {
    // Create hover animations only once when docs are visible
    if (isOpen && documents?.length && docLinksRef.current.length) {
      docLinksRef.current.forEach((link) => {
        // Create one-time hover animations for each link
        const hoverAnim = gsap.to(link, {
          x: 5,
          duration: 0.2,
          paused: true,
          ease: "power1.out",
        });

        const handleMouseEnter = () => hoverAnim.play();
        const handleMouseLeave = () => hoverAnim.reverse();

        link.addEventListener("mouseenter", handleMouseEnter);
        link.addEventListener("mouseleave", handleMouseLeave);

        // Clean up event listeners when component unmounts
        return () => {
          link.removeEventListener("mouseenter", handleMouseEnter);
          link.removeEventListener("mouseleave", handleMouseLeave);
        };
      });
    }
  }, [isOpen, documents]);

  // Initialize docLinksRef
  const setDocLinkRef = (el: HTMLDivElement | null, index: number) => {
    if (el && !docLinksRef.current.includes(el)) {
      docLinksRef.current[index] = el;
    }
  };

  return (
    <div className="dropdown border-t border-white/10 py-8">
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
        <div className="pt-6">
          {customContent ? (
            customContent
          ) : (
            <p className="text-white/60 text-base select-none">{content}</p>
          )}

          {documents && documents.length > 0 && (
            <div className="space-y-4 mt-6">
              {documents.map((doc, index) => (
                <div
                  key={index}
                  className="doc-link flex items-center"
                  ref={(el) => setDocLinkRef(el, index)}
                >
                  <a
                    href={doc.link}
                    className="text-white hover:text-white/80 flex items-center group"
                  >
                    <span>{doc.title}</span>
                    <svg
                      className="w-5 h-5 ml-2 text-white/60 group-hover:text-white/80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
