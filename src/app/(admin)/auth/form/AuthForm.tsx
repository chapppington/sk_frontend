"use client";

import { MiniLoader } from "@/components/ui/MiniLoader";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./AuthForm.module.scss";
import { useAuthForm } from "./useAuthForm";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { Button } from "@/components/ui/shadcn/button";

export function AuthForm() {
  const { handleSubmit, isLoading, onSubmit, recaptchaRef, register } =
    useAuthForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[370px] mx-auto space-y-4"
    >
      <div className="space-y-2 w-full">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Введите email"
          className="w-full"
          {...register("email", { required: true })}
        />
      </div>

      <div className="space-y-2 w-full">
        <Label htmlFor="password">Пароль</Label>
        <Input
          id="password"
          type="password"
          placeholder="Введите пароль"
          className="w-full"
          {...register("password", { required: true })}
        />
      </div>

      <ReCAPTCHA
        ref={recaptchaRef}
        size="normal"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
        theme="dark"
        className={styles["recaptcha"]}
      />

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <MiniLoader /> : "Войти"}
      </Button>
    </form>
  );
}
