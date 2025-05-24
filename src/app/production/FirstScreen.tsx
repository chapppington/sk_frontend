"use client";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { FC, useEffect, useState } from "react";
import CustomContainer from "@/components/ui/CustomContainer";
import BlackBoxWithStats from "@/components/ui/BlackBoxWithStats";
import { Parallax } from "react-parallax";
import AnimatedText from "@/components/ui/textAnimation/AnimatedText";
import { GradientHeading } from "@/components/ui/GradientHeading/GradientHeading";

const FirstScreen: FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const content = (
    <>
      {/* Base Overlay */}
      <div className="overlay-base absolute inset-0 bg-black/30"></div>

      {/* Gradient Overlay */}
      <div className="overlay-gradient absolute inset-0 bg-gradient-to-b from-black via-black/50 to-transparent z-[0]"></div>

      {/* Blue Tint Overlay */}
      <div className="absolute inset-0 bg-blue-900/30 mix-blend-overlay z-[1]"></div>

      <Breadcrumbs
        className="z-10 relative"
        items={[
          { label: "Главная", href: "/", current: false },
          { label: "О производстве", href: "/production", current: true },
        ]}
      />

      {/* Main Content */}
      <CustomContainer
        className="flex flex-col justify-between pb-[150px] sm:pb-[260px] md:pb-[280px] lg:pb-8"
        fullHeight
      >
        <AnimatedText triggerStart="top 100%">
          <GradientHeading className="2xl:text-6xl z-10 pt-8 sm:pt-12 md:pt-16">
            Производство
            <br />
            электрооборудования
          </GradientHeading>
        </AnimatedText>
        {/* Bottom Content */}
        <div className="flex z-10">
          <AnimatedText triggerStart="top 100%">
            {/* Bottom Left Text with Arrow */}
            <div className="flex flex-col justify-end max-w-xl">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center mb-4 md:mb-6">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 17L17 7M17 7H7M17 7V17"
                  />
                </svg>
              </div>
              <p className="text-sm md:text-lg text-white/70 lg:max-w-[400px] 2xl:max-w-[500px]">
                Являясь всего лишь частью общей картины, тщательные исследования
                конкурентов могут быть описаны максимально подробно.
              </p>
            </div>
          </AnimatedText>
        </div>
      </CustomContainer>

      <BlackBoxWithStats
        transparent={true}
        className="z-[5]"
        stats={[
          {
            value: "197",
            description: "Крупнейших городов России и Казахстана",
          },
          {
            value: "197",
            description: "Крупнейших городов России и Казахстана",
          },
        ]}
      />
    </>
  );

  return (
    <header className="relative">
      {isMobile ? (
        <div
          className="relative h-full"
          style={{
            backgroundImage: 'url("/production_bg.webp")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {content}
        </div>
      ) : (
        <Parallax bgImage="/production_bg.webp" strength={200}>
          {content}
        </Parallax>
      )}
    </header>
  );
};

export default FirstScreen;
