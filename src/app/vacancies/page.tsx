import FirstScreen from "@/app/vacancies/screens/FirstScreen";
import dynamic from "next/dynamic";

const VacanciesScreen = dynamic(() => import("@/app/vacancies/screens/VacanciesScreen"));
const ValuesScreen = dynamic(() => import("@/app/vacancies/screens/ValuesScreen"));
const AdvantagesScreen = dynamic(() => import("@/app/vacancies/screens/AdvantagesScreen"));
const ReviewsScreen = dynamic(() => import("@/app/vacancies/screens/ReviewsScreen"));
const FaqScreen = dynamic(() => import("@/app/vacancies/screens/FaqScreen"));
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
