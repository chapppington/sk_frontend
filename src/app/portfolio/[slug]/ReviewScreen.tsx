"use client";

import React, { useRef } from "react";
import Image from "next/image";
import CustomContainer from "@/components/ui/CustomContainer";
import { GradientHeading } from "@/components/ui/GradientHeading";
import BracketsText from "@/components/ui/BracketsText";
import AnimatedText from "@/components/ui/textAnimation/AnimatedText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ReviewScreen = () => {
  const quotesRef = useRef(null);
  const userInfoRef = useRef(null);
  const imageRef = useRef(null);
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Create ScrollTrigger instances
    const quotesTrigger = gsap.fromTo(
      quotesRef.current,
      {
        scale: 0.8,
        opacity: 0,
        rotation: -5,
        y: 50,
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );

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

    const imageTrigger = gsap.fromTo(
      imageRef.current,
      {
        scale: 0.9,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
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
      quotesTrigger.kill();
      userInfoTrigger.kill();
      imageTrigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-center overflow-hidden"
    >
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
            {/* Big fat commas SVG */}
            <div className="mb-12" ref={quotesRef}>
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
            <AnimatedText delay={0}>
              <blockquote className="text-lg md:text-xl text-gray-300 font-light mb-8 first-line:pl-8">
                «Значимость этих проблем настолько очевидна, что сложившаяся
                структура организации в значительной степени обусловливает
                важность каксамодостаточных, так и внешне зависимых
                концептуальных решений»
              </blockquote>
            </AnimatedText>
            {/* User Info */}
            <div ref={userInfoRef} className="flex items-center gap-4 mt-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-gray-700">
                <div ref={imageRef} className="w-full h-full">
                  <Image
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="avatar"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <AnimatedText delay={0}>
                  <div className="text-white font-semibold text-lg">
                    Иванов Иван Павлович
                  </div>
                </AnimatedText>
                <AnimatedText delay={0}>
                  <div className="text-gray-400 text-sm">Клиент</div>
                </AnimatedText>
              </div>
            </div>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default ReviewScreen;
