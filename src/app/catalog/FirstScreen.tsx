import Breadcrumbs from '@/components/ui/Breadcrumbs';
import MainButton from '@/components/ui/MainButton';
import React from 'react';
import CustomContainer from '@/components/ui/CustomContainer';
import BlackBoxWithStats from '@/components/ui/BlackBoxWithStats';

const FirstScreen: React.FC = () => {
  return (
    <header className="relative h-screen">
      <Breadcrumbs
        items={[
          { label: 'Главная', href: '/', current: false },
          { label: 'Каталог', href: '/catalog', current: true }
        ]}
      />

      {/* Main Content */}
      <CustomContainer>
        <h1
          className="text-xl md:text-5xl xl:text-5xl 2xl:text-7xl font-light text-white max-w-4xl pt-16"
        >
          Каталог<br />продукции
        </h1>

        {/* Bottom Content */}
        <div className="flex">
          {/* Bottom Left Text with Arrow */}
          <div className="flex flex-col justify-end max-w-md md:mb-8">
            <p className="text-base md:text-lg text-white/70 lg:max-w-[400px] 2xl:max-w-none">
              Являясь всего лишь частью общей картины, тщательные исследования конкурентов могут быть описаны максимально подробно.
            </p>
            <MainButton text="Связаться с отделом продаж" />
          </div>
        </div>
      </CustomContainer>

      <BlackBoxWithStats
        stats={[
          {
            value: "7776",
            unit: {
              text: "м2",
              isSuperscript: false
            },
            description: "Собственных производственных площадей"
          },
          {
            value: "20+",
            unit: {
              text: "лет",
              isSuperscript: false
            },
            description: "Беспрерывной работы на рынке электрооборудования"
          }
        ]}
      />
    </header>
  );
};

export default FirstScreen;
