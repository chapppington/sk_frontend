"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

interface TransitionContextType {
  animateIn: () => Promise<void>;
  animateOut: () => Promise<void>;
  isAnimating: boolean;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context; 
};

export const TransitionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const columnsRef = useRef<HTMLDivElement[]>([]);
  const isAnimatingRef = useRef(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Create columns once on mount
    const columns: HTMLDivElement[] = [];
    for (let i = 0; i < 6; i++) {
      const column = document.createElement("div");
      column.style.cssText = `
        position: fixed;
        top: 0;
        left: ${(i * 100) / 6}%;
        width: ${100 / 6 + 0.1}%; /* Slightly wider to prevent gaps */
        height: 100vh;
        background-color: black;
        z-index: 9999;
        transform: translateY(-100%);
        will-change: transform;
        pointer-events: auto;
      `;
      document.body.appendChild(column);
      columns.push(column);
    }
    columnsRef.current = columns;

    // Cleanup on unmount
    return () => {
      columns.forEach((column) => {
        if (column.parentNode) {
          column.parentNode.removeChild(column);
        }
      });
    };
  }, []);

  const animateIn = () => {
    return new Promise<void>((resolve) => {
      if (isAnimatingRef.current) {
        resolve();
        return;
      }
      isAnimatingRef.current = true;
      setIsAnimating(true);

      const columns = columnsRef.current;

      columns.forEach((column, i) => {
        // Reset position
        column.style.transform = "translateY(-100%)";
        // Force reflow
        column.offsetHeight;

        column.animate(
          [{ transform: "translateY(-100%)" }, { transform: "translateY(0)" }],
          {
            duration: 500,
            delay: i * 100,
            easing: "cubic-bezier(0.76, 0, 0.24, 1)",
            fill: "forwards",
          }
        );
      });

      // Wait for all columns to cover the page
      setTimeout(() => {
        resolve();
      }, 500 + 5 * 100);
    });
  };

  const animateOut = () => {
    return new Promise<void>((resolve) => {
      const columns = columnsRef.current;
      let completedAnimations = 0;
      const totalAnimations = columns.length;

      // If no animations are in progress, resolve immediately
      if (!isAnimatingRef.current) {
        resolve();
        return;
      }

      columns.forEach((column, i) => {
        // Ensure the column is in the correct position
        column.style.transform = "translateY(0)";
        // Force reflow
        column.offsetHeight;

        const animation = column.animate(
          [{ transform: "translateY(0)" }, { transform: "translateY(-100%)" }],
          {
            duration: 500,
            delay: i * 100,
            easing: "cubic-bezier(0.76, 0, 0.24, 1)",
            fill: "forwards",
          }
        );

        animation.onfinish = () => {
          completedAnimations++;
          if (completedAnimations === totalAnimations) {
            isAnimatingRef.current = false;
            setIsAnimating(false);
            resolve();
          }
        };
      });
    });
  };

  return (
    <TransitionContext.Provider value={{ animateIn, animateOut, isAnimating }}>
      {children}
    </TransitionContext.Provider>
  );
};
