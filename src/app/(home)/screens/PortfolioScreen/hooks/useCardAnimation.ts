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
  const contentRevealedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Split text animation
    if (titleRef.current) {
      const split = new SplitText(titleRef.current, {
        type: "chars",
        charsClass: "char",
        tag: "div",
      });
      split.chars.forEach((char) => {
        char.innerHTML = `<span>${char.textContent}</span>`;
      });
    }

    // Initial setup for intro card
    if (isIntroCard && imgWrapperRef.current && imgRef.current) {
      gsap.set(imgWrapperRef.current, { scale: 0.5, borderRadius: "400px" });
      gsap.set(imgRef.current, { scale: 1.5 });
    }

    // Animation functions
    const animateContentIn = (
      titleChars: Element[],
      description: HTMLElement | null
    ) => {
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
      ScrollTrigger.create({
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
    } else if (cardRef.current) {
      // Card transition animations
      if (!isLastCard) {
        const introCardImgWrapper = document.querySelector(
          ".card:first-child .card-img"
        );
        if (cardRef.current.nextElementSibling) {
          ScrollTrigger.create({
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
        }
      }

      // Card entrance animations
      ScrollTrigger.create({
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

      // Content animations
      ScrollTrigger.create({
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
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isIntroCard, isLastCard, totalCards]);

  return {
    cardRef,
    titleRef,
    descriptionRef,
    imgWrapperRef,
    imgRef,
    marqueeRef,
  };
}
