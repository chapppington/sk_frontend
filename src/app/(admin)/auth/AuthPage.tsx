import { AuthForm } from "./form/AuthForm";
import { AuthPageWrapper } from "./AuthPageWrapper";

export function AuthPage() {
  return (
    <AuthPageWrapper heading="Вход">
      <AuthForm />
    </AuthPageWrapper>
  );
}
