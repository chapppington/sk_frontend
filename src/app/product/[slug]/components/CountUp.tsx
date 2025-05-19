"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const CountUp = ({
  end,
  duration = 1.5,
  suffix = "",
  prefix = "",
}: CountUpProps) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<number>(0);
  const animRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    // Skip if no element or if window is not available (SSR)
    if (!elementRef.current || typeof window === "undefined") return;

    // Clear previous animation if exists
    if (animRef.current) {
      animRef.current.kill();
    }

    // Ensure we start at 0
    countRef.current = 0;
    setCount(0);

    // Create the GSAP animation with ScrollTrigger
    animRef.current = gsap.to(countRef, {
      current: end,
      duration: duration,
      ease: "power4.out",
      scrollTrigger: {
        trigger: elementRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        // Update the state with the rounded current value
        setCount(Math.round(countRef.current));
      },
    });

    // Cleanup
    return () => {
      if (animRef.current) {
        animRef.current.kill();
      }
    };
  }, [end, duration]);

  return (
    <span ref={elementRef}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export default CountUp;
