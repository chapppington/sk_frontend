import { useEffect, RefObject } from "react";
import gsap from "gsap";

export function useJobAnimations(
  containerRef: RefObject<HTMLDivElement | null>,
  dependencies: any[]
) {
  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".job-item", {
          opacity: 0,
          y: 20,
          duration: 0.3,
          stagger: 0.1,
          ease: "power2.out",
        });

        gsap.from(".job-title", {
          opacity: 0,
          duration: 0.2,
          stagger: 0.1,
          ease: "power2.out",
        });

        gsap.from(".requirements-list", {
          opacity: 0,
          duration: 0.2,
          stagger: 0.1,
          ease: "power2.out",
        });

        gsap.from(".job-details", {
          opacity: 0,
          y: 10,
          duration: 0.2,
          stagger: 0.1,
          ease: "power2.out",
        });
      }, containerRef);

      return () => ctx.revert();
    }
  }, dependencies);
}
