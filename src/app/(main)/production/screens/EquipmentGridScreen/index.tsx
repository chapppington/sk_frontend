"use client";

import { FC } from "react";
import Image from "next/image";

import SectionHeader from "@/components/ui/SectionHeader";
import CustomContainer from "@/components/ui/CustomContainer";
import LogoGrid from "@/components/ui/LogoGrid";
import { useProductionPageConfig } from "@/hooks/useProductionPageConfig";
import { BACKEND_MAIN } from "@/constants";

const EquipmentGridScreen: FC = () => {
  const { config, loading } = useProductionPageConfig();

  if (loading) {
    return (
      <section
        id="production_equipment_grid"
        className="bg-transparent py-24 relative"
      >
        <CustomContainer className="h-full flex flex-col relative z-10">
          <div className="text-center text-white text-lg">
            Загрузка оборудования...
          </div>
        </CustomContainer>
      </section>
    );
  }

  return (
    <section
      id="production_equipment_grid"
      className="bg-transparent py-24 relative"
    >
      <CustomContainer className="h-full flex flex-col relative z-10">
        <SectionHeader
          bracketsText="Оборудование"
          heading={
            <>
              Используемое <br /> оборудование
            </>
          }
          description={config?.thirdScreen?.subtitle || ""}
          desktopOrder={{
            bracketsText: 3,
            heading: 1,
            description: 2,
          }}
        />

        {/* Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {config?.thirdScreen?.equipment?.map((item, index) => {
            // Определяем размеры для каждого элемента
            let colSpan = 1;
            let clipPath = undefined;

            if (index === 0 || index === 2) {
              // Элементы 1, 3 - 530x400
              colSpan = 2;
            } else if (index === 4) {
              // Элемент 5 - 800x400
              colSpan = 3;
            } else {
              // Элементы 2, 4, 6 - 250x400
              colSpan = 1;
            }

            return (
              <div
                key={item.id}
                className={`relative overflow-hidden min-h-[300px] md:min-h-[400px] ${
                  colSpan > 1
                    ? `md:col-span-${colSpan} lg:col-span-${colSpan}`
                    : ""
                }`}
                style={{
                  ...(clipPath ? { clipPath } : {}),
                }}
              >
                <Image
                  src={
                    item.image
                      ? `${BACKEND_MAIN}${item.image}`
                      : "/transformer.webp"
                  }
                  alt={item.title || `Оборудование ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority={index < 2}
                />
                {/* Dark gradient overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black/70"
                  style={clipPath ? { clipPath } : undefined}
                />
                <div className="relative h-full p-8 flex flex-col justify-end z-10">
                  <h3 className="text-2xl text-white font-light leading-tight mb-4">
                    {item.title || `Оборудование ${index + 1}`}
                  </h3>
                  {item.subtitle && (
                    <p className="text-white/70 text-sm">{item.subtitle}</p>
                  )}
                </div>
              </div>
            );
          }) || []}
        </div>

        {/* Partners Logo Grid */}
        <LogoGrid partners={[]} />
      </CustomContainer>
    </section>
  );
};

export default EquipmentGridScreen;
