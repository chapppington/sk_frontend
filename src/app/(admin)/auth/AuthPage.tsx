import { AuthForm } from "./form/AuthForm";
import { AuthPageWrapper } from "./AuthPageWrapper";

export function AuthPage() {
  return (
    <AuthPageWrapper heading="Sign In">
      <AuthForm />
    </AuthPageWrapper>
  );
}
