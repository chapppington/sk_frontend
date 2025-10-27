import { IQuestion, IStage } from "@/app/(main)/questionnaire/shared/types";

export interface QuestionnaireWrapperProps {
  questions: IQuestion[];
  stages: IStage[];
  title?: string;
  subtitle?: string;
  breadcrumbLabel?: string;
}


