export type FormType = "REQUEST" | "VACANCY" | "QUESTIONNAIRE" | "DEFAULT";

export interface ISubmission {
  id: string;
  formType: FormType;
  name: string;
  email?: string;
  phone?: string;
  comments?: string;
  files: string[];
  fileUrls?: string[];
  consent: boolean;
  meta?: any;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateSubmissionData {
  formType: FormType;
  name: string;
  email?: string;
  phone?: string;
  comments?: string;
  files?: File[];
  consent: boolean;
  meta?: any;
}
