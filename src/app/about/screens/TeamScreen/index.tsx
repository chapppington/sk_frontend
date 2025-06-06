"use client";

import { PagesConfig } from "@/config/pages.config";

import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import CustomContainer from "@/components/ui/CustomContainer";
import BracketsText from "@/components/ui/BracketsText";
import AnimatedText from "@/components/ui/AnimatedText";
import GradientHeading from "@/components/ui/GradientHeading";
import MainButton from "@/components/ui/MainButton";

import { teamMembers } from "./mock_data";
import { TeamMemberCard } from "@/app/about/screens/TeamScreen/components/TeamMemberCard";

export default function TeamScreen() {
  return (
    <section className="py-20">
      <CustomContainer>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-16 items-start">
          {/* Left column: BracketsText */}
          <div className="md:col-span-1 flex md:block justify-start md:justify-end mb-6 md:mb-0">
            <BracketsText className="md:mt-2">FAQ</BracketsText>
          </div>

          {/* Right column: Main content */}
          <div className="md:col-span-4 flex flex-col gap-8 ">
            <AnimatedText>
              <GradientHeading className="leading-tight text-4xl md:text-6xl">
                Сложно сказать, почему постоянный количественный рост{" "}
                <span className="text-white/60">
                  связывает нас с нашим прошлым
                </span>
              </GradientHeading>
            </AnimatedText>

            {/* Swiper Slider */}
            <div className="relative">
              {/* Description and Buttons Row */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <AnimatedText>
                  <p className="text-white/60 max-w-2xl">
                    В своём стремлении улучшить пользовательский опыт мы
                    упускаем, что предприниматели в сети интернет лишь добавляют
                    фракционных разногласий и представлены в исключительно
                    положительном свете.
                  </p>
                </AnimatedText>
                <div className="flex items-center space-x-3">
                  <button className="team-prev w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors">
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
                      />
                    </svg>
                  </button>
                  <button className="team-next w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors">
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
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                navigation={{
                  nextEl: ".team-next",
                  prevEl: ".team-prev",
                }}
                breakpoints={{
                  300: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                  1400: { slidesPerView: 4 },
                }}
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                touchMoveStopPropagation={true}
                className="mt-12"
              >
                {teamMembers.map((member, idx) => (
                  <SwiperSlide key={idx}>
                    <TeamMemberCard {...member} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mt-6 border-t border-white/20 pt-4">
              <div className="text-white text-xl md:text-2xl font-light">
                Хотите к нам в команду?
              </div>
              <MainButton text="Смотреть вакансии" href={PagesConfig.vacancies} />
            </div>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
}
