"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import CustomContainer from "@/components/ui/CustomContainer";
import { GradientHeading } from "@/components/ui/GradientHeading/GradientHeading";
import BracketsText from "@/components/ui/BracketsText";
import AnimatedText from "@/components/ui/textAnimation/AnimatedText";
import RevealAnimation from "@/components/ui/RevealAnimation/RevealAnimation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Mock reviews data
const reviews = [
  {
    id: 1,
    quote:
      "Значимость этих проблем настолько очевидна, что сложившаяся структура организации в значительной степени обусловливает важность каксамодостаточных, так и внешне зависимых концептуальных решений",
    name: "Иванов Иван Павлович",
    role: "Клиент",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    quote:
      "Повседневная практика показывает, что сложившаяся структура организации требует от нас анализа поставленных обществом задач. Приятно, граждане, наблюдать, как элементы политического процесса призваны к ответу.",
    name: "Петрова Анна Сергеевна",
    role: "Партнер",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    quote:
      "Ясность нашей позиции очевидна: постоянный количественный рост и сфера нашей активности требует анализа новых предложений. Банальные, но неопровержимые выводы.",
    name: "Сидоров Алексей Николаевич",
    role: "Инвестор",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
  },
];

const ReviewScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [key, setKey] = useState(0);

  const userInfoRef = useRef(null);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    // Create ScrollTrigger instances
    const userInfoTrigger = gsap.fromTo(
      userInfoRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );

    // Cleanup function
    return () => {
      // Kill all ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      // Kill the animations
      userInfoTrigger.kill();
    };
  }, []);

  // Animation for content switching
  useEffect(() => {
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
  }, [currentIndex]);

  const handlePrev = () => {
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : reviews.length - 1));
    setKey((prev) => prev + 1);
  };

  const handleNext = () => {
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev < reviews.length - 1 ? prev + 1 : 0));
    setKey((prev) => prev + 1);
  };

  const currentReview = reviews[currentIndex];

  return (
    <section ref={sectionRef} className="relative flex flex-col justify-center">
      {/* Main Content in CustomContainer */}
      <CustomContainer className="relative z-10 flex flex-col py-24">
        {/* Section Label - Left Aligned, On Top */}
        <div className="w-full flex justify-start">
          <BracketsText className="mb-8 md:mb-12">ОТЗЫВЫ</BracketsText>
        </div>
        {/* Main Row Content */}
        <div className="flex flex-col md:flex-row items-end justify-between w-full">
          {/* Left: Gradient Heading */}
          <div className="flex-1">
            <AnimatedText delay={0}>
              <GradientHeading className="leading-tight mb-0">
                Никто не вправе
                <br />
                осуждать глас грядущего
                <br />
                поколения
              </GradientHeading>
            </AnimatedText>
          </div>

          {/* Right: Testimonial */}
          <div className="flex-1 flex flex-col items-start">
            {/* Content Container with Fixed Height */}
            <div ref={contentRef} className="w-full">
              {/* Big fat commas SVG - Static */}
              <div className="mb-12">
                <svg
                  width="64"
                  height="54"
                  viewBox="0 0 47 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.736023 27.6479C0.736023 23.8932 1.54669 20.3092 3.16802 16.8959C4.78935 13.4826 6.92269 10.3679 9.56802 7.55192C12.2987 4.65059 15.2427 2.17593 18.4 0.12793L20.832 3.58392C17.76 6.05859 15.2427 8.40526 13.28 10.6239C11.4027 12.7572 9.73869 15.5306 8.28802 18.9439L12 22.2719C13.9627 23.8932 15.2853 25.4719 15.968 27.0079C16.6507 28.5439 16.992 30.1226 16.992 31.7439C16.992 34.3039 16.3093 36.2239 14.944 37.5039C13.5787 38.6986 11.744 39.2959 9.44002 39.2959C8.16002 39.2959 6.92269 39.1252 5.72802 38.7839C4.61869 38.3572 3.55202 37.6746 2.52802 36.7359C1.33335 33.8346 0.736023 30.8052 0.736023 27.6479ZM26.72 27.6479C26.72 23.8932 27.5307 20.3092 29.152 16.8959C30.7733 13.4826 32.9067 10.3679 35.552 7.55192C38.2827 4.65059 41.2267 2.17593 44.384 0.12793L46.816 3.58392C43.744 6.05859 41.2267 8.40526 39.264 10.6239C37.3867 12.7572 35.7227 15.5306 34.272 18.9439L37.984 22.2719C39.9467 23.8932 41.2693 25.4719 41.952 27.0079C42.6347 28.5439 42.976 30.1226 42.976 31.7439C42.976 34.3039 42.2933 36.2239 40.928 37.5039C39.5627 38.6986 37.728 39.2959 35.424 39.2959C34.144 39.2959 32.9067 39.1252 31.712 38.7839C30.6027 38.3572 29.536 37.6746 28.512 36.7359C27.3173 33.8346 26.72 30.8052 26.72 27.6479Z"
                    fill="url(#paint0_linear_2769_40538)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_2769_40538"
                      x1="-3.99998"
                      y1="32.9999"
                      x2="47.963"
                      y2="86.9615"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="white" />
                      <stop offset="1" stopColor="#71717A" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              {/* Testimonial Text */}
              <AnimatedText key={`quote-${key}`} delay={0.1}>
                <blockquote className="text-lg md:text-xl text-gray-300 font-light mb-8 first-line:pl-8 min-h-[120px]">
                  {currentReview.quote}
                </blockquote>
              </AnimatedText>
              {/* User Info */}
              <div ref={userInfoRef} className="flex items-center gap-4 mt-6">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <RevealAnimation
                    key={`image-${key}`}
                    duration={0.8}
                    useScrollTrigger={false}
                  >
                    <div className="w-full h-full">
                      <Image
                        src={currentReview.image}
                        alt="avatar"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </RevealAnimation>
                </div>
                <div>
                  <AnimatedText key={`name-${key}`} delay={0.2}>
                    <div className="text-white font-semibold text-lg">
                      {currentReview.name}
                    </div>
                  </AnimatedText>
                  <AnimatedText key={`role-${key}`} delay={0.3}>
                    <div className="text-gray-400 text-sm">
                      {currentReview.role}
                    </div>
                  </AnimatedText>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center mt-8">
              {/* Page Counter */}
              <div className="text-white text-lg">
                <span className="text-2xl">
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-white/60">
                  /{String(reviews.length).padStart(2, "0")}
                </span>
              </div>

              {/* Navigation Arrows */}
              <div className="flex ml-5">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors mr-4"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default ReviewScreen;
