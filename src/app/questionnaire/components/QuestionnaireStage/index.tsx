import { FC } from "react";
import { QuestionnaireStageProps } from "./types";

const QuestionnaireStage: FC<QuestionnaireStageProps> = ({
  stage,
  activeStage,
  stageIndex,
  changeStage,
  totalStages,
}) => {
  // Calculate if the current stage is active based on activeStage
  const isStageActive = (() => {
    const stageStart = (stage.number - 1) * 5 + 1;
    const stageEnd = stage.number * 5;
    return activeStage >= stageStart && activeStage <= stageEnd;
  })();

  const handleStageClick = (): void => {
    const firstSectionNumber = (stage.number - 1) * 5 + 1;
    changeStage(firstSectionNumber);
  };

  return (
    <div className="relative">
      {/* Stage indicator and titles */}
      <div
        className="flex items-start mb-4 cursor-pointer"
        onClick={handleStageClick}
      >
        {/* Stage number circle and vertical line */}
        <div className="relative mr-6 flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center z-10 relative ${
              isStageActive
                ? "bg-white text-black"
                : "border border-white/30 text-white/60"
            }
             transition-all duration-300`}
          >
            {stage.number}
          </div>
          {stageIndex < totalStages - 1 && (
            <div
              className={`absolute top-10 left-1/2 w-px bg-white/20 -translate-x-1/2
              ${isStageActive ? "h-[calc(100%_+_20px)]" : "h-10"}
              transition-all duration-300`}
            ></div>
          )}
        </div>

        {/* Titles */}
        <div>
          <p
            className={`text-sm ${
              isStageActive ? "text-white" : "text-white/60"
            } transition-colors duration-300`}
          >
            {stage.shortTitle}
          </p>
          {isStageActive && (
            <h3 className="text-lg text-white mt-1">{stage.title}</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireStage;
