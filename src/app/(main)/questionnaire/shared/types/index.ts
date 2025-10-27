import { FeederData } from "../components/QuestionDropdown/components/FeederSectionOption/types";

export interface IQuestionOption {
  value: string | number;
  label: string;
  type?: "text" | "radio";
  textLabel?: string;
  nestedOptions?: IQuestionOption[];
}

export interface IQuestion {
  id: number;
  title: string;
  options?: IQuestionOption[];
  popoverContent?: string;
  type?: "slider" | "text" | "multiple_choice" | "feeder_sections";
  textLabel?: string;
  numberOfSections?: number;
  showIf?: (answers: Record<number, any>) => boolean;
}

export interface IStage {
  number: number;
  title: string;
  shortTitle: string;
}

// Define the possible types of answers in our form
export type Answer = string | number | string[] | Record<string, FeederData[]>;

// Form state is a record of question IDs to their answers
export interface IFormState {
  [questionId: number]: Answer;
}

// Configuration interface for questionnaire
export interface IQuestionnaireConfig {
  questions: IQuestion[];
  stages: IStage[];
  formTitle?: string;
  submitEndpoint?: string;
}



