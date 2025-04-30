import { FC } from "react";

interface StatItem {
  value: string;
  unit?: {
    text: string;
    isSuperscript?: boolean;
  };
  description: string;
}

interface BlackBoxWithStatsProps {
  className?: string;
  stats: StatItem[];
}

const BlackBoxWithStats: FC<BlackBoxWithStatsProps> = ({
  className,
  stats,
}) => {
  return (
    <div
      className={`absolute bottom-0 right-0 w-full lg:w-auto xl:min-w-[800px] lg:min-w-[500px] xl:min-w-[550px] 2xl:min-w-[600px] ${className}`}
    >
      <div
        className={`relative md:bg-black `}
      >
        <div className="grid grid-cols-2 gap-4 md:gap-8 p-8 md:p-16 lg:p-10 xl:p-12 2xl:p-14 relative z-10">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl sm:text-4xl md:text-6xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-light text-white mb-2 md:mb-4">
                <span>
                  {stat.value}{" "}
                  {stat.unit && (
                    <span className="text-2xl sm:text-3xl md:text-5xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
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
              <div className="text-sm sm:text-base md:text-lg lg:text-sm xl:text-base 2xl:text-lg font-light text-white max-w-[250px] lg:max-w-[160px] xl:max-w-[180px] 2xl:max-w-[200px]">
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
