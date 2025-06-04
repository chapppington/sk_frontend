"use client";

import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLenis } from "lenis/react";

import Input from "@/components/ui/Input";
import MainButton from "@/components/ui/MainButton";

import { formatPhoneNumber } from "@/utils/formatPhoneNumber";

import { IContactFormData } from "./types";
import { sanitizeFileName } from "./utils";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = [".pdf", ".doc", ".docx"];

const ContactForm: FC = () => {
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

  const selectedFile = watch("resume");
  const fileName = selectedFile?.[0]?.name
    ? sanitizeFileName(selectedFile[0].name)
    : "";

  const validateFile = (file: File) => {
    clearErrors("resume");

    if (!file) return true;

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setError("resume", {
        type: "manual",
        message: "Размер файла не должен превышать 5MB",
      });
      return false;
    }

    // Check file type
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    if (!ALLOWED_FILE_TYPES.includes(fileExtension)) {
      setError("resume", {
        type: "manual",
        message: "Допустимые форматы: PDF, DOC, DOCX",
      });
      return false;
    }

    return true;
  };

  const onSubmit = (data: IContactFormData) => {
    if (data.resume?.[0] && !validateFile(data.resume[0])) {
      return;
    }
    console.log(data);
    // Handle form submission here
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        id="name"
        label="ФИО"
        required
        error={errors.name?.message}
        {...register("name", {
          required: "Это поле обязательно",
          minLength: {
            value: 2,
            message: "Минимум 2 символа",
          },
        })}
      />
      <Input
        type="email"
        id="email"
        label="Почта"
        required
        error={errors.email?.message}
        {...register("email", {
          required: "Это поле обязательно",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Некорректный email",
          },
        })}
      />
      <Input
        type="tel"
        id="phone"
        label="Телефон"
        required
        error={errors.phone?.message}
        {...register("phone", {
          required: "Это поле обязательно",
          pattern: {
            value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
            message: "Некорректный номер телефона",
          },
          onChange: (e) => {
            const formatted = formatPhoneNumber(e.target.value);
            e.target.value = formatted;
          },
        })}
      />

      {/* File Upload and Consent Section */}
      <div className="flex flex-col gap-6 mt-8">
        <div className="flex flex-col gap-2">
          <button
            type="button"
            className="flex items-center text-white/80 hover:text-white transition-colors"
            onClick={() => document.getElementById("resume-upload")?.click()}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
            {fileName ? "Изменить файл" : "Прикрепить резюме"}
          </button>
          <input
            id="resume-upload"
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx"
            {...register("resume", {
              onChange: (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  validateFile(file);
                }
              },
            })}
          />
          {fileName && (
            <div className="text-sm text-white/60">Выбран файл: {fileName}</div>
          )}
          {errors.resume && (
            <div className="text-sm text-red-500">{errors.resume.message}</div>
          )}
        </div>

        <label className="flex items-center text-white/80 cursor-pointer">
          <div className="relative flex items-center mr-3">
            <input
              type="checkbox"
              className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none cursor-pointer"
              {...register("consent", {
                required: "Необходимо согласие на обработку данных",
              })}
            />
            <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          Я согласен с условиями обработки персональных данных
          {errors.consent && (
            <span className="text-red-500 text-sm ml-2">
              {errors.consent.message}
            </span>
          )}
        </label>
      </div>

      {/* Submit Button */}
      <MainButton
        text="Отправить"
        onClick={handleSubmit(onSubmit)}
        disableRedirect
      />
    </form>
  );
};

export default ContactForm;
