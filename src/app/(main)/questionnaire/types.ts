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
  options: IQuestionOption[];
  popoverContent?: string;
  type?: "slider" | "text" | "multiple_choice";
  textLabel?: string;
}

export interface IStage {
  number: number;
  title: string;
  shortTitle: string;
}

// Define the possible types of answers in our form
export type Answer = string | number | string[];

// Form state is a record of question IDs to their answers
export interface IFormState {
  [questionId: number]: Answer;
}
