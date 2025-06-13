import { RefObject } from "react";
import { IFormState } from "../../types";
import { FeederData } from "../QuestionDropdown/components/FeederSectionOption/types";

export interface QuestionnaireProps {
  formState: IFormState;
  handleStateChange: (
    key: number,
    value: string | number | string[] | Record<string, FeederData[]>
  ) => void;
  stageRefs: RefObject<(HTMLDivElement | null)[]>;
}
