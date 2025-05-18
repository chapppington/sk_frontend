"use client";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CustomContainer from "@/components/ui/CustomContainer";
import { GradientHeading } from "@/components/ui/GradientHeading/GradientHeading";
import MainButton from "@/components/ui/MainButton";
import dynamic from 'next/dynamic'

const ProductScene = dynamic(
  () => import("@/components/productCard3D/main"),
  { ssr: false }
);

const stats = [
  {
    value: "6-35",
    unit: { text: "кВ" },
    description: "Напряжение",
  },
  {
    value: "±5-10% от номинального значения",
    unit: { text: "" },
    description: "Стабилизация напряжения",
  },
  {
    value: "Автоматическая",
    unit: { text: "" },
    description: "Система регулирования",
  },
];

export default function FirstScreen() {
  return (
    <header className="flex flex-col justify-between pb-24">
      {/* Breadcrumbs */}

      {/* Main Content */}
      <CustomContainer className="flex flex-row items-stretch">
        <div className="w-1/2 flex items-center">
          <ProductScene />
        </div>
        <div className="w-1/2">
          <Breadcrumbs
            className="pb-16"
            disableContainer
            items={[
              { label: "Главная", href: "/", current: false },
              { label: "Каталог", href: "/catalog", current: false },
              {
                label: "ПАРН",
                href: "/catalog/ktp",
                current: false,
              },
              
            ]}
          />
          <span className="text-white/80 text-lg max-w-2xl mb-6 block">
            Стабилизация напряжения в электрических сетях
          </span>
          <GradientHeading className="mb-8">
            Пункт автоматического регулирования напряжения 
          </GradientHeading>
          <p className="text-white/80 text-base max-w-2xl mb-10">
            Специализированное устройство, предназначенное для обеспечения
            стабильного и безопасного уровня напряжения в электрических сетях.
            ПАРН выполняет автоматическую компенсацию колебаний напряжения,
            поддерживает его в пределах номинальных значений и защищает
            оборудование от скачков напряжения. Применяется в распределительных
            сетях, на промышленных предприятиях, энергоснабжающих компаниях и
            объектах с критическим потреблением энергии.
          </p>
          <div className="mb-6 flex flex-col gap-6 w-full max-w-2xl">
            {stats.map((stat, index) => (
              <div key={index} className="text-white text-xl">
                <span className="flex-1">{stat.description}:</span>
                <span className="ml-4 font-light">
                  {stat.value}{" "}
                  <span className="font-normal">{stat.unit.text}</span>
                </span>
              </div>
            ))}
          </div>
          <MainButton text="Узнать конечную стоимость" />
        </div>
      </CustomContainer>
    </header>
  );
}
