import { IStage } from "@/app/(main)/questionnaire/shared/types";

export interface QuestionnaireLeftMenuProps {
  activeStage: number;
  setActiveStage: (stage: number) => void;
  stages: IStage[];
  title?: string;
  subtitle?: string;
  breadcrumbLabel?: string;
}
