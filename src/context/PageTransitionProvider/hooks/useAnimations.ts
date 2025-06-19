import Lenis from "lenis";
import { RefObject, useRef, useState } from "react";
import { IUseAnimationsReturn } from "../types";

export const useAnimations = (
  columnsRef: RefObject<HTMLDivElement[]>,
  logoRef: RefObject<HTMLDivElement>,
  lenis: Lenis | undefined
): IUseAnimationsReturn => {
  const [isAnimating, setIsAnimating] = useState(true);
  const isAnimatingRef = useRef(true);

  const animateIn = () => {
    return new Promise<void>((resolve) => {
      if (isAnimatingRef.current) {
        resolve();
        return;
      }
      isAnimatingRef.current = true;
      setIsAnimating(true);

      if (lenis) {
        lenis.stop();
        setTimeout(() => {
          lenis.scrollTo(0, { immediate: true });
          lenis.resize();
        }, 0);
      }

      const columns = columnsRef.current;
      const logoContainer = logoRef.current;

      setTimeout(() => {
        if (logoContainer) {
          logoContainer.style.transform = "translate(-50%, -50%)";
          logoContainer.style.opacity = "1";
        }
      }, 150);

      columns?.forEach((column, i) => {
        column.style.transform = "translateY(-100%)";
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

      setTimeout(() => {
        if (lenis) {
          lenis.scrollTo(0, { immediate: true });
          lenis.resize();
          lenis.start();
        }
      }, 450);

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
      const totalAnimations = columns?.length || 0;

      if (lenis) {
        lenis.stop();
        setTimeout(() => {
          lenis.scrollTo(0, { immediate: true });
          lenis.resize();
        }, 0);
      }

      if (logoContainer) {
        logoContainer.style.transform = "translate(-50%, -150%)";
        logoContainer.style.opacity = "0";
      }

      if (!isAnimatingRef.current) {
        resolve();
        return;
      }

      columns?.forEach((column, i) => {
        column.style.transform = "translateY(0)";
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

            requestAnimationFrame(() => {
              if (document.readyState === "complete") {
                if (lenis) {
                  lenis.resize();
                  lenis.start();
                  window.dispatchEvent(new CustomEvent("layoutchange"));
                }
                resolve();
              } else {
                window.addEventListener(
                  "load",
                  () => {
                    if (lenis) {
                      lenis.resize();
                      lenis.start();
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

  return { isAnimating, isAnimatingRef, animateIn, animateOut };
};
