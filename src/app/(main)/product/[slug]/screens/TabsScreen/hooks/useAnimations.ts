import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const useLeftContentAnimation = (
  leftContentRef: React.RefObject<HTMLDivElement | null>
) => {
  useGSAP(() => {
    if (leftContentRef.current) {
      gsap.fromTo(
        leftContentRef.current.children,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }
  }, []); // Empty dependency array means this runs only once on mount
};

export const useRightContentAnimation = (
  rightContentRef: React.RefObject<HTMLDivElement | null>,
  listItemsRef: React.RefObject<(HTMLLIElement | HTMLDivElement)[]>,
  activeTab: string,
  lenis: any
) => {
  useGSAP(() => {
    if (rightContentRef.current) {
      const items = listItemsRef.current;

      gsap.fromTo(
        items,
        {
          opacity: 0,
          x: 10,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
          onComplete: () => {
            if (lenis) {
              lenis.resize();
            }
          },
        }
      );
    }
  }, [activeTab, lenis]);
};
