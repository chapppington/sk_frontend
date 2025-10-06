"use client";

import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import CustomContainer from "@/components/ui/CustomContainer";
import BracketsText from "@/components/ui/BracketsText";
import GradientHeading from "@/components/ui/GradientHeading";
import MainButton from "@/components/ui/MainButton";
import { NavigationButton } from "@/components/ui/NavigationButton";

import { TeamMemberCard } from "@/app/(main)/about/screens/TeamScreen/components/TeamMemberCard";
import { useAboutPageConfigPublic } from "@/hooks/useAboutPageConfigPublic";

export default function TeamScreen() {
  const { config, loading } = useAboutPageConfigPublic();

  if (loading || !config) {
    return (
      <section className="py-20">
        <CustomContainer>
          <div className="text-white text-center">Загрузка...</div>
        </CustomContainer>
      </section>
    );
  }

  const teamMembers = config.teamScreen.team_members.sort((a, b) => a.order - b.order);

  return (
    <section className="py-20">
      <CustomContainer>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-16 items-start">
          {/* Left column: BracketsText */}
          <div className="md:col-span-1 flex md:block justify-start md:justify-end mb-6 md:mb-0">
            <BracketsText className="md:mt-2">{config.teamScreen.brackets_text}</BracketsText>
          </div>

          {/* Right column: Main content */}
          <div className="md:col-span-4 flex flex-col gap-8 ">
            <GradientHeading className="leading-tight text-4xl md:text-5xl">
              {config.teamScreen.title.split(' ').map((word, index, array) => {
                // Показываем последние слова с пониженной прозрачностью
                const isLastPart = index >= Math.floor(array.length * 0.6);
                return (
                  <span key={index} className={isLastPart ? "text-white/60" : ""}>
                    {word}{index < array.length - 1 ? " " : ""}
                  </span>
                );
              })}
            </GradientHeading>

            {/* Swiper Slider */}
            <div className="relative">
              {/* Description and Buttons Row */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <p className="text-white/60 max-w-2xl mb-4 md:mb-0">
                  {config.teamScreen.description}
                </p>
                {/* Кнопки навигации - скрыты на мобильных, показаны на десктопе */}
                <div className="hidden md:flex items-center space-x-3">
                  <NavigationButton
                    direction="prev"
                    sliderId="team"
                    className="slider-prev-team"
                  />
                  <NavigationButton
                    direction="next"
                    sliderId="team"
                    className="slider-next-team"
                  />
                </div>
              </div>
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                navigation={{
                  nextEl: ".slider-next-team",
                  prevEl: ".slider-prev-team",
                }}
                breakpoints={{
                  300: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                  1400: { slidesPerView: 4 },
                }}
                loop={true}
                autoplay={false}
                touchMoveStopPropagation={true}
                className="mt-12"
              >
                {teamMembers.map((member, idx) => (
                  <SwiperSlide key={idx}>
                    <TeamMemberCard {...member} />
                  </SwiperSlide>
                ))}
              </Swiper>
              
              {/* Кнопки навигации под слайдером - показаны только на мобильных */}
              <div className="flex md:hidden items-center justify-center space-x-3 mt-6">
                <NavigationButton
                  direction="prev"
                  sliderId="team"
                  className="slider-prev-team"
                />
                <NavigationButton
                  direction="next"
                  sliderId="team"
                  className="slider-next-team"
                />
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mt-6 border-t border-white/20 pt-4">
              <div className="text-white text-xl md:text-2xl font-light">
                {config.teamScreen.cta_text}
              </div>
              <MainButton
                text={config.teamScreen.cta_button_text}
                href={config.teamScreen.cta_button_href}
              />
            </div>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
}
