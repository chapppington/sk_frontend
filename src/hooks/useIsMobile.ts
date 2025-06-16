import { useState, useEffect } from "react";

/**
 * A React hook that detects if the current viewport width is below a specified breakpoint.
 *
 * @param breakpoint - The width in pixels below which the viewport is considered mobile (default: 768)
 * @returns boolean - True if the viewport width is below the breakpoint, false otherwise
 *
 * @example
 * // Basic usage with default breakpoint (768px)
 * const isMobile = useIsMobile();
 *
 * @example
 * // Custom breakpoint (e.g., 1024px for tablet)
 * const isTablet = useIsMobile(1024);
 *
 * @example
 * // Using in a component
 * function ResponsiveComponent() {
 *   const isMobile = useIsMobile();
 *
 *   return (
 *     <div>
 *       {isMobile ? (
 *         <MobileView />
 *       ) : (
 *         <DesktopView />
 *       )}
 *     </div>
 *   );
 * }
 */
const useIsMobile = (breakpoint: number = 768): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
