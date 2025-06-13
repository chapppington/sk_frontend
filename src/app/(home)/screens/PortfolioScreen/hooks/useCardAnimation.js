import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export function useCardAnimation(
  isIntroCard = false,
  isLastCard = false,
  totalCards = 0
) {
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const imgWrapperRef = useRef(null);
  const imgRef = useRef(null);
  const marqueeRef = useRef(null);
  const contentRevealedRef = useRef(false);

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
    if (isIntroCard) {
      gsap.set(imgWrapperRef.current, { scale: 0.5, borderRadius: "400px" });
      gsap.set(imgRef.current, { scale: 1.5 });
    }

    // Animation functions
    const animateContentIn = (titleChars, description) => {
      gsap.to(titleChars, { x: "0%", duration: 0.75, ease: "power4.out" });
      gsap.to(description, {
        x: 0,
        opacity: 1,
        duration: 0.75,
        delay: 0.1,
        ease: "power4.out",
      });
    };

    const animateContentOut = (titleChars, description) => {
      gsap.to(titleChars, { x: "100%", duration: 0.5, ease: "power4.out" });
      gsap.to(description, {
        x: "40px",
        opacity: 0,
        duration: 0.5,
        ease: "power4.out",
      });
    };

    // Scroll animations
    if (isIntroCard) {
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top top",
        end: "+=300vh",
        onUpdate: (self) => {
          const progress = self.progress;
          const imgScale = 0.5 + progress * 0.5;
          const borderRadius = 400 - progress * 375;
          const innerImgScale = 1.5 - progress * 0.5;

          gsap.set(imgWrapperRef.current, {
            scale: imgScale,
            borderRadius: borderRadius + "px",
          });

          gsap.set(imgRef.current, { scale: innerImgScale });

          if (imgScale >= 0.5 && imgScale <= 0.75) {
            const fadeProgress = (imgScale - 0.5) / (0.75 - 0.5);
            gsap.set(marqueeRef.current, { opacity: 1 - fadeProgress });
          } else if (imgScale < 0.5) {
            gsap.set(marqueeRef.current, { opacity: 1 });
          } else if (imgScale > 0.75) {
            gsap.set(marqueeRef.current, { opacity: 0 });
          }

          const titleChars = cardRef.current.querySelectorAll(".char span");
          if (progress >= 1 && !contentRevealedRef.current) {
            contentRevealedRef.current = true;
            animateContentIn(titleChars, descriptionRef.current);
          }

          if (progress < 1 && contentRevealedRef.current) {
            contentRevealedRef.current = false;
            animateContentOut(titleChars, descriptionRef.current);
          }
        },
      });
    } else {
      // Card transition animations
      if (!isLastCard) {
        const introCardImgWrapper = document.querySelector(
          ".card:first-child .card-img"
        );
        ScrollTrigger.create({
          trigger: cardRef.current.nextElementSibling,
          start: "top bottom",
          end: "top top",
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(introCardImgWrapper, {
              scale: 1 - progress * 0.25,
              opacity: 1 - progress,
            });
          },
        });
      }

      // Card entrance animations
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top bottom",
        end: "top top",
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(imgRef.current, { scale: 2 - progress });
          gsap.set(imgWrapperRef.current, {
            borderRadius: 150 - progress * 125 + "px",
          });
        },
      });

      // Content animations
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top top",
        onEnter: () => {
          const titleChars = cardRef.current.querySelectorAll(".char span");
          animateContentIn(titleChars, descriptionRef.current);
        },
        onLeaveBack: () => {
          const titleChars = cardRef.current.querySelectorAll(".char span");
          animateContentOut(titleChars, descriptionRef.current);
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
