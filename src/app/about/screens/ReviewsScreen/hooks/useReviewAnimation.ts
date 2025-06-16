import { useEffect, RefObject } from "react";
import gsap from "gsap";

export const useReviewAnimation = (
  userInfoRef: RefObject<HTMLDivElement | null>,
  currentIndex: number
) => {
  useEffect(() => {
    if (!userInfoRef.current) return;

    const tl = gsap.timeline({
      defaults: {
        ease: "expo.out",
        duration: 0.3,
      },
    });

    // Fade out current content
    tl.to(userInfoRef.current, {
      opacity: 0,
      duration: 0.2,
    })
      // Fade in new content
      .to(userInfoRef.current, {
        opacity: 1,
        duration: 0.3,
      });

    return () => {
      tl.kill();
    };
  }, [currentIndex, userInfoRef]);
};
