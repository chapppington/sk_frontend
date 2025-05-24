"use client";

import { useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface RevealAnimationProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  triggerStart?: string;
  className?: string;
  useScrollTrigger?: boolean;
}

export default function RevealAnimation({
  children,
  delay = 0,
  duration = 1.2,
  triggerStart = "top 100%",
  className = "",
  useScrollTrigger = true,
}: RevealAnimationProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (wrapperRef.current) {
      const animationConfig = {
        yPercent: 0,
        opacity: 1,
        duration: duration,
        delay: delay,
        ease: "power3.out",
      };

      if (useScrollTrigger) {
        gsap.fromTo(
          wrapperRef.current,
          {
            yPercent: 100,
            opacity: 0,
          },
          {
            ...animationConfig,
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: triggerStart,
              once: true,
            },
          }
        );
      } else {
        gsap.fromTo(
          wrapperRef.current,
          {
            yPercent: 100,
            opacity: 0,
          },
          animationConfig
        );
      }
    }
  }, [delay, duration, triggerStart, useScrollTrigger]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={wrapperRef} className="w-full h-full relative">
        {children}
      </div>
    </div>
  );
}
