"use client";

import BracketsText from "@/components/ui/BracketsText";
import CustomContainer from "@/components/ui/CustomContainer";
import Image from "next/image";
import { FC } from "react";

const features = [
  {
    label: "Полная заводская готовность",
    icon: "img/icons/icon1.svg",
    checked: true,
  },
  {
    label: "Сроки поставки от 14 дней",
    icon: "img/icons/icon2.svg",
    checked: false,
  },
  {
    label: "Высокая надежность конструктива",
    icon: "img/icons/icon3.svg",
    checked: false,
  },
  {
    label: "Понятное прозрачное ценообразование",
    icon: "img/icons/icon4.svg",
    checked: false,
  },
  {
    label: "Проектная экспертиза от типовых проектов до индивидуальных решений",
    icon: "img/icons/icon5.svg",
    checked: false,
  },
];

const InfoScreen: FC = () => {
  return (
    <section className="relative flex flex-col py-24">
      <CustomContainer className="flex flex-col md:flex-row w-full items-stretch">
        {/* Left Section */}
        <div className="w-full md:w-2/5 z-10 flex flex-col pr-4 relative justify-start">
          <BracketsText>ПРЕИМУЩЕСТВА</BracketsText>
          {/* Overlapping Heading */}
          <h1
            className="
                text-4xl md:text-5xl mt-8 text-white
                mb-12
                z-20
                md:w-[180%] md:max-w-none
                md:pr-32
                md:-mr-[40%]
                pointer-events-none
                relative
            "
          >
            Эффективное электроснабжение в условиях современных требований к
            надёжности и безопасности
          </h1>
          <div className="flex flex-col gap-3 mt-2">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className={`flex items-center px-4 py-3 rounded-lg border transition inline-flex w-auto self-start
                    ${
                      feature.checked
                        ? "bg-white/10 border-white/20 text-white"
                        : "bg-white/5 border-white/10 text-gray-300"
                    }`}
              >
                <Image src={`/${feature.icon}`} alt="" width={24} height={24} />
                <span className="text-base ml-4">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Right Section */}
        <div className="w-full md:w-3/5 flex flex-col">
          <div className="relative w-full h-full flex-1">
            <img
              src="/construction_bg.webp"
              alt="Электрощитовая"
              className="w-full h-full object-cover"
              style={{ minHeight: 0 }}
            />
            <div className="absolute bottom-4 right-4 bg-black/80 text-white font-light rounded-lg p-6 max-w-md shadow-lg z-20">
              Поставляемого в сборе, а также блоков и узлов нетранспортабельного
              в сборе оборудования должна, как правило, исключать необходимость
              разборки и ревизии его в процессе монтажа.
            </div>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default InfoScreen;
