"use client";

import CustomContainer from "@/components/ui/CustomContainer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { GradientHeading } from "@/components/ui/GradientHeading/GradientHeading";
import { Suspense } from "react";
import ResortVideo from "@/components/ui/ResortVideo";

const TasksScreen = () => {
  return (
    <section className="min-h-screen pb-12">
      <CustomContainer>
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Кейс", href: "#", current: true },
          ]}
          className="mb-8"
          disableContainer
        />

        {/* Headings and Description */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <div>
            <GradientHeading className="mb-2">
              Курортный комплекс «Манжерок»
            </GradientHeading>
           
          </div>
          <div className="max-w-xl text-white/60 text-lg md:text-base">
            Круглогодичный курортный комплекс «Манжерок» расположен у
            знаменитого озера Манжерокское у подножия горы Малая Синюха – это
            центр семейного отдыха Республики Алтай, привлекающий туристов со
            всей России, Азиатского региона и Европы.
          </div>
        </div>

        {/* Image/Video Preview */}
        <div className="relative w-full aspect-[2.4/1] rounded-2xl overflow-hidden shadow-lg">
          <Suspense
            fallback={
              <div className="w-full h-full bg-black/20 rounded-2xl animate-pulse" />
            }
          >
            <ResortVideo
              src="/videos/manzherok.mp4"
              poster="/images/manzherok-poster.jpg"
              captions="/videos/manzherok-ru.vtt"
            />
          </Suspense>
          {/* Play Button Overlay */}
          <button
            className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group"
            aria-label="Play video"
          >
            <span className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center group-hover:bg-white/40 transition-all">
              <svg
                className="w-12 h-12 text-white drop-shadow-lg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 48 48"
              >
                <circle
                  cx="24"
                  cy="24"
                  r="22"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
                <polygon points="20,16 34,24 20,32" fill="white" />
              </svg>
            </span>
          </button>
        </div>
      </CustomContainer>
    </section>
  );
};

export default TasksScreen;
