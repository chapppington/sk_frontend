"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

export default function CustomScrollbar() {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const isDraggingPercentage = useRef(false);
  const startY = useRef(0);
  const startScrollPercentage = useRef(0);
  const contentHeightRef = useRef(contentHeight);
  const viewportHeightRef = useRef(viewportHeight);
  const pathname = usePathname();
  const lenis = useLenis();
  const navbarHeight = 72; // Adjust this to match your navbar height in pixels
  const percentageVisibilityThreshold = 2; // Only show percentage after this threshold

  // Reset scrollbar state on page transition
  useEffect(() => {
    const isDev = process.env.NODE_ENV === "development";
    const resetScroll = () => {
      setScrollPercentage(0);
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
    };

    if (isDev) {
      // In development, add a small delay to prevent multiple rapid resets
      const timeoutId = setTimeout(resetScroll, 100);
      return () => clearTimeout(timeoutId);
    } else {
      resetScroll();
    }
  }, [pathname, lenis]);

  useEffect(() => {
    if (!lenis) return;

    const calculateHeights = () => {
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );

      setContentHeight(docHeight);
      contentHeightRef.current = docHeight;

      setViewportHeight(window.innerHeight);
      viewportHeightRef.current = window.innerHeight;
    };

    const handleScroll = () => {
      const scrollTop = lenis.scroll;
      const maxScroll = contentHeightRef.current - viewportHeightRef.current;

      if (maxScroll <= 0) return;

      const percentage = (scrollTop / maxScroll) * 100;
      setScrollPercentage(Math.min(percentage, 100));
    };

    // Initialize and add event listeners
    calculateHeights();
    handleScroll();

    // Update heights on resize
    window.addEventListener("resize", calculateHeights);

    // Handle scroll events
    lenis.on("scroll", handleScroll);

    // Update less frequently to reduce performance impact
    const intervalId = setInterval(calculateHeights, 1000);

    return () => {
      lenis.off("scroll", handleScroll);
      window.removeEventListener("resize", calculateHeights);
      clearInterval(intervalId);
    };
  }, [lenis]);

  // Update refs when state changes
  useEffect(() => {
    contentHeightRef.current = contentHeight;
  }, [contentHeight]);

  useEffect(() => {
    viewportHeightRef.current = viewportHeight;
  }, [viewportHeight]);

  // Separate useEffect for drag functionality to avoid circular dependencies
  useEffect(() => {
    if (!lenis || !scrollbarRef.current || !percentageRef.current) return;

    // Mouse events for draggable scrollbar
    const handleMouseDown = (e: MouseEvent) => {
      if (!scrollbarRef.current) return;

      isDragging.current = true;
      startY.current = e.clientY;
      startScrollPercentage.current = scrollPercentage;

      document.body.style.userSelect = "none";
    };

    // Mouse events for draggable percentage indicator
    const handlePercentageMouseDown = (e: MouseEvent) => {
      if (!percentageRef.current) return;

      e.stopPropagation(); // Prevent event from bubbling to scrollbar
      isDraggingPercentage.current = true;
      startY.current = e.clientY;
      startScrollPercentage.current = scrollPercentage;

      document.body.style.userSelect = "none";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (
        (!isDragging.current && !isDraggingPercentage.current) ||
        !scrollbarRef.current
      )
        return;

      const scrollbarHeight = scrollbarRef.current.clientHeight;
      const delta = e.clientY - startY.current;
      const deltaPercentage = (delta / scrollbarHeight) * 100;

      let newPercentage = startScrollPercentage.current + deltaPercentage;
      newPercentage = Math.max(0, Math.min(100, newPercentage));

      // Set scroll position based on percentage
      const newScrollPosition =
        ((contentHeightRef.current - viewportHeightRef.current) *
          newPercentage) /
        100;
      lenis.scrollTo(newScrollPosition, { immediate: true });
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      isDraggingPercentage.current = false;
      document.body.style.userSelect = "";
    };

    // Scrollbar drag events
    scrollbarRef.current.addEventListener("mousedown", handleMouseDown);
    percentageRef.current.addEventListener(
      "mousedown",
      handlePercentageMouseDown
    );
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      scrollbarRef.current?.removeEventListener("mousedown", handleMouseDown);
      percentageRef.current?.removeEventListener(
        "mousedown",
        handlePercentageMouseDown
      );
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [lenis, scrollPercentage]);

  const scrollTo = (percentage: number) => {
    const maxScroll = contentHeightRef.current - viewportHeightRef.current;
    const targetScrollTop = (percentage / 100) * maxScroll;

    if (lenis) {
      lenis.scrollTo(targetScrollTop);
    }
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollbarRef.current) return;

    const rect = scrollbarRef.current.getBoundingClientRect();
    const clickPositionY = e.clientY - rect.top;
    const percentage = (clickPositionY / rect.height) * 100;

    scrollTo(percentage);
  };

  // Calculate position for percentage indicator with bottom offset
  const getIndicatorPosition = () => {
    // Apply bottom offset when approaching 100%
    if (scrollPercentage > 95) {
      // Gradually increase the offset as we approach 100%
      const offset = (scrollPercentage - 95) * 5; // Increases from 0 to 25px as percentage goes from 95% to 100%
      return `calc(${scrollPercentage}% - ${10 + offset}px)`;
    }

    return `calc(${scrollPercentage}% - 10px)`;
  };

  // Calculate the actual thumb height with a minimum value so it's always visible
  const getThumbStyle = () => {
    // When scrolling is minimal, maintain a small but visible thumb
    const heightPercentage = Math.max(scrollPercentage, 0.1);

    return {
      height: `${heightPercentage}%`,
      opacity:
        scrollPercentage <= percentageVisibilityThreshold
          ? scrollPercentage / percentageVisibilityThreshold // Fade out gradually when below threshold
          : 1,
      width: "100%",
      transition: "none",
      borderRadius: "999px",
    };
  };

  // Check if the scrollbar should be in its wide state
  const isScrollbarWide = isHovered || isDraggingPercentage.current;

  return (
    <div
      className="fixed right-0 h-full z-50"
      style={{
        top: navbarHeight + "px",
        height: `calc(100% - ${navbarHeight}px)`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full flex items-center">
        {/* Scrollbar */}
        <div
          ref={scrollbarRef}
          className={`h-full cursor-pointer transition-all duration-200 rounded-full overflow-hidden`}
          style={{ width: isScrollbarWide ? "8px" : "5px" }}
          onClick={handleTrackClick}
        >
          <div
            ref={thumbRef}
            className="bg-white cursor-grab active:cursor-grabbing rounded-full"
            style={getThumbStyle()}
          />
        </div>

        {/* Percentage indicator that follows the thumb */}
        <div
          ref={percentageRef}
          className={`absolute -left-12 flex items-center justify-center text-white text-sm font-light rounded px-1.5 py-0.5 whitespace-nowrap cursor-grab active:cursor-grabbing ${
            isScrollbarWide ? "opacity-100" : ""
          }`}
          style={{
            top: getIndicatorPosition(),
            transition: "opacity 0.2s ease-in-out", // Only keep opacity transition, no position transition
            opacity: scrollPercentage > percentageVisibilityThreshold ? 1 : 0,
          }}
        >
          {Math.round(scrollPercentage)}%
        </div>
      </div>
    </div>
  );
}
