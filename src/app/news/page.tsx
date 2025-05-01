import ContactUsSection from "@/components/global_sections/ContactUsSection";
import FirstScreen from "./FirstScreen";
import NewsGrid from "./NewsGrid";

export default function News() {
  return (
    <>
      <FirstScreen />
      <NewsGrid />
      <ContactUsSection></ContactUsSection>
    </>
  );
}
