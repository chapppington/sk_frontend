export interface IContactFormData {
  name: string;
  email: string;
  phone: string;
  resume?: FileList;
  comments?: string;
  consent: boolean;
}

export type ContactFormVariant = "vacancy" | "questionnaire" | "default";
