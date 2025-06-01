import FirstScreen from "@/app/vacancies/modules/FirstScreen";
import dynamic from "next/dynamic";

const VacanciesScreen = dynamic(() => import("@/app/vacancies/modules/VacanciesScreen"));
const ValuesScreen = dynamic(() => import("@/app/vacancies/modules/ValuesScreen"));
const AdvantagesScreen = dynamic(() => import("@/app/vacancies/modules/AdvantagesScreen"));
const ReviewsScreen = dynamic(() => import("@/app/vacancies/modules/ReviewsScreen"));
const FaqScreen = dynamic(() => import("@/app/vacancies/modules/FaqScreen"));
const ContactUsScreen = dynamic(() => import("@/components/shared_screens/ContactUsScreen"));

export default function VacanciesPage() {
  return (
    <main>
      <FirstScreen />
      <VacanciesScreen />
      <ValuesScreen />
      <AdvantagesScreen />
      <ReviewsScreen />
      <FaqScreen />
      <ContactUsScreen />
    </main>
  );
}
