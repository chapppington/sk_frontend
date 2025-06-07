"use client";

import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLenis } from "lenis/react";

import { IContactFormData, ContactFormVariant } from "./types";
import VacancyForm from "./VacancyForm";
import QuestionnaireForm from "./QuestionnaireForm";

interface ContactFormProps {
  variant?: ContactFormVariant;
}

const ContactForm: FC<ContactFormProps> = ({ variant = "vacancy" }) => {
  const lenis = useLenis();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm<IContactFormData>();

  // Add effect to handle Lenis resize when errors change
  useEffect(() => {
    if (lenis) {
      lenis.resize();
    }
  }, [errors, lenis]);

  const onSubmit = (data: IContactFormData) => {
    console.log(data);
    // Handle form submission here
  };

  return variant === "vacancy" ? (
    <VacancyForm
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      setError={setError}
      clearErrors={clearErrors}
      watch={watch}
      onSubmit={onSubmit}
    />
  ) : (
    <QuestionnaireForm
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      onSubmit={onSubmit}
    />
  );
};

export default ContactForm;
