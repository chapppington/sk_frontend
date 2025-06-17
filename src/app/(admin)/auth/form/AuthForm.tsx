"use client";

import { MiniLoader } from "@/components/ui/MiniLoader";
import ReCAPTCHA from "react-google-recaptcha";
import { twMerge } from "tailwind-merge";
import styles from "./AuthForm.module.scss";
import { useAuthForm } from "./useAuthForm";

export function AuthForm() {
  const { handleSubmit, isLoading, onSubmit, recaptchaRef, register } =
    useAuthForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
      <div className="mb-4">
        <label className="text-gray-600">
          Email
          <input
            type="email"
            placeholder="Введите email: "
            {...register("email", { required: true })}
            className={styles["input-field"]}
          />
        </label>
      </div>

      <div className="mb-6">
        <label className="text-gray-600">
          Пароль
          <input
            type="password"
            placeholder="Введите пароль: "
            {...register("password", { required: true })}
            className={styles["input-field"]}
          />
        </label>
      </div>

      <ReCAPTCHA
        ref={recaptchaRef}
        size="normal"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
        theme="light"
        className={styles["recaptcha"]}
      />

      <div className="mb-3">
        <button
          type="submit"
          className={twMerge(
            styles["btn-primary"],
            "bg-primary",
            isLoading && "opacity-75 cursor-not-allowed"
          )}
          disabled={isLoading}
        >
          {isLoading ? <MiniLoader /> : "Войти"}
        </button>
      </div>
    </form>
  );
}
