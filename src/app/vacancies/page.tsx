import ContactUsSection from "@/components/sections/ContactUsSection";
import AdvantagesSection from "./AdvantagesSection";
import FaqSection from "./FaqSection";
import FirstScreen from "./FirstScreen";
import ReviewsSection from "./ReviewsSection";
import VacanciesList from "./VacanciesList";
import ValuesSection from "./ValuesSection";

export default function Vacancies() {
  return (
    <div>
      <FirstScreen />
      <VacanciesList />
      <ValuesSection />
      <AdvantagesSection />
      <ReviewsSection />
      <FaqSection />
      <ContactUsSection />
    </div>
  );
}
