import { FC } from "react";
import { Users, Home } from "lucide-react";
import { HistoryEvent } from "./types";

interface HistorySlideProps {
  event: HistoryEvent;
}

const HistorySlide: FC<HistorySlideProps> = ({ event }) => {
  return (
    <article className="group relative overflow-hidden">
      <div
        className="relative aspect-[3/4] overflow-hidden transition-all duration-300 ease-in-out bg-white/5 backdrop-blur-sm"
        style={{
          clipPath: "polygon(0 0, 85% 0, 100% 15%, 100% 100%, 0 100%)",
        }}
      >
        <div className="absolute inset-0 p-6 flex flex-col z-10">
          <div>
            <span className="inline-block px-4 py-4 bg-black/15 text-white text-3xl md:text-4xl rounded-md font-light">
              {event.number}
            </span>
          </div>

          <div className="mt-auto">
            <div className="flex flex-col gap-5 mb-10">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <Users className="text-white/80" size={40} />
                  <div className="text-2xl md:text-4xl text-white font-light">
                    {event.employees}
                    {event.employeesHasPlus ? "+" : ""}
                  </div>
                </div>
                <div className="text-sm text-white/70">
                  работает сотрудников
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <Home className="text-white/80" size={40} />
                  <div className="text-2xl md:text-4xl text-white font-light">
                    {event.areaM2} м²
                  </div>
                </div>
                <div className="text-sm text-white/70">
                  производственная площадь
                </div>
              </div>
            </div>

            <h3 className="text-xl text-white font-light leading-tight">
              {event.title}
            </h3>
          </div>
        </div>
      </div>
    </article>
  );
};

export default HistorySlide;
