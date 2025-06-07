import { IFormState } from "../../utils/initializeFormState";
import { RefObject } from "react";

type QuestionnaireState = Record<number, string | string[]>;

export interface QuestionnaireProps {
  formState: IFormState;
  handleStateChange: (key: number, value: string | number | string[]) => void;
  stageRefs: RefObject<(HTMLDivElement | null)[]>;
}
