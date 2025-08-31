import { FC, useRef } from "react";

import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import MainButton from "@/components/ui/MainButton";
import { formatPhoneNumber } from "@/shared/utils/formatPhoneNumber";
import { IContactFormData } from "../types";
import { VacancyFormProps } from "../VacancyForm/types";
import PaperClipIcon from "@/shared/icons/PaperClipIcon";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE, sanitizeFileName } from "../utils";

// For a general request we only need basic contact info and a message
const RequestForm: FC<VacancyFormProps> = ({
  register,
  handleSubmit,
  errors,
  setError,
  clearErrors,
  watch,
  onSubmit,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const selectedFiles = watch("resume");
  const fileNames =
    selectedFiles && selectedFiles.length > 0
      ? Array.from(selectedFiles)
          .map((file: File) => sanitizeFileName(file.name))
          .join(", ")
      : "";

  const validateFiles = (files: FileList) => {
    clearErrors("resume");
    if (!files || files.length === 0) {
      return true; // optional in request form
    }
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > MAX_FILE_SIZE) {
        setError("resume", {
          type: "manual",
          message: "Размер файла не должен превышать 5MB",
        });
        return false;
      }
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
      if (!ALLOWED_FILE_TYPES.includes(fileExtension)) {
        setError("resume", {
          type: "manual",
          message: "Допустимые форматы: PDF, DOC, DOCX",
        });
        return false;
      }
    }
    return true;
  };
  const handleFormSubmit = (data: IContactFormData) => {
    onSubmit(data);
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit(handleFormSubmit)}>
      <Input
        type="text"
        label="Ваше имя"
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
        label="Ваш E-mail"
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
        label="Ваш телефон"
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

      <TextArea
        label="Небольшой сопроводительный текст"
        rows={1}
        placeholder="Опишите задачу или вопрос"
        {...register("comments")}
      />

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <button
            type="button"
            className="flex items-center text-white/80 hover:text-white transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <PaperClipIcon className="w-5 h-5 mr-2" />
            {fileNames ? "Изменить файлы" : "Прикрепить файлы"}
          </button>
          {(() => {
            const {
              ref: hookFormRef,
              onChange,
              ...rest
            } = register("resume", {
              onChange: (e) => {
                const files = (e.target as HTMLInputElement).files;
                if (files) {
                  validateFiles(files);
                }
              },
            });
            return (
              <input
                ref={(el) => {
                  hookFormRef(el);
                  fileInputRef.current = el;
                }}
                onChange={(e) => {
                  onChange(e);
                  const files = (e.target as HTMLInputElement).files;
                  if (files) {
                    validateFiles(files);
                  }
                }}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                multiple
                {...rest}
              />
            );
          })()}
          {fileNames && (
            <div className="text-sm text-white/60">
              Выбраны файлы: {fileNames}
            </div>
          )}
          {errors.resume && (
            <div className="text-sm text-red-500">{errors.resume.message}</div>
          )}
        </div>
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

      <MainButton
        text="Отправить"
        onClick={handleSubmit(handleFormSubmit)}
        disableRedirect
      />
    </form>
  );
};

export default RequestForm;
