"use client";

import React from "react";
import Image from "next/image";
import GradientHeading from "@/components/ui/GradientHeading";
import BracketsText from "@/components/ui/BracketsText";
import CustomContainer from "@/components/ui/CustomContainer";

const imageUrl =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"; // Placeholder image

export default function SolutionScreen() {
  return (
    <section className="py-24 relative text-white">
      <CustomContainer>
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 pr-0 lg:pr-8 mb-8 lg:mb-0">
            <BracketsText className="text-white/60 mb-8">РЕШЕНИЕ</BracketsText>
          </div>

          {/* Main Content */}
          <div className="container mx-auto relative">
            <div className="flex flex-col mx-auto">
              <div className="pl-0">
                {/* Heading and Description */}
                <GradientHeading>
                  Комплексное решение для энергоснабжения
                </GradientHeading>
                <p className="text-white/60 text-base my-12 ">
                  Для повышения мощности и надёжности была спроектирована и
                  внедрена новая модульная трансформаторная подстанция,
                  включающая 3 силовых трансформатора и 2 распределительных
                  устройства 0,4 кВ. Конфигурация распределения предусматривала
                  3 секции, соединённые секционными выключателями, что позволило
                  повысить управляемость и обеспечить резервирование питания.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Three-column section: full width of container */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-0 items-stretch mt-12">
          {/* Left image */}
          <div className="flex-[1.3] min-w-0">
            <Image
              src={imageUrl}
              alt="Кабельные линии"
              className="w-full h-[400px] object-cover"
              width={800}
              height={400}
            />
          </div>
          {/* Center card */}
          <div className="flex-1 min-w-0 flex flex-col justify-center p-8">
            <h2 className="text-white text-3xl font-light mb-6">
              Технические решения
            </h2>
            <div className="text-white/80 text-base leading-relaxed">
              Были проложены две кабельные линии 6 кВ от РУ-2 до новой
              подстанции общей протяжённостью около 180 метров, из которых 80
              метров — методом горизонтального направленного бурения. В рамках
              распределения нагрузки установлено 60 силовых автоматических
              выключателей, размещённых в 20 ячейках с горизонтальным
              расположением коммутационных аппаратов для питания 60 фидеров.
            </div>
          </div>
          {/* Right image */}
          <div className="flex-[0.7] min-w-0">
            <Image
              src={imageUrl}
              alt="Распределительное устройство"
              className="w-full h-[400px] object-cover"
              width={800}
              height={400}
            />
          </div>
        </div>
        {/* End three-column section */}
      </CustomContainer>
    </section>
  );
}
