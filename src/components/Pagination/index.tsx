"use client";

import { FC } from "react";
import { PaginationProps, PaginationButtonProps } from "./types";

const PaginationButton: FC<PaginationButtonProps> = ({
  onClick,
  disabled,
  children,
  isActive,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors ${
        isActive
          ? "bg-white text-black border-white"
          : "border-white/30 text-white hover:border-white"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
};

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className={`flex justify-center items-center gap-2 ${className}`}>
      <PaginationButton
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        <svg
          className="w-5 h-5 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </PaginationButton>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <PaginationButton
          key={page}
          onClick={() => onPageChange(page)}
          isActive={currentPage === page}
        >
          {page}
        </PaginationButton>
      ))}

      <PaginationButton
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        <svg
          className="w-5 h-5 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </PaginationButton>
    </div>
  );
};

export default Pagination;
