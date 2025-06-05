"use client";

import { useEffect, useRef } from "react";

const ScrollingTextSection = () => {
  const scrollTextRef = useRef<HTMLDivElement>(null);
  const lastScrollPosition = useRef(0);
  const scrollSpeed = 0.5;

  useEffect(() => {
    const scrollText = scrollTextRef.current;
    if (!scrollText) return;

    const updateScrollText = () => {
      const currentScroll = window.scrollY;
      const delta = (currentScroll - lastScrollPosition.current) * scrollSpeed;
      const currentTransform = getComputedStyle(scrollText).transform;
      let currentX = 0;

      if (currentTransform !== "none") {
        const matrix = new DOMMatrix(currentTransform);
        currentX = matrix.m41;
      }

      const newX = currentX - delta;
      scrollText.style.transform = `translateX(${newX}px)`;
      lastScrollPosition.current = currentScroll;

      requestAnimationFrame(updateScrollText);
    };

    updateScrollText();
  }, []);

  return (
    <div className="scroll-text-container overflow-hidden relative py-4 lg:py-8">
      <div
        ref={scrollTextRef}
        className="scroll-text-wrapper whitespace-nowrap flex"
        style={{ willChange: "transform" }}
      >
        <div className="scroll-text text-[50px] md:text-[100px] text-white/10 leading-none">
          Мы согреваем города&nbsp;&nbsp;&nbsp;Мы согреваем
          города&nbsp;&nbsp;&nbsp;Мы согреваем города&nbsp;&nbsp;&nbsp;
        </div>
        <div className="scroll-text text-[50px] md:text-[100px] text-white/10 leading-none">
          Мы согреваем города&nbsp;&nbsp;&nbsp;Мы согреваем
          города&nbsp;&nbsp;&nbsp;Мы согреваем города&nbsp;&nbsp;&nbsp;
        </div>
      </div>
    </div>
  );
};

export default ScrollingTextSection;
