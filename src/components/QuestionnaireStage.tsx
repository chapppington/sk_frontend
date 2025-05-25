import React from "react";

interface QuestionnaireStageProps {
  stage: {
    number: number;
    title: string;
    shortTitle: string;
    sections: { number: number; title: string }[];
  };
  activeStage: number;
  stageIndex: number;
  changeStage: (sectionNumber: number) => void;
  totalStages: number;
}

const QuestionnaireStage: React.FC<QuestionnaireStageProps> = ({
  stage,
  activeStage,
  stageIndex,
  changeStage,
  totalStages,
}) => {
  // Calculate if the current stage is active or if any of its sections are active
  const isStageOrSectionActive = stage.sections.some(
    (section) => section.number === activeStage
  );

  return (
    <div className="relative">
      {/* Stage indicator and titles */}
      <div
        className="flex items-start mb-4 cursor-pointer"
        onClick={() => changeStage(stage.sections[0].number)}
      >
        {/* Stage number circle and vertical line */}
        <div className="relative mr-6 flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center z-10 relative ${
              activeStage >= stage.sections[0].number &&
              activeStage <= stage.sections[stage.sections.length - 1].number
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
              ${
                activeStage >= stage.sections[0].number &&
                activeStage <= stage.sections[stage.sections.length - 1].number
                  ? "h-[calc(100%_+_20px)]"
                  : "h-10"
              }
              transition-all duration-300`}
            ></div>
          )}
        </div>

        {/* Titles */}
        <div className="flex-1">
          <p
            className={`text-sm ${
              isStageOrSectionActive ? "text-white" : "text-white/60"
            } transition-colors duration-300`}
          >
            {stage.shortTitle}
          </p>
          {isStageOrSectionActive && (
            <h3 className="text-lg text-white mt-1">{stage.title}</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireStage;
