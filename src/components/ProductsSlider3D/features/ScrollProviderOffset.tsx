"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useRef,
} from "react";

interface ScrollOffsetContextProps {
  scrollOffset: number;
  setScrollOffset: (offset: number) => void;
  animateScrollOffset: (targetOffset: number, duration: number) => void;
}

const ScrollOffsetContext = createContext<ScrollOffsetContextProps | undefined>(
  undefined
);

export function ScrollOffsetProvider({ children }: { children: ReactNode }) {
  const [scrollOffset, setScrollOffset] = useState(0);
  const animationRef = useRef<number | null>(null);

  const animateScrollOffset = (targetOffset: number, duration: number) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const startOffset = scrollOffset;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = progress * (2 - progress); // Ease-out function

      setScrollOffset(
        startOffset + (targetOffset - startOffset) * easedProgress
      );

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  return (
    <ScrollOffsetContext.Provider
      value={{
        scrollOffset,
        setScrollOffset,
        animateScrollOffset(targetOffset, duration) {},
      }}
    >
      {children}
    </ScrollOffsetContext.Provider>
  );
}
export const useScrollOffset = () => {
  const context = useContext(ScrollOffsetContext);
  if (context === undefined) {
    throw new Error(
      "useScrollOffset must be used within a CameraProvider or ScrollOffsetProvider must be on top"
    );
  }
  return context;
};
