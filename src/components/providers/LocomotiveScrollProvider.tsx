"use client";

import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";

export default function LocomotiveScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;

        if (!containerRef.current) return;

        // Add smooth scroll class
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
  }, []);

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
