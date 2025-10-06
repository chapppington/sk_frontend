"use client";

import { FC, useState } from "react";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CustomContainer from "@/components/ui/CustomContainer";
import BlackBoxWithStats from "@/components/ui/BlackBoxWithStats";
import GradientHeading from "@/components/ui/GradientHeading";
import styles from "@/components/ui/GradientHeading/styles.module.css";
import ParallaxImage from "@/components/ui/ParallaxImage";
import useIsMobile from "@/hooks/useIsMobile";
import MainButton from "@/components/ui/MainButton";
import VideoPopup from "@/app/(main)/portfolio/[slug]/screens/FirstScreen/components/VideoPopup";
import { useAboutPageConfigPublic } from "@/hooks/useAboutPageConfigPublic";
import { UPLOADS_URL } from "@/constants";

const FirstScreen: FC = () => {
  const [isVideoOpen, setVideoOpen] = useState(false);
  const isMobile = useIsMobile();
  const { config, loading } = useAboutPageConfigPublic();

  if (loading || !config) {
    return (
      <header className="relative min-h-screen overflow-y-hidden">
        <div className="absolute inset-0 z-0 select-none pointer-events-none bg-black"></div>
        <div className="relative z-[3] flex items-center justify-center min-h-screen">
          <div className="text-white">Загрузка...</div>
        </div>
      </header>
    );
  }

  return (
    <header className="relative min-h-screen overflow-y-hidden">
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <ParallaxImage
          src={config.firstScreen.bg_image ? `${UPLOADS_URL}${config.firstScreen.bg_image}` : "/about.png"}
          alt="About background"
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
            level={1}
          >
            {config.firstScreen.title.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < config.firstScreen.title.split('\n').length - 1 && <br />}
              </span>
            ))}
          </GradientHeading>
          {/* Bottom Content */}
          <div className="flex z-10">
            {/* Bottom Left Text with Arrow */}
            <div className="flex flex-col justify-end 2xl:max-w-2xl">
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
              <p className="text-sm md:text-md laptop:text-lg text-white/70 lg:max-w-[400px] 2xl:max-w-[600px]">
                {config.firstScreen.subtitle}
              </p>
              <div className="block md:hidden">
                <div className="flex flex-col sm:flex-row gap-4">
                  <MainButton
                    text={config.firstScreen.button_text}
                    onClick={() => setVideoOpen(true)}
                    size="sm"
                    className="w-fit"
                    disableRedirect
                  />
                </div>
              </div>
              <div className="hidden md:block">
                <div className="flex gap-4 mt-4">
                  <MainButton
                    text={config.firstScreen.button_text}
                    onClick={() => setVideoOpen(true)}
                    className="w-fit"
                    disableRedirect
                  />
                </div>
              </div>
            </div>
          </div>
        </CustomContainer>
        <BlackBoxWithStats
          transparent={true}
          className="z-[5]"
          stats={config.firstScreen.stats.map(stat => ({
            value: stat.value,
            description: stat.description,
            showOnMobile: stat.showOnMobile,
          }))}
        />
        <VideoPopup
          isOpen={isVideoOpen}
          onClose={() => setVideoOpen(false)}
          videoSrc="/videos/about.mp4"
          posterSrc=""
        />
      </div>
    </header>
  );
};

export default FirstScreen;
