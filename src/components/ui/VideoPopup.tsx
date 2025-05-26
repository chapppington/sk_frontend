"use client";

import { useEffect, useRef } from "react";
import ResortVideo from "./ResortVideo";

interface VideoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  posterSrc: string;
  captionsSrc?: string;
}

const VideoPopup = ({
  isOpen,
  onClose,
  videoSrc,
  posterSrc,
  captionsSrc,
}: VideoPopupProps) => {
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

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl aspect-video bg-black rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white bg-black/80 hover:bg-black/90 transition-colors z-10"
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
        <ResortVideo src={videoSrc} poster={posterSrc} />
      </div>
    </div>
  );
};

export default VideoPopup;
