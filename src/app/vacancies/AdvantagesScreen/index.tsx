import CustomContainer from "@/components/ui/CustomContainer";
import { GradientHeading } from "@/components/ui/GradientHeading";
import { FC } from "react";

const AdvantagesScreen: FC = () => {
  return (
    <section id="our_advantages_section" className="bg-transparent py-24">
      <CustomContainer className="relative">
        {/* Section Title */}
        <div className="mb-16">
          <span className="text-white/40 text-sm tracking-wider">
            [ ПРЕИМУЩЕСТВА ]
          </span>
        </div>

        {/* Main Content Container */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16 relative lg:min-h-[500px]">
          {/* Left Column - Bullet points in a 2-column grid */}
          <div className="w-full lg:w-1/2 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 md:gap-y-16 w-full">
              {/* Left column of bullet points */}
              <div className="space-y-8 md:space-y-16">
                {/* Feature Item 1 */}
                <div className="flex items-start w-full">
                  <span className="text-white text-3xl mr-4 flex-shrink-0 hidden md:block">
                    •
                  </span>
                  <p className="text-white/80 text-base md:text-lg w-full">
                    Алтайский производитель с большим современным цехом и
                    новейшим оборудованием
                  </p>
                </div>

                {/* Feature Item 3 */}
                <div className="flex items-start w-full">
                  <span className="text-white text-3xl mr-4 flex-shrink-0 hidden md:block">
                    •
                  </span>
                  <p className="text-white/80 text-base md:text-lg w-full">
                    Сотрудничество с крупными клиентами: «Черкизово», «ЕВРАЗ»,
                    «АЛТАЙ ТАРА»
                  </p>
                </div>

                {/* Feature Item 5 */}
                <div className="flex items-start w-full">
                  <span className="text-white text-3xl mr-4 flex-shrink-0 hidden md:block">
                    •
                  </span>
                  <p className="text-white/80 text-base md:text-lg w-full">
                    Официальное трудоустройство, стабильная зарплата и ДМС после
                    испытательного срока
                  </p>
                </div>
              </div>

              {/* Right column of bullet points */}
              <div className="space-y-8 md:space-y-16">
                {/* Feature Item 2 */}
                <div className="flex items-start w-full">
                  <span className="text-white text-3xl mr-4 flex-shrink-0 hidden md:block">
                    •
                  </span>
                  <p className="text-white/80 text-base md:text-lg w-full">
                    Собственный «Центр развития компетенций» с наставниками.
                    Аттестация рабочих мест по системе СОУТ
                  </p>
                </div>

                {/* Feature Item 4 */}
                <div className="flex items-start w-full">
                  <span className="text-white text-3xl mr-4 flex-shrink-0 hidden md:block">
                    •
                  </span>
                  <p className="text-white/80 text-base md:text-lg w-full">
                    Проектная работа со студентами ВУЗов, реализация уникальных
                    дипломных идей
                  </p>
                </div>

                {/* Feature Item 6 */}
                <div className="flex items-start w-full">
                  <span className="text-white text-3xl mr-4 flex-shrink-0 hidden md:block">
                    •
                  </span>
                  <p className="text-white/80 text-base md:text-lg w-full">
                    Корпоративные мероприятия, «Олимпийские игры СК», проект
                    «Бережливое производство»
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Heading */}
          <div className="lg:w-1/2 relative z-10 flex flex-col justify-between lg:min-h-[500px]">
            {/* Heading */}
            <GradientHeading>
              Преимущества работы в СибКомплект: развитие, стабильность и
              инновации
            </GradientHeading>

            {/* Bottom info with icon */}
            <div className="flex items-center gap-12 max-w-xl mt-16 pt-12 border-t border-white/10">
              <div className="w-32 h-32">
                <svg
                  className="w-full h-full text-white opacity-80"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeOpacity="0.4"
                    fill="none"
                  />
                  <path
                    d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M12 2c-2.8 0-5 4.5-5 10s2.2 10 5 10 5-4.5 5-10-2.2-10-5-10z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                  <path d="M2 12h20" stroke="currentColor" strokeWidth="0.5" />
                </svg>
              </div>
              <div>
                <p className="text-white/70 text-base">
                  Мы создаем комфортные условия для профессионального роста и
                  развития наших сотрудников, обеспечивая стабильность и внедряя
                  инновационные подходы к работе.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default AdvantagesScreen;
