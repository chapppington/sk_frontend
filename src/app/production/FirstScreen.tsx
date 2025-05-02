import Breadcrumbs from "@/components/ui/Breadcrumbs";
import MainButton from "@/components/ui/MainButton";
import { FC } from "react";
import CustomContainer from "@/components/ui/CustomContainer";
import BlackBoxWithStats from "@/components/ui/BlackBoxWithStats";
import Image from "next/image";

const FirstScreen: FC = () => {
  return (
    <header
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/production_bg.webp')" }}
    >
      {/* Base Overlay */}
      <div className="overlay-base absolute inset-0 bg-black/60"></div>

      {/* Gradient Overlay */}
      <div className="overlay-gradient absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent z-[-1]"></div>

      <Breadcrumbs
        className="z-10 relative"
        items={[
          { label: "Главная", href: "/", current: false },
          { label: "О производстве", href: "/production", current: true },
        ]}
      />

      {/* Main Content */}
      <CustomContainer className="flex flex-col justify-between" fullHeight>
        <h1 className="text-2xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-light text-white max-w-4xl pt-16 z-10">
          Производство
          <br />
          электрооборудования
        </h1>

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
            <p className="text-sm md:text-lg text-white/70 lg:max-w-[400px] 2xl:max-w-[500px]">
              Являясь всего лишь частью общей картины, тщательные исследования
              конкурентов могут быть описаны максимально подробно.
            </p>
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
    </header>
  );
};

export default FirstScreen;
