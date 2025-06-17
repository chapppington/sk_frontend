import { IQuestionOption } from "../../types";

export interface QuestionDropdownProps {
  value: string | number | string[];
  onChange: (value: string | number | string[]) => void;
  title: string;
  options: IQuestionOption[];
  defaultOpen?: boolean;
  questionId: number;
  popoverContent?: string;
  type?: "slider" | "text" | "multiple_choice";
  textLabel?: string;
}
