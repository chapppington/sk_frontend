export interface IQuestionOption {
  value: string | number;
  label: string;
  type?: "text";
  textLabel?: string;
}

export interface IQuestion {
  id: number;
  title: string;
  options: IQuestionOption[];
  popoverContent?: string;
  type?: "slider";
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
