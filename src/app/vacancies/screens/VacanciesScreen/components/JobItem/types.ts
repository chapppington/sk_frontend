export interface IJob {
  title: string;
  requirements: string[];
  experience: string[];
  salary: number;
}

export interface JobItemProps {
  job: IJob;
  index: number;
}
