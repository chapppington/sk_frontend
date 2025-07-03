"use client";

import { FC } from "react";
import Image from "next/image";

import SectionHeader from "@/components/ui/SectionHeader";
import CustomContainer from "@/components/ui/CustomContainer";
import LogoGrid from "@/components/ui/LogoGrid";

import { gridItems, partners } from "./mock_data";

const EquipmentGridScreen: FC = () => {
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
              Используемое
              <br />
              оборудование
            </>
          }
          description="Производство оснащено современным оборудованием, что обеспечивает высокое качество, надёжность и соответствие продукции современным стандартам отрасли."
          desktopOrder={{
            bracketsText: 3,
            heading: 1,
            description: 2,
          }}
        />

        {/* Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {gridItems.map((item, index) => (
            <div
              key={index}
              className={`relative overflow-hidden min-h-[300px] md:min-h-[400px] ${
                item.colSpan > 1
                  ? "md:col-span-2 lg:col-span-" + item.colSpan
                  : ""
              }`}
              style={{
                ...(item.clipPath ? { clipPath: item.clipPath } : {}),
              }}
            >
              <Image
                src={`/${item.image}`}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority={index < 2}
              />
              {/* Dark gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black/70"
                style={item.clipPath ? { clipPath: item.clipPath } : undefined}
              />
              <div className="relative h-full p-8 flex flex-col justify-end z-10">
                <h3 className="text-2xl text-white font-light leading-tight mb-4">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-white/70 text-sm">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Partners Logo Grid */}
        {/* <LogoGrid partners={partners} /> */}
      </CustomContainer>
    </section>
  );
};

export default EquipmentGridScreen;
