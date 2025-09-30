import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { UseTextAnimationProps } from "./types";

gsap.registerPlugin(SplitText, ScrollTrigger);

// Function to wait for fonts to load
const waitForFonts = (): Promise<void> => {
  return new Promise((resolve) => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        // Add a small delay to ensure fonts are fully rendered
        setTimeout(resolve, 50);
      });
    } else {
      // Fallback for older browsers
      setTimeout(resolve, 100);
    }
  });
};

export const useTextAnimation = ({
  animateOnScroll = true,
  delay = 0.45,
  triggerStart = "top 80%",
  debug = false,
}: UseTextAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLElement[]>([]);
  const splitRef = useRef<SplitText[]>([]);
  const lines = useRef<Element[]>([]);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Initially hide the text to prevent flashing
  useEffect(() => {
    if (containerRef.current) {
      gsap.set(containerRef.current, { opacity: 0 });
    }
  }, []);

  // Wait for fonts to load before initializing animations
  useEffect(() => {
    waitForFonts().then(() => {
      setFontsLoaded(true);
    });
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || !fontsLoaded) return;

      splitRef.current = [];
      elementRef.current = [];
      lines.current = [];

      let elements = [];

      if (containerRef.current.hasAttribute("data-copy-wrapper")) {
        elements = Array.from(containerRef.current.children);
      } else {
        elements = [containerRef.current];
      }

      elements.forEach((element) => {
        elementRef.current.push(element as HTMLElement);

        const split = SplitText.create(element, {
          type: "lines",
          mask: "lines",
          linesClass: "line++",
        });

        splitRef.current.push(split);

        // Remove any aria-label attributes from non-interactive elements to fix accessibility
        const nonInteractiveTags = [
          "p",
          "span",
          "div",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
        ];

        if (nonInteractiveTags.includes(element.tagName.toLowerCase())) {
          element.removeAttribute("aria-label");
        }

        // Also remove aria-label from any child elements created by SplitText
        split.lines.forEach((line: Element) => {
          if (nonInteractiveTags.includes(line.tagName.toLowerCase())) {
            line.removeAttribute("aria-label");
          }

          // Remove aria-label from any nested elements within lines
          const nestedElements = line.querySelectorAll(
            "p, span, div, h1, h2, h3, h4, h5, h6"
          );
          nestedElements.forEach((nested: Element) => {
            nested.removeAttribute("aria-label");
          });
        });

        const computedStyle = window.getComputedStyle(element);
        const textIndent = computedStyle.textIndent;

        if (textIndent && textIndent !== "0px") {
          if (split.lines.length > 0) {
            (split.lines[0] as HTMLElement).style.paddingLeft = textIndent;
          }
          (element as HTMLElement).style.textIndent = "0";
        }

        lines.current.push(...split.lines);
      });

      // Set initial states: hide lines and show container
      gsap.set(lines.current, { y: "100%" });
      gsap.set(containerRef.current, { opacity: 1 });

      const animationProps = {
        y: "0%",
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: delay,
      };

      if (animateOnScroll) {
        gsap.to(lines.current, {
          ...animationProps,
          scrollTrigger: {
            trigger: containerRef.current,
            start: triggerStart,
            once: true,
            markers: debug,
          },
        });
      } else {
        gsap.to(lines.current, animationProps);
      }

      return () => {
        splitRef.current.forEach((split) => {
          if (split) {
            split.revert();
          }
        });
      };
    },
    {
      scope: containerRef,
      dependencies: [animateOnScroll, delay, triggerStart, debug, fontsLoaded],
    }
  );

  return { containerRef };
};
