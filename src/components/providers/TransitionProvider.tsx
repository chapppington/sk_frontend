"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

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
  const isAnimatingRef = useRef(true);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

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
        background-color:rgb(3, 28, 53);
        z-index: 99999; /* Increased z-index to ensure it's above everything */
        transform: translateY(0);
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
      transform: translate(-50%, -50%);
      z-index: 100000; /* Increased z-index to ensure it's above everything */
      pointer-events: none;
      opacity: 1;
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

    // Mark as ready after a short delay to ensure everything is loaded
    setTimeout(() => {
      setIsReady(true);
    }, 100);

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

  // Initial animation out
  useEffect(() => {
    if (isReady) {
      const initialAnimation = async () => {
        // Wait for columns to be fully visible
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Stop scrolling while columns are covering the page
        if (lenis) {
          lenis.stop();
          lenis.scrollTo(0, { immediate: true });
          lenis.resize();
        }

        // Wait a bit more before animating out
        await new Promise((resolve) => setTimeout(resolve, 100));
        await animateOut();
      };
      initialAnimation();
    }
  }, [isReady]);

  const animateIn = () => {
    return new Promise<void>((resolve) => {
      if (isAnimatingRef.current) {
        resolve();
        return;
      }
      isAnimatingRef.current = true;
      setIsAnimating(true);

      // Stop scrolling at the beginning of animation
      if (lenis) {
        lenis.stop();
      }

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
            easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
            fill: "forwards",
          }
        );
      });

      // Reset scroll position when columns are halfway through the animation
      // and re-enable scrolling immediately after
      setTimeout(() => {
        if (lenis) {
          lenis.scrollTo(0, { immediate: true });
          lenis.resize();
          lenis.start(); // Allow scrolling right after reset
        }
      }, 450); // middle of animation (300 + 150 delay)

      // Wait for all columns to cover the page
      setTimeout(() => {
        resolve();
      }, 300 + 4 * 50);
    });
  };

  const animateOut = () => {
    return new Promise<void>((resolve) => {
      const columns = columnsRef.current;
      const logoContainer = logoRef.current;
      let completedAnimations = 0;
      const totalAnimations = columns.length;

      // Stop scrolling at the beginning of animation
      if (lenis) {
        lenis.stop();
      }

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

      // Reset scroll position and re-enable scrolling early in the animation
      setTimeout(() => {
        if (lenis) {
          lenis.scrollTo(0, { immediate: true });
          lenis.resize();
          lenis.start(); // Allow scrolling right after reset
        }
      }, 100); // Earlier in the animation

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
            easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
            fill: "forwards",
          }
        );

        animation.onfinish = () => {
          completedAnimations++;
          if (completedAnimations === totalAnimations) {
            isAnimatingRef.current = false;
            setIsAnimating(false);
            // Don't reset scroll again, we already did it earlier
            resolve();
          }
        };
      });
    });
  };

  return (
    <TransitionContext.Provider value={{ animateIn, animateOut, isAnimating }}>
      <div style={{ visibility: isReady ? "visible" : "hidden" }}>
        {children}
      </div>
    </TransitionContext.Provider>
  );
};
