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
      <div className="flex items-start mb-3">
        {/* Stage number circle and vertical line */}
        <div className="relative mr-4 flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center z-10 relative transition-all duration-300 cursor-pointer ${
              isStageActive
                ? "border-2 border-white"
                : "border-2 border-gray-500"
            }`}
            onClick={handleStageClick}
          >
            {isStageActive && (
              <div className="w-4 h-4 rounded-full bg-white transition-all duration-300"></div>
            )}
          </div>
          {stageIndex < totalStages - 1 && (
            <div
              className={`absolute top-8 left-1/2 w-0.5 bg-gray-500 -translate-x-1/2 h-6 transition-all duration-300`}
            ></div>
          )}
        </div>

        {/* Titles */}
        <div onClick={handleStageClick} className="cursor-pointer">
          <p
            className={`text-xs select-none ${
              isStageActive ? "text-white" : "text-white/60"
            } transition-colors duration-300`}
          >
            {stage.shortTitle}
          </p>
          <h3
            className={`text-base mt-0.5 select-none transition-colors duration-300 ${
              isStageActive ? "text-white" : "text-white/60"
            }`}
          >
            {stage.title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireStage;
