import FirstScreen from "@/app/vacancies/FirstScreen";
import VacanciesScreen from "@/app/vacancies/VacanciesScreen";
import ValuesScreen from "@/app/vacancies/ValuesScreen";
import AdvantagesScreen from "@/app/vacancies/AdvantagesScreen";
import ReviewsScreen from "@/app/vacancies/ReviewsScreen";
import FaqScreen from "@/app/vacancies/FaqScreen";
import ContactUsScreen from "@/components/shared_screens/ContactUsScreen";

export default function Vacancies() {
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
