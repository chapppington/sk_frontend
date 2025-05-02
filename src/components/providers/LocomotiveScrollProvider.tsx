"use client";

import { useEffect, useRef, useState } from "react";
import LocomotiveScroll from "locomotive-scroll";

export default function LocomotiveScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<LocomotiveScroll | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device is touch-enabled
    const touchCheck = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touchCheck);

    if (!touchCheck) {
      (async () => {
        try {
          const LocomotiveScroll = (await import("locomotive-scroll")).default;

          if (!containerRef.current) return;

          document.documentElement.classList.add("has-scroll-smooth");

          scrollRef.current = new LocomotiveScroll({
            el: containerRef.current,
            smooth: true,
            lerp: 0.1,
            multiplier: 1,
            direction: "vertical",
          });

          // Create ResizeObserver to update scroll when content changes
          const resizeObserver = new ResizeObserver(() => {
            setTimeout(() => {
              scrollRef.current?.update();
            }, 200);
          });

          // Observe the container and its children
          resizeObserver.observe(containerRef.current);
          containerRef.current.children.length > 0 &&
            Array.from(containerRef.current.children).forEach((child) => {
              resizeObserver.observe(child);
            });

          // Update scroll on window resize
          window.addEventListener("resize", () => {
            scrollRef.current?.update();
          });

          return () => {
            resizeObserver.disconnect();
          };
        } catch (error) {
          console.error("Failed to initialize Locomotive Scroll:", error);
        }
      })();

      return () => {
        scrollRef.current?.destroy();
        document.documentElement.classList.remove("has-scroll-smooth");
      };
    }
  }, []);

  // For touch devices, render with native scrolling
  if (isTouchDevice) {
    return (
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
          overscrollBehavior: "contain",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
        className="hide-scrollbar"
      >
        {children}
      </div>
    );
  }

  // For non-touch devices, render with Locomotive Scroll
  return (
    <div
      data-scroll-container
      ref={containerRef}
      style={{
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}
