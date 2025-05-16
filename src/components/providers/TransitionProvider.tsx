"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";

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
  const logoRef = useRef<HTMLDivElement>(null);

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
        background-color: #0F0D1F;
        z-index: 9999;
        transform: translateY(-100%);
        will-change: transform;
        pointer-events: auto;
      `;
      document.body.appendChild(column);
      columns.push(column);
    }
    columnsRef.current = columns;

    // Create logo container
    const logoContainer = document.createElement("div");
    logoContainer.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -150%);
      z-index: 10000;
      pointer-events: none;
      opacity: 0;
      transition: transform 0.3s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.3s ease;
    `;

    // Create and append logo image
    const logoImg = document.createElement("img");
    logoImg.src = "/logo.svg";
    logoImg.alt = "СИБКОМПЛЕКТ";
    logoImg.style.cssText = `
      height: 32px;
      width: auto;
      filter: brightness(0) invert(1);
    `;
    logoContainer.appendChild(logoImg);

    document.body.appendChild(logoContainer);
    logoRef.current = logoContainer;

    // Cleanup on unmount
    return () => {
      columns.forEach((column) => {
        if (column.parentNode) {
          column.parentNode.removeChild(column);
        }
      });
      if (logoContainer.parentNode) {
        logoContainer.parentNode.removeChild(logoContainer);
      }
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
      const logoContainer = logoRef.current;

      // Show logo when middle columns are visible
      setTimeout(() => {
        if (logoContainer) {
          logoContainer.style.transform = "translate(-50%, -50%)";
          logoContainer.style.opacity = "1";
        }
      }, 150); // Show logo when middle columns are visible

      columns.forEach((column, i) => {
        // Reset position
        column.style.transform = "translateY(-100%)";
        // Force reflow
        column.offsetHeight;

        column.animate(
          [{ transform: "translateY(-100%)" }, { transform: "translateY(0)" }],
          {
            duration: 300,
            delay: i * 50,
            easing: "cubic-bezier(0.76, 0, 0.24, 1)",
            fill: "forwards",
          }
        );
      });

      // Wait for all columns to cover the page
      setTimeout(() => {
        resolve();
      }, 300 + 5 * 50);
    });
  };

  const animateOut = () => {
    return new Promise<void>((resolve) => {
      const columns = columnsRef.current;
      const logoContainer = logoRef.current;
      let completedAnimations = 0;
      const totalAnimations = columns.length;

      // Hide logo immediately when starting to animate out
      if (logoContainer) {
        logoContainer.style.transform = "translate(-50%, -150%)";
        logoContainer.style.opacity = "0";
      }

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
            duration: 300,
            delay: i * 50,
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
