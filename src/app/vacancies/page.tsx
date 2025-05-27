import FirstScreen from "@/app/vacancies/FirstScreen";
import VacanciesScreen from "@/app/vacancies/VacanciesScreen";
import ValuesScreen from "@/app/vacancies/ValuesScreen";
import AdvantagesScreen from "@/app/vacancies/AdvantagesScreen";
import ReviewsScreen from "@/app/vacancies/ReviewsScreen";
import FaqScreen from "@/app/vacancies/FaqScreen";
import ContactUsSection from "@/components/sections/ContactUsSection";

export default function Vacancies() {
  return (
    <div>
      <FirstScreen />
      <VacanciesScreen />
      <ValuesScreen />
      <AdvantagesScreen />
      <ReviewsScreen />
      <FaqScreen />
      <ContactUsSection />
    </div>
  );
}
