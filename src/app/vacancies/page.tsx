import FirstScreen from "@/app/vacancies/modules/FirstScreen";
import VacanciesScreen from "@/app/vacancies/modules/VacanciesScreen";
import ValuesScreen from "@/app/vacancies/modules/ValuesScreen";
import AdvantagesScreen from "@/app/vacancies/modules/AdvantagesScreen";
import ReviewsScreen from "@/app/vacancies/modules/ReviewsScreen";
import FaqScreen from "@/app/vacancies/modules/FaqScreen";

import ContactUsScreen from "@/components/shared_screens/ContactUsScreen";

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
