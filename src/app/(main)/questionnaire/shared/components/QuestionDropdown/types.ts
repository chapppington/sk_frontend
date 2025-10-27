import { IQuestionOption } from "@/app/(main)/questionnaire/shared/types";
import { FeederData } from "./components/FeederSectionOption/types";

export interface QuestionDropdownProps {
  value: string | number | string[] | Record<string, FeederData[]>;
  onChange: (
    value: string | number | string[] | Record<string, FeederData[]>
  ) => void;
  title: string;
  options?: IQuestionOption[];
  defaultOpen?: boolean;
  questionId: number;
  popoverContent?: string;
  type?: "slider" | "text" | "multiple_choice" | "feeder_sections";
  textLabel?: string;
  numberOfSections?: number;
}
