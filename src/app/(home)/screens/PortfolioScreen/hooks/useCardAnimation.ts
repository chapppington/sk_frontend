import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

interface CardAnimationRefs {
  cardRef: RefObject<HTMLDivElement | null>;
  titleRef: RefObject<HTMLHeadingElement | null>;
  descriptionRef: RefObject<HTMLParagraphElement | null>;
  imgWrapperRef: RefObject<HTMLDivElement | null>;
  imgRef: RefObject<HTMLImageElement | null>;
  marqueeRef: RefObject<HTMLDivElement | null>;
  scrollHintRef: RefObject<HTMLDivElement | null>;
}

export function useCardAnimation(
  isIntroCard: boolean = false,
  isLastCard: boolean = false,
  totalCards: number = 0
): CardAnimationRefs {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const imgWrapperRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const scrollHintRef = useRef<HTMLDivElement | null>(null);
  const contentRevealedRef = useRef<boolean>(false);
  const marqueeAnimationRef = useRef<gsap.core.Timeline | null>(null);
  const splitTextRef = useRef<SplitText | null>(null);
  const scrollTriggerRefs = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Reset any existing animations
    if (splitTextRef.current) {
      splitTextRef.current.revert();
    }
    if (marqueeAnimationRef.current) {
      marqueeAnimationRef.current.kill();
    }
    // Kill only our tracked ScrollTrigger instances
    scrollTriggerRefs.current.forEach((trigger) => trigger.kill());
    scrollTriggerRefs.current = [];

    // Reset GSAP states for our elements only
    const elementsToReset = [
      imgWrapperRef.current,
      imgRef.current,
      marqueeRef.current,
      scrollHintRef.current,
    ].filter(Boolean); // Filter out null values

    if (elementsToReset.length > 0) {
      gsap.set(elementsToReset, {
        clearProps: "all",
      });
    }

    // Marquee animation
    if (marqueeRef.current) {
      const marquee = marqueeRef.current;
      const marqueeWidth = marquee.offsetWidth;
      const duration = 40;

      // Create a smooth infinite loop animation
      marqueeAnimationRef.current = gsap.timeline({
        repeat: -1,
        defaults: { ease: "none" },
      });

      // Clone the marquee content for seamless looping
      const originalContent = marquee.innerHTML;
      marquee.innerHTML = originalContent + originalContent + originalContent;

      // Set initial position
      gsap.set(marquee, { x: 0 });

      // Create a continuous animation
      marqueeAnimationRef.current.to(marquee, {
        x: -marqueeWidth * 2,
        duration: duration * 3,
        ease: "none",
      });
    }

    // Split text animation
    if (titleRef.current) {
      splitTextRef.current = new SplitText(titleRef.current, {
        type: "chars",
        charsClass: "char",
        tag: "div",
      });
      splitTextRef.current.chars.forEach((char) => {
        char.innerHTML = `<span>${char.textContent}</span>`;
      });
    }

    // Initial setup for intro card
    if (isIntroCard && imgWrapperRef.current && imgRef.current) {
      gsap.set(imgWrapperRef.current, { scale: 0.5, borderRadius: "400px" });
      gsap.set(imgRef.current, { scale: 1.5 });
      if (scrollHintRef.current) {
        gsap.set(scrollHintRef.current, { opacity: 1 });
      }
    }

    // Animation functions
    const animateContentIn = (
      titleChars: Element[],
      description: HTMLElement | null
    ) => {
      if (!titleChars.length || !description) return;
      gsap.to(titleChars, { x: "0%", duration: 0.75, ease: "power4.out" });
      gsap.to(description, {
        x: 0,
        opacity: 1,
        duration: 0.75,
        delay: 0.1,
        ease: "power4.out",
      });
    };

    const animateContentOut = (
      titleChars: Element[],
      description: HTMLElement | null
    ) => {
      if (!titleChars.length || !description) return;
      gsap.to(titleChars, { x: "100%", duration: 0.5, ease: "power4.out" });
      gsap.to(description, {
        x: "40px",
        opacity: 0,
        duration: 0.5,
        ease: "power4.out",
      });
    };

    // Scroll animations
    if (isIntroCard && cardRef.current) {
      const introTrigger = ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top top",
        end: "+=300vh",
        onUpdate: (self) => {
          const progress = self.progress;
          const imgScale = 0.5 + progress * 0.5;
          const borderRadius = 400 - progress * 375;
          const innerImgScale = 1.5 - progress * 0.5;

          if (imgWrapperRef.current) {
            gsap.set(imgWrapperRef.current, {
              scale: imgScale,
              borderRadius: borderRadius + "px",
            });
          }

          if (imgRef.current) {
            gsap.set(imgRef.current, { scale: innerImgScale });
          }

          if (marqueeRef.current) {
            if (imgScale >= 0.5 && imgScale <= 0.75) {
              const fadeProgress = (imgScale - 0.5) / (0.75 - 0.5);
              gsap.set(marqueeRef.current, { opacity: 1 - fadeProgress });
            } else if (imgScale < 0.5) {
              gsap.set(marqueeRef.current, { opacity: 1 });
            } else if (imgScale > 0.75) {
              gsap.set(marqueeRef.current, { opacity: 0 });
            }
          }

          // Handle scroll hint visibility
          if (scrollHintRef.current) {
            if (imgScale >= 0.5 && imgScale <= 0.75) {
              const fadeProgress = (imgScale - 0.5) / (0.75 - 0.5);
              gsap.set(scrollHintRef.current, { opacity: 1 - fadeProgress });
            } else if (imgScale < 0.5) {
              gsap.set(scrollHintRef.current, { opacity: 1 });
            } else if (imgScale > 0.75) {
              gsap.set(scrollHintRef.current, { opacity: 0 });
            }
          }

          const titleChars = cardRef.current?.querySelectorAll(".char span");
          if (progress >= 1 && !contentRevealedRef.current && titleChars) {
            contentRevealedRef.current = true;
            animateContentIn(Array.from(titleChars), descriptionRef.current);
          }

          if (progress < 1 && contentRevealedRef.current && titleChars) {
            contentRevealedRef.current = false;
            animateContentOut(Array.from(titleChars), descriptionRef.current);
          }
        },
      });
      scrollTriggerRefs.current.push(introTrigger);
    } else if (cardRef.current) {
      // Card transition animations
      if (!isLastCard) {
        const introCardImgWrapper = document.querySelector(
          ".card:first-child .card-img"
        );
        if (cardRef.current.nextElementSibling) {
          const transitionTrigger = ScrollTrigger.create({
            trigger: cardRef.current.nextElementSibling,
            start: "top bottom",
            end: "top top",
            onUpdate: (self) => {
              const progress = self.progress;
              if (introCardImgWrapper) {
                gsap.set(introCardImgWrapper, {
                  scale: 1 - progress * 0.25,
                  opacity: 1 - progress,
                });
              }
            },
          });
          scrollTriggerRefs.current.push(transitionTrigger);
        }
      }

      // Card entrance animations
      const entranceTrigger = ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top bottom",
        end: "top top",
        onUpdate: (self) => {
          const progress = self.progress;
          if (imgRef.current) {
            gsap.set(imgRef.current, { scale: 2 - progress });
          }
          if (imgWrapperRef.current) {
            gsap.set(imgWrapperRef.current, {
              borderRadius: 150 - progress * 125 + "px",
            });
          }
        },
      });
      scrollTriggerRefs.current.push(entranceTrigger);

      // Content animations
      const contentTrigger = ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top top",
        onEnter: () => {
          const titleChars = cardRef.current?.querySelectorAll(".char span");
          if (titleChars) {
            animateContentIn(Array.from(titleChars), descriptionRef.current);
          }
        },
        onLeaveBack: () => {
          const titleChars = cardRef.current?.querySelectorAll(".char span");
          if (titleChars) {
            animateContentOut(Array.from(titleChars), descriptionRef.current);
          }
        },
      });
      scrollTriggerRefs.current.push(contentTrigger);
    }

    return () => {
      // Cleanup only our animations and triggers
      if (splitTextRef.current) {
        splitTextRef.current.revert();
      }
      if (marqueeAnimationRef.current) {
        marqueeAnimationRef.current.kill();
      }
      scrollTriggerRefs.current.forEach((trigger) => trigger.kill());

      // Reset GSAP states for our elements only
      const elementsToReset = [
        imgWrapperRef.current,
        imgRef.current,
        marqueeRef.current,
        scrollHintRef.current,
      ].filter(Boolean); // Filter out null values

      if (elementsToReset.length > 0) {
        gsap.set(elementsToReset, {
          clearProps: "all",
        });
      }
    };
  }, [isIntroCard, isLastCard, totalCards]);

  return {
    cardRef,
    titleRef,
    descriptionRef,
    imgWrapperRef,
    imgRef,
    marqueeRef,
    scrollHintRef,
  };
}
