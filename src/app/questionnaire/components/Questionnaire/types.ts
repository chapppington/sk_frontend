
import { RefObject } from "react";
import { IFormState } from "../../types";

export interface QuestionnaireProps {
  formState: IFormState;
  handleStateChange: (key: number, value: string | number | string[]) => void;
  stageRefs: RefObject<(HTMLDivElement | null)[]>;
}
