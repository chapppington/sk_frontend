"use client";

import { AnimatePresence, m } from "framer-motion";
import { type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  overlayClassName?: string;
  contentClassName?: string;
}

export function Modal({
  isOpen,
  onClose,
  children,
  overlayClassName,
  contentClassName,
}: Props) {
  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const portalTarget = typeof window !== "undefined" ? document.body : null;

  if (!portalTarget) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <m.div
          className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50${
            overlayClassName ? ` ${overlayClassName}` : ""
          }`}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <m.div
            className={`bg-blue-950 p-6 rounded-lg shadow-lg w-full max-w-xl relative${
              contentClassName ? ` ${contentClassName}` : ""
            }`}
            initial={{ scale: 0.9 }}
            exit={{ scale: 0.9 }}
          >
            <button
              onClick={onClose}
              className="absolute top-0 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            {children}
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    portalTarget
  );
}
