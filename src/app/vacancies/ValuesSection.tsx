import CustomContainer from "@/components/ui/CustomContainer";
import { GradientHeading } from "@/components/ui/GradientHeading/GradientHeading";
import React from "react";

const ValuesSection: React.FC = () => {
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
        <div className="flex flex-col lg:flex-row items-stretch relative lg:min-h-[500px]">
          {/* Left Column - Title and main text */}
          <div className="lg:w-1/2 relative z-10">
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
        <div className="values-tabs hidden lg:flex absolute top-0 right-0 bottom-0 h-full ">
          {/* Tab 1 - Порядочность */}
          <div className="h-full group">
            <div className="h-full w-[110px] group-hover:w-[320px] lg:w-[90px] lg:group-hover:w-[280px] 2xl:w-[110px] 2xl:group-hover:w-[320px] relative border-r border-white/5  backdrop-blur-sm group-hover:bg-transparent group-hover:border group-hover:border-white/50 transition-all duration-300 overflow-hidden">
              {/* Tab Content Section (hidden until hover) */}
              <div className="px-1 py-2 w-[280px] lg:w-[240px] 2xl:w-[280px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                {/* Icon */}
                <div className="w-14 h-14 mb-6 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
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
                  </div>
                </div>
                {/* Title and Description */}
                <h3 className="text-3xl text-white font-normal mb-4">
                  Порядочность
                </h3>
                <p className="text-white/80 text-base">
                  Стремление действовать честно, справедливо и уважительно по
                  отношению к себе и другим
                </p>
              </div>

              {/* Tab Label (always visible) */}
              <div className="absolute right-0 top-0 h-full w-[110px] lg:w-[90px] 2xl:w-[110px] flex items-center justify-center z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-200">
                <div className="rotate-[-90deg] whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-white text-5xl lg:text-4xl 2xl:text-5xl mr-2 transition-colors"></span>
                    <span className="text-white text-5xl lg:text-4xl 2xl:text-5xl transition-colors">
                      Порядочность
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab 2 - Экспертность */}
          <div className="h-full group">
            <div className="h-full w-[110px] group-hover:w-[320px] lg:w-[90px] lg:group-hover:w-[280px] 2xl:w-[110px] 2xl:group-hover:w-[320px] relative border-r border-white/5  backdrop-blur-sm group-hover:bg-transparent group-hover:border group-hover:border-white/50 transition-all duration-300 overflow-hidden">
              {/* Tab Content Section (hidden until hover) */}
              <div className="px-1 py-2 w-[280px] lg:w-[240px] 2xl:w-[280px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                {/* Icon */}
                <div className="w-14 h-14 mb-6 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
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
                  </div>
                </div>
                {/* Title and Description */}
                <h3 className="text-3xl text-white font-normal mb-4">
                  Экспертность
                </h3>
                <p className="text-white/80 text-base">
                  Это не только знания, навыки и опыт, но и способность
                  применять их на практике, анализировать информацию, делать
                  обоснованные выводы и рекомендации, адаптироваться к новым
                  ситуациям
                </p>
              </div>

              {/* Tab Label (always visible) */}
              <div className="absolute right-0 top-0 h-full w-[110px] lg:w-[90px] 2xl:w-[110px] flex items-center justify-center z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-200">
                <div className="rotate-[-90deg] whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-gray-400 group-hover:text-white text-6xl lg:text-5xl 2xl:text-6xl mr-2 transition-colors"></span>
                    <span className="text-white/90 group-hover:text-white text-5xl lg:text-4xl 2xl:text-5xl transition-colors">
                      Экспертность
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab 3 - Проактивность */}
          <div className="h-full group">
            <div className="h-full w-[110px] group-hover:w-[320px] lg:w-[90px] lg:group-hover:w-[280px] 2xl:w-[110px] 2xl:group-hover:w-[320px] relative border-r border-white/5  backdrop-blur-sm group-hover:bg-transparent group-hover:border group-hover:border-white/50 transition-all duration-300 overflow-hidden">
              {/* Tab Content Section (hidden until hover) */}
              <div className="px-1 py-2 w-[280px] lg:w-[240px] 2xl:w-[280px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                {/* Icon */}
                <div className="w-14 h-14 mb-6 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M13.015 5.822L13 17M13.015 5.822L16.5 9M13.015 5.822L9.5 9M18 13l-5 5-5-5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                {/* Title and Description */}
                <h3 className="text-3xl text-white font-normal mb-4">
                  Проактивность
                </h3>
                <p className="text-white/80 text-base">
                  Способность предвидеть проблемы и действовать на опережение
                </p>
              </div>

              {/* Tab Label (always visible) */}
              <div className="absolute right-0 top-0 h-full w-[110px] lg:w-[90px] 2xl:w-[110px] flex items-center justify-center z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-200">
                <div className="rotate-[-90deg] whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-gray-400 group-hover:text-white text-6xl lg:text-5xl 2xl:text-6xl mr-2 transition-colors"></span>
                    <span className="text-white/90 group-hover:text-white text-5xl lg:text-4xl 2xl:text-5xl transition-colors">
                      Проактивность
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab 4 - Открытость */}
          <div className="h-full group">
            <div className="h-full w-[110px] group-hover:w-[320px] lg:w-[90px] lg:group-hover:w-[280px] 2xl:w-[110px] 2xl:group-hover:w-[320px] relative border-r border-white/5  backdrop-blur-sm group-hover:bg-transparent group-hover:border group-hover:border-white/50 transition-all duration-300 overflow-hidden">
              {/* Tab Content Section (hidden until hover) */}
              <div className="px-1 py-2 w-[280px] lg:w-[240px] 2xl:w-[280px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                {/* Icon */}
                <div className="w-14 h-14 mb-6 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 11.5l-3-3m3 3l3-3m-3 3V20m6-14H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2zm0 0V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                {/* Title and Description */}
                <h3 className="text-3xl text-white font-normal mb-4">
                  Открытость
                </h3>
                <p className="text-white/80 text-base">
                  Готовность к диалогу, восприятию новых идей и честному обмену
                  информацией, создающая основу для эффективного сотрудничества.
                </p>
              </div>

              {/* Tab Label (always visible) */}
              <div className="absolute right-0 top-0 h-full w-[110px] lg:w-[90px] 2xl:w-[110px] flex items-center justify-center z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-200">
                <div className="rotate-[-90deg] whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-gray-400 group-hover:text-white text-6xl lg:text-5xl 2xl:text-6xl mr-2 transition-colors"></span>
                    <span className="text-white/90 group-hover:text-white text-5xl lg:text-4xl 2xl:text-5xl transition-colors">
                      Открытость
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab 5 - Ответственность */}
          <div className="h-full group">
            <div className="h-full w-[110px] group-hover:w-[320px] lg:w-[90px] lg:group-hover:w-[280px] 2xl:w-[110px] 2xl:group-hover:w-[320px] relative border-r border-white/5  backdrop-blur-sm group-hover:bg-transparent group-hover:border group-hover:border-white/50 transition-all duration-300 overflow-hidden">
              {/* Tab Content Section (hidden until hover) */}
              <div className="px-1 py-2 w-[280px] lg:w-[240px] 2xl:w-[280px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                {/* Icon */}
                <div className="w-14 h-14 mb-6 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                {/* Title and Description */}
                <h3 className="text-3xl text-white font-normal mb-4">
                  Ответственность
                </h3>
                <p className="text-white/80 text-base">
                  Осознанное принятие обязательств и безусловное их выполнение,
                  с готовностью отвечать за свои решения и действия.
                </p>
              </div>

              {/* Tab Label (always visible) */}
              <div className="absolute right-0 top-0 h-full w-[110px] lg:w-[90px] 2xl:w-[110px] flex items-center justify-center z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-200">
                <div className="rotate-[-90deg] whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-gray-400 group-hover:text-white text-4xl lg:text-3xl 2xl:text-4xl mr-2 transition-colors"></span>
                    <span className="text-white/80 group-hover:text-white text-5xl lg:text-4xl 2xl:text-5xl transition-colors">
                      Ответственность
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Cards - Mobile version (hidden on desktop) */}
        <div className="lg:hidden space-y-4 mt-12">
          {/* Card 1 */}
          <div className="bg-transparent backdrop-blur-sm p-6 border border-white/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
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
              </div>
              <h3 className="text-2xl text-white font-normal">Порядочность</h3>
            </div>
            <p className="text-white/60 text-base">
              Стремление действовать честно, справедливо и уважительно по
              отношению к себе и другим
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-transparent backdrop-blur-sm p-6 border border-white/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
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
              </div>
              <h3 className="text-2xl text-white font-normal">Экспертность</h3>
            </div>
            <p className="text-white/60 text-base">
              Высокий уровень профессиональных знаний и навыков, позволяющий
              решать сложные задачи и достигать поставленных целей.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-transparent backdrop-blur-sm p-6 border border-white/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M13.015 5.822L13 17M13.015 5.822L16.5 9M13.015 5.822L9.5 9M18 13l-5 5-5-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-2xl text-white font-normal">Проактивность</h3>
            </div>
            <p className="text-white/60 text-base">
              Способность предвидеть перспективы и действовать на опережение,
              проявляя инициативу и принимая ответственность за результат.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-transparent backdrop-blur-sm p-6 border border-white/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 11.5l-3-3m3 3l3-3m-3 3V20m6-14H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2zm0 0V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-2xl text-white font-normal">Открытость</h3>
            </div>
            <p className="text-white/60 text-base">
              Готовность к диалогу, восприятию новых идей и честному обмену
              информацией, создающая основу для эффективного сотрудничества.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-transparent backdrop-blur-sm p-6 border border-white/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-2xl text-white font-normal">
                Ответственность
              </h3>
            </div>
            <p className="text-white/60 text-base">
              Осознанное принятие обязательств и безусловное их выполнение, с
              готовностью отвечать за свои решения и действия.
            </p>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default ValuesSection;
