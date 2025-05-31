"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";

interface CameraContextType {
  activeSectionIndex: number;
  totalSections: number;
  setActiveSectionIndex: (section: number) => void;
  setTotalSections: (total: number) => void;
}

const CameraContext = createContext<CameraContextType | undefined>(undefined);

function ScrollManager() {
  const pathname = usePathname();
  const lenis = useLenis();

  // Reset scroll position on route change
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  // Add window resize handler instead of expensive MutationObserver
  useEffect(() => {
    if (!lenis) return;

    // Initial resize
    lenis.resize();

    // Handle window resize events with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        lenis.resize();
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [lenis]);

  return null;
}

export function CameraProvider({ children }: { children: ReactNode }) {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [totalSections, setTotalSections] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isAppleDevice, setIsAppleDevice] = useState(false);

  useEffect(() => {
    // Check if device is touch-enabled
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);

    // Check if device is Apple (iOS or macOS)
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsAppleDevice(
      Boolean(
        /iphone|ipad|ipod|macintosh/.test(userAgent) ||
          (navigator.platform && /Mac/.test(navigator.platform))
      )
    );
  }, []);

  return (
    <CameraContext.Provider
      value={{
        activeSectionIndex,
        setActiveSectionIndex,
        totalSections,
        setTotalSections,
      }}
    >
      {isTouchDevice || isAppleDevice ? (
        children
      ) : (
        <ReactLenis
          root
          options={{
            lerp: 0.07,
            wheelMultiplier: 1.2,
            smoothWheel: true,
            orientation: "vertical",
            gestureOrientation: "vertical",
            infinite: false,
            syncTouch: true,
          }}
        >
          <ScrollManager />
          {children}
        </ReactLenis>
      )}
    </CameraContext.Provider>
  );
}

export function useCameraContext() {
  const context = useContext(CameraContext);
  if (context === undefined) {
    throw new Error("useCameraContext must be used within a CameraProvider");
  }
  return context;
}
