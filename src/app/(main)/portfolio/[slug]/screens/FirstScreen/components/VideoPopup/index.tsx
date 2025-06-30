"use client";

import { useEffect, useRef, FC } from "react";
import { createPortal } from "react-dom";

import MediaPreview from "@/app/(main)/portfolio/[slug]/screens/FirstScreen/components/VideoWrapper";
import { IVideoPopupProps } from "@/app/(main)/portfolio/[slug]/screens/FirstScreen/components/VideoPopup/types";

const VideoPopup: FC<IVideoPopupProps> = ({
  isOpen,
  onClose,
  videoSrc,
  posterSrc,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/80 z-[99999] flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl aspect-video bg-black rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 transition-colors z-10"
          onClick={onClose}
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <MediaPreview src={videoSrc} poster={posterSrc} />
      </div>
    </div>,
    typeof window !== "undefined" ? document.body : (null as any)
  );
};

export default VideoPopup;
