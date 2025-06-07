export interface IQuestionOption {
  value: string | number;
  label: string;
}

export interface IQuestion {
  id: number;
  title: string;
  options: IQuestionOption[];
}

export interface IStage {
  number: number;
  title: string;
  shortTitle: string;
}
