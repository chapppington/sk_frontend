import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { FC } from "react";
import CustomContainer from "@/components/ui/CustomContainer";
import BlackBoxWithStats from "@/components/ui/BlackBoxWithStats";
import Image from "next/image";
import AnimatedText from "@/components/ui/textAnimation/AnimatedText";
import GradientHeading from "@/components/ui/GradientHeading";

const FirstScreen: FC = () => {
  return (
    <header className="relative min-h-screen">
      {/* Background Image */}
      <Image
        src="/news_bg2.webp"
        alt="Production background"
        fill
        priority
        className="object-cover z-[0]"
        quality={100}
      />

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
        <AnimatedText triggerStart="top 100%">
          <GradientHeading className="max-w-4xl pt-16 z-10">
            Показываем новые горизонты, превосходящие ожидания
          </GradientHeading>
        </AnimatedText>

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
            <AnimatedText triggerStart="top 100%">
              <p className="text-sm md:text-lg text-white/70 lg:max-w-[400px] 2xl:max-w-[600px]">
                Мы приглашаем в свою команду тех, кто уже на подсознательном
                уровне разделяет ценности нашей компании. Это помогает быстрее
                адаптировать и взаимодействовать с сотрудником, работать «на
                одной волне».
              </p>
            </AnimatedText>
          </div>
        </div>
      </CustomContainer>

      <BlackBoxWithStats
        className="z-[5]"
        stats={[
          {
            value: "90+",
            description: "Количество сотрудников в штате",
          },
          {
            value: "4.7 NPS",
            description: "Индекс потребительской лояльности",
          },
        ]}
      />
    </header>
  );
};

export default FirstScreen;
