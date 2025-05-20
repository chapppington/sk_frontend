"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

export default function CustomScrollbar() {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startScrollPercentage = useRef(0);
  const contentHeightRef = useRef(contentHeight);
  const viewportHeightRef = useRef(viewportHeight);
  const pathname = usePathname();
  const lenis = useLenis();
  const navbarHeight = 72; // Adjust this to match your navbar height in pixels
  const desktopBreakpoint = 768; // Minimum width for desktop devices
  const thumbHeight = 100; // Fixed thumb height in pixels

  // Check if the device is a desktop
  useEffect(() => {
    const checkIfDesktop = () => {
      setIsDesktop(window.innerWidth >= desktopBreakpoint);
    };

    // Initial check
    checkIfDesktop();

    // Recheck on resize
    window.addEventListener("resize", checkIfDesktop);

    return () => {
      window.removeEventListener("resize", checkIfDesktop);
    };
  }, []);

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
    if (!lenis || !isDesktop) return;

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

    // Keep track of the last scroll direction
    let lastScrollTop = 0;
    let lastScrollDirection = 0; // 0 = none, 1 = down, -1 = up

    const handleScroll = () => {
      // Don't recalculate on every scroll - use the most recent values
      const scrollTop = lenis.scroll;
      const maxScroll = contentHeightRef.current - viewportHeightRef.current;

      if (maxScroll <= 0) return;

      // Determine scroll direction
      const currentDirection =
        scrollTop > lastScrollTop ? 1 : scrollTop < lastScrollTop ? -1 : 0;
      lastScrollTop = scrollTop;

      // If direction changed or we're near the boundaries, update heights
      const nearTop = scrollTop < 100;
      const nearBottom = maxScroll - scrollTop < 100;

      if (currentDirection !== lastScrollDirection || nearTop || nearBottom) {
        lastScrollDirection = currentDirection;
        // Recalculate heights when direction changes or at boundaries
        calculateHeights();
      }

      const percentage = (scrollTop / maxScroll) * 100;
      setScrollPercentage(Math.min(percentage, 100));
    };

    // Initialize and add event listeners
    calculateHeights();
    handleScroll();

    // Update heights on resize with throttling
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(calculateHeights, 100);
    };
    window.addEventListener("resize", handleResize);

    // Listen for the custom layoutchange event from TransitionProvider
    window.addEventListener("layoutchange", calculateHeights);

    // Create a mutation observer to detect DOM changes
    // Use a debounce mechanism to avoid excessive calculations
    let mutationTimeout: NodeJS.Timeout;
    const handleMutation = () => {
      clearTimeout(mutationTimeout);
      mutationTimeout = setTimeout(calculateHeights, 50);
    };

    const mutationObserver = new MutationObserver(handleMutation);

    // Observe the entire document for content changes
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    // Handle scroll events
    lenis.on("scroll", handleScroll);

    // Periodic check at a reasonable interval (every 2 seconds)
    const intervalId = setInterval(calculateHeights, 2000);

    return () => {
      lenis.off("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("layoutchange", calculateHeights);
      mutationObserver.disconnect();
      clearInterval(intervalId);
      clearTimeout(resizeTimeout);
      clearTimeout(mutationTimeout);
    };
  }, [lenis, isDesktop]);

  // Update refs when state changes
  useEffect(() => {
    contentHeightRef.current = contentHeight;
  }, [contentHeight]);

  useEffect(() => {
    viewportHeightRef.current = viewportHeight;
  }, [viewportHeight]);

  // Separate useEffect for drag functionality to avoid circular dependencies
  useEffect(() => {
    if (!lenis || !scrollbarRef.current || !isDesktop) return;

    // Mouse events for draggable scrollbar
    const handleMouseDown = (e: MouseEvent) => {
      if (!scrollbarRef.current) return;

      isDragging.current = true;
      startY.current = e.clientY;
      startScrollPercentage.current = scrollPercentage;

      document.body.style.userSelect = "none";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !scrollbarRef.current) return;

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
      document.body.style.userSelect = "";
    };

    // Scrollbar drag events
    scrollbarRef.current.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      scrollbarRef.current?.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [lenis, scrollPercentage, isDesktop]);

  // Skip rendering on mobile
  if (!isDesktop) return null;

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

  // Calculate thumb position based on scroll percentage
  const getThumbStyle = () => {
    // Calculate the available travel distance for the thumb
    const availableTravel = scrollbarRef.current
      ? scrollbarRef.current.clientHeight - thumbHeight
      : 0;

    // Position the thumb based on scroll percentage
    const topPosition = (scrollPercentage / 100) * availableTravel;

    return {
      height: `${thumbHeight}px`,
      width: "100%",
      position: "absolute" as const,
      top: `${topPosition}px`,
      transition: "none",
      borderRadius: "999px",
    };
  };

  // Check if the scrollbar should be in its wide state
  const isScrollbarWide = isHovered || isDragging.current;

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
          className={`h-full cursor-pointer transition-all duration-200 rounded-full overflow-hidden relative`}
          style={{ width: isScrollbarWide ? "8px" : "5px" }}
          onClick={handleTrackClick}
        >
          <div
            ref={thumbRef}
            className="bg-white cursor-grab active:cursor-grabbing rounded-full"
            style={getThumbStyle()}
          />
        </div>
      </div>
    </div>
  );
}
