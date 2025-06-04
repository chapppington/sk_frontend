import { useRef } from "react";
import { IUseColumnsReturn } from "../types";

export const useColumns = (): IUseColumnsReturn => {
  const columnsRef = useRef<HTMLDivElement[]>([]);

  const getColumnsCount = () => {
    const width = window.innerWidth;
    if (width < 768) return 1;
    if (width < 1024) return 3;
    return 6;
  };

  const createColumns = () => {
    const columnCount = getColumnsCount();
    const columns: HTMLDivElement[] = [];

    for (let i = 0; i < columnCount; i++) {
      const column = document.createElement("div");
      column.style.cssText = `
          position: fixed;
          top: 0;
          left: ${(i * 100) / columnCount}%;
          width: ${
            i === columnCount - 1
              ? 100 / columnCount + 0.2
              : 100 / columnCount + 0.1
          }%;
          height: ${i === columnCount - 1 ? "101vh" : "100vh"};
          background-color: black;
          z-index: 99999;
          transform: translateY(0);
          will-change: transform;
          pointer-events: auto;
        `;
      document.body.appendChild(column);
      columns.push(column);
    }
    columnsRef.current = columns;
  };

  const cleanupColumns = () => {
    columnsRef.current.forEach((column) => {
      if (column.parentNode) {
        column.parentNode.removeChild(column);
      }
    });
  };

  return { columnsRef, createColumns, cleanupColumns };
};
