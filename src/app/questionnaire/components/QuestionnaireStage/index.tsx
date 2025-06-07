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
            className={`w-10 h-10 rounded-full flex items-center justify-center z-10 relative transition-all duration-300 ${
              isStageActive ? "border border-white" : "border border-white/30"
            }`}
          >
            {isStageActive && (
              <div className="w-5 h-5 rounded-full bg-white transition-all duration-300"></div>
            )}
          </div>
          {stageIndex < totalStages - 1 && (
            <div
              className={`absolute top-10 left-1/2 w-px bg-white/20 -translate-x-1/2 h-7 transition-all duration-300`}
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
          <h3
            className={`text-lg mt-1 transition-colors duration-300 ${
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
