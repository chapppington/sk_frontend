"use client";

import { FC, useState } from "react";

import CustomContainer from "@/components/ui/CustomContainer";
import GradientHeading from "@/components/ui/GradientHeading";
import ValueCard from "./ValueCard";

import { valuesData as defaultValues } from "./mock_data";
import { useVacanciesPageConfigPublic } from "@/hooks/useVacanciesPageConfigPublic";
import { IValueData } from "./ValueCard/types";

const ValuesScreen: FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { config } = useVacanciesPageConfigPublic();

  const heading =
    config?.thirdScreen?.title ||
    "Показать новые горизонты, превосходящие ожидания";
  const paragraph =
    config?.thirdScreen?.subtitle ||
    "Мы приглашаем в свою команду тех, кто уже на подсознательном уровне разделяет ценности нашей компании. Это помогает быстрее адаптировать и взаимодействовать с сотрудником, работать «на одной волне», понимать что вас связывает не только работа, а что-то большее... взгляды на жизнь, понимание сути вещей именно на одном уровне.";

  const cfgValues = config?.thirdScreen?.values || [];
  type ConfigValue = {
    title?: string;
    subtitle?: string;
    description?: string;
  };
  const displayValues: IValueData[] = (
    cfgValues.length
      ? (cfgValues as ConfigValue[])
      : (defaultValues as IValueData[])
  ).map(
    (v: ConfigValue | IValueData, idx: number): IValueData => ({
      title: (v as ConfigValue).title ?? defaultValues[idx]?.title ?? "",
      description:
        (v as ConfigValue).subtitle ??
        (v as ConfigValue).description ??
        defaultValues[idx]?.description ??
        "",
      icon: defaultValues[idx]?.icon,
    })
  );

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
            <GradientHeading>{heading}</GradientHeading>

            {/* Bottom paragraph */}
            <div className="lg:absolute lg:bottom-0 max-w-2xl mb-6 lg:mb-0 mt-8 lg:mt-0">
              <p className="text-white/60 text-base">{paragraph}</p>
            </div>
          </div>
        </div>

        {/* Values Tabs - Desktop version (hidden on mobile) */}
        <div className="values-tabs hidden lg:flex absolute top-0 right-0 bottom-0 h-full">
          {displayValues.map((value: IValueData, index: number) => (
            <ValueCard
              key={value.title + index}
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
          {displayValues.map((value: IValueData, index: number) => (
            <ValueCard
              key={value.title + index}
              data={value}
              variant="mobile"
            />
          ))}
        </div>
      </CustomContainer>
    </section>
  );
};

export default ValuesScreen;
