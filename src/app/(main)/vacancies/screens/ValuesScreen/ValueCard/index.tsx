import { FC } from "react";
import { IValueCardProps } from "@/app/(main)/vacancies/screens/ValuesScreen/ValueCard/types";

const ValueCard: FC<IValueCardProps> = ({
  data,
  isActive = false,
  variant = "mobile",
  onMouseEnter,
  onMouseLeave,
}) => {
  if (variant === "mobile") {
    return (
      <div className="bg-transparent backdrop-blur-sm p-6 border border-white/50">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 flex items-center justify-center">
            {data.icon}
          </div>
          <h3 className="text-2xl text-white font-normal">{data.title}</h3>
        </div>
        <p className="text-white/60 text-base">{data.description}</p>
      </div>
    );
  }

  return (
    <div
      className="h-full group"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={`h-full w-[110px] ${
          isActive ? "w-[320px]" : ""
        } group-hover:w-[320px] lg:w-[90px] ${
          isActive ? "lg:w-[280px]" : ""
        } lg:group-hover:w-[280px] 2xl:w-[110px] ${
          isActive ? "2xl:w-[320px]" : ""
        } 2xl:group-hover:w-[320px] relative border-r border-white/5 ${
          isActive ? "bg-transparent border border-white/50" : ""
        } backdrop-blur-sm group-hover:bg-transparent group-hover:border group-hover:border-white/50 transition-all duration-300 overflow-hidden`}
      >
        {/* Tab Content Section */}
        <div
          className={`px-1 py-2 w-[280px] lg:w-[240px] 2xl:w-[280px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          } transition-opacity duration-300 delay-150`}
        >
          {/* Icon */}
          <div className="w-14 h-14 mb-6 flex items-center justify-center">
            <div className="w-12 h-12 flex items-center justify-center">
              {data.icon}
            </div>
          </div>
          {/* Title and Description */}
          <h3 className="text-3xl text-white font-normal mb-4">{data.title}</h3>
          <p className="text-white/80 text-base">{data.description}</p>
        </div>

        {/* Tab Label */}
        <div
          className={`absolute right-0 top-0 h-full w-[110px] lg:w-[90px] 2xl:w-[110px] flex items-center justify-center z-10 ${
            isActive ? "opacity-0" : "opacity-100 group-hover:opacity-0"
          } transition-opacity duration-200`}
        >
          <div className="rotate-[-90deg] whitespace-nowrap">
            <div className="flex items-center">
              <span className="text-gray-400 group-hover:text-white text-6xl lg:text-5xl 2xl:text-6xl mr-2 transition-colors"></span>
              <span className="text-white/90 group-hover:text-white text-5xl lg:text-4xl 2xl:text-5xl transition-colors">
                {data.title}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueCard;
