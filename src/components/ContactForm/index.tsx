"use client";

import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLenis } from "lenis/react";

import { IContactFormData, ContactFormVariant } from "./types";
import { useSubmitForm } from "@/hooks/useSubmitForm";
import type { FormType } from "@/shared/types/submissions.types";
import VacancyForm from "./VacancyForm";
import QuestionnaireForm from "./QuestionnaireForm";
import DefaultForm from "./DefaultForm";
import RequestForm from "./RequestForm";

interface ContactFormProps {
  variant?: ContactFormVariant;
  onSuccess?: () => void;
  meta?: Record<string, unknown>;
}

const ContactForm: FC<ContactFormProps> = ({
  variant = "default",
  onSuccess,
  meta,
}) => {
  const lenis = useLenis();
  const { submitForm, isSubmitting } = useSubmitForm(onSuccess);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
    reset,
  } = useForm<IContactFormData>();

  // Add effect to handle Lenis resize when errors change
  useEffect(() => {
    if (lenis) {
      lenis.resize();
    }
  }, [errors, lenis]);

  const getFormType = (variant: ContactFormVariant): FormType => {
    switch (variant) {
      case "vacancy":
        return "VACANCY";
      case "questionnaire":
        return "QUESTIONNAIRE";
      case "request":
        return "REQUEST";
      default:
        return "DEFAULT";
    }
  };

  const onSubmit = (data: IContactFormData) => {
    const files = data.resume ? Array.from(data.resume) : undefined;

    submitForm({
      formType: getFormType(variant),
      name: data.name,
      email: data.email,
      phone: data.phone,
      comments: data.comments,
      files,
      consent: data.consent,
      meta: meta, // Передаем метаданные (данные опросника)
    });

    // Отслеживание цели Яндекс.Метрики
    if (typeof window !== "undefined" && window.ym) {
      window.ym(9004708, 'reachGoal', 'send_form');
      console.log('Yandex Metrika reached goal "send_form"');
    }

    // Сбросить форму после успешной отправки
    reset();
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
      isSubmitting={isSubmitting}
    />
  ) : variant === "questionnaire" ? (
    <QuestionnaireForm
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      setError={setError}
      clearErrors={clearErrors}
      watch={watch}
      onSubmit={onSubmit}
    />
  ) : variant === "request" ? (
    <RequestForm
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      setError={setError}
      clearErrors={clearErrors}
      watch={watch}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
    />
  ) : (
    <DefaultForm
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      setError={setError}
      clearErrors={clearErrors}
      watch={watch}
      onSubmit={onSubmit}
    />
  );
};

export default ContactForm;
