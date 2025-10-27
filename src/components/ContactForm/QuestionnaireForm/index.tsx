import { FC } from "react";

import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import MainButton from "@/components/ui/MainButton";
import PaperClipIcon from "@/shared/icons/PaperClipIcon";

import { formatPhoneNumber } from "@/shared/utils/formatPhoneNumber";
import { IContactFormData } from "../types";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE, sanitizeFileName } from "../utils";
import { QuestionnaireFormProps } from "./types";

const QuestionnaireForm: FC<QuestionnaireFormProps> = ({
  register,
  handleSubmit,
  errors,
  setError,
  clearErrors,
  watch,
  onSubmit,
}) => {
  const selectedFile = watch("resume");
  const fileName = selectedFile?.[0]?.name
    ? sanitizeFileName(selectedFile[0].name)
    : "";

  const validateFile = (file: File | undefined) => {
    clearErrors("resume");

    // File is optional, so if no file is provided, just return true
    if (!file) {
      return true;
    }

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

  const handleFormSubmit = (data: IContactFormData) => {
    // Validate file only if it's provided
    if (data.resume?.[0] && !validateFile(data.resume[0])) {
      return;
    }
    onSubmit(data);
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit(handleFormSubmit)}>
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

      <div className="flex flex-col gap-6">
          <p className="text-sm text-white/60 italic">
            Прикрепите карточку организации, проект или схемы для уточнения информации, если имеется.
          </p>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            className="flex items-center text-white/80 hover:text-white transition-colors"
            onClick={() => document.getElementById("resume-upload")?.click()}
          >
            <PaperClipIcon className="w-5 h-5 mr-2" />
            {fileName ? "Изменить файл" : "Прикрепить файл"}
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
      </div>

      <TextArea
        id="comments"
        label="Комментарии и пожелания"
        rows={4}
        placeholder="Введите ваши комментарии и пожелания..."
        {...register("comments")}
      />

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

      <MainButton
        text="Отправить"
        onClick={handleSubmit(handleFormSubmit)}
        disableRedirect
      />
    </form>
  );
};

export default QuestionnaireForm;
