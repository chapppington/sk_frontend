import { FC } from "react";
import Image from "next/image";

interface HistoryEvent {
  id: number;
  number: string;
  title: string;
  description: string;
  image: string;
}

interface HistorySlideProps {
  event: HistoryEvent;
}

const HistorySlide: FC<HistorySlideProps> = ({ event }) => {
  return (
    <article className="group relative overflow-hidden">
      <div
        className="relative aspect-[3/4] overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          clipPath: "polygon(0 0, 85% 0, 100% 15%, 100% 100%, 0 100%)",
        }}
      >
        <Image
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
          fill
        />
        {/* Default overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60 transition-opacity duration-300 ease-in-out"
          style={{
            clipPath: "polygon(0 0, 85% 0, 100% 15%, 100% 100%, 0 100%)",
          }}
        ></div>

        {/* Darker overlay that appears on hover */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-black/45 to-black/90 lg:opacity-0 opacity-100 transition-opacity duration-300 ease-in-out lg:group-hover:opacity-100"
          style={{
            clipPath: "polygon(0 0, 85% 0, 100% 15%, 100% 100%, 0 100%)",
          }}
        ></div>

        {/* Content overlay */}
        <div className="absolute inset-0 p-6 flex flex-col z-10">
          {/* Top content */}
          <div>
            <span className="inline-block px-4 py-4 bg-black/70 backdrop-blur-sm text-white text-5xl rounded-md font-light">
              {event.number}
            </span>
          </div>

          {/* Bottom content */}
          <div className="mt-auto lg:transition-transform lg:duration-300 lg:ease-in-out lg:group-hover:-translate-y-20">
            <h3 className="text-2xl text-white font-light leading-tight lg:mb-0 mb-4">
              {event.title}
            </h3>

            {/* Mobile/Tablet Description */}
            <div className="block lg:hidden">
              <p className="text-white/80 text-sm">{event.description}</p>
            </div>
          </div>

          {/* Desktop hover description */}
          <div className="absolute bottom-2 left-6 right-6 transform translate-y-16 opacity-0 transition-all duration-300 ease-in-out lg:group-hover:translate-y-0 lg:group-hover:opacity-100 hidden lg:block">
            <p className="text-white/80 text-sm mb-6">{event.description}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default HistorySlide;
