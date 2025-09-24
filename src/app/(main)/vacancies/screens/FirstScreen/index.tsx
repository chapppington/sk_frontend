"use client";

import { FC } from "react";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CustomContainer from "@/components/ui/CustomContainer";
import BlackBoxWithStats from "@/components/ui/BlackBoxWithStats";
import GradientHeading from "@/components/ui/GradientHeading";
import styles from "@/components/ui/GradientHeading/styles.module.css";
import ParallaxImage from "@/components/ui/ParallaxImage";
import useIsMobile from "@/hooks/useIsMobile";
import { useVacanciesPageConfigPublic } from "@/hooks/useVacanciesPageConfigPublic";
import { UPLOADS_URL } from "@/constants";

const FirstScreen: FC = () => {
  const isMobile = useIsMobile();
  const { config, loading } = useVacanciesPageConfigPublic();

  // Wait for config to load to avoid double image loading
  const bg = config?.firstScreen?.bg_image
    ? `${UPLOADS_URL}${config.firstScreen.bg_image}`
    : "/вакансии.webp";

  return (
    <header className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        {loading ? (
          <div className="w-full h-full bg-gradient-to-b from-gray-800 via-gray-900 to-black animate-pulse" />
        ) : (
          <ParallaxImage
            src={bg}
            alt="Vacancies background"
            priority
            isMobile={isMobile}
            quality={100}
            className="brightness-50"
          />
        )}
      </div>

      {/* Base Overlay */}
      <div className="overlay-base absolute inset-0 bg-black/20"></div>

      {/* Gradient Overlay */}
      <div className="overlay-gradient absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent z-[-1]"></div>

      <Breadcrumbs
        className="z-10 relative"
        items={[
          { label: "Главная", href: "/", current: false },
          { label: "Вакансии", href: "/vacancies", current: true },
        ]}
      />

      {/* Main Content */}
      <CustomContainer className="flex flex-col justify-between" fullHeight>
        <GradientHeading
          className={`${styles.fluidHeadingMain} max-w-4xl pt-16`}
          style={{ zIndex: 10 }}
          level={1}
        >
          {config?.firstScreen?.title ||
            "Показываем новые горизонты, превосходящие ожидания"}
        </GradientHeading>

        {/* Bottom Content */}
        <div className="flex z-10 mb-[150px] sm:mb-[260px] md:mb-[280px] lg:mb-8">
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
            <p className="text-sm md:text-lg text-white/70 lg:max-w-[400px] 2xl:max-w-[600px]">
              {config?.firstScreen?.subtitle ||
                "Компания «СибКомплект» — это сплочённая команда профессионалов своего дела. Наши знания и опыт позволяют решать задачи любой сложности по обеспечению потребностей качественным и надежным электротехническим оборудованием."}
            </p>
          </div>
        </div>
      </CustomContainer>

      <BlackBoxWithStats
        className="z-[5]"
        transparent={true}
        stats={config?.firstScreen?.stats || []}
      />
    </header>
  );
};

export default FirstScreen;
