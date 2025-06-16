import {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldErrors,
  UseFormSetError,
  UseFormClearErrors,
  UseFormWatch,
} from "react-hook-form";
import { IContactFormData } from "../types";

export interface VacancyFormProps {
  register: UseFormRegister<IContactFormData>;
  handleSubmit: UseFormHandleSubmit<IContactFormData>;
  errors: FieldErrors<IContactFormData>;
  setError: UseFormSetError<IContactFormData>;
  clearErrors: UseFormClearErrors<IContactFormData>;
  watch: UseFormWatch<IContactFormData>;
  onSubmit: (data: IContactFormData) => void;
}


