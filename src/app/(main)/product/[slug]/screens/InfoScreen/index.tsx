"use client";

import { FC, useState, useEffect, useRef } from "react";
import Image from "next/image";

import gsap from "gsap";

import BracketsText from "@/components/ui/BracketsText";
import CustomContainer from "@/components/ui/CustomContainer";
import AnimatedText from "@/components/ui/AnimatedText";
import CategoryButton from "@/components/ui/CategoryButton";

import { features } from "./mock_data";

const InfoScreen: FC = () => {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [previousFeatureIndex, setPreviousFeatureIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const activeImageRef = useRef<HTMLDivElement>(null);
  const previousImageRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const handleFeatureChange = (idx: number) => {
    if (idx === activeFeatureIndex) return;

    // Kill any ongoing animation
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    setPreviousFeatureIndex(activeFeatureIndex);
    setActiveFeatureIndex(idx);
    setIsAnimating(true);
  };

  useEffect(() => {
    if (previousFeatureIndex === activeFeatureIndex) return;

    // Create a new timeline
    const timeline = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    // Store the timeline in the ref for possible interruption
    timelineRef.current = timeline;

    // Set initial opacity of new image to 0
    if (activeImageRef.current) {
      gsap.set(activeImageRef.current, { opacity: 0 });
    }

    // Fade in the new image on top
    timeline.to(activeImageRef.current, {
      opacity: 1,
      duration: 0.4, // Make animation faster
      ease: "power2.inOut",
    });

    // Cleanup function to kill the timeline when component unmounts
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [activeFeatureIndex, previousFeatureIndex]);

  return (
    <section className="relative flex flex-col py-24">
      <CustomContainer className="flex flex-col md:flex-row w-full items-stretch">
        {/* Left Section */}
        <div className="w-full md:w-2/5 z-30 flex flex-col pr-4 relative justify-start">
          <BracketsText>ПРЕИМУЩЕСТВА</BracketsText>
          {/* Overlapping Heading */}
          <AnimatedText delay={0} animateOnScroll={false}>
            <h1
              className="
                text-4xl md:text-5xl mt-8 text-white
                mb-12
                z-40
                md:w-[180%] md:max-w-none
                md:pr-32
                md:-mr-[40%]
                pointer-events-none
                relative
            "
            >
              Эффективное электроснабжение в условиях современных требований к
              надёжности и безопасности
            </h1>
          </AnimatedText>
          <div className="flex flex-col gap-3 mt-2">
            {features.map((feature, idx) => (
              <CategoryButton
                key={idx}
                onClick={() => handleFeatureChange(idx)}
                isActive={idx === activeFeatureIndex}
                className="flex items-center w-auto self-start"
              >
                <Image src={`/${feature.icon}`} alt="" width={24} height={24} />
                <span className="text-base ml-4">{feature.label}</span>
              </CategoryButton>
            ))}
          </div>
        </div>
        {/* Right Section */}
        <div className="w-full md:w-3/5 flex flex-col">
          <div
            ref={imageContainerRef}
            className="relative w-full h-full flex-1"
          >
            {/* Previous Image (behind) */}
            {previousFeatureIndex !== activeFeatureIndex && (
              <div
                ref={previousImageRef}
                className="w-full h-full absolute inset-0 z-0"
              >
                <Image
                  src={features[previousFeatureIndex].image}
                  alt={features[previousFeatureIndex].label}
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 rounded-lg" />
              </div>
            )}

            {/* Active Image (on top) */}
            <div
              ref={activeImageRef}
              className="w-full h-full absolute inset-0 z-10"
            >
              <Image
                src={features[activeFeatureIndex].image}
                alt={features[activeFeatureIndex].label}
                fill
                className="object-cover rounded-lg"
                priority
              />
              <div className="absolute inset-0 bg-black/30 rounded-lg" />
            </div>

            <div
              ref={textContainerRef}
              className="absolute bottom-4 right-4 bg-black/80 text-white font-light rounded-lg p-6 max-w-md shadow-lg z-20"
            >
              <AnimatedText
                key={activeFeatureIndex}
                delay={0}
                animateOnScroll={false}
              >
                <p>{features[activeFeatureIndex].description}</p>
              </AnimatedText>
            </div>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default InfoScreen;
