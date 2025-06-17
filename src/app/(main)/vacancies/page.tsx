import FirstScreen from "@/app/(main)/vacancies/screens/FirstScreen";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const VacanciesScreen = dynamic(
  () => import("@/app/(main)/vacancies/screens/VacanciesScreen")
);
const ValuesScreen = dynamic(
  () => import("@/app/(main)/vacancies/screens/ValuesScreen")
);
const AdvantagesScreen = dynamic(
  () => import("@/app/(main)/vacancies/screens/AdvantagesScreen")
);
const ReviewsScreen = dynamic(
  () => import("@/app/(main)/vacancies/screens/ReviewsScreen")
);
const FaqScreen = dynamic(
  () => import("@/app/(main)/vacancies/screens/FaqScreen")
);
const ContactUsScreen = dynamic(
  () => import("@/components/shared_screens/ContactUsScreen")
);

export default function VacanciesPage() {
  return (
    <main>
      <FirstScreen />
      <Suspense fallback={<div>Loading...</div>}>
        <VacanciesScreen />
      </Suspense>
      <ValuesScreen />
      <AdvantagesScreen />
      <ReviewsScreen />
      <FaqScreen />
      <ContactUsScreen />
    </main>
  );
}
