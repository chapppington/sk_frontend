"use client";
import { FC } from "react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CustomContainer from "@/components/ui/CustomContainer";
import BlackBoxWithStats from "@/components/ui/BlackBoxWithStats";
import GradientHeading from "@/components/ui/GradientHeading";
import styles from "@/components/ui/GradientHeading/styles.module.css";
import ParallaxImage from "@/components/ui/ParallaxImage";
import MainButton from "@/components/ui/MainButton";
import useIsMobile from "@/hooks/useIsMobile";

const FirstScreen: FC = () => {
  const isMobile = useIsMobile();

  return (
    <header className="relative min-h-screen overflow-y-hidden">
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <ParallaxImage
          src="/prod_bg.webp"
          alt="Production background"
          priority
          isMobile={isMobile}
          className="brightness-75"
        />
      </div>
      <div className="absolute inset-0 z-[1]">
        {/* Base Overlay */}
        <div className="overlay-base absolute inset-0 bg-black/90"></div>

        {/* Gradient Overlay */}
        <div className="overlay-gradient absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black/40"></div>

        {/* Blue Tint Overlay */}
        <div className="absolute inset-0 bg-blue-900/15 mix-blend-overlay"></div>
      </div>
      <div className="relative z-[3]">
        <Breadcrumbs
          className="relative"
          items={[
            { label: "Главная", href: "/", current: false },
            { label: "О производстве", href: "/production", current: true },
          ]}
        />

        {/* Main Content */}
        <CustomContainer
          className="flex flex-col justify-between pb-[180px] sm:pb-[260px] md:pb-[300px] lg:pb-12"
          fullHeight
        >
          <GradientHeading
            className={`${styles.fluidHeadingMain} 2xl:text-6xl z-100 pt-8 sm:pt-12 md:pt-16`}
            level={1}
          >
            Собственное производство
            <br />
            полного цикла
          </GradientHeading>
          {/* Bottom Content */}
          <div className="flex z-10">
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
                Инженерные решения для сложных технических задач и любых условий
                эксплуатации
              </p>
              <MainButton text="Просмотр 3D тура" href="#" />
            </div>
          </div>
        </CustomContainer>

        <BlackBoxWithStats
          transparent={true}
          className="z-[5]"
          stats={[
            {
              value: "8500 м²",
              description: "собственная производственная площадка",
              showOnMobile: true,
            },
            {
              value: "90%",
              description: "оборудования — современные станки с ЧПУ",
              showOnMobile: true,
            },
            {
              value: "от 7 дней",
              description: "срок сборки типового оборудования",
              showOnMobile: false,
            },
          ]}
        />
      </div>
    </header>
  );
};

export default FirstScreen;
