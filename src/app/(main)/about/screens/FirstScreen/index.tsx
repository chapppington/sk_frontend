"use client";

import { Parallax } from "react-parallax";
import { FC, useState } from "react";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CustomContainer from "@/components/ui/CustomContainer";
import BlackBoxWithStats from "@/components/ui/BlackBoxWithStats";
import GradientHeading from "@/components/ui/GradientHeading";
import styles from "@/components/ui/GradientHeading/styles.module.css";
import useIsMobile from "@/hooks/useIsMobile";
import MainButton from "@/components/ui/MainButton";
import VideoPopup from "@/app/(main)/portfolio/[slug]/screens/FirstScreen/components/VideoPopup";

const FirstScreen: FC = () => {
  const [isVideoOpen, setVideoOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <header className="relative min-h-screen overflow-y-hidden">
      {isMobile ? (
        <div
          className="absolute inset-0 z-0 select-none pointer-events-none"
          style={{
            backgroundImage: 'url("/production_bg.webp")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ) : (
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Parallax
            bgImage="/production_bg.webp"
            strength={200}
            className="w-full h-full"
          />
        </div>
      )}
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
            { label: "О компании", href: "/about", current: true },
          ]}
        />
        {/* Main Content */}
        <CustomContainer
          className="flex flex-col justify-between pb-[180px] sm:pb-[260px] md:pb-[300px] lg:pb-12"
          fullHeight
        >
          <GradientHeading
            className={`${styles.fluidHeadingMain} z-10 pt-8 sm:pt-12 md:pt-16`}
          >
            О компании
            <br />и нашей команде
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
                Являясь всего лишь частью общей картины, тщательные исследования
                конкурентов могут быть описаны максимально подробно.
              </p>
              <MainButton
                text="Смотреть видео о компании"
                onClick={() => setVideoOpen(true)}
                className="mt-6 w-fit"
                disableRedirect
              />
            </div>
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
        <VideoPopup
          isOpen={isVideoOpen}
          onClose={() => setVideoOpen(false)}
          videoSrc="https://rutube.ru/play/embed/d6f8f15c577b6d27fa7429dbf9e82ddd"
          posterSrc={""}
        />
      </div>
    </header>
  );
};

export default FirstScreen;
