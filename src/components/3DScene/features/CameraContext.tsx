"use client";
import { createContext, useContext, useState, useEffect} from "react";
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

  return null;
}

export function CameraProvider({ children }: { children: React.ReactNode }) {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [totalSections, setTotalSections] = useState(0);

  return (
    <CameraContext.Provider
      value={{
        activeSectionIndex,
        setActiveSectionIndex,
        totalSections,
        setTotalSections,
      }}
    >
      <ReactLenis root>
        <ScrollManager />
        {children}
      </ReactLenis>
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
