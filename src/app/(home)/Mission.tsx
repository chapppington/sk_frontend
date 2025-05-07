import CustomContainer from "@/components/ui/CustomContainer";
import React from "react";

const Mission: React.FC = () => {
  return (
    <section id="mission_section" className="bg-transparent py-20">
      <CustomContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Right Column - Decorative element for larger screens */}
          <div></div>

          {/* Left Column - Content */}
          <div>
            <div className="text-white/60 mb-4 uppercase tracking-wider text-sm">
              [ МИССИЯ КОМПАНИИ ]
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-light mb-6">
              Сибкомплект - современные технологии
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-2xl">
              Как уже неоднократно упомянуто, действия представителей оппозиции
              объявлены нарушающими общечеловеческие нормы этики и морали.
            </p>
            <button className="inline-flex items-center group cursor-pointer">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors">
                  <svg
                    className="w-6 h-6 text-white transform -rotate-270"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M7 17L17 7M17 7H7M17 7V17"
                    />
                  </svg>
                </div>
                <span className="ml-4 text-white/60 group-hover:text-white/80 transition-colors border-b border-white/20 pb-1">
                  Больше о компании
                </span>
              </div>
            </button>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default Mission;
