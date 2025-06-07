import { FC } from "react";
import {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldErrors,
} from "react-hook-form";

import Input from "@/components/ui/Input";
import MainButton from "@/components/ui/MainButton";

import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { IContactFormData } from "./types";

interface QuestionnaireFormProps {
  register: UseFormRegister<IContactFormData>;
  handleSubmit: UseFormHandleSubmit<IContactFormData>;
  errors: FieldErrors<IContactFormData>;
  onSubmit: (data: IContactFormData) => void;
}

const QuestionnaireForm: FC<QuestionnaireFormProps> = ({
  register,
  handleSubmit,
  errors,
  onSubmit,
}) => {
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

      <div className="flex flex-col gap-2">
        <label htmlFor="comments" className="text-white/80">
          Комментарии и пожелания
        </label>
        <textarea
          id="comments"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/20 transition-colors"
          rows={4}
          placeholder="Введите ваши комментарии и пожелания..."
          {...register("comments")}
        />
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
        onClick={handleSubmit(onSubmit)}
        disableRedirect
      />
    </form>
  );
};

export default QuestionnaireForm;
