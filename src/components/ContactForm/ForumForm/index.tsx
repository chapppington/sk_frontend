import { FC } from "react";

import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import MainButton from "@/components/ui/MainButton";
import { formatPhoneNumber } from "@/shared/utils/formatPhoneNumber";
import { IContactFormData } from "../types";
import { VacancyFormProps } from "../VacancyForm/types";

const ForumForm: FC<VacancyFormProps> = ({
  register,
  handleSubmit,
  errors,
  onSubmit,
  isSubmitting = false,
}) => {
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
        label="E-mail"
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

      <TextArea
        label="Комментарий"
        rows={4}
        placeholder="Оставьте комментарий (необязательно)"
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
        text={isSubmitting ? "Отправка..." : "Зарегистрироваться"}
        onClick={handleSubmit(handleFormSubmit)}
        disableRedirect
      />
    </form>
  );
};

export default ForumForm;

