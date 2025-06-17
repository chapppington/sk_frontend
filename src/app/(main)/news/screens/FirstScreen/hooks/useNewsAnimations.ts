import { useEffect, RefObject } from "react";
import gsap from "gsap";

interface AnimationRefs {
  contentRef: RefObject<HTMLDivElement | null>;
  categoryRef: RefObject<HTMLDivElement | null>;
  titleRef: RefObject<HTMLDivElement | null>;
  metaRef: RefObject<HTMLDivElement | null>;
  descriptionRef: RefObject<HTMLParagraphElement | null>;
  buttonRef: RefObject<HTMLDivElement | null>;
}

export const useContentAnimation = (
  refs: AnimationRefs,
  currentIndex: number
) => {
  useEffect(() => {
    const {
      contentRef,
      categoryRef,
      titleRef,
      metaRef,
      descriptionRef,
      buttonRef,
    } = refs;

    // Reset all elements to initial state with smaller y offset
    gsap.set(
      [
        contentRef.current,
        categoryRef.current,
        titleRef.current,
        metaRef.current,
        descriptionRef.current,
        buttonRef.current,
      ],
      {
        opacity: 0,
        y: 10,
      }
    );

    // Create the animation sequence with smoother easing
    const tl = gsap.timeline({
      defaults: {
        ease: "expo.out",
        duration: 0.3,
      },
    });

    // Animate elements one after another with no overlap
    tl.to(contentRef.current, {
      opacity: 1,
      y: 0,
    })
      .to(categoryRef.current, {
        opacity: 1,
        y: 0,
      })
      .to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
        },
        "-=0.3"
      )
      .to(
        metaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        "-=0.3"
      )
      .to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
        },
        "-=0.5"
      )
      .to(
        buttonRef.current,
        {
          opacity: 1,
          y: 0,
        },
        "-=0.35"
      );

    return () => {
      tl.kill();
    };
  }, [currentIndex, refs]);
};

export const useImageTransition = (
  imageRefs: RefObject<(HTMLDivElement | null)[]>,
  currentIndex: number,
  prevIndex: number
) => {
  useEffect(() => {
    // Animate image transition
    if (imageRefs.current?.[currentIndex] && imageRefs.current?.[prevIndex]) {
      const currentImage = imageRefs.current[currentIndex];
      const prevImage = imageRefs.current[prevIndex];

      // Set initial states
      gsap.set(currentImage, { opacity: 0, zIndex: 2 });
      gsap.set(prevImage, { opacity: 1, zIndex: 1 });

      // Create a timeline for image transitions
      const imageTl = gsap.timeline({
        defaults: {
          ease: "back.in",
          duration: 0.01,
        },
      });

      imageTl
        .to(currentImage, {
          opacity: 1,
        })
        .to(
          prevImage,
          {
            opacity: 0,
          },
          "-=0.15"
        );

      return () => {
        imageTl.kill();
      };
    }
  }, [currentIndex, prevIndex, imageRefs]);
};
