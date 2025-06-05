"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface CameraContextType {
  activeSectionIndex: number;
  totalSections: number;
  setActiveSectionIndex: (section: number) => void;
  setTotalSections: (total: number) => void;
}

const CameraContext = createContext<CameraContextType | undefined>(undefined);

export function CameraProvider({ children }: { children: ReactNode }) {
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
      {children}
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
