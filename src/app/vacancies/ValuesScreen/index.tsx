"use client";

import CustomContainer from "@/components/ui/CustomContainer";
import GradientHeading from "@/components/ui/GradientHeading";
import { FC, useState } from "react";
import ValueCard from "@/app/vacancies/ValuesScreen/ValueCard";
import { IValueData } from "@/app/vacancies/ValuesScreen/ValueCard/types";

const valuesData: IValueData[] = [
  {
    title: "Порядочность",
    description:
      "Стремление действовать честно, справедливо и уважительно по отношению к себе и другим",
    icon: (
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 12a4 4 0 100-8 4 4 0 000 8z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 21c0-4.418-3.582-8-8-8s-8 3.582-8 8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Экспертность",
    description:
      "Это не только знания, навыки и опыт, но и способность применять их на практике, анализировать информацию, делать обоснованные выводы и рекомендации, адаптироваться к новым ситуациям",
    icon: (
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Проактивность",
    description: "Способность предвидеть проблемы и действовать на опережение",
    icon: (
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
        <path
          d="M13.015 5.822L13 17M13.015 5.822L16.5 9M13.015 5.822L9.5 9M18 13l-5 5-5-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Открытость",
    description:
      "Готовность к диалогу, восприятию новых идей и честному обмену информацией, создающая основу для эффективного сотрудничества.",
    icon: (
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 11.5l-3-3m3 3l3-3m-3 3V20m6-14H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2zm0 0V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Ответственность",
    description:
      "Осознанное принятие обязательств и безусловное их выполнение, с готовностью отвечать за свои решения и действия.",
    icon: (
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const ValuesScreen: FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <section id="our_values_section" className="bg-transparent py-24">
      <CustomContainer className="relative">
        {/* Section Title */}
        <div className="mb-12">
          <span className="text-white/40 text-sm tracking-wider">
            [ МИССИЯ И ЦЕННОСТИ КОМПАНИИ ]
          </span>
        </div>

        {/* Main Content Container */}
        <div className="flex flex-col lg:flex-row items-stretch relative lg:min-h-[440px]">
          {/* Left Column - Title and main text */}
          <div className="lg:w-2/5 relative z-10">
            {/* Main Heading */}
            <GradientHeading>
              Показать новые горизонты, превосходящие ожидания
            </GradientHeading>

            {/* Bottom paragraph */}
            <div className="lg:absolute lg:bottom-0 max-w-2xl mb-6 lg:mb-0 mt-8 lg:mt-0">
              <p className="text-white/60 text-base">
                Мы приглашаем в свою команду тех, кто уже на подсознательном
                уровне разделяет ценности нашей компании. Это помогает быстрее
                адаптировать и взаимодействовать с сотрудником, работать «на
                одной волне», понимать что вас связывает не только работа, а что
                то большее... взгляды на жизнь, понимание сути вещей именно на
                одному уровне.
              </p>
            </div>
          </div>
        </div>

        {/* Values Tabs - Desktop version (hidden on mobile) */}
        <div className="values-tabs hidden lg:flex absolute top-0 right-0 bottom-0 h-full">
          {valuesData.map((value, index) => (
            <ValueCard
              key={value.title}
              data={value}
              isActive={activeTab === index}
              variant="desktop"
              onMouseEnter={() => setActiveTab(index)}
              onMouseLeave={() => setActiveTab(0)}
            />
          ))}
        </div>

        {/* Values Cards - Mobile version (hidden on desktop) */}
        <div className="lg:hidden space-y-4 mt-12">
          {valuesData.map((value) => (
            <ValueCard key={value.title} data={value} variant="mobile" />
          ))}
        </div>
      </CustomContainer>
    </section>
  );
};

export default ValuesScreen;
