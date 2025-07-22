import { FC } from "react";
import { IBlackBoxWithStatsProps } from "@/components/ui/BlackBoxWithStats/types";
import { useIsMobile } from "@/hooks/use-mobile";

const BlackBoxWithStats: FC<IBlackBoxWithStatsProps> = ({
  className,
  stats,
  transparent = false,
}) => {
  const isMobile = useIsMobile();
  return (
    <div className={`absolute bottom-7 right-4 ${className}`}>
      <div className={`relative ${transparent ? "" : "md:bg-black"}`}>
        <div className="flex flex-wrap gap-x-8 gap-y-4 p-4 md:p-12">
          {stats
            .filter((stat) => !isMobile || stat.showOnMobile !== false)
            .map((stat, index) => (
              <div key={index} className="min-w-[120px]">
                <div className="text-3xl md:text-6xl font-light text-white mb-3">
                  <span>
                    {stat.value}{" "}
                    {stat.unit && (
                      <span className="text-xl md:text-3xl">
                        {stat.unit.isSuperscript ? (
                          <>
                            {stat.unit.text.split("").map((char, i) => (
                              <sup key={i}>{char}</sup>
                            ))}
                          </>
                        ) : (
                          stat.unit.text
                        )}
                      </span>
                    )}
                  </span>
                </div>
                <div className="text-xs md:text-sm xl:text-base font-light text-white max-w-[190px]">
                  <span>{stat.description}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BlackBoxWithStats;