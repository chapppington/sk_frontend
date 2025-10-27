import { RefObject } from "react";
import { IFormState, IQuestion } from "@/app/(main)/questionnaire/shared/types";
import { FeederData } from "../QuestionDropdown/components/FeederSectionOption/types";

export type QuestionnaireType = 'ktp' | 'krun' | 'kso';

export interface QuestionnaireProps {
  formState: IFormState;
  handleStateChange: (
    key: number,
    value: string | number | string[] | Record<string, FeederData[]>
  ) => void;
  stageRefs: RefObject<(HTMLDivElement | null)[]>;
  onSuccess?: () => void;
  questions: IQuestion[];
  questionnaireType: QuestionnaireType;
}
