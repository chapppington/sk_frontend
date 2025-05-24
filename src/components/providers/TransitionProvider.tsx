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
    // Function to determine number of columns based on screen width
    const getColumnsCount = () => {
      const width = window.innerWidth;
      if (width < 768) {
        return 1; // Mobile
      } else if (width < 1024) {
        return 3; // Tablet
      } else {
        return 6; // Desktop
      }
    };

    // Create columns once on mount
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
        }%; /* Extra width for last column */
        height: ${
          i === columnCount - 1 ? "101vh" : "100vh"
        }; /* Extra height for last column */
        background-color: #0F0D1F;
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
      // Clear initialization flag on unmount
      sessionStorage.removeItem("hasInitialized");
    };
  }, []);

  // Initial animation out
  useEffect(() => {
    if (isReady) {
      const initialAnimation = async () => {
        // Force scroll reset immediately when component is ready
        if (lenis) {
          lenis.stop();
          window.scrollTo(0, 0);
          lenis.scrollTo(0, { immediate: true });
        }

        // Wait for columns to be fully visible
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Ensure scroll is reset again after a short delay
        if (lenis) {
          window.scrollTo(0, 0);
          lenis.scrollTo(0, { immediate: true });
          lenis.resize();
        }

        // Wait a bit more before animating out
        await new Promise((resolve) => setTimeout(resolve, 100));
        await animateOut();

        // Final scroll reset after animation
        if (lenis) {
          window.scrollTo(0, 0);
          lenis.scrollTo(0, { immediate: true });
          lenis.resize();
          lenis.start();
        }
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

      // Stop scrolling and reset position at the beginning of animation
      if (lenis) {
        lenis.stop();
        // Force scroll reset with a small delay to ensure DOM is ready
        setTimeout(() => {
          lenis.scrollTo(0, { immediate: true });
          lenis.resize();
        }, 0);
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

      // Stop scrolling and reset position at the beginning of animation
      if (lenis) {
        lenis.stop();
        // Force scroll reset with a small delay to ensure DOM is ready
        setTimeout(() => {
          lenis.scrollTo(0, { immediate: true });
          lenis.resize();
        }, 0);
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

      columns.forEach((column, i) => {
        // Ensure the column is in the correct position
        column.style.transform = "translateY(0)";
        // Force reflow
        column.offsetHeight;

        const animation = column.animate(
          [{ transform: "translateY(0)" }, { transform: "translateY(-110%)" }],
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

            // Wait for next frame and DOM to be ready
            requestAnimationFrame(() => {
              // Check if document is ready
              if (document.readyState === "complete") {
                if (lenis) {
                  lenis.resize();
                  lenis.start();

                  // Dispatch a custom event that the scrollbar can listen for
                  window.dispatchEvent(new CustomEvent("layoutchange"));
                }
                resolve();
              } else {
                // If document is not ready, wait for it
                window.addEventListener(
                  "load",
                  () => {
                    if (lenis) {
                      lenis.resize();
                      lenis.start();

                      // Dispatch a custom event that the scrollbar can listen for
                      window.dispatchEvent(new CustomEvent("layoutchange"));
                    }
                    resolve();
                  },
                  { once: true }
                );
              }
            });
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
