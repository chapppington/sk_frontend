export interface QuestionnaireStageProps {
  stage: {
    number: number;
    title: string;
    shortTitle: string;
  };
  activeStage: number;
  stageIndex: number;
  changeStage: (sectionNumber: number) => void;
  totalStages: number;
}
