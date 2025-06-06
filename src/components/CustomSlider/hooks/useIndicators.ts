import { useRef, useEffect, useCallback } from "react";
import type { Swiper as SwiperType } from "swiper";

interface UseIndicatorsProps {
  showIndicators: boolean;
  indicatorCount: number;
  sliderId: string;
}

export const useIndicators = ({
  showIndicators,
  indicatorCount,
  sliderId,
}: UseIndicatorsProps) => {
  const indicatorsRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (showIndicators && indicatorsRef.current && !isInitialized.current) {
      // Clear any existing indicators first
      indicatorsRef.current.innerHTML = "";

      // Generate indicator bars
      for (let i = 0; i < indicatorCount; i++) {
        const indicator = document.createElement("div");
        indicator.className = `slider-indicator-bar-${sliderId} h-[4px] bg-white transition-all duration-300 flex-1`;
        indicator.style.maxWidth = "1px";
        indicator.style.width = "1px";
        indicatorsRef.current.appendChild(indicator);
      }
      isInitialized.current = true;
    }
  }, [showIndicators, indicatorCount, sliderId]);

  const updateIndicators = useCallback(
    (swiper: SwiperType) => {
      if (!showIndicators || !indicatorsRef.current) return;

      const slideCount = swiper.slides.filter(
        (slide: any) => !slide.classList.contains("swiper-slide-duplicate")
      ).length;

      const currentIndex = swiper.realIndex % slideCount;
      const totalPositions = indicatorCount - 5;
      const progress = currentIndex / (slideCount - 1);
      const position = Math.round(progress * totalPositions);

      const indicators = indicatorsRef.current.querySelectorAll(
        `.slider-indicator-bar-${sliderId}`
      );
      indicators.forEach((indicator: any, index: number) => {
        indicator.style.height = "6px";

        if (index >= position && index < position + 5) {
          const relativePos = index - position;

          if (relativePos === 2) {
            indicator.style.height = "40px";
          } else if (relativePos === 1 || relativePos === 3) {
            indicator.style.height = "20px";
          } else {
            indicator.style.height = "4px";
          }
        }
      });
    },
    [showIndicators, indicatorCount, sliderId]
  );

  return {
    indicatorsRef,
    updateIndicators,
  };
};
